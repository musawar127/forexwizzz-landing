/* eslint-disable @typescript-eslint/no-require-imports */

const sharp = require('sharp');
const path = require('path');

const OUT = '/home/z/my-project/public/og-image.jpg';

const WIDTH = 1200;
const HEIGHT = 630;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a1a"/>
      <stop offset="100%" style="stop-color:#0f1a0a"/>
    </linearGradient>
    <linearGradient id="greenGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00e676"/>
      <stop offset="100%" style="stop-color:#ffd740"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" rx="0"/>

  <!-- Subtle grid lines -->
  ${Array.from({length: 12}, (_, i) => {
    const x = 50 + i * 100;
    const y1 = 450 + Math.sin(i * 0.8) * 30;
    const y2 = y1 + 20 + Math.random() * 40;
    const green = i % 2 === 0;
    return `
    <line x1="${x+6}" y1="${y1 - 40}" x2="${x+6}" y2="${y1 + 20}" stroke="${green ? '#00e676' : '#ff1744'}" stroke-width="1.5" opacity="0.25"/>
    <rect x="${x}" y="${Math.min(y1, y2)}" width="12" height="${Math.abs(y2 - y1) || 8}" fill="${green ? '#00e676' : '#ff1744'}" opacity="0.3" rx="1"/>`;
  }).join('')}

  <!-- Decorative circles -->
  <circle cx="900" cy="150" r="200" fill="#00e676" opacity="0.03"/>
  <circle cx="300" cy="500" r="150" fill="#ffd740" opacity="0.03"/>

  <!-- Brand name -->
  <text x="600" y="220" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="72" font-weight="900" fill="#f0f0f0" text-anchor="middle" letter-spacing="-1">
    ForexWizzz
  </text>

  <!-- Tagline with gradient -->
  <text x="600" y="310" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="36" font-weight="700" text-anchor="middle">
    <tspan fill="#00e676">Forex</tspan>
    <tspan fill="#9ca3af"> &amp; </tspan>
    <tspan fill="#ffd740">Gold Trading</tspan>
  </text>

  <!-- Subtitle -->
  <text x="600" y="370" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="500" fill="#9ca3af" text-anchor="middle">
    Telegram Community
  </text>

  <!-- Bottom accent line -->
  <rect x="450" y="410" width="300" height="3" rx="1.5" fill="url(#greenGold)" opacity="0.6" filter="url(#glow)"/>

  <!-- Bottom text -->
  <text x="600" y="460" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#6b7280" text-anchor="middle">
    Free signals  ·  Market analysis  ·  XAUUSD  ·  Educational content
  </text>
</svg>
`;

async function create() {
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(OUT);
  const fs = require('fs');
  const size = fs.statSync(OUT).size;
  console.log(`og-image.jpg created: ${(size / 1024).toFixed(1)} KB`);
}

create().catch(e => console.error(e));
