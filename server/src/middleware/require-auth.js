const passport = require('passport');

const middleware = function (req, res, next) {
  passport.authenticate(
    'jwt',
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (user) {
        res.locals.user = user;
      }
      if (info) {
        const noUserError = new Error(info);
        noUserError.status = 401
        return next(noUserError);
      }
      return next();
    })(req, res, next);
}
module.exports = middleware;