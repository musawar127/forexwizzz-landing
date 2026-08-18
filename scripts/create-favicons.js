const sharp = require('sharp');
const fs = require('fs');

const BASE = '/home/z/my-project/public';

// Favicon SVG — green circle with "FW" in dark text (ForexWizzz initials)
const faviconSvg = `
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00e676"/>
      <stop offset="100%" stop-color="#00c853"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#g)"/>
  <text x="32" y="42" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" fill="#0a0a0f" text-anchor="middle" letter-spacing="-0.5">FW</text>
</svg>
`;

// Apple touch icon — same but 180x180
const appleSvg = `
<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00e676"/>
      <stop offset="100%" stop-color="#00c853"/>
    </linearGradient>
  </defs>
  <rect width="180" height="180" rx="40" fill="url(#g)"/>
  <text x="90" y="118" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="80" font-weight="900" fill="#0a0a0f" text-anchor="middle" letter-spacing="-1">FW</text>
</svg>
`;

async function createFavicons() {
  // Generate 32x32 PNG for favicon.ico
  const png32 = await sharp(Buffer.from(faviconSvg))
    .resize(32, 32)
    .png()
    .toBuffer();

  // Create ICO from the 32x32 PNG (simple ICO format with 1 image)
  // ICO header: 6 bytes, then 16 bytes per entry
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // type: icon
  icoHeader.writeUInt16LE(1, 4); // count: 1

  const icoEntry = Buffer.alloc(16);
  icoEntry.writeUInt8(32, 0);   // width
  icoEntry.writeUInt8(32, 1);   // height
  icoEntry.writeUInt8(0, 2);    // palette
  icoEntry.writeUInt8(0, 3);    // reserved
  icoEntry.writeUInt16LE(1, 4); // color planes
  icoEntry.writeUInt16LE(32, 6);// bits per pixel
  icoEntry.writeUInt32LE(png32.length, 8); // image size
  icoEntry.writeUInt32LE(22, 12); // offset (6 header + 16 entry)

  const ico = Buffer.concat([icoHeader, icoEntry, png32]);
  fs.writeFileSync(`${BASE}/favicon.ico`, ico);
  console.log(`favicon.ico: ${(ico.length / 1024).toFixed(1)} KB`);

  // Apple touch icon
  await sharp(Buffer.from(appleSvg))
    .resize(180, 180)
    .png()
    .toFile(`${BASE}/apple-touch-icon.png`);
  const appleSize = fs.statSync(`${BASE}/apple-touch-icon.png`).size;
  console.log(`apple-touch-icon.png: ${(appleSize / 1024).toFixed(1)} KB`);

  console.log('Done.');
}

createFavicons().catch(e => console.error(e));
