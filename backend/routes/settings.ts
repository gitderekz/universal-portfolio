import express from 'express';
import {
  getAllSettings,
  getSettingByKey,
  createSetting,
  updateSetting,
  updateMultipleSettings,
  deleteSetting
} from '../controllers/settingController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Protected routes (Admin only)
router.get('/', protect, authorize('settings.*'), getAllSettings);
router.get('/:key', protect, authorize('settings.*'), getSettingByKey);
router.post('/', protect, authorize('settings.*'), createSetting);
router.put('/bulk', protect, authorize('settings.*'), updateMultipleSettings);
router.put('/:key', protect, authorize('settings.*'), updateSetting);
router.delete('/:key', protect, authorize('settings.*'), deleteSetting);

export default router;
