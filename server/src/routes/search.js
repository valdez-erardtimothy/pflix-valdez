const express = require('express');
const router = express.Router();


const {
  search
} = require("../controllers/searchController");

router.route('/search')
  .get(search)

module.exports = router;