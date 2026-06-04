const express = require('express');
const router = express.Router();
const { 
  getProjects, 
  getProject, 
  getProjectBySlug,
  createProject, 
  updateProject, 
  deleteProject 
} = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// Public routes
router.get('/', getProjects);
router.get('/slug/:slug', getProjectBySlug);
router.get('/:id', getProject);

// Protected routes
router.post('/', protect, authorize('projects.create'), validate(schemas.createProject), createProject);
router.put('/:id', protect, authorize('projects.update'), validate(schemas.createProject), updateProject);
router.delete('/:id', protect, authorize('projects.delete'), deleteProject);

module.exports = router;