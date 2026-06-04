const { MediaFile } = require('../models');
const { optimizeImage } = require('../utils/imageOptimizer');

const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { category, alt, title, description } = req.body;

    // Optimize image
    const optimized = await optimizeImage(req.file.path, req.file.filename);

    // Create media record
    const mediaFile = await MediaFile.create({
      userId: req.user.id,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: optimized.originalPath,
      thumbnailPath: optimized.thumbnailPath,
      url: optimized.originalUrl,
      thumbnailUrl: optimized.thumbnailUrl,
      category,
      alt,
      title,
      description
    });

    res.status(201).json({
      success: true,
      media: mediaFile
    });
  } catch (error) {
    next(error);
  }
};

const getMediaFiles = async (req, res, next) => {
  try {
    const { category } = req.query;

    const where = {};
    if (category) where.category = category;

    const mediaFiles = await MediaFile.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: mediaFiles.length,
      media: mediaFiles
    });
  } catch (error) {
    next(error);
  }
};

const getMediaFile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const mediaFile = await MediaFile.findByPk(id);

    if (!mediaFile) {
      return res.status(404).json({
        success: false,
        message: 'Media file not found'
      });
    }

    res.status(200).json({
      success: true,
      media: mediaFile
    });
  } catch (error) {
    next(error);
  }
};

const deleteMediaFile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const mediaFile = await MediaFile.findByPk(id);

    if (!mediaFile) {
      return res.status(404).json({
        success: false,
        message: 'Media file not found'
      });
    }

    // TODO: Delete actual files from disk
    // const fs = require('fs').promises;
    // await fs.unlink(mediaFile.path);
    // if (mediaFile.thumbnailPath) await fs.unlink(mediaFile.thumbnailPath);

    await mediaFile.destroy();

    res.status(200).json({
      success: true,
      message: 'Media file deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadMedia,
  getMediaFiles,
  getMediaFile,
  deleteMediaFile
};