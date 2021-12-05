const user = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
/* load strategy */

passport.use(new LocalStrategy({
  session: false,
},
  function (username, password, done) {
    // find user
    user.findOne({
      "$or": [
        { "email": username },
        { "username": username }
      ]
    }, function (err, user) {
      if (err) {
        // error in fetching
        return done(err);
      }
      // check credentials
      if (!user) {
        // wrong creds
        return done(null, false, { message: "Incorrect login credentials" });
      }

      // password check
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) return done(err);
        if (result) {
          // corret password
          return done(null, user);
        } else {
          return done(null, false, {
            message: 'Incorrect password'
          });
        }
      })
    })
  }
))