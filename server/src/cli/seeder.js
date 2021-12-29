// initialize mongodb connection
const path = require('path');
const { exit } = require('process');
console.debug(path.resolve(__dirname, "config/.env"))
require('dotenv').config({ path: path.resolve(__dirname, "..", "config/.env") });
require("../connectDatabase")();

const seederPath = path.resolve(__dirname, "..", "seeders");

Promise.all([
  require(`${seederPath}/showSeed.js`).seed(),
  require(`${seederPath}/adminSeed.js`).seed()
]).then(() => {
  exit();
});


