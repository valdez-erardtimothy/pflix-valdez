const express = require('express');
const router = express.Router();
const requireAuthMiddleware = require('../middleware/require-auth');
const requireAdminMiddleware = require('../middleware/require-admin');

router.use("/admin", requireAuthMiddleware());
router.use("/admin", requireAdminMiddleware());

const {
  loadDashboard
} = require("../controllers/admin/dashboardController");


router.get('/admin/dashboard', loadDashboard);

module.exports = router;