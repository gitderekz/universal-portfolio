import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

interface OptimizeResult {
  originalPath: string;
  thumbnailPath: string;
  originalUrl: string;
  thumbnailUrl: string;
}

export const optimizeImage = async (
  filePath: string,
  fileName: string
): Promise<OptimizeResult> => {
  const uploadDir = process.env.UPLOAD_PATH || './uploads';
  const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

  // Create thumbnails directory if it doesn't exist
  const thumbnailDir = path.join(uploadDir, 'thumbnails');
  try {
    await fs.access(thumbnailDir);
  } catch {
    await fs.mkdir(thumbnailDir, { recursive: true });
  }

  // Generate thumbnail
  const thumbnailFileName = `thumb_${fileName}`;
  const thumbnailPath = path.join(thumbnailDir, thumbnailFileName);

  await sharp(filePath)
    .resize(300, 300, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .jpeg({ quality: 80 })
    .toFile(thumbnailPath);

  // Optimize original image
  await sharp(filePath)
    .jpeg({ quality: 90 })
    .toFile(filePath + '.tmp');

  // Replace original with optimized version
  await fs.rename(filePath + '.tmp', filePath);

  return {
    originalPath: filePath,
    thumbnailPath,
    originalUrl: `${baseUrl}/uploads/${fileName}`,
    thumbnailUrl: `${baseUrl}/uploads/thumbnails/${thumbnailFileName}`
  };
};
