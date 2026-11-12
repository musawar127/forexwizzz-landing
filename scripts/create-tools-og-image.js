/**
 * Generates the Tools hub social/OG image (1200x630).
 * Run: node scripts/create-tools-og-image.js
 */
/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const PUBLIC_DIR = "/home/z/my-project/public";
const SVG_OUT = path.join(PUBLIC_DIR, "tools-og-image.svg");
const JPG_OUT = path.join(PUBLIC_DIR, "tools-og-image.jpg");
const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0a0a0f"/><stop offset="55%" style="stop-color:#0d0f16"/><stop offset="100%" style="stop-color:#0a0a0f"/></linearGradient>
<linearGradient id="gg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#00e676"/><stop offset="100%" style="stop-color:#ffd740"/></linearGradient>
<filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<rect width="1200" height="630" fill="url(#bg)"/>
<g opacity="0.16">${Array.from({length:24},(_,i)=>{const x=30+i*48;const baseY=130+(i%5)*6;const h=20+((i*53)%54);const y=baseY+((i*31)%28);const green=(i+1)%3!==0;const color=green?"#00e676":"#ffd740";return `\n    <rect x="${x-6}" y="${y}" width="12" height="${h}" fill="${color}" opacity="0.18" rx="2"/>`}).join("")}</g>
<circle cx="980" cy="110" r="220" fill="#00e676" opacity="0.05"/>
<circle cx="180" cy="540" r="180" fill="#ffd740" opacity="0.05"/>
<g><circle cx="80" cy="68" r="9" fill="#00e676" filter="url(#glow)"/><text x="100" y="76" font-family="system-ui,sans-serif" font-size="26" font-weight="800" fill="#f0f0f0">Forex <tspan fill="#00e676">Wizard</tspan></text></g>
<rect x="80" y="148" width="300" height="38" rx="19" fill="#00e676" opacity="0.08" stroke="#00e676" stroke-opacity="0.35" stroke-width="1"/>
<text x="230" y="173" font-family="system-ui,sans-serif" font-size="17" font-weight="700" fill="#00e676" text-anchor="middle" letter-spacing="1.4">FREE TRADING CALCULATORS</text>
<text x="80" y="270" font-family="system-ui,sans-serif" font-size="54" font-weight="900" fill="#f0f0f0" letter-spacing="-1.5">Free XAUUSD &amp;</text>
<text x="80" y="334" font-family="system-ui,sans-serif" font-size="54" font-weight="900" letter-spacing="-1.5"><tspan fill="#ffd740">Forex</tspan><tspan fill="#f0f0f0"> Calculators</tspan></text>
<text x="80" y="384" font-family="system-ui,sans-serif" font-size="22" font-weight="600" fill="#9ca3af">Lot Size · Pip Value · Margin · Risk-Reward · Market Hours</text>
<g font-family="system-ui,sans-serif">
<rect x="80" y="430" width="510" height="120" rx="16" fill="#ffffff" opacity="0.03" stroke="#00e676" stroke-opacity="0.25" stroke-width="1"/>
<text x="100" y="465" font-size="13" font-weight="700" fill="#9ca3af" letter-spacing="1.2">10 FREE TOOLS · NO LOGIN</text>
<text x="100" y="520" font-size="34" font-weight="900" fill="#00e676">Lot Size · Pips · Margin</text>
<rect x="610" y="430" width="510" height="120" rx="16" fill="#ffffff" opacity="0.03" stroke="#ffd740" stroke-opacity="0.25" stroke-width="1"/>
<text x="630" y="465" font-size="13" font-weight="700" fill="#9ca3af" letter-spacing="1.2">RISK &amp; GROWTH</text>
<text x="630" y="520" font-size="34" font-weight="900" fill="#ffd740">Risk · Ruin · Compound</text>
</g>
<rect x="80" y="578" width="1040" height="2" rx="1" fill="url(#gg)" opacity="0.4"/>
<text x="80" y="606" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#00e676" letter-spacing="1">forexwizard.online/tools · Educational estimates · Not financial advice</text>
</svg>`;
async function create(){fs.writeFileSync(SVG_OUT,svg.trim(),"utf8");console.log(`SVG saved: ${SVG_OUT} (${(fs.statSync(SVG_OUT).size/1024).toFixed(1)} KB)`);await sharp(Buffer.from(svg.trim())).flatten({background:"#0a0a0f"}).jpeg({quality:85,mozjpeg:true}).toFile(JPG_OUT);console.log(`JPG saved: ${JPG_OUT} (${(fs.statSync(JPG_OUT).size/1024).toFixed(1)} KB)`);}
create().catch(e=>{console.error(e);process.exit(1);});
