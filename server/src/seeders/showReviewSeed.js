const userModel = require('../models/user');
const showModel = require('../models/show');
const faker = require('faker');

module.exports = {
  seed: async () => {
    console.log('show reviews seeding...');
    let [users, shows] = await Promise.all([
      userModel.find(),
      showModel.find()
    ]);
    await Promise.all(shows.map(async (show) => {
      await Promise.all(users.map(async (user) => {
        // skip if false, to "randomize" review count
        if (faker.datatype.boolean()) return;

        show.reviews.push({
          rating: faker.datatype.number({ min: 1, max: 5 }),
          comment: faker.lorem.paragraph(5),
          user: user._id
        });
      }));
      show.reviewCount = show.reviews.length;
      show.ratings = show.reviews.reduce(
        (sum, review) => review.rating + sum, 0
      ) / show.reviewCount;

      await show.save();
    }));

    console.log('show reviews seeding done');
  }
}