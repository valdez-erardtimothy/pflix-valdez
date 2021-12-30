const express = require('express');
const router = express.Router();

const loadAuthenticated = require('../middleware/loadAuthenticated');
const requireAuthenticated = require('../middleware/require-auth');
// load authenticated user (if authenticated)
router.use(loadAuthenticated());

const {
  get,
  review
} = require("../controllers/showController");

router.route('/shows/:id')
  .get(get)

router.route('/shows/:id/reviews')
  .get()
  .post(requireAuthenticated(), review);

module.exports = router;