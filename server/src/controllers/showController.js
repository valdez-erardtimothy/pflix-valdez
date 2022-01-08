const showModel = require('../models/show');
const showProducerModel = require('../models/showProducer');
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
const getShow = function (id, user) {
  return new Promise((resolve, reject) => {
    showModel.findById(id)
      .populate({ path: "reviews.user", select: ["_id", "name"] })
      .exec(async function (err, show) {
        if (err) {
          return reject(err);
        }
        let cast = await filmographyModel.find({ show: show._id })
          .populate('actor')
          .exec();
        let producers = await showProducerModel.find({ show: show._id })
          .populate('producer')
          .exec();
        // transforms
        show = show.toObject();
        if (user) {
          show.reviewOfAuthenticated = show.reviews.find(
            review => review.user._id.toString() === user._id.toString()
          );
        }
        show.cast = cast;
        show.producers = producers;
        return resolve(show);
      });
  })
}

/* controller methods */
let showController = {};

showController.list = async (req, res, next) => {
  let skip = parseInt(req.query.skip) || 0;
  let itemsPerPage = parseInt(req.query.limit) || 10;



  try {
    let showsQuery = showModel
      .find()
      .sort({ released: -1 })
      .skip(skip)
      .limit(itemsPerPage)
      .exec();
    const [count, shows] = await Promise.all([
      showModel.count(),
      showsQuery
    ]);
    res.status(200).send({ count, shows });
  } catch (e) {
    return next(e)
  }

}

showController.get = async (req, res, next) => {
  let { id } = req.params;
  let { user } = res.locals
  getShow(id, user)
    .then(show => {
      res.status(200).send({ show });
    })
    .catch(err => {
      return next(err);
    });
}

showController.review = async (req, res, next) => {
  let { user } = res.locals;
  let { comment, rating, } = req.body;
  let { id: showId } = req.params;
  try {
    let show = await showModel.findById(showId);
    let reviewed = show.reviews.find(rev => rev.user.toString() === user._id.toString());
    if (reviewed) {
      show.reviews.forEach(rev => {
        if (rev.user.toString() === user._id.toString()) {
          rev.comment = comment;
          rev.rating = rating;
        }
      });
    } else {
      show.reviews.push({ comment, rating, user });
    }
    // recalculate rating and review count of show
    show.reviewCount = show.reviews.length;
    show.ratings = show.reviews.reduce((sum, review) => review.rating + sum, 0) / show.reviewCount;
    await show.save();
    // get show hydrated with current user review
    show = await getShow(show._id, user);
    return res.status(200).send({ show });
  } catch (e) {
    return next(e);
  }
}

showController.deleteReview = async (req, res, next) => {
  let { user } = res.locals;
  let { id } = req.params;

  showModel.findById(id, async function (err, show) {
    if (err) {
      return next(err);
    }
    try {
      let userReview = show.reviews.find(
        review => review.user.toString() === user._id.toString()
      );
      await show.reviews.id(userReview._id).remove();
      // recalculate rating and review count of show
      show.reviewCount = show.reviews.length;
      if (show.reviewCount > 0) {
        show.ratings = show.reviews.reduce((sum, review) => review.rating + sum, 0) / show.reviewCount;
      } else {
        show.ratings = undefined;
      }

      await show.save();
      show = await getShow(show._id, user);
      return res.status(200).send({ show });
    } catch (e) {
      return next(e);
    }
  });
}

module.exports = showController; 
