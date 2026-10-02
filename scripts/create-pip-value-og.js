/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require("sharp");
const fs = require("fs");
const OUT = "/home/z/my-project/public/og-pip-value.jpg";
const W=1200,H=630;
const svg=`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0a0a0f"/><stop offset="55%" style="stop-color:#0d0f16"/><stop offset="100%" style="stop-color:#0a0a0f"/></linearGradient>
<linearGradient id="gg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#00e676"/><stop offset="100%" style="stop-color:#ffd740"/></linearGradient>
<filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<circle cx="980" cy="120" r="220" fill="#ffd740" opacity="0.05"/>
<circle cx="180" cy="540" r="180" fill="#00e676" opacity="0.05"/>
<g transform="translate(700,160)" font-family="system-ui,-apple-system,'Segoe UI',Roboto,sans-serif">
<rect x="0" y="0" width="420" height="380" rx="20" fill="#ffffff" opacity="0.03" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>
<rect x="30" y="30" width="360" height="40" rx="8" fill="#ffffff" opacity="0.04"/>
<text x="50" y="55" font-size="11" font-weight="600" fill="#9ca3af">LOT SIZE</text><text x="370" y="55" font-size="14" font-weight="700" fill="#f0f0f0" text-anchor="end">1.00</text>
<rect x="30" y="80" width="360" height="40" rx="8" fill="#ffffff" opacity="0.04"/>
<text x="50" y="105" font-size="11" font-weight="600" fill="#9ca3af">PIP SIZE</text><text x="370" y="105" font-size="14" font-weight="700" fill="#f0f0f0" text-anchor="end">$0.01</text>
<rect x="30" y="130" width="360" height="40" rx="8" fill="#ffffff" opacity="0.04"/>
<text x="50" y="155" font-size="11" font-weight="600" fill="#9ca3af">CONTRACT</text><text x="370" y="155" font-size="14" font-weight="700" fill="#f0f0f0" text-anchor="end">100 oz</text>
<rect x="30" y="190" width="360" height="60" rx="10" fill="#00e676" opacity="0.08"/>
<text x="50" y="218" font-size="11" font-weight="700" fill="#00e676" letter-spacing="1">PIP VALUE (1 PIP)</text>
<text x="370" y="228" font-size="28" font-weight="900" fill="#00e676" text-anchor="end" filter="url(#glow)">$1.00</text>
<rect x="30" y="270" width="170" height="50" rx="8" fill="#ffffff" opacity="0.03"/>
<text x="50" y="295" font-size="10" font-weight="600" fill="#9ca3af">100 PIPS</text><text x="50" y="312" font-size="16" font-weight="800" fill="#ffd740">$100.00</text>
<rect x="220" y="270" width="170" height="50" rx="8" fill="#ffffff" opacity="0.03"/>
<text x="240" y="295" font-size="10" font-weight="600" fill="#9ca3af">500 PIPS</text><text x="240" y="312" font-size="16" font-weight="800" fill="#ffd740">$500.00</text>
<text x="210" y="355" font-size="10" fill="#6b7280" text-anchor="middle">Educational estimate only</text>
</g>
<g><circle cx="80" cy="70" r="9" fill="#00e676" filter="url(#glow)"/>
<text x="100" y="78" font-family="system-ui,-apple-system,'Segoe UI',Roboto,sans-serif" font-size="26" font-weight="800" fill="#f0f0f0" letter-spacing="-0.5">Forex <tspan fill="#00e676">Wizard</tspan></text></g>
<rect x="80" y="150" width="220" height="40" rx="20" fill="#ffd740" opacity="0.08" stroke="#ffd740" stroke-opacity="0.35" stroke-width="1"/>
<text x="190" y="176" font-family="system-ui,-apple-system,'Segoe UI',Roboto,sans-serif" font-size="18" font-weight="700" fill="#ffd740" text-anchor="middle" letter-spacing="1.5">FREE CALCULATOR</text>
<text x="80" y="258" font-family="system-ui,-apple-system,'Segoe UI',Roboto,sans-serif" font-size="48" font-weight="900" fill="#f0f0f0" letter-spacing="-1.5">XAUUSD Pip Value</text>
<text x="80" y="318" font-family="system-ui,-apple-system,'Segoe UI',Roboto,sans-serif" font-size="48" font-weight="900" fill="#ffd740" letter-spacing="-1.5">Calculator</text>
<text x="80" y="372" font-family="system-ui,-apple-system,'Segoe UI',Roboto,sans-serif" font-size="22" font-weight="600" fill="#9ca3af">Gold &amp; Forex Pip Values</text>
<rect x="80" y="600" width="1040" height="2" rx="1" fill="url(#gg)" opacity="0.4"/>
<text x="80" y="624" font-family="system-ui,-apple-system,'Segoe UI',Roboto,sans-serif" font-size="14" font-weight="500" fill="#6b7280">forexwizard.online &#183; Not financial advice</text>
</svg>`;
async function main(){await sharp(Buffer.from(svg.trim())).flatten({background:"#0a0a0f"}).jpeg({quality:85,mozjpeg:true}).toFile(OUT);console.log("JPG: "+(fs.statSync(OUT).size/1024).toFixed(1)+" KB");}
main().catch(e=>{console.error(e);process.exit(1);});
