
const user = require('../models/user');
// create a user with "password" password
// no need to hash, mongoose will take care of it

module.exports = {
  seed: async () => {
    user.create({
      name: "Administrator",
      username: 'admin',
      email: 'admin@example.com',
      password: "password",
      isAdmin: true,
    }, function (err, user) {
      if (err) {
        console.error(err);
      }
      return;
    })
  }
}
