const express = require('express');
const router = express.Router();
const { 
  getMenus, 
  getMenu, 
  createMenu, 
  updateMenu, 
  deleteMenu 
} = require('../controllers/menuController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getMenus);
router.get('/:id', getMenu);

// Protected routes
router.post('/', protect, authorize('menus.*'), createMenu);
router.put('/:id', protect, authorize('menus.*'), updateMenu);
router.delete('/:id', protect, authorize('menus.*'), deleteMenu);

module.exports = router;