import express from 'express';
import {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember
} from '../controllers/teamController';
import { protect, authorize } from '../middleware/auth';
import { validateTeamMember } from '../middleware/validate';

const router = express.Router();

// Public routes
router.get('/', getAllMembers);
router.get('/:id', getMemberById);

// Protected routes (Admin/Editor only)
router.post('/', protect, authorize(['admin', 'editor']), validateTeamMember, createMember);
router.put('/:id', protect, authorize(['admin', 'editor']), updateMember);
router.delete('/:id', protect, authorize(['admin']), deleteMember);

export default router;
