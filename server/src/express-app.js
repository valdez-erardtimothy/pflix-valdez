const fs = require('fs');
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  createParentPath: true
}));
app.use(cookieParser());

// load strategies
fs.readdirSync(path.resolve(__dirname, "passport-strategies")).forEach(filename => {
  require(`./passport-strategies/${filename}`);
});

/* register all routers on /routes */

/**
 * prefix for all the routes on backend
 * use / for no prefix
 */
const ROUTE_PREFIX = "/api";
/**
 * path of routes relative to this file (express-app.js)
 */
const ROUTES_PATH = 'routes';
app.use(`${ROUTE_PREFIX}/assets`, express.static(path.resolve(__dirname, 'assets')));
/**
 * register all route files in the ROUTES_PATH folder
 * all exports on the folder must be a express.Router object
 * this does not support route dir scanning
 */
fs.readdirSync(path.resolve(__dirname, ROUTES_PATH)).forEach(filename => {
  const router = require(`./${ROUTES_PATH}/` + filename);
  app.use(ROUTE_PREFIX, router);
});

app.use(ROUTE_PREFIX + "/test", (req, res) => { res.send('welcome to PFlix API') })


module.exports = app;