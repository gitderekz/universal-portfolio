const express = require('express');
const router = express.Router();
const { 
  getPages, 
  getPage, 
  getPageBySlug, 
  createPage, 
  updatePage, 
  deletePage 
} = require('../controllers/pageController');
const { protect, authorize } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// Public routes
router.get('/', getPages);
router.get('/slug/:slug', getPageBySlug);
router.get('/:id', getPage);

// Protected routes
router.post('/', protect, authorize('pages.create'), validate(schemas.createPage), createPage);
router.put('/:id', protect, authorize('pages.update'), validate(schemas.createPage), updatePage);
router.delete('/:id', protect, authorize('pages.delete'), deletePage);

module.exports = router;