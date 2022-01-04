const producerModel = require('../models/producer');
const showModel = require('../models/show');
const showProducerModel = require('../models/showProducer');
const faker = require('faker')

module.exports = {
  seed: async () => {
    console.log('show producer seeding...');
    let [producers, shows] = await Promise.all([
      producerModel.find(),
      showModel.find()
    ]);
    await Promise.all(producers.map(async producer => {
      await Promise.all(shows.map(async (show) => {
        // skip some shows to simulate "randomness"
        if (!faker.datatype.boolean()) return;

        await showProducerModel.create({
          producer: producer._id,
          show: show._id
        });
        return;
      }));
      return;
    }));
    console.log('show producer seeding done!');
  }
}
