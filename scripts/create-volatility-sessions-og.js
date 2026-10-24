/**
 * Generates the XAUUSD Volatility Trading Sessions hero/OG image.
 *
 * Approach: build a self-contained SVG using the ForexWizard dark brand style
 * showing three session periods (ASIA → LONDON → NEW YORK) with increasing
 * volatility + a visible London/New York overlap. Saves an in-page SVG hero
 * (.svg), a 1200x630 JPG for Open Graph/Twitter previews, and responsive WebP
 * variants (640/960/1200w) for the in-page <picture> srcset. No external
 * assets, no copyrighted charts. Uses sharp (already a project dependency).
 *
 * Run: node scripts/create-volatility-sessions-og.js
 */
/* eslint-disable @typescript-eslint/no-require-imports */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_BLOG_DIR = "/home/z/my-project/public/blog";
const SVG_OUT = path.join(
  PUBLIC_BLOG_DIR,
  "xauusd-volatility-trading-sessions.svg"
);
const JPG_OUT = path.join(
  PUBLIC_BLOG_DIR,
  "xauusd-volatility-trading-sessions.jpg"
);

const WIDTH = 1200;
const HEIGHT = 630;

// Session-band palette (matches dark brand theme).
const ASIA = "#9ca3af"; // muted (contained)
const LONDON = "#ffd740"; // gold (rising activity)
const NY = "#00e676"; // green (event-driven)
const OVERLAP = "#ffffff"; // white accent for overlap band

// Generate stylized candlesticks per session band.
// Asia: small bodies, contained. London: larger bodies, directional. NY: largest, event spike.
function candlesticks(x0, y0, w, count, seed, color, scale) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const step = w / count;
  let out = "";
  for (let i = 0; i < count; i++) {
    const cx = x0 + i * step + step / 2;
    const dir = rand() > 0.45 ? 1 : -1;
    const bodyH = Math.max(6, (4 + rand() * 16) * scale);
    const wickH = bodyH + 6 + rand() * 14 * scale;
    const cy = y0 + (rand() - 0.5) * 10 * scale;
    const top = cy - bodyH / 2;
    const green = dir > 0;
    const c = green ? color : "#ff7043";
    out += `<line x1="${cx}" y1="${cy - wickH / 2}" x2="${cx}" y2="${
      cy + wickH / 2
    }" stroke="${c}" stroke-width="1.5" opacity="0.5"/>`;
    out += `<rect x="${cx - step * 0.28}" y="${top}" width="${
      step * 0.56
    }" height="${bodyH}" fill="${c}" opacity="0.7" rx="1"/>`;
  }
  return out;
}

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
  <circle cx="980" cy="120" r="220" fill="#00e676" opacity="0.05"/>
  <circle cx="180" cy="540" r="180" fill="#ffd740" opacity="0.05"/>

  <!-- Session chart panel (right side) -->
  <g transform="translate(620, 170)">
    <rect x="0" y="0" width="500" height="380" rx="16" fill="#ffffff" opacity="0.03" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>

    <!-- Session band labels (top) -->
    <text x="85" y="34" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="${ASIA}" text-anchor="middle" letter-spacing="1">ASIA</text>
    <text x="215" y="34" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="${LONDON}" text-anchor="middle" letter-spacing="1">LONDON</text>
    <text x="360" y="34" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="${NY}" text-anchor="middle" letter-spacing="1">NEW YORK</text>

    <!-- Session band separators -->
    <line x1="150" y1="50" x2="150" y2="350" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1" stroke-dasharray="3 4"/>
    <line x1="280" y1="50" x2="280" y2="350" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1" stroke-dasharray="3 4"/>

    <!-- London/NY overlap highlight band -->
    <rect x="280" y="50" width="80" height="300" fill="${OVERLAP}" opacity="0.04"/>
    <text x="320" y="346" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="600" fill="${OVERLAP}" opacity="0.6" text-anchor="middle">overlap</text>

    <!-- Candlesticks: Asia (small, contained), London (larger), NY (largest + event) -->
    ${candlesticks(20, 200, 130, 5, 17, ASIA, 0.55)}
    ${candlesticks(155, 195, 125, 5, 41, LONDON, 0.9)}
    ${candlesticks(285, 185, 175, 7, 83, NY, 1.25)}
  </g>

  <!-- Brand row -->
  <g>
    <circle cx="80" cy="70" r="9" fill="#00e676" filter="url(#softGlow)"/>
    <text x="100" y="78" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="800" fill="#f0f0f0" letter-spacing="-0.5">
      Forex <tspan fill="#00e676">Wizard</tspan>
    </text>
  </g>

  <!-- Eyebrow / section label -->
  <rect x="80" y="150" width="220" height="40" rx="20" fill="#00e676" opacity="0.08" stroke="#00e676" stroke-opacity="0.35" stroke-width="1"/>
  <text x="190" y="176" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#00e676" text-anchor="middle" letter-spacing="1.5">
    TRADING SESSIONS GUIDE
  </text>

  <!-- Main title -->
  <text x="80" y="258" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="50" font-weight="900" fill="#f0f0f0" letter-spacing="-1.5">
    XAUUSD Volatility
  </text>
  <text x="80" y="316" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="50" font-weight="900" letter-spacing="-1.5">
    <tspan fill="#f0f0f0">by Trading </tspan><tspan fill="#ffd740">Session</tspan>
  </text>

  <!-- Subtitle -->
  <text x="80" y="366" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="600" fill="#9ca3af">
    Asian, London &amp; New York sessions explained
  </text>

  <!-- Session chips -->
  <g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">
    <rect x="80" y="406" width="120" height="44" rx="22" fill="#ffffff" opacity="0.04" stroke="${ASIA}" stroke-opacity="0.3" stroke-width="1"/>
    <text x="140" y="434" font-size="14" font-weight="700" fill="${ASIA}" text-anchor="middle">Asia</text>

    <rect x="212" y="406" width="120" height="44" rx="22" fill="#ffffff" opacity="0.04" stroke="${LONDON}" stroke-opacity="0.3" stroke-width="1"/>
    <text x="272" y="434" font-size="14" font-weight="700" fill="${LONDON}" text-anchor="middle">London</text>

    <rect x="344" y="406" width="120" height="44" rx="22" fill="#ffffff" opacity="0.04" stroke="${NY}" stroke-opacity="0.3" stroke-width="1"/>
    <text x="404" y="434" font-size="14" font-weight="700" fill="${NY}" text-anchor="middle">New York</text>
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
      `xauusd-volatility-trading-sessions-${w}.webp`
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
