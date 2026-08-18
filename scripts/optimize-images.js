const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const BASE = '/home/z/my-project';
const images = [
  'public/earning-1.jpg',
  'public/earning-2.jpg',
  'public/earning-3.jpg',
  'public/earning-4.jpg',
  'public/earning-5.jpg',
  'public/telegram-screenshot.jpg',
];

async function optimize() {
  for (const img of images) {
    const full = path.join(BASE, img);
    if (!fs.existsSync(full)) {
      console.log(`SKIP (not found): ${img}`);
      continue;
    }
    const origSize = fs.statSync(full).size;
    const tmp = full + '.tmp';
    await sharp(full)
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toFile(tmp);
    const newSize = fs.statSync(tmp).size;
    fs.renameSync(tmp, full);
    const reduction = ((1 - newSize / origSize) * 100).toFixed(1);
    console.log(`${img}: ${origSize} -> ${newSize} bytes (${reduction}% reduction)`);
  }
  console.log('\nDone.');
}

optimize().catch(e => console.error(e));
