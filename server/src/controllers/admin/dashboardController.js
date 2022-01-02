const actorModel = require('../../models/actor');
const showModel = require('../../models/show');

let dashboardController = {};

dashboardController.loadDashboard = async function (req, res, next) {
  let showCountQuery = showModel.aggregate([
    {
      $group: {
        _id: '$showType',
        count: { $sum: 1 }
      }
    }
  ]);
  let topMoviesQuery = showModel.find({ showType: "Movie" }, '_id title ratings')
    .sort({ ratings: -1 })
    .limit(10)
    .exec();
  let topTvQuery = showModel.find({ showType: 'TV Show' }, '_id title ratings')
    .sort({ ratings: -1 })
    .limit(10)
    .exec();
  let topActorsQuery = actorModel.find()
    .select('_id name ratings')
    .sort({ ratings: -1 })
    .limit(10)
    .exec();
  let topTvGenreQuery = showModel.aggregate([
    { $match: { showType: "TV Show" }, },
    { $group: { _id: "$genre", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  let topMovieGenreQuery = showModel.aggregate([
    { $match: { showType: "Movie" } },
    {
      $group: {
        _id: "$genre",
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);


  try {

    let [
      showCount,
      topMovies,
      topTv,
      topActors,
      tvGenreRanking,
      movieGenreRanking
    ] = await Promise.all([
      showCountQuery,
      topMoviesQuery,
      topTvQuery,
      topActorsQuery,
      topTvGenreQuery,
      topMovieGenreQuery
    ]);

    // transform showCount to format : {tv:count, movie:count, total:count}
    showCount = {
      tv: showCount.find(type => type._id === "TV Show").count,
      movie: showCount.find(type => type._id === "Movie").count,
    }
    showCount.total = showCount.tv + showCount.movie

    // transform tv genre ranking
    let tvGenreRankingArr = { total: 0 };
    tvGenreRanking.forEach(genre => {
      tvGenreRankingArr.total += genre.count;
      tvGenreRankingArr[genre._id] = genre.count
    })
    let movieGenreRankingArr = { total: 0 };
    movieGenreRanking.forEach(genre => {
      movieGenreRankingArr.total += genre.count;
      movieGenreRankingArr[genre._id] = genre.count
    })

    res.status(200).send({
      showCount,
      topMovies,
      topTv,
      topActors,
      tvGenreRanking: tvGenreRankingArr,
      movieGenreRanking: movieGenreRankingArr
    })
  } catch (e) {
    return next(e);
  }

}

module.exports = dashboardController;