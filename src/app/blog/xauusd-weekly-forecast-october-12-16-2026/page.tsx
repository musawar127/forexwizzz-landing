import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  Calendar,
  AlertTriangle,
  Target,
  CheckCircle2,
  BookOpen,
  LineChart,
  Layers,
  Activity,
  Minus,
} from "lucide-react";
import {
  FadeSection,
  FadeIn,
  HeroAnimation,
  PulsingGlow,
  StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";
import { getBlogPost } from "@/data/blog-posts";

const post = getBlogPost("xauusd-weekly-forecast-october-12-16-2026")!;

const CANONICAL = `https://forexwizard.online/blog/${post.slug}/`;
const IMAGE_URL = `https://forexwizard.online${post.image}`;
const IMAGE_BASE = post.image.replace(/\.jpg$/, "");
const HERO_WEBP_SRCSET = `${IMAGE_BASE}-640.webp 640w, ${IMAGE_BASE}-960.webp 960w, ${IMAGE_BASE}-1200.webp 1200w`;
const HERO_SIZES = "(max-width: 768px) 100vw, 768px";
const TELEGRAM_LINK = "https://t.me/ForexWizzz";

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  authors: [{ name: post.author.name, url: post.author.url }],
  creator: "Forex Wizard",
  publisher: "Forex Wizard",
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: post.title,
    description: post.description,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.modifiedAt,
    authors: [post.author.name],
    url: CANONICAL,
    siteName: "Forex Wizard",
    images: [
      {
        url: post.image,
        width: 1200,
        height: 630,
        alt: post.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.description,
    images: [post.image],
  },
};

const blogPostingStructuredData = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  image: [IMAGE_URL],
  datePublished: post.publishedAt,
  dateModified: post.modifiedAt,
  mainEntityOfPage: CANONICAL,
  author: {
    "@type": "Organization",
    name: post.author.name,
    url: post.author.url,
  },
  publisher: {
    "@type": "Organization",
    name: "Forex Wizard",
    url: "https://forexwizard.online/",
    logo: {
      "@type": "ImageObject",
      url: "https://forexwizard.online/apple-touch-icon.png",
    },
  },
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://forexwizard.online/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://forexwizard.online/blog/" },
    { "@type": "ListItem", position: 3, name: "XAUUSD Weekly Forecast Oct 12–16, 2026", item: CANONICAL },
  ],
};

/* ------------------------------------------------------------------ */
/*  CTA BUTTON                                                         */
/* ------------------------------------------------------------------ */
function TelegramCTA({
  text,
  variant = "primary",
  className = "",
}: {
  text: string;
  variant?: "primary" | "secondary" | "gold";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-bold text-base md:text-lg rounded-xl px-6 py-3.5 md:px-8 md:py-4 transition-all duration-300 cursor-pointer no-underline select-none";
  const variants = {
    primary:
      "bg-trading-green text-trading-dark glow-green hover:scale-105 hover:shadow-[0_0_30px_rgba(0,230,118,0.6)] active:scale-95",
    secondary:
      "glass-strong text-trading-green border border-trading-green/30 hover:bg-trading-green/10 hover:scale-105 active:scale-95",
    gold: "bg-trading-gold text-trading-dark glow-gold hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,64,0.6)] active:scale-95",
  };
  return (
    <a
      href={TELEGRAM_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      {text}
      <ArrowRight className="w-4 h-4" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  ARTICLE DATA                                                       */
/* ------------------------------------------------------------------ */
const keyLevelsTable = [
  { area: "Friday close", level: "~$4,194", why: "October 9 spot close — Investing.com historical", tone: "muted" as const },
  { area: "Immediate support", level: "$4,165–$4,180", why: "Recent Oct 6 structure below Friday close", tone: "gold" as const },
  { area: "Secondary support", level: "$4,130–$4,145", why: "Friday low / opening area and Thu–Fri recovery base", tone: "gold" as const },
  { area: "Major support", level: "$4,065–$4,105", why: "Oct 7 two-month low near $4,066 + repeated Oct 6–8 lows", tone: "gold" as const },
  { area: "Psychological support", level: "$4,000–$4,040", why: "Major round-number area beneath the October swing low", tone: "gold" as const },
  { area: "Immediate resistance", level: "$4,205–$4,210", why: "Friday Oct 9 high near $4,208", tone: "green" as const },
  { area: "Secondary resistance", level: "$4,220–$4,230", why: "October 2 high near $4,226", tone: "green" as const },
  { area: "Major resistance", level: "$4,255–$4,265", why: "September 28 high near $4,261 and previous structure", tone: "green" as const },
  { area: "Higher resistance", level: "$4,285–$4,320", why: "Late-September structure including the Sep 25 area", tone: "green" as const },
];

const economicEvents = [
  {
    day: "Monday, October 12 — Columbus Day / Reduced US Bond Liquidity",
    points: [
      "October 12 is Columbus Day. The Federal Reserve calendar marks the holiday, and SIFMA recommends a full market close for US-dollar-denominated fixed income securities.",
      "XAUUSD can still trade globally, but reduced US Treasury-market participation can affect normal liquidity and yield signals. Thinner conditions may magnify intraday moves.",
      "Do not assume the entire forex or gold market is closed — only US bond trading is formally impacted.",
    ],
  },
  {
    day: "Tuesday, October 13 — IMF Outlook & Fed Speakers",
    points: [
      "The IMF October 2026 World Economic Outlook full report is published during the IMF/World Bank Annual Meetings in Bangkok. Growth and inflation projections could affect broader risk sentiment, yields and safe-haven flows.",
      "Federal Reserve Governor Christopher Waller has a scheduled discussion. The listed topic is AI, so it may not contain monetary-policy guidance — but unscheduled policy comments or Q&A could still attract attention.",
    ],
  },
  {
    day: "Wednesday, October 14 — US CPI & Fed Beige Book",
    points: [
      "September 2026 CPI is released at 8:30 AM Eastern (5:30 PM PKT). Official source: US Bureau of Labor Statistics. Reuters consensus as of October 9: headline CPI approximately +3.7% year-over-year, core CPI approximately +2.5% year-over-year.",
      "Hotter-than-expected inflation could support Treasury yields and the US dollar, potentially pressuring non-yielding gold. Softer-than-expected inflation could reduce rate-hike expectations and potentially support gold.",
      "The Federal Reserve Beige Book is released at 2:00 PM Eastern (11:00 PM PKT). It summarizes economic conditions across Federal Reserve districts. Markets may focus on consumer demand, labor conditions, pricing pressure and business activity.",
      "The Beige Book is secondary to CPI but can influence expectations about the October 27–28 FOMC meeting.",
    ],
  },
  {
    day: "Thursday, October 15 — PPI, Retail Sales & Jobless Claims",
    points: [
      "At 8:30 AM Eastern (5:30 PM PKT): September PPI (source: BLS), September Retail Sales (source: US Census Bureau), and weekly initial jobless claims are expected around the same release window.",
      "Previous August Retail Sales printed +1.2% month-over-month. September spending growth is expected to slow from August — but verify the latest forecast immediately before the release.",
      "Stronger retail sales plus hotter PPI could strengthen USD/yields and increase Fed tightening expectations. Weaker demand/inflation could produce the opposite. Mixed data could cause two-way volatility.",
    ],
  },
  {
    day: "Friday, October 16 — Import Prices & Industrial Production",
    points: [
      "BLS releases September US Import and Export Price Indexes at 8:30 AM Eastern (5:30 PM PKT). The Federal Reserve releases Industrial Production and Capacity Utilization at 9:15 AM Eastern (6:15 PM PKT).",
      "These are generally less important for gold than CPI/PPI, but can still alter the week's final move through changes in inflation and growth expectations.",
    ],
  },
];

const checklistItems = [
  "Friday close around $4,194",
  "Friday high around $4,208",
  "$4,205–$4,210 resistance",
  "$4,220–$4,230 resistance",
  "$4,255–$4,265 resistance",
  "$4,285–$4,320 higher resistance",
  "$4,165–$4,180 support",
  "$4,130–$4,145 support",
  "$4,065–$4,105 major support",
  "$4,000–$4,040 psychological support",
  "US Dollar Index (DXY)",
  "US 10-year Treasury yield",
  "Wednesday CPI",
  "Wednesday Fed Beige Book",
  "Thursday PPI",
  "Thursday Retail Sales",
  "Thursday jobless claims",
  "Friday industrial production",
  "Geopolitical / oil headlines",
  "Daily market structure",
  "4H structure",
  "Position sizing",
  "Stop distance",
  "Risk-to-reward",
];

const faqs = [
  {
    q: "What is the XAUUSD weekly forecast for October 12–16, 2026?",
    a: "Gold begins the October 12–16 week near $4,194 after recovering sharply from Wednesday's two-month low near $4,066. The first support zone is approximately $4,165–$4,180, and the first resistance buyers need to clear is approximately $4,205–$4,210. The week's main catalyst is US CPI on Wednesday, October 14, followed by PPI and Retail Sales on Thursday, October 15.",
  },
  {
    q: "What are the main XAUUSD support levels this week?",
    a: "The nearest support zone is approximately $4,165–$4,180, anchored by recent Oct 6 structure. Below that, traders can monitor approximately $4,130–$4,145 (Friday low area), then the major $4,065–$4,105 zone (Oct 7 two-month low), and finally the psychological $4,000–$4,040 area.",
  },
  {
    q: "What are the main gold resistance levels this week?",
    a: "Immediate resistance is approximately $4,205–$4,210, anchored by Friday's high near $4,208. Above that, approximately $4,220–$4,230 (October 2 high near $4,226), then $4,255–$4,265 (September 28 high), and higher resistance at $4,285–$4,320 (late-September structure).",
  },
  {
    q: "Is XAUUSD bullish or bearish this week?",
    a: "Gold starts the week with improved short-term momentum after recovering from $4,066 to roughly $4,194. However, $4,205–$4,230 is now the first important resistance cluster. The short-term bias is cautiously constructive above nearby support, but broader confirmation requires acceptance above $4,205–$4,230. Downside risk returns if $4,165 and especially $4,130 fail. All scenarios are conditional.",
  },
  {
    q: "When is US CPI released this week?",
    a: "September 2026 US CPI is scheduled for Wednesday, October 14, 2026 at 8:30 AM Eastern Time, which is 5:30 PM Pakistan Standard Time (PKT). Official source: US Bureau of Labor Statistics.",
  },
  {
    q: "How can CPI affect gold prices?",
    a: "Hotter-than-expected inflation can support Treasury yields and the US dollar, which can pressure non-yielding gold. Softer-than-expected inflation can reduce rate-hike expectations and potentially support gold. The reaction is not guaranteed — watch how gold behaves against yields and the dollar after the release.",
  },
  {
    q: "When is US PPI released?",
    a: "September 2026 US PPI is scheduled for Thursday, October 15, 2026 at 8:30 AM Eastern Time, which is 5:30 PM PKT. Official source: US Bureau of Labor Statistics.",
  },
  {
    q: "When are US Retail Sales released?",
    a: "September 2026 US Retail Sales are scheduled for Thursday, October 15, 2026 at 8:30 AM Eastern Time, which is 5:30 PM PKT. Official source: US Census Bureau. Previous August Retail Sales printed +1.2% month-over-month.",
  },
  {
    q: "Is the gold market closed on Columbus Day?",
    a: "No. October 12 is Columbus Day, which affects US bond markets (SIFMA recommends a full close for US-dollar fixed income). XAUUSD can still trade globally, but reduced US Treasury-market participation may affect normal liquidity and yield signals. Thinner conditions can magnify intraday moves.",
  },
  {
    q: "What is the major XAUUSD level above $4,200?",
    a: "The first important resistance above $4,200 is the $4,205–$4,210 zone, anchored by Friday's high near $4,208. Above that, the $4,220–$4,230 cluster (October 2 high near $4,226) is the next hurdle. Clearing both would open the path toward $4,255–$4,265.",
  },
  {
    q: "What happens if gold breaks below $4,065?",
    a: "A decisive loss of the approximately $4,065 October low could bring the $4,000–$4,040 psychological support area back into focus. This would mark a broader bearish structure shift. However, this is a conditional scenario, not a prediction.",
  },
  {
    q: "Why do US Treasury yields affect gold?",
    a: "Gold pays no income, so when US Treasury yields rise the opportunity cost of holding gold increases. The 10-year Treasury yield finished Friday around 5.24%, which remains historically elevated and is a structural headwind for gold even when the dollar softens.",
  },
];

const continueLearning = [
  {
    href: "/xauusd-support-resistance/",
    title: "XAUUSD Support and Resistance",
    desc: "How to identify important gold support and resistance zones, mark key levels and combine them with market structure for clearer trade planning.",
    icon: <Layers className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/xauusd-analysis/",
    title: "XAUUSD Analysis",
    desc: "The main hub for XAUUSD and gold market analysis — price action, key levels, market structure and the broader analytical framework.",
    icon: <LineChart className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/tools/risk-reward-calculator/",
    title: "Risk Reward Calculator",
    desc: "Compare entry, stop loss and target distances for Forex and XAUUSD before committing to a trade during CPI week volatility.",
    icon: <Target className="w-7 h-7 text-trading-green" />,
    accent: "from-trading-green/10 to-transparent",
  },
  {
    href: "/tools/forex-market-hours/",
    title: "Forex Market Hours Clock",
    desc: "Live trading-session clock with EDT and PKT times — useful for timing entries around CPI, PPI and US data releases.",
    icon: <Clock className="w-7 h-7 text-trading-green" />,
    accent: "from-trading-green/10 to-transparent",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function WeeklyForecastOct12Oct16Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <header className="relative z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold text-foreground tracking-tight no-underline hover:text-trading-green transition-colors"
          >
            <img
              src="/brand/forexwizard-logo.webp"
              alt="ForexWizard logo"
              width={44}
              height={44}
              loading="eager"
              decoding="async"
              className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-lg object-cover"
            />
            Forex Wizard
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/forex-signals/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block"
            >
              Forex Signals
            </Link>
            <Link
              href="/gold-signals/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block"
            >
              Gold Signals
            </Link>
            <Link
              href="/xauusd-analysis/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block"
            >
              XAUUSD Analysis
            </Link>
            <Link
              href="/blog/"
              className="text-sm font-medium text-trading-gold hover:text-trading-gold/80 transition-colors no-underline"
            >
              Blog
            </Link>
            <Link
              href="/about/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden lg:block"
            >
              About
            </Link>
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-trading-green hover:text-trading-green/80 transition-colors no-underline"
            >
              Join on Telegram
            </a>
          </nav>
        </div>
      </header>

      <main className="min-h-screen bg-trading-dark text-foreground overflow-x-hidden">
        {/* HERO */}
        <section className="relative px-4 py-16 md:py-24 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-trading-gold/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-trading-green/5 rounded-full blur-[100px] pointer-events-none" />
          <CandlestickBackground />

          <HeroAnimation className="relative z-10 max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs text-muted-foreground/80 mb-6 flex-wrap"
            >
              <Link href="/" className="hover:text-trading-green transition-colors no-underline">
                Home
              </Link>
              <span className="text-muted-foreground/40">/</span>
              <Link href="/blog/" className="hover:text-trading-green transition-colors no-underline">
                Blog
              </Link>
              <span className="text-muted-foreground/40">/</span>
              <span className="text-foreground/80">
                XAUUSD Weekly Forecast Oct 12–16
              </span>
            </nav>

            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-gold">
                <Calendar className="w-4 h-4" />
                XAUUSD Weekly Forecast · Oct 12–16, 2026
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">
                XAUUSD Weekly Forecast Oct 12–16, 2026: Gold Key Levels &amp; CPI Week
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground/80 mb-8">
              Published {post.displayDate} · By{" "}
              <Link
                href="/about/"
                className="text-foreground/80 hover:text-trading-green no-underline"
              >
                {post.author.name}
              </Link>{" "}
              · {post.readingTime}
            </p>

            {/* Hero image (LCP candidate) */}
            <FadeIn delay={0.3} className="mb-8">
              <div className="glass-strong rounded-2xl overflow-hidden gradient-border">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={HERO_WEBP_SRCSET}
                    sizes={HERO_SIZES}
                  />
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    width={1200}
                    height={630}
                    className="w-full h-auto block"
                    loading="eager"
                    fetchPriority="high"
                  />
                </picture>
              </div>
            </FadeIn>

            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Gold enters the October 12–16 trading week near{" "}
                <strong className="text-foreground/90">$4,194</strong> after
                recovering sharply from Wednesday's two-month low near $4,066.
                The rebound followed softer US dollar conditions, some easing in
                Treasury yields, and bargain hunting after the low.
              </p>
              <p>
                But the macro environment remains difficult: the US 10-year
                Treasury yield finished Friday around{" "}
                <strong className="text-foreground/90">5.24%</strong>, and
                Reuters reported markets were pricing only around a 19% chance
                of another October hike but a much higher probability of at
                least one additional 25bp increase by December (as of Friday,
                October 9).
              </p>
              <p>
                This week is dominated by{" "}
                <strong className="text-foreground/90">US CPI on Wednesday</strong>,
                followed by PPI, Retail Sales and jobless claims on Thursday.
                Columbus Day on Monday may reduce US bond liquidity.
              </p>
              <p>
                Instead of predicting one guaranteed direction, this XAUUSD
                weekly forecast maps the verified gold levels and explains what
                would strengthen the bullish, range or bearish scenario.
              </p>
              <p className="text-foreground/90 font-medium">
                The levels below are approximate technical zones for educational
                analysis. They are not guaranteed entries or trade
                recommendations.
              </p>
            </div>
          </HeroAnimation>
        </section>

        {/* QUICK SUMMARY */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">XAUUSD Weekly Outlook: </span>
                <span className="text-trading-gold text-glow-gold">
                  Quick Summary
                </span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  XAU/USD enters October 12–16 near{" "}
                  <strong className="text-foreground/90">$4,194</strong> after
                  trading between approximately $4,066 and $4,208 during the
                  previous week — a weekly gain of roughly 1.3%.
                </p>
                <p>
                  The first important support zone is approximately{" "}
                  <strong className="text-foreground/90">$4,165–$4,180</strong>.
                  Below that, traders can monitor approximately{" "}
                  <strong className="text-foreground/90">$4,130–$4,145</strong>{" "}
                  and the major{" "}
                  <strong className="text-foreground/90">$4,065–$4,105</strong>{" "}
                  zone.
                </p>
                <p>
                  The first resistance buyers need to clear is approximately{" "}
                  <strong className="text-foreground/90">$4,205–$4,210</strong>.
                  Above that,{" "}
                  <strong className="text-foreground/90">$4,220–$4,230</strong>{" "}
                  becomes the next important technical area, followed by broader
                  resistance around{" "}
                  <strong className="text-foreground/90">$4,255–$4,265</strong>{" "}
                  and higher resistance at{" "}
                  <strong className="text-foreground/90">$4,285–$4,320</strong>.
                </p>
                <p>
                  The week's biggest scheduled US catalyst is{" "}
                  <strong className="text-foreground/90">CPI on Wednesday</strong>,
                  with PPI and Retail Sales on Thursday as the secondary catalyst.
                </p>
                <p>
                  Bias: recovery remains constructive while nearby supports hold,
                  but a stronger technical confirmation requires a break above
                  the $4,205–$4,230 resistance cluster.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* KEY LEVELS TABLE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Gold Price Forecast This Week: </span>
              <span className="text-trading-gold text-glow-gold">
                Key Levels Table
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              The following technical levels are derived from verified spot-gold
              price action through the October 9 close. Each zone is explained so
              you understand <em>why</em> it matters, not just where it sits.
            </p>

            {/* Desktop/table table */}
            <div className="hidden md:block glass-strong rounded-2xl overflow-hidden gradient-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 font-bold text-foreground">Area</th>
                    <th className="text-left p-4 font-bold text-foreground">Level</th>
                    <th className="text-left p-4 font-bold text-foreground">Why it matters</th>
                  </tr>
                </thead>
                <tbody>
                  {keyLevelsTable.map((row) => (
                    <tr key={row.area} className="border-b border-white/5 last:border-0">
                      <td className="p-4 text-muted-foreground align-top">{row.area}</td>
                      <td className="p-4 align-top">
                        <span
                          className={
                            row.tone === "gold"
                              ? "font-bold text-trading-gold"
                              : row.tone === "green"
                                ? "font-bold text-trading-green"
                                : "font-bold text-muted-foreground"
                          }
                        >
                          {row.level}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground align-top">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card view */}
            <div className="md:hidden space-y-4">
              {keyLevelsTable.map((row) => (
                <div key={row.area} className="glass-strong rounded-2xl p-5 gradient-border">
                  <p className="text-xs text-muted-foreground mb-1">{row.area}</p>
                  <p
                    className={
                      row.tone === "gold"
                        ? "text-2xl font-extrabold text-trading-gold mb-2"
                        : row.tone === "green"
                          ? "text-2xl font-extrabold text-trading-green mb-2"
                          : "text-2xl font-extrabold text-muted-foreground mb-2"
                    }
                  >
                    {row.level}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{row.why}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground/70 mt-4">
              Spot XAU/USD prices can differ slightly between brokers and
              liquidity providers. Treat these as approximate zones, not exact
              guaranteed values.
            </p>
          </div>
        </FadeSection>

        {/* PREVIOUS WEEK RECAP */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">What Happened to Gold </span>
                <span className="text-trading-gold text-glow-gold">Last Week?</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  XAUUSD finished Friday around $4,194 after recovering sharply
                  from Wednesday's two-month low near $4,066. The Friday range
                  spanned approximately $4,130.52 to $4,207.69.
                </p>
                <p>
                  Monday October 5 opened near $4,144 and closed around $4,140.
                  On Wednesday October 7, gold printed a weekly and two-month low
                  near $4,066. By Friday October 9, spot closed near $4,194 — a
                  weekly gain of approximately 1.3%.
                </p>
                <p>
                  The rebound followed softer US dollar conditions, some easing
                  in Treasury yields, and bargain hunting after the two-month
                  low. The US 10-year Treasury yield finished Friday around
                  5.24%, still historically elevated.
                </p>
                <p>
                  Reuters reported Friday that markets were pricing only around a
                  19% chance of another October hike but a much higher
                  probability of at least one additional 25bp increase by
                  December (as of Friday, October 9). The Federal Reserve raised
                  its target range to 3.75%–4.00% in September.
                </p>
                <p>
                  Also on Friday, the preliminary October University of Michigan
                  Consumer Sentiment index came in at 46.3, down from 48.1.
                  Year-ahead inflation expectations rose to 4.7% and long-run
                  expectations to 3.5%. Weak sentiment plus elevated inflation
                  expectations adds to the Fed's difficult growth/inflation
                  balance (source: Reuters, October 9).
                </p>
                <p>
                  For broader context on the macroeconomic forces behind gold,
                  see our{" "}
                  <Link
                    href="/blog/xauusd-fundamental-analysis/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    XAUUSD fundamental analysis guide
                  </Link>
                  .
                </p>
                <p className="text-sm text-muted-foreground/80 border-l-2 border-trading-gold/40 pl-4">
                  Source basis: Investing.com XAU/USD historical data and Reuters
                  October 9 gold report. Spot XAU/USD prices can differ slightly
                  by feed — this article uses approximate figures.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* TECHNICAL OUTLOOK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">XAUUSD Technical Outlook for </span>
                <span className="text-trading-gold text-glow-gold">Oct 12–16</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground/90">Daily structure:</strong>{" "}
                  Gold starts the week with improved short-term momentum after
                  recovering from $4,066 to roughly $4,194. The recovery is real,
                  but $4,205–$4,230 is now the first important resistance cluster.
                </p>
                <p>
                  <strong className="text-foreground/90">Short-term bias:</strong>{" "}
                  Recovering / cautiously constructive above nearby support.
                  Broader confirmation requires acceptance above $4,205–$4,230.
                </p>
                <p>
                  <strong className="text-foreground/90">Downside risk:</strong>{" "}
                  Returns if $4,165 and especially $4,130 fail. A confirmed break
                  beneath $4,105 would expose $4,065.
                </p>
                <p>
                  <strong className="text-foreground/90">Key invalidation:</strong>{" "}
                  The bullish recovery case invalidates on a decisive daily close
                  below $4,065. The bearish case invalidates on a sustained move
                  above $4,230. For a deeper framework on marking these zones,
                  see our{" "}
                  <Link
                    href="/xauusd-support-resistance/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    XAUUSD support and resistance guide
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* SUPPORT LEVELS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Gold Support Levels </span>
              <span className="text-trading-gold text-glow-gold">This Week</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="glass-strong rounded-2xl p-6 gradient-border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="w-5 h-5 text-trading-gold" />
                  <span className="text-xs font-bold text-muted-foreground tracking-wider">IMMEDIATE SUPPORT</span>
                </div>
                <p className="text-2xl font-extrabold text-trading-gold mb-3">$4,165–$4,180</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Recent Oct 6 structure and the area immediately below Friday's
                  close. This is the first zone buyers must defend to keep the
                  recovery intact.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-6 gradient-border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="w-5 h-5 text-trading-gold" />
                  <span className="text-xs font-bold text-muted-foreground tracking-wider">SECONDARY SUPPORT</span>
                </div>
                <p className="text-2xl font-extrabold text-trading-gold mb-3">$4,130–$4,145</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Friday low / opening area and the Thursday–Friday recovery base.
                  A loss here shifts momentum back to sellers.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-6 gradient-border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="w-5 h-5 text-trading-gold" />
                  <span className="text-xs font-bold text-muted-foreground tracking-wider">MAJOR SUPPORT</span>
                </div>
                <p className="text-2xl font-extrabold text-trading-gold mb-3">$4,065–$4,105</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Oct 7 two-month low near $4,066 plus repeated Oct 6–8 lows
                  around $4,103–$4,105. A decisive loss here could bring $4,000
                  into focus.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-6 gradient-border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="w-5 h-5 text-trading-gold" />
                  <span className="text-xs font-bold text-muted-foreground tracking-wider">PSYCHOLOGICAL SUPPORT</span>
                </div>
                <p className="text-2xl font-extrabold text-trading-gold mb-3">$4,000–$4,040</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Major round-number area beneath the October swing low. This is
                  the most-watched downside target if the $4,065 low fails.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* RESISTANCE LEVELS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Gold Resistance Levels </span>
              <span className="text-trading-green text-glow-green">This Week</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="glass-strong rounded-2xl p-6 gradient-border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-trading-green" />
                  <span className="text-xs font-bold text-muted-foreground tracking-wider">IMMEDIATE RESISTANCE</span>
                </div>
                <p className="text-2xl font-extrabold text-trading-green mb-3">$4,205–$4,210</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Friday October 9 high near $4,208. Reclaiming this zone is the
                  first condition for any bullish scenario.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-6 gradient-border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-trading-green" />
                  <span className="text-xs font-bold text-muted-foreground tracking-wider">SECONDARY RESISTANCE</span>
                </div>
                <p className="text-2xl font-extrabold text-trading-green mb-3">$4,220–$4,230</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  October 2 high near $4,226. This is where selling pressure
                  intensified in early October — the hardest cluster to clear.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-6 gradient-border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-trading-green" />
                  <span className="text-xs font-bold text-muted-foreground tracking-wider">MAJOR RESISTANCE</span>
                </div>
                <p className="text-2xl font-extrabold text-trading-green mb-3">$4,255–$4,265</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  September 28 high near $4,261 and previous structure. Reclaiming
                  it would mark a significant recovery.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-6 gradient-border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-trading-green" />
                  <span className="text-xs font-bold text-muted-foreground tracking-wider">HIGHER RESISTANCE</span>
                </div>
                <p className="text-2xl font-extrabold text-trading-green mb-3">$4,285–$4,320</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Late-September structure including the September 25 area. This
                  is the broader recovery target zone.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* SCENARIOS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-center">
              <span className="text-foreground">Three Possible Gold Price </span>
              <span className="text-trading-gold text-glow-gold">Scenarios</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 text-center max-w-2xl mx-auto">
              These are conditional scenarios, not guaranteed forecasts.
            </p>

            <div className="space-y-6">
              {/* Bullish */}
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-green/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-trading-green/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-trading-green" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-trading-green">Bullish Scenario</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground/90">What must happen first:</strong> A sustained move above approximately $4,205–$4,210 would clear Friday's high. A subsequent hold or retest above approximately $4,220–$4,230 would strengthen the recovery structure.
                  </p>
                  <p>
                    <strong className="text-foreground/90">Areas to monitor:</strong> $4,255–$4,265, then $4,285–$4,320. A softer CPI print on Wednesday could be the catalyst.
                  </p>
                  <p>
                    <strong className="text-foreground/90">Invalidation:</strong> A daily close back below $4,165.
                  </p>
                </div>
              </div>

              {/* Range */}
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-muted-foreground/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-muted-foreground/10 flex items-center justify-center">
                    <Minus className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-foreground">Range / Neutral Scenario</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground/90">What must happen first:</strong> Gold remains between approximately $4,140/$4,165 and $4,205/$4,230, consolidating after Friday's rebound.
                  </p>
                  <p>
                    <strong className="text-foreground/90">Key context:</strong> Traders should avoid treating movement inside the range as a confirmed breakout. Wednesday CPI could become the catalyst that breaks the range.
                  </p>
                  <p>
                    <strong className="text-foreground/90">Invalidation:</strong> A clean break and daily close outside either boundary — which then activates the bullish or bearish scenario.
                  </p>
                </div>
              </div>

              {/* Bearish */}
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-gold/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-trading-gold/10 flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-trading-gold" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-trading-gold">Bearish Scenario</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground/90">What must happen first:</strong> Price loses $4,165, then $4,130–$4,145 becomes important. A confirmed break beneath $4,105 would expose $4,065.
                  </p>
                  <p>
                    <strong className="text-foreground/90">Deeper target:</strong> A decisive loss of the approximately $4,065 October low could bring $4,000–$4,040 back into focus. A hotter CPI print could be the catalyst.
                  </p>
                  <p>
                    <strong className="text-foreground/90">Invalidation:</strong> A recovery back above $4,205.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ECONOMIC CALENDAR */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Economic Calendar for Gold — </span>
              <span className="text-trading-gold text-glow-gold">October 12–16</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              All times verified against official sources. Eastern Time is EDT
              (UTC-4) in October; Pakistan Standard Time (PKT, UTC+5) is EDT + 9
              hours. Columbus Day on Monday may reduce US bond liquidity.
            </p>

            {/* Desktop table */}
            <div className="hidden md:block glass-strong rounded-2xl overflow-hidden gradient-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 font-bold text-foreground">Day</th>
                    <th className="text-left p-4 font-bold text-foreground">ET</th>
                    <th className="text-left p-4 font-bold text-foreground">PKT</th>
                    <th className="text-left p-4 font-bold text-foreground">Event</th>
                    <th className="text-left p-4 font-bold text-foreground">Why it moves gold</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-muted-foreground align-top">Mon Oct 12</td>
                    <td className="p-4 text-muted-foreground align-top">All day</td>
                    <td className="p-4 text-muted-foreground align-top">All day</td>
                    <td className="p-4 text-foreground align-top font-medium">Columbus Day (US bond close)</td>
                    <td className="p-4 text-muted-foreground align-top">Reduced US Treasury liquidity; XAUUSD still trades but thinner conditions may magnify moves.</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-muted-foreground align-top">Tue Oct 13</td>
                    <td className="p-4 text-muted-foreground align-top">—</td>
                    <td className="p-4 text-muted-foreground align-top">—</td>
                    <td className="p-4 text-foreground align-top font-medium">IMF World Economic Outlook</td>
                    <td className="p-4 text-muted-foreground align-top">Growth/inflation projections could affect risk sentiment, yields and safe-haven flows.</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-muted-foreground align-top">Wed Oct 14</td>
                    <td className="p-4 text-foreground/90 align-top font-medium">8:30 AM</td>
                    <td className="p-4 text-foreground/90 align-top font-medium">5:30 PM</td>
                    <td className="p-4 text-foreground align-top font-medium">US CPI (Sep) — BLS</td>
                    <td className="p-4 text-muted-foreground align-top">Reuters consensus ~3.7% YoY headline, ~2.5% core. Hot → yields up → gold down; soft → opposite.</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-muted-foreground align-top">Wed Oct 14</td>
                    <td className="p-4 text-foreground/90 align-top font-medium">2:00 PM</td>
                    <td className="p-4 text-foreground/90 align-top font-medium">11:00 PM</td>
                    <td className="p-4 text-foreground align-top font-medium">Fed Beige Book</td>
                    <td className="p-4 text-muted-foreground align-top">Summary of economic conditions across Fed districts. Secondary to CPI but can influence Oct 27–28 FOMC expectations.</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-muted-foreground align-top">Thu Oct 15</td>
                    <td className="p-4 text-foreground/90 align-top font-medium">8:30 AM</td>
                    <td className="p-4 text-foreground/90 align-top font-medium">5:30 PM</td>
                    <td className="p-4 text-foreground align-top font-medium">PPI + Retail Sales + Claims</td>
                    <td className="p-4 text-muted-foreground align-top">PPI (BLS), Retail Sales (Census Bureau), weekly claims. Strong data → USD/yields up; weak → opposite.</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-muted-foreground align-top">Fri Oct 16</td>
                    <td className="p-4 text-foreground/90 align-top font-medium">8:30 / 9:15 AM</td>
                    <td className="p-4 text-foreground/90 align-top font-medium">5:30 / 6:15 PM</td>
                    <td className="p-4 text-foreground align-top font-medium">Import Prices + Industrial Production</td>
                    <td className="p-4 text-muted-foreground align-top">Less gold-sensitive but can alter inflation/growth expectations for the week's final move.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile card view */}
            <div className="md:hidden space-y-4">
              {economicEvents.map((ev) => (
                <div key={ev.day} className="glass-strong rounded-2xl p-5 gradient-border">
                  <h3 className="text-base font-bold text-foreground mb-3">{ev.day}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                    {ev.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground/70 mt-4">
              Sources: BLS, US Census Bureau, Federal Reserve, SIFMA, IMF.
              Re-verify times immediately before trading — release schedules can
              change.
            </p>
          </div>
        </FadeSection>

        {/* WHAT COULD MOVE GOLD MOST */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">What Could Move XAUUSD Most </span>
                <span className="text-trading-gold text-glow-gold">This Week?</span>
              </h2>
              <div className="space-y-3 text-base text-muted-foreground leading-relaxed">
                <p>Ranked conceptually by potential market impact:</p>
                <ol className="space-y-2 pl-2">
                  <li className="flex items-start gap-2"><span className="text-trading-gold font-bold shrink-0">#1</span><span><strong className="text-foreground/90">Wednesday CPI</strong> — the single most important US data release for gold this week.</span></li>
                  <li className="flex items-start gap-2"><span className="text-trading-gold font-bold shrink-0">#2</span><span><strong className="text-foreground/90">Thursday PPI + Retail Sales cluster</strong> — three releases in one window can produce two-way volatility.</span></li>
                  <li className="flex items-start gap-2"><span className="text-trading-gold font-bold shrink-0">#3</span><span><strong className="text-foreground/90">Treasury yields and USD reaction</strong> — how the market digests the data matters more than the data itself.</span></li>
                  <li className="flex items-start gap-2"><span className="text-trading-gold font-bold shrink-0">#4</span><span><strong className="text-foreground/90">Middle East / energy-price developments</strong> — geopolitical safe-haven flows can override data.</span></li>
                  <li className="flex items-start gap-2"><span className="text-trading-gold font-bold shrink-0">#5</span><span><strong className="text-foreground/90">Fed communication</strong> — Chairman Warsh's discussion with the IMF MD on October 15, plus other scheduled appearances.</span></li>
                  <li className="flex items-start gap-2"><span className="text-trading-gold font-bold shrink-0">#6</span><span><strong className="text-foreground/90">Friday industrial/import-price data</strong> — generally lower impact but can finalize the week's direction.</span></li>
                </ol>
                <p className="text-sm text-muted-foreground/70 mt-2">No guarantee about which event will create the largest move. Markets can surprise.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* CHECKLIST */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Gold Trading </span>
                <span className="text-trading-gold text-glow-gold">Checklist</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto pr-2">
                {checklistItems.map((item) => (
                  <label key={item} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed cursor-default">
                    <input
                      type="checkbox"
                      className="mt-1 accent-trading-green shrink-0"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-muted-foreground/70 mt-4">
                For position sizing before CPI volatility, use the{" "}
                <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">XAUUSD Lot Size Calculator</Link>
                . For the monetary value of a gold price move, the{" "}
                <Link href="/tools/xauusd-profit-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">XAUUSD Profit Calculator</Link>
                . For collateral requirements, the{" "}
                <Link href="/tools/xauusd-margin-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">XAUUSD Margin Calculator</Link>
                . For modeling drawdown risk across many trades, the{" "}
                <Link href="/tools/risk-of-ruin-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Risk of Ruin Calculator</Link>
                . For the broader risk-management framework, see our{" "}
                <Link href="/blog/forex-risk-management-for-beginners/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80">forex risk management for beginners guide</Link>
                .
              </p>
            </div>
          </div>
        </FadeSection>

        {/* LAST WEEK LINK */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              <div className="w-12 h-12 rounded-xl bg-trading-gold/10 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-trading-gold" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-muted-foreground tracking-wider mb-1">LAST WEEK&apos;S FORECAST</p>
                <h3 className="text-base md:text-lg font-bold text-foreground mb-1">
                  XAUUSD Weekly Forecast: Oct 5–9, 2026
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Read how the previous week unfolded — the ISM Services, FOMC
                  minutes and jobless claims setup that led into the current
                  post-recovery price structure.
                </p>
              </div>
              <Link
                href="/blog/xauusd-weekly-forecast-october-5-9-2026/"
                className="inline-flex items-center gap-2 text-sm font-bold text-trading-green hover:text-trading-green/80 transition-colors no-underline shrink-0"
              >
                Read last week
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </FadeSection>

        {/* FOLLOW FOREXWIZARD */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Follow </span>
                <span className="text-trading-green text-glow-green">ForexWizard</span>
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  For more gold market coverage, visit the{" "}
                  <Link
                    href="/gold-signals/"
                    className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors"
                  >
                    Gold Signals
                  </Link>{" "}
                  section for educational gold-market observations, or the{" "}
                  <Link
                    href="/xauusd-analysis/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    XAUUSD Analysis
                  </Link>{" "}
                  hub for the broader analytical framework.
                </p>
                <p>
                  To learn more about ForexWizard and our approach, visit{" "}
                  <Link
                    href="/about/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    About ForexWizard
                  </Link>
                  .
                </p>
                <p>
                  Readers who want regular educational XAU/USD market
                  observations can also follow the ForexWizzz Telegram
                  community.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* FAQ */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">Frequently Asked </span>
                <span className="text-trading-gold text-glow-gold">
                  Questions
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="glass-strong rounded-2xl gradient-border group"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none select-none">
                    <h3 className="text-base font-bold text-foreground pr-4">
                      {faq.q}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" />
                  </summary>
                  <div className="px-6 pb-6 -mt-2">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* FINAL OUTLOOK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Final XAUUSD Weekly </span>
                <span className="text-trading-gold text-glow-gold">Outlook</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed text-left">
                <p>
                  Gold begins the October 12–16 week near $4,194 in an improved
                  short-term position after recovering from $4,066. But the
                  recovery faces its first major test at the $4,205–$4,230
                  resistance cluster, and Wednesday's CPI could determine whether
                  gold breaks higher or falls back toward the October lows.
                </p>
                <p>
                  The most likely path is range-bound trading between $4,140 and
                  $4,230 until CPI clarifies the inflation outlook. A softer CPI
                  print could fuel a push toward $4,255–$4,265; a hotter print
                  risks a break of $4,130 toward $4,065.
                </p>
                <p>
                  Whatever happens, the priority is process over prediction:
                  mark the levels, size the risk, respect the event windows, and
                  let the market confirm before committing.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* RISK DISCLAIMER + SOURCES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="glass rounded-2xl border border-trading-red/20 p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-trading-red mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Risk Disclaimer
              </h2>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                  Trading forex, gold and CFDs involves significant risk and may
                  not be suitable for everyone.
                </p>
                <p>
                  This content is provided for educational and informational
                  purposes only and should not be considered financial advice,
                  investment advice or a recommendation to buy or sell any
                  financial instrument.
                </p>
                <p>
                  Technical levels can fail. Economic releases can cause rapid
                  volatility, spreads may widen and market conditions can change
                  quickly.
                </p>
                <p>
                  Always perform your own analysis and use appropriate risk
                  management.
                </p>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-trading-gold" />
                Sources and Methodology
              </h2>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                  This weekly analysis combines publicly available spot-gold
                  market data, higher-timeframe technical structure and
                  scheduled macroeconomic releases verified against official
                  primary sources.
                </p>
                <p>Key data sources used for this article:</p>
                <ul className="space-y-1 pl-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>US Bureau of Labor Statistics — CPI and PPI release schedules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>US Census Bureau — Retail Sales release schedule</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>Federal Reserve — October 2026 calendar, Beige Book, Industrial Production</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>SIFMA — Columbus Day fixed-income close recommendation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>IMF — October 2026 World Economic Outlook release schedule</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>Reuters — October 9 gold report, consumer sentiment, week-ahead coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>Investing.com — XAU/USD historical price data</span>
                  </li>
                </ul>
                <p>
                  Spot XAU/USD prices can differ slightly between brokers and
                  liquidity providers, so the technical prices in this article
                  should be treated as approximate zones rather than exact
                  guaranteed values.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* TELEGRAM CTA */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-gold/5 via-transparent to-trading-green/5 rounded-3xl blur-sm" />
            <div className="relative glass-strong rounded-3xl p-8 md:p-14 text-center gradient-border">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                <span className="text-foreground">Follow XAU/USD on </span>
                <span className="text-trading-green text-glow-green">
                  Telegram
                </span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                Join the Forex Wizard Telegram community for educational XAU/USD
                market structure, key levels and trading-related education.
              </p>
              <PulsingGlow className="inline-block rounded-xl">
                <TelegramCTA
                  text="Join Forex Wizard Telegram"
                  variant="primary"
                  className="text-lg md:text-xl px-10 py-5"
                />
              </PulsingGlow>
              <p className="mt-6 text-xs text-muted-foreground/80">
                Free to join &middot; Trading involves risk &middot; Not
                financial advice
              </p>
            </div>
          </div>
        </FadeSection>

        {/* CONTINUE LEARNING */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Continue </span>
                <span className="text-trading-gold text-glow-gold">
                  Learning
                </span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Explore related ForexWizard guides and tools to deepen your gold
                trading knowledge and market understanding.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {continueLearning.map((item, i) => (
                <FadeIn key={item.href} delay={i * 0.07}>
                  <Link
                    href={item.href}
                    className="block h-full no-underline"
                  >
                    <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center`}
                      >
                        {item.icon}
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* FOOTER */}
        <SiteFooter />
      </main>

      <StickyTelegramButton
        href={TELEGRAM_LINK}
        label="Join Forex Wizard on Telegram"
      />
    </>
  );
}
