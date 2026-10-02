/**
 * Generates the "Best Time to Trade Forex" hero/OG image.
 * Dark ForexWizard brand theme with a 24-hour session timeline visual
 * (Sydney → Tokyo → London → New York with overlap). No live prices.
 * Uses sharp.
 *
 * Run: node scripts/create-best-time-to-trade-forex-og.js
 */
/* eslint-disable @typescript-eslint/no-require-imports */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_BLOG_DIR = "/home/z/my-project/public/blog";
const SVG_OUT = path.join(PUBLIC_BLOG_DIR, "best-time-to-trade-forex.svg");
const JPG_OUT = path.join(PUBLIC_BLOG_DIR, "best-time-to-trade-forex.jpg");

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
  <circle cx="980" cy="120" r="220" fill="#00e676" opacity="0.05"/>
  <circle cx="180" cy="540" r="180" fill="#ffd740" opacity="0.05"/>

  <!-- 24-hour session timeline (right side) -->
  <g transform="translate(660, 170)" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">
    <rect x="0" y="0" width="460" height="390" rx="20" fill="#ffffff" opacity="0.03" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>

    <!-- Timeline bar -->
    <rect x="30" y="80" width="400" height="16" rx="8" fill="#ffffff" opacity="0.05"/>

    <!-- Sydney band -->
    <rect x="30" y="80" width="100" height="16" rx="8" fill="#9ca3af" opacity="0.3"/>
    <text x="80" y="70" font-size="11" font-weight="700" fill="#9ca3af" text-anchor="middle">SYDNEY</text>

    <!-- Tokyo band -->
    <rect x="90" y="80" width="100" height="16" fill="#ffd740" opacity="0.3"/>
    <text x="140" y="70" font-size="11" font-weight="700" fill="#ffd740" text-anchor="middle">TOKYO</text>

    <!-- London band -->
    <rect x="190" y="80" width="120" height="16" fill="#00e676" opacity="0.3"/>
    <text x="250" y="70" font-size="11" font-weight="700" fill="#00e676" text-anchor="middle">LONDON</text>

    <!-- New York band -->
    <rect x="270" y="80" width="130" height="16" rx="0" fill="#00e676" opacity="0.4"/>
    <text x="335" y="70" font-size="11" font-weight="700" fill="#00e676" text-anchor="middle">NEW YORK</text>

    <!-- Overlap highlight -->
    <rect x="270" y="76" width="40" height="24" fill="none" stroke="#00e676" stroke-width="2" rx="4" opacity="0.6"/>
    <text x="290" y="120" font-size="10" font-weight="600" fill="#00e676" text-anchor="middle" opacity="0.7">overlap</text>

    <!-- Session times -->
    <text x="80" y="150" font-size="10" fill="#6b7280" text-anchor="middle">~22:00–07:00 UTC</text>
    <text x="140" y="150" font-size="10" fill="#6b7280" text-anchor="middle">~00:00–09:00 UTC</text>
    <text x="250" y="150" font-size="10" fill="#6b7280" text-anchor="middle">~07:00–16:00 UTC</text>
    <text x="335" y="150" font-size="10" fill="#6b7280" text-anchor="middle">~12:00–21:00 UTC</text>

    <!-- 24h label -->
    <text x="230" y="200" font-size="14" font-weight="600" fill="#9ca3af" text-anchor="middle">24-Hour Forex Market</text>
    <text x="230" y="225" font-size="12" fill="#6b7280" text-anchor="middle">Times shift with daylight-saving changes</text>

    <!-- Key pairs -->
    <text x="230" y="280" font-size="13" font-weight="700" fill="#ffd740" text-anchor="middle">ACTIVE PAIRS BY SESSION</text>
    <text x="230" y="305" font-size="11" fill="#9ca3af" text-anchor="middle">Tokyo: USD/JPY · AUD/JPY · EUR/JPY</text>
    <text x="230" y="325" font-size="11" fill="#9ca3af" text-anchor="middle">London: EUR/USD · GBP/USD · EUR/GBP</text>
    <text x="230" y="345" font-size="11" fill="#9ca3af" text-anchor="middle">New York: USD/CAD · EUR/USD · GBP/USD</text>
  </g>

  <!-- Brand row -->
  <g>
    <circle cx="80" cy="70" r="9" fill="#00e676" filter="url(#softGlow)"/>
    <text x="100" y="78" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="800" fill="#f0f0f0" letter-spacing="-0.5">
      Forex <tspan fill="#00e676">Wizard</tspan>
    </text>
  </g>

  <!-- Eyebrow -->
  <rect x="80" y="150" width="180" height="40" rx="20" fill="#00e676" opacity="0.08" stroke="#00e676" stroke-opacity="0.35" stroke-width="1"/>
  <text x="170" y="176" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#00e676" text-anchor="middle" letter-spacing="1.5">
    FOREX SESSIONS GUIDE
  </text>

  <!-- Main title -->
  <text x="80" y="258" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="54" font-weight="900" fill="#f0f0f0" letter-spacing="-1.5">
    Best Time to
  </text>
  <text x="80" y="320" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="54" font-weight="900" letter-spacing="-1.5">
    <tspan fill="#00e676">Trade</tspan><tspan fill="#f0f0f0"> Forex</tspan>
  </text>

  <!-- Secondary -->
  <text x="80" y="372" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="600" fill="#9ca3af">
    Sessions · Overlaps · Currency Pairs
  </text>

  <!-- Footer -->
  <rect x="80" y="600" width="1040" height="2" rx="1" fill="url(#greenGold)" opacity="0.4"/>
  <text x="80" y="624" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" fill="#6b7280">
    Educational guide · forexwizard.online · Not financial advice
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
    const out = path.join(PUBLIC_BLOG_DIR, `best-time-to-trade-forex-${w}.webp`);
    await sharp(Buffer.from(svg.trim())).resize({ width: w }).webp({ quality: 82 }).toFile(out);
    console.log(`WebP ${w}w saved: ${out} (${(fs.statSync(out).size / 1024).toFixed(1)} KB)`);
  }
}

create().catch((e) => { console.error(e); process.exit(1); });
