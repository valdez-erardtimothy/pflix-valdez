const express = require('express');
const router = express.Router();
const requireAuthMiddleware = require('../middleware/require-auth');
const requireAdminMiddleware = require('../middleware/require-admin');

router.use("/admin", requireAuthMiddleware());
router.use("/admin", requireAdminMiddleware());

const {
  list,
  create,
  read,
  update
} = require("../controllers/admin/actorController");

router.route('/admin/actors')
  .get(list)
  .post(create);

router.route('/admin/actors/:id')
  .get(read)
  //   .delete(destroy)
  .patch(update);

module.exports = router;