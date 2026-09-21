/**
 * Generates the XAUUSD Fundamental Analysis hero/OG image.
 *
 * Matches the design language of the existing ForexWizard blog images: dark
 * brand theme, candlestick decoration, macro theme (Fed / USD / Yields).
 * Saves an in-page SVG hero, a 1200x630 JPG for OG/Twitter previews, and
 * responsive WebP variants (640/960/1200w) for the in-page <picture> srcset.
 * No external assets, no copyrighted charts. Uses sharp.
 *
 * Run: node scripts/create-fundamental-analysis-og.js
 */
/* eslint-disable @typescript-eslint/no-require-imports */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_BLOG_DIR = "/home/z/my-project/public/blog";
const SVG_OUT = path.join(PUBLIC_BLOG_DIR, "xauusd-fundamental-analysis.svg");
const JPG_OUT = path.join(PUBLIC_BLOG_DIR, "xauusd-fundamental-analysis.jpg");

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

  <!-- Decorative candlesticks (subtle, educational) -->
  ${Array.from({ length: 22 }, (_, i) => {
    const x = 40 + i * 52;
    const baseY = 150 + (i % 5) * 6;
    const h = 24 + ((i * 43) % 60);
    const y = baseY + ((i * 19) % 30);
    const green = i % 3 !== 1;
    const color = green ? "#00e676" : "#ffd740";
    return `
    <line x1="${x}" y1="${y - 18}" x2="${x}" y2="${y + h + 18}" stroke="${color}" stroke-width="1.5" opacity="0.18"/>
    <rect x="${x - 7}" y="${y}" width="14" height="${h}" fill="${color}" opacity="0.22" rx="2"/>`;
  }).join("")}

  <!-- Decorative glows -->
  <circle cx="980" cy="120" r="220" fill="#ffd740" opacity="0.05"/>
  <circle cx="180" cy="540" r="180" fill="#00e676" opacity="0.05"/>

  <!-- Macro theme panel (right side): Fed / USD / Yields -->
  <g transform="translate(640, 170)" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">
    <rect x="0" y="0" width="480" height="380" rx="16" fill="#ffffff" opacity="0.03" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>

    <!-- Fed row -->
    <rect x="24" y="28" width="432" height="92" rx="12" fill="#ffffff" opacity="0.03"/>
    <circle cx="60" cy="74" r="18" fill="#00e676" opacity="0.12" stroke="#00e676" stroke-opacity="0.4" stroke-width="1"/>
    <text x="60" y="80" font-size="16" font-weight="800" fill="#00e676" text-anchor="middle">Fed</text>
    <text x="96" y="66" font-size="13" font-weight="700" fill="#f0f0f0">Federal Reserve</text>
    <text x="96" y="88" font-size="12" fill="#9ca3af">Rate policy · FOMC · Forward guidance</text>

    <!-- USD row -->
    <rect x="24" y="140" width="432" height="92" rx="12" fill="#ffffff" opacity="0.03"/>
    <circle cx="60" cy="186" r="18" fill="#ffd740" opacity="0.12" stroke="#ffd740" stroke-opacity="0.4" stroke-width="1"/>
    <text x="60" y="192" font-size="15" font-weight="800" fill="#ffd740" text-anchor="middle">$</text>
    <text x="96" y="178" font-size="13" font-weight="700" fill="#f0f0f0">US Dollar</text>
    <text x="96" y="200" font-size="12" fill="#9ca3af">DXY · Inverse relationship with gold</text>

    <!-- Yields row -->
    <rect x="24" y="252" width="432" height="92" rx="12" fill="#ffffff" opacity="0.03"/>
    <circle cx="60" cy="298" r="18" fill="#00e676" opacity="0.12" stroke="#00e676" stroke-opacity="0.4" stroke-width="1"/>
    <text x="60" y="304" font-size="14" font-weight="800" fill="#00e676" text-anchor="middle">%</text>
    <text x="96" y="290" font-size="13" font-weight="700" fill="#f0f0f0">Treasury Yields</text>
    <text x="96" y="312" font-size="12" fill="#9ca3af">Nominal &amp; real yields · Opportunity cost</text>
  </g>

  <!-- Brand row -->
  <g>
    <circle cx="80" cy="70" r="9" fill="#00e676" filter="url(#softGlow)"/>
    <text x="100" y="78" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="800" fill="#f0f0f0" letter-spacing="-0.5">
      Forex <tspan fill="#00e676">Wizard</tspan>
    </text>
  </g>

  <!-- Eyebrow / section label -->
  <rect x="80" y="150" width="250" height="40" rx="20" fill="#ffd740" opacity="0.08" stroke="#ffd740" stroke-opacity="0.35" stroke-width="1"/>
  <text x="205" y="176" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#ffd740" text-anchor="middle" letter-spacing="1.5">
    EVERGREEN EDUCATIONAL GUIDE
  </text>

  <!-- Main title -->
  <text x="80" y="258" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="56" font-weight="900" fill="#f0f0f0" letter-spacing="-1.5">
    XAUUSD
  </text>
  <text x="80" y="320" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="56" font-weight="900" letter-spacing="-1.5">
    <tspan fill="#ffd740">Fundamental</tspan>
  </text>
  <text x="80" y="382" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="56" font-weight="900" fill="#f0f0f0" letter-spacing="-1.5">
    Analysis
  </text>

  <!-- Subtitle line -->
  <text x="80" y="432" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="600" fill="#9ca3af">
    Fed · USD · Yields · Inflation · Jobs
  </text>

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
      `xauusd-fundamental-analysis-${w}.webp`
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
