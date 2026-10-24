/**
 * Generates the Risk of Ruin Calculator OG image. 1200×630, dark theme.
 * Run: node scripts/create-risk-of-ruin-og.js
 */
/* eslint-disable @typescript-eslint/no-require-imports */

const sharp = require("sharp");
const fs = require("fs");

const OUT = "/home/z/my-project/public/og-risk-of-ruin-calculator.jpg";
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

  <!-- Decorative equity curve with drawdown -->
  <g opacity="0.18">
    <path d="M940 160 Q970 150 990 170 T1030 200 T1070 260 T1100 320" stroke="#ffd740" stroke-width="2" fill="none"/>
    <path d="M1100 320 L1080 340 L1060 360 L1080 300 L1100 280" stroke="#00e676" stroke-width="2" fill="none"/>
  </g>

  <circle cx="180" cy="540" r="180" fill="#00e676" opacity="0.05"/>
  <circle cx="200" cy="120" r="120" fill="#ffd740" opacity="0.06"/>

  <!-- Brand -->
  <g>
    <circle cx="80" cy="70" r="9" fill="#00e676" filter="url(#softGlow)"/>
    <text x="100" y="78" font-family="system-ui,sans-serif" font-size="26" font-weight="800" fill="#f0f0f0" letter-spacing="-0.5">
      Forex <tspan fill="#00e676">Wizard</tspan>
    </text>
  </g>

  <!-- Eyebrow -->
  <rect x="80" y="150" width="220" height="40" rx="20" fill="#ffd740" opacity="0.08" stroke="#ffd740" stroke-opacity="0.35" stroke-width="1"/>
  <text x="190" y="176" font-family="system-ui,sans-serif" font-size="18" font-weight="700" fill="#ffd740" text-anchor="middle" letter-spacing="1.5">
    FREE CALCULATOR
  </text>

  <!-- Title -->
  <text x="80" y="262" font-family="system-ui,sans-serif" font-size="54" font-weight="900" fill="#f0f0f0" letter-spacing="-1.5">
    Risk of Ruin
  </text>
  <text x="80" y="330" font-family="system-ui,sans-serif" font-size="54" font-weight="900" letter-spacing="-1.5">
    <tspan fill="#ffd740">Calculator</tspan>
  </text>

  <!-- Subtitle -->
  <text x="80" y="378" font-family="system-ui,sans-serif" font-size="22" font-weight="600" fill="#9ca3af">
    Win Rate · Losing Streak · Drawdown
  </text>

  <!-- Metrics -->
  <g font-family="system-ui,sans-serif">
    <rect x="80" y="420" width="250" height="110" rx="16" fill="#ffffff" opacity="0.04" stroke="#ff5252" stroke-opacity="0.25" stroke-width="1"/>
    <text x="100" y="458" font-size="13" font-weight="700" fill="#9ca3af" letter-spacing="1.2">THRESHOLD-HIT</text>
    <text x="100" y="512" font-size="36" font-weight="900" fill="#ff5252">7.4%</text>

    <rect x="348" y="420" width="250" height="110" rx="16" fill="#ffffff" opacity="0.04" stroke="#ffd740" stroke-opacity="0.25" stroke-width="1"/>
    <text x="368" y="458" font-size="13" font-weight="700" fill="#9ca3af" letter-spacing="1.2">5-LOSS STREAK</text>
    <text x="368" y="512" font-size="36" font-weight="900" fill="#ffd740">81.5%</text>

    <rect x="616" y="420" width="250" height="110" rx="16" fill="#ffffff" opacity="0.04" stroke="#00e676" stroke-opacity="0.25" stroke-width="1"/>
    <text x="636" y="458" font-size="13" font-weight="700" fill="#9ca3af" letter-spacing="1.2">RECOVERY (30%)</text>
    <text x="636" y="512" font-size="36" font-weight="900" fill="#00e676">42.9%</text>
  </g>

  <!-- Footer -->
  <rect x="80" y="580" width="1040" height="2" rx="1" fill="url(#greenGold)" opacity="0.4"/>
  <text x="80" y="608" font-family="system-ui,sans-serif" font-size="13" font-weight="500" fill="#6b7280">
    Educational risk model · forexwizard.online · Not financial advice
  </text>
</svg>
`;

async function create() {
  await sharp(Buffer.from(svg.trim()))
    .flatten({ background: "#0a0a0f" })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(OUT);
  const size = fs.statSync(OUT).size;
  console.log(`JPG saved: ${OUT} (${(size / 1024).toFixed(1)} KB)`);
}

create().catch((e) => { console.error(e); process.exit(1); });
