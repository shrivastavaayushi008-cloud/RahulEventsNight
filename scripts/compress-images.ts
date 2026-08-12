// Convert all images to optimized JPEG for faster loading
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOT = '/home/z/my-project/public/images';

async function convertDir(dir: string) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (!file.match(/\.png$/i)) continue;
    if (file.endsWith('.bak')) continue;
    const filepath = path.join(dir, file);
    const jpgPath = filepath.replace('.png', '.jpg');
    const bakPath = filepath + '.bak';

    // Use backup if exists (original), else use current
    const srcPath = fs.existsSync(bakPath) ? bakPath : filepath;
    const srcSize = fs.statSync(srcPath).size;

    try {
      const buf = fs.readFileSync(srcPath);
      let img = sharp(buf, { quality: 80 });
      const meta = await img.metadata();

      // Resize if width > 1024
      if (meta.width && meta.width > 1024) {
        img = img.resize(1024, null, { withoutEnlargement: true });
      }

      await img.jpeg({ quality: 72, progressive: true, mozjpeg: true }).toFile(jpgPath);
      const newSize = fs.statSync(jpgPath).size;

      // Remove the PNG, keep the JPG
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      if (fs.existsSync(bakPath)) fs.unlinkSync(bakPath);

      console.log(`${file} → ${file.replace('.png','.jpg')}: ${(srcSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB`);
    } catch (e: any) {
      console.error(`Error ${file}: ${e.message}`);
    }
  }
}

async function main() {
  console.log('Converting hero...');
  await convertDir(path.join(ROOT, 'hero'));
  console.log('\nConverting events...');
  await convertDir(path.join(ROOT, 'events'));
  console.log('\nConverting artists...');
  await convertDir(path.join(ROOT, 'artists'));
  console.log('\nDone!');
}

main();
