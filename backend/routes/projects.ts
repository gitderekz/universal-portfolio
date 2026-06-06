import express from 'express';
import * as projectController from '../controllers/projectController';
import { protect, authorize } from '../middleware/auth';
import { validate, schemas } from '../middleware/validate';

const router = express.Router();

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProject);
router.post('/', protect, authorize('projects.create'), validate(schemas.createProject), projectController.createProject);
router.put('/:id', protect, authorize('projects.update'), projectController.updateProject);
router.delete('/:id', protect, authorize('projects.delete'), projectController.deleteProject);

export default router;
