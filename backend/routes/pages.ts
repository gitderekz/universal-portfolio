import express from 'express';
import * as pageController from '../controllers/pageController';
import { protect, authorize } from '../middleware/auth';
import { validate, schemas } from '../middleware/validate';

const router = express.Router();

router.get('/', pageController.getPages);
router.get('/:id', pageController.getPage);
router.get('/slug/:slug', pageController.getPageBySlug);
router.post('/', protect, authorize('pages.create'), validate(schemas.createPage), pageController.createPage);
router.put('/:id', protect, authorize('pages.update'), pageController.updatePage);
router.delete('/:id', protect, authorize('pages.delete'), pageController.deletePage);

export default router;
