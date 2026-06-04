const express = require('express');
const router = express.Router();
const { 
  getTestimonials, 
  getTestimonial, 
  createTestimonial, 
  updateTestimonial, 
  deleteTestimonial 
} = require('../controllers/testimonialController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getTestimonials);
router.get('/:id', getTestimonial);

// Protected routes
router.post('/', protect, authorize('testimonials.*'), createTestimonial);
router.put('/:id', protect, authorize('testimonials.*'), updateTestimonial);
router.delete('/:id', protect, authorize('testimonials.*'), deleteTestimonial);

module.exports = router;