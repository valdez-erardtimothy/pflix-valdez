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
  let topMoviesQuery = showModel.find({ showType: "Movie" }, '_id title ratings reviewCount')
    .sort({ ratings: -1 })
    .limit(10)
    .exec();
  let topTvQuery = showModel.find({ showType: 'TV Show' }, '_id title ratings reviewCount')
    .sort({ ratings: -1 })
    .limit(10)
    .exec();
  let topActorsQuery = actorModel.find()
    .select('_id name ratings reviewCount')
    .sort({ ratings: -1 })
    .limit(10)
    .exec();
  let topTvGenreQuery = showModel.aggregate([
    { $match: { showType: "TV Show" }, },
    {
      $group: {
        _id: "$genre",
        count: { $sum: 1 },
        avgRatings: { $avg: "$ratings" }
      }
    },
    { $sort: { avgRatings: -1 } }
  ]);
  let topMovieGenreQuery = showModel.aggregate([
    { $match: { showType: "Movie" } },
    {
      $group: {
        _id: "$genre",
        count: { $sum: 1 },
        avgRatings: { $avg: "$ratings" }
      }
    },
    { $sort: { avgRatings: -1 } }
  ]);
  let topTvGrossQuery = showModel.find()
    .where({ showType: "TV Show" })
    .select('_id title grossIncome')
    .sort({ grossIncome: -1 })
    .limit(10)
    .exec();
  let topMovieGrossQuery = showModel.find()
    .where({ showType: "Movie" })
    .select('_id title grossIncome')
    .sort({ grossIncome: -1 })
    .limit(10)
    .exec();


  try {

    let [
      showCount,
      topMovies,
      topTv,
      topActors,
      tvGenreRanking,
      movieGenreRanking,
      topTvGross,
      topMovieGross
    ] = await Promise.all([
      showCountQuery,
      topMoviesQuery,
      topTvQuery,
      topActorsQuery,
      topTvGenreQuery,
      topMovieGenreQuery,
      topTvGrossQuery,
      topMovieGrossQuery
    ]);

    // transform showCount to format : {tv:count, movie:count, total:count}
    showCount = {
      tv: showCount.find(type => type._id === "TV Show").count,
      movie: showCount.find(type => type._id === "Movie").count,
    }
    showCount.total = showCount.tv + showCount.movie

    res.status(200).send({
      showCount,
      topMovies,
      topTv,
      topActors,
      tvGenreRanking,
      movieGenreRanking,
      topTvGross,
      topMovieGross
    })
  } catch (e) {
    return next(e);
  }

}

module.exports = dashboardController;