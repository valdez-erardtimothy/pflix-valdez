const passport = require('passport');

/**
 * loads the user without throwing an error if unauthenticated
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const middleware = function (req, res, next) {
  passport.authenticate(
    'jwt',
    { session: false },
    function (err, user) {
      if (err) {
        return next(err);
      }
      if (user) {
        res.locals.user = user;
      }
      return next();
    })(req, res, next);
}
module.exports = () => middleware;