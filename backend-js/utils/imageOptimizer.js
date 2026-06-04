const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

const optimizeImage = async (filePath, fileName) => {
  try {
    const uploadDir = process.env.UPLOAD_PATH || './uploads';
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

    // Create thumbnails directory if it doesn't exist
    const thumbnailDir = path.join(uploadDir, 'thumbnails');
    try {
      await fs.access(thumbnailDir);
    } catch {
      await fs.mkdir(thumbnailDir, { recursive: true });
    }

    const originalPath = filePath;
    const relativePath = path.relative(process.cwd(), filePath);
    
    // Generate thumbnail
    const thumbnailFileName = `thumb_${fileName}`;
    const thumbnailPath = path.join(thumbnailDir, thumbnailFileName);

    // Get image metadata
    const metadata = await sharp(filePath).metadata();
    
    // Generate thumbnail (max 300x300)
    await sharp(filePath)
      .resize(300, 300, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 80 })
      .toFile(thumbnailPath);

    // Optimize original image based on format
    const ext = path.extname(filePath).toLowerCase();
    const optimizedPath = filePath + '.optimized';
    
    if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(filePath)
        .jpeg({ quality: 85, progressive: true })
        .toFile(optimizedPath);
    } else if (ext === '.png') {
      await sharp(filePath)
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(optimizedPath);
    } else if (ext === '.webp') {
      await sharp(filePath)
        .webp({ quality: 85 })
        .toFile(optimizedPath);
    } else {
      // For other formats, just copy
      await fs.copyFile(filePath, optimizedPath);
    }

    // Replace original with optimized version
    await fs.unlink(filePath);
    await fs.rename(optimizedPath, filePath);

    // Generate URLs
    const originalUrl = `${baseUrl}/uploads/${fileName}`;
    const thumbnailUrl = `${baseUrl}/uploads/thumbnails/${thumbnailFileName}`;

    return {
      originalPath: filePath,
      thumbnailPath: thumbnailPath,
      originalUrl: originalUrl,
      thumbnailUrl: thumbnailUrl,
      width: metadata.width,
      height: metadata.height,
      size: (await fs.stat(filePath)).size
    };
  } catch (error) {
    console.error('Image optimization error:', error);
    // Return original file info if optimization fails
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    return {
      originalPath: filePath,
      thumbnailPath: filePath,
      originalUrl: `${baseUrl}/uploads/${fileName}`,
      thumbnailUrl: `${baseUrl}/uploads/${fileName}`,
      error: error.message
    };
  }
};

const deleteImageFiles = async (originalPath, thumbnailPath) => {
  try {
    if (originalPath && await fs.access(originalPath).then(() => true).catch(() => false)) {
      await fs.unlink(originalPath);
    }
    if (thumbnailPath && await fs.access(thumbnailPath).then(() => true).catch(() => false)) {
      await fs.unlink(thumbnailPath);
    }
    return true;
  } catch (error) {
    console.error('Error deleting image files:', error);
    return false;
  }
};

module.exports = {
  optimizeImage,
  deleteImageFiles
};