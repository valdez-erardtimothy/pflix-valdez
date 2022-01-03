
const user = require('../models/user');
const faker = require('faker');


// create a user with "password" password
// no need to hash, mongoose will take care of it

module.exports = {
  seed: async () => {
    console.log('users seeding...')
    let count = 100;
    while (count > 0) {
      user.create({
        name: faker.name.findName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: "password",
        isAdmin: false,
      }, function (err, user) {
        if (err) {
          console.error(err);
        }
        return;
      });
      count--;
    }
    console.log('users seeding done')
  }
}

