// initialize mongodb connection
const path = require('path');
const { exit } = require('process');
console.debug(path.resolve(__dirname, "config/.env"))
require('dotenv').config({ path: path.resolve(__dirname, "..", "config/.env") });
require("../connectDatabase")();
const user = require('../models/user');
// create a user with "password" password
// no need to hash, mongoose will take care of it
user.create({
  name: "Administrator",
  username: 'admin',
  email: 'admin@example.com',
  password: "password",
  isAdmin: false,
}, function (err, user) {
  if (err) {
    console.error(err);
  }
  if (user) {

    console.debug('successfully created admin:', user);
  }
  exit();
})