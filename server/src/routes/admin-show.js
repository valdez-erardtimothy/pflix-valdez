const express = require('express');
const router = express.Router();

const {
  list,
  create
} = require("../controllers/admin/showController");

router.route('/admin/shows')
  .get(list)
  .post(create);
module.exports = router;