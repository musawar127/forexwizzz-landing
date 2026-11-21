/**
 * Generates the XAUUSD Weekly Forecast (Nov 23-27, 2026) hero/OG image.
 * Run: node scripts/create-weekly-forecast-nov-23-27-og.js
 */
/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const PUBLIC_BLOG_DIR = "/home/z/my-project/public/blog";
const SVG_OUT = path.join(PUBLIC_BLOG_DIR, "xauusd-weekly-forecast-november-23-27-2026.svg");
const JPG_OUT = path.join(PUBLIC_BLOG_DIR, "xauusd-weekly-forecast-november-23-27-2026.jpg");
const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#08090d"/><stop offset="55%" style="stop-color:#0d0f16"/><stop offset="100%" style="stop-color:#08090d"/></linearGradient>
<linearGradient id="gg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#00d980"/><stop offset="100%" style="stop-color:#ffd43b"/></linearGradient>
<filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<rect width="1200" height="630" fill="url(#bg)"/>
<g opacity="0.15">${Array.from({length:22},(_,i)=>{const x=40+i*52;const baseY=150+(i%5)*6;const h=24+((i*47)%60);const y=baseY+((i*23)%30);const red=(i+1)%3===0;const color=red?"#ff5252":"#ffd43b";return `\n    <line x1="${x}" y1="${y-18}" x2="${x}" y2="${y+h+18}" stroke="${color}" stroke-width="1.5" opacity="0.15"/>\n    <rect x="${x-7}" y="${y}" width="14" height="${h}" fill="${color}" opacity="0.18" rx="2"/>`}).join("")}</g>
<circle cx="980" cy="110" r="220" fill="#ffd43b" opacity="0.04"/>
<circle cx="180" cy="540" r="180" fill="#ff5252" opacity="0.04"/>
<g><circle cx="80" cy="68" r="9" fill="#00d980" filter="url(#glow)"/><text x="100" y="76" font-family="system-ui,sans-serif" font-size="26" font-weight="800" fill="#f5f5f5">Forex <tspan fill="#00d980">Wizard</tspan></text></g>
<rect x="80" y="148" width="300" height="38" rx="19" fill="#ffd43b" opacity="0.08" stroke="#ffd43b" stroke-opacity="0.35" stroke-width="1"/>
<text x="230" y="173" font-family="system-ui,sans-serif" font-size="17" font-weight="700" fill="#ffd43b" text-anchor="middle" letter-spacing="1.4">WEEKLY MARKET FORECAST</text>
<text x="80" y="270" font-family="system-ui,sans-serif" font-size="54" font-weight="900" fill="#f5f5f5" letter-spacing="-1.5">XAUUSD Weekly</text>
<text x="80" y="334" font-family="system-ui,sans-serif" font-size="54" font-weight="900" letter-spacing="-1.5"><tspan fill="#ffd43b">Forecast</tspan><tspan fill="#f5f5f5"> · Before PCE</tspan></text>
<text x="80" y="384" font-family="system-ui,sans-serif" font-size="22" font-weight="600" fill="#a0a8b4">November 23 – 27, 2026</text>
<g font-family="system-ui,sans-serif">
<rect x="80" y="430" width="290" height="118" rx="16" fill="#ffffff" opacity="0.03" stroke="#ffd43b" stroke-opacity="0.25" stroke-width="1"/>
<text x="100" y="465" font-size="13" font-weight="700" fill="#a0a8b4" letter-spacing="1.2">KEY SUPPORT</text><text x="100" y="520" font-size="38" font-weight="900" fill="#ffd43b">$3,500</text>
<rect x="386" y="430" width="290" height="118" rx="16" fill="#ffffff" opacity="0.03" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1"/>
<text x="406" y="465" font-size="13" font-weight="700" fill="#a0a8b4" letter-spacing="1.2">CURRENT</text><text x="406" y="520" font-size="38" font-weight="900" fill="#f5f5f5">$3,548</text>
<rect x="692" y="430" width="290" height="118" rx="16" fill="#ffffff" opacity="0.03" stroke="#00d980" stroke-opacity="0.25" stroke-width="1"/>
<text x="712" y="465" font-size="13" font-weight="700" fill="#a0a8b4" letter-spacing="1.2">KEY RESISTANCE</text><text x="712" y="520" font-size="38" font-weight="900" fill="#00d980">$3,590</text>
</g>
<text x="80" y="585" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#a0a8b4" letter-spacing="1.2">CATALYSTS:</text>
<text x="80" y="605" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#00d980" letter-spacing="0.8">US PCE · Flash PMIs · Thanksgiving</text>
<rect x="80" y="614" width="1040" height="2" rx="1" fill="url(#gg)" opacity="0.4"/>
<text x="80" y="627" font-family="system-ui,sans-serif" font-size="11" font-weight="500" fill="#6b7280">Educational market analysis · forexwizard.online · Not financial advice</text>
</svg>`;
async function create(){if(!fs.existsSync(PUBLIC_BLOG_DIR))fs.mkdirSync(PUBLIC_BLOG_DIR,{recursive:true});fs.writeFileSync(SVG_OUT,svg.trim(),"utf8");console.log(`SVG saved: ${SVG_OUT} (${(fs.statSync(SVG_OUT).size/1024).toFixed(1)} KB)`);await sharp(Buffer.from(svg.trim())).flatten({background:"#08090d"}).jpeg({quality:85,mozjpeg:true}).toFile(JPG_OUT);console.log(`JPG saved: ${JPG_OUT} (${(fs.statSync(JPG_OUT).size/1024).toFixed(1)} KB)`);for(const w of[640,960,1200]){const out=path.join(PUBLIC_BLOG_DIR,`xauusd-weekly-forecast-november-23-27-2026-${w}.webp`);await sharp(Buffer.from(svg.trim())).resize({width:w}).webp({quality:82}).toFile(out);console.log(`WebP ${w}w saved: ${out} (${(fs.statSync(out).size/1024).toFixed(1)} KB)`);}}
create().catch(e=>{console.error(e);process.exit(1);});
