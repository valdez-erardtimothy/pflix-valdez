const passport = require('passport');

const middleware = function (req, res, next) {
  passport.authenticate('google',
    { scope: ['profile', 'email'], session: false },
    function (err, user, info) {
      console.debug('goog auth', err, user, info)
      if (err) {
        return next(err);
      }
      if (!user && info) {
        const error = new Error(info);
        error.status(401)
        return next(err);
      }
      if (user) {
        res.locals.user = user;
      }
      return next();
    })(req, res, next)
}

module.exports = () => middleware;