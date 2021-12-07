const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const user = require('../models/user');

/**
 * copypasted from docs
 *  http://www.passportjs.org/packages/passport-jwt/
 * */
function cookieExtractor(req) {
  const cookieName = process.env.JWT_COOKIE_NAME
  var token = null;
  if (req && req.cookies) {
    token = req.cookies[cookieName];
  }
  return token;
};

const options = {
  secretOrKey: process.env.JWT_SECRETORKEY,
  jwtFromRequest: ExtractJwt.fromExtractors([
    cookieExtractor
  ])
};
// HACK getting errors with audience claim, just check later
// these jwt claims are optional anyway
// https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.1
// options.audience = process.env.JWT_AUDIENCE;
// options.issuer: process.env.JWT_ISSUER,

passport.use(
  new JwtStrategy(options, function (payload, done) {
    user.findById(payload.id, function (err, user = false, info) {
      return done(err, user, info);
    });
  })
);
