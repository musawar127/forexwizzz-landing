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

const post = getBlogPost("xauusd-weekly-forecast-october-19-23-2026")!;
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
    { "@type": "ListItem", position: 3, name: "XAUUSD Weekly Forecast Oct 19–23, 2026", item: CANONICAL },
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
  { area: "Friday spot observation", level: "~$4,191", why: "Kitco spot XAU/USD, Oct 16 2026 ~10:22 AM EDT (Bid $4,190.60 / Ask $4,192.60). Intraday — the weekly close had not yet formed.", tone: "muted" as const },
  { area: "Immediate support (role-reversal)", level: "$4,165–$4,185", why: "Former immediate resistance, reclaimed by Friday's spot (~$4,191). Potential support on a pullback.", tone: "gold" as const },
  { area: "Secondary support", level: "$4,100–$4,120", why: "Post-CPI recovery base and Oct 15 reaction zone", tone: "gold" as const },
  { area: "Major support", level: "$4,065–$4,085", why: "Oct 14 CPI-day low ~$4,084 (Reuters, lowest since Oct 7); Oct 7 two-month low ~$4,066 proximity", tone: "gold" as const },
  { area: "Deep support", level: "$3,980–$4,020", why: "Psychological $4,000 + demand shelf below October range", tone: "gold" as const },
  { area: "Immediate resistance", level: "$4,200–$4,210", why: "Round-number $4,200 + Oct 9 high ~$4,208 + Oct 12 intraday high above $4,200", tone: "green" as const },
  { area: "Major resistance", level: "$4,255–$4,265", why: "September 28 high near $4,261; previous structure", tone: "green" as const },
];

const economicEvents = [
  { day: "Monday, October 19 — China Q3 GDP", points: [
    "China Q3 GDP scheduled at 10:00 AM China Standard Time (7:00 AM PKT). Source: National Bureau of Statistics of China.",
    "China is the world's largest gold consumer. Stronger Chinese growth could support gold demand and Asian risk sentiment; weaker data could weigh on the yuan and commodity outlook.",
    "This release does not directly move US Treasury yields or the dollar, but it can shift global growth expectations and safe-haven flows.",
  ]},
  { day: "Tuesday, October 20 — US Housing Data", points: [
    "New Residential Construction (Housing Starts) at 8:30 AM ET (5:30 PM PKT). Philadelphia Fed Non-Manufacturing Survey also at 8:30 AM ET.",
    "NAR Pending Home Sales at 10:00 AM ET (7:00 PM PKT). Source: New York Fed October 2026 calendar.",
    "Housing data is secondary for gold but can influence broader US growth and yield expectations. Strong housing could reinforce the higher-for-longer rates narrative.",
  ]},
  { day: "Thursday, October 22 — Initial Jobless Claims", points: [
    "Weekly US initial jobless claims at 8:30 AM ET (5:30 PM PKT). Source: US Department of Labor.",
    "After the weak September NFP (+29,000) and the hot CPI, labor-market data is under heightened scrutiny. Elevated claims could ease Fed-tightening expectations and support gold; low claims could do the opposite.",
  ]},
  { day: "Friday, October 23 — Flash PMI & U-Mich Sentiment", points: [
    "S&P Global US Flash PMI (Manufacturing, Services, Composite) at 9:45 AM ET (6:45 PM PKT). Source: S&P Global PMI.",
    "Final University of Michigan Consumer Sentiment at 10:00 AM ET (7:00 PM PKT). Source: University of Michigan Surveys of Consumers. Preliminary October reading was 46.3.",
    "Strong PMI could reinforce US growth and yield expectations (bearish for gold). Weak PMI or lower sentiment could ease rate-hike pressure (bullish for gold). The final U-Mich sentiment includes revised inflation expectations.",
  ]},
];

const checklistItems = [
  "Friday spot gold observation (~$4,191, Kitco Oct 16, intraday)",
  "Post-CPI recovery structure",
  "$4,165–$4,185 reclaimed support (role-reversal)",
  "$4,100–$4,120 secondary support",
  "$4,065–$4,085 major support (CPI low zone)",
  "$3,980–$4,020 deep support",
  "$4,200–$4,210 immediate resistance",
  "$4,255–$4,265 major resistance",
  "US Dollar Index (DXY)",
  "US 10-year Treasury yield",
  "Monday China Q3 GDP",
  "Tuesday US housing data",
  "Thursday jobless claims",
  "Friday Flash PMI",
  "Friday U-Mich final sentiment",
  "October 27–28 FOMC meeting (out of window)",
  "Daily market structure",
  "4H structure",
  "Position sizing",
  "Stop distance",
  "Risk-to-reward",
];

const faqs = [
  { q: "What is the gold price outlook for October 19–23, 2026?", a: "Gold enters the week near $4,191 after rebounding from the October 14 CPI selloff (Kitco spot, October 16, ~10:22 AM EDT — an intraday observation, not the weekly close). The first support zone is the reclaimed $4,165–$4,185 area (former resistance), and the first resistance is approximately $4,200–$4,210. The week's main catalysts are China Q3 GDP (Monday), US jobless claims (Thursday), and Flash PMI plus final U-Mich sentiment (Friday)." },
  { q: "Can XAUUSD recover after the US CPI selloff?", a: "Gold has already recovered much of the October 14 CPI-driven decline. Reuters reported spot gold near $4,153 on October 15 (Thursday), up from approximately $4,084 on October 14 (Reuters CPI-day low, its lowest since October 7). By Friday October 16, Kitco spot reached approximately $4,191 intraday (~10:22 AM EDT). The recovery was driven by a softer dollar and declining Treasury yields. Whether it continues depends on whether yields and the dollar remain soft or re-strengthen." },
  { q: "What are the key gold support levels this week?", a: "The nearest support is the reclaimed $4,165–$4,185 zone (former immediate resistance, now a potential role-reversal support). Below that, $4,100–$4,120 (post-CPI recovery base), then $4,065–$4,085 (Oct 14 CPI-day low ~$4,084 and Oct 7 two-month low proximity), then the deep $3,980–$4,020 zone (psychological $4,000 and demand shelf)." },
  { q: "What are the key gold resistance levels this week?", a: "Immediate resistance is approximately $4,200–$4,210 (round-number $4,200, Oct 9 high ~$4,208 and Oct 12 intraday high above $4,200). Above that, the major $4,255–$4,265 zone (September 28 high near $4,261). The former $4,165–$4,185 resistance has been reclaimed by Friday's spot and is now treated as support, not resistance." },
  { q: "Which US economic releases could affect gold?", a: "Tuesday's housing data (Housing Starts, Pending Home Sales), Thursday's weekly jobless claims, and Friday's Flash PMI plus final University of Michigan sentiment. None of these are as impactful as last week's CPI, but they can shift yield and dollar expectations." },
  { q: "When is the next Federal Reserve meeting?", a: "The next FOMC meeting is October 27–28, 2026 — outside the October 19–23 forecast period. The Fed communications blackout begins October 17. Markets will be pricing expectations into yields and the dollar ahead of the meeting, which indirectly affects gold." },
  { q: "How does a weaker US dollar affect gold?", a: "Gold is priced in US dollars. When the dollar weakens, gold becomes cheaper for non-dollar buyers, which can increase demand. A weaker dollar also typically reflects lower real yields, reducing the opportunity cost of holding non-yielding gold. However, gold and the dollar can occasionally strengthen simultaneously during risk-off episodes." },
  { q: "How should traders manage risk during high volatility?", a: "Use proper position sizing (available via the Lot Size Calculator or Position Size Calculator), place stops outside logical structure, avoid entering during the first seconds of a data release when spreads widen, and evaluate risk-to-reward before committing. Higher leverage magnifies both gains and losses." },
];

const continueLearning = [
  { href: "/xauusd-support-resistance/", title: "XAUUSD Support and Resistance", desc: "How to identify important gold support and resistance zones for clearer trade planning.", icon: <Layers className="w-7 h-7 text-trading-gold" />, accent: "from-trading-gold/10 to-transparent" },
  { href: "/blog/xauusd-weekly-forecast-october-12-16-2026/", title: "Previous Weekly Forecast (Oct 12–16)", desc: "Last week's forecast including the CPI update and pre-CPI key levels.", icon: <LineChart className="w-7 h-7 text-trading-gold" />, accent: "from-trading-gold/10 to-transparent" },
  { href: "/blog/us-cpi-october-14-2026-gold-xauusd/", title: "US CPI October 14 Analysis", desc: "Full analysis of the September 2026 CPI report and its impact on gold.", icon: <Activity className="w-7 h-7 text-trading-green" />, accent: "from-trading-green/10 to-transparent" },
  { href: "/tools/forex-position-size-calculator/", title: "Forex Position Size Calculator", desc: "Calculate lot size from your account risk and stop-loss distance before entering.", icon: <Target className="w-7 h-7 text-trading-green" />, accent: "from-trading-green/10 to-transparent" },
];

export default function WeeklyForecastOct19Oct23Page() {
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
              <span className="text-foreground/80">XAUUSD Weekly Forecast Oct 19–23</span>
            </nav>
            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-gold">
                <Calendar className="w-4 h-4" />XAUUSD Weekly Forecast · Oct 19–23, 2026
              </span>
            </FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">XAUUSD Weekly Forecast October 19–23, 2026: Gold Outlook &amp; Key Levels</span>
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
                Gold enters the October 19–23 trading week near{" "}
                <strong className="text-foreground/90">$4,191</strong> after a volatile post-CPI week.
                The October 14 US CPI report (3.7% YoY headline, above 3.6% forecast) initially sent gold tumbling
                to approximately $4,084 (Reuters spot low, its lowest since October 7), but the metal rebounded sharply as the dollar and Treasury yields retreated.
              </p>
              <p>
                Reuters reported spot gold near{" "}
                <strong className="text-foreground/90">$4,153</strong> on October 15 (Thursday),
                with US December futures settling near $4,170. By Friday October 16, Kitco spot gold reached approximately $4,191 intraday (~10:22 AM EDT, Bid $4,190.60 / Ask $4,192.60), and the dollar was on course for its first weekly decline in over a month.
              </p>
              <p>
                This week's calendar is lighter than last week's CPI-heavy schedule,
                but China Q3 GDP (Monday), US jobless claims (Thursday),
                and Flash PMI plus final U-Mich sentiment (Friday) could all shift
                yield, dollar and risk-sentiment dynamics that drive gold.
              </p>
              <p className="text-foreground/90 font-medium">
                Market snapshot: October 16, 2026 (~10:22 AM EDT) — prices are intraday observations, not confirmed weekly closes.
                The Friday weekly closing candle had not yet formed at publication time.
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
                <span className="text-trading-gold text-glow-gold">October 16, 2026</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Spot Gold (XAU/USD)</p>
                  <p className="text-2xl font-bold text-trading-gold">~$4,191</p>
                  <p className="text-xs text-muted-foreground/70">Kitco Oct 16 ~10:22 AM EDT</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Short-Term Structure</p>
                  <p className="text-2xl font-bold text-trading-green">Reclaiming</p>
                  <p className="text-xs text-muted-foreground/70">Above former $4,165–$4,185 resistance</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Nearest Support</p>
                  <p className="text-2xl font-bold text-trading-gold">$4,165–$4,185</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Nearest Resistance</p>
                  <p className="text-2xl font-bold text-trading-green">$4,200–$4,210</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Primary Catalyst</p>
                  <p className="text-2xl font-bold text-foreground">Post-CPI Fed pricing</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Next Key Event</p>
                  <p className="text-2xl font-bold text-foreground">China GDP (Mon)</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground/70 mt-4">
                Market-data cutoff: October 16, 2026, ~10:22 AM EDT (Kitco spot). Friday's weekly closing candle had not yet formed at publication time.
                October 14–15 levels are Reuters intraday observations; October 16 is a Kitco intraday observation. None are official weekly closes.
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
                <span className="text-trading-gold text-glow-gold">October 12–16, 2026</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The week began with gold near $4,194 — the October 9 (Friday) weekly close that carried into Monday's open — after the previous week's recovery from a two-month low.
                  Monday was Columbus Day (reduced US bond liquidity). Tuesday brought the IMF World Economic Outlook
                  and Fed Governor Waller's discussion.
                </p>
                <p>
                  <strong className="text-foreground/90">Wednesday October 14 — CPI shock:</strong> The BLS released September 2026 CPI at 8:30 AM ET.
                  Headline CPI was 3.7% YoY (above 3.6% forecast) and core CPI was 2.6% YoY (above 2.5% forecast).
                  Gasoline surged 9.1% MoM and energy rose 5.2% MoM. Gold fell to approximately $4,084 (Reuters: spot down ~1.8% to $4,083.94 by 2:05 PM EDT, its lowest since October 7)
                  as Treasury yields and the dollar strengthened. See our full{" "}
                  <Link href="/blog/us-cpi-october-14-2026-gold-xauusd/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">CPI analysis</Link>.
                </p>
                <p>
                  <strong className="text-foreground/90">Thursday October 15 — Rebound:</strong> Gold recovered as the dollar and Treasury yields declined.
                  <a href="https://www.reuters.com/world/india/gold-rebounds-one-week-low-dollar-slips-2026-10-15/" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors"> Reuters</a>{" "}
                  reported spot gold near $4,153.42 and US December futures settling near $4,170.10.
                  This rebound demonstrated that the CPI-driven sell-off was not necessarily a one-directional trend.
                </p>
                <p>
                  <strong className="text-foreground/90">Friday October 16:</strong> Kitco spot gold reached approximately $4,191 intraday (~10:22 AM EDT, Bid $4,190.60 / Ask $4,192.60),
                  reclaiming the former $4,165–$4,185 resistance zone. The dollar was on course for its first weekly decline in more than a month,
                  amid falling yields and financial-market uncertainty ({" "}
                  <a href="https://www.reuters.com/world/asia-pacific/euro-gets-much-needed-reprieve-ai-wobbles-rock-dollar-2026-10-16/" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">Reuters</a>).
                  This is an intraday observation; the Friday weekly closing candle had not yet formed at publication time.
                </p>
                <p className="text-sm text-muted-foreground/80 border-l-2 border-trading-gold/40 pl-4">
                  Source basis: Reuters market reports (October 14–15) and Kitco spot gold (October 16). Spot gold and futures are different instruments.
                  Prices are intraday observations with explicit timestamps, not official daily or weekly closing prices. The $4,194 reference is the October 9 weekly close (USA Today), not the October 12 close.
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
                <span className="text-trading-gold text-glow-gold">October 19–23</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground/90">Short-term structure:</strong> Gold has recovered from the October 14 CPI-driven low near $4,084
                  to approximately $4,191 by Friday October 16 (Kitco, ~10:22 AM EDT). This places spot above the former immediate resistance zone ($4,165–$4,185),
                  which now acts as a potential role-reversal support on a pullback. The next upside reference is the October 9 weekly close near $4,194 and the $4,200 round number;
                  the October 12 close was approximately $4,165 (USA Today), not $4,194.
                </p>
                <p>
                  <strong className="text-foreground/90">Swing references:</strong> The key recent swing low is approximately $4,084 (Oct 14 CPI low, Reuters — its lowest since October 7).
                  The pre-CPI reference is approximately $4,194 (Oct 9 weekly close, carried into the Oct 12 open). The October 7 two-month low near $4,066
                  remains the deeper downside reference. The September 28 high near $4,261 is the broader upside target.
                </p>
                <p>
                  <strong className="text-foreground/90">Momentum context:</strong> The dominant fundamental driver this week is the interplay between
                  post-CPI Fed rate expectations and the dollar/yield response. The initial CPI reaction (higher yields, stronger dollar, weaker gold)
                  has partially unwound. Whether that unwinding continues or reverses will likely determine the next directional move.
                </p>
                <p>
                  <strong className="text-foreground/90">Level methodology:</strong> Support and resistance zones are derived from verified spot-gold
                  price observations (Reuters October 14–15; Kitco October 16) and completed daily swing data. Each zone is explained by a specific historical event
                  or structural reference. No technical levels are copied from previous forecasts unless the current market structure supports them.
                </p>
                <p>
                  <strong className="text-foreground/90">Invalidation:</strong> The bullish recovery case invalidates on a daily close below $4,165 (the reclaimed zone fails).
                  The bearish case invalidates on a sustained move above $4,210. For a deeper framework, see our{" "}
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
              Levels derived from Reuters (Oct 14–15) and Kitco (Oct 16) spot-gold observations and completed daily swing data.
              The $4,194 reference is the October 9 weekly close (USA Today), not the October 12 close. Treat as approximate zones, not exact guaranteed values.
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
                  <p><strong className="text-foreground/90">Trigger:</strong> Dollar and Treasury yields continue to retreat from post-CPI highs, and gold builds on Friday's reclaim of $4,165–$4,185 by breaking above $4,200–$4,210.</p>
                  <p><strong className="text-foreground/90">Confirmation:</strong> A daily close above $4,210, followed by acceptance toward $4,255–$4,265.</p>
                  <p><strong className="text-foreground/90">Levels to monitor:</strong> $4,210, then $4,255–$4,265.</p>
                  <p><strong className="text-foreground/90">Economic driver:</strong> Weak Flash PMI or elevated jobless claims easing Fed-tightening expectations.</p>
                  <p><strong className="text-foreground/90">Invalidation:</strong> A daily close back below $4,165 (the reclaimed zone fails).</p>
                </div>
              </div>
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-muted-foreground/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-muted-foreground/10 flex items-center justify-center"><Minus className="w-6 h-6 text-muted-foreground" /></div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-foreground">Range / Neutral Scenario</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground/90">Trigger:</strong> Gold remains between $4,165 (reclaimed support) and $4,210 (immediate resistance), consolidating after the CPI-driven volatility.</p>
                  <p><strong className="text-foreground/90">Confirmation:</strong> Multiple daily closes inside the range with declining volatility and no decisive catalyst.</p>
                  <p><strong className="text-foreground/90">Levels to monitor:</strong> $4,165 floor and $4,210 ceiling. A compression toward $4,185–$4,195 often precedes a directional break.</p>
                  <p><strong className="text-foreground/90">Economic driver:</strong> Mixed economic data (housing OK, claims stable, PMI in line) that does not significantly change Fed expectations.</p>
                  <p><strong className="text-foreground/90">Invalidation:</strong> A clean break and daily close outside either boundary.</p>
                </div>
              </div>
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-gold/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-trading-gold/10 flex items-center justify-center"><TrendingDown className="w-6 h-6 text-trading-gold" /></div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-trading-gold">Bearish Scenario</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground/90">Trigger:</strong> Dollar and yields re-strengthen as markets re-price Fed tightening after the hot CPI, and gold loses the reclaimed $4,165 zone.</p>
                  <p><strong className="text-foreground/90">Confirmation:</strong> A daily close below $4,165, followed by a break of $4,100–$4,120.</p>
                  <p><strong className="text-foreground/90">Levels to monitor:</strong> $4,100–$4,120 (recovery base), then $4,065–$4,085 (CPI low zone), then $3,980–$4,020 (psychological $4,000 area).</p>
                  <p><strong className="text-foreground/90">Economic driver:</strong> Strong Flash PMI, low jobless claims, or hawkish market re-pricing ahead of the October 27–28 FOMC.</p>
                  <p><strong className="text-foreground/90">Invalidation:</strong> A recovery back above $4,210.</p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ECONOMIC CALENDAR */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Economic Calendar: </span>
              <span className="text-trading-gold text-glow-gold">October 19–23, 2026</span>
            </h2>
            <div className="hidden md:block glass-strong rounded-2xl overflow-hidden gradient-border">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10">
                  <th className="text-left p-4 font-bold text-foreground">Day</th>
                  <th className="text-left p-4 font-bold text-foreground">ET</th>
                  <th className="text-left p-4 font-bold text-foreground">PKT</th>
                  <th className="text-left p-4 font-bold text-foreground">Event</th>
                  <th className="text-left p-4 font-bold text-foreground">Gold relevance</th>
                </tr></thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-muted-foreground align-top">Mon Oct 19</td>
                    <td className="p-4 text-muted-foreground align-top">—</td>
                    <td className="p-4 text-muted-foreground align-top">7:00 AM</td>
                    <td className="p-4 text-foreground font-medium align-top">China Q3 GDP</td>
                    <td className="p-4 text-muted-foreground align-top">China is largest gold consumer. Growth data can shift Asian demand and risk sentiment.</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-muted-foreground align-top">Tue Oct 20</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">8:30 AM</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">5:30 PM</td>
                    <td className="p-4 text-foreground font-medium align-top">Housing Starts + Philly Fed</td>
                    <td className="p-4 text-muted-foreground align-top">Secondary for gold. Can influence US growth and yield expectations.</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-muted-foreground align-top">Tue Oct 20</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">10:00 AM</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">7:00 PM</td>
                    <td className="p-4 text-foreground font-medium align-top">Pending Home Sales</td>
                    <td className="p-4 text-muted-foreground align-top">Housing-market health proxy. Weak data could ease rate-hike pressure.</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-muted-foreground align-top">Thu Oct 22</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">8:30 AM</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">5:30 PM</td>
                    <td className="p-4 text-foreground font-medium align-top">Initial Jobless Claims</td>
                    <td className="p-4 text-muted-foreground align-top">Post-NFP labor scrutiny. Elevated claims → Fed-pivot hopes → gold supportive.</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-muted-foreground align-top">Fri Oct 23</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">9:45 AM</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">6:45 PM</td>
                    <td className="p-4 text-foreground font-medium align-top">Flash PMI (Mfg + Services)</td>
                    <td className="p-4 text-muted-foreground align-top">Real-time growth read. Strong PMI → yields up → gold pressured; weak → opposite.</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-muted-foreground align-top">Fri Oct 23</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">10:00 AM</td>
                    <td className="p-4 text-foreground/90 font-medium align-top">7:00 PM</td>
                    <td className="p-4 text-foreground font-medium align-top">Final U-Mich Sentiment</td>
                    <td className="p-4 text-muted-foreground align-top">Preliminary was 46.3. Includes revised inflation expectations. Fed watches closely.</td>
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
              Sources: New York Fed October 2026 calendar, National Bureau of Statistics of China, S&P Global PMI, University of Michigan.
              October 27–28 FOMC and October 29 GDP/PCE are outside this forecast window. Re-verify times before trading.
            </p>
          </div>
        </FadeSection>

        {/* FED OUTLOOK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Federal Reserve Outlook and </span>
                <span className="text-trading-gold text-glow-gold">Dollar/Yield Drivers</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The next FOMC meeting is <strong className="text-foreground/90">October 27–28, 2026</strong> — outside this forecast week.
                  The Fed communications blackout begins <strong className="text-foreground/90">October 17</strong>, meaning no scheduled Fed speeches during the October 19–23 week.
                  However, markets will continue pricing expectations into Treasury yields and the dollar, which indirectly drive gold.
                </p>
                <p>
                  The hot September CPI (3.7% YoY headline, 2.6% core) has increased the stakes for the October 27–28 meeting.
                  Markets must weigh persistent inflation against a weakening labor market (September NFP was only +29,000).
                  This tension — sticky inflation but softening growth — creates two-way volatility for yields, the dollar and gold.
                </p>
                <p>
                  <strong className="text-foreground/90">US Treasury yields:</strong> The 10-year yield was around 5.24% before the CPI release. Whether yields continue
                  to retreat or re-spike will be a primary gold driver. Higher real yields increase the opportunity cost of holding gold.
                </p>
                <p>
                  <strong className="text-foreground/90">Dollar Index (DXY):</strong> The dollar was on course for its first weekly decline in over a month as of October 16 (Reuters).
                  A sustained dollar retreat would remove a headwind for gold; a re-acceleration would add pressure.
                </p>
                <p>
                  <strong className="text-foreground/90">Safe-haven demand:</strong> Broader financial-market uncertainty (including AI-related equity volatility referenced by Reuters on October 16)
                  could support gold through the safe-haven channel, potentially outweighing yield pressure.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* CAN GOLD RISE DESPITE HIGH INFLATION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-gold/50">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Can Gold Rise Even When </span>
                <span className="text-trading-gold text-glow-gold">Inflation Remains High?</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The October 14 CPI report was undeniably hot — 3.7% headline YoY, above expectations. Yet gold rebounded the very next day.
                  This apparent contradiction illustrates an important distinction: the market impact of inflation depends on how it changes
                  <em> expected Federal Reserve policy</em>, not just on the inflation number itself.
                </p>
                <p>
                  When hotter CPI raises expectations of tighter policy (higher rates), Treasury yields rise, the dollar strengthens, and gold falls —
                  as happened immediately after the October 14 release. But when market participants conclude that the inflation print is already priced in,
                  or when other factors (equity volatility, geopolitical risk, softer growth signals) drive yields back down, gold can recover even though inflation remains high.
                </p>
                <p>
                  Falling bond yields reduce the opportunity cost of holding non-yielding gold. Risk aversion can drive safe-haven demand.
                  And a weaker dollar makes gold cheaper for non-dollar buyers. These forces can — and did on October 15 — outweigh the inflation narrative.
                </p>
                <p>
                  For the full CPI analysis and gold reaction, see our{" "}
                  <Link href="/blog/us-cpi-october-14-2026-gold-xauusd/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">October 14 CPI analysis</Link>.
                  For the broader macro framework, see our{" "}
                  <Link href="/blog/xauusd-fundamental-analysis/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">XAUUSD fundamental analysis guide</Link>.
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
                  <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Stop-loss and gap risk:</strong> Place stops outside logical structure. Gold can gap through stops during data releases or weekend openings.</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Spreads and slippage:</strong> Spreads widen 3–5× around data releases. Avoid entering during the first seconds after Flash PMI or jobless claims.</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Risk-to-reward:</strong> Use the{" "}<Link href="/tools/risk-reward-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Risk Reward Calculator</Link>{" "}to evaluate whether a setup is worth taking before committing.</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Avoid overtrading:</strong> This week's calendar is lighter than last week's. Not every session requires a trade.</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Leverage:</strong> Higher leverage magnifies both gains and losses. A small adverse move can wipe out an account if position sizing is not respected.</span></li>
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
                <span className="text-trading-gold text-glow-gold">October 19–23</span>
              </h2>
              <ol className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-trading-gold/20 flex items-center justify-center text-trading-gold font-bold text-sm shrink-0">1</span><span>Gold rebounded from the October 14 CPI selloff (~$4,084) to approximately $4,191 by Friday October 16 (Kitco, intraday), reclaiming the former $4,165–$4,185 resistance. The post-CPI recovery is real but the Friday weekly close had not yet formed at publication time.</span></li>
                <li className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-trading-gold/20 flex items-center justify-center text-trading-gold font-bold text-sm shrink-0">2</span><span>Key support is $4,165–$4,185 (reclaimed former resistance, now role-reversal) and $4,100–$4,120 (recovery base); $4,065–$4,085 is the CPI low zone. Key resistance is $4,200–$4,210 (round number + Oct 9 high) and $4,255–$4,265 (Sept 28 high).</span></li>
                <li className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-trading-gold/20 flex items-center justify-center text-trading-gold font-bold text-sm shrink-0">3</span><span>This week's calendar is lighter: China Q3 GDP (Monday), US housing (Tuesday), jobless claims (Thursday), Flash PMI and final U-Mich sentiment (Friday). The FOMC blackout begins October 17.</span></li>
                <li className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-trading-gold/20 flex items-center justify-center text-trading-gold font-bold text-sm shrink-0">4</span><span>The October 27–28 FOMC meeting is the next major Fed event. Markets will price expectations into yields and the dollar throughout this week, indirectly driving gold.</span></li>
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
                <p>Market prices are intraday observations with explicit timestamps, not official closing prices. The US trading session had not closed at publication time (Kitco spot observed ~10:22 AM EDT on October 16). Always perform your own analysis and use appropriate risk management.</p>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-trading-gold" />Sources and Methodology</h2>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground/90">Publication date:</strong> October 16, 2026, 19:55 PKT. <span className="text-muted-foreground/80">Corrected: October 16, 2026, 21:15 PKT (spot price and technical-level refresh).</span></p>
                <p><strong className="text-foreground/90">Market-data cutoff:</strong> October 16, 2026, ~10:22 AM EDT (Kitco spot XAU/USD, Bid $4,190.60 / Ask $4,192.60). Friday's weekly closing candle had not yet formed at publication time. October 14–15 levels are Reuters intraday observations; October 16 is a Kitco intraday observation.</p>
                <p><strong className="text-foreground/90">Instrument:</strong> Spot XAU/USD. US December gold futures are referenced separately where applicable.</p>
                <p><strong className="text-foreground/90">Support/resistance methodology:</strong> Derived from verified spot-gold price observations (Reuters October 14–15; Kitco October 16) and completed daily swing data. Each zone has a documented historical reason. The $4,194 reference is the October 9 weekly close (USA Today), not the October 12 close (which was ~$4,165).</p>
                <p><strong className="text-foreground/90">Key data sources:</strong></p>
                <ul className="space-y-1 pl-2">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.kitco.com/charts/gold?sitetype=fullsite" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Kitco — Spot Gold chart (October 16, 2026, ~10:22 AM EDT)</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.bls.gov/news.release/archives/cpi_10142026.htm" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">BLS — September 2026 CPI Report</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.reuters.com/world/india/gold-prices-hold-firm-ahead-us-inflation-data-2026-10-14" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Reuters — Gold drops on hot US CPI (October 14, 2026)</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.reuters.com/world/india/gold-rebounds-one-week-low-dollar-slips-2026-10-15/" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Reuters — Gold rebound (October 15, 2026)</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.reuters.com/world/asia-pacific/euro-gets-much-needed-reprieve-ai-wobbles-rock-dollar-2026-10-16/" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Reuters — Dollar weekly decline (October 16, 2026)</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.usatoday.com/story/money/personalfinance/2026/10/12/gold-price-on-october-12-2026/92214541007" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">USA Today — Gold price October 12, 2026 (previous close $4,194)</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://tradingeconomics.com/commodity/gold" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Trading Economics — Gold price (October 16, 2026 corroboration)</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.newyorkfed.org/research/calendars/i-oct26.html" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">New York Fed — October 2026 Economic Calendar</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Federal Reserve — FOMC Calendar</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.sca.isr.umich.edu/" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">University of Michigan — Surveys of Consumers</a></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.pmi.spglobal.com/" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">S&P Global — PMI Portal</a></span></li>
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
