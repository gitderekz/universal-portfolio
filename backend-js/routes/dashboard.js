const express = require('express');
const router = express.Router();
const { 
  getDashboardStats, 
  getRecentActivities,
  getChartsData
} = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

// All dashboard routes require authentication
router.use(protect);
router.use(authorize('dashboard.*'));

router.get('/stats', getDashboardStats);
router.get('/activities', getRecentActivities);
router.get('/charts', getChartsData);

module.exports = router;