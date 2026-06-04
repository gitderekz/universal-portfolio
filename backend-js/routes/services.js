const express = require('express');
const router = express.Router();
const { 
  getServices, 
  getService, 
  getServiceBySlug,
  createService, 
  updateService, 
  deleteService 
} = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getServices);
router.get('/slug/:slug', getServiceBySlug);
router.get('/:id', getService);

// Protected routes
router.post('/', protect, authorize('services.*'), createService);
router.put('/:id', protect, authorize('services.*'), updateService);
router.delete('/:id', protect, authorize('services.*'), deleteService);

module.exports = router;