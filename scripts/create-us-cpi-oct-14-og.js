/**
 * Generates the US CPI October 14 2026 Gold XAUUSD article OG image. 1200×630.
 * Run: node scripts/create-us-cpi-oct-14-og.js
 */
/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_BLOG_DIR = "/home/z/my-project/public/blog";
const SVG_OUT = path.join(PUBLIC_BLOG_DIR, "us-cpi-october-14-2026-gold-xauusd.svg");
const JPG_OUT = path.join(PUBLIC_BLOG_DIR, "us-cpi-october-14-2026-gold-xauusd.jpg");

const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
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

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Downward gold price motif -->
  <g opacity="0.15">
    <path d="M940 180 Q970 200 985 230 T1015 290 T1045 360 T1075 430" stroke="#ff5252" stroke-width="2.5" fill="none"/>
    <circle cx="1075" cy="430" r="4" fill="#ff5252" opacity="0.5"/>
  </g>

  <circle cx="180" cy="540" r="180" fill="#ffd740" opacity="0.05"/>
  <circle cx="200" cy="120" r="120" fill="#00e676" opacity="0.06"/>

  <!-- Brand -->
  <g>
    <circle cx="80" cy="70" r="9" fill="#00e676" filter="url(#softGlow)"/>
    <text x="100" y="78" font-family="system-ui,sans-serif" font-size="26" font-weight="800" fill="#f0f0f0" letter-spacing="-0.5">
      Forex <tspan fill="#00e676">Wizard</tspan>
    </text>
  </g>

  <!-- Eyebrow -->
  <rect x="80" y="150" width="280" height="40" rx="20" fill="#ff5252" opacity="0.08" stroke="#ff5252" stroke-opacity="0.35" stroke-width="1"/>
  <text x="220" y="176" font-family="system-ui,sans-serif" font-size="18" font-weight="700" fill="#ff5252" text-anchor="middle" letter-spacing="1.5">
    US INFLATION · XAUUSD
  </text>

  <!-- Title -->
  <text x="80" y="262" font-family="system-ui,sans-serif" font-size="56" font-weight="900" fill="#f0f0f0" letter-spacing="-1.5">
    US CPI 3.7%
  </text>
  <text x="80" y="330" font-family="system-ui,sans-serif" font-size="56" font-weight="900" letter-spacing="-1.5">
    <tspan fill="#ff5252">Gold Reacts</tspan>
  </text>

  <!-- Date -->
  <text x="80" y="378" font-family="system-ui,sans-serif" font-size="22" font-weight="600" fill="#9ca3af">
    October 14, 2026 · September 2026 CPI Report
  </text>

  <!-- Metrics -->
  <g font-family="system-ui,sans-serif">
    <rect x="80" y="420" width="250" height="110" rx="16" fill="#ffffff" opacity="0.04" stroke="#ff5252" stroke-opacity="0.25" stroke-width="1"/>
    <text x="100" y="458" font-size="13" font-weight="700" fill="#9ca3af" letter-spacing="1.2">HEADLINE CPI</text>
    <text x="100" y="512" font-size="36" font-weight="900" fill="#ff5252">3.7%</text>

    <rect x="348" y="420" width="250" height="110" rx="16" fill="#ffffff" opacity="0.04" stroke="#ffd740" stroke-opacity="0.25" stroke-width="1"/>
    <text x="368" y="458" font-size="13" font-weight="700" fill="#9ca3af" letter-spacing="1.2">CORE CPI</text>
    <text x="368" y="512" font-size="36" font-weight="900" fill="#ffd740">2.6%</text>

    <rect x="616" y="420" width="250" height="110" rx="16" fill="#ffffff" opacity="0.04" stroke="#00e676" stroke-opacity="0.25" stroke-width="1"/>
    <text x="636" y="458" font-size="13" font-weight="700" fill="#9ca3af" letter-spacing="1.2">GOLD (SPOT)</text>
    <text x="636" y="512" font-size="36" font-weight="900" fill="#00e676">$4,086</text>
  </g>

  <!-- Footer -->
  <rect x="80" y="580" width="1040" height="2" rx="1" fill="url(#greenGold)" opacity="0.4"/>
  <text x="80" y="608" font-family="system-ui,sans-serif" font-size="13" font-weight="500" fill="#6b7280">
    CPI analysis · forexwizard.online · Not financial advice
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
    const out = path.join(PUBLIC_BLOG_DIR, `us-cpi-october-14-2026-gold-xauusd-${w}.webp`);
    await sharp(Buffer.from(svg.trim())).resize({ width: w }).webp({ quality: 82 }).toFile(out);
    console.log(`WebP ${w}w saved: ${out} (${(fs.statSync(out).size / 1024).toFixed(1)} KB)`);
  }
}
create().catch(e => { console.error(e); process.exit(1); });
