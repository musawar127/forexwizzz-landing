/**
 * Generates the XAUUSD Weekly Forecast (Nov 2-6, 2026) hero/OG image.
 * Run: node scripts/create-weekly-forecast-nov-2-6-og.js
 */
/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const PUBLIC_BLOG_DIR = "/home/z/my-project/public/blog";
const SVG_OUT = path.join(PUBLIC_BLOG_DIR, "xauusd-weekly-forecast-november-2-6-2026.svg");
const JPG_OUT = path.join(PUBLIC_BLOG_DIR, "xauusd-weekly-forecast-november-2-6-2026.jpg");
const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0a0a0f"/><stop offset="55%" style="stop-color:#0d0f16"/><stop offset="100%" style="stop-color:#0a0a0f"/></linearGradient>
<linearGradient id="gg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#00e676"/><stop offset="100%" style="stop-color:#ffd740"/></linearGradient>
<filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<rect width="1200" height="630" fill="url(#bg)"/>
<g opacity="0.18">${Array.from({length:22},(_,i)=>{const x=40+i*52;const baseY=150+(i%5)*6;const h=24+((i*47)%60);const y=baseY+((i*23)%30);const red=(i+1)%3===0;const color=red?"#ff5252":"#ffd740";return `\n    <line x1="${x}" y1="${y-18}" x2="${x}" y2="${y+h+18}" stroke="${color}" stroke-width="1.5" opacity="0.18"/>\n    <rect x="${x-7}" y="${y}" width="14" height="${h}" fill="${color}" opacity="0.22" rx="2"/>`}).join("")}</g>
<circle cx="980" cy="120" r="220" fill="#ffd740" opacity="0.05"/>
<circle cx="180" cy="540" r="180" fill="#ff5252" opacity="0.05"/>
<g><circle cx="80" cy="70" r="9" fill="#00e676" filter="url(#glow)"/><text x="100" y="78" font-family="system-ui,sans-serif" font-size="26" font-weight="800" fill="#f0f0f0">Forex <tspan fill="#00e676">Wizard</tspan></text></g>
<rect x="80" y="150" width="250" height="40" rx="20" fill="#ff5252" opacity="0.08" stroke="#ff5252" stroke-opacity="0.35" stroke-width="1"/>
<text x="205" y="176" font-family="system-ui,sans-serif" font-size="18" font-weight="700" fill="#ff5252" text-anchor="middle" letter-spacing="1.5">WEEKLY MARKET FORECAST</text>
<text x="80" y="262" font-family="system-ui,sans-serif" font-size="60" font-weight="900" fill="#f0f0f0" letter-spacing="-1.5">XAUUSD Weekly</text>
<text x="80" y="330" font-family="system-ui,sans-serif" font-size="60" font-weight="900" letter-spacing="-1.5"><tspan fill="#ffd740">Forecast</tspan><tspan fill="#f0f0f0"> · 1-Year Low</tspan></text>
<text x="80" y="378" font-family="system-ui,sans-serif" font-size="24" font-weight="600" fill="#9ca3af">November 2 – 6, 2026</text>
<g font-family="system-ui,sans-serif">
<rect x="80" y="430" width="290" height="118" rx="16" fill="#ffffff" opacity="0.04" stroke="#ffd740" stroke-opacity="0.25" stroke-width="1"/>
<text x="100" y="470" font-size="13" font-weight="700" fill="#9ca3af" letter-spacing="1.2">KEY SUPPORT</text><text x="100" y="526" font-size="38" font-weight="900" fill="#ffd740">$3,850</text>
<rect x="386" y="430" width="290" height="118" rx="16" fill="#ffffff" opacity="0.04" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1"/>
<text x="406" y="470" font-size="13" font-weight="700" fill="#9ca3af" letter-spacing="1.2">CURRENT</text><text x="406" y="526" font-size="38" font-weight="900" fill="#f0f0f0">$3,890</text>
<rect x="692" y="430" width="290" height="118" rx="16" fill="#ffffff" opacity="0.04" stroke="#00e676" stroke-opacity="0.25" stroke-width="1"/>
<text x="712" y="470" font-size="13" font-weight="700" fill="#9ca3af" letter-spacing="1.2">KEY RESISTANCE</text><text x="712" y="526" font-size="38" font-weight="900" fill="#00e676">$3,950</text>
</g>
<text x="80" y="582" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#9ca3af" letter-spacing="1.5">CATALYSTS:</text>
<text x="180" y="582" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#00e676" letter-spacing="1">NFP · ISM · MIDTERMS · BoE</text>
<rect x="80" y="602" width="1040" height="2" rx="1" fill="url(#gg)" opacity="0.4"/>
<text x="80" y="624" font-family="system-ui,sans-serif" font-size="13" font-weight="500" fill="#6b7280">Educational market analysis · forexwizard.online · Not financial advice</text>
</svg>`;
async function create(){if(!fs.existsSync(PUBLIC_BLOG_DIR))fs.mkdirSync(PUBLIC_BLOG_DIR,{recursive:true});fs.writeFileSync(SVG_OUT,svg.trim(),"utf8");console.log(`SVG saved: ${SVG_OUT} (${(fs.statSync(SVG_OUT).size/1024).toFixed(1)} KB)`);await sharp(Buffer.from(svg.trim())).flatten({background:"#0a0a0f"}).jpeg({quality:85,mozjpeg:true}).toFile(JPG_OUT);console.log(`JPG saved: ${JPG_OUT} (${(fs.statSync(JPG_OUT).size/1024).toFixed(1)} KB)`);for(const w of[640,960,1200]){const out=path.join(PUBLIC_BLOG_DIR,`xauusd-weekly-forecast-november-2-6-2026-${w}.webp`);await sharp(Buffer.from(svg.trim())).resize({width:w}).webp({quality:82}).toFile(out);console.log(`WebP ${w}w saved: ${out} (${(fs.statSync(out).size/1024).toFixed(1)} KB)`);}}
create().catch(e=>{console.error(e);process.exit(1);});
