import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, MessageCircle, TrendingUp, TrendingDown, Clock,
  Calendar, AlertTriangle, Target, CheckCircle2, BookOpen,
  LineChart, Layers, Activity, Minus, Globe,
} from "lucide-react";
import {
  FadeSection, FadeIn, HeroAnimation, PulsingGlow, StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";
import { getBlogPost } from "@/data/blog-posts";

const post = getBlogPost("xauusd-weekly-forecast-october-26-30-2026")!;
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
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: post.title, description: post.description, type: "article",
    publishedTime: post.publishedAt, modifiedTime: post.modifiedAt,
    authors: [post.author.name], url: CANONICAL, siteName: "Forex Wizard",
    images: [{ url: post.image, width: 1200, height: 630, alt: post.imageAlt }],
  },
  twitter: {
    card: "summary_large_image", title: post.title, description: post.description,
    images: [post.image],
  },
};

const blogPostingStructuredData = {
  "@context": "https://schema.org", "@type": "BlogPosting",
  headline: post.title, description: post.description, image: [IMAGE_URL],
  datePublished: post.publishedAt, dateModified: post.modifiedAt, mainEntityOfPage: CANONICAL,
  author: { "@type": "Organization", name: post.author.name, url: post.author.url },
  publisher: { "@type": "Organization", name: "Forex Wizard", url: "https://forexwizard.online/", logo: { "@type": "ImageObject", url: "https://forexwizard.online/apple-touch-icon.png" } },
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://forexwizard.online/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://forexwizard.online/blog/" },
    { "@type": "ListItem", position: 3, name: "XAUUSD Weekly Forecast Oct 26–30, 2026", item: CANONICAL },
  ],
};

function TelegramCTA({ text, variant = "primary", className = "" }: { text: string; variant?: "primary" | "secondary" | "gold"; className?: string }) {
  const base = "inline-flex items-center justify-center gap-2 font-bold text-base md:text-lg rounded-xl px-6 py-3.5 md:px-8 md:py-4 transition-all duration-300 cursor-pointer no-underline select-none";
  const variants: Record<string, string> = {
    primary: "bg-trading-green text-trading-dark glow-green hover:scale-105 hover:shadow-[0_0_30px_rgba(0,230,118,0.6)] active:scale-95",
    gold: "bg-trading-gold text-trading-dark glow-gold hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,64,0.6)] active:scale-95",
    secondary: "glass-strong text-trading-green border border-trading-green/30 hover:bg-trading-green/10 hover:scale-105 active:scale-95",
  };
  return <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className={`${base} ${variants[variant]} ${className}`}><MessageCircle className="w-5 h-5" />{text}<ArrowRight className="w-4 h-4" /></a>;
}

const keyLevelsTable = [
  { area: "Friday close (Oct 23)", level: "~$3,994", why: "Trading Economics spot XAU/USD close $3,993.96 (−0.77%); Ausecure 5 PM ET close $3,999.90. First weekly close below $4,000 in this move.", tone: "muted" as const },
  { area: "Immediate support", level: "$3,980–$4,000", why: "Psychological $4,000 zone; gold closed here Oct 23. Previously identified as deep support in the Oct 19–23 forecast.", tone: "gold" as const },
  { area: "Secondary support", level: "$3,900 area", why: "Next psychological round number below $4,000. Not a verified historical reaction zone — treat as a reference, not confirmed structure.", tone: "gold" as const },
  { area: "Immediate resistance", level: "$4,041", why: "Oct 22 Reuters spot level — gold slid to this on Thursday before falling further Friday.", tone: "green" as const },
  { area: "Secondary resistance", level: "$4,100–$4,120", why: "Former post-CPI recovery base from Oct 14–15; now acts as resistance from below.", tone: "green" as const },
  { area: "Major resistance", level: "$4,140–$4,190", why: "Oct 19 close ($4,140.87) and Oct 19 weekly high ($4,190.57), per Investing.com historical data.", tone: "green" as const },
  { area: "Broader resistance", level: "$4,255–$4,265", why: "September 28 high near $4,261; previous major structure.", tone: "green" as const },
];

const economicEvents = [
  { day: "Tuesday, October 27 — Durable Goods & Consumer Confidence", points: [
    "Advance Durable Goods at 8:30 AM New York (EDT) / 12:30 PM London (GMT). Source: MarketWatch economic calendar. Capital-goods orders are a real-time read on business investment.",
    "Conference Board Consumer Confidence at 10:00 AM New York (EDT) / 2:00 PM London (GMT). Source: Conference Board official (next release October 27). September reading was 81.9.",
    "FOMC meeting Day 1 begins. No public decision yet — the rate decision lands Wednesday at 2:00 PM EDT. FOMC communications blackout is in effect.",
  ]},
  { day: "Wednesday, October 28 — FOMC Decision", points: [
    "FOMC rate decision at 2:00 PM New York (EDT) / 6:00 PM London (GMT). Source: Federal Reserve FOMC calendar (federalreserve.gov) and fedratecalc.com.",
    "FOMC press conference at 2:30 PM New York (EDT) / 6:30 PM London (GMT). Chair's statement and Q&A can move Treasury yields and the dollar sharply.",
    "Current federal funds rate: 3.75–4.00% (raised 25bp at the September 16 FOMC meeting). Markets are pricing whether the Fed will hike again or hold after the hot September CPI (3.7% YoY).",
  ]},
  { day: "Thursday, October 29 — GDP, PCE & Jobless Claims", points: [
    "GDP Advance Estimate (Q3 2026) at 8:30 AM New York (EDT) / 12:30 PM London (GMT). Source: BEA release schedule. Q2 2026 was 2.2% annualized.",
    "PCE Personal Income & Outlays (September 2026) at 8:30 AM New York (EDT) / 12:30 PM London (GMT). Source: BEA. This is the Fed's preferred inflation gauge.",
    "Initial Jobless Claims at 8:30 AM New York (EDT) / 12:30 PM London (GMT). Source: US Department of Labor, weekly Thursday release. Claims were near 57-year lows (194,000) the prior week.",
    "This is a triple-release at 8:30 AM EDT. Expect sharp yield, dollar and gold volatility in the first minutes.",
  ]},
  { day: "Calendar note — UK clock change", points: [
    "UK clocks go back on Sunday October 25, 2026. London switches from BST (UTC+1) to GMT (UTC+0) for this forecast week.",
    "New York remains on EDT (UTC−4) until November 1. London is 4 hours ahead of New York throughout October 26–30.",
    "Publication date (October 24) is still in BST — the forecast week itself (Oct 26–30) is in GMT.",
  ]},
];

const checklistItems = [
  "Friday close (Oct 23): ~$3,994 (Trading Economics)",
  "Weekly decline: ~3% (Trading Economics)",
  "$3,980–$4,000 immediate support",
  "$3,900 area secondary support (psychological)",
  "$4,041 immediate resistance (Oct 22 level)",
  "$4,100–$4,120 secondary resistance",
  "$4,140–$4,190 major resistance",
  "US Dollar Index (DXY) — near multi-month high",
  "US 10-year Treasury yield (~5.00%)",
  "Tuesday Durable Goods + Consumer Confidence",
  "Wednesday FOMC decision (2:00 PM EDT / 6:00 PM GMT)",
  "Thursday GDP (Q3 advance)",
  "Thursday PCE (September 2026)",
  "Thursday Jobless Claims",
  "UK on GMT from Oct 25 (London 4h ahead of NY)",
  "Daily market structure",
  "4H structure",
  "Position sizing",
  "Stop distance",
  "Risk-to-reward",
];

const faqs = [
  { q: "What is the gold price outlook for October 26–30, 2026?", a: "Gold enters the FOMC week near $3,994 after falling approximately 3% during October 19–23 (Trading Economics). The immediate support zone is $3,980–$4,000 (psychological), and the immediate resistance is $4,041 (the Oct 22 spot level). The week's dominant catalyst is the FOMC decision on Wednesday, followed by Q3 GDP and September PCE inflation on Thursday." },
  { q: "Will the Fed raise rates at the October 27–28 FOMC meeting?", a: "The federal funds rate currently sits at 3.75–4.00% after the Fed raised it 25 basis points at the September 16 FOMC meeting. Market pricing ahead of the October decision is mixed — the hot September CPI (3.7% YoY) and strong labor data have kept tightening expectations alive. This article does not predict the outcome; it outlines the bullish, neutral and bearish scenarios conditional on the decision." },
  { q: "What are the key gold support levels this week?", a: "The immediate support is $3,980–$4,000 — the psychological zone where gold closed on October 23 (Trading Economics: $3,993.96). Below that, the $3,900 area is the next psychological round number, though it is not a verified historical reaction zone." },
  { q: "What are the key gold resistance levels this week?", a: "Immediate resistance is $4,041 — the October 22 Reuters spot level. Above that, $4,100–$4,120 (the former post-CPI recovery base, now resistance from below), then $4,140–$4,190 (the October 19 close and weekly high per Investing.com)." },
  { q: "Why did gold fall during October 19–23?", a: "Gold declined approximately 3% (Trading Economics) as a combination of factors reinforced higher-for-longer Fed expectations: the hot October 14 CPI (3.7% YoY), strong jobless claims near 57-year lows (194,000), robust Flash PMI (57.6 composite), an oil rally that fueled inflation concerns, and Treasury yields near 5.00%. The dollar traded near a multi-month high." },
  { q: "How should traders manage risk around the FOMC decision?", a: "Use proper position sizing (available via the Lot Size Calculator or Position Size Calculator), place stops outside logical structure, avoid entering during the first seconds of the 2:00 PM EDT rate decision when spreads widen dramatically, and evaluate risk-to-reward before committing. The FOMC decision and the Oct 29 triple-release (GDP, PCE, claims) can cause outsized volatility." },
];

const continueLearning = [
  { href: "/xauusd-support-resistance/", title: "XAUUSD Support and Resistance", desc: "How to identify important gold support and resistance zones for clearer trade planning.", icon: <Layers className="w-7 h-7 text-trading-gold" />, accent: "from-trading-gold/10 to-transparent" },
  { href: "/blog/xauusd-weekly-forecast-october-19-23-2026/", title: "Previous Weekly Forecast (Oct 19–23)", desc: "Last week's forecast including the post-CPI recovery and pre-FOMC key levels.", icon: <LineChart className="w-7 h-7 text-trading-gold" />, accent: "from-trading-gold/10 to-transparent" },
  { href: "/blog/us-cpi-october-14-2026-gold-xauusd/", title: "US CPI October 14 Analysis", desc: "Full analysis of the September 2026 CPI report and its impact on gold.", icon: <Activity className="w-7 h-7 text-trading-green" />, accent: "from-trading-green/10 to-transparent" },
  { href: "/tools/forex-position-size-calculator/", title: "Forex Position Size Calculator", desc: "Calculate lot size from your account risk and stop-loss distance before entering.", icon: <Target className="w-7 h-7 text-trading-green" />, accent: "from-trading-green/10 to-transparent" },
];

export default function WeeklyForecastOct26Oct30Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />

      <header className="relative z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-foreground tracking-tight no-underline hover:text-trading-green transition-colors">
            <img src="/brand/forexwizard-logo.webp" alt="ForexWizard logo" width={44} height={44} loading="eager" decoding="async" className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-lg object-cover" />
            Forex Wizard
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/forex-signals/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">Forex Signals</Link>
            <Link href="/gold-signals/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">Gold Signals</Link>
            <Link href="/xauusd-analysis/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">XAUUSD Analysis</Link>
            <Link href="/blog/" className="text-sm font-medium text-trading-gold hover:text-trading-gold/80 transition-colors no-underline">Blog</Link>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-trading-green hover:text-trading-green/80 transition-colors no-underline">Join on Telegram</a>
          </nav>
        </div>
      </header>

      <main className="min-h-screen bg-trading-dark text-foreground overflow-x-hidden">
        {/* HERO */}
        <section className="relative px-4 py-16 md:py-24 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-trading-gold/5 rounded-full blur-[120px] pointer-events-none" />
          <CandlestickBackground />
          <HeroAnimation className="relative z-10 max-w-3xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground/80 mb-6 flex-wrap">
              <Link href="/" className="hover:text-trading-green transition-colors no-underline">Home</Link>
              <span className="text-muted-foreground/40">/</span>
              <Link href="/blog/" className="hover:text-trading-green transition-colors no-underline">Blog</Link>
              <span className="text-muted-foreground/40">/</span>
              <span className="text-foreground/80">XAUUSD Weekly Forecast Oct 26–30</span>
            </nav>
            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-gold">
                <Calendar className="w-4 h-4" />XAUUSD Weekly Forecast · Oct 26–30, 2026
              </span>
            </FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">XAUUSD Weekly Forecast October 26–30, 2026: Gold Outlook Ahead of the Fed</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground/80 mb-8">
              Published {post.displayDate} · By <Link href="/about/" className="text-foreground/80 hover:text-trading-green no-underline">{post.author.name}</Link> · {post.readingTime}
            </p>
            <FadeIn delay={0.3} className="mb-8">
              <div className="glass-strong rounded-2xl overflow-hidden gradient-border">
                <picture>
                  <source type="image/webp" srcSet={HERO_WEBP_SRCSET} sizes={HERO_SIZES} />
                  <img src={post.image} alt={post.imageAlt} width={1200} height={630} className="w-full h-auto block" loading="eager" fetchPriority="high" />
                </picture>
              </div>
            </FadeIn>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Gold enters the October 26–30 trading week near{" "}
                <strong className="text-foreground/90">$3,994</strong> per ounce after falling
                approximately 3% during October 19–23 (Trading Economics). The metal broke below the psychological $4,000
                level on Friday, October 23, closing at $3,993.96 (Trading Economics) — its lowest weekly close in over two months.
              </p>
              <p>
                The decline was driven by a combination of factors that reinforced higher-for-longer Federal Reserve
                expectations: the hot October 14 CPI (3.7% YoY), strong jobless claims near 57-year lows (194,000),
                robust Flash PMI (57.6 composite), an oil rally that fueled inflation concerns, and Treasury yields near
                5.00%. The dollar traded near a multi-month high.
              </p>
              <p>
                This week&apos;s dominant catalyst is the FOMC decision on Wednesday, October 28 (2:00 PM New York /
                6:00 PM London), followed by the Q3 GDP advance estimate and September PCE inflation on Thursday,
                October 29 (8:30 AM New York / 12:30 PM London). The federal funds rate currently sits at 3.75–4.00%
                after the September 16 hike.
              </p>
              <p className="text-foreground/90 font-medium">
                Market snapshot: October 23, 2026 close. Prices are verified spot XAU/USD observations from Trading
                Economics and Investing.com. The FOMC decision on October 28 is the key event risk.
              </p>
            </div>
          </HeroAnimation>
        </section>

        {/* MARKET DASHBOARD */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Market Dashboard: </span>
                <span className="text-trading-gold text-glow-gold">October 24, 2026</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Spot Gold (XAU/USD)</p>
                  <p className="text-2xl font-bold text-trading-gold">~$3,994</p>
                  <p className="text-xs text-muted-foreground/70">Trading Economics Oct 23 close</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Short-Term Structure</p>
                  <p className="text-2xl font-bold text-trading-red">Below $4,000</p>
                  <p className="text-xs text-muted-foreground/70">Post-weekly-decline</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Nearest Support</p>
                  <p className="text-2xl font-bold text-trading-gold">$3,980–$4,000</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Nearest Resistance</p>
                  <p className="text-2xl font-bold text-trading-green">$4,041</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Primary Catalyst</p>
                  <p className="text-2xl font-bold text-foreground">FOMC Decision (Wed)</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Next Key Event</p>
                  <p className="text-2xl font-bold text-foreground">GDP + PCE (Thu)</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground/70 mt-4">
                Market-data cutoff: October 23, 2026 close. Spot XAU/USD ~$3,994 (Trading Economics $3,993.96, −0.77%;
                Ausecure $3,999.90 at 5 PM ET). All event times this week are in New York (EDT, UTC−4) and London (GMT, UTC+0)
                — the UK switches from BST to GMT on Sunday October 25.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* WEEKLY RECAP */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Gold Market Recap: </span>
                <span className="text-trading-gold text-glow-gold">October 19–23, 2026</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The week began with gold opening near $4,159.93 on Monday October 19 (Investing.com historical data).
                  The metal reached a weekly high of $4,190.57 intraday before closing at $4,140.87 (−0.59%). The early
                  strength reflected residual post-CPI recovery momentum.
                </p>
                <p>
                  <strong className="text-foreground/90">Wednesday October 21:</strong> Spot gold rose 0.3% to approximately
                  $4,137 as Treasury yields briefly retreated (Reuters). The 10-year Treasury yield had spiked to 5.13%
                  earlier in the week, then eased.
                </p>
                <p>
                  <strong className="text-foreground/90">Thursday October 22 — the slide begins:</strong>{" "}
                  <a href="https://www.reuters.com/world/india/gold-drops-over-1-oil-rally-reinforces-higher-for-longer-rate-outlook-2026-10-22" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">Reuters</a>{" "}
                  reported spot gold slid 2.4% to approximately $4,041 as an oil rally fueled inflation concerns and
                  pushed yields higher (headline: &quot;Gold falls to more than two-month low as oil-fuelled inflation fears
                  weigh&quot;). The same day, initial jobless claims fell 6,000 to 194,000 for the week ended October 17 — near
                  57-year lows (Reuters) — reinforcing a tight labor market. The 10-year yield dropped to 4.96% after the
                  claims data (FRED/CNBC: &quot;slid more than 17 basis points&quot;), but gold still closed sharply lower.
                </p>
                <p>
                  <strong className="text-foreground/90">Friday October 23 — break of $4,000:</strong> Spot gold closed near
                  $3,994 — Trading Economics reported $3,993.96 (−0.77%); Ausecure reported $3,999.90 at 5:00 PM ET
                  (−0.7%). S&amp;P Global Flash US PMI Composite Output slipped from 58.4 in September to 57.6 in October but
                  &quot;remained firmly in strong&quot; territory (S&amp;P Global PMI). The 10-year yield ended the week near 5.00%
                  (Trading Economics/ycharts). The final University of Michigan October sentiment came in at 48.0, revised
                  higher from the preliminary 46.3 (Trading Economics/University of Michigan), with year-ahead inflation
                  expectations ticking up from 4.6%.
                </p>
                <p>
                  <strong className="text-foreground/90">Weekly summary:</strong> Gold fell approximately 3% on the week
                  (Trading Economics: &quot;down around 3% for the week&quot;), with a calculated decline from Monday&apos;s open to
                  Friday&apos;s close of approximately 4%. The weekly high was ~$4,191 (Oct 19, $4,190.57 — Investing.com); the
                  weekly low was ~$3,994 (Oct 23, Trading Economics). The dollar index (DXY) traded near a multi-month high
                  (~102; MarketWatch: &quot;ICE U.S. Dollar Index rising 0.2% toward an 18-month high&quot;).
                </p>
                <p className="text-sm text-muted-foreground/80 border-l-2 border-trading-gold/40 pl-4">
                  Source basis: Investing.com historical OHLC (October 19), Reuters market reports (October 21–22), Trading
                  Economics and Ausecure (October 23 close), S&amp;P Global PMI, University of Michigan Surveys of Consumers,
                  FRED/ycharts (Treasury yields). Spot gold and US futures are different instruments. The $4,255–$4,265
                  reference is the September 28 high near $4,261.
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
                <span className="text-trading-gold text-glow-gold">October 26–30</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground/90">Short-term structure:</strong> Gold enters the week below the
                  psychological $4,000 level after closing October 23 at $3,993.96 (Trading Economics). The immediate
                  support zone is $3,980–$4,000 — the same area previously identified as &quot;deep support&quot; in the Oct 19–23
                  forecast, now tested from above. The immediate overhead reference is $4,041, the October 22 Reuters spot
                  level where gold briefly stabilized before falling further on Friday.
                </p>
                <p>
                  <strong className="text-foreground/90">Swing references:</strong> The most recent swing high is $4,190.57
                  (Oct 19 weekly high, Investing.com), with the Oct 19 close at $4,140.87. The most recent swing low is
                  $3,993.96 (Oct 23 close, Trading Economics). Below that, the $3,900 area is the next psychological round
                  number — though it is not a verified historical reaction zone and should be treated as a reference, not
                  confirmed structure. The September 28 high near $4,261 is the broader upside structure.
                </p>
                <p>
                  <strong className="text-foreground/90">Momentum context:</strong> The dominant driver this week is the
                  FOMC decision on October 28. Gold has already discounted significant tightening expectations (3% weekly
                  decline, $4,000 broken). Whether the Fed signals patience or further tightening will determine whether
                  the $3,980–$4,000 floor holds or gives way. The October 29 triple-release (GDP, PCE, claims) is the
                  second-leg catalyst.
                </p>
                <p>
                  <strong className="text-foreground/90">Level methodology:</strong> Support and resistance zones are derived
                  from verified spot-gold price observations (Investing.com historical data, Reuters, Trading Economics,
                  Ausecure — October 19–23) and completed daily swing data. Each zone has a documented historical reason. The
                  $3,900 area is explicitly flagged as a psychological reference rather than a confirmed historical reaction
                  zone. No technical levels are carried over from prior forecasts unless the current market structure
                  supports them.
                </p>
                <p>
                  <strong className="text-foreground/90">Invalidation:</strong> The bullish case invalidates on a daily close
                  below $3,980. The bearish case invalidates on a recovery back above $4,041. For a deeper framework, see
                  our{" "}
                  <Link href="/xauusd-support-resistance/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">XAUUSD support and resistance guide</Link>.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* KEY LEVELS TABLE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Gold Support and Resistance </span>
              <span className="text-trading-gold text-glow-gold">Levels</span>
            </h2>
            <div className="hidden md:block glass-strong rounded-2xl overflow-hidden gradient-border">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10">
                  <th className="text-left p-4 font-bold text-foreground">Area</th>
                  <th className="text-left p-4 font-bold text-foreground">Level</th>
                  <th className="text-left p-4 font-bold text-foreground">Technical reason</th>
                </tr></thead>
                <tbody>
                  {keyLevelsTable.map(row => (
                    <tr key={row.area} className="border-b border-white/5 last:border-0">
                      <td className="p-4 text-muted-foreground align-top">{row.area}</td>
                      <td className="p-4 align-top"><span className={row.tone === "gold" ? "font-bold text-trading-gold" : row.tone === "green" ? "font-bold text-trading-green" : "font-bold text-muted-foreground"}>{row.level}</span></td>
                      <td className="p-4 text-muted-foreground align-top">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden space-y-4">
              {keyLevelsTable.map(row => (
                <div key={row.area} className="glass-strong rounded-2xl p-5 gradient-border">
                  <p className="text-xs text-muted-foreground mb-1">{row.area}</p>
                  <p className={`text-2xl font-extrabold mb-2 ${row.tone === "gold" ? "text-trading-gold" : row.tone === "green" ? "text-trading-green" : "text-muted-foreground"}`}>{row.level}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{row.why}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground/70 mt-4">
              Levels derived from Investing.com historical OHLC, Reuters (Oct 21–22), Trading Economics and Ausecure
              (Oct 23 close), and verified completed daily swing data. The $3,900 area is a psychological reference, not
              a confirmed historical reaction zone. Treat as approximate zones, not exact guaranteed values.
            </p>
          </div>
        </FadeSection>

        {/* SCENARIOS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-center">
              <span className="text-foreground">Three Possible Gold Price </span>
              <span className="text-trading-gold text-glow-gold">Scenarios</span>
            </h2>
            <div className="space-y-6">
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-green/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-trading-green/10 flex items-center justify-center"><TrendingUp className="w-6 h-6 text-trading-green" /></div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-trading-green">Bullish Scenario</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground/90">Trigger:</strong> Fed signals patience (no further hike) and/or GDP/PCE come in softer than expected, causing Treasury yields and the dollar to retreat. Gold reclaims $4,000 and pushes toward $4,041.</p>
                  <p><strong className="text-foreground/90">Confirmation:</strong> A daily close above $4,041, followed by acceptance toward $4,100–$4,120.</p>
                  <p><strong className="text-foreground/90">Levels to monitor:</strong> $4,041, then $4,100–$4,120, then $4,140–$4,190.</p>
                  <p><strong className="text-foreground/90">Economic driver:</strong> A dovish FOMC statement, soft PCE inflation, or weak Q3 GDP that eases Fed-tightening expectations.</p>
                  <p><strong className="text-foreground/90">Invalidation:</strong> A daily close back below $3,980.</p>
                </div>
              </div>
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-muted-foreground/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-muted-foreground/10 flex items-center justify-center"><Minus className="w-6 h-6 text-muted-foreground" /></div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-foreground">Neutral / Range Scenario</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground/90">Trigger:</strong> Gold consolidates between $3,980 and $4,041 as markets wait for the FOMC decision and the Oct 29 data dump.</p>
                  <p><strong className="text-foreground/90">Confirmation:</strong> Multiple daily closes inside the range with declining volatility ahead of Wednesday&apos;s decision.</p>
                  <p><strong className="text-foreground/90">Levels to monitor:</strong> $3,980 floor and $4,041 ceiling. A compression toward $3,995–$4,010 often precedes a post-FOMC directional break.</p>
                  <p><strong className="text-foreground/90">Economic driver:</strong> Markets unwilling to commit directionally before the Fed. The decision itself becomes the catalyst for the break.</p>
                  <p><strong className="text-foreground/90">Invalidation:</strong> A clean break and daily close outside either boundary, most likely triggered by the FOMC decision or the Oct 29 data.</p>
                </div>
              </div>
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-gold/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-trading-gold/10 flex items-center justify-center"><TrendingDown className="w-6 h-6 text-trading-gold" /></div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-trading-gold">Bearish Scenario</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground/90">Trigger:</strong> Fed signals further tightening (hawkish statement, upwardly revised dot plot, or hint of another hike) and/or hot GDP/PCE reinforce higher-for-longer. Gold loses $3,980.</p>
                  <p><strong className="text-foreground/90">Confirmation:</strong> A daily close below $3,980, followed by acceptance toward $3,900.</p>
                  <p><strong className="text-foreground/90">Levels to monitor:</strong> $3,900 (psychological), then the $3,850 area if $3,900 fails.</p>
                  <p><strong className="text-foreground/90">Economic driver:</strong> Hot PCE inflation, strong Q3 GDP, or a hawkish FOMC that re-anchors tightening expectations.</p>
                  <p><strong className="text-foreground/90">Invalidation:</strong> A recovery back above $4,041.</p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ECONOMIC CALENDAR */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
              <span className="text-foreground">Economic Calendar — </span>
              <span className="text-trading-gold text-glow-gold">New York &amp; London Times</span>
            </h2>
            <p className="text-sm text-muted-foreground/80 mb-6 leading-relaxed">
              All event times below are shown in New York (EDT, UTC−4) and London (GMT, UTC+0). The UK switches from BST
              to GMT on Sunday, October 25, 2026, so London is on GMT throughout this forecast week. New York remains on
              EDT until November 1. London is 4 hours ahead of New York.
            </p>
            <h3 className="sr-only">Economic Calendar October 26 to 30 2026 in New York and London time</h3>
            <div className="hidden md:block glass-strong rounded-2xl overflow-hidden gradient-border">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10">
                  <th className="text-left p-4 font-bold text-foreground">Event</th>
                  <th className="text-left p-4 font-bold text-foreground">New York (EDT)</th>
                  <th className="text-left p-4 font-bold text-foreground">London (GMT)</th>
                  <th className="text-left p-4 font-bold text-foreground">Gold relevance</th>
                </tr></thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-foreground font-medium align-top">Advance Durable Goods</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">Tue Oct 27, 8:30 AM</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">Tue Oct 27, 12:30 PM</td>
                    <td className="p-4 text-muted-foreground align-top">Capital-goods orders = real-time business investment read. Strong → yields up → gold pressured.</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-foreground font-medium align-top">Consumer Confidence (Conference Board)</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">Tue Oct 27, 10:00 AM</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">Tue Oct 27, 2:00 PM</td>
                    <td className="p-4 text-muted-foreground align-top">September was 81.9. Fed watches consumer mood. Soft read → rate-pause hopes → gold supportive.</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-foreground font-medium align-top">FOMC rate decision</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">Wed Oct 28, 2:00 PM</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">Wed Oct 28, 6:00 PM</td>
                    <td className="p-4 text-muted-foreground align-top">The week&apos;s key event. Current rate 3.75–4.00% after Sep 16 hike. Decision and statement spark yield/dollar moves.</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-foreground font-medium align-top">FOMC press conference</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">Wed Oct 28, 2:30 PM</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">Wed Oct 28, 6:30 PM</td>
                    <td className="p-4 text-muted-foreground align-top">Chair&apos;s remarks and Q&amp;A. Tone (hawkish/dovish) often moves gold more than the decision itself.</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-foreground font-medium align-top">GDP (Advance Estimate) Q3 2026</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">Thu Oct 29, 8:30 AM</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">Thu Oct 29, 12:30 PM</td>
                    <td className="p-4 text-muted-foreground align-top">BEA. Q2 was 2.2% annualized. Strong Q3 → higher-for-longer → gold pressured; weak → opposite.</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-foreground font-medium align-top">PCE (Personal Income &amp; Outlays, Sep 2026)</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">Thu Oct 29, 8:30 AM</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">Thu Oct 29, 12:30 PM</td>
                    <td className="p-4 text-muted-foreground align-top">Fed&apos;s preferred inflation gauge. Hot PCE after hot CPI reinforces tightening → gold pressured.</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-foreground font-medium align-top">Initial Jobless Claims</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">Thu Oct 29, 8:30 AM</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">Thu Oct 29, 12:30 PM</td>
                    <td className="p-4 text-muted-foreground align-top">Prior week was 194,000 (near 57-year lows). Low claims → tight labor → hawkish Fed → gold pressured.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="md:hidden space-y-4">
              {economicEvents.map(ev => (
                <div key={ev.day} className="glass-strong rounded-2xl p-5 gradient-border">
                  <h3 className="text-base font-bold text-foreground mb-3">{ev.day}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                    {ev.points.map((p, i) => <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>{p}</span></li>)}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground/70 mt-4">
              Times shown in New York (EDT, UTC−4) and London (GMT, UTC+0) for the October 26–30, 2026 forecast period.
              Sources: Federal Reserve FOMC calendar, BEA release schedule, MarketWatch, Conference Board, US Department of
              Labor. Monday October 26 and Friday October 30 have no major scheduled US releases (FOMC blackout in effect).
              Re-verify times before trading.
            </p>
          </div>
        </FadeSection>

        {/* FED OUTLOOK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Federal Reserve Outlook: </span>
                <span className="text-trading-gold text-glow-gold">The October 27–28 FOMC</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The FOMC meets <strong className="text-foreground/90">October 27–28, 2026</strong>, with the rate decision
                  on Wednesday October 28 at 2:00 PM New York / 6:00 PM London, followed by the press conference at 2:30 PM
                  New York / 6:30 PM London. The federal funds rate currently sits at{" "}
                  <strong className="text-foreground/90">3.75–4.00%</strong> after the Fed raised it 25 basis points at the
                  September 16 FOMC meeting.
                </p>
                <p>
                  Market pricing ahead of the decision is mixed. The hot September CPI (3.7% YoY headline, above the 3.6%
                  forecast) and strong labor data — including initial jobless claims near 57-year lows (194,000) and Flash
                  PMI composite at 57.6 — have kept tightening expectations alive. At the same time, the October 23 final
                  University of Michigan sentiment of 48.0 (revised higher from 46.3) with rising year-ahead inflation
                  expectations underscores the sticky-inflation narrative the Fed must weigh.
                </p>
                <p>
                  <strong className="text-foreground/90">US Treasury yields:</strong> The 10-year yield ended the week near
                  5.00% (Trading Economics/ycharts). It spiked to 5.13% on October 21, was 5.12% on October 20, dropped to
                  4.96% on October 22 (FRED/CNBC: &quot;slid more than 17 basis points&quot;), and returned to 5.00% on October 23.
                  Higher real yields increase the opportunity cost of holding non-yielding gold.
                </p>
                <p>
                  <strong className="text-foreground/90">Dollar Index (DXY):</strong> The dollar traded near a multi-month
                  high (~102; MarketWatch: &quot;ICE U.S. Dollar Index rising 0.2% toward an 18-month high&quot;). A sustained dollar
                  retreat would remove a headwind for gold; a re-acceleration would add pressure.
                </p>
                <p>
                  <strong className="text-foreground/90">What to watch in the statement:</strong> Any change in language
                  around inflation persistence, the labor market, or forward guidance. The dot plot (if updated) and Chair&apos;s
                  press-conference tone are typically the highest-impact signals for yields, the dollar and gold.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* WHAT GOLD TRADERS SHOULD WATCH */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-green/50">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">What Gold Traders Should </span>
                <span className="text-trading-gold text-glow-gold">Watch</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground/90">The $4,000 magnet:</strong> Gold closed October 23 at $3,993.96
                  (Trading Economics) — just below the psychological $4,000 level. Round numbers often act as magnets in
                  low-liquidity periods and as resistance/support once cleanly broken. Watch how price behaves around
                  $3,995–$4,005 in the Monday and Tuesday sessions before the FOMC.
                </p>
                <p>
                  <strong className="text-foreground/90">Pre-FOMC compression:</strong> Markets often compress volatility
                  ahead of a Fed decision. A tight range Monday–Tuesday (for example, $3,995–$4,020) is not a directional
                  signal — it typically means participants are unwilling to commit before the 2:00 PM EDT rate decision.
                </p>
                <p>
                  <strong className="text-foreground/90">The Wednesday 2:00 PM EDT moment:</strong> The rate decision
                  release itself is the single highest-risk 60 seconds of the week. Spreads on XAU/USD can widen
                  dramatically and price can gap in both directions before settling. Many experienced traders avoid
                  holding through the first seconds and re-evaluate after the initial print.
                </p>
                <p>
                  <strong className="text-foreground/90">The Thursday 8:30 AM EDT triple-release:</strong> GDP, PCE and
                  jobless claims all land at the same time. PCE is the Fed&apos;s preferred inflation gauge and is the most
                  likely to move gold decisively. Hot PCE after hot CPI would reinforce the higher-for-longer narrative;
                  soft PCE would ease it.
                </p>
                <p>
                  These are practical observations, not promises. Each FOMC cycle is unique and the market&apos;s reaction
                  depends on expectations priced in ahead of the release. For a structured framework on planning around
                  these events, see our{" "}
                  <Link href="/xauusd-analysis/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">XAUUSD analysis guide</Link>{" "}
                  and the{" "}
                  <Link href="/xauusd-support-resistance/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">XAUUSD support and resistance guide</Link>.
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
                <span className="text-foreground">Risk Management for </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD Traders</span>
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Position sizing:</strong> Use the{" "}<Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">XAUUSD Lot Size Calculator</Link>{" "}or the{" "}<Link href="/tools/forex-position-size-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Forex Position Size Calculator</Link>{" "}to size positions from account risk and stop distance before entering.</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Stop-loss and gap risk:</strong> Place stops outside logical structure. Gold can gap through stops during the FOMC decision, the Oct 29 triple-release, or weekend openings.</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Spreads and slippage:</strong> Spreads widen 3–5× around data releases. Avoid entering during the first seconds of the 2:00 PM EDT FOMC decision or the 8:30 AM EDT Oct 29 GDP/PCE/claims triple-release.</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Risk-to-reward:</strong> Use the{" "}<Link href="/tools/risk-reward-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Risk Reward Calculator</Link>{" "}to evaluate whether a setup is worth taking before committing.</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Avoid overtrading:</strong> The week&apos;s real catalysts are concentrated on Wednesday and Thursday. Monday, Tuesday and Friday may offer little actionable structure.</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Leverage:</strong> Higher leverage magnifies both gains and losses. A small adverse move during the FOMC release can wipe out an account if position sizing is not respected.</span></li>
                </ul>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green" />Weekly Trading Checklist</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto pr-2">
                  {checklistItems.map(item => (
                    <label key={item} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed cursor-default">
                      <input type="checkbox" className="mt-1 accent-trading-green shrink-0" /><span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* KEY TAKEAWAYS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Key Takeaways for </span>
                <span className="text-trading-gold text-glow-gold">October 26–30</span>
              </h2>
              <ol className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-trading-gold/20 flex items-center justify-center text-trading-gold font-bold text-sm shrink-0">1</span><span>Gold enters the FOMC week near $3,994 after a ~3% weekly decline (Trading Economics), closing October 23 at $3,993.96 — its lowest weekly close in over two months. The $4,000 psychological level is now overhead resistance from below.</span></li>
                <li className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-trading-gold/20 flex items-center justify-center text-trading-gold font-bold text-sm shrink-0">2</span><span>Key support is $3,980–$4,000 (psychological, Oct 23 close zone) and the $3,900 area (psychological reference, not a confirmed reaction zone). Key resistance is $4,041 (Oct 22 Reuters level), $4,100–$4,120 (former post-CPI base), and $4,140–$4,190 (Oct 19 close and weekly high, Investing.com).</span></li>
                <li className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-trading-gold/20 flex items-center justify-center text-trading-gold font-bold text-sm shrink-0">3</span><span>The FOMC decision on Wednesday October 28 (2:00 PM EDT / 6:00 PM GMT) is the week&apos;s dominant catalyst. The federal funds rate is 3.75–4.00% after the September 16 hike; markets are pricing whether the Fed will hike again or hold after the hot CPI.</span></li>
                <li className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-trading-gold/20 flex items-center justify-center text-trading-gold font-bold text-sm shrink-0">4</span><span>Thursday October 29 brings a triple-release at 8:30 AM EDT: Q3 GDP advance, September PCE inflation (the Fed&apos;s preferred gauge), and weekly jobless claims. The bullish, neutral and bearish scenarios are all conditional on the FOMC outcome and the Oct 29 data.</span></li>
              </ol>
            </div>
          </div>
        </FadeSection>

        {/* FAQ */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4"><span className="text-foreground">Frequently Asked </span><span className="text-trading-gold text-glow-gold">Questions</span></h2>
            </div>
            <div className="space-y-4">
              {faqs.map(faq => (
                <details key={faq.q} className="glass-strong rounded-2xl gradient-border group">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">{faq.q}</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                  <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p></div>
                </details>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* RISK DISCLAIMER + SOURCES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="glass rounded-2xl border border-trading-red/20 p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-trading-red mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5" />Risk Disclaimer</h2>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>Trading forex, gold and CFDs involves significant risk and may not be suitable for everyone.</p>
                <p>This article is provided for educational and informational purposes only and should not be considered financial advice, investment advice or a recommendation to buy or sell any financial instrument.</p>
                <p>Market prices are verified spot XAU/USD observations from Trading Economics and Investing.com with explicit timestamps. Always perform your own analysis and use appropriate risk management.</p>
                <p>The FOMC rate decision on Wednesday October 28 and the GDP/PCE releases on Thursday October 29 can cause outsized volatility. Avoid entering positions during the first seconds of these releases when spreads widen dramatically.</p>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-trading-gold" />Sources and Methodology</h2>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground/90">Publication date:</strong> October 24, 2026 at 12:07 PM New York (EDT) / 5:07 PM London (BST). <span className="text-muted-foreground/80">Note: published October 24 while London is still on BST; the forecast week October 26–30 is in GMT after UK clocks go back October 25.</span></p>
                <p><strong className="text-foreground/90">Market-data cutoff:</strong> October 23, 2026 close. Spot XAU/USD close ~$3,994 (Trading Economics $3,993.96, −0.77%; Ausecure $3,999.90 at 5 PM ET). Weekly OHLC from Investing.com historical data.</p>
                <p><strong className="text-foreground/90">Instrument:</strong> Spot XAU/USD. US gold futures are referenced separately where applicable.</p>
                <p><strong className="text-foreground/90">Support/resistance methodology:</strong> Derived from verified spot-gold price observations (Investing.com, Reuters, Trading Economics, Ausecure, October 19–23) and completed daily swing data. Each zone has a documented historical reason. The $3,900 area is explicitly flagged as a psychological reference rather than a verified historical reaction zone.</p>
                <p><strong className="text-foreground/90">Key data sources:</strong></p>
                <ul className="space-y-1 pl-2">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://tradingeconomics.com/commodity/gold" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Trading Economics — Gold price (October 23, 2026)</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.investing.com/currencies/xau-usd-historical-data" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Investing.com — XAU/USD historical data</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.reuters.com/world/india/gold-drops-over-1-oil-rally-reinforces-higher-for-longer-rate-outlook-2026-10-22" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Reuters — Gold falls to two-month low as oil-fueled inflation fears weigh (October 22, 2026)</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.reuters.com/business/us-weekly-jobless-claims-near-57-year-lows-2026-10-22" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Reuters — US weekly jobless claims near 57-year lows (October 22, 2026)</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.pmi.spglobal.com/Public/Home/PressRelease/07d16568e63346999890940d47639cd9" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">S&amp;P Global — Flash US PMI (October 23, 2026)</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.sca.isr.umich.edu" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">University of Michigan — Surveys of Consumers</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.bea.gov/news/schedule/full" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">BEA — Release schedule (GDP + PCE October 29)</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Federal Reserve — FOMC calendars</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.conference-board.org/topics/consumer-confidence" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Conference Board — Consumer Confidence (next release Oct 27)</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://fred.stlouisfed.org/series/dgs10" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">FRED — 10-Year Treasury yield</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.bls.gov/news.release/archives/cpi_10142026.htm" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">BLS — September 2026 CPI Report</a></span></li>
                </ul>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* TELEGRAM CTA */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-gold/5 via-transparent to-trading-green/5 rounded-3xl blur-sm" />
            <div className="relative glass-strong rounded-3xl p-8 md:p-14 text-center gradient-border">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6"><span className="text-foreground">Follow XAU/USD on </span><span className="text-trading-green text-glow-green">Telegram</span></h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">Join the Forex Wizard Telegram community for educational XAU/USD market structure, key levels and trading-related education.</p>
              <PulsingGlow className="inline-block rounded-xl"><TelegramCTA text="Join Forex Wizard Telegram" variant="primary" className="text-lg md:text-xl px-10 py-5" /></PulsingGlow>
              <p className="mt-6 text-xs text-muted-foreground/80">Free to join &middot; Trading involves risk &middot; Not financial advice</p>
            </div>
          </div>
        </FadeSection>

        {/* CONTINUE LEARNING */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Continue </span><span className="text-trading-gold text-glow-gold">Learning</span></h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">Explore related ForexWizard guides and tools to deepen your gold trading knowledge.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {continueLearning.map((item, i) => (
                <FadeIn key={item.href} delay={i * 0.07}>
                  <Link href={item.href} className="block h-full no-underline">
                    <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center`}>{item.icon}</div>
                      <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        <SiteFooter />
      </main>
      <StickyTelegramButton href={TELEGRAM_LINK} label="Join Forex Wizard on Telegram" />
    </>
  );
}
