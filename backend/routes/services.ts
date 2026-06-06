import express from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController';
import { protect, authorize } from '../middleware/auth';
import { validateService } from '../middleware/validate';

const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/:id', getServiceById);

// Protected routes (Admin/Editor only)
router.post('/', protect, authorize('services.view'), validateService, createService);
router.put('/:id', protect, authorize('services.update'), updateService);
router.delete('/:id', protect, authorize('services.delete'), deleteService);

export default router;
