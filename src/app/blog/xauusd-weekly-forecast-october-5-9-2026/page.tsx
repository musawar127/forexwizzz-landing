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

const post = getBlogPost("xauusd-weekly-forecast-october-5-9-2026")!;

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
    { "@type": "ListItem", position: 3, name: "XAUUSD Weekly Forecast Oct 5–9, 2026", item: CANONICAL },
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
  { area: "Previous week’s low", level: "$4,110.55", why: "Sep 28 seven-week low (lowest since Aug 5) — Reuters", tone: "muted" as const },
  { area: "Immediate support", level: "$4,110–$4,130", why: "Sep 28 swing-low zone buyers must defend", tone: "gold" as const },
  { area: "Secondary support", level: "$4,080–$4,100", why: "Round-number cluster just beneath the seven-week low", tone: "gold" as const },
  { area: "Major support", level: "$4,000–$4,040", why: "Psychological $4,000 + 2026 demand shelf", tone: "gold" as const },
  { area: "Immediate resistance", level: "$4,180–$4,200", why: "Sep 29–30 recovery closes (~$4,182) + round number", tone: "green" as const },
  { area: "Secondary resistance", level: "$4,260–$4,290", why: "Oct 2 COMEX futures high ($4,259) + Sep 25 close (~$4,287)", tone: "green" as const },
  { area: "Major resistance", level: "$4,300–$4,320", why: "The $4,300 area gold lost; previous-week structure", tone: "green" as const },
];

const economicEvents = [
  {
    day: "Monday, October 5 — ISM Services PMI",
    points: [
      "The September ISM Services PMI is scheduled for 10:00 AM Eastern (7:00 PM PKT). The August reading was 55.4, and the market consensus for September is around 55.7.",
      "Services account for roughly 80% of US GDP, so this release is one of the cleanest real-time reads on the US economy each month.",
      "A print above 56 would reinforce US growth and Treasury-yield expectations, which is typically bearish for non-yielding gold. A print below 54 could weaken the dollar and support gold.",
      "Watch how gold behaves against the 10-year Treasury yield and the Dollar Index (DXY) immediately after the release — the first move is not always the final direction.",
    ],
  },
  {
    day: "Wednesday, October 7 — FOMC Meeting Minutes",
    points: [
      "The minutes of the September 15–16 FOMC meeting are released at 2:00 PM Eastern (11:00 PM PKT). At that meeting the Committee raised the target range 25 basis points to 3.75%–4.00%.",
      "Chair Kevin Warsh has rejected forward guidance, so the minutes are the only near-term window into Committee thinking — making this release unusually market-moving.",
      "Hawkish language (concern about inflation, support for another hike) would pressure gold; dovish language (data-dependence, caution about over-tightening) could give gold relief.",
      "Because the minutes land at 2:00 PM ET, liquidity can thin out into the close, which magnifies intraday volatility on XAU/USD.",
    ],
  },
  {
    day: "Thursday, October 8 — Weekly Unemployment Claims",
    points: [
      "Weekly US initial jobless claims for the week ending October 3 are scheduled for 8:30 AM Eastern (5:30 PM PKT). The prior week printed 197,000 and consensus is around 190,000.",
      "This is the first labour read after the weak +29,000 September Nonfarm Payrolls, so it is a live test of whether the labour slowdown is continuing.",
      "Claims sustained above 200,000 would reinforce Fed-pivot hopes and support gold; a drop well below 190,000 would do the opposite.",
    ],
  },
  {
    day: "Friday, October 9 — University of Michigan Sentiment",
    points: [
      "The preliminary October University of Michigan Consumer Sentiment index is released at 10:00 AM Eastern (7:00 PM PKT). The final September reading was 48.1, near a multi-year low.",
      "The report also includes 1-year and 5-year inflation expectations, which the Fed watches closely.",
      "Further deterioration in sentiment or a rise in inflation expectations can fuel recession and stagflation fears — both are traditionally supportive for safe-haven gold.",
    ],
  },
];

const checklistItems = [
  "Previous week’s low ($4,110.55)",
  "Previous week’s recovery high (~$4,182)",
  "$4,110–$4,130 immediate support",
  "$4,080–$4,100 secondary support",
  "$4,000–$4,040 major support",
  "$4,180–$4,200 immediate resistance",
  "$4,260–$4,290 secondary resistance",
  "$4,300–$4,320 major resistance",
  "Daily market structure",
  "Four-hour market structure",
  "London-session structure",
  "New York-session structure",
  "US 10-year Treasury yield",
  "US Dollar Index (DXY)",
  "Monday ISM Services PMI",
  "Wednesday FOMC minutes",
  "Thursday weekly jobless claims",
  "Friday University of Michigan sentiment",
  "US-Iran negotiation headlines",
  "Stop-loss location",
  "Position size",
  "Risk-to-reward",
  "Whether the setup has actually been confirmed",
];

const faqs = [
  {
    q: "What is the XAUUSD weekly forecast for October 5–9, 2026?",
    a: "Gold begins the October 5–9 week near $4,140 after a 3.4% weekly decline and a weaker-than-expected +29,000 September NFP. The first support zone is approximately $4,110–$4,130 (the Sep 28 seven-week low), and the first resistance buyers need to recover is approximately $4,180–$4,200. The week’s main catalysts are ISM Services PMI (Mon), FOMC minutes (Wed), weekly jobless claims (Thu) and University of Michigan sentiment (Fri).",
  },
  {
    q: "What are the main XAUUSD support levels this week?",
    a: "The nearest support zone is approximately $4,110–$4,130, anchored by the September 28 intraday low of $4,110.55 (a seven-week low reported by Reuters and the lowest since August 5). Below that, traders can monitor approximately $4,080–$4,100 and then the major psychological $4,000–$4,040 area.",
  },
  {
    q: "What are the main gold resistance levels this week?",
    a: "Immediate resistance is approximately $4,180–$4,200, where gold recovered to on September 29–30. Above that, approximately $4,260–$4,290 becomes important (the October 2 COMEX futures intraday high and the September 25 pre-drop close), followed by broader resistance around $4,300–$4,320.",
  },
  {
    q: "Is XAUUSD bullish or bearish this week?",
    a: "Gold begins the week with short-term bearish pressure after two consecutive weekly declines. The technical picture becomes more constructive only if price reclaims $4,180–$4,200, and stronger above $4,260–$4,290. A confirmed loss of approximately $4,110 would strengthen the bearish scenario toward $4,000. All scenarios are conditional, not guaranteed.",
  },
  {
    q: "When are the FOMC minutes released this week?",
    a: "The minutes of the September 15–16 FOMC meeting are released on Wednesday, October 7, 2026 at 2:00 PM Eastern Time, which is 11:00 PM Pakistan Standard Time (PKT).",
  },
  {
    q: "When is ISM Services PMI released this week?",
    a: "The September ISM Services PMI is scheduled for Monday, October 5, 2026 at 10:00 AM Eastern Time, which is 7:00 PM Pakistan Standard Time (PKT).",
  },
  {
    q: "Was September NFP released this week or next?",
    a: "The September US Employment Situation report — including Nonfarm Payrolls of +29,000 and a 4.2% unemployment rate — was already released on Friday, October 2, 2026. It belongs to the previous week. The next Employment Situation report (October NFP) is scheduled for November 6, 2026, which is outside the October 5–9 forecast period.",
  },
  {
    q: "Why do Treasury yields affect gold?",
    a: "Gold pays no income, so when US Treasury yields rise the opportunity cost of holding gold increases. The 10-year Treasury yield closed near 5.28% on October 2, its highest levels since 2002, which has been a structural headwind for gold even when the dollar softens.",
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
    href: "/xauusd-lot-size/",
    title: "XAUUSD Lot Size Calculator",
    desc: "Calculate gold position size from your account risk, stop distance and contract size before the week’s volatile events.",
    icon: <Target className="w-7 h-7 text-trading-green" />,
    accent: "from-trading-green/10 to-transparent",
  },
  {
    href: "/tools/forex-market-hours/",
    title: "Forex Market Hours Clock",
    desc: "Live trading-session clock with EDT and PKT times — useful for timing entries around ISM, FOMC minutes and US data releases.",
    icon: <Clock className="w-7 h-7 text-trading-green" />,
    accent: "from-trading-green/10 to-transparent",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function WeeklyForecastOct5Oct9Page() {
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
                XAUUSD Weekly Forecast Oct 5–9, 2026
              </span>
            </nav>

            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-gold">
                <Calendar className="w-4 h-4" />
                XAUUSD Weekly Forecast · Oct 5–9, 2026
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">
                XAUUSD Weekly Forecast (Oct 5–9, 2026): Gold Levels After NFP
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
                Gold enters the October 5–9 trading week near{" "}
                <strong className="text-foreground/90">$4,140</strong> after a
                second consecutive weekly decline of roughly 3.4%, pressured by
                a firmer US dollar and Treasury yields at their highest levels
                since 2002.
              </p>
              <p>
                The September Employment Situation report on October 2 confirmed
                a sharp labour-market slowdown — Nonfarm Payrolls of just{" "}
                <strong className="text-foreground/90">+29,000</strong> against
                expectations near 85,000–150,000, with July and August revised
                down by a combined 60,000 — yet the 10-year yield still ticked
                higher, capping any gold rally.
              </p>
              <p>
                The week ahead is driven by four events: ISM Services PMI
                (Monday), FOMC meeting minutes (Wednesday), weekly jobless claims
                (Thursday) and preliminary University of Michigan sentiment
                (Friday). Because Chair Warsh has rejected forward guidance, the
                September minutes are the only near-term window into Committee
                thinking.
              </p>
              <p>
                Instead of predicting one guaranteed direction, this XAUUSD
                weekly forecast maps the verified post-NFP gold levels and
                explains what would strengthen the bullish, bearish or
                consolidation scenario.
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
                  XAU/USD enters October 5–9 near{" "}
                  <strong className="text-foreground/90">$4,140</strong> after
                  trading between approximately $4,110.55 and $4,182 during the
                  previous week — a second consecutive weekly decline of about
                  3.4% (Reuters).
                </p>
                <p>
                  The first important support zone is approximately{" "}
                  <strong className="text-foreground/90">$4,110–$4,130</strong>,
                  anchored by the September 28 seven-week low. Below that,
                  traders can monitor approximately{" "}
                  <strong className="text-foreground/90">$4,080–$4,100</strong>{" "}
                  and the major psychological{" "}
                  <strong className="text-foreground/90">$4,000–$4,040</strong>{" "}
                  area.
                </p>
                <p>
                  The first resistance buyers need to recover is approximately{" "}
                  <strong className="text-foreground/90">$4,180–$4,200</strong>.
                  Above that,{" "}
                  <strong className="text-foreground/90">$4,260–$4,290</strong>{" "}
                  becomes the next important technical area, followed by broader
                  resistance around{" "}
                  <strong className="text-foreground/90">$4,300–$4,320</strong>.
                </p>
                <p>
                  The week&apos;s biggest scheduled US catalysts are ISM Services
                  PMI, the FOMC minutes, weekly jobless claims and University of
                  Michigan sentiment. September CPI (October 14) and October NFP
                  (November 6) both fall <em>outside</em> this forecast period.
                </p>
                <p>
                  The technical picture therefore begins cautiously below
                  $4,180, but the upcoming macro data and Fed minutes could
                  quickly change the structure.
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
              price action through the October 2 close. Each zone is explained so
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

        {/* WHAT HAPPENED LAST WEEK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">What Happened to Gold </span>
                <span className="text-trading-gold text-glow-gold">Last Week?</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The September 28–October 2 week was bearish for gold. Spot
                  gold fell to a seven-week low of{" "}
                  <strong className="text-foreground/90">$4,110.55</strong> on
                  Monday, September 28 — the lowest level since August 5 —
                  pressured by a diplomatic impasse over the Iran war and rising
                  rate-hike expectations (Reuters). Gold then recovered toward
                  the $4,180s mid-week before the October 2 payrolls release.
                </p>
                <p>
                  On Friday, October 2 at 8:30 AM ET, the US Bureau of Labor
                  Statistics released the September Employment Situation report
                  (<a href="https://www.bls.gov/news.release/archives/empsit_10022026.htm" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">BLS</a>).
                  Nonfarm payroll employment rose by just{" "}
                  <strong className="text-foreground/90">+29,000</strong>, well
                  below the consensus range, and the unemployment rate was{" "}
                  <strong className="text-foreground/90">4.2%</strong>. Average
                  hourly earnings rose 0.1% month-over-month and 3.0%
                  year-over-year. Critically, July was revised down to{" "}
                  <strong className="text-foreground/90">-10,000</strong> (from
                  +21,000) and August was revised down to +133,000 — a combined
                  60,000 downward revision.
                </p>
                <p>
                  Despite the weak labour data, gold could not sustain a rally.
                  Reuters reported spot gold at{" "}
                  <strong className="text-foreground/90">$4,140.06</strong> by
                  2:33 PM EDT (18:33 GMT), down 0.9% on the day and about 3.4%
                  on the week — a second consecutive weekly decline. The
                  paradox is explained by the bond market: the 10-year Treasury
                  yield closed near{" "}
                  <strong className="text-foreground/90">5.28%</strong> (WSJ),
                  having touched its highest levels since 2002 earlier in the
                  week, reflecting fiscal-deficit and term-premium concerns that
                  overwhelmed the soft-jobs signal. The Dollar Index (DXY)
                  closed around{" "}
                  <strong className="text-foreground/90">101.92</strong>,
                  essentially flat on the day.
                </p>
                <p>
                  HSBC also lowered its 2026 average gold price forecast to
                  $4,490 per ounce (Reuters, October 1), adding to the
                  cautious institutional tone. For broader context on the
                  macroeconomic forces behind gold, see our{" "}
                  <Link
                    href="/blog/xauusd-fundamental-analysis/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    XAUUSD fundamental analysis guide
                  </Link>
                  .
                </p>
                <p className="text-sm text-muted-foreground/80 border-l-2 border-trading-gold/40 pl-4">
                  Note on instruments: the $4,140.06 figure is{" "}
                  <strong>spot gold</strong> (XAU/USD) as reported by Reuters.
                  COMEX December 2026 gold futures settled at $4,162.30
                  (-$30.20, -0.72%) the same day, with an intraday high of
                  $4,259. This article uses spot gold as the primary reference
                  because that is the instrument most retail XAU/USD traders
                  see on their charts.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* TECHNICAL ANALYSIS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">XAUUSD Technical Analysis for </span>
                <span className="text-trading-gold text-glow-gold">October 5–9</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground/90">Daily structure:</strong>{" "}
                  Gold is trading below its previous weekly structure after
                  losing the $4,300 area. The daily trend is bearish into
                  October 5, with price anchored near $4,140 and the September
                  28 low of $4,110.55 acting as the immediate downside
                  reference. A daily close below $4,110 would open the path
                  toward the $4,000 psychological level.
                </p>
                <p>
                  <strong className="text-foreground/90">H4 confirmation:</strong>{" "}
                  On the four-hour timeframe, gold carved a recovery from the
                  $4,110.55 low toward the $4,180s between September 29 and
                  October 1, then rolled over into the October 2 NFP release.
                  The H4 structure is range-bound between roughly $4,110 and
                  $4,182 until one of those levels breaks with conviction.
                </p>
                <p>
                  <strong className="text-foreground/90">Swing references:</strong>{" "}
                  The key swing low is $4,110.55 (Sep 28). The pre-drop swing
                  high is approximately $4,287 (Sep 25 close). The recovery high
                  cluster sits around $4,182–$4,260 (Sep 29–30 closes and the
                  October 2 COMEX futures intraday high of $4,259).
                </p>
                <p>
                  <strong className="text-foreground/90">Momentum context:</strong>{" "}
                  The dominant fundamental headwind is the 10-year Treasury
                  yield near 5.28% — its highest since 2002. Even weak US data
                  has not translated into sustained gold strength because real
                  yields remain elevated. Gold&apos;s momentum therefore depends
                  less on the dollar and more on whether yields finally roll
                  over.
                </p>
                <p>
                  <strong className="text-foreground/90">Invalidation:</strong>{" "}
                  The bearish structure invalidates on a convincing daily close
                  above $4,200, and especially above $4,260. The bullish
                  recovery case invalidates on a daily close below $4,110,
                  which would target $4,000. For a deeper framework on marking
                  these zones, see our{" "}
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
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              These support zones are anchored in verified price action through
              October 2, not recycled from the previous month. Each level is
              explained so you know what would make it hold or break.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="glass-strong rounded-2xl p-6 gradient-border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="w-5 h-5 text-trading-gold" />
                  <span className="text-xs font-bold text-muted-foreground tracking-wider">IMMEDIATE SUPPORT</span>
                </div>
                <p className="text-2xl font-extrabold text-trading-gold mb-3">$4,110–$4,130</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Anchored by the September 28 intraday low of $4,110.55 — a
                  seven-week low reported by Reuters and the lowest since
                  August 5. This is the line buyers defended last week. A
                  clean daily close below it shifts control to sellers.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-6 gradient-border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="w-5 h-5 text-trading-gold" />
                  <span className="text-xs font-bold text-muted-foreground tracking-wider">SECONDARY SUPPORT</span>
                </div>
                <p className="text-2xl font-extrabold text-trading-gold mb-3">$4,080–$4,100</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A round-number cluster just beneath the seven-week low. There
                  is no major prior swing here, so it is more of a gravitational
                  zone than a battle-tested level. It matters because stops
                  often accumulate just under the $4,110 low.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-6 gradient-border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="w-5 h-5 text-trading-gold" />
                  <span className="text-xs font-bold text-muted-foreground tracking-wider">MAJOR SUPPORT</span>
                </div>
                <p className="text-2xl font-extrabold text-trading-gold mb-3">$4,000–$4,040</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The psychological $4,000 level, plus the 2026 demand shelf.
                  Reaching it would imply a roughly 3.4% decline from the
                  October 2 close. It is the most-watched downside target among
                  analysts tracking the post-NFP break.
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
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              Resistance is stacked above the current price. Buyers need to
              reclaim these zones in sequence for the technical picture to
              improve.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="glass-strong rounded-2xl p-6 gradient-border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-trading-green" />
                  <span className="text-xs font-bold text-muted-foreground tracking-wider">IMMEDIATE RESISTANCE</span>
                </div>
                <p className="text-2xl font-extrabold text-trading-green mb-3">$4,180–$4,200</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Where gold recovered to on September 29–30 (closes near
                  $4,182.80) before rolling over. The $4,200 round number adds
                  weight. Reclaiming this zone is the first condition for any
                  bullish scenario.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-6 gradient-border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-trading-green" />
                  <span className="text-xs font-bold text-muted-foreground tracking-wider">SECONDARY RESISTANCE</span>
                </div>
                <p className="text-2xl font-extrabold text-trading-green mb-3">$4,260–$4,290</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The October 2 COMEX December futures intraday high of $4,259
                  and the September 25 pre-drop close near $4,287.25. This is
                  where the selling pressure intensified last week, so it is
                  the hardest resistance to clear.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-6 gradient-border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-trading-green" />
                  <span className="text-xs font-bold text-muted-foreground tracking-wider">MAJOR RESISTANCE</span>
                </div>
                <p className="text-2xl font-extrabold text-trading-green mb-3">$4,300–$4,320</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The $4,300 area gold lost during the previous week. Reclaiming
                  it would mark a structural shift and likely trigger
                  short-covering. It is the line that separates the bearish
                  trend from a genuine recovery.
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
              These are conditional scenarios, not guaranteed forecasts. Each
              lists what must happen first, the relevant structure, confirmation
              conditions and what would invalidate it.
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
                    <strong className="text-foreground/90">What must happen first:</strong> Gold reclaims and holds above $4,180–$4,200 on a daily closing basis, ideally triggered by a dovish FOMC minutes release on October 7 or a soft ISM Services print on October 5.
                  </p>
                  <p>
                    <strong className="text-foreground/90">Relevant structure:</strong> The H4 recovery from the $4,110.55 low resumes, and the 10-year Treasury yield rolls over from the 5.28% area — that is the real catalyst, not the dollar alone.
                  </p>
                  <p>
                    <strong className="text-foreground/90">Confirmation conditions:</strong> A daily close above $4,200, followed by a push through $4,260–$4,290 on rising volume. Safe-haven flows from any US-Iran negotiation breakdown would amplify this.
                  </p>
                  <p>
                    <strong className="text-foreground/90">Areas to monitor:</strong> $4,260, $4,290, then the $4,300–$4,320 major resistance.
                  </p>
                  <p>
                    <strong className="text-foreground/90">Invalidation:</strong> A daily close back below $4,140, or failure to hold $4,180 within two sessions of reclaiming it.
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
                    <strong className="text-foreground/90">What must happen first:</strong> Gold loses the $4,110–$4,130 support zone on a daily closing basis, fuelled by hawkish FOMC minutes or a hot ISM Services print that pushes the 10-year yield toward 5.34%+.
                  </p>
                  <p>
                    <strong className="text-foreground/90">Relevant structure:</strong> The September 28 seven-week low at $4,110.55 fails, opening a path to the psychological $4,000 level. HSBC&apos;s lowered 2026 forecast ($4,490 average) adds institutional caution.
                  </p>
                  <p>
                    <strong className="text-foreground/90">Confirmation conditions:</strong> A daily close below $4,110, followed by sustained trading beneath $4,080. Rising real yields are the key confirmation — if yields keep climbing despite soft data, gold stays pressured.
                  </p>
                  <p>
                    <strong className="text-foreground/90">Areas to monitor:</strong> $4,080–$4,100, then $4,000–$4,040 major support.
                  </p>
                  <p>
                    <strong className="text-foreground/90">Invalidation:</strong> A recovery back above $4,180, which would suggest the breakdown was a false move.
                  </p>
                </div>
              </div>

              {/* Consolidation */}
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-muted-foreground/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-muted-foreground/10 flex items-center justify-center">
                    <Minus className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-foreground">Consolidation Scenario</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground/90">What must happen first:</strong> Gold holds between $4,110 and $4,182 through the first half of the week, with ISM Services and jobless prints landing close to consensus and the FOMC minutes landing balanced.
                  </p>
                  <p>
                    <strong className="text-foreground/90">Relevant structure:</strong> The H4 range that has defined price action since September 28 persists. This is a waiting market — yields are too high to rally, but the labour slowdown is too soft to break down confidently.
                  </p>
                  <p>
                    <strong className="text-foreground/90">Confirmation conditions:</strong> Multiple daily closes inside the $4,110–$4,182 band with declining volatility and no decisive catalyst. The University of Michigan sentiment release on Friday could be the trigger that finally breaks the range.
                  </p>
                  <p>
                    <strong className="text-foreground/90">Areas to monitor:</strong> The $4,110 floor and the $4,182 ceiling. A compression toward $4,140–$4,150 often precedes a directional break.
                  </p>
                  <p>
                    <strong className="text-foreground/90">Invalidation:</strong> A clean break and daily close outside either boundary — which then activates the bullish or bearish scenario above.
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
              <span className="text-foreground">Economic Calendar — </span>
              <span className="text-trading-gold text-glow-gold">October 5–9</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              All times verified against official sources. Eastern Time is EDT
              (UTC-4) in October; Pakistan Standard Time (PKT, UTC+5) is EDT + 9
              hours. September CPI (October 14) and October NFP (November 6)
              fall <em>outside</em> this forecast period and are not listed
              below.
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
                    <td className="p-4 text-muted-foreground align-top">Mon Oct 5</td>
                    <td className="p-4 text-foreground/90 align-top font-medium">10:00 AM</td>
                    <td className="p-4 text-foreground/90 align-top font-medium">7:00 PM</td>
                    <td className="p-4 text-foreground align-top font-medium">ISM Services PMI (Sep)</td>
                    <td className="p-4 text-muted-foreground align-top">Services ≈ 80% of US GDP. &gt;56 → yields up → gold down; &lt;54 → dollar down → gold up.</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-muted-foreground align-top">Wed Oct 7</td>
                    <td className="p-4 text-foreground/90 align-top font-medium">2:00 PM</td>
                    <td className="p-4 text-foreground/90 align-top font-medium">11:00 PM</td>
                    <td className="p-4 text-foreground align-top font-medium">FOMC Meeting Minutes (Sep 15–16)</td>
                    <td className="p-4 text-muted-foreground align-top">First detailed readout of the Sept 16 hike. Warsh rejected forward guidance, so minutes are the only Fed-thinking window.</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-muted-foreground align-top">Thu Oct 8</td>
                    <td className="p-4 text-foreground/90 align-top font-medium">8:30 AM</td>
                    <td className="p-4 text-foreground/90 align-top font-medium">5:30 PM</td>
                    <td className="p-4 text-foreground align-top font-medium">Weekly Unemployment Claims</td>
                    <td className="p-4 text-muted-foreground align-top">First labour read after +29K NFP. &gt;200K → Fed-pivot hopes → gold up; &lt;190K → gold down.</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-muted-foreground align-top">Fri Oct 9</td>
                    <td className="p-4 text-foreground/90 align-top font-medium">10:00 AM</td>
                    <td className="p-4 text-foreground/90 align-top font-medium">7:00 PM</td>
                    <td className="p-4 text-foreground align-top font-medium">U-Mich Consumer Sentiment (Prelim Oct)</td>
                    <td className="p-4 text-muted-foreground align-top">Sentiment near multi-year lows (Sep 48.1). Further drop + higher inflation expectations → gold safe-haven bid.</td>
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
              Sources: Federal Reserve October calendar, ISM official release
              schedule, US Department of Labor weekly claims, University of
              Michigan Surveys of Consumers. Re-verify times immediately before
              publication — release schedules can change.
            </p>
          </div>
        </FadeSection>

        {/* FOMC MINUTES DEEP DIVE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How FOMC Minutes Could </span>
                <span className="text-trading-gold text-glow-gold">Affect XAUUSD</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The October 7 release is the single most market-moving event
                  of the week for gold, and the reason is unusual. At the
                  September 15–16 meeting the FOMC raised the federal funds
                  target range by 25 basis points to{" "}
                  <strong className="text-foreground/90">3.75%–4.00%</strong> —
                  the first hike since July 2023 and Chair Kevin Warsh&apos;s
                  first major policy action. The accompanying dot plot signalled
                  one more hike by year-end. But Warsh has explicitly rejected
                  forward guidance and avoided discussing Committee deliberations
                  in his press conferences.
                </p>
                <p>
                  That makes the minutes the only near-term window into how
                  Committee members are weighing inflation against labour-market
                  softening. Three things to watch for:
                </p>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-2">
                    <Activity className="w-5 h-5 text-trading-gold shrink-0 mt-1" />
                    <span>
                      <strong className="text-foreground/90">Inflation language:</strong> Any
                      emphasis on sticky services inflation or concern about
                      the 3.0% wage growth (from the October 2 NFP) would be
                      read as hawkish and pressure gold.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Activity className="w-5 h-5 text-trading-gold shrink-0 mt-1" />
                    <span>
                      <strong className="text-foreground/90">Labour-market caution:</strong> If
                      multiple participants flagged a cooling labour market —
                      which the +29,000 NFP and -60,000 combined revisions now
                      confirm — the market may price out the year-end hike and
                      give gold relief.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Activity className="w-5 h-5 text-trading-gold shrink-0 mt-1" />
                    <span>
                      <strong className="text-foreground/90">Dissent and data-dependence:</strong> The
                      September decision was unanimous, but the minutes may
                      reveal a wider debate. Stronger data-dependent language
                      reduces path certainty and tends to weaken the dollar.
                    </span>
                  </li>
                </ul>
                <p>
                  Note: the <em>next</em> FOMC decision is{" "}
                  <strong className="text-foreground/90">October 27–28, 2026</strong>,
                  not a November meeting — there is no November 2026 FOMC meeting
                  on the official calendar. So the October 7 minutes are the
                  last official Fed communication before that late-October
                  decision, which raises their weight for gold traders.
                </p>
                <p>
                  For timing entries around the 2:00 PM ET release, our{" "}
                  <Link
                    href="/tools/forex-market-hours/"
                    className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors"
                  >
                    Forex Market Hours Clock
                  </Link>{" "}
                  shows the live EDT and PKT session overlap. And to understand
                  which sessions carry the most gold volatility, see our guide
                  on{" "}
                  <Link
                    href="/blog/xauusd-volatility-trading-sessions/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    XAUUSD volatility by trading session
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* RISK MANAGEMENT */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Gold Trading Risk </span>
                <span className="text-trading-gold text-glow-gold">Management This Week</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  A week with ISM Services, FOMC minutes, jobless claims and
                  University of Michigan sentiment is a high-event-risk week.
                  Sound risk management matters more than any single forecast.
                </p>
                <p>
                  <strong className="text-foreground/90">News volatility:</strong> The
                  FOMC minutes at 2:00 PM ET can move gold $20–$40 in minutes.
                  The first move is frequently a liquidity sweep before the real
                  direction emerges. Avoid entering in the first 1–2 minutes
                  after the release unless you have a strict news-trading plan.
                </p>
                <p>
                  <strong className="text-foreground/90">Stop placement:</strong> Place
                  stops outside logical structure, not at arbitrary round
                  numbers. Beneath the $4,110.55 swing low is structurally
                  cleaner than a stop at $4,100 exactly, because the round
                  number is where stop-hunts cluster.
                </p>
                <p>
                  <strong className="text-foreground/90">Position sizing:</strong> Define
                  your risk in account-currency terms first, then derive lot
                  size from the stop distance. Our{" "}
                  <Link
                    href="/xauusd-lot-size/"
                    className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors"
                  >
                    XAUUSD Lot Size Calculator
                  </Link>{" "}
                  does this math for gold directly — use it before every event
                  trade. For worked examples of the underlying risk framework,
                  see our{" "}
                  <Link
                    href="/blog/forex-risk-management-for-beginners/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    forex risk management for beginners guide
                  </Link>
                  .
                </p>
                <p>
                  <strong className="text-foreground/90">Pip value:</strong> When
                  gold moves $1, the monetary impact per lot depends on your
                  contract size and pip convention. Our{" "}
                  <Link
                    href="/xauusd-pip-value/"
                    className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors"
                  >
                    XAUUSD Pip Value Calculator
                  </Link>{" "}
                  converts any price move into account-currency terms so your
                  risk stays explicit.
                </p>
                <p>
                  <strong className="text-foreground/90">Spread and slippage:</strong> Spreads
                  on XAU/USD routinely widen 3–5× around FOMC minutes and ISM
                  releases. If your stop is tight, slippage can take you out
                  before the real move. Either widen the stop or stand aside
                  during the release window.
                </p>
                <p>
                  <strong className="text-foreground/90">Best times to trade:</strong> Gold
                  liquidity peaks during the London–New York overlap. For
                  Pakistan-based traders, our{" "}
                  <Link
                    href="/best-time-to-trade-xauusd/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    best time to trade XAUUSD guide
                  </Link>{" "}
                  maps the highest-activity windows in PKT.
                </p>
              </div>

              {/* Checklist */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-trading-green" />
                  Weekly Trading Checklist
                </h3>
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
              </div>
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
                  XAUUSD Weekly Forecast: Sep 28–Oct 2, 2026
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Read how the previous week unfolded — the PCE, ISM
                  Manufacturing and Nonfarm Payrolls setup that led into the
                  current post-NFP price structure.
                </p>
              </div>
              <Link
                href="/blog/xauusd-weekly-forecast-september-28-october-2-2026/"
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

        {/* FAQ (visible, NO FAQPage schema per instructions) */}
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
                <span className="text-foreground">Final Weekly </span>
                <span className="text-trading-gold text-glow-gold">Outlook</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed text-left">
                <p>
                  Gold begins the October 5–9 week near $4,140 in a delicate
                  position: bearish on the daily structure after two consecutive
                  weekly declines, but sitting just above a defended seven-week
                  low. The dominant fundamental headwind is the 10-year Treasury
                  yield near 5.28% — its highest since 2002 — which has
                  overridden even weak US labour data.
                </p>
                <p>
                  The most likely path is range-bound trading between $4,110 and
                  $4,182 until the FOMC minutes on October 7 clarify whether the
                  Committee is leaning toward another hike or pausing. A dovish
                  minutes release, combined with any softening in yields, is the
                  cleanest catalyst for a recovery toward $4,200–$4,260. A hawkish
                  release risks a break of $4,110 toward $4,000.
                </p>
                <p>
                  Whatever happens, the priority is process over prediction:
                  mark the levels, size the risk, respect the event windows, and
                  let the market confirm before committing. That is the edge a
                  weekly forecast can offer — not a guaranteed price target, but
                  a clear plan for the most probable scenarios.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* RISK DISCLAIMER + SOURCES & METHODOLOGY */}
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
                    <span>
                      US Bureau of Labor Statistics — September Employment
                      Situation (Oct 2, 2026):{" "}
                      <a href="https://www.bls.gov/news.release/archives/empsit_10022026.htm" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">bls.gov</a>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>
                      Reuters — gold price reporting (Oct 2, 2026): spot gold
                      $4,140.06 at 2:33 PM EDT (18:33 GMT), -3.4% on the week
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>
                      Federal Reserve — October 2026 calendar (FOMC minutes Oct
                      7, 2:00 PM ET):{" "}
                      <a href="https://www.federalreserve.gov/newsevents/2026-october.htm" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">federalreserve.gov</a>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>
                      University of Michigan Surveys of Consumers — preliminary
                      October release (Oct 9, 10:00 AM ET):{" "}
                      <a href="https://www.sca.isr.umich.edu/" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">sca.isr.umich.edu</a>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>
                      WSJ / TradingEconomics — 10-year Treasury yield (~5.28%)
                      and US Dollar Index (DXY ~101.92) on Oct 2, 2026
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>
                      Investing.com / CME Group — COMEX December 2026 gold
                      futures settlement ($4,162.30, -$30.20)
                    </span>
                  </li>
                </ul>
                <p>
                  Support and resistance levels are derived from verified
                  spot-gold swing data through October 2, 2026 (not recycled
                  from previous months). Spot XAU/USD prices can differ slightly
                  between brokers and liquidity providers, so the technical
                  prices in this article should be treated as approximate zones
                  rather than exact guaranteed values.
                </p>
                <p>
                  Economic-event dates and times should be re-verified
                  immediately before trading using the official schedules linked
                  above.
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
