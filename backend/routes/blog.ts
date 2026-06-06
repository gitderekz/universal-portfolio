import express from 'express';
import {
  getAllPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getCategories,
  getTags
} from '../controllers/blogController';
import { protect, authorize } from '../middleware/auth';
import { validateBlogPost } from '../middleware/validate';

const router = express.Router();

// Public routes
router.get('/', getAllPosts);
router.get('/categories', getCategories);
router.get('/tags', getTags);
router.get('/slug/:slug', getPostBySlug);
router.get('/:id', getPostById);

// Protected routes (Admin/Editor only)
router.post('/', protect, authorize('blog.view'), validateBlogPost, createPost);
router.put('/:id', protect, authorize('blog.update'), updatePost);
router.delete('/:id', protect, authorize('blog.delete'), deletePost);

export default router;
