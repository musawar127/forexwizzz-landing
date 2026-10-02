/**
 * Generates the Forex Market Hours OG image.
 * Dark ForexWizard theme with session timeline and clock visual.
 */
/* eslint-disable @typescript-eslint/no-require-imports */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = "/home/z/my-project/public";
const JPG_OUT = path.join(PUBLIC_DIR, "og-forex-market-hours.jpg");

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

  <!-- Session timeline (right side) -->
  <g transform="translate(660, 180)" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">
    <rect x="0" y="0" width="460" height="340" rx="20" fill="#ffffff" opacity="0.03" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>

    <!-- Hour markers -->
    <text x="30" y="30" font-size="9" fill="#6b7280">00:00</text>
    <text x="140" y="30" font-size="9" fill="#6b7280">06:00</text>
    <text x="250" y="30" font-size="9" fill="#6b7280">12:00</text>
    <text x="360" y="30" font-size="9" fill="#6b7280">18:00</text>
    <text x="430" y="30" font-size="9" fill="#6b7280">24:00</text>

    <!-- Sydney -->
    <text x="0" y="60" font-size="11" font-weight="700" fill="#9ca3af">SYDNEY</text>
    <rect x="75" y="50" width="130" height="16" rx="4" fill="#9ca3af" opacity="0.3"/>

    <!-- Tokyo -->
    <text x="0" y="100" font-size="11" font-weight="700" fill="#ffd740">TOKYO</text>
    <rect x="120" y="90" width="130" height="16" rx="4" fill="#ffd740" opacity="0.3"/>

    <!-- London -->
    <text x="0" y="140" font-size="11" font-weight="700" fill="#00e676">LONDON</text>
    <rect x="200" y="130" width="130" height="16" rx="4" fill="#00e676" opacity="0.3"/>

    <!-- New York -->
    <text x="0" y="180" font-size="11" font-weight="700" fill="#00e676">NEW YORK</text>
    <rect x="250" y="170" width="130" height="16" rx="4" fill="#00e676" opacity="0.3"/>

    <!-- Overlap highlight -->
    <rect x="250" y="126" width="80" height="64" fill="none" stroke="#00e676" stroke-width="1.5" rx="4" opacity="0.5"/>
    <text x="290" y="220" font-size="9" fill="#00e676" text-anchor="middle" opacity="0.7">overlap</text>

    <!-- Current time indicator -->
    <line x1="280" y1="40" x2="280" y2="210" stroke="#ffd740" stroke-width="1.5" opacity="0.6" stroke-dasharray="4 3"/>
    <circle cx="280" cy="40" r="4" fill="#ffd740" filter="url(#softGlow)"/>

    <!-- Status -->
    <rect x="20" y="250" width="200" height="50" rx="10" fill="#00e676" opacity="0.1"/>
    <text x="120" y="282" font-size="16" font-weight="800" fill="#00e676" text-anchor="middle">MARKET OPEN</text>

    <text x="230" y="282" font-size="11" fill="#6b7280">Live session clock</text>
  </g>

  <!-- Brand -->
  <g>
    <circle cx="80" cy="70" r="9" fill="#00e676" filter="url(#softGlow)"/>
    <text x="100" y="78" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="800" fill="#f0f0f0" letter-spacing="-0.5">Forex <tspan fill="#00e676">Wizard</tspan></text>
  </g>

  <!-- Eyebrow -->
  <rect x="80" y="150" width="220" height="40" rx="20" fill="#00e676" opacity="0.08" stroke="#00e676" stroke-opacity="0.35" stroke-width="1"/>
  <text x="190" y="176" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#00e676" text-anchor="middle" letter-spacing="1.5">LIVE SESSION CLOCK</text>

  <!-- Title -->
  <text x="80" y="258" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="50" font-weight="900" fill="#f0f0f0" letter-spacing="-1.5">Forex Market</text>
  <text x="80" y="318" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="50" font-weight="900" fill="#00e676" letter-spacing="-1.5">Hours</text>

  <!-- Subtitle -->
  <text x="80" y="370" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="600" fill="#9ca3af">Live Sessions · Timezone Converter · DST-Aware</text>

  <!-- Footer -->
  <rect x="80" y="600" width="1040" height="2" rx="1" fill="url(#greenGold)" opacity="0.4"/>
  <text x="80" y="624" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" fill="#6b7280">forexwizard.online · Free · No registration required</text>
</svg>
`;

async function create() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  await sharp(Buffer.from(svg.trim())).flatten({ background: "#0a0a0f" }).jpeg({ quality: 85, mozjpeg: true }).toFile(JPG_OUT);
  console.log(`JPG: ${(fs.statSync(JPG_OUT).size / 1024).toFixed(1)} KB`);
}

create().catch((e) => { console.error(e); process.exit(1); });
