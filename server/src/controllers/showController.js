const showModel = require('../models/show');

let showController = {};

showController.get = async (req, res, next) => {
  let { id } = req.params;
  let { user } = res.locals
  showModel.findById(id)
    .populate({ path: "reviews.user", select: ["_id", "name"] })
    .exec(function (err, show) {
      if (err) {
        return next(err);
      }

      // transforms
      show = show.toObject();
      if (user) {
        show.reviewOfAuthenticated = show.reviews.find(
          review => review.user.toString() === user._id.toString()
        );
      }
      res.status(200).send({ show });
    });
}

showController.review = async (req, res, next) => {
  let { user } = res.locals;
  let { comment, rating, } = req.body;
  let { id: showId } = req.params;
  try {
    const show = await showModel.findById(showId);
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
    return res.status(200).send({ show });
  } catch (e) {
    return next(e);
  }
}

module.exports = showController; 
