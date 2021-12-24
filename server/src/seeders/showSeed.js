// initialize mongodb connection
const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, "..", "config/.env") });
// require("../connectDatabase")();
const tmdb = require('../services/tmdb.js');

const showModel = require('../models/show');

const seeder = {};

seeder.seed = async () => {

  const tvGenres = await tmdb.tvGenres();
  const movieGenres = await tmdb.movieGenres();
  const movies = await tmdb.discoverMovies();
  movies.forEach(movie => {
    showModel.create({
      title: movie.title,
      released: new Date(movie.release_date),
      plot: movie?.overview || "Unknown",
      showType: "Movie",
      runtimeMinutes: Math.round(Math.random() * 300),
      genre: movieGenres.find(row => row.id === movie.genre_ids[0])?.name,
    })
  });
  (await tmdb.discoverTV()).forEach(tvShow => {
    showModel.create({
      title: tvShow.name,
      released: new Date(tvShow.first_air_date),
      plot: tvShow?.overview || "Unknown",
      showType: "TV Show",
      runtimeMinutes: Math.round(Math.random() * 300),
      genre: tvGenres.find(row => row.id === tvShow.genre_ids[0])?.name,
    })
  })
  return;
}



module.exports = seeder;