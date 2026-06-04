const express = require('express');
const router = express.Router();
const { 
  getSettings, 
  getSetting, 
  createSetting, 
  updateSetting, 
  deleteSetting 
} = require('../controllers/settingController');
const { protect, authorize } = require('../middleware/auth');

// Public routes (only public settings)
router.get('/public', getSettings);
router.get('/:key', getSetting);

// Protected routes
router.use(protect);
router.use(authorize('settings.*'));

router.get('/', getSettings);
router.post('/', createSetting);
router.put('/:key', updateSetting);
router.delete('/:key', deleteSetting);

module.exports = router;