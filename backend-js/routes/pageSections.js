const express = require('express');
const router = express.Router();
const { 
  getPageSections, 
  getPageSection, 
  createPageSection, 
  updatePageSection, 
  deletePageSection,
  reorderSections
} = require('../controllers/pageSectionController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/page/:pageId', getPageSections);
router.get('/:id', getPageSection);

// Protected routes
router.post('/', protect, authorize('pages.*'), createPageSection);
router.put('/:id', protect, authorize('pages.*'), updatePageSection);
router.delete('/:id', protect, authorize('pages.*'), deletePageSection);
router.post('/reorder', protect, authorize('pages.*'), reorderSections);

module.exports = router;