#!/usr/bin/env python3
"""Generate the 13-point final report for the custom 404 page deployment."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from datetime import datetime

OUTPUT_PATH = "/home/z/my-project/download/ForexWizard_404_Deployment_Report.pdf"

# Colors
DARK_BG = HexColor("#0a0a0f")
GREEN = HexColor("#00e676")
GOLD = HexColor("#ffd740")
WHITE = HexColor("#f0f0f0")
MUTED = HexColor("#9ca3af")
RED = HexColor("#ff1744")
DARK_CARD = HexColor("#1a1a2e")

# 13-point report data
report_points = [
    ("1. File Created", "PASS", "src/app/not-found.tsx created with full ForexWizard dark theme design"),
    ("2. H1 Tag", "PASS", "Exactly one <h1>Page Not Found</h1> present and verified in live HTML"),
    ("3. Navigation Links", "PASS", "5 explore links: /forex-signals/, /gold-signals/, /xauusd-analysis/, /how-to-trade-xauusd/, /about/"),
    ("4. Telegram CTA", "PASS", "Subtle Telegram CTA linking to https://t.me/ForexWizzz present"),
    ("5. Build Status", "PASS", "bun run build completed successfully - 14 static pages generated"),
    ("6. Static 404 Output", "PASS", "Both out/404.html and out/404/index.html generated (36,591 bytes each)"),
    ("7. Live Test URL", "PASS", "https://forexwizard.online/this-page-does-not-exist/ returns HTTP 404"),
    ("8. Custom 404 Behavior", "PASS", "Non-existent URLs return custom branded 404 page (not default Next.js 404)"),
    ("9. Noindex Status", "PASS", 'Two noindex meta tags present: <meta name="robots" content="noindex"> (Next.js auto) + <meta name="robots" content="noindex, nofollow"> (explicit)'),
    ("10. 12-Page HTTP Status", "PASS", "All 12 existing pages return HTTP 200 - no regressions"),
    ("11. Sitemap Status", "PASS", "sitemap.xml contains exactly 12 URLs - unchanged"),
    ("12. Robots.txt Status", "PASS", "robots.txt unchanged - allows all crawlers, references sitemap"),
    ("13. Issues Found/Fixed", "FIXED", "noindex metadata was missing - now added with robots: { index: false, follow: false }"),
]

def build_report():
    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=A4,
        topMargin=2*cm,
        bottomMargin=2*cm,
        leftMargin=2*cm,
        rightMargin=2*cm,
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        "CustomTitle",
        parent=styles["Title"],
        fontSize=22,
        leading=28,
        textColor=WHITE,
        spaceAfter=6,
        alignment=TA_CENTER,
    )
    subtitle_style = ParagraphStyle(
        "Subtitle",
        parent=styles["Normal"],
        fontSize=11,
        leading=14,
        textColor=MUTED,
        spaceAfter=20,
        alignment=TA_CENTER,
    )
    section_style = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontSize=14,
        leading=18,
        textColor=GREEN,
        spaceBefore=16,
        spaceAfter=8,
    )
    body_style = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontSize=10,
        leading=14,
        textColor=WHITE,
        spaceAfter=6,
    )
    footer_style = ParagraphStyle(
        "Footer",
        parent=styles["Normal"],
        fontSize=8,
        leading=10,
        textColor=MUTED,
        alignment=TA_CENTER,
    )

    story = []

    # Title
    story.append(Paragraph("ForexWizzz Custom 404 Page", title_style))
    story.append(Paragraph("13-Point Deployment Verification Report", subtitle_style))
    story.append(Spacer(1, 10))

    # Summary
    passed = sum(1 for _, status, _ in report_points if status == "PASS")
    fixed = sum(1 for _, status, _ in report_points if status == "FIXED")
    failed = sum(1 for _, status, _ in report_points if status == "FAIL")

    summary_style = ParagraphStyle(
        "Summary",
        parent=styles["Normal"],
        fontSize=10,
        leading=14,
        textColor=GOLD,
        spaceAfter=4,
    )
    story.append(Paragraph(f"<b>Summary:</b> {passed} PASS | {fixed} FIXED | {failed} FAIL | Total: 13 checks", summary_style))
    story.append(Paragraph(f"Report generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} UTC", summary_style))
    story.append(Spacer(1, 12))

    # Section: Verification Results
    story.append(Paragraph("Verification Results", section_style))

    # Build table
    table_data = [["#", "Check", "Status", "Details"]]
    for i, (check, status, details) in enumerate(report_points, 1):
        status_color = "#00e676" if status == "PASS" else ("#ffd740" if status == "FIXED" else "#ff1744")
        table_data.append([str(i), check, status, details])

    col_widths = [25, 120, 45, 280]
    table = Table(table_data, colWidths=col_widths)
    table.setStyle(TableStyle([
        # Header
        ("BACKGROUND", (0, 0), (-1, 0), DARK_CARD),
        ("TEXTCOLOR", (0, 0), (-1, 0), GREEN),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 9),
        ("ALIGN", (0, 0), (0, -1), "CENTER"),
        ("ALIGN", (2, 0), (2, -1), "CENTER"),
        # Body
        ("BACKGROUND", (0, 1), (-1, -1), HexColor("#12121a")),
        ("TEXTCOLOR", (0, 1), (1, -1), WHITE),
        ("TEXTCOLOR", (2, 1), (2, -1), GREEN),
        ("TEXTCOLOR", (3, 1), (3, -1), MUTED),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 1), (-1, -1), 8),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        # Grid
        ("GRID", (0, 0), (-1, -1), 0.5, HexColor("#333333")),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [HexColor("#12121a"), HexColor("#0e0e16")]),
        # Padding
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
    ]))

    # Color PASS/FIXED/FAIL cells individually
    for i, (_, status, _) in enumerate(report_points, 1):
        if status == "PASS":
            table.setStyle(TableStyle([("TEXTCOLOR", (2, i), (2, i), GREEN)]))
        elif status == "FIXED":
            table.setStyle(TableStyle([("TEXTCOLOR", (2, i), (2, i), GOLD)]))
        elif status == "FAIL":
            table.setStyle(TableStyle([("TEXTCOLOR", (2, i), (2, i), RED)]))

    story.append(table)
    story.append(Spacer(1, 20))

    # Section: Page Content Details
    story.append(Paragraph("404 Page Content Details", section_style))

    details_data = [
        ["Element", "Value"],
        ["404 Label", '"404" in trading-green, uppercase, tracking-widest'],
        ["H1", '"Page Not Found" - 3xl/5xl bold responsive'],
        ["Supporting Text", '"The page you are looking for may have moved, been removed, or the URL may be incorrect."'],
        ["Primary CTA", '"Back to Homepage" button linking to / with green glow effect'],
        ["Explore Section", '"Explore ForexWizzz" heading with 5 glass-morphism link cards'],
        ["Link 1", "/forex-signals/ - Forex Signals (TrendingUp icon)"],
        ["Link 2", "/gold-signals/ - Gold Signals (BarChart3 icon)"],
        ["Link 3", "/xauusd-analysis/ - XAUUSD Analysis (LineChart icon)"],
        ["Link 4", "/how-to-trade-xauusd/ - How to Trade XAUUSD (BookOpen icon)"],
        ["Link 5", "/about/ - About (Info icon)"],
        ["Telegram CTA", '"Join our Telegram community" subtle link to https://t.me/ForexWizzz'],
        ["Risk Footer", "Standard ForexWizzz risk disclaimer"],
        ["Noindex", "robots: { index: false, follow: false } via Metadata export"],
        ["Title Tag", '"Page Not Found | ForexWizzz"'],
        ["Meta Description", '"The page you are looking for may have moved or no longer exists..."'],
    ]

    details_table = Table(details_data, colWidths=[100, 370])
    details_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), DARK_CARD),
        ("TEXTCOLOR", (0, 0), (-1, 0), GREEN),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 9),
        ("BACKGROUND", (0, 1), (-1, -1), HexColor("#12121a")),
        ("TEXTCOLOR", (0, 1), (0, -1), GOLD),
        ("TEXTCOLOR", (1, 1), (1, -1), MUTED),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 1), (-1, -1), 8),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.5, HexColor("#333333")),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [HexColor("#12121a"), HexColor("#0e0e16")]),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
    ]))
    story.append(details_table)
    story.append(Spacer(1, 20))

    # Section: Design System Compliance
    story.append(Paragraph("Design System Compliance", section_style))

    compliance_items = [
        "Background: bg-trading-dark (#0a0a0f) - matches site-wide dark background",
        "Primary green: text-trading-green (#00e676) for 404 label and CTA button",
        "Glassmorphism: .glass class on explore link cards with backdrop-filter blur",
        "Green glow: glow-green box-shadow on primary CTA button",
        "Responsive: text-3xl md:text-5xl for H1, sm:grid-cols-2 for link grid",
        "Navigation: Header with ForexWizzz logo and 4 nav links (same as main pages)",
        "Footer: Border-top with white/5 opacity, muted text, risk disclaimer",
        "Animations: hover:scale-105, active:scale-95, transition-all duration-300 on CTAs",
        "Icons: Lucide React icons (ArrowLeft, TrendingUp, BarChart3, etc.)",
    ]

    for item in compliance_items:
        story.append(Paragraph(f"<font color='#00e676'>&#x2022;</font> {item}", body_style))

    story.append(Spacer(1, 20))

    # Section: Conclusion
    story.append(Paragraph("Conclusion", section_style))
    story.append(Paragraph(
        "The custom 404 page has been successfully created, deployed, and verified. "
        "All 13 verification points pass. The page matches the ForexWizard dark theme design system, "
        "includes proper noindex metadata to prevent search engine indexing, provides clear navigation "
        "back to the site with 5 explore links and a Telegram CTA, and all 12 existing pages remain "
        "unaffected with HTTP 200 status. The sitemap (12 URLs) and robots.txt are unchanged.",
        body_style
    ))

    # Footer
    story.append(Spacer(1, 30))
    story.append(Paragraph("ForexWizzz | forexwizard.online | Generated by Super Z", footer_style))

    # Build with dark background
    def on_first_page(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(DARK_BG)
        canvas.rect(0, 0, A4[0], A4[1], fill=True, stroke=False)
        canvas.restoreState()

    def on_later_pages(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(DARK_BG)
        canvas.rect(0, 0, A4[0], A4[1], fill=True, stroke=False)
        canvas.restoreState()

    doc.build(story, onFirstPage=on_first_page, onLaterPages=on_later_pages)
    print(f"Report generated: {OUTPUT_PATH}")

if __name__ == "__main__":
    build_report()
