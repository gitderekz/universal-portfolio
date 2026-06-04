const express = require('express');
const router = express.Router();

// Import all route modules
const authRoutes = require('./auth');
const userRoutes = require('./users');
const professionRoutes = require('./professions');
const pageRoutes = require('./pages');
const pageSectionRoutes = require('./pageSections');
const menuRoutes = require('./menus');
const menuItemRoutes = require('./menuItems');
const projectRoutes = require('./projects');
const blogRoutes = require('./blogs');
const contactRoutes = require('./contacts');
const mediaRoutes = require('./media');
const settingRoutes = require('./settings');
const serviceRoutes = require('./services');
const testimonialRoutes = require('./testimonials');
const teamRoutes = require('./teams');
const dashboardRoutes = require('./dashboard');

// Public routes
router.use('/auth', authRoutes);
router.use('/contacts', contactRoutes);
router.use('/professions', professionRoutes);
router.use('/pages', pageRoutes);
router.use('/projects', projectRoutes);
router.use('/blogs', blogRoutes);
router.use('/services', serviceRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/teams', teamRoutes);

// Protected routes (require authentication)
router.use('/users', userRoutes);
router.use('/media', mediaRoutes);
router.use('/menus', menuRoutes);
router.use('/menu-items', menuItemRoutes);
router.use('/page-sections', pageSectionRoutes);
router.use('/settings', settingRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;