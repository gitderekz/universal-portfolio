import express from 'express';
import authRoutes from './auth';
import pageRoutes from './pages';
import projectRoutes from './projects';
import contactRoutes from './contact';
import mediaRoutes from './media';
import professionRoutes from './professions';
import blogRoutes from './blog';
import serviceRoutes from './services';
import teamRoutes from './team';
import testimonialRoutes from './testimonials';
import settingRoutes from './settings';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/pages', pageRoutes);
router.use('/projects', projectRoutes);
router.use('/contact', contactRoutes);
router.use('/media', mediaRoutes);
router.use('/professions', professionRoutes);
router.use('/blog', blogRoutes);
router.use('/services', serviceRoutes);
router.use('/team', teamRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/settings', settingRoutes);

export default router;
