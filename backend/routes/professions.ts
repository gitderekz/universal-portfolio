import express from 'express';
import * as professionController from '../controllers/professionController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', professionController.getProfessions);
router.get('/:id', professionController.getProfession);
router.get('/slug/:slug', professionController.getProfessionBySlug);
router.post('/', protect, authorize('professions.create'), professionController.createProfession);
router.put('/:id', protect, authorize('professions.update'), professionController.updateProfession);
router.delete('/:id', protect, authorize('professions.delete'), professionController.deleteProfession);

export default router;
