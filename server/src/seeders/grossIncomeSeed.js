const showModel = require('../models/show');
const faker = require('faker');

module.exports = {
  seed: async () => {
    console.log('seeding shows gross income');
    let shows = await showModel.find();
    let seedPromises = Promise.all(
      shows.map(async show => {
        show.grossIncome = faker.datatype.number(100000000, 9999999999)
        return show.save();
      })
    )
    console.log('shows gross income seeding done')
    return seedPromises;
  }
}