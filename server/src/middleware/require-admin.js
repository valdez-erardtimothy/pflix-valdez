
/**
 * MUST run this after require-auth middleware 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const middleware = function (req, res, next) {
  // load user from require-auth middleware
  let { user } = res?.locals;
  if (user) {
    if (user.isAdmin) {
      return next();
    } else {
      let forbiddenError = new Error(
        'Must be an administrator to access'
      );
      forbiddenError.status = 403;
      return next(forbiddenError)
    }
  }
  // no user error is "thrown" by require-auth
}

module.exports = () => middleware;