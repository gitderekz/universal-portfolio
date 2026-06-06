import express from 'express';
import {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController';
import { protect, authorize } from '../middleware/auth';
import { validateTestimonial } from '../middleware/validate';

const router = express.Router();

// Public routes
router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);

// Protected routes (Admin/Editor only)
router.post('/', protect, authorize(['admin', 'editor']), validateTestimonial, createTestimonial);
router.put('/:id', protect, authorize(['admin', 'editor']), updateTestimonial);
router.delete('/:id', protect, authorize(['admin']), deleteTestimonial);

export default router;
