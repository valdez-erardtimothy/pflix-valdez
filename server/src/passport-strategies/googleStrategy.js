const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const userModel = require('../models/user');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  seesion: false
}, function (accessToken, refreshToken, profile, done) {
  if (profile) {
    let userAttribs = {
      name: profile.displayName,
      googleId: profile.id,
      email: profile.emails[0].value,
    }
    userModel.findOrCreate({ googleId: profile.id }, userAttribs, function (err, user) {
      return done(err, user);
    });
  } else return done(null, false);
}
))

module.exports