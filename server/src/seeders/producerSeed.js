const producerModel = require('../models/producer');
const faker = require('faker');


module.exports = {
  seed: async () => {
    console.log('producer seeding . . .');
    let seedCount = 20;
    let docs = await Promise.all([...Array(seedCount)].map(async () => {
      // create individually to avoid bulk write errors;
      let doc = await producerModel.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        website: faker.internet.url()
      })
      return doc;
    }));
    console.log('producer seeding done!');
    return docs;
  }
}