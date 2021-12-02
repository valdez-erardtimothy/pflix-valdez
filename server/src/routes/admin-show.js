const express = require('express');
const router = express.Router();

const {
  list,
  create,
  destroy,
  read,
  update
} = require("../controllers/admin/showController");

router.route('/admin/shows')
  .get(list)
  .post(create);

router.route('/admin/shows/:id')
  .get(read)
  .delete(destroy)
  .patch(update);
module.exports = router;