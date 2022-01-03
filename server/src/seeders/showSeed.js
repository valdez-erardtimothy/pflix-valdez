// initialize mongodb connection
// require('dotenv').config({ path: path.resolve(__dirname, "..", "config/.env") });
// require("../connectDatabase")();
const tmdb = require('../services/tmdb.js');
const faker = require('faker')
const showModel = require('../models/show');

const seeder = {};

seeder.seed = async () => {
  // const tvGenres = await tmdb.tvGenres();
  // const movieGenres = await tmdb.movieGenres();
  // const movies = await tmdb.discoverMovies();
  console.log('shows seeding:');
  const [
    tvGenres,
    movieGenres,
    movies,
    tvShows,
  ] = await Promise.all([
    tmdb.tvGenres(),
    tmdb.movieGenres(),
    tmdb.discoverMovies(),
    tmdb.discoverTV()
  ]);
  let moviesSeeding = Promise.all(
    movies.map(async (movie) => {
      let movieDoc = await showModel.create({
        title: movie.title,
        released: new Date(movie.release_date),
        plot: movie?.overview || "Unknown",
        showType: "Movie",
        runtimeMinutes: Math.round(Math.random() * 300),
        genre: movieGenres.find(row => {
          let randomGenre = movie.genre_ids[
            faker.datatype.number({
              min: 0,
              max: movie.genre_ids.length - 1
            })
          ]
          return row.id === randomGenre
        })?.name,
      });
      return movieDoc;
    })
  );

  let tvSeeding = Promise.all(
    tvShows.map(async (tvShow) => {
      let tvDoc = await showModel.create({
        title: tvShow.name,
        released: new Date(tvShow.first_air_date),
        plot: tvShow?.overview || "Unknown",
        showType: "TV Show",
        runtimeMinutes: Math.round(Math.random() * 300),
        genre: tvGenres.find(row => {
          let randomGenre = tvShow.genre_ids[
            faker.datatype.number({
              min: 0,
              max: tvShow.genre_ids.length - 1
            })
          ]
          return row.id === randomGenre;
        })?.name,
      });
      return tvDoc;
    })
  );
  await Promise.all([moviesSeeding, tvSeeding]);
  let tvCount = await showModel.find({ showType: "TV Show" }).count();
  let movieCount = await showModel.find({ showType: "Movie" }).count();
  console.log('shows done. tvs and movies count:', tvCount, movieCount)
  return;
}



module.exports = seeder;