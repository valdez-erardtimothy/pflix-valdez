const passport = require("passport");
const express = require('express');
const router = express.Router();
const toMillis = require('parse-duration');
const requireAuthMiddleware = require('../middleware/require-auth');
const handleLoginMiddleware = require('../middleware/handlePasswordLogin');

const jwtTokenName = process.env.JWT_COOKIE_NAME;

router.post('/login',
  handleLoginMiddleware(),
  function (req, res) {
    // login success, correct credentials
    let { user } = res?.locals;
    if (user) {
      // generate token for future authentication
      let jwtoken = user.generateJWT();
      user = { name, email, username } = user
      let response = {
        user
      }
      // set cookie lasting as long as jwt token expiry
      const JWT_TOKEN_DURATION = toMillis(process.env.JWT_EXPIRES_IN)
      res.cookie(jwtTokenName, jwtoken, {
        maxAge: JWT_TOKEN_DURATION
      });
      res.status(200).send(response);
    }

  }

);

// load jwt-authenticated user
router.get(
  '/getAuthenticatedUser',
  requireAuthMiddleware(),
  function (req, res) {
    let { user } = res?.locals;
    if (user) {
      res.status(200).json({ user });
    }
    // if no user, error thrown at requireAuthMiddleware. 
    // no need to send
  });

router.get(
  '/logout',
  requireAuthMiddleware(),
  function (req, res) {
    // clear the cookie to essentially logout
    // nothing to do with the jwt but to wait for expiry
    res.clearCookie(jwtTokenName);
    res.status(204).send()
  })

module.exports = router