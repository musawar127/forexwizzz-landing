/**
 * Generates the XAUUSD Weekly Outlook (Sep 21-25, 2026) hero/OG image.
 *
 * Matches the design language of the Sep 14-18 weekly outlook image: dark
 * ForexWizard brand theme, candlestick decoration, key support/resistance
 * levels, catalyst label. Saves an in-page SVG hero, a 1200x630 JPG for OG /
 * Twitter previews, and responsive WebP variants (640/960/1200w) for the
 * in-page <picture> srcset. No external assets, no copyrighted charts.
 * Uses sharp (already a project dependency).
 *
 * Run: node scripts/create-weekly-outlook-sep-21-25-og.js
 */
/* eslint-disable @typescript-eslint/no-require-imports */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_BLOG_DIR = "/home/z/my-project/public/blog";
const SVG_OUT = path.join(
  PUBLIC_BLOG_DIR,
  "xauusd-weekly-outlook-sep-21-25-2026.svg"
);
const JPG_OUT = path.join(
  PUBLIC_BLOG_DIR,
  "xauusd-weekly-outlook-sep-21-25-2026.jpg"
);

const WIDTH = 1200;
const HEIGHT = 630;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0f"/>
      <stop offset="55%" style="stop-color:#0d0f16"/>
      <stop offset="100%" style="stop-color:#0a0a0f"/>
    </linearGradient>
    <linearGradient id="greenGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00e676"/>
      <stop offset="100%" style="stop-color:#ffd740"/>
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="b"/>
      <feMerge>
        <feMergeNode in="b"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>

  <!-- Decorative candlesticks (subtle, educational, no directional signal) -->
  ${Array.from({ length: 22 }, (_, i) => {
    const x = 40 + i * 52;
    const baseY = 150 + (i % 5) * 6;
    const h = 24 + ((i * 41) % 60);
    const y = baseY + ((i * 17) % 30);
    const green = (i + 2) % 3 !== 0; // slight recovery bias vs prev week
    const color = green ? "#00e676" : "#ffd740";
    return `
    <line x1="${x}" y1="${y - 18}" x2="${x}" y2="${y + h + 18}" stroke="${color}" stroke-width="1.5" opacity="0.18"/>
    <rect x="${x - 7}" y="${y}" width="14" height="${h}" fill="${color}" opacity="0.22" rx="2"/>`;
  }).join("")}

  <!-- Decorative glows -->
  <circle cx="980" cy="120" r="220" fill="#ffd740" opacity="0.05"/>
  <circle cx="180" cy="540" r="180" fill="#00e676" opacity="0.05"/>

  <!-- Brand row -->
  <g>
    <circle cx="80" cy="70" r="9" fill="#00e676" filter="url(#softGlow)"/>
    <text x="100" y="78" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="800" fill="#f0f0f0" letter-spacing="-0.5">
      Forex <tspan fill="#00e676">Wizard</tspan>
    </text>
  </g>

  <!-- Eyebrow / section label -->
  <rect x="80" y="150" width="230" height="40" rx="20" fill="#ffd740" opacity="0.08" stroke="#ffd740" stroke-opacity="0.35" stroke-width="1"/>
  <text x="195" y="176" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#ffd740" text-anchor="middle" letter-spacing="1.5">
    WEEKLY MARKET OUTLOOK
  </text>

  <!-- Main title -->
  <text x="80" y="270" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="64" font-weight="900" fill="#f0f0f0" letter-spacing="-1.5">
    XAUUSD Weekly
  </text>
  <text x="80" y="344" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="64" font-weight="900" letter-spacing="-1.5">
    <tspan fill="#ffd740">Outlook</tspan><tspan fill="#f0f0f0"> · Gold Plan</tspan>
  </text>

  <!-- Date range -->
  <text x="80" y="398" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="600" fill="#9ca3af">
    September 21–25, 2026
  </text>

  <!-- Key levels row -->
  <g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">
    <!-- 4340 Support -->
    <rect x="80" y="448" width="300" height="118" rx="16" fill="#ffffff" opacity="0.04" stroke="#ffd740" stroke-opacity="0.25" stroke-width="1"/>
    <text x="100" y="488" font-size="14" font-weight="700" fill="#9ca3af" letter-spacing="1.2">KEY SUPPORT</text>
    <text x="100" y="544" font-size="40" font-weight="900" fill="#ffd740">$4,340</text>

    <!-- 4430 Resistance -->
    <rect x="400" y="448" width="300" height="118" rx="16" fill="#ffffff" opacity="0.04" stroke="#00e676" stroke-opacity="0.25" stroke-width="1"/>
    <text x="420" y="488" font-size="14" font-weight="700" fill="#9ca3af" letter-spacing="1.2">KEY RESISTANCE</text>
    <text x="420" y="544" font-size="40" font-weight="900" fill="#00e676">$4,430</text>

    <!-- Post-Fed context -->
    <rect x="720" y="448" width="400" height="118" rx="16" fill="#ffffff" opacity="0.04" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1"/>
    <circle cx="752" cy="488" r="6" fill="#00e676"/>
    <text x="770" y="494" font-size="14" font-weight="700" fill="#9ca3af" letter-spacing="1.2">CONTEXT</text>
    <text x="740" y="544" font-size="30" font-weight="900" fill="#f0f0f0">Post-Fed · Recovery Test</text>
  </g>

  <!-- Footer accent + disclaimer -->
  <rect x="80" y="600" width="1040" height="2" rx="1" fill="url(#greenGold)" opacity="0.4"/>
  <text x="80" y="624" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" fill="#6b7280">
    Educational market analysis · forexwizard.online · Not financial advice
  </text>
</svg>
`;

async function create() {
  if (!fs.existsSync(PUBLIC_BLOG_DIR)) {
    fs.mkdirSync(PUBLIC_BLOG_DIR, { recursive: true });
  }

  // 1. Save the SVG (crisp, lightweight in-page hero).
  fs.writeFileSync(SVG_OUT, svg.trim(), "utf8");
  const svgSize = fs.statSync(SVG_OUT).size;
  console.log(`SVG saved: ${SVG_OUT} (${(svgSize / 1024).toFixed(1)} KB)`);

  // 2. Rasterize to JPG for Open Graph / Twitter previews.
  await sharp(Buffer.from(svg.trim()))
    .flatten({ background: "#0a0a0f" })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(JPG_OUT);
  const jpgSize = fs.statSync(JPG_OUT).size;
  console.log(`JPG saved: ${JPG_OUT} (${(jpgSize / 1024).toFixed(1)} KB)`);

  // 3. Responsive WebP variants for <picture> srcset.
  const webpWidths = [640, 960, 1200];
  for (const w of webpWidths) {
    const out = path.join(
      PUBLIC_BLOG_DIR,
      `xauusd-weekly-outlook-sep-21-25-2026-${w}.webp`
    );
    await sharp(Buffer.from(svg.trim()))
      .resize({ width: w })
      .webp({ quality: 82 })
      .toFile(out);
    const size = fs.statSync(out).size;
    console.log(`WebP ${w}w saved: ${out} (${(size / 1024).toFixed(1)} KB)`);
  }
}

create().catch((e) => {
  console.error(e);
  process.exit(1);
});
