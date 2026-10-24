/**
 * Generates the "Forex Risk Management for Beginners" hero/OG image.
 *
 * Dark ForexWizard brand theme with a risk-flow diagram:
 * RISK AMOUNT -> STOP DISTANCE -> POSITION SIZE. Uses the official logo
 * as a small brand mark. No live prices, no profit claims. Uses sharp.
 *
 * Run: node scripts/create-forex-risk-management-og.js
 */
/* eslint-disable @typescript-eslint/no-require-imports */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_BLOG_DIR = "/home/z/my-project/public/blog";
const SVG_OUT = path.join(PUBLIC_BLOG_DIR, "forex-risk-management-for-beginners.svg");
const JPG_OUT = path.join(PUBLIC_BLOG_DIR, "forex-risk-management-for-beginners.jpg");

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
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <circle cx="980" cy="120" r="220" fill="#ff7043" opacity="0.05"/>
  <circle cx="180" cy="540" r="180" fill="#00e676" opacity="0.05"/>

  <!-- Risk-flow diagram (right side) -->
  <g transform="translate(700, 150)" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">
    <rect x="0" y="0" width="420" height="420" rx="20" fill="#ffffff" opacity="0.03" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>

    <!-- Step 1: RISK AMOUNT -->
    <rect x="60" y="30" width="300" height="70" rx="12" fill="#ff7043" opacity="0.12" stroke="#ff7043" stroke-opacity="0.3" stroke-width="1"/>
    <text x="210" y="58" font-size="13" font-weight="700" fill="#ff7043" text-anchor="middle" letter-spacing="1.2">STEP 1</text>
    <text x="210" y="82" font-size="18" font-weight="800" fill="#f0f0f0" text-anchor="middle">RISK AMOUNT</text>

    <!-- Arrow -->
    <path d="M 210 105 L 210 125 L 205 120 M 210 125 L 215 120" stroke="#9ca3af" stroke-width="2" fill="none" opacity="0.5"/>

    <!-- Step 2: STOP DISTANCE -->
    <rect x="60" y="135" width="300" height="70" rx="12" fill="#ffd740" opacity="0.12" stroke="#ffd740" stroke-opacity="0.3" stroke-width="1"/>
    <text x="210" y="163" font-size="13" font-weight="700" fill="#ffd740" text-anchor="middle" letter-spacing="1.2">STEP 2</text>
    <text x="210" y="187" font-size="18" font-weight="800" fill="#f0f0f0" text-anchor="middle">STOP DISTANCE</text>

    <!-- Arrow -->
    <path d="M 210 210 L 210 230 L 205 225 M 210 230 L 215 225" stroke="#9ca3af" stroke-width="2" fill="none" opacity="0.5"/>

    <!-- Step 3: POSITION SIZE -->
    <rect x="60" y="240" width="300" height="70" rx="12" fill="#00e676" opacity="0.12" stroke="#00e676" stroke-opacity="0.3" stroke-width="1"/>
    <text x="210" y="268" font-size="13" font-weight="700" fill="#00e676" text-anchor="middle" letter-spacing="1.2">STEP 3</text>
    <text x="210" y="292" font-size="18" font-weight="800" fill="#f0f0f0" text-anchor="middle">POSITION SIZE</text>

    <!-- Note -->
    <text x="210" y="360" font-size="11" font-weight="500" fill="#6b7280" text-anchor="middle">Risk first &#8594; Stop &#8594; Lot size</text>
    <text x="210" y="380" font-size="11" font-weight="500" fill="#6b7280" text-anchor="middle">Not lot size first</text>
  </g>

  <!-- Brand row -->
  <g>
    <circle cx="80" cy="70" r="9" fill="#00e676" filter="url(#softGlow)"/>
    <text x="100" y="78" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="800" fill="#f0f0f0" letter-spacing="-0.5">
      Forex <tspan fill="#00e676">Wizard</tspan>
    </text>
  </g>

  <!-- Eyebrow -->
  <rect x="80" y="150" width="180" height="40" rx="20" fill="#ff7043" opacity="0.08" stroke="#ff7043" stroke-opacity="0.35" stroke-width="1"/>
  <text x="170" y="176" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#ff7043" text-anchor="middle" letter-spacing="1.5">
    BEGINNER GUIDE
  </text>

  <!-- Main title -->
  <text x="80" y="258" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="54" font-weight="900" fill="#f0f0f0" letter-spacing="-1.5">
    Forex Risk
  </text>
  <text x="80" y="320" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="54" font-weight="900" fill="#ff7043" letter-spacing="-1.5">
    Management
  </text>

  <!-- Secondary -->
  <text x="80" y="372" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="600" fill="#9ca3af">
    Lot Size &#183; Stop Loss &#183; Position Risk
  </text>

  <!-- Footer -->
  <rect x="80" y="600" width="1040" height="2" rx="1" fill="url(#greenGold)" opacity="0.4"/>
  <text x="80" y="624" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" fill="#6b7280">
    Educational guide &#183; forexwizard.online &#183; Not financial advice
  </text>
</svg>
`;

async function create() {
  if (!fs.existsSync(PUBLIC_BLOG_DIR)) fs.mkdirSync(PUBLIC_BLOG_DIR, { recursive: true });

  fs.writeFileSync(SVG_OUT, svg.trim(), "utf8");
  console.log(`SVG saved: ${SVG_OUT} (${(fs.statSync(SVG_OUT).size / 1024).toFixed(1)} KB)`);

  await sharp(Buffer.from(svg.trim())).flatten({ background: "#0a0a0f" }).jpeg({ quality: 85, mozjpeg: true }).toFile(JPG_OUT);
  console.log(`JPG saved: ${JPG_OUT} (${(fs.statSync(JPG_OUT).size / 1024).toFixed(1)} KB)`);

  for (const w of [640, 960, 1200]) {
    const out = path.join(PUBLIC_BLOG_DIR, `forex-risk-management-for-beginners-${w}.webp`);
    await sharp(Buffer.from(svg.trim())).resize({ width: w }).webp({ quality: 82 }).toFile(out);
    console.log(`WebP ${w}w saved: ${out} (${(fs.statSync(out).size / 1024).toFixed(1)} KB)`);
  }
}

create().catch((e) => { console.error(e); process.exit(1); });
