const express = require('express');
const router = express.Router();
const { 
  uploadMedia, 
  getMediaFiles, 
  getMediaFile, 
  deleteMediaFile 
} = require('../controllers/mediaController');
const { protect, authorize } = require('../middleware/auth');
const { uploadSingle } = require('../utils/upload');

// Protected routes
router.use(protect);
router.use(authorize('media.*'));

router.post('/upload', uploadSingle('file'), uploadMedia);
router.get('/', getMediaFiles);
router.get('/:id', getMediaFile);
router.delete('/:id', deleteMediaFile);

module.exports = router;