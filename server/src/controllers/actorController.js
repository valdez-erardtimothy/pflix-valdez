const actorModel = require('../models/actor');
const filmographyModel = require('../models/filmography')

/* 
internal methods 

methods that could be in a helper file
*/

/**
 * 
 * @param {*} id 
 * @param {*} user the authenticated user 
 * @returns 
 */
const getActor = function (id, user) {
  return new Promise((resolve, reject) => {
    actorModel.findById(id)
      .populate({ path: "reviews.user", select: ["_id", "name"] })
      .exec(async function (err, actor) {
        if (err) {
          return reject(err);
        }
        let filmography = await filmographyModel.find({ actor: actor._id })
          .populate('show')
          .exec();
        // transforms
        actor = actor.toObject();
        actor.filmography = filmography;
        if (user) {
          actor.reviewOfAuthenticated = actor.reviews.find(
            review => review.user._id.toString() === user._id.toString()
          );
        }
        return resolve(actor);
      });
  })
}

/* controller methods */
let actorContoller = {};


actorContoller.get = async (req, res, next) => {
  let { id } = req.params;
  let { user } = res.locals
  getActor(id, user)
    .then(actor => {
      res.status(200).send({ actor });
    })
    .catch(err => {
      return next(err);
    });
}

actorContoller.review = async (req, res, next) => {
  let { user } = res.locals;
  let { comment, rating, } = req.body;
  let { id: actorId } = req.params;
  try {
    let actor = await actorModel.findById(actorId);
    let reviewed = actor.reviews.find(rev => rev.user.toString() === user._id.toString());
    if (reviewed) {
      actor.reviews.forEach(rev => {
        if (rev.user.toString() === user._id.toString()) {
          rev.comment = comment;
          rev.rating = rating;
        }
      });
    } else {
      actor.reviews.push({ comment, rating, user });
    }
    // recalculate rating and review count of actor
    actor.reviewCount = actor.reviews.length;
    actor.ratings = actor.reviews.reduce((sum, review) => review.rating + sum, 0) / actor.reviewCount;
    await actor.save();
    // get show hydrated with current user review
    actor = await getActor(actor._id, user);
    return res.status(200).send({ actor });
  } catch (e) {
    return next(e);
  }
}

actorContoller.deleteReview = async (req, res, next) => {
  let { user } = res.locals;
  let { id } = req.params;

  actorModel.findById(id, async function (err, actor) {
    if (err) {
      return next(err);
    }
    try {
      let userReview = actor.reviews.find(
        review => review.user.toString() === user._id.toString()
      );
      await actor.reviews.id(userReview._id).remove();
      // recalculate rating and review count of show

      actor.reviewCount = actor.reviews.length;
      if (actor.reviewCount > 0) {
        actor.ratings = actor.reviews.reduce((sum, review) => review.rating + sum, 0) / actor.reviewCount;

      } else {
        actor.ratings = undefined;
      }

      await actor.save();
      actor = await getActor(actor._id, user);
      return res.status(200).send({ actor });
    } catch (e) {
      return next(e);
    }
  });
}

module.exports = actorContoller; 
