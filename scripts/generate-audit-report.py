#!/usr/bin/env python3
"""ForexWizard 12-Page SEO Health Audit Report - PDF Generation"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm, cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

FONT_DIR = '/usr/share/fonts'

# Register fonts
pdfmetrics.registerFont(TTFont('NotoSerifSC', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('NotoSerifSC-Bold', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf'))
registerFontFamily('NotoSerifSC', normal='NotoSerifSC', bold='NotoSerifSC-Bold')

pdfmetrics.registerFont(TTFont('DejaVuSans', f'{FONT_DIR}/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans-Bold', f'{FONT_DIR}/truetype/dejavu/DejaVuSans-Bold.ttf'))

# Color palette
PAGE_BG = colors.HexColor('#f0f0f1')
HEADER_FILL = colors.HexColor('#4b5a6a')
COVER_BLOCK = colors.HexColor('#485563')
BORDER = colors.HexColor('#c2c8cf')
ACCENT = colors.HexColor('#336ca5')
TEXT_PRIMARY = colors.HexColor('#222425')
TEXT_MUTED = colors.HexColor('#74797d')
SEM_ERROR = colors.HexColor('#a14a42')
SEM_WARNING = colors.HexColor('#9f8655')
SEM_SUCCESS = colors.HexColor('#44895b')
SEM_INFO = colors.HexColor('#527ba4')
TABLE_STRIPE = colors.HexColor('#f0f1f2')
CARD_BG = colors.HexColor('#e4e6e9')
WHITE = colors.white
LIGHT_RED = colors.HexColor('#fdf2f2')
LIGHT_AMBER = colors.HexColor('#fef9ee')
LIGHT_GREEN = colors.HexColor('#f0f7f2')
LIGHT_BLUE = colors.HexColor('#eef3f9')

# Styles
styles = getSampleStyleSheet()

sH1 = ParagraphStyle('AuditH1', parent=styles['Normal'],
    fontName='DejaVuSans-Bold', fontSize=20, leading=26,
    textColor=ACCENT, spaceAfter=8, spaceBefore=16)

sH2 = ParagraphStyle('AuditH2', parent=styles['Normal'],
    fontName='DejaVuSans-Bold', fontSize=14, leading=18,
    textColor=COVER_BLOCK, spaceAfter=6, spaceBefore=12)

sH3 = ParagraphStyle('AuditH3', parent=styles['Normal'],
    fontName='DejaVuSans-Bold', fontSize=11, leading=15,
    textColor=ACCENT, spaceAfter=4, spaceBefore=8)

sBody = ParagraphStyle('AuditBody', parent=styles['Normal'],
    fontName='DejaVuSans', fontSize=9.5, leading=14,
    textColor=TEXT_PRIMARY, spaceAfter=4, alignment=TA_JUSTIFY)

sBodySmall = ParagraphStyle('AuditBodySmall', parent=styles['Normal'],
    fontName='DejaVuSans', fontSize=8.5, leading=12,
    textColor=TEXT_PRIMARY, spaceAfter=3, alignment=TA_JUSTIFY)

sBullet = ParagraphStyle('AuditBullet', parent=sBody,
    leftIndent=16, bulletIndent=4, spaceBefore=1, spaceAfter=1)

sTableHeader = ParagraphStyle('TableHeader', parent=styles['Normal'],
    fontName='DejaVuSans-Bold', fontSize=8, leading=10, textColor=WHITE, alignment=TA_CENTER)

sTableCell = ParagraphStyle('TableCell', parent=styles['Normal'],
    fontName='DejaVuSans', fontSize=7.5, leading=10, textColor=TEXT_PRIMARY)

sTableCellCenter = ParagraphStyle('TableCellCenter', parent=sTableCell, alignment=TA_CENTER)

sFixNow = ParagraphStyle('FixNow', parent=styles['Normal'],
    fontName='DejaVuSans-Bold', fontSize=9, leading=12, textColor=SEM_ERROR)

sImprove = ParagraphStyle('Improve', parent=styles['Normal'],
    fontName='DejaVuSans-Bold', fontSize=9, leading=12, textColor=SEM_WARNING)

sOK = ParagraphStyle('OK', parent=styles['Normal'],
    fontName='DejaVuSans-Bold', fontSize=9, leading=12, textColor=SEM_SUCCESS)

sCoverTitle = ParagraphStyle('CoverTitle', parent=styles['Normal'],
    fontName='DejaVuSans-Bold', fontSize=32, leading=38,
    textColor=WHITE, alignment=TA_CENTER)

sCoverSubtitle = ParagraphStyle('CoverSubtitle', parent=styles['Normal'],
    fontName='DejaVuSans', fontSize=14, leading=20,
    textColor=colors.HexColor('#c0c8d0'), alignment=TA_CENTER)

sCoverMeta = ParagraphStyle('CoverMeta', parent=styles['Normal'],
    fontName='DejaVuSans', fontSize=10, leading=14,
    textColor=colors.HexColor('#8899aa'), alignment=TA_CENTER)

# Helper functions
def fix_now(text):
    return Paragraph(f'<font color="#a14a42"><b>[FIX NOW]</b></font> {text}', sBodySmall)

def improve(text):
    return Paragraph(f'<font color="#9f8655"><b>[IMPROVE]</b></font> {text}', sBodySmall)

def ok(text):
    return Paragraph(f'<font color="#44895b"><b>[OK]</b></font> {text}', sBodySmall)

def info(text):
    return Paragraph(f'<font color="#527ba4"><b>[INFO]</b></font> {text}', sBodySmall)

def bullet(text):
    return Paragraph(f'<bullet>&bull;</bullet> {text}', sBullet)

def make_table(headers, rows, col_widths=None):
    """Create a styled table with headers and rows."""
    header_paras = [Paragraph(h, sTableHeader) for h in headers]
    data = [header_paras]
    for row in rows:
        data.append([Paragraph(str(c), sTableCell) if not isinstance(c, Paragraph) else c for c in row])
    
    if col_widths is None:
        available = A4[0] - 40*mm
        col_widths = [available / len(headers)] * len(headers)
    
    t = Table(data, colWidths=col_widths, repeatRows=1)
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), HEADER_FILL),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'DejaVuSans-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 8),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
        ('TOPPADDING', (0, 0), (-1, 0), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING', (0, 1), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 3),
    ]
    # Alternate row shading
    for i in range(1, len(data)):
        if i % 2 == 0:
            style_cmds.append(('BACKGROUND', (0, i), (-1, i), TABLE_STRIPE))
    t.setStyle(TableStyle(style_cmds))
    return t

# Build document
output_path = '/home/z/my-project/download/ForexWizard_SEO_Health_Audit.pdf'
os.makedirs('/home/z/my-project/download', exist_ok=True)

doc = SimpleDocTemplate(
    output_path,
    pagesize=A4,
    topMargin=18*mm, bottomMargin=18*mm, leftMargin=20*mm, rightMargin=20*mm,
    title='ForexWizard SEO Health Audit',
    author='Z.ai',
    subject='Full 12-Page SEO Health Audit for forexwizard.online'
)

story = []
available_width = A4[0] - 40*mm

# ============================================================
# COVER PAGE
# ============================================================
story.append(Spacer(1, 80*mm))
story.append(Paragraph('ForexWizard', sCoverTitle))
story.append(Paragraph('Full 12-Page SEO Health Audit', ParagraphStyle('CoverTitle2', parent=sCoverTitle, fontSize=22, leading=28)))
story.append(Spacer(1, 12*mm))
story.append(HRFlowable(width='60%', thickness=1, color=ACCENT, spaceBefore=4, spaceAfter=4))
story.append(Spacer(1, 8*mm))
story.append(Paragraph('forexwizard.online', sCoverSubtitle))
story.append(Spacer(1, 6*mm))
story.append(Paragraph('12 Live Pages | 15 Audit Dimensions | Read-Only Inspection', sCoverMeta))
story.append(Spacer(1, 4*mm))
story.append(Paragraph('Audit Date: 2026-08-30', sCoverMeta))
story.append(Spacer(1, 4*mm))
story.append(Paragraph('Status: INSPECTION ONLY - No files changed', sCoverMeta))
story.append(PageBreak())

# ============================================================
# SECTION 1: TECHNICAL SEO AUDIT
# ============================================================
story.append(Paragraph('1. Technical SEO Audit', sH1))
story.append(HRFlowable(width='100%', thickness=1, color=ACCENT, spaceBefore=2, spaceAfter=8))

story.append(Paragraph('All 12 pages were inspected for technical SEO fundamentals. The site uses Next.js 16 with static export (output: "export") and trailingSlash: true, producing clean /slug/index.html files.', sBody))

story.append(Paragraph('1.1 Core Technical Checks', sH2))
tech_headers = ['Check', 'Status', 'Notes']
tech_rows = [
    ['HTTPS', 'PASS', 'All URLs use HTTPS. Domain is forexwizard.online'],
    ['Canonical tags', 'PASS', 'All 11 sub-pages have explicit canonical. Homepage inherits from layout'],
    ['Canonical format', 'PASS', 'All use https://forexwizard.online/slug/ format'],
    ['Non-www consistency', 'PASS', 'All canonicals use non-www (forexwizard.online)'],
    ['Trailing slash', 'PASS', 'All canonicals end with /. Config: trailingSlash: true'],
    ['Title presence', 'PASS', 'All 12 pages have titles (homepage from layout)'],
    ['Title duplication', 'PASS', 'All 12 titles are unique'],
    ['Title length', 'PASS', 'Range: 45-60 chars. All within 60-char safe zone'],
    ['Meta description', 'PASS', 'All 11 sub-pages have unique descriptions (132-156 chars)'],
    ['Duplicate descriptions', 'PASS', 'Zero duplicates detected'],
    ['Exactly one H1', 'PASS', 'All 12 pages have exactly 1 H1 tag'],
    ['Heading hierarchy', 'PASS', 'Proper H1 > H2 > H3 structure on all pages'],
    ['Robots directives', 'PASS', 'No restrictive robots meta. 404 page correctly has noindex'],
    ['Sitemap inclusion', 'PASS', 'All 12 URLs present in sitemap.xml'],
    ['Broken internal links', 'PASS', 'Zero broken links across all 176 total internal links'],
    ['Accidental .html URLs', 'PASS', 'Zero .html links found in any page source'],
    ['Missing trailing slash', 'PASS', 'All internal links use trailing slashes consistently'],
    ['Client-side-only content', 'PASS', 'All pages are Server Components. Client components (FadeSection, CandlestickBackground) wrap server-rendered content'],
]
story.append(make_table(tech_headers, tech_rows, [80, 40, available_width - 120]))
story.append(Spacer(1, 4*mm))

story.append(Paragraph('1.2 Build Output Verification', sH2))
story.append(Paragraph('The static export produces the expected out/[slug]/index.html pattern. All 12 page directories exist in the build output with valid HTML files. Total build size is 8.6MB including 679KB JavaScript and 142KB CSS. The largest HTML file is how-to-trade-xauusd at 305KB, and the smallest content page is about at 94KB.', sBody))

story.append(Spacer(1, 3*mm))
story.append(ok('Technical SEO foundation is solid. No critical issues found in this category.'))

# ============================================================
# SECTION 2: SITEMAP + ROBOTS AUDIT
# ============================================================
story.append(PageBreak())
story.append(Paragraph('2. Sitemap + Robots Audit', sH1))
story.append(HRFlowable(width='100%', thickness=1, color=ACCENT, spaceBefore=2, spaceAfter=8))

sitemap_headers = ['#', 'URL', 'Last Modified', 'Priority']
sitemap_rows = [
    ['1', 'https://forexwizard.online/', '2026-08-19', '1.0'],
    ['2', 'https://forexwizard.online/forex-signals/', '2026-08-19', '0.8'],
    ['3', 'https://forexwizard.online/gold-signals/', '2026-08-21', '0.8'],
    ['4', 'https://forexwizard.online/xauusd-analysis/', '2026-08-19', '0.8'],
    ['5', 'https://forexwizard.online/about/', '2026-08-20', '0.5'],
    ['6', 'https://forexwizard.online/how-to-read-xauusd-price-action/', '2026-08-20', '0.7'],
    ['7', 'https://forexwizard.online/xauusd-support-resistance/', '2026-08-21', '0.7'],
    ['8', 'https://forexwizard.online/xauusd-trading-strategy/', '2026-08-30', '0.8'],
    ['9', 'https://forexwizard.online/how-to-trade-xauusd/', '2026-08-30', '0.8'],
    ['10', 'https://forexwizard.online/best-time-to-trade-xauusd/', '2026-08-30', '0.8'],
    ['11', 'https://forexwizard.online/xauusd-lot-size/', '2026-08-30', '0.8'],
    ['12', 'https://forexwizard.online/xauusd-pip-value/', '2026-08-30', '0.8'],
]
story.append(make_table(sitemap_headers, sitemap_rows, [20, available_width - 140, 70, 50]))
story.append(Spacer(1, 4*mm))

story.append(Paragraph('Sitemap verification results:', sBody))
story.append(bullet('Exactly 12 URLs present - matches live page count'))
story.append(bullet('Zero duplicates detected'))
story.append(bullet('All URLs use HTTPS - correct'))
story.append(bullet('All URLs use non-www (forexwizard.online) - correct'))
story.append(bullet('All URLs use trailing slashes - correct'))
story.append(bullet('No accidental .html URLs present'))
story.append(Spacer(1, 3*mm))

story.append(Paragraph('Robots.txt verification:', sBody))
story.append(bullet('Googlebot, Bingbot, Twitterbot, facebookexternalhit all have Allow: /'))
story.append(bullet('Wildcard User-agent also has Allow: /'))
story.append(bullet('Sitemap reference: https://forexwizard.online/sitemap.xml - correct'))
story.append(Spacer(1, 3*mm))
story.append(ok('Sitemap and robots.txt are fully correct. No issues found.'))

# ============================================================
# SECTION 3: 3 KINGS SEO AUDIT
# ============================================================
story.append(PageBreak())
story.append(Paragraph('3. Three Kings SEO Audit (URL / Title / H1 Alignment)', sH1))
story.append(HRFlowable(width='100%', thickness=1, color=ACCENT, spaceBefore=2, spaceAfter=8))

story.append(Paragraph('Each SEO landing page was checked for alignment between URL slug, title tag, and H1 heading. The primary keyword should be consistently represented across all three signals.', sBody))

kings_headers = ['Page URL', 'Title', 'H1', 'Aligned?']
kings_rows = [
    ['/forex-signals/', 'Forex Signals | Free Forex Trading Signals & Market Analysis', 'Forex Signals', 'YES'],
    ['/gold-signals/', 'Gold Signals | XAUUSD Trading Signals & Gold Market Analysis', 'Gold Trading Signals', 'YES*'],
    ['/xauusd-analysis/', 'XAUUSD Analysis | Gold Price & Market Analysis', 'XAUUSD Analysis', 'YES'],
    ['/how-to-read-xauusd-price-action/', 'How to Read XAUUSD Price Action | Gold Trading Guide', 'How to Read XAUUSD Price Action', 'YES'],
    ['/xauusd-support-resistance/', 'XAUUSD Support and Resistance | How to Identify Key Levels', 'XAUUSD Support and Resistance', 'YES'],
    ['/xauusd-trading-strategy/', 'XAUUSD Trading Strategy | How to Trade Gold Step by Step', 'XAUUSD Trading Strategy', 'YES'],
    ['/how-to-trade-xauusd/', "How to Trade XAUUSD | Beginner's Guide to Gold Trading", 'How to Trade XAUUSD', 'YES'],
    ['/best-time-to-trade-xauusd/', 'Best Time to Trade XAUUSD | Gold Trading Sessions & Hours', 'Best Time to Trade XAUUSD', 'YES'],
    ['/xauusd-lot-size/', 'XAUUSD Lot Size | How to Calculate Gold Position Size', 'XAUUSD Lot Size', 'YES'],
    ['/xauusd-pip-value/', 'XAUUSD Pip Value | How to Calculate Gold Pips', 'XAUUSD Pip Value', 'YES'],
]
story.append(make_table(kings_headers, kings_rows, [80, available_width - 220, 90, 50]))
story.append(Spacer(1, 3*mm))
story.append(Paragraph('* Gold Signals H1 is "Gold Trading Signals" while the URL slug is /gold-signals/. This is natural variation, not a misalignment - the primary keyword "gold signals" appears in the title and URL. The H1 adds "Trading" for clarity. This is acceptable and does not require correction.', sBodySmall))
story.append(Spacer(1, 3*mm))
story.append(ok('All 10 SEO landing pages show strong Three Kings alignment. No corrections needed.'))

# ============================================================
# SECTION 4: KEYWORD CANNIBALIZATION AUDIT
# ============================================================
story.append(PageBreak())
story.append(Paragraph('4. Keyword Cannibalization Audit', sH1))
story.append(HRFlowable(width='100%', thickness=1, color=ACCENT, spaceBefore=2, spaceAfter=8))

story.append(Paragraph('All 10 SEO landing pages were reviewed together for keyword overlap. Each page targets a distinct primary keyword intent. The analysis below classifies relationships between page pairs.', sBody))

story.append(Paragraph('4.1 Cleanly Separated Intents', sH2))
story.append(Paragraph('The following page pairs have clearly distinct search intents with minimal keyword overlap in their target keywords and content focus. Each serves a different user need at a different stage of the trading knowledge journey.', sBody))
story.append(bullet('forex-signals vs gold-signals: Different asset classes (forex vs gold/XAUUSD). Clear separation.'))
story.append(bullet('xauusd-lot-size vs xauusd-pip-value: Distinct technical concepts (position sizing vs pip calculation). No meaningful overlap.'))
story.append(bullet('best-time-to-trade-xauusd vs all others: Unique temporal/session-based intent not covered elsewhere.'))
story.append(bullet('about vs all others: Informational page about the brand, not competing for trading keywords.'))

story.append(Paragraph('4.2 Mild Overlap (Acceptable)', sH2))
story.append(Paragraph('The following page pairs share some topical overlap but serve clearly different search intents. This is normal for a comprehensive educational site covering the same niche (gold trading education). The overlap exists in supporting concepts rather than primary keywords.', sBody))
story.append(bullet('how-to-trade-xauusd vs xauusd-trading-strategy: The "how to trade" page is a beginner overview covering market analysis, planning, risk management. The "trading strategy" page is a specific step-by-step framework. Different depth and intent.'))
story.append(bullet('xauusd-analysis vs xauusd-support-resistance: Analysis page covers broad analytical approaches. S&R page deep-dives into one specific analytical technique. Clear parent-child relationship.'))
story.append(bullet('how-to-read-xauusd-price-action vs xauusd-support-resistance: Price action page covers candlesticks, trends, momentum. S&R page focuses on horizontal levels. Complementary techniques.'))
story.append(bullet('gold-signals vs xauusd-analysis: Both relate to gold market analysis but "signals" implies trade ideas while "analysis" implies educational methodology. Different intent.'))

story.append(Paragraph('4.3 No Serious Cannibalization Detected', sH2))
story.append(Paragraph('After thorough review, no page pair shows serious keyword cannibalization where two pages compete for the same primary keyword with the same intent. The site architecture follows a logical hub-spoke model with the XAUUSD educational pages forming a coherent topic cluster. Each page has a clearly defined unique angle.', sBody))
story.append(Spacer(1, 3*mm))
story.append(ok('Keyword cannibalization risk is low. The site has clean intent separation across all 10 SEO landing pages.'))

# ============================================================
# SECTION 5: INTERNAL LINK AUDIT
# ============================================================
story.append(PageBreak())
story.append(Paragraph('5. Internal Link Audit', sH1))
story.append(HRFlowable(width='100%', thickness=1, color=ACCENT, spaceBefore=2, spaceAfter=8))

story.append(Paragraph('All 176 internal links across 12 pages were inspected. The site uses a consistent navigation pattern with 5 main nav links (Home, Forex Signals, Gold Signals, XAUUSD Analysis, About) plus contextual in-body links and footer links.', sBody))

story.append(Paragraph('5.1 Link Hygiene', sH2))
story.append(bullet('Zero broken internal links detected'))
story.append(bullet('Zero links to non-existent routes'))
story.append(bullet('Zero links missing trailing slashes'))
story.append(bullet('All Telegram links point to the single correct URL: https://t.me/ForexWizzz'))
story.append(bullet('Zero accidental .html URLs in any link href'))

story.append(Paragraph('5.2 Inbound Link Distribution', sH2))
link_headers = ['Page', 'Inbound Links', 'Linked From (# Pages)', 'Assessment']
link_rows = [
    ['/forex-signals/', '30', '11', 'Well-linked'],
    ['/xauusd-analysis/', '30', '11', 'Well-linked'],
    ['/gold-signals/', '26', '11', 'Well-linked'],
    ['/', '23', '11', 'Well-linked (nav/footer)'],
    ['/about/', '20', '11', 'Well-linked'],
    ['/how-to-read-xauusd-price-action/', '11', '8', 'Adequate'],
    ['/xauusd-support-resistance/', '11', '8', 'Adequate'],
    ['/xauusd-trading-strategy/', '10', '7', 'Adequate'],
    ['/xauusd-lot-size/', '8', '5', 'Moderate'],
    ['/how-to-trade-xauusd/', '6', '4', 'Low visibility'],
    ['/best-time-to-trade-xauusd/', '4', '4', 'Low visibility'],
    ['/xauusd-pip-value/', '3', '3', 'Low visibility'],
]
story.append(make_table(link_headers, link_rows, [100, 55, 80, available_width - 235]))
story.append(Spacer(1, 3*mm))

story.append(Paragraph('5.3 Key Findings', sH2))
story.append(improve('Homepage only links to 4 of 11 sub-pages (forex-signals, gold-signals, xauusd-analysis, about). The 7 educational guides are not linked from the homepage and are only discoverable through sub-page navigation and contextual links. This reduces crawl priority signals for newer pages.'))
story.append(Spacer(1, 2*mm))
story.append(improve('/xauusd-pip-value/ has the lowest visibility with only 3 inbound links from 3 source pages. As the newest page (Page #12), this is expected but should be addressed after the stability period by adding more contextual links from related pages.'))
story.append(Spacer(1, 2*mm))
story.append(improve('Footer is inconsistent across pages: some have 5-link footers (Home, Forex Signals, Gold Signals, XAUUSD Analysis, About), others have 2-3 links. Standardizing the footer would improve internal link equity distribution.'))
story.append(Spacer(1, 2*mm))
story.append(bullet('Zero orphan pages - every page is linked from at least one other page'))
story.append(bullet('Anchor text diversity is good - mix of exact-match and descriptive anchors'))
story.append(bullet('No excessive repeated links to the same page from a single source'))

# ============================================================
# SECTION 6: TRUST / YMYL AUDIT
# ============================================================
story.append(PageBreak())
story.append(Paragraph('6. Trust / YMYL Audit', sH1))
story.append(HRFlowable(width='100%', thickness=1, color=ACCENT, spaceBefore=2, spaceAfter=8))

story.append(Paragraph('As a financial/trading website (YMYL - Your Money or Your Life), this site is held to higher trust and accuracy standards by Google. The audit examined risk disclaimers, profit claims, testimonials, credentials, and missing trust infrastructure.', sBody))

story.append(Paragraph('6.1 Risk Disclaimers', sH2))
story.append(ok('All 12 pages have a consistent risk disclaimer footer: "Risk Disclaimer: Forex and other financial markets involve significant risk of loss and are not suitable for all investors. Past performance does not guarantee future results. The content shared in our community is for educational and informational purposes only and should not be considered financial advice."'))
story.append(Spacer(1, 2*mm))
story.append(ok('The About page has an expanded Risk and Transparency section that explicitly states the site is not a registered financial advisory service, licensed brokerage, or regulated investment firm.'))

story.append(Paragraph('6.2 Profit / Guarantee Claims', sH2))
story.append(ok('No problematic profit or guarantee claims found anywhere. All uses of "guarantee" are in responsible contexts (e.g., "Past performance does not guarantee future results"). FAQ answers on multiple pages explicitly state signals cannot guarantee profits. The homepage "100% Free to Join" refers only to cost, not profit outcomes.'))

story.append(Paragraph('6.3 Testimonials', sH2))
story.append(improve('The homepage displays 6 testimonials with star ratings (4-5 stars) from first-initial-pseudonym authors (e.g., "Ahmed K.", "Sarah M."). While these are NOT in structured data (which would be a more serious issue), displaying star-rated testimonials from apparently unverified authors on a YMYL financial site is a trust concern. The section has a disclaimer ("Results vary. Trading involves risk") but the star ratings may still create misleading impressions of verified performance. Consider removing star ratings or adding a clearer "Community Feedback (for illustrative purposes)" label.'))

story.append(Paragraph('6.4 Credentials and Regulatory Claims', sH2))
story.append(ok('No fake credentials found. The About page explicitly disclaims being a registered advisory, licensed brokerage, or regulated firm. No references to SEC, FCA, or regulatory bodies as if affiliated.'))

story.append(Paragraph('6.5 Missing Trust Pages', sH2))
story.append(improve('The site has no dedicated Privacy Policy, Terms of Service, Disclaimer/Risk Disclosure, or Contact page. For a YMYL financial site, these are expected by Google quality raters and users. The inline footer disclaimers partially address the risk disclosure need, but standalone pages carry more weight for both trust signals and legal completeness. This should be addressed after the 7-day stability period.'))

story.append(Paragraph('6.6 Urgency Language', sH2))
story.append(info('The homepage contains one mild urgency phrase: "DON\'T MISS THE NEXT MARKET SETUP". This is not aggressive (no "act now", "limited time", or "last chance") but is worth noting for a YMYL site. Consider softening to neutral language like "Follow the next market discussion".'))

# ============================================================
# SECTION 7: TELEGRAM CONVERSION AUDIT
# ============================================================
story.append(PageBreak())
story.append(Paragraph('7. Telegram Conversion Audit', sH1))
story.append(HRFlowable(width='100%', thickness=1, color=ACCENT, spaceBefore=2, spaceAfter=8))

story.append(Paragraph('The primary conversion destination is https://t.me/ForexWizzz. Every page includes a sticky Telegram CTA button (bottom-right, visible on scroll) and in-body CTA sections.', sBody))

story.append(Paragraph('7.1 Link Consistency', sH2))
story.append(ok('All 12 pages link to exactly one Telegram URL: https://t.me/ForexWizzz. No variant URLs, no misspellings, no broken Telegram links detected.'))

story.append(Paragraph('7.2 CTA Placement Assessment', sH2))
story.append(ok('StickyTelegramButton is consistently placed across all pages - fixed bottom-right with Telegram blue color, accessible, and non-intrusive. The button includes proper aria-label for accessibility.'))
story.append(Spacer(1, 2*mm))
story.append(info('In-body CTAs appear 1-2 times per content page. On educational pages with 20+ sections, this frequency is appropriate and does not overwhelm the content. The CTA text consistently uses action-oriented but non-deceptive language (e.g., "Join the ForexWizard Community on Telegram", "Get Free Signals"). Users can reasonably understand they are joining a Telegram community for trading discussion and signals.'))

story.append(Paragraph('7.3 CTA Transparency', sH2))
story.append(ok('The site is transparent about what users receive by joining: the homepage and signal pages clearly describe the Telegram community as providing free signals, market analysis, and educational discussion. No hidden costs or misleading promises are made about the Telegram experience.'))

# ============================================================
# SECTION 8: UX / MOBILE AUDIT
# ============================================================
story.append(PageBreak())
story.append(Paragraph('8. UX / Mobile Audit', sH1))
story.append(HRFlowable(width='100%', thickness=1, color=ACCENT, spaceBefore=2, spaceAfter=8))

story.append(Paragraph('Technical pages with data-dense content (tables, formulas, calculations) were specifically inspected for mobile/responsive issues. The site uses Tailwind CSS with responsive prefixes (sm:, md:, lg:) throughout.', sBody))

story.append(Paragraph('8.1 Table Responsiveness', sH2))
story.append(ok('The xauusd-pip-value page table has an overflow-x-auto wrapper, enabling horizontal scrolling on small screens. The table uses text-sm for compact rendering.'))
story.append(Spacer(1, 2*mm))
story.append(ok('The xauusd-lot-size and best-time-to-trade-xauusd pages use div-based layouts instead of HTML tables, which are inherently more responsive.'))

story.append(Paragraph('8.2 General Responsive Behavior', sH2))
story.append(ok('All pages use responsive Tailwind classes. Navigation adapts for mobile. The StickyTelegramButton hides its text label on small screens ("hidden sm:inline") showing only the icon. Card layouts use responsive grid columns.'))
story.append(Spacer(1, 2*mm))
story.append(info('The glassmorphism cards with gradient borders use hover:scale-[1.02] transforms. These are well-supported on modern mobile browsers but may cause slight reflow on very old devices. Not a concern for the target audience.'))

# ============================================================
# SECTION 9: PERFORMANCE AUDIT
# ============================================================
story.append(Paragraph('9. Performance Audit', sH1))
story.append(HRFlowable(width='100%', thickness=1, color=ACCENT, spaceBefore=2, spaceAfter=8))

perf_headers = ['Metric', 'Value', 'Assessment']
perf_rows = [
    ['Total build output', '8.6 MB', 'Acceptable for 12 pages with images'],
    ['Total JS (all chunks)', '679 KB', 'Moderate - largest chunk is 225KB (likely framer-motion)'],
    ['Total CSS', '142 KB', 'Acceptable for Tailwind with custom properties'],
    ['Largest HTML file', '305 KB (how-to-trade-xauusd)', 'Large but acceptable for a comprehensive guide'],
    ['Smallest HTML file', '94 KB (about)', 'Normal'],
    ['404 page HTML', '14 KB', 'Normal'],
    ['Client components', '2 (fade-section, candlestick-background)', 'Minimal - good'],
    ['Unused UI components', '38 of 48 in /components/ui/', 'No runtime impact (tree-shaken out)'],
    ['Images in /public/', 'og-image.jpg, telegram-screenshot.jpg, 5x earning-*.jpg, favicon, apple-touch-icon, logo.svg', 'Reasonable'],
]
story.append(make_table(perf_headers, perf_rows, [100, 120, available_width - 220]))
story.append(Spacer(1, 3*mm))

story.append(improve('The largest JS chunk (225KB) is likely the framer-motion library. For a content-heavy educational site where animations are decorative (scroll-triggered fades, glowing buttons), consider whether framer-motion is worth the bundle cost. CSS-only animations could replace most FadeSection/FadeIn behaviors at near-zero JS cost. This is a post-stability optimization.'))
story.append(Spacer(1, 2*mm))
story.append(info('The PulsingGlow component uses infinite CSS-like animation (box-shadow pulsing) which is lightweight. The CandlestickBackground renders a static SVG with CSS animation delays - also lightweight. No heavy runtime animation concerns.'))

# ============================================================
# SECTION 10: STRUCTURED DATA AUDIT
# ============================================================
story.append(PageBreak())
story.append(Paragraph('10. Structured Data Audit', sH1))
story.append(HRFlowable(width='100%', thickness=1, color=ACCENT, spaceBefore=2, spaceAfter=8))

schema_headers = ['Page', 'FAQ Schema', 'FAQ Count', 'JSON-LD Valid', 'Notes']
schema_rows = [
    ['Homepage', 'No', '-', 'Yes (WebSite + Organization)', 'No FAQ needed on homepage'],
    ['About', 'No', '-', 'Yes (WebSite + Organization)', 'No FAQ on about page'],
    ['Forex Signals', 'Yes', '8', 'Yes', 'FAQPage schema'],
    ['Gold Signals', 'Yes', '7', 'Yes', 'FAQPage schema'],
    ['XAUUSD Analysis', 'Yes', '8', 'Yes', 'FAQPage schema'],
    ['Price Action', 'Yes', '5', 'Yes', 'FAQPage schema'],
    ['S&R', 'Yes', '5', 'Yes', 'FAQPage schema'],
    ['Trading Strategy', 'Yes', '7', 'Yes', 'FAQPage schema'],
    ['How to Trade', 'Yes', '8', 'Yes', 'FAQPage schema'],
    ['Best Time', 'Yes', '8', 'Yes', 'FAQPage schema'],
    ['Lot Size', 'Yes', '8', 'Yes', 'FAQPage schema'],
    ['Pip Value', 'Yes', '9', 'Yes', 'FAQPage schema'],
]
story.append(make_table(schema_headers, schema_rows, [70, 55, 50, 100, available_width - 275]))
story.append(Spacer(1, 3*mm))

story.append(ok('All FAQ schemas are valid: proper @type FAQPage, mainEntity array, Question/Answer structure. FAQ JSON-LD content matches visible FAQ content exactly (both derived from the same faqs array). No duplicate schemas. No fake review/rating schema. No invalid organization/person claims. Organization schema in layout is minimal and accurate.'))
story.append(Spacer(1, 2*mm))
story.append(fix_now('xauusd-pip-value OG image alt contains double-encoded entity: source code has &amp; in a JS string literal, which Next.js re-encodes to &amp;amp; in rendered HTML. This will display as literal "&amp;" in social media share previews. Fix: change &amp; to & in the metadata alt string (line 27 of page.tsx).'))
story.append(Spacer(1, 2*mm))
story.append(improve('OG type inconsistency: 3 pages use type: "website" when "article" would be more appropriate (gold-signals, xauusd-analysis, xauusd-trading-strategy). These are content-rich educational pages, not homepage-level references. This is a minor signal for social sharing platforms.'))

# ============================================================
# SECTION 11: RAW ENTITY / RENDERING AUDIT
# ============================================================
story.append(PageBreak())
story.append(Paragraph('11. Raw Entity / Rendering Audit', sH1))
story.append(HRFlowable(width='100%', thickness=1, color=ACCENT, spaceBefore=2, spaceAfter=8))

story.append(Paragraph('Following the previous fix on /xauusd-lot-size/ where raw &ldquo;/&rdquo; entities were found in JS string literals, all 12 pages were inspected for similar issues in the rendered build output.', sBody))

story.append(Paragraph('11.1 Rendered HTML Entity Check', sH2))
story.append(ok('No raw HTML entities (&ldquo;, &rdquo;, &rsquo;, &mdash;, &ndash;, &lt;, &gt;) found as visible literal text in any rendered page body. Previous fix on xauusd-lot-size confirmed clean.'))

story.append(Paragraph('11.2 JS String Literal Check', sH2))
story.append(ok('All HTML entities in page source code are correctly placed in JSX HTML content between tags (e.g., p, span, h2 tags), where React decodes them properly. No entities were found inside JavaScript string literals (desc properties, variable assignments, etc.) across any page.'))

story.append(Paragraph('11.3 The One Exception', sH2))
story.append(fix_now('The xauusd-pip-value page has &amp; literally inside a JS string in the metadata export object (OG image alt field). This is NOT in JSX HTML - it is in a JavaScript object property. Next.js HTML-encodes the &amp; to &amp;amp; in the rendered output. This is the same class of bug that was previously fixed on xauusd-lot-size, but in metadata rather than page content. The rendered meta tag shows: content="ForexWizzz - Free Forex &amp;amp; Gold Trading Telegram Community".'))

# ============================================================
# SECTION 12: FINANCIAL ACCURACY AUDIT
# ============================================================
story.append(Paragraph('12. Financial Accuracy Audit', sH1))
story.append(HRFlowable(width='100%', thickness=1, color=ACCENT, spaceBefore=2, spaceAfter=8))

story.append(Paragraph('Educational financial content was reviewed for dangerous universal claims that could mislead traders. XAUUSD pip values, lot sizes, contract sizes, leverage, and margin were specifically examined.', sBody))

story.append(ok('Financial accuracy is exemplary. The xauusd-pip-value page is exceptionally well-crafted: FAQ answers explicitly state there is no universal gold pip value. The calculation table is labeled "Hypothetical example under a specified broker convention" with specific assumptions stated. The xauusd-lot-size page contains 107 occurrences of the word "broker" and 34 of "your broker" - demonstrating thorough broker-variation awareness. No universal pip value claims, no guaranteed contract sizes, no leverage stated as standard.'))

story.append(Spacer(1, 2*mm))
story.append(info('Minor note: The pip value table column header "Value of 1 Pip ($0.01 move)" visually pairs "1 Pip" with "($0.01 move)" which could be misread out of context. The table is preceded by a clear hypothetical disclaimer and followed by a strong footer disclaimer. The risk is very low given the surrounding context, but the column header could be made more explicit (e.g., "Hypothetical: 1 Pip = $0.01 move") for extra safety.'))

# ============================================================
# SECTION 13: 404 / ERROR HANDLING
# ============================================================
story.append(PageBreak())
story.append(Paragraph('13. 404 / Error Handling', sH1))
story.append(HRFlowable(width='100%', thickness=1, color=ACCENT, spaceBefore=2, spaceAfter=8))

story.append(Paragraph('The 404 page behavior was inspected via the build output. The site generates both /404/ and /_not-found/ directories in the static export.', sBody))

story.append(fix_now('The 404 page uses the default Next.js 404 design - a white background with system font rendering showing "404 This page could not be found." This creates two problems: (1) Visual mismatch - the site has a dark theme, so the white-background 404 looks completely out of place and may confuse users into thinking they have left the site. (2) No navigation - the default 404 provides no links back to the site content, leaving users stranded. (3) Dual title tags - the 404 HTML has both the default "404: This page could not be found" and the layout title. Fix: create a custom not-found.tsx that matches the site dark theme and includes navigation links back to key pages.'))

story.append(Spacer(1, 2*mm))
story.append(ok('The 404 page correctly has noindex robots meta, preventing search engines from indexing error pages.'))

# ============================================================
# SECTION 14: PAGE-BY-PAGE SCORECARD
# ============================================================
story.append(PageBreak())
story.append(Paragraph('14. Page-by-Page Scorecard', sH1))
story.append(HRFlowable(width='100%', thickness=1, color=ACCENT, spaceBefore=2, spaceAfter=8))

sc_headers = ['Page', 'Title', 'H1', 'Canonical', 'Sitemap', 'FAQ', 'Links', 'Trust', 'Issue']
sc_rows = [
    ['/', 'OK', 'OK', 'OK', 'OK', 'N/A', '9', 'OK', 'No metadata export (uses layout)'],
    ['/forex-signals/', 'OK', 'OK', 'OK', 'OK', '8', '9', 'OK', 'None'],
    ['/gold-signals/', 'OK', 'OK', 'OK', 'OK', '7', '17', 'OK', 'None'],
    ['/xauusd-analysis/', 'OK', 'OK', 'OK', 'OK', '8', '15', 'OK', 'None'],
    ['/about/', 'OK', 'OK', 'OK', 'OK', 'N/A', '10', 'OK', 'Meta/OG desc mismatch'],
    ['/price-action/', 'OK', 'OK', 'OK', 'OK', '5', '16', 'OK', 'Meta/OG desc mismatch'],
    ['/s&r/', 'OK', 'OK', 'OK', 'OK', '5', '17', 'OK', 'Meta/OG desc mismatch'],
    ['/strategy/', 'OK', 'OK', 'OK', 'OK', '7', '13', 'OK', 'None'],
    ['/how-to-trade/', 'OK', 'OK', 'OK', 'OK', '8', '26', 'OK', 'None'],
    ['/best-time/', 'OK', 'OK', 'OK', 'OK', '8', '21', 'OK', 'None'],
    ['/lot-size/', 'OK', 'OK', 'OK', 'OK', '8', '14', 'OK', 'None'],
    ['/pip-value/', 'OK', 'OK', 'OK', 'OK', '9', '15', 'OK', 'OG alt double-encoded'],
]
story.append(make_table(sc_headers, sc_rows, [58, 32, 32, 40, 40, 30, 30, 30, available_width - 292]))
story.append(Spacer(1, 3*mm))
story.append(Paragraph('Legend: OK = No issues found. N/A = Not applicable. All pages pass core technical checks. The "Issue" column shows only page-specific findings. Site-wide issues (404 page, missing trust pages, brand inconsistency) affect all pages and are covered in the priority report below.', sBodySmall))

# ============================================================
# SECTION 15: FINAL PRIORITY REPORT
# ============================================================
story.append(PageBreak())
story.append(Paragraph('15. Final Priority Report', sH1))
story.append(HRFlowable(width='100%', thickness=1, color=ACCENT, spaceBefore=2, spaceAfter=8))

# FIX NOW
story.append(Paragraph('FIX NOW', ParagraphStyle('FixNowH2', parent=sH2, textColor=SEM_ERROR, fontSize=16)))
story.append(HRFlowable(width='100%', thickness=0.5, color=SEM_ERROR, spaceBefore=1, spaceAfter=6))

story.append(Paragraph('1. xauusd-pip-value OG Image Alt Double-Encoded Entity', sH3))
story.append(Paragraph('<b>Page/File:</b> /home/z/my-project/src/app/xauusd-pip-value/page.tsx, line 27', sBodySmall))
story.append(Paragraph('<b>Problem:</b> The OG image alt in the metadata export contains a literal &amp; in a JavaScript string: alt: "ForexWizzz - Free Forex &amp; Gold Trading Telegram Community". Next.js re-encodes this to &amp;amp; in the rendered HTML. Social media crawlers will display "&amp;" as literal text in share previews.', sBodySmall))
story.append(Paragraph('<b>Why it matters:</b> Social share previews for /xauusd-pip-value/ will show a broken alt text with "amp;" visible. This affects every share on Twitter, LinkedIn, Discord, and other platforms that use OG meta tags.', sBodySmall))
story.append(Paragraph('<b>Fix:</b> Change line 27 from: alt: "ForexWizzz - Free Forex &amp; Gold Trading Telegram Community" to: alt: "ForexWizzz - Free Forex & Gold Trading Telegram Community" (replace &amp; with plain &).', sBodySmall))
story.append(Spacer(1, 4*mm))

story.append(Paragraph('2. Custom 404 Page Missing', sH3))
story.append(Paragraph('<b>Page/File:</b> No /home/z/my-project/src/app/not-found.tsx exists', sBodySmall))
story.append(Paragraph('<b>Problem:</b> The 404 page uses the default Next.js white-background design with system fonts, showing "404 This page could not be found." This is visually disconnected from the dark-themed site and provides no navigation back to content.', sBodySmall))
story.append(Paragraph('<b>Why it matters:</b> Users hitting a broken link or mistyped URL see a jarring white page with no way back. This hurts user experience and trust, especially during the indexing period when Google may follow links and encounter 404s.', sBodySmall))
story.append(Paragraph('<b>Fix:</b> Create /home/z/my-project/src/app/not-found.tsx with a dark-themed 404 page matching the site design, including: (a) the site navigation header, (b) a friendly "Page not found" message, (c) links back to homepage and key content pages, (d) the standard site footer with risk disclaimer. Use the same layout patterns as other pages (CandlestickBackground, glass styling).', sBodySmall))
story.append(Spacer(1, 6*mm))

# IMPROVE AFTER 7-DAY WAIT
story.append(Paragraph('IMPROVE AFTER 7-DAY WAIT', ParagraphStyle('ImproveH2', parent=sH2, textColor=SEM_WARNING, fontSize=16)))
story.append(HRFlowable(width='100%', thickness=0.5, color=SEM_WARNING, spaceBefore=1, spaceAfter=6))

improve_items = [
    ('HIGH', 'Add Trust Pages', 'Create Privacy Policy, Terms of Service, Disclaimer/Risk Disclosure, and Contact pages. Link from all page footers. These are expected by Google quality raters for YMYL sites and improve overall site trust signals. Without them, the site may struggle to earn Google\'s trust for ranking competitive financial keywords.'),
    ('HIGH', 'Standardize Brand Name', 'The site has a pervasive brand inconsistency: the domain is forexwizard.online, the Telegram handle is @ForexWizzz, the layout/schema uses "ForexWizzz", but all 11 sub-pages use "ForexWizard" in body text (8-21 occurrences per page) and FAQ structured data. Google rich snippets will show "ForexWizard" while the page header shows "ForexWizzz". Pick one name and apply consistently.'),
    ('HIGH', 'Add Homepage Links to Educational Guides', 'The homepage currently only links to 4 of 11 sub-pages. Adding a "Learning Center" or "Guides" section to the homepage linking to the 7 educational guides (how-to-trade, trading-strategy, price-action, support-resistance, best-time, lot-size, pip-value) would significantly improve internal link equity and crawl priority for these pages.'),
    ('MEDIUM', 'Rework Homepage Testimonials', 'Remove star ratings from the 6 homepage testimonials or add a clearer "Community Feedback (for illustrative purposes)" label above the section. For a YMYL financial site, star-rated unverified testimonials can be perceived as misleading even with disclaimers.'),
    ('MEDIUM', 'Standardize Footer Across All Pages', 'Some pages have 5-link footers while others have 2-3 links. Create a consistent footer component used across all pages with links to: Home, Forex Signals, Gold Signals, XAUUSD Analysis, About, Privacy Policy, Terms, Contact (once those pages exist).'),
    ('MEDIUM', 'Fix Meta/OG Description Mismatches', 'Three pages have different meta descriptions vs OG descriptions: about (different wording), how-to-read-xauusd-price-action (different phrasing), xauusd-support-resistance (slightly different wording). Align these for consistency.'),
    ('MEDIUM', 'Increase Internal Links to Low-Visibility Pages', '/xauusd-pip-value/ (3 inbound), /how-to-trade-xauusd/ (6 inbound), and /best-time-to-trade-xauusd/ (4 inbound) have relatively few inbound links. Add contextual links from related pages where natural (e.g., best-time-to-trade could link to pip-value for risk calculations).'),
    ('LOW', 'Normalize OG Type', 'Three content pages use type: "website" when "article" would be more semantically correct (gold-signals, xauusd-analysis, xauusd-trading-strategy). This is a minor signal for social sharing platforms.'),
    ('LOW', 'Evaluate Framer-Motion Bundle Cost', 'The largest JS chunk is 225KB (likely framer-motion). Most animations are simple scroll-triggered fades that could be replaced with CSS-only animations (IntersectionObserver + CSS transitions) at near-zero JS cost. This would reduce total JS from 679KB to approximately 450KB.'),
    ('LOW', 'Soften Homepage Urgency Language', 'Change "DON\'T MISS THE NEXT MARKET SETUP" to neutral language like "Follow the Next Market Discussion" for YMYL compliance.'),
]

for priority, title, desc in improve_items:
    story.append(Paragraph(f'<b>[{priority}] {title}</b>', sBodySmall))
    story.append(Paragraph(desc, sBodySmall))
    story.append(Spacer(1, 2*mm))

story.append(Spacer(1, 4*mm))

# LEAVE ALONE
story.append(Paragraph('LEAVE ALONE', ParagraphStyle('OKH2', parent=sH2, textColor=SEM_SUCCESS, fontSize=16)))
story.append(HRFlowable(width='100%', thickness=0.5, color=SEM_SUCCESS, spaceBefore=1, spaceAfter=6))

leave_alone_items = [
    'Trailing slash configuration (trailingSlash: true) - working correctly',
    'Static export pattern (output: "export") with /slug/index.html - clean',
    'All canonical URLs - correct format, non-www, HTTPS, trailing slash',
    'All title tags - unique, properly sized, keyword-aligned',
    'All meta descriptions - unique, 132-156 chars, no duplicates',
    'H1 structure - exactly one H1 per page, proper hierarchy',
    'All 10 FAQ schemas - valid JSON-LD, match visible content, no duplicates',
    'WebSite + Organization schema in layout - minimal, accurate',
    'Risk disclaimers - comprehensive, consistent across all 12 pages',
    'No profit/guarantee claims - all "guarantee" uses are responsible',
    'No fake credentials or regulatory claims - honest disclaimers',
    'Financial accuracy - exemplary broker-variation awareness throughout',
    'Telegram link consistency - single correct URL across all pages',
    'Internal link hygiene - zero broken links, zero missing slashes',
    'Sitemap - exactly 12 URLs, correct format, no duplicates',
    'Robots.txt - allows all crawlers, correct sitemap reference',
    'Server Components architecture - all pages are server-rendered',
    'Client component count - only 2 (fade-section, candlestick-background)',
    'No orphan pages - every page linked from at least one other',
    'Keyword separation - clean intent differentiation across all pages',
    'HTML entity rendering - all entities correctly placed in JSX HTML',
    'About page Risk and Transparency section - excellent trust establishment',
]

for item in leave_alone_items:
    story.append(bullet(item))

story.append(Spacer(1, 6*mm))

# TOP 5 NEXT ACTIONS
story.append(Paragraph('TOP 5 NEXT ACTIONS', ParagraphStyle('Top5H2', parent=sH2, textColor=ACCENT, fontSize=16)))
story.append(HRFlowable(width='100%', thickness=0.5, color=ACCENT, spaceBefore=1, spaceAfter=6))

top5 = [
    ('1', 'FIX: xauusd-pip-value OG alt entity', 'Change &amp; to & in the metadata alt string on line 27. One-line fix, rebuild, deploy. This is safe to do during the stability period since it only affects social share metadata, not page content or rankings.'),
    ('2', 'FIX: Create custom 404 page', 'Create not-found.tsx with dark theme, navigation, and links. This improves UX for any broken links Google follows during indexing. Also safe during stability period.'),
    ('3', 'WAIT: Add Privacy Policy + Terms + Disclaimer + Contact', 'After the 7-day stability period. These are the highest-impact trust improvements for a YMYL site. Create all four pages and link from every footer.'),
    ('4', 'WAIT: Standardize brand name across all pages', 'After stability period. Choose "ForexWizzz" or "ForexWizard" and apply consistently in body text, FAQ structured data, and CTAs. This affects 10+ pages and FAQ schema, so it requires a careful find-and-replace operation and rebuild.'),
    ('5', 'WAIT: Add educational guide links to homepage', 'After stability period. Add a "Learning Center" section to the homepage linking to the 7 educational guides. This improves crawl priority and internal link equity distribution.'),
]

for num, title, desc in top5:
    story.append(Paragraph(f'<b>Action {num}: {title}</b>', sBody))
    story.append(Paragraph(desc, sBody))
    story.append(Spacer(1, 3*mm))

# Build PDF
story.append(Spacer(1, 10*mm))
story.append(HRFlowable(width='100%', thickness=1, color=BORDER, spaceBefore=4, spaceAfter=4))
story.append(Paragraph('End of Audit Report | Generated 2026-08-30 | Read-Only Inspection - No Files Changed', ParagraphStyle('Footer', parent=sBodySmall, alignment=TA_CENTER, textColor=TEXT_MUTED)))

doc.build(story)
print(f'PDF generated: {output_path}')
print(f'File size: {os.path.getsize(output_path) / 1024:.1f} KB')
