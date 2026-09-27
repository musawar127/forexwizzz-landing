import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  AlertTriangle,
  Target,
  CheckCircle2,
  LineChart,
  Globe,
  Clock,
  Zap,
  Activity,
  Layers,
  Users,
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

const post = getBlogPost("xauusd-volatility-trading-sessions")!;

const CANONICAL = `https://forexwizard.online/blog/${post.slug}/`;
const IMAGE_URL = `https://forexwizard.online${post.image}`;
const IMAGE_BASE = post.image.replace(/\.jpg$/, "");
// Responsive WebP srcset for the in-page hero (LCP candidate).
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
    title: "Why XAUUSD Volatility Changes by Trading Session",
    description:
      "Learn why gold volatility changes during Asian, London and New York sessions and how liquidity, overlap and US data affect XAUUSD.",
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
    title: "Why XAUUSD Volatility Changes by Trading Session",
    description:
      "Learn why gold volatility changes during Asian, London and New York sessions and how liquidity, overlap and US data affect XAUUSD.",
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
const usefulQuestions = [
  "How quickly is price moving?",
  "How much distance is gold covering?",
  "Is liquidity supporting the movement?",
  "Is the market breaking established structure?",
  "Is the move occurring during a major session transition or economic event?",
];

const sessionsTable = [
  {
    session: "Asian",
    window: "00:00–08:00",
    characteristic: "Often more contained price development",
  },
  {
    session: "London",
    window: "07:00/08:00–16:00/17:00",
    characteristic: "European liquidity increases",
  },
  {
    session: "New York",
    window: "12:00/13:00–21:00/22:00",
    characteristic: "US data and futures participation become important",
  },
  {
    session: "London–New York overlap",
    window: "Roughly 12:00/13:00–16:00/17:00",
    characteristic: "Both major centres are active",
  },
];

const breakoutConfirmations = [
  "A decisive candle close beyond the level",
  "Follow-through after the initial break",
  "A successful retest",
  "A change in swing structure",
  "Continued momentum rather than immediate rejection",
];

const tradingPlanLayers = [
  "Higher-timeframe market structure",
  "Support and resistance zones",
  "Price-action confirmation",
  "Session context",
  "Economic-event awareness",
  "A predefined invalidation level",
  "Position sizing based on the amount at risk",
];

const faqs = [
  {
    q: "When is XAUUSD most volatile?",
    a: "XAUUSD volatility changes from day to day, so no session is guaranteed to be the most volatile. London, New York and especially periods when both markets are active can experience increased participation. Major economic or geopolitical events can also produce large moves outside normal patterns.",
  },
  {
    q: "Why does gold move when London opens?",
    a: "London is one of the world's most important gold-trading centres. As European banks, dealers, funds and other institutions become active, liquidity and order flow can increase. That can cause price to test or break structures established during earlier trading.",
  },
  {
    q: "Why does gold move so much during the New York session?",
    a: "The New York period combines US market participation, gold futures activity and major US economic information. Data affecting inflation, employment, interest-rate expectations or the US dollar can lead to rapid repricing in gold.",
  },
  {
    q: "What is the London–New York overlap in gold trading?",
    a: "It is the period when London and New York market hours overlap. Because participants from both financial centres are active at the same time, trading activity can be substantial. Exact UTC times vary with daylight-saving changes.",
  },
  {
    q: "Is the Asian session always quiet for XAUUSD?",
    a: "No. Asian hours can produce significant gold moves, especially when important developments occur in China, Japan or global geopolitical markets. The Asian session is often more contained on ordinary days, but that is a tendency rather than a rule.",
  },
  {
    q: "Should I use a larger lot size during a more active session?",
    a: "Higher activity is not a reason to increase lot size. Greater volatility can increase stop distance, slippage and monetary exposure. Position size should be based on the planned stop, instrument specifications and maximum acceptable loss.",
  },
  {
    q: "Does XAUUSD trade 24 hours a day?",
    a: "The global gold market operates across time zones and is available for much of the week. Exact retail XAUUSD hours depend on the broker. Different futures products also have their own schedules, so traders should verify the specifications of the instrument they actually trade.",
  },
];

const continueLearning = [
  {
    href: "/best-time-to-trade-xauusd/",
    title: "Best Time to Trade XAUUSD",
    desc: "The practical companion to this guide — when gold sessions typically offer the most actionable conditions for different trading styles.",
    icon: <Clock className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/xauusd-support-resistance/",
    title: "XAUUSD Support and Resistance",
    desc: "How to mark key gold levels, treat them as zones and combine them with market structure for clearer trade planning.",
    icon: <Layers className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/xauusd-trading-strategy/",
    title: "XAUUSD Trading Strategy",
    desc: "A structured framework for building and executing a complete XAUUSD trading plan around structure, levels and risk.",
    icon: <Target className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/xauusd-analysis/",
    title: "XAUUSD Analysis",
    desc: "The main hub for XAUUSD and gold market analysis, covering price action, key levels and market structure.",
    icon: <LineChart className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-trading-green/10",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function VolatilitySessionsPage() {
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
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-trading-green/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-trading-gold/5 rounded-full blur-[100px] pointer-events-none" />
          <CandlestickBackground />

          <HeroAnimation className="relative z-10 max-w-3xl mx-auto">
            {/* Breadcrumb: Home → Blog → Article */}
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
                Why XAUUSD Volatility Changes During London and New York Sessions
              </span>
            </nav>

            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-green">
                <Activity className="w-4 h-4" />
                Educational Guide · XAUUSD Trading Sessions
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">
                Why XAUUSD Volatility Changes During London and New York Sessions
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

            {/* Hero image (LCP candidate: responsive WebP + fetchPriority high) */}
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
                Gold trades across a global market, but{" "}
                <strong className="text-foreground/90">
                  XAUUSD volatility is not evenly distributed throughout the day
                </strong>
                .
              </p>
              <p>
                A chart may look slow and range-bound during one part of the
                trading day, then begin producing larger candles, faster
                breakouts and deeper retracements several hours later. The asset
                has not changed. What has changed is the market environment
                around it.
              </p>
              <p>
                Different financial centres become active at different times.
                Liquidity changes. Institutional participation increases or
                decreases. Major economic reports are released. London
                bullion-market activity overlaps with US futures trading.
                Traders in one region begin transferring risk to participants in
                another.
              </p>
              <p>
                Understanding these transitions can help traders interpret gold
                price action more accurately.
              </p>
              <p>
                The purpose of this guide is not to identify a guaranteed
                “best” session or predict what gold will do. Instead, it
                explains{" "}
                <strong className="text-foreground/90">
                  why gold volatility changes between the Asian, London and New
                  York trading sessions
                </strong>
                , and how traders can incorporate those differences into market
                analysis and risk management.
              </p>
            </div>
          </HeroAnimation>
        </section>

        {/* WHAT DOES VOLATILITY MEAN */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">What Does XAUUSD Volatility{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Mean?
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                Volatility describes the size and speed of price movements over a
                given period.
              </p>
              <p>
                When XAUUSD volatility is relatively low, gold may produce
                smaller candles, narrower ranges and fewer significant price
                expansions.
              </p>
              <p>
                When volatility increases, price may cover much greater
                distances within the same amount of time. Candles can become
                larger, breakouts may occur more quickly and retracements can
                become deeper.
              </p>
              <p>
                Volatility is not automatically bullish or bearish.
              </p>
              <p>
                A highly volatile market can move rapidly in either direction. It
                can also reverse sharply after initially moving one way.
              </p>
              <p>
                For traders, the important distinction is therefore not simply
                whether volatility is high or low.
              </p>
              <p>More useful questions include:</p>
            </div>
            <ul className="space-y-2 mb-6">
              {usefulQuestions.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-base md:text-lg text-muted-foreground"
                >
                  <CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              These questions provide more information than volatility alone.
            </p>
          </div>
        </FadeSection>

        {/* WHY VOLATILITY CHANGES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Why Gold Volatility Changes{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Throughout the Day
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                Gold is traded globally through several interconnected markets.
              </p>
              <p>
                The London over-the-counter bullion market is one of the most
                important centres of global gold trading, while US futures
                markets provide another major source of liquidity and price
                discovery.
              </p>
              <p>
                That activity does not enter the market at exactly the same
                intensity every minute of the day.
              </p>
              <p>
                As major financial centres open and close, different groups of
                banks, funds, dealers, companies and traders become active.
              </p>
              <p>Three factors are particularly important.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="glass-strong rounded-2xl p-5 gradient-border">
                <Activity className="w-6 h-6 text-trading-green mb-2" />
                <p className="text-base font-bold text-foreground mb-1">
                  Liquidity
                </p>
                <p className="text-sm text-muted-foreground">
                  changes as more buyers and sellers enter the market.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-5 gradient-border">
                <Globe className="w-6 h-6 text-trading-gold mb-2" />
                <p className="text-base font-bold text-foreground mb-1">
                  Information flow
                </p>
                <p className="text-sm text-muted-foreground">
                  changes as economic reports and policy announcements are
                  released.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-5 gradient-border">
                <Users className="w-6 h-6 text-trading-green mb-2" />
                <p className="text-base font-bold text-foreground mb-1">
                  Market participation
                </p>
                <p className="text-sm text-muted-foreground">
                  changes as Asian, European and North American institutions
                  become active.
                </p>
              </div>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              These transitions help explain why an XAUUSD chart can behave
              differently depending on the session.
            </p>
          </div>
        </FadeSection>

        {/* SESSIONS AT A GLANCE — TABLE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">XAUUSD Trading Sessions at a{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Glance
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              <p>
                There is no single centralized exchange that determines
                universal retail XAUUSD opening hours.
              </p>
              <p>
                Spot gold is traded through an international OTC market, while
                retail XAUUSD products are offered according to individual
                broker schedules.
              </p>
              <p>
                For practical chart analysis, traders commonly divide the day
                into three broad activity periods.
              </p>
            </div>

            {/* Responsive table — scrolls horizontally on very small screens,
                no page overflow */}
            <div className="glass-strong rounded-2xl gradient-border overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-trading-gold whitespace-nowrap">
                        Session
                      </th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-trading-gold whitespace-nowrap">
                        Approximate UTC Window
                      </th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-trading-gold">
                        Typical Market Characteristic
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessionsTable.map((row, i) => (
                      <tr
                        key={row.session}
                        className={
                          i < sessionsTable.length - 1
                            ? "border-b border-white/5"
                            : ""
                        }
                      >
                        <td className="px-4 py-4 text-sm md:text-base text-foreground font-semibold whitespace-nowrap align-top">
                          {row.session}
                        </td>
                        <td className="px-4 py-4 text-sm md:text-base text-muted-foreground whitespace-nowrap align-top">
                          {row.window}
                        </td>
                        <td className="px-4 py-4 text-sm md:text-base text-muted-foreground align-top">
                          {row.characteristic}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground/90">
                Times shift with daylight-saving changes. Traders should use
                current London and New York local times rather than assuming one
                UTC schedule applies all year.
              </strong>
            </p>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                These windows describe participation, not guaranteed volatility.
              </p>
              <p>A quiet New York session is possible.</p>
              <p>An unusually active Asian session is possible.</p>
              <p>
                Major geopolitical developments can move gold at any time.
              </p>
              <p>
                Session analysis provides context rather than certainty.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ASIAN SESSION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-gold/10 to-transparent flex items-center justify-center">
                  <Globe className="w-7 h-7 text-trading-gold" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">Asian Session: When Gold{" "}
                  </span>
                  <span className="text-trading-gold text-glow-gold">
                    Often Builds Context
                  </span>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The Asian trading period begins the global trading cycle.
                </p>
                <p>
                  Major markets including Tokyo, Hong Kong, Shanghai and
                  Singapore become active, and regional physical and financial
                  gold demand enters the market.
                </p>
                <p>
                  Gold can make significant moves during Asian hours,
                  particularly when important developments affect China, Japan,
                  global risk sentiment or geopolitics.
                </p>
                <p>
                  However, many trading days begin with a more contained
                  structure than the movement that later develops during London
                  or New York.
                </p>
                <p>
                  This can make the Asian session useful for identifying an{" "}
                  <strong className="text-foreground/90">
                    initial daily range
                  </strong>
                  .
                </p>
                <p>
                  Rather than assuming that the Asian high or low must hold,
                  traders can observe where buyers and sellers have already
                  reacted.
                </p>
                <p>
                  For example, imagine gold spends several hours moving between
                  two clearly defined areas. When London liquidity arrives,
                  several outcomes are possible.
                </p>
                <ul className="space-y-1 pl-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>Price may remain inside the range.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>
                      Price may briefly move beyond one side and return.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>
                      Or price may break the range and begin expanding into a
                      larger directional move.
                    </span>
                  </li>
                </ul>
                <p>
                  The range itself does not predict which outcome will occur. It
                  gives later price action a structure against which to be
                  measured. Learn more about marking these areas in our guide to{" "}
                  <Link
                    href="/xauusd-support-resistance/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    XAUUSD support and resistance
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* LONDON SESSION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Why the London Session{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Matters for XAUUSD
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                London occupies a unique position in the global gold market.
              </p>
              <p>
                The London OTC bullion market is one of the world&apos;s central
                markets for wholesale gold trading. When European institutions
                become active, market participation can increase substantially.
              </p>
              <p>
                That does not mean gold must immediately trend at the London
                open. Instead, London can introduce enough liquidity to test
                structures created during earlier hours.
              </p>
              <p>A narrow Asian range may begin expanding.</p>
              <p>An overnight support or resistance zone may be tested.</p>
              <p>A previous-day high or low may come back into focus.</p>
              <p>A breakout may gain participation.</p>
              <p>
                Alternatively, an early breakout may fail and move back into the
                previous range.
              </p>
              <p>
                This is why simply trading the first large London candle can be
                dangerous.
              </p>
              <p>
                The candle tells you volatility has increased. It does not
                automatically tell you whether the movement is sustainable.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* LBMA BENCHMARK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">The London Gold Benchmark{" "}
                </span>
                <span className="text-trading-gold text-glow-gold">
                  Adds Another Layer of Activity
                </span>
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  London also hosts the internationally recognised{" "}
                  <strong className="text-foreground/90">LBMA Gold Price</strong>{" "}
                  benchmark. The benchmark auctions begin twice each business
                  day at{" "}
                  <strong className="text-foreground/90">
                    10:30 a.m. and 3:00 p.m. London time
                  </strong>
                  .
                </p>
                <p>
                  These times should not be treated as automatic trading signals.
                  However, they demonstrate how deeply London is integrated into
                  global gold pricing and settlement. For traders analysing
                  intraday XAUUSD price action, this reinforces an important
                  principle:
                </p>
                <p>
                  London hours are not simply another arbitrary forex session.
                  They overlap with significant institutional gold-market
                  activity. You can read more about the London OTC gold market
                  and the LBMA Gold Price on the{" "}
                  <a
                    href="https://www.lbma.org.uk/market-standards/about-loco-london"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    LBMA Loco London
                  </a>{" "}
                  market-standards pages.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* NEW YORK SESSION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Why New York Can Change the{" "}
              </span>
              <span className="text-trading-green text-glow-green">
                Character of Gold Price Action
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The New York session introduces another major group of
                participants.
              </p>
              <p>
                US futures markets become active, the US dollar and Treasury
                markets are fully active, and important American economic
                reports are frequently released.
              </p>
              <p>
                This matters because XAUUSD is gold priced in{" "}
                <strong className="text-foreground/90">US dollars</strong>.
              </p>
              <p>
                Gold does not respond mechanically to every change in the dollar
                or interest-rate expectations, but US macroeconomic information
                can quickly change how market participants value both.
              </p>
              <p>
                As a result, a London trend can accelerate, stall or reverse
                once US participation becomes stronger.
              </p>
              <p>
                The important word is <strong className="text-foreground/90">can</strong>.
              </p>
              <p>
                A London bullish move is not automatically reversed by New York.
              </p>
              <p>
                A London bearish move is not automatically continued by New York.
              </p>
              <p>
                The New York session provides new information and new
                participation. Price then shows how the market responds.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* 8:30 AM ET */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-green/10 to-transparent flex items-center justify-center">
                  <Zap className="w-7 h-7 text-trading-green" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">
                    Why 8:30 a.m. ET Is Important on{" "}
                  </span>
                  <span className="text-trading-green text-glow-green">
                    Many US Data Days
                  </span>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Many closely followed US economic reports are scheduled for{" "}
                  <strong className="text-foreground/90">
                    8:30 a.m. Eastern Time
                  </strong>
                  . Examples include important inflation and employment releases.
                </p>
                <p>
                  These reports can quickly affect expectations around
                  inflation, employment, interest rates and the US dollar.
                  Because gold is sensitive to changes in the macroeconomic
                  environment, XAUUSD can experience rapid repricing around
                  major data releases.
                </p>
                <p>
                  This creates an important distinction between{" "}
                  <strong className="text-foreground/90">
                    session volatility
                  </strong>{" "}
                  and{" "}
                  <strong className="text-foreground/90">
                    event volatility
                  </strong>
                  .
                </p>
                <p>
                  A trader may correctly identify that New York is normally an
                  active session, but a major CPI or employment-report day can
                  produce a very different environment from an ordinary session.
                </p>
                <p>Candles may expand suddenly.</p>
                <p>Spreads may widen.</p>
                <p>Stops can experience slippage.</p>
                <p>
                  A breakout that would normally develop gradually can occur
                  within seconds.
                </p>
                <p>
                  For that reason, knowing the session is not enough. Traders
                  should also know what is on the economic calendar — the{" "}
                  <a
                    href="https://www.bls.gov/schedule/2026/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    US Bureau of Labor Statistics release schedule
                  </a>{" "}
                  is one useful reference.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* OVERLAP */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">
                Why the London–New York Overlap Can Be{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Especially Active
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The London–New York overlap occurs when European and North
                American participants are active simultaneously. This creates one
                of the most important liquidity transitions of the trading day.
              </p>
              <p>London bullion activity is still underway.</p>
              <p>US futures markets are active.</p>
              <p>American economic releases may be entering the market.</p>
              <p>
                European traders may be adjusting positions before the end of
                their day.
              </p>
              <p>
                North American traders may be establishing new positions.
              </p>
              <p>
                The result can be deeper liquidity but also stronger competition
                between buyers and sellers. This combination is one reason
                traders frequently observe larger XAUUSD moves during the
                overlap.
              </p>
              <p>
                But higher activity does not mean easier trading. Increased
                participation can produce cleaner continuation. It can also
                produce aggressive reversals.
              </p>
              <p>A London breakout may fail.</p>
              <p>A support zone may be swept before price reverses.</p>
              <p>A trend can accelerate after a US data release.</p>
              <p>
                Two-way price action can become faster and more difficult to
                manage.
              </p>
              <p>
                The overlap should therefore be viewed as a period of{" "}
                <strong className="text-foreground/90">
                  greater market participation
                </strong>
                , not a period of guaranteed opportunity.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* LIQUIDITY VS VOLATILITY */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">
                  Liquidity and Volatility Are Related — But They Are{" "}
                </span>
                <span className="text-trading-gold text-glow-gold">
                  Not the Same
                </span>
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Liquidity describes how easily transactions can occur without
                  causing excessive price disruption. Volatility describes the
                  degree of price movement.
                </p>
                <p>
                  A liquid market can still be highly volatile. Gold is an
                  excellent example. Gold is considered a highly liquid global
                  asset, yet it can still produce very large intraday moves.
                </p>
                <p>Why?</p>
                <p>
                  Because deep liquidity does not remove disagreement about
                  price. When important information enters the market, many
                  participants may simultaneously adjust their valuations and
                  positions. The market can therefore move rapidly even while
                  large trading volumes are being processed.
                </p>
                <p>For traders, this distinction matters.</p>
                <p className="text-foreground/90 font-medium">
                  High liquidity should never automatically be interpreted as
                  low risk. The World Gold Council&apos;s overview of{" "}
                  <a
                    href="https://www.gold.org/goldhub/research/relevance-of-gold-as-a-strategic-asset/key-attributes-liquidity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    gold&apos;s liquidity
                  </a>{" "}
                  and the broader{" "}
                  <a
                    href="https://www.gold.org/goldhub/research/market-primer/gold-market-primer-market-size-and-structure"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    gold market size and structure
                  </a>{" "}
                  explain this in more depth.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* SESSION TRANSITIONS & MARKET STRUCTURE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Session Transitions Can Change{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Market Structure
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                One of the most useful ways to analyse sessions is through{" "}
                <strong className="text-foreground/90">market structure</strong>.
              </p>
              <p>Instead of asking:</p>
            </div>
            <blockquote className="glass rounded-xl border-l-2 border-trading-red/50 px-6 py-4 my-6 italic text-foreground/90 text-base md:text-lg">
              “Will London go up?”
            </blockquote>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
              A trader can ask:
            </p>
            <blockquote className="glass rounded-xl border-l-2 border-trading-green/50 px-6 py-4 my-6 italic text-foreground/90 text-base md:text-lg">
              “What happened to the structure when London liquidity entered?”
            </blockquote>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                Suppose Asian trading produces a sequence of lower highs inside a
                range. During London, gold breaks above the most recent lower
                high and closes strongly above resistance.
              </p>
              <p>
                That structural change contains more information than the fact
                that the clock says London is open. Likewise, suppose London
                produces a bullish breakout but New York drives price back
                beneath the breakout level and forms a lower high.
              </p>
              <p>
                The session itself did not necessarily “cause” the reversal. The
                important information is the price response to the new
                participation.
              </p>
              <p>
                Reading how price behaves at these transitions is the core of{" "}
                <Link
                  href="/how-to-read-xauusd-price-action/"
                  className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                >
                  XAUUSD price action
                </Link>{" "}
                and fits naturally into a complete{" "}
                <Link
                  href="/xauusd-trading-strategy/"
                  className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors"
                >
                  XAUUSD trading strategy
                </Link>
                . Session timing works best when combined with price action
                rather than used as a standalone signal.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* S&R BEHAVE DIFFERENTLY */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">
                Support and Resistance Can Behave Differently During{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Active Sessions
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                A resistance zone that holds repeatedly in a quiet market may
                face very different order flow once liquidity increases.
                Likewise, support that survives several small tests may break
                when a major US report changes expectations.
              </p>
              <p>
                This does not make technical levels useless. It means levels
                should be interpreted in context.
              </p>
              <p>
                During quieter conditions, price may repeatedly react inside a
                relatively narrow range. During an active London or New York
                move, price may reach the same area with much stronger momentum.
              </p>
              <p>
                A trader should therefore consider both{" "}
                <strong className="text-foreground/90">where price is</strong>{" "}
                and{" "}
                <strong className="text-foreground/90">
                  how price is arriving there
                </strong>
                .
              </p>
              <p>
                A slow approach into resistance is not identical to a large
                impulsive candle closing near its high. A weak bounce from
                support is not identical to a strong rejection followed by a
                higher high. Session volatility provides context for those
                differences.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* BREAKOUTS NEED CONFIRMATION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Breakouts Need Confirmation{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Regardless of the Session
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                Because volatility often expands during major session
                transitions, breakouts can appear more frequently.
              </p>
              <p>But not every breakout becomes a trend.</p>
              <p>
                Gold may move above resistance, attract breakout buyers and then
                fall back beneath the level. It may break below support, trigger
                stops and then recover immediately.
              </p>
              <p>
                These movements are one reason confirmation matters. Rather than
                assuming every session breakout will continue, traders can look
                for evidence such as:
              </p>
            </div>
            <ul className="space-y-2 mb-6">
              {breakoutConfirmations.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-base md:text-lg text-muted-foreground"
                >
                  <CheckCircle2 className="w-5 h-5 text-trading-green shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The objective is not to eliminate false breakouts. They cannot
                be eliminated.
              </p>
              <p>
                The objective is to avoid treating every temporary move outside a
                range as confirmed direction.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* VOLATILITY & POSITION SIZE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-red/10 to-transparent flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7 text-trading-red" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">
                    Volatility Should Affect{" "}
                  </span>
                  <span className="text-trading-gold text-glow-gold">
                    Position Size
                  </span>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  A setup can look identical on a chart while carrying very
                  different monetary risk under different volatility conditions.
                </p>
                <p>
                  Suppose two XAUUSD trades use the same lot size. The first
                  trade requires a relatively small stop because market
                  structure is compact. The second requires a much wider stop
                  because gold is moving aggressively during New York.
                </p>
                <p>
                  If position size remains unchanged, the second trade can place
                  substantially more money at risk. Understanding{" "}
                  <Link
                    href="/xauusd-lot-size/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    XAUUSD lot size
                  </Link>{" "}
                  is essential for keeping that risk under control.
                </p>
                <p>
                  Position size should be connected to stop distance and maximum
                  acceptable loss rather than selected from habit.
                </p>
                <p>
                  Higher volatility does not automatically mean a trader should
                  use a wider stop. The invalidation level should come from the
                  setup.
                </p>
                <p>
                  But if that technically logical invalidation level is farther
                  away, position size may need to become smaller to keep
                  monetary risk under control.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* SPREADS & SLIPPAGE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Spreads and Slippage Can Also{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Change
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The chart price is only one part of execution. During major
                events or unusual market conditions, spreads can widen and
                orders may execute at prices different from the level expected.
              </p>
              <p>
                This is particularly important around economic releases. A
                stop-loss defines where the trader wants the exit process to
                begin. It cannot guarantee that every market condition will
                provide execution at exactly that price.
              </p>
              <p>
                That distinction becomes more important when price is moving
                quickly. Session analysis should therefore include execution
                conditions, not only candle size.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* DAYLIGHT SAVING */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-gold/10 to-transparent flex items-center justify-center">
                  <Clock className="w-7 h-7 text-trading-gold" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">Daylight Saving Time: A{" "}
                  </span>
                  <span className="text-trading-gold text-glow-gold">
                    Common Session-Timing Mistake
                  </span>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  One common error is using a fixed UTC session schedule
                  throughout the entire year. London and New York both observe
                  daylight-saving changes, but the United Kingdom and United
                  States do not always change clocks on the same dates.
                </p>
                <p>
                  That creates short periods when the UTC relationship between
                  the two markets temporarily shifts. The simplest solution is
                  to anchor session analysis to{" "}
                  <strong className="text-foreground/90">
                    local London and New York time
                  </strong>{" "}
                  and convert it for the date being traded.
                </p>
                <p>
                  Do not assume an old screenshot, indicator or session template
                  remains correct year-round. The same principle applies to
                  broker-server time. A trading platform may display UTC,
                  UTC+2, UTC+3 or another server timezone depending on the
                  broker and season. Always verify it.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* PRACTICAL FRAMEWORK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">A Practical Framework for{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Reading XAUUSD by Session
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                A trader does not need to predict what every session will do. A
                more disciplined approach is to let each session provide
                information.
              </p>
              <p>
                During Asian trading, observe the developing range, overnight
                highs and lows, and broader structure.
              </p>
              <p>
                As London becomes active, watch whether price respects that
                structure, breaks it or briefly moves beyond it before
                returning.
              </p>
              <p>Before New York, check the economic calendar.</p>
              <p>
                As North American participation increases, observe whether London
                direction receives confirmation or rejection.
              </p>
              <p>
                During the overlap, focus on the relationship between momentum
                and key levels.
              </p>
              <p>
                After major volatility, avoid assuming another setup must
                immediately appear. Sometimes the best information a session
                provides is that conditions are too unstable or unclear to
                justify a trade.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* COMPLETE TRADING PLAN */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">
                How XAUUSD Session Analysis Fits Into a{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Complete Trading Plan
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                Session timing is only one layer of analysis. A structured gold
                trading process can combine:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {tradingPlanLayers.map((item) => (
                <div
                  key={item}
                  className="glass rounded-xl px-4 py-3 text-sm md:text-base text-muted-foreground flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-trading-green shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The session answers{" "}
                <strong className="text-foreground/90">
                  when participants are becoming active
                </strong>
                .
              </p>
              <p>
                Market structure helps answer{" "}
                <strong className="text-foreground/90">
                  what price is doing
                </strong>
                .
              </p>
              <p>
                Risk management determines{" "}
                <strong className="text-foreground/90">
                  how much exposure is acceptable if the analysis is wrong
                </strong>
                .
              </p>
              <p>None of those elements replaces the others.</p>
            </div>
          </div>
        </FadeSection>

        {/* LONDON VS NY */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">
                  Is the London Session Better Than the New York Session for{" "}
                </span>
                <span className="text-trading-gold text-glow-gold">
                  Gold?
                </span>
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>There is no universal answer.</p>
                <p>
                  London and New York provide different forms of information.
                  London can reveal how European liquidity responds to structure
                  created earlier in the day. New York can introduce major US
                  economic information, dollar flows and futures participation.
                </p>
                <p>
                  Some trading strategies may naturally generate more setups
                  during London. Others may focus on US data or the London–New
                  York overlap.
                </p>
                <p>
                  The important objective is not to declare one session the
                  winner. It is to understand how a specific setup behaves under
                  different market conditions and evaluate it using actual
                  trading records. For a session-by-session practical view,
                  read our dedicated{" "}
                  <Link
                    href="/best-time-to-trade-xauusd/"
                    className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors"
                  >
                    Best Time to Trade XAUUSD
                  </Link>{" "}
                  guide.
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

        {/* FINAL THOUGHTS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Final </span>
              <span className="text-trading-gold text-glow-gold">
                Thoughts
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                XAUUSD does not become a different market when London or New York
                opens. What changes is the{" "}
                <strong className="text-foreground/90">
                  environment surrounding the same gold market
                </strong>
                .
              </p>
              <p>Liquidity changes.</p>
              <p>Participants change.</p>
              <p>Information enters the market.</p>
              <p>Economic releases alter expectations.</p>
              <p>
                Existing support and resistance levels are tested by new order
                flow. That is why gold volatility can expand or contract as the
                trading day progresses.
              </p>
              <p>
                The most useful way to apply session analysis is not to assume
                London will trend or New York will reverse. Instead, use the
                sessions as context.
              </p>
              <p>
                Observe what structure existed before new participants arrived.
              </p>
              <p>Watch how price responds when liquidity increases.</p>
              <p>Pay attention to economic events.</p>
              <p>Require confirmation around important levels.</p>
              <p>
                And adjust risk to the volatility that is actually present rather
                than the volatility you expected.
              </p>
              <p>
                Trading sessions can help explain{" "}
                <strong className="text-foreground/90">
                  when market conditions are changing
                </strong>
                . Price action still has to show{" "}
                <strong className="text-foreground/90">
                  what the market is doing
                </strong>
                .
              </p>
            </div>
          </div>
        </FadeSection>

        {/* RISK DISCLAIMER */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl border border-trading-red/20 p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-trading-red mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Risk Disclaimer
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Gold, forex, CFDs and other leveraged financial products involve
                significant risk of loss and may not be suitable for all
                traders. Market conditions, spreads and execution can change
                rapidly. This article is for educational and informational
                purposes only and does not constitute financial advice or a
                recommendation to buy or sell any financial instrument.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* TELEGRAM CTA */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-green/5 via-transparent to-trading-gold/5 rounded-3xl blur-sm" />
            <div className="relative glass-strong rounded-3xl p-8 md:p-14 text-center gradient-border">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                <span className="text-foreground">Follow XAU/USD on </span>
                <span className="text-trading-green text-glow-green">
                  Telegram
                </span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                Join the Forex Wizard Telegram community for educational XAU/USD
                market structure, session observations and trading-related
                education.
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

        {/* CONTINUE LEARNING (related articles) */}
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
                Explore related ForexWizard guides to deepen your understanding
                of XAUUSD sessions, levels and strategy.
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
