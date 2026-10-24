import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  AlertTriangle,
  Target,
  CheckCircle2,
  BookOpen,
  Newspaper,
  LineChart,
  Activity,
  Globe,
  Clock,
  TrendingUp,
  CalendarClock,
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

const post = getBlogPost("best-time-to-trade-forex")!;

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
      url: "https://forexwizard.online/brand/forexwizard-logo.webp",
    },
  },
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
const sessionRows = [
  {
    name: "Sydney",
    utc: "Approx. 22:00–07:00 UTC",
    characteristic: "Often the quietest of the four. Liquidity can be thinner and moves more gradual.",
    activePairs: "AUD, NZD crosses (AUD/USD, NZD/USD, AUD/JPY)",
  },
  {
    name: "Tokyo",
    utc: "Approx. 00:00–09:00 UTC",
    characteristic: "Asia-Pacific liquidity builds. JPY pairs typically see the most activity.",
    activePairs: "JPY crosses (USD/JPY, EUR/JPY, AUD/JPY); also AUD, NZD",
  },
  {
    name: "London",
    utc: "Approx. 08:00–17:00 UTC",
    characteristic: "Largest FX turnover globally. Trend development and wider ranges are common.",
    activePairs: "EUR, GBP, CHF crosses (EUR/USD, GBP/USD, EUR/GBP, USD/CHF)",
  },
  {
    name: "New York",
    utc: "Approx. 13:00–22:00 UTC",
    characteristic: "Deep USD liquidity and most US economic releases. Volatility often rises around news.",
    activePairs: "USD crosses (EUR/USD, GBP/USD, USD/JPY, USD/CAD)",
  },
];

const sessionPairsRows = [
  {
    session: "Sydney",
    activePairs: "AUD/USD, NZD/USD, AUD/NZD, AUD/JPY",
    note: "Antipodean currencies dominate. Moves can be range-bound unless local data surprises.",
  },
  {
    session: "Tokyo",
    activePairs: "USD/JPY, EUR/JPY, AUD/JPY, GBP/JPY",
    note: "JPY pairs usually lead. Asia-Pacific equities and regional data can influence sentiment.",
  },
  {
    session: "London",
    activePairs: "EUR/USD, GBP/USD, EUR/GBP, USD/CHF, EUR/JPY",
    note: "European currencies generally dominate. London open can produce directional moves.",
  },
  {
    session: "New York",
    activePairs: "EUR/USD, GBP/USD, USD/JPY, USD/CAD, USD/CHF",
    note: "USD pairs dominate. US data (NFP, CPI, FOMC) often defines intraday volatility.",
  },
  {
    session: "London–NY overlap",
    activePairs: "EUR/USD, GBP/USD, USD/JPY, USD/CHF, USD/CAD",
    note: "Two deep liquidity pools combine. Spreads can tighten and volatility can rise.",
  },
];

const pktRows = [
  {
    session: "Sydney",
    utc: "Approx. 22:00–07:00 UTC",
    pkt: "Approx. 03:00–12:00 PKT",
    note: "Early Pakistan morning. Liquidity may be thinner.",
  },
  {
    session: "Tokyo",
    utc: "Approx. 00:00–09:00 UTC",
    pkt: "Approx. 05:00–14:00 PKT",
    note: "Morning into early afternoon. JPY pairs often lead.",
  },
  {
    session: "London",
    utc: "Approx. 08:00–17:00 UTC",
    pkt: "Approx. 13:00–22:00 PKT",
    note: "Afternoon into evening. European currencies typically dominate.",
  },
  {
    session: "New York",
    utc: "Approx. 13:00–22:00 UTC",
    pkt: "Approx. 18:00–03:00 PKT (next day)",
    note: "Evening into late night. US data often lands in the evening.",
  },
  {
    session: "London–NY overlap",
    utc: "Approx. 13:00–17:00 UTC",
    pkt: "Approx. 18:00–22:00 PKT",
    note: "Convenient evening window for many Pakistan-based traders.",
  },
];

const sessionTradeStyles = [
  {
    style: "Scalping",
    window: "London open &amp; London–NY overlap",
    desc: "Tighter spreads and faster flow can support very short-term tactics, but costs and slippage matter.",
  },
  {
    style: "Intraday",
    window: "London or New York",
    desc: "Traders often focus on a single session window so positions can be managed within working hours.",
  },
  {
    style: "Swing",
    window: "Any session, multi-day holds",
    desc: "Session timing is less critical; entry quality and trend context usually matter more.",
  },
  {
    style: "News-based",
    window: "Around scheduled US/UK releases",
    desc: "Volatility can rise sharply. Spreads can widen and slippage can occur around the release.",
  },
];

const commonMistakes = [
  { title: "Treating one session as universally &ldquo;best&rdquo;", desc: "No session is automatically profitable. The best window depends on your strategy, currency pair and risk plan." },
  { title: "Ignoring daylight-saving shifts", desc: "Session times move when the US and Europe switch clocks. Re-check your schedule twice a year." },
  { title: "Assuming broker times match UTC exactly", desc: "Broker server time can be GMT, GMT+2 or GMT+3. Always confirm with your own platform." },
  { title: "Trading the Sydney session expecting London-style volatility", desc: "Sydney often has thinner liquidity. Expecting large directional moves can be unrealistic." },
  { title: "Holding size through major news", desc: "Spreads can widen and slippage can occur around high-impact releases." },
  { title: "Overtrading the overlap", desc: "Higher activity is not the same as a guaranteed edge. More setups does not mean more good setups." },
  { title: "Forgetting daily rollover (swap) impact", desc: "Holding positions across sessions can incur swap costs that affect longer-term results." },
  { title: "Ignoring personal schedule and alertness", desc: "Trading tired at 3 a.m. can lead to execution mistakes that no session can fix." },
];

const planningChecklist = [
  "Identify your primary currency pair(s)",
  "Confirm the session(s) where that pair is most active",
  "Convert session UTC times to your local time zone",
  "Check the current DST status (US and Europe)",
  "Confirm broker server time on your platform",
  "Review the economic calendar for high-impact releases",
  "Decide whether to trade through, around or outside news",
  "Define your session-specific risk limit",
  "Set a maximum number of positions per session",
  "Plan monitoring time and alerts",
  "Avoid trading when tired or distracted",
  "Re-evaluate the schedule at the next DST change",
];

const faqs = [
  {
    q: "What is the best time to trade forex?",
    a: "There is no universally best time. The most active windows are typically the London session, the New York session, and the London–New York overlap, because liquidity and volatility tend to be higher. The right time for you depends on your currency pair, strategy, local time zone, and personal schedule. Some pairs, such as AUD/USD and NZD/USD, may be more active during the Sydney session, while JPY crosses often move more during Tokyo hours.",
  },
  {
    q: "What are the four major forex trading sessions?",
    a: "The four major sessions are Sydney, Tokyo, London and New York. Each represents a regional financial center opening for business. Approximate UTC times (which shift with daylight saving) are Sydney 22:00–07:00, Tokyo 00:00–09:00, London 08:00–17:00, and New York 13:00–22:00. These ranges overlap during parts of the day.",
  },
  {
    q: "What is the London–New York overlap?",
    a: "The London–New York overlap is the window when both the London and New York sessions are open simultaneously, roughly 13:00–17:00 UTC. Two large liquidity pools combine, spreads can tighten, and volatility often increases. Many traders focus on this window for major pairs such as EUR/USD, GBP/USD and USD/JPY. It is not automatically profitable, but it typically offers more activity.",
  },
  {
    q: "What time is the forex market open in Pakistan (PKT)?",
    a: "Forex trades around the clock on weekdays, but the most active windows in PKT (UTC+5) are approximately Tokyo 05:00–14:00, London 13:00–22:00, New York 18:00–03:00 (next day), and the London–New York overlap 18:00–22:00. These times shift when the US and Europe switch to and from daylight saving time, so re-check them twice a year.",
  },
  {
    q: "Do forex session times change with daylight saving?",
    a: "Yes. When the United States and Europe move clocks forward or back, the UTC offset of their local exchanges changes, which shifts the open and close of the New York and London sessions relative to UTC. Sydney and Tokyo generally remain on more stable offsets. Always re-confirm session times when DST changes occur in March/April and October/November.",
  },
  {
    q: "Which currency pairs are most active during the Tokyo session?",
    a: "JPY crosses such as USD/JPY, EUR/JPY, AUD/JPY and GBP/JPY typically see the most activity during Tokyo hours. AUD and NZD pairs can also be active, especially when Australian or New Zealand data is released. Moves may be more range-bound compared with London unless regional news surprises the market.",
  },
  {
    q: "Is the Sydney session good for trading?",
    a: "The Sydney session can be suitable for traders focused on AUD and NZD pairs, but liquidity is often thinner than during London or New York. Moves can be more gradual and ranges tighter. It is not better or worse than other sessions; it depends on your strategy and the pairs you trade.",
  },
  {
    q: "Should I trade around major economic news?",
    a: "That depends on your strategy and risk tolerance. High-impact releases such as Nonfarm Payrolls, CPI or central-bank decisions can sharply increase volatility, widen spreads and cause slippage. Some traders avoid these windows; others specialize in them. If you are unsure, it can be safer to wait until spreads normalize.",
  },
  {
    q: "Do all brokers use the same session times?",
    a: "No. The underlying market opens and closes at consistent regional times, but broker server times can differ (commonly GMT, GMT+2 or GMT+3). Candle opens, daily swap charges and chart time stamps may therefore vary between platforms. Always check your broker&apos;s server time rather than assuming it matches UTC.",
  },
  {
    q: "Can trading a particular session guarantee profit?",
    a: "No. No session or time of day can guarantee profit. Sessions describe when liquidity and volatility are typically higher or lower, not when trades will succeed. Forex trading involves substantial risk, and outcomes depend on your analysis, risk management, execution and market conditions.",
  },
];

const continueLearning = [
  {
    href: "/best-time-to-trade-xauusd/",
    title: "Best Time to Trade XAUUSD",
    desc: "Session-by-session guidance specifically for gold (XAUUSD), including how London and New York hours can shape gold volatility.",
    icon: <TrendingUp className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/blog/xauusd-volatility-trading-sessions/",
    title: "XAUUSD Volatility by Session",
    desc: "A detailed look at why XAUUSD volatility changes across Asian, London and New York sessions, and how liquidity and US data shape price action.",
    icon: <Activity className="w-7 h-7 text-trading-green" />,
    accent: "from-trading-green/10 to-transparent",
  },
  {
    href: "/blog/forex-risk-management-for-beginners/",
    title: "Forex Risk Management",
    desc: "Learn how lot size, stop-loss distance, leverage, margin and total open exposure work together in a practical forex risk-management plan.",
    icon: <ShieldCheck className="w-7 h-7 text-trading-red" />,
    accent: "from-trading-red/10 to-transparent",
  },
  {
    href: "/forex-signals/",
    title: "Forex Signals",
    desc: "The ForexWizard Forex Signals hub — educational trade ideas, currency-pair analysis and market observations.",
    icon: <Newspaper className="w-7 h-7 text-trading-green" />,
    accent: "from-trading-green/10 to-transparent",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function BestTimeToTradeForexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingStructuredData),
        }}
      />

      <header className="relative z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold text-foreground tracking-tight no-underline hover:text-trading-green transition-colors flex items-center gap-2"
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
            <Link href="/forex-signals/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">
              Forex Signals
            </Link>
            <Link href="/gold-signals/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">
              Gold Signals
            </Link>
            <Link href="/xauusd-analysis/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">
              XAUUSD Analysis
            </Link>
            <Link href="/blog/" className="text-sm font-medium text-trading-gold hover:text-trading-gold/80 transition-colors no-underline">
              Blog
            </Link>
            <Link href="/about/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden lg:block">
              About
            </Link>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-trading-green hover:text-trading-green/80 transition-colors no-underline">
              Join on Telegram
            </a>
          </nav>
        </div>
      </header>

      <main className="min-h-screen bg-trading-dark text-foreground overflow-x-hidden">
        {/* HERO */}
        <section className="relative px-4 py-16 md:py-24 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-trading-green/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-trading-gold/5 rounded-full blur-[100px] pointer-events-none" />
          <CandlestickBackground />

          <HeroAnimation className="relative z-10 max-w-3xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground/80 mb-6 flex-wrap">
              <Link href="/" className="hover:text-trading-green transition-colors no-underline">Home</Link>
              <span className="text-muted-foreground/40">/</span>
              <Link href="/blog/" className="hover:text-trading-green transition-colors no-underline">Blog</Link>
              <span className="text-muted-foreground/40">/</span>
              <span className="text-foreground/80">Best Time to Trade Forex</span>
            </nav>

            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-gold">
                <Clock className="w-4 h-4" />
                Trading Sessions · Forex Education
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">Best Time to Trade Forex: Sessions, Overlaps &amp; Pairs</span>
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground/80 mb-8">
              Published {post.displayDate} &middot; By{" "}
              <Link href="/about/" className="text-foreground/80 hover:text-trading-green no-underline">
                {post.author.name}
              </Link>{" "}
              &middot; {post.readingTime}
            </p>

            <FadeIn delay={0.3} className="mb-8">
              <div className="glass-strong rounded-2xl overflow-hidden gradient-border">
                <picture>
                  <source type="image/webp" srcSet={HERO_WEBP_SRCSET} sizes={HERO_SIZES} />
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
              <p>The forex market is open 24 hours a day, five days a week.</p>
              <p>
                That does not mean every hour is the same. Liquidity, volatility
                and the currency pairs that move the most can change noticeably
                depending on which global financial center is open.
              </p>
              <p>
                This guide explains the four major forex trading sessions
                (Sydney, Tokyo, London and New York), how session overlaps work,
                which currency pairs tend to be active in each window, how to
                convert those hours to Pakistan Standard Time (PKT), and how
                daylight saving can shift the schedule twice a year.
              </p>
              <p>
                For gold-specific timing, see our dedicated guide on the{" "}
                <Link href="/best-time-to-trade-xauusd/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors font-medium">
                  best time to trade XAUUSD
                </Link>
                .
              </p>
              <p className="text-foreground/90 font-medium">
                No session is universally &ldquo;best&rdquo; or guaranteed to be
                profitable. The right window depends on your strategy, your
                currency pair and your personal schedule.
              </p>
            </div>
          </HeroAnimation>
        </section>

        {/* QUICK ANSWER */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Best Time to Trade Forex: </span>
                <span className="text-trading-gold text-glow-gold">Quick Answer</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                In practice, planning your forex trading day usually means:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-6">
                {[
                  "Learn the four major sessions: Sydney, Tokyo, London and New York.",
                  "Note approximate UTC times and remember they shift with daylight saving.",
                  "Focus on the session that matches your primary currency pair.",
                  "Pay attention to the London–New York overlap for major USD, EUR and GBP pairs.",
                  "Check the economic calendar for high-impact news before placing trades.",
                  "Convert UTC session times to your local time zone (for example PKT, UTC+5).",
                  "Confirm your broker server time, which may differ from UTC.",
                  "Pick a window that fits your strategy, alertness and risk plan.",
                ].map((item) => (
                  <li key={item} className="text-base md:text-lg text-muted-foreground">{item}</li>
                ))}
              </ol>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Higher activity does not mean guaranteed profit. Sessions describe
                when the market tends to be more or less active, not when trades
                will succeed.
              </p>
              <p className="text-base md:text-lg text-foreground/90 font-medium mt-3">
                Always apply your own risk management regardless of which session
                you trade.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* HOW THE 24-HOUR MARKET OPERATES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">How the 24-Hour Forex Market </span>
              <span className="text-trading-gold text-glow-gold">Operates</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Unlike most equity markets, forex has no single central exchange.
                Instead, it is an over-the-counter (OTC) network of banks,
                institutions, brokers and traders around the world. As one
                financial center closes, another opens, so prices continue to
                update nearly continuously from late Sunday to early Friday
                (UTC).
              </p>
              <p>
                The trading day is commonly divided into four sessions that
                correspond to major regional financial centers: Sydney, Tokyo,
                London and New York. Liquidity and volatility tend to rise when
                these centers are open and fall during quieter transitions.
              </p>
              <p>
                Session open and close times are commonly expressed in UTC
                (Coordinated Universal Time) as a neutral reference. Local times
                shift when regions move to or from daylight saving time (DST),
                which is why the UTC figures above are described as approximate.
              </p>
              <p>
                Broker server times can also differ. Some platforms use GMT,
                others GMT+2 or GMT+3, and chart candles and daily swap
                calculations can vary accordingly. Always confirm the exact
                server time on your own platform.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SESSION COMPARISON TABLE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Forex Session </span>
              <span className="text-trading-gold text-glow-gold">Comparison</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              The table below summarizes the four major sessions. UTC ranges are
              approximate and shift with daylight saving. Broker server times may
              differ.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base border-collapse">
                <thead>
                  <tr className="glass-strong">
                    <th className="text-left font-bold text-foreground p-4 border-b border-trading-gold/20">Session</th>
                    <th className="text-left font-bold text-foreground p-4 border-b border-trading-gold/20">Approximate UTC</th>
                    <th className="text-left font-bold text-foreground p-4 border-b border-trading-gold/20">Characteristic</th>
                    <th className="text-left font-bold text-foreground p-4 border-b border-trading-gold/20">Active Pairs</th>
                  </tr>
                </thead>
                <tbody>
                  {sessionRows.map((row) => (
                    <tr key={row.name} className="border-b border-border/40">
                      <td className="p-4 font-bold text-foreground align-top">{row.name}</td>
                      <td className="p-4 text-muted-foreground align-top font-mono text-xs md:text-sm">{row.utc}</td>
                      <td className="p-4 text-muted-foreground align-top">{row.characteristic}</td>
                      <td className="p-4 text-muted-foreground align-top">{row.activePairs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground/70 mt-4">
              Approximate ranges only. Actual open/close times vary by data source
              and shift when DST changes in the US and Europe.
            </p>
          </div>
        </FadeSection>

        {/* SYDNEY SESSION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">The Sydney </span>
              <span className="text-trading-gold text-glow-gold">Trading Session</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The Sydney session (approximately 22:00–07:00 UTC) is often
                considered the start of the global forex trading day. Liquidity
                is usually thinner here than in London or New York, and moves can
                be more gradual.
              </p>
              <p>
                The AUD and NZD crosses — such as AUD/USD, NZD/USD and AUD/NZD —
                typically see the most activity. Local economic data, including
                Reserve Bank of Australia or Reserve Bank of New Zealand
                announcements, can produce noticeable moves in these pairs.
              </p>
              <p>
                Because liquidity is lighter, spreads can be slightly wider than
                during London hours. Some traders use Sydney to position for the
                upcoming Tokyo and London opens; others prefer to wait for
                deeper liquidity.
              </p>
              <p className="text-foreground/90 font-medium">
                Sydney is not &ldquo;worse&rdquo; than other sessions. It is
                simply quieter, which can suit some strategies and not others.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* TOKYO SESSION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">The Tokyo </span>
              <span className="text-trading-gold text-glow-gold">Trading Session</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The Tokyo session (approximately 00:00–09:00 UTC) is the main
                Asian trading window. JPY crosses such as USD/JPY, EUR/JPY,
                AUD/JPY and GBP/JPY often see the most activity.
              </p>
              <p>
                Tokyo liquidity is typically deeper than Sydney, and the session
                overlaps briefly with the late Sydney window as well as the early
                London open toward its end. Asia-Pacific equity markets and
                regional data releases can influence sentiment.
              </p>
              <p>
                Moves during Tokyo can be more range-bound compared with London,
                although breakouts do occur — particularly around the Bank of
                Japan policy updates or key Japanese data.
              </p>
              <p>
                AUD and NZD pairs can also remain active here, especially when
                Australian or New Zealand data is released during these hours.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* LONDON SESSION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">The London </span>
              <span className="text-trading-gold text-glow-gold">Trading Session</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The London session (approximately 08:00–17:00 UTC) is generally
                the largest forex center by turnover. EUR, GBP and CHF crosses —
                including EUR/USD, GBP/USD, EUR/GBP and USD/CHF — typically
                dominate activity.
              </p>
              <p>
                London often sets the tone for the European trading day. The
                first hours can produce directional moves as European institutions
                come online, and trends that begin in London sometimes continue
                into the New York session.
              </p>
              <p>
                Key European data, including Eurozone inflation, UK CPI, and
                European Central Bank or Bank of England policy decisions, can
                drive volatility during these hours.
              </p>
              <p>
                Toward the end of London&apos;s morning, the New York session
                opens and the two sessions overlap (covered in the next sections).
              </p>
            </div>
          </div>
        </FadeSection>

        {/* NEW YORK SESSION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">The New York </span>
              <span className="text-trading-gold text-glow-gold">Trading Session</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The New York session (approximately 13:00–22:00 UTC) is the
                second leg of peak global liquidity. USD crosses — including
                EUR/USD, GBP/USD, USD/JPY, USD/CAD and USD/CHF — usually see the
                most activity.
              </p>
              <p>
                A large share of the world&apos;s most market-moving economic
                releases comes from the United States, including Nonfarm
                Payrolls (NFP), Consumer Price Index (CPI), retail sales, GDP and
                Federal Reserve announcements. These can sharply increase
                volatility, widen spreads and cause slippage.
              </p>
              <p>
                The first half of the New York session overlaps with the second
                half of London, which is often the most active window of the day.
                After London closes, liquidity can thin out and the afternoon US
                session may become quieter.
              </p>
              <p>
                USD/CAD can be especially active around Canadian economic data,
                which is often released during the same window.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* MAJOR SESSION OVERLAPS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Major Forex Session </span>
              <span className="text-trading-gold text-glow-gold">Overlaps</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Because sessions open and close at staggered times, two sessions
                can be active simultaneously. These overlap windows often have
                the deepest liquidity and can produce the most noticeable price
                action.
              </p>
              <p>The two most-watched overlaps are:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground">Tokyo–London overlap</strong>{" "}
                    (approximately 08:00–09:00 UTC): short and relatively quiet,
                    but can mark the handoff between Asian and European trading.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground">London–New York overlap</strong>{" "}
                    (approximately 13:00–17:00 UTC): typically the most active
                    window of the day, when European and US liquidity combine.
                  </span>
                </li>
              </ul>
              <p>
                Overlaps are not automatically profitable, but they often offer
                tighter spreads and more activity, which can suit short-term
                strategies.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* LONDON-NEW YORK OVERLAP */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">London–New York Overlap and </span>
                <span className="text-trading-gold text-glow-gold">Market Liquidity</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The London–New York overlap (approximately 13:00–17:00 UTC) is
                  often described as the most liquid forex window. Both the
                  European and US banking systems are active, and major pairs
                  such as EUR/USD, GBP/USD, USD/JPY and USD/CHF can see
                  noticeable movement.
                </p>
                <p>
                  Higher liquidity can mean tighter spreads, which can matter for
                  short-term traders. At the same time, higher activity can
                  increase volatility, especially around US economic releases
                  that land inside this window.
                </p>
                <p>
                  Traders who focus on this window often do so because more
                  participants are active, but the same conditions that create
                  opportunity can also create risk. Wider stop distances, slippage
                  around news, and rapid two-way price action are all possible.
                </p>
                <p>
                  If you trade gold as well as forex, the overlap is also a key
                  window for XAUUSD. See our dedicated guides on the{" "}
                  <Link href="/best-time-to-trade-xauusd/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors font-medium">
                    best time to trade XAUUSD
                  </Link>{" "}
                  and{" "}
                  <Link href="/blog/xauusd-volatility-trading-sessions/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors font-medium">
                    XAUUSD volatility by session
                  </Link>{" "}
                  for gold-specific detail.
                </p>
                <p className="text-foreground/90 font-medium">
                  The overlap is a high-activity window, not a guaranteed-profit
                  window.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* CURRENCY PAIRS BY SESSION TABLE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Currency Pairs Active During </span>
              <span className="text-trading-gold text-glow-gold">Different Sessions</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              Different sessions favor different currencies. The table below
              summarizes which pairs are commonly most active in each window.
              Activity is descriptive, not predictive.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base border-collapse">
                <thead>
                  <tr className="glass-strong">
                    <th className="text-left font-bold text-foreground p-4 border-b border-trading-gold/20">Session</th>
                    <th className="text-left font-bold text-foreground p-4 border-b border-trading-gold/20">Commonly Active Pairs</th>
                    <th className="text-left font-bold text-foreground p-4 border-b border-trading-gold/20">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {sessionPairsRows.map((row) => (
                    <tr key={row.session} className="border-b border-border/40">
                      <td className="p-4 font-bold text-foreground align-top">{row.session}</td>
                      <td className="p-4 text-muted-foreground align-top font-mono text-xs md:text-sm">{row.activePairs}</td>
                      <td className="p-4 text-muted-foreground align-top">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground/70 mt-4">
              Crosses shown are illustrative. Many pairs trade in every session;
              the table reflects which are typically most active.
            </p>
          </div>
        </FadeSection>

        {/* PKT TRADING HOURS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Forex Trading Hours in </span>
              <span className="text-trading-gold text-glow-gold">Pakistan (PKT)</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                Pakistan Standard Time (PKT) is UTC+5. To convert approximate UTC
                session times to PKT, add 5 hours. The table below shows the
                usual converted windows. These shift when the US and Europe
                observe daylight saving time.
              </p>
              <p>
                For many Pakistan-based traders, the most practical windows are
                the Tokyo afternoon, the London session (afternoon into evening),
                and especially the London–New York overlap in the evening.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base border-collapse">
                <thead>
                  <tr className="glass-strong">
                    <th className="text-left font-bold text-foreground p-4 border-b border-trading-gold/20">Session</th>
                    <th className="text-left font-bold text-foreground p-4 border-b border-trading-gold/20">Approximate UTC</th>
                    <th className="text-left font-bold text-foreground p-4 border-b border-trading-gold/20">Approximate PKT (UTC+5)</th>
                    <th className="text-left font-bold text-foreground p-4 border-b border-trading-gold/20">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {pktRows.map((row) => (
                    <tr key={row.session} className="border-b border-border/40">
                      <td className="p-4 font-bold text-foreground align-top">{row.session}</td>
                      <td className="p-4 text-muted-foreground align-top font-mono text-xs md:text-sm">{row.utc}</td>
                      <td className="p-4 text-trading-green align-top font-mono text-xs md:text-sm font-semibold">{row.pkt}</td>
                      <td className="p-4 text-muted-foreground align-top">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground/70 mt-4">
              Example conversion: London opens at approximately 08:00 UTC. PKT is
              UTC+5, so 08:00 UTC + 5 hours = 13:00 PKT. When the UK observes
              daylight saving (BST, UTC+1), London&apos;s local open is 08:00
              BST, which equals 07:00 UTC, or 12:00 PKT.
            </p>
          </div>
        </FadeSection>

        {/* DST ADJUSTMENTS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Daylight-Saving-Time </span>
              <span className="text-trading-gold text-glow-gold">Adjustments</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Forex session times are tied to the local business hours of major
                financial centers. When the United States and Europe switch
                between standard time and daylight saving time (DST), the UTC
                offset of those centers changes, which shifts the open and close
                of the London and New York sessions relative to UTC.
              </p>
              <p>
                In practice:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CalendarClock className="w-5 h-5 text-trading-gold shrink-0 mt-1" />
                  <span>
                    The US typically moves clocks forward in March and back in
                    November. New York shifts between EST (UTC−5) and EDT (UTC−4).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CalendarClock className="w-5 h-5 text-trading-gold shrink-0 mt-1" />
                  <span>
                    Europe typically moves clocks forward in late March and back
                    in late October. London shifts between GMT (UTC+0) and BST
                    (UTC+1).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CalendarClock className="w-5 h-5 text-trading-gold shrink-0 mt-1" />
                  <span>
                    Sydney also observes DST (Southern Hemisphere), so its offset
                    changes between roughly UTC+10 and UTC+11.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CalendarClock className="w-5 h-5 text-trading-gold shrink-0 mt-1" />
                  <span>
                    Tokyo does not observe DST, so Japan remains at UTC+9
                    year-round.
                  </span>
                </li>
              </ul>
              <p>
                Because the US and Europe do not always change clocks on the same
                date, there can be a few weeks each year when the gap between
                London and New York is temporarily different. Re-check your
                schedule twice a year, around March/April and October/November.
              </p>
              <p>
                Many brokers also switch their server time (commonly between
                GMT+2 and GMT+3) to align with US DST. This affects candle open
                times and daily swap calculation, so confirm your broker&apos;s
                schedule when DST changes occur.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ECONOMIC NEWS AND VOLATILITY */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Economic News and </span>
              <span className="text-trading-gold text-glow-gold">Volatility</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Session timing is only part of the picture. Scheduled economic
                releases can produce sudden bursts of volatility that override
                the typical character of a session.
              </p>
              <p>High-impact releases that often move FX markets include:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "US Nonfarm Payrolls (NFP)",
                  "US CPI and PCE inflation",
                  "FOMC statements and rate decisions",
                  "ECB and BoE policy decisions",
                  "US retail sales and GDP",
                  "Eurozone and UK CPI",
                  "BoJ policy updates",
                  "Central bank speeches",
                ].map((item) => (
                  <div key={item} className="glass rounded-xl px-4 py-2 text-sm md:text-base text-muted-foreground flex items-center gap-2">
                    <Newspaper className="w-4 h-4 text-trading-gold shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <p>
                Around these releases, spreads can widen, liquidity can thin
                temporarily, and slippage can occur. Stop-loss orders may be
                filled at prices some distance from the requested level.
              </p>
              <p>
                Some traders avoid holding size through major news. Others
                specialize in news trading. Either way, check the economic
                calendar before placing a trade so you know what is scheduled
                during your session.
              </p>
              <p>
                For a broader framework on protecting your account during
                volatile windows, see our beginner guide on{" "}
                <Link href="/blog/forex-risk-management-for-beginners/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors font-medium">
                  forex risk management
                </Link>
                .
              </p>
            </div>
          </div>
        </FadeSection>

        {/* HOW TRADING STYLE AFFECTS SESSION SELECTION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">How Trading Style Affects </span>
              <span className="text-trading-gold text-glow-gold">Session Selection</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                Different trading styles can favor different sessions. The right
                match depends on how long you hold trades, how much spread you
                can tolerate, and when you can actively monitor the market.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {sessionTradeStyles.map((item, i) => (
                <FadeIn key={item.style} delay={i * 0.05}>
                  <div className="glass-strong rounded-2xl p-5 gradient-border h-full flex flex-col gap-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-trading-gold/15 to-transparent flex items-center justify-center">
                      <Globe className="w-4 h-4 text-trading-gold" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">{item.style}</h3>
                    <p className="text-sm text-trading-gold font-medium" dangerouslySetInnerHTML={{ __html: item.window }} />
                    <p className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* COMMON MISTAKES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Common Mistakes When Choosing </span>
              <span className="text-trading-gold text-glow-gold">Trading Hours</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {commonMistakes.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.04}>
                  <div className="glass-strong rounded-2xl p-5 gradient-border h-full flex flex-col gap-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-trading-red/10 to-transparent flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-trading-red" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground" dangerouslySetInnerHTML={{ __html: item.title }} />
                    <p className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* PRACTICAL TRADING-SESSION PLANNING CHECKLIST */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-green/10 to-transparent flex items-center justify-center">
                  <Target className="w-7 h-7 text-trading-green" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">Practical Trading-Session </span>
                  <span className="text-trading-green text-glow-green">Planning Checklist</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {planningChecklist.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm md:text-base text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeSection>

        {/* CONTINUE LEARNING */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Continue </span>
              <span className="text-trading-gold text-glow-gold">Learning</span>
            </h2>
            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              <p>
                If you trade gold as well as currency pairs, our guide on the{" "}
                <Link href="/best-time-to-trade-xauusd/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors font-medium">
                  best time to trade XAUUSD
                </Link>{" "}
                covers session timing for gold specifically. For current
                educational trade ideas, visit our{" "}
                <Link href="/forex-signals/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors font-medium">
                  Forex Signals
                </Link>{" "}
                page.
              </p>
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

        {/* LIVE MARKET HOURS LINK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Check Live Forex Market Hours in Your Timezone
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                Want to see exactly which sessions are open right now? Use our
                free{" "}
                <Link
                  href="/tools/forex-market-hours/"
                  className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors font-medium"
                >
                  live Forex market hours clock
                </Link>{" "}
                with automatic timezone detection, session countdowns, and
                DST-aware conversions for Pakistan, UAE, Saudi Arabia and more.
              </p>
              <Link
                href="/tools/forex-market-hours/"
                className="inline-flex items-center gap-2 text-sm font-bold text-trading-green hover:text-trading-green/80 transition-colors no-underline"
              >
                Open Live Session Clock
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </FadeSection>

        {/* FAQ (visible, NO FAQPage schema) */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">Frequently Asked </span>
                <span className="text-trading-gold text-glow-gold">Questions</span>
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="glass-strong rounded-2xl gradient-border group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none select-none">
                    <h3 className="text-base font-bold text-foreground pr-4">{faq.q}</h3>
                    <ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" />
                  </summary>
                  <div className="px-6 pb-6 -mt-2">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* RISK DISCLAIMER + SOURCES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="glass rounded-2xl border border-trading-red/20 p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-trading-red mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Risk Disclaimer
              </h2>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>Forex and leveraged trading involve substantial risk and may not be suitable for everyone.</p>
                <p>This article is educational and informational only. It does not constitute financial advice, a recommendation to trade any particular pair, or a guarantee of any market outcome.</p>
                <p>Session times are approximate and shift with daylight saving. Broker server times, spreads, swap charges and execution policies vary between providers. Spreads can widen and slippage can occur, especially around economic news and session transitions.</p>
                <p>No session, overlap or time of day can guarantee profit. Always use your own analysis, confirm times on your own platform, and apply appropriate risk controls before placing any trade.</p>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-trading-gold" /> Sources &amp; Methodology
              </h2>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                  Platform behavior (market and pending orders, spreads, slippage,
                  swap timing) was checked against official{" "}
                  <a href="https://www.metatrader5.com/en/terminal/help/trading/performing_deals" target="_blank" rel="noopener noreferrer" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">
                    MetaTrader 5 documentation
                  </a>
                  .
                </p>
                <p>
                  General retail-forex risk considerations are consistent with
                  public{" "}
                  <a href="https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/CustomerAdvisory_MustKnowForex.html" target="_blank" rel="noopener noreferrer" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">
                    CFTC educational guidance
                  </a>{" "}
                  regarding leverage and the risks of OTC forex trading.
                </p>
                <p>
                  Session time ranges are commonly cited approximations expressed
                  in UTC and may differ by data source. Always confirm exact
                  open/close times and DST status with your broker or charting
                  platform.
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
                <span className="text-foreground">Follow ForexWizard on </span>
                <span className="text-trading-green text-glow-green">Telegram</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                Join the ForexWizard Telegram community for educational forex
                signals, market observations and trading-related education across
                major sessions.
              </p>
              <PulsingGlow className="inline-block rounded-xl">
                <TelegramCTA text="Join Forex Wizard Telegram" variant="primary" className="text-lg md:text-xl px-10 py-5" />
              </PulsingGlow>
              <p className="mt-6 text-xs text-muted-foreground/80">
                Free to join &middot; Trading involves risk &middot; Not financial advice
              </p>
            </div>
          </div>
        </FadeSection>

        <SiteFooter />
      </main>

      <StickyTelegramButton href={TELEGRAM_LINK} label="Join Forex Wizard on Telegram" />
    </>
  );
}
