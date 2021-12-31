const userModel = require('../models/user');
const showModel = require('../models/show');
const faker = require('faker');

module.exports = {
  seed: async () => {
    let [users, shows] = await Promise.all([
      userModel.find(),
      showModel.find()
    ]);
    await Promise.all(shows.map(async (show) => {
      console.debug('show starting', show._id)
      await Promise.all(users.map(async (user) => {
        show.reviews.push({
          rating: Math.round((Math.random() * 4) + 1),
          comment: faker.lorem.paragraph(5),
          user: user._id
        });
        console.debug('review for show finished', show._id, user._id);
      }));
      show.reviewCount = show.reviews.length;
      show.ratings = show.reviews.reduce(
        (sum, review) => review.rating + sum, 0
      ) / show.reviewCount;

      console.debug('reviews for show finished', show._id);
      await show.save();
    }));
  }
}