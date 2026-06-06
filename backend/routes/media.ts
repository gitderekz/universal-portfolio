import express from 'express';
import * as mediaController from '../controllers/mediaController';
import { protect, authorize } from '../middleware/auth';
import { upload } from '../utils/upload';

const router = express.Router();

router.post('/', protect, authorize('media.upload'), upload.single('file'), mediaController.uploadMedia);
router.get('/', protect, authorize('media.view'), mediaController.getMediaFiles);
router.get('/:id', protect, authorize('media.view'), mediaController.getMediaFile);
router.delete('/:id', protect, authorize('media.delete'), mediaController.deleteMediaFile);

export default router;
