/**
 * Generates the XAUUSD Support and Resistance hero/OG image.
 *
 * Approach: build a self-contained SVG using the ForexWizard dark brand style,
 * save it as a crisp in-page hero (.svg) and rasterize to 1200x630 JPG for
 * Open Graph / Twitter previews, plus responsive WebP variants (640/960/1200w)
 * for the in-page <picture> srcset. No external assets, no copyrighted charts.
 * Uses sharp (already a project dependency).
 *
 * Run: node scripts/create-support-resistance-og.js
 */
/* eslint-disable @typescript-eslint/no-require-imports */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_BLOG_DIR = "/home/z/my-project/public/blog";
const SVG_OUT = path.join(PUBLIC_BLOG_DIR, "xauusd-support-and-resistance.svg");
const JPG_OUT = path.join(PUBLIC_BLOG_DIR, "xauusd-support-and-resistance.jpg");

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

  <!-- Stylized gold price chart (right side, educational, no live trade) -->
  <g transform="translate(640, 180)">
    <!-- Chart background panel -->
    <rect x="0" y="0" width="480" height="380" rx="16" fill="#ffffff" opacity="0.03" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>

    <!-- Resistance zone (gold, upper) -->
    <rect x="20" y="70" width="440" height="34" fill="#ffd740" opacity="0.12" rx="4"/>
    <line x1="20" y1="87" x2="460" y2="87" stroke="#ffd740" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.6"/>
    <text x="450" y="64" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#ffd740" text-anchor="end" letter-spacing="0.5">RESISTANCE</text>

    <!-- Support zone (green, lower) -->
    <rect x="20" y="270" width="440" height="34" fill="#00e676" opacity="0.12" rx="4"/>
    <line x1="20" y1="287" x2="460" y2="287" stroke="#00e676" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.6"/>
    <text x="450" y="324" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#00e676" text-anchor="end" letter-spacing="0.5">SUPPORT</text>

    <!-- Price path: bounce off support → rise → reject at resistance → break through → retest -->
    <polyline points="40,300 90,290 140,295 190,280 240,200 290,100 340,110 390,85 440,60 440,50"
      fill="none" stroke="#f0f0f0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>

    <!-- Breakout arrow (small, educational) -->
    <circle cx="440" cy="50" r="5" fill="#00e676" filter="url(#softGlow)"/>

    <!-- Retest annotation -->
    <line x1="390" y1="85" x2="390" y2="87" stroke="#9ca3af" stroke-width="1" opacity="0.4"/>
    <text x="370" y="50" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="600" fill="#9ca3af" opacity="0.7">breakout</text>
  </g>

  <!-- Brand row -->
  <g>
    <circle cx="80" cy="70" r="9" fill="#00e676" filter="url(#softGlow)"/>
    <text x="100" y="78" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="800" fill="#f0f0f0" letter-spacing="-0.5">
      Forex <tspan fill="#00e676">Wizard</tspan>
    </text>
  </g>

  <!-- Eyebrow / section label -->
  <rect x="80" y="150" width="190" height="40" rx="20" fill="#ffd740" opacity="0.08" stroke="#ffd740" stroke-opacity="0.35" stroke-width="1"/>
  <text x="175" y="176" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#ffd740" text-anchor="middle" letter-spacing="1.5">
    EDUCATIONAL GUIDE
  </text>

  <!-- Main title -->
  <text x="80" y="260" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="56" font-weight="900" fill="#f0f0f0" letter-spacing="-1.5">
    XAUUSD
  </text>
  <text x="80" y="324" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="56" font-weight="900" letter-spacing="-1.5">
    <tspan fill="#ffd740">Support</tspan><tspan fill="#f0f0f0"> &amp; </tspan><tspan fill="#00e676">Resistance</tspan>
  </text>

  <!-- Subtitle -->
  <text x="80" y="378" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="600" fill="#9ca3af">
    How to mark key gold levels
  </text>

  <!-- Key concept chips -->
  <g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">
    <rect x="80" y="420" width="150" height="44" rx="22" fill="#ffffff" opacity="0.04" stroke="#ffd740" stroke-opacity="0.25" stroke-width="1"/>
    <text x="155" y="448" font-size="15" font-weight="700" fill="#ffd740" text-anchor="middle">Key Zones</text>

    <rect x="245" y="420" width="150" height="44" rx="22" fill="#ffffff" opacity="0.04" stroke="#00e676" stroke-opacity="0.25" stroke-width="1"/>
    <text x="320" y="448" font-size="15" font-weight="700" fill="#00e676" text-anchor="middle">Breakouts</text>

    <rect x="410" y="420" width="150" height="44" rx="22" fill="#ffffff" opacity="0.04" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1"/>
    <text x="485" y="448" font-size="15" font-weight="700" fill="#f0f0f0" text-anchor="middle">Retests</text>
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
      `xauusd-support-and-resistance-${w}.webp`
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
