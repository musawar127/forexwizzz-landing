/**
 * Generates the Forex Position Size Calculator OG image. 1200×630.
 * Run: node scripts/create-forex-position-size-og.js
 */
/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require("sharp");
const fs = require("fs");
const OUT = "/home/z/my-project/public/og-forex-position-size-calculator.jpg";
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0a0a0f"/><stop offset="55%" style="stop-color:#0d0f16"/><stop offset="100%" style="stop-color:#0a0a0f"/></linearGradient>
<linearGradient id="gg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#00e676"/><stop offset="100%" style="stop-color:#ffd740"/></linearGradient>
<filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<rect width="1200" height="630" fill="url(#bg)"/>
<g opacity="0.18"><path d="M940 350 Q970 300 990 250 T1030 180 T1070 120" stroke="#00e676" stroke-width="2.5" fill="none"/></g>
<circle cx="180" cy="540" r="180" fill="#00e676" opacity="0.05"/>
<circle cx="200" cy="120" r="120" fill="#ffd740" opacity="0.06"/>
<g><circle cx="80" cy="70" r="9" fill="#00e676" filter="url(#glow)"/><text x="100" y="78" font-family="system-ui,sans-serif" font-size="26" font-weight="800" fill="#f0f0f0">Forex <tspan fill="#00e676">Wizard</tspan></text></g>
<rect x="80" y="150" width="220" height="40" rx="20" fill="#ffd740" opacity="0.08" stroke="#ffd740" stroke-opacity="0.35" stroke-width="1"/>
<text x="190" y="176" font-family="system-ui,sans-serif" font-size="18" font-weight="700" fill="#ffd740" text-anchor="middle" letter-spacing="1.5">FREE CALCULATOR</text>
<text x="80" y="262" font-family="system-ui,sans-serif" font-size="50" font-weight="900" fill="#f0f0f0" letter-spacing="-1.5">Forex Position Size</text>
<text x="80" y="328" font-family="system-ui,sans-serif" font-size="50" font-weight="900" letter-spacing="-1.5"><tspan fill="#ffd740">Calculator</tspan></text>
<text x="80" y="376" font-family="system-ui,sans-serif" font-size="22" font-weight="600" fill="#9ca3af">Lot Size · Risk · Pip Value · Stop Loss</text>
<g font-family="system-ui,sans-serif">
<rect x="80" y="420" width="250" height="110" rx="16" fill="#ffffff" opacity="0.04" stroke="#00e676" stroke-opacity="0.25" stroke-width="1"/>
<text x="100" y="458" font-size="13" font-weight="700" fill="#9ca3af" letter-spacing="1.2">LOT SIZE</text><text x="100" y="512" font-size="36" font-weight="900" fill="#00e676">0.50</text>
<rect x="348" y="420" width="250" height="110" rx="16" fill="#ffffff" opacity="0.04" stroke="#ffd740" stroke-opacity="0.25" stroke-width="1"/>
<text x="368" y="458" font-size="13" font-weight="700" fill="#9ca3af" letter-spacing="1.2">RISK AMOUNT</text><text x="368" y="512" font-size="36" font-weight="900" fill="#ffd740">$100</text>
<rect x="616" y="420" width="250" height="110" rx="16" fill="#ffffff" opacity="0.04" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1"/>
<text x="636" y="458" font-size="13" font-weight="700" fill="#9ca3af" letter-spacing="1.2">STOP LOSS</text><text x="636" y="512" font-size="36" font-weight="900" fill="#f0f0f0">20 pips</text>
</g>
<rect x="80" y="580" width="1040" height="2" rx="1" fill="url(#gg)" opacity="0.4"/>
<text x="80" y="608" font-family="system-ui,sans-serif" font-size="13" font-weight="500" fill="#6b7280">Educational position-sizing tool · forexwizard.online · Not financial advice</text>
</svg>`;
async function create() {
  await sharp(Buffer.from(svg.trim())).flatten({background:"#0a0a0f"}).jpeg({quality:85,mozjpeg:true}).toFile(OUT);
  console.log(`JPG saved: ${OUT} (${(fs.statSync(OUT).size/1024).toFixed(1)} KB)`);
}
create().catch(e=>{console.error(e);process.exit(1);});
