const passport = require('passport');


const middleware = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    console.debug('handlepasswordlogin authenticate:');
    console.debug(err, user, info)
    if (err) {
      return next(err); //let express handle errors
    }
    // info is only sent by strategy when details are incorrect
    // done (err, user, info)
    if (info) {
      let error = new Error(info.message);
      error.status = 401;
      return next(error);
    }
    if (user) {
      res.locals.user = user;
    }
    return next()
  })(req, res, next);
}

module.exports = () => middleware;