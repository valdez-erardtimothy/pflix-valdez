const passport = require("passport");
const express = require('express');
const router = express.Router();
const toMillis = require('parse-duration');
const requireAuthMiddleware = require('../middleware/require-auth');
const handleLoginMiddleware = require('../middleware/handlePasswordLogin');
const googleLoginMiddleware = require('../middleware/handleGoogleSignon');
const userModel = require('../models/user');
const jwtTokenName = process.env.JWT_COOKIE_NAME;
// set cookie lasting as long as jwt token expiry
const JWT_TOKENCOOKIE_DURATION = toMillis(process.env.JWT_EXPIRES_IN)

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
      res.cookie(jwtTokenName, jwtoken, {
        maxAge: JWT_TOKENCOOKIE_DURATION
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

router.get(
  '/auth/google',
  passport.authenticate('google', { session: false, scope: ['profile', 'email'] }),
)
router.get('/auth/google/callback',
  function (req, res, next) {
    next()
  },
  googleLoginMiddleware(),
  function (req, res) {
    let { user } = res?.locals
    if (user) {
      let jwtoken = user.generateJWT();
      res.cookie(jwtTokenName, jwtoken, {
        maxAge: JWT_TOKENCOOKIE_DURATION
      })
      return res.redirect(process.env.FRONTEND_URL + "/loginsuccess")
    }
  }
);

router.post('/register', function (req, res, next) {
  const params = req.body;
  if (params?.isAdmin) {
    delete params.isAdmin;
  }
  userModel.create(params, function (err, user) {
    if (err) {
      return next(err);
    }
    return res.status(201).json(user);
  });
})
module.exports = router