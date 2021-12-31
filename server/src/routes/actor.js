const express = require('express');
const router = express.Router();

const loadAuthenticated = require('../middleware/loadAuthenticated');
const requireAuthenticated = require('../middleware/require-auth');
// load authenticated user (if authenticated)
router.use(loadAuthenticated());

const {
  get,
  review,
  deleteReview
} = require("../controllers/actorController");

router.route('/actors/:id')
  .get(get)

router.route('/actors/:id/reviews')
  .post(requireAuthenticated(), review)
  .delete(requireAuthenticated(), deleteReview);

module.exports = router;