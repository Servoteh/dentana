import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const imgDir = path.join(root, 'img');

const jpgFiles = fs.readdirSync(imgDir).filter((f) => /\.jpe?g$/i.test(f));
let totalBefore = 0;
let totalAfter = 0;

for (const file of jpgFiles) {
  const input = path.join(imgDir, file);
  const base = file.replace(/\.jpe?g$/i, '');
  const webpOut = path.join(imgDir, `${base}.webp`);
  const jpgOut = path.join(imgDir, `${base}.jpg`);

  const before = fs.statSync(input).size;
  totalBefore += before;

  const pipeline = sharp(input).rotate();
  await pipeline.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(jpgOut + '.tmp');
  await pipeline.clone().webp({ quality: 80 }).toFile(webpOut);

  fs.renameSync(jpgOut + '.tmp', jpgOut);
  const after = fs.statSync(webpOut).size;
  totalAfter += after;
  console.log(`${file} -> ${base}.webp (${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB)`);
}

const hero = path.join(imgDir, 'img_02.jpg');
if (fs.existsSync(hero)) {
  await sharp(hero)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(path.join(root, 'og-image.jpg'));
  console.log('Created og-image.jpg (1200x630)');
}

const faviconSvg = path.join(root, 'favicon.svg');
if (fs.existsSync(faviconSvg)) {
  await sharp(faviconSvg).resize(32, 32).png().toFile(path.join(root, 'favicon-32.png'));
  await sharp(faviconSvg).resize(180, 180).png().toFile(path.join(root, 'apple-touch-icon.png'));
  await sharp(path.join(root, 'favicon-32.png')).toFile(path.join(root, 'favicon.ico'));
  console.log('Created favicon.ico and apple-touch-icon.png');
}

console.log(`\nWebP total: ${Math.round(totalBefore / 1024)}KB -> ${Math.round(totalAfter / 1024)}KB (${Math.round((1 - totalAfter / totalBefore) * 100)}% saved)`);
