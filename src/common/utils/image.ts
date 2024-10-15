import imageSize from 'image-size';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

export function getImageAttributes(imagePath: string) {
  const name = path.basename(imagePath);
  const extName = path.extname(imagePath);
  const { width, height } = imageSize(imagePath);
  return { name, extName, width, height };
}

// 计算图片的哈希值
export function calculateImageHash(imagePath: string) {
  const data = fs.readFileSync(imagePath);
  return crypto.createHash('sha256').update(data).digest('hex');
}

// 支持的图片类型
export const ImageExt = ['.jpg', '.jpeg', '.png', '.bmq', '.webp'];
