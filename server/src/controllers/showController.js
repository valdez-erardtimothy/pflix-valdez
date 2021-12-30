const showModel = require('../models/show');

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
      .exec(function (err, show) {
        if (err) {
          return reject(err);
        }
        // transforms
        show = show.toObject();
        if (user) {
          show.reviewOfAuthenticated = show.reviews.find(
            review => review.user._id.toString() === user._id.toString()
          );
        }
        console.debug('show inside internal method: ', show);
        return resolve(show);
      });
  })
}

/* controller methods */
let showController = {};


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
    console.debug('show:', show)
    console.debug('show reviews:', show.reviews);
    let reviewed = show.reviews.find(rev => rev.user.toString() === user._id.toString());
    console.debug('reviewed:', reviewed);
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

module.exports = showController; 
