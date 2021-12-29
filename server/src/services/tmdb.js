const { default: axios } = require('axios');

let tmdb = {};

tmdb.apiKey = process.env.TMDB_KEY;
tmdb.apiBaseLink = "https://api.themoviedb.org/3"
tmdb.discover = () => {

  let isMovie = !!Math.round(Math.random())
  let data = https.request()
}

/**
 * list all genres in tmdb
 */
tmdb.tvGenres = async () => {
  let endpoint = '/genre/tv/list';
  let fullURL = tmdb.apiBaseLink + endpoint + "?api_key=" + tmdb.apiKey;
  let content = (await axios.get(fullURL)).data.genres;
  return content;
}

/**
 * list all genres in tmdb
 */
tmdb.movieGenres = async () => {
  let endpoint = '/genre/movie/list';
  let fullURL = tmdb.apiBaseLink + endpoint + "?api_key=" + tmdb.apiKey;
  let content = (await axios.get(fullURL)).data.genres;
  return content;
}


/**
 * list all genres in tmdb
 */
tmdb.discoverMovies = async () => {
  let endpoint = '/discover/movie';
  let fullURL = tmdb.apiBaseLink + endpoint + "?api_key=" + tmdb.apiKey;
  let content = (await axios.get(fullURL)).data.results;
  return content;
}

/**
 * list all genres in tmdb
 */
tmdb.discoverTV = async () => {
  let endpoint = '/discover/tv';
  let fullURL = tmdb.apiBaseLink + endpoint + "?api_key=" + tmdb.apiKey;
  let content = (await axios.get(fullURL)).data.results;
  return content;
}

module.exports = tmdb;