/**
 * Generates the "How to Follow Forex Signals" hero/OG image.
 *
 * Matches the design language of existing ForexWizard blog images: dark brand
 * theme, an educational entry-zone visual (ENTRY ZONE / CURRENT PRICE / STOP /
 * TARGET — NO live prices, NO signal claims). Uses the official logo as a
 * small brand mark. Saves an in-page SVG hero, a 1200x630 JPG for OG/Twitter
 * previews, and responsive WebP variants (640/960/1200w). Uses sharp.
 *
 * Run: node scripts/create-how-to-follow-forex-signals-og.js
 */
/* eslint-disable @typescript-eslint/no-require-imports */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_BLOG_DIR = "/home/z/my-project/public/blog";
const SVG_OUT = path.join(PUBLIC_BLOG_DIR, "how-to-follow-forex-signals.svg");
const JPG_OUT = path.join(PUBLIC_BLOG_DIR, "how-to-follow-forex-signals.jpg");

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

  <!-- Decorative glows -->
  <circle cx="980" cy="120" r="220" fill="#ffd740" opacity="0.05"/>
  <circle cx="180" cy="540" r="180" fill="#00e676" opacity="0.05"/>

  <!-- Entry-zone visual (right side) — educational, no live prices -->
  <g transform="translate(660, 150)" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">
    <rect x="0" y="0" width="460" height="420" rx="20" fill="#ffffff" opacity="0.03" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>

    <!-- Price axis line -->
    <line x1="80" y1="50" x2="80" y2="380" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1"/>

    <!-- ENTRY ZONE band -->
    <rect x="90" y="120" width="340" height="60" fill="#00e676" opacity="0.1" rx="6"/>
    <text x="100" y="156" font-size="13" font-weight="700" fill="#00e676" letter-spacing="1">ENTRY ZONE</text>

    <!-- CURRENT PRICE marker -->
    <line x1="90" y1="240" x2="430" y2="240" stroke="#ffd740" stroke-width="2" stroke-dasharray="6 4" opacity="0.6"/>
    <circle cx="90" cy="240" r="5" fill="#ffd740" filter="url(#softGlow)"/>
    <text x="100" y="236" font-size="12" font-weight="700" fill="#ffd740">CURRENT PRICE</text>
    <text x="100" y="254" font-size="10" fill="#9ca3af">moved away from entry</text>

    <!-- STOP -->
    <line x1="90" y1="330" x2="430" y2="330" stroke="#ff7043" stroke-width="2" stroke-dasharray="4 4" opacity="0.5"/>
    <text x="100" y="326" font-size="12" font-weight="700" fill="#ff7043">STOP</text>

    <!-- TARGET -->
    <line x1="90" y1="70" x2="430" y2="70" stroke="#00e676" stroke-width="2" stroke-dasharray="4 4" opacity="0.5"/>
    <text x="100" y="66" font-size="12" font-weight="700" fill="#00e676">TARGET</text>

    <!-- Late-entry arrow -->
    <path d="M 380 210 L 380 235 L 375 230 M 380 235 L 385 230" stroke="#ffd740" stroke-width="2" fill="none" opacity="0.7"/>
    <text x="340" y="205" font-size="10" font-weight="600" fill="#ffd740" opacity="0.7" text-anchor="end">late entry?</text>
  </g>

  <!-- Brand row (official logo as small mark) -->
  <g>
    <circle cx="80" cy="70" r="9" fill="#00e676" filter="url(#softGlow)"/>
    <text x="100" y="78" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="800" fill="#f0f0f0" letter-spacing="-0.5">
      Forex <tspan fill="#00e676">Wizard</tspan>
    </text>
  </g>

  <!-- Eyebrow / section label -->
  <rect x="80" y="150" width="180" height="40" rx="20" fill="#ffd740" opacity="0.08" stroke="#ffd740" stroke-opacity="0.35" stroke-width="1"/>
  <text x="170" y="176" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#ffd740" text-anchor="middle" letter-spacing="1.5">
    EXECUTION GUIDE
  </text>

  <!-- Main title -->
  <text x="80" y="258" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="54" font-weight="900" fill="#f0f0f0" letter-spacing="-1.5">
    How to Follow
  </text>
  <text x="80" y="320" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="54" font-weight="900" letter-spacing="-1.5">
    <tspan fill="#00e676">Forex</tspan><tspan fill="#f0f0f0"> Signals</tspan>
  </text>

  <!-- Secondary line -->
  <text x="80" y="372" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="600" fill="#9ca3af">
    Entry Timing · Late Entries · Risk
  </text>

  <!-- Footer accent + disclaimer -->
  <rect x="80" y="600" width="1040" height="2" rx="1" fill="url(#greenGold)" opacity="0.4"/>
  <text x="80" y="624" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" fill="#6b7280">
    Educational guide · forexwizard.online · Not financial advice
  </text>
</svg>
`;

async function create() {
  if (!fs.existsSync(PUBLIC_BLOG_DIR)) {
    fs.mkdirSync(PUBLIC_BLOG_DIR, { recursive: true });
  }

  fs.writeFileSync(SVG_OUT, svg.trim(), "utf8");
  const svgSize = fs.statSync(SVG_OUT).size;
  console.log(`SVG saved: ${SVG_OUT} (${(svgSize / 1024).toFixed(1)} KB)`);

  await sharp(Buffer.from(svg.trim()))
    .flatten({ background: "#0a0a0f" })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(JPG_OUT);
  const jpgSize = fs.statSync(JPG_OUT).size;
  console.log(`JPG saved: ${JPG_OUT} (${(jpgSize / 1024).toFixed(1)} KB)`);

  const webpWidths = [640, 960, 1200];
  for (const w of webpWidths) {
    const out = path.join(
      PUBLIC_BLOG_DIR,
      `how-to-follow-forex-signals-${w}.webp`
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
