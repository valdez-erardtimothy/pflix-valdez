
const actor = require('../models/actor');
const faker = require('faker');


// create a user with "password" password
// no need to hash, mongoose will take care of it

module.exports = {
  seed: async () => {
    let count = 20;
    while (count > 0) {
      actor.create({
        name: faker.name.findName(),
        notes: faker.lorem.paragraph(10)
      }, function (err, actor) {
        if (err) {
          console.error(err);
        }
        return;
      });
      count--;
    }
  }
}

