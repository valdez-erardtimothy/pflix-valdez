const filmographyModel = require('../models/filmography')
const actorModel = require('../models/actor');
const showModel = require('../models/show');
const faker = require('faker');
const removeDuplicate = require('../utils/removeDuplicate');

// create a user with "password" password
// no need to hash, mongoose will take care of it

module.exports = {
  seed: async () => {
    Promise.all([
      actorModel.find({}, '_id'),
      showModel.find({}, '_id')
    ]).then(([actors, shows]) => {
      actors.map(async actor => {
        let filmoEntries = [...Array(30)].map(() => {
          let showIndex = Math.round(Math.random() * (shows.length - 1));
          return {
            actor: actor._id,
            show: shows[showIndex]._id,
            character: faker.name.firstName()
          };
        });
        filmoEntries = removeDuplicate(filmoEntries, 'show');

        await filmographyModel.insertMany(filmoEntries);
      });
    });
  }
}


