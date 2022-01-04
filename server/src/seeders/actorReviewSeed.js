const userModel = require('../models/user');
const actorModel = require('../models/actor');
const faker = require('faker');

module.exports = {
  seed: async () => {
    console.log('actor reviews seeding...');
    let [users, actors] = await Promise.all([
      userModel.find(),
      actorModel.find()
    ]);
    await Promise.all(actors.map(async (actor) => {
      await Promise.all(users.map(async (user) => {
        actor.reviews.push({
          rating: Math.round((Math.random() * 4) + 1),
          comment: faker.lorem.paragraph(5),
          user: user._id
        });
      }));
      actor.reviewCount = actor.reviews.length;
      actor.ratings = actor.reviews.reduce(
        (sum, review) => review.rating + sum, 0
      ) / actor.reviewCount;
      await actor.save();
    }));
    console.log('actor reviews seeiding done');
  }
}