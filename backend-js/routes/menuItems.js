const express = require('express');
const router = express.Router();
const { 
  getMenuItems, 
  getMenuItem, 
  createMenuItem, 
  updateMenuItem, 
  deleteMenuItem 
} = require('../controllers/menuItemController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/menu/:menuId', getMenuItems);
router.get('/:id', getMenuItem);

// Protected routes
router.post('/', protect, authorize('menus.*'), createMenuItem);
router.put('/:id', protect, authorize('menus.*'), updateMenuItem);
router.delete('/:id', protect, authorize('menus.*'), deleteMenuItem);

module.exports = router;