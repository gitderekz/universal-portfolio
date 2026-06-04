const express = require('express');
const router = express.Router();
const { 
  getBlogPosts, 
  getBlogPost, 
  getBlogPostBySlug,
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost 
} = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getBlogPosts);
router.get('/slug/:slug', getBlogPostBySlug);
router.get('/:id', getBlogPost);

// Protected routes
router.post('/', protect, authorize('blogs.*'), createBlogPost);
router.put('/:id', protect, authorize('blogs.*'), updateBlogPost);
router.delete('/:id', protect, authorize('blogs.*'), deleteBlogPost);

module.exports = router;