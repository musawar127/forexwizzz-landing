import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  AlertTriangle,
  Target,
  CheckCircle2,
  BookOpen,
  Newspaper,
  LineChart,
  Layers,
  Crosshair,
  Clock,
  Globe,
  Zap,
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

const post = getBlogPost("xauusd-support-and-resistance")!;

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
const supportBehaviors = [
  "Produce a strong bounce",
  "Produce only a small reaction",
  "Hold several times before eventually breaking",
  "Be briefly swept before price recovers",
  "Fail completely when selling pressure becomes stronger",
];

const resistanceBehaviors = [
  "Reject price sharply",
  "Cause consolidation",
  "Be tested multiple times",
  "Break and later become support",
  "Produce a false breakout before price reverses",
];

const sRContents = [
  "Pending orders",
  "Stop losses",
  "Profit-taking orders",
  "Breakout orders",
  "Institutional interest",
  "Previous liquidity",
];

const higherTimeframes = ["Weekly chart", "Daily chart", "Four-hour chart"];

const htfLookFor = [
  "Reversed strongly",
  "Consolidated before a large move",
  "Rejected multiple times",
  "Broke through a major range",
  "Created an important swing high or low",
];

const psychologicalEndings = ["00", "50"];

const confluenceFactors = [
  "Previous support",
  "Previous resistance",
  "A major swing high",
  "A major swing low",
  "A breakout area",
  "A higher-timeframe structure",
];

const validBreakout = [
  "A strong close beyond the zone",
  "Follow-through after the break",
  "Price remaining outside the previous range",
  "A successful retest",
  "New market structure forming in the breakout direction",
];

const marketStructureTypes = [
  "Higher highs",
  "Higher lows",
  "Lower highs",
  "Lower lows",
  "Range structure",
];

const dailyChartUses = [
  "Major trend",
  "Important swing highs",
  "Important swing lows",
  "Major support",
  "Major resistance",
];

const fourHourChartUses = [
  "Market structure",
  "Current trading range",
  "More precise zones",
  "Breakout levels",
];

const lowerTimeframeUses = [
  "Rejection",
  "Breakout confirmation",
  "Higher lows",
  "Lower highs",
  "Retests",
  "Intraday structure changes",
];

const simpleChartContents = [
  "Major daily support",
  "Major daily resistance",
  "Previous day high",
  "Previous day low",
  "Previous week high",
  "Previous week low",
  "One or two important intraday areas",
];

const londonBehaviors = [
  "Breaks the Asian range",
  "Rejects an overnight high or low",
  "Retests a daily zone",
  "Creates a new intraday structure",
];

const confirmationTypes = [
  "Rejection",
  "Breakout",
  "Retest",
  "Change in market structure",
  "Higher low",
  "Lower high",
  "Momentum shift",
];

const stopFactors = [
  "Market volatility",
  "Timeframe",
  "Position size",
  "Entry type",
  "Individual risk tolerance",
];

const commonMistakes = [
  {
    title: "Treating Levels as Exact Prices",
    desc: "Support and resistance usually work better as zones.",
  },
  {
    title: "Entering Without Confirmation",
    desc: "A touch does not guarantee a reversal.",
  },
  {
    title: "Marking Too Many Levels",
    desc: "Too many lines make the chart difficult to interpret.",
  },
  {
    title: "Ignoring the Higher Timeframe",
    desc: "A small intraday level may be less important than major daily structure.",
  },
  {
    title: "Ignoring News",
    desc: "Major US releases can quickly invalidate short-term technical setups.",
  },
  {
    title: "Moving Levels to Fit a Trade",
    desc: "Do not redraw support or resistance simply because you want your trade idea to remain valid.",
  },
];

const checklistItems = [
  "Is this level visible on a higher timeframe?",
  "Has price reacted here before?",
  "Is it better treated as a zone?",
  "Is the current structure bullish, bearish or ranging?",
  "Is price near a major swing high or low?",
  "Is the level close to the previous day high or low?",
  "Is the level close to the previous week high or low?",
  "Is major economic news approaching?",
  "Has price confirmed the reaction?",
  "Am I entering directly into another major level?",
  "Where is the setup invalid?",
  "Is my risk controlled?",
];

const faqs = [
  {
    q: "What is support and resistance in XAUUSD?",
    a: "Support is an area where buying pressure has previously slowed or reversed a decline, while resistance is an area where selling pressure has previously slowed or reversed an advance. They should generally be treated as zones rather than guaranteed reversal prices.",
  },
  {
    q: "What timeframe is best for XAUUSD support and resistance?",
    a: "Higher timeframes such as the daily and four-hour charts are useful for identifying major support and resistance. Lower timeframes can then be used to observe price reactions and refine entries after gold reaches an important area.",
  },
  {
    q: "Should support and resistance be drawn as lines or zones?",
    a: "Zones are often more practical because markets rarely reverse at one exact price. A focused zone can account for small differences in highs, lows and liquidity while still preserving the importance of the area.",
  },
  {
    q: "Does support always make gold go higher?",
    a: "No. Support can fail. Traders should observe how price reacts around support rather than assuming that a touch guarantees a bullish move.",
  },
  {
    q: "Can old resistance become support?",
    a: "Yes. After a confirmed breakout, previous resistance can sometimes become support when price returns to retest the area. The reverse can also happen when broken support becomes resistance.",
  },
  {
    q: "How many support and resistance levels should I mark?",
    a: "There is no fixed number. The goal is to mark only the levels that provide useful context. Major higher-timeframe levels, previous highs and lows and one or two relevant intraday zones are often more useful than filling the chart with many lines.",
  },
];

const continueLearning = [
  {
    href: "/blog/xauusd-weekly-outlook-september-14-18-2026/",
    title: "XAUUSD Weekly Outlook: Sep 14–18",
    desc: "A practical example of how these support and resistance concepts apply to the current trading week, with key gold levels and bullish/bearish scenarios.",
    icon: <Newspaper className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/gold-signals/",
    title: "Gold Signals",
    desc: "Educational gold signals and XAUUSD market analysis covering price action, key levels, trading sessions and risk management.",
    icon: <Newspaper className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/xauusd-analysis/",
    title: "XAUUSD Analysis",
    desc: "The main hub for XAUUSD and gold market analysis, covering price action, key levels and market structure.",
    icon: <LineChart className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/about/",
    title: "About Forex Wizard",
    desc: "Learn about the Forex Wizard community, our educational approach to the markets and what to expect.",
    icon: <BookOpen className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-trading-green/10",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function SupportResistancePage() {
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
            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-gold">
                <Layers className="w-4 h-4" />
                Educational Guide · XAUUSD Technical Analysis
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">
                XAUUSD Support and Resistance: How to Mark Key Gold Levels
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
                Support and resistance are among the most widely used concepts
                in XAU/USD technical analysis.
              </p>
              <p>
                Yet one of the most common mistakes among newer traders is
                treating support and resistance as exact prices where gold must
                automatically reverse.
              </p>
              <p>Markets rarely behave that perfectly.</p>
              <p>
                A more useful way to approach support and resistance is to think
                in terms of{" "}
                <strong className="text-foreground/90">
                  areas where buyers and sellers have previously shown strong
                  interest
                </strong>
                .
              </p>
              <p>
                These areas can help traders understand where price may react,
                where a breakout may become important and where a trading idea
                may become invalid.
              </p>
              <p>
                For gold traders, this is especially useful because XAU/USD can
                move quickly during the London and New York sessions and around
                major US economic releases.
              </p>
              <p>
                This guide explains how to mark XAUUSD support and resistance
                clearly, how to avoid overcrowding the chart and how to combine
                key levels with market structure.
              </p>
              <p className="text-foreground/90 font-medium">
                This content is educational only and does not represent
                financial advice or a recommendation to buy or sell gold.
              </p>
            </div>
          </HeroAnimation>
        </section>

        {/* WHAT IS SUPPORT */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-green/10 to-transparent flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-trading-green" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                <span className="text-foreground">What Is </span>
                <span className="text-trading-green text-glow-green">
                  Support in XAUUSD?
                </span>
              </h2>
            </div>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                Support is an area where buying pressure has previously been
                strong enough to slow or reverse a decline.
              </p>
              <p>
                Imagine gold falling toward an area where buyers previously
                entered aggressively.
              </p>
              <p>
                If price returns to that area, traders may watch whether buyers
                respond again.
              </p>
              <p>However, support does not mean price must rise.</p>
              <p>A support area can:</p>
            </div>
            <ul className="space-y-2 mb-6">
              {supportBehaviors.map((item) => (
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
                The reaction around support is more important than the label
                itself.
              </p>
              <p>Instead of thinking:</p>
            </div>
            <blockquote className="glass rounded-xl border-l-2 border-trading-red/50 px-6 py-4 my-6 italic text-foreground/90 text-base md:text-lg">
              “Gold reached support, so I should buy.”
            </blockquote>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
              A more structured approach is:
            </p>
            <blockquote className="glass rounded-xl border-l-2 border-trading-green/50 px-6 py-4 my-6 italic text-foreground/90 text-base md:text-lg">
              “Gold reached an important support area. Now I want to see how
              price behaves.”
            </blockquote>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              That small difference can improve decision-making considerably.
            </p>
          </div>
        </FadeSection>

        {/* WHAT IS RESISTANCE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-red/10 to-transparent flex items-center justify-center">
                <TrendingDown className="w-7 h-7 text-trading-red" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                <span className="text-foreground">What Is </span>
                <span className="text-trading-gold text-glow-gold">
                  Resistance in XAUUSD?
                </span>
              </h2>
            </div>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                Resistance is an area where selling pressure has previously been
                strong enough to slow or reverse an advance.
              </p>
              <p>
                When gold approaches a previous swing high or major rejection
                zone, traders may watch for signs that sellers are defending the
                area.
              </p>
              <p>Resistance can:</p>
            </div>
            <ul className="space-y-2 mb-6">
              {resistanceBehaviors.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-base md:text-lg text-muted-foreground"
                >
                  <AlertTriangle className="w-5 h-5 text-trading-gold shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Just like support, resistance should not be treated as a
                guaranteed reversal point.
              </p>
              <p>
                Price action around the level provides the confirmation.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* WHY S&R MATTER */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">
                Why Support and Resistance Matter in{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Gold Trading
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                XAU/USD often reacts strongly around obvious technical areas
                because many market participants are watching similar price
                structures.
              </p>
              <p>These areas may contain:</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {sRContents.map((item) => (
                <div
                  key={item}
                  className="glass rounded-xl px-4 py-3 text-sm md:text-base text-muted-foreground flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-trading-gold shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                This can create increased activity when price reaches an
                important zone.
              </p>
              <p>
                Support and resistance can therefore help traders answer several
                practical questions.
              </p>
              <p>For example:</p>
            </div>
            <ul className="space-y-2 mb-6">
              {[
                "Where might price react?",
                "Where could a breakout matter?",
                "Where is the current trading range?",
                "Where does the market structure change?",
                "Where would my trading idea become invalid?",
                "Where should I avoid entering directly into an opposing level?",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-base md:text-lg text-muted-foreground"
                >
                  <Crosshair className="w-5 h-5 text-trading-green shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Support and resistance are most useful when they provide context
              rather than a complete trading system by themselves.
            </p>
          </div>
        </FadeSection>

        {/* HIGHER TIMEFRAMES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Start With the </span>
              <span className="text-trading-gold text-glow-gold">
                Higher Timeframes
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                One of the easiest ways to overcrowd a chart is to begin marking
                every small reaction on a one-minute or five-minute chart.
              </p>
              <p>Instead, start with the larger picture.</p>
              <p>For XAUUSD, traders may begin with:</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {higherTimeframes.map((tf) => (
                <div
                  key={tf}
                  className="glass-strong rounded-2xl p-5 gradient-border text-center"
                >
                  <Clock className="w-6 h-6 text-trading-gold mx-auto mb-2" />
                  <p className="text-base font-bold text-foreground">{tf}</p>
                </div>
              ))}
            </div>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                Higher-timeframe zones generally represent more significant
                market structure than very small intraday fluctuations.
              </p>
              <p>Begin by looking for obvious areas where gold:</p>
            </div>
            <ul className="space-y-2 mb-6">
              {htfLookFor.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-base md:text-lg text-muted-foreground"
                >
                  <CheckCircle2 className="w-5 h-5 text-trading-green shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Mark only the areas that are clearly visible. If you have to zoom
              in heavily to convince yourself that a level exists, it may not be
              important enough to place on the higher-timeframe chart.
            </p>
          </div>
        </FadeSection>

        {/* MARK ZONES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Mark Zones Instead of </span>
                <span className="text-trading-gold text-glow-gold">
                  Exact Lines
                </span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Support and resistance are usually better treated as{" "}
                  <strong className="text-foreground/90">zones</strong>, not
                  perfect single-price lines.
                </p>
                <p>
                  Gold can briefly trade through a level before reversing.
                </p>
                <p>
                  Different brokers and liquidity providers can also show
                  slightly different highs and lows.
                </p>
                <p>
                  For example, instead of marking support at one exact price,
                  consider identifying the broader area where several reactions
                  occurred.
                </p>
                <p>The same applies to resistance.</p>
                <p>
                  This helps prevent traders from assuming that a level has
                  failed simply because price moved slightly beyond one
                  horizontal line.
                </p>
                <p>A zone gives the market room to react.</p>
                <p>
                  However, zones should not become so wide that they lose
                  meaning.
                </p>
                <p>
                  Keep them focused around the actual area where price
                  repeatedly showed interest.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* SWING HIGHS AND LOWS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Use Swing Highs and </span>
              <span className="text-trading-gold text-glow-gold">
                Swing Lows
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                Swing highs and swing lows are some of the clearest places to
                begin identifying important XAUUSD levels.
              </p>
              <p>
                A swing high forms where price moves upward, reaches a local
                peak and then moves lower.
              </p>
              <p>
                A swing low forms where price declines, reaches a local bottom
                and then moves higher.
              </p>
              <p>
                Major swing points often matter because they show where the
                balance between buyers and sellers changed.
              </p>
              <p>Ask:</p>
            </div>
            <ul className="space-y-2 mb-6">
              {[
                "Did price reverse strongly from this level?",
                "Was this the start of a large move?",
                "Has the market reacted here more than once?",
                "Is this swing point visible on the daily or four-hour chart?",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-base md:text-lg text-muted-foreground"
                >
                  <Crosshair className="w-5 h-5 text-trading-gold shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              The more obvious a level is, the more likely other market
              participants are also aware of it.
            </p>
          </div>
        </FadeSection>

        {/* PREV DAY HIGH/LOW + PREV WEEK HIGH/LOW */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-trading-gold" />
                  <h3 className="text-lg md:text-xl font-bold text-foreground">
                    Previous Day High and Low
                  </h3>
                </div>
                <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                  <p>
                    For intraday gold trading, the previous day&apos;s high and
                    low can provide useful reference points.
                  </p>
                  <p>These levels may act as areas of:</p>
                  <ul className="space-y-1">
                    {[
                      "Liquidity",
                      "Breakout interest",
                      "Rejection",
                      "Stop placement",
                      "Short-term support or resistance",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p>
                    Price does not have to reverse from the previous day&apos;s
                    high or low.
                  </p>
                  <p>
                    Sometimes the market breaks directly through them. What
                    matters is how price responds.
                  </p>
                  <p>
                    For example, gold may briefly move above the previous
                    day&apos;s high, fail to remain there and then return below
                    it. That can provide very different information from a clean
                    breakout that holds above the level.
                  </p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-trading-green" />
                  <h3 className="text-lg md:text-xl font-bold text-foreground">
                    Previous Week High and Low
                  </h3>
                </div>
                <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                  <p>
                    The previous week&apos;s high and low are also important
                    reference areas.
                  </p>
                  <p>
                    Weekly levels can remain relevant even when intraday
                    structure changes several times.
                  </p>
                  <p>
                    They can help traders understand where the current
                    week&apos;s price sits in relation to the broader market.
                  </p>
                  <p>For example:</p>
                  <p>
                    If gold is trading near the previous week&apos;s high,
                    traders may watch whether buyers can break through or whether
                    sellers begin defending the area.
                  </p>
                  <p>
                    If price is trading near the previous week&apos;s low, the
                    focus may shift toward whether support holds or whether the
                    broader bearish structure continues.
                  </p>
                  <p>
                    These levels are especially useful when combined with daily
                    and four-hour market structure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* PSYCHOLOGICAL LEVELS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Psychological </span>
              <span className="text-trading-gold text-glow-gold">
                Price Levels
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                Gold traders also pay attention to major round numbers.
              </p>
              <p>These are sometimes called psychological levels.</p>
              <p>Examples may include prices ending in:</p>
            </div>
            <div className="flex gap-4 mb-6">
              {psychologicalEndings.map((ending) => (
                <div
                  key={ending}
                  className="glass-strong rounded-xl px-6 py-4 gradient-border"
                >
                  <span className="text-2xl font-extrabold text-trading-gold">
                    ...{ending}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                Round numbers are easy for market participants to identify and
                may attract orders.
              </p>
              <p>
                However, a round number is not automatically important just
                because it looks clean.
              </p>
              <p>It becomes more useful when it also lines up with:</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {confluenceFactors.map((item) => (
                <div
                  key={item}
                  className="glass rounded-xl px-4 py-3 text-sm md:text-base text-muted-foreground flex items-center gap-2"
                >
                  <Target className="w-4 h-4 text-trading-gold shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Confluence makes a level more meaningful.
            </p>
          </div>
        </FadeSection>

        {/* SUPPORT CAN BECOME RESISTANCE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Support Can Become </span>
                <span className="text-trading-gold text-glow-gold">
                  Resistance
                </span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  One of the most important concepts in technical analysis is
                  role reversal.
                </p>
                <p>
                  A support area can become resistance after it breaks.
                </p>
                <p>
                  Imagine gold has repeatedly bounced from a support zone.
                </p>
                <p>
                  Eventually sellers push price clearly below that area.
                </p>
                <p>
                  If price later returns upward toward the broken support, the
                  same region may now attract sellers.
                </p>
                <p>
                  The market may treat the old support as new resistance.
                </p>
                <p>
                  This is sometimes called a{" "}
                  <strong className="text-foreground/90">
                    break-and-retest
                  </strong>{" "}
                  structure.
                </p>
                <p>The reverse can also happen.</p>
                <p>
                  Resistance can become support after a successful breakout.
                </p>
                <p>
                  This is why traders should not think of levels as permanently
                  bullish or bearish.
                </p>
                <p>
                  Their role can change with market structure.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* VALID BREAKOUT */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">How to Identify a Valid </span>
              <span className="text-trading-green text-glow-green">
                Breakout
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                Not every move through support or resistance is a real breakout.
              </p>
              <p>
                Gold can move quickly beyond a level and then immediately
                reverse.
              </p>
              <p>
                These false breakouts are common during volatile sessions.
              </p>
              <p>A more convincing breakout may include:</p>
            </div>
            <ul className="space-y-2 mb-6">
              {validBreakout.map((item) => (
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
                For example, if gold breaks above resistance but immediately
                falls back below it, the breakout has not shown much acceptance.
              </p>
              <p>
                If price breaks above resistance, holds above it and later forms
                a higher low, the structure may be stronger.
              </p>
              <p>
                Confirmation matters more than simply seeing price trade a few
                points beyond a line.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* FALSE BREAKOUTS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-red/10 to-transparent flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-trading-red" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">Why False Breakouts{" "}
                  </span>
                  <span className="text-trading-gold text-glow-gold">
                    Happen
                  </span>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>False breakouts can occur for many reasons.</p>
                <p>One important factor is liquidity.</p>
                <p>
                  Obvious highs and lows may contain stop orders and breakout
                  orders.
                </p>
                <p>
                  Price can briefly move beyond these levels, trigger orders and
                  then reverse.
                </p>
                <p>This does not mean every breakout is manipulation.</p>
                <p>
                  It simply reflects how financial markets interact with
                  liquidity.
                </p>
                <p>
                  For traders, the practical lesson is straightforward:
                </p>
                <p className="text-foreground/90 font-medium">
                  Do not assume every breakout will continue. Wait for evidence.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* COMBINE WITH MARKET STRUCTURE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">
                Combine Support and Resistance With{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Market Structure
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                Support and resistance become much more useful when combined
                with market structure.
              </p>
              <p>Ask whether gold is currently producing:</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {marketStructureTypes.map((item) => (
                <div
                  key={item}
                  className="glass-strong rounded-xl px-4 py-3 text-sm md:text-base text-muted-foreground flex items-center gap-2"
                >
                  <LineChart className="w-4 h-4 text-trading-gold shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Suppose gold is in a clear bullish structure.
              </p>
              <p>
                A support area that also forms around a higher low may become
                more interesting than random support in the middle of a range.
              </p>
              <p>
                Likewise, in a bearish structure, resistance near a lower high
                may provide stronger context than resistance alone.
              </p>
              <p>
                This is why market structure should come before entry decisions.
              </p>
              <p>
                The level tells you{" "}
                <strong className="text-foreground/90">where</strong> to pay
                attention. Structure helps explain{" "}
                <strong className="text-foreground/90">why</strong> the area may
                matter.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* MULTIPLE TIMEFRAMES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Use Multiple </span>
              <span className="text-trading-gold text-glow-gold">
                Timeframes
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              A practical XAUUSD analysis process can use several timeframes.
            </p>

            <div className="space-y-6">
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-gold mb-4">
                  Daily Chart
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
                  Use the daily chart to identify:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dailyChartUses.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-base text-muted-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-green mb-4">
                  Four-Hour Chart
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
                  Use the four-hour chart to refine:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {fourHourChartUses.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-base text-muted-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">
                  One-Hour or Lower Timeframe
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
                  Use lower timeframes only after price reaches an important
                  higher-timeframe area. They may help traders observe:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {lowerTimeframeUses.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-base text-muted-foreground"
                    >
                      <Crosshair className="w-4 h-4 text-trading-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-6">
              This keeps the analysis organized. The lower timeframe should
              refine the idea, not create dozens of random levels.
            </p>
          </div>
        </FadeSection>

        {/* AVOID MARKING TOO MANY */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Avoid Marking Too Many{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Levels
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                A chart covered with horizontal lines can make trading more
                confusing instead of easier.
              </p>
              <p>
                If almost every price is marked as support or resistance, the
                levels lose their purpose.
              </p>
              <p>
                Try focusing on the areas that have the clearest evidence.
              </p>
              <p>A simple chart may contain:</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {simpleChartContents.map((item) => (
                <div
                  key={item}
                  className="glass rounded-xl px-4 py-3 text-sm md:text-base text-muted-foreground flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-trading-green shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              The exact number will depend on market conditions. Clarity is more
              valuable than quantity.
            </p>
          </div>
        </FadeSection>

        {/* LONDON + NY SESSIONS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-6 h-6 text-trading-green" />
                  <h3 className="text-lg md:text-xl font-bold text-foreground">
                    London Session and XAUUSD Levels
                  </h3>
                </div>
                <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                  <p>
                    The London session often brings increased liquidity to gold.
                  </p>
                  <p>
                    This can make previously marked levels particularly
                    important.
                  </p>
                  <p>Traders may watch whether London:</p>
                  <ul className="space-y-1">
                    {londonBehaviors.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p>
                    A breakout during London should still be evaluated carefully.
                  </p>
                  <p>
                    Gold can produce strong initial moves that later reverse.
                  </p>
                  <p>
                    The level itself is only one part of the decision.
                  </p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-trading-gold" />
                  <h3 className="text-lg md:text-xl font-bold text-foreground">
                    New York Session and Key Gold Levels
                  </h3>
                </div>
                <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                  <p>
                    The New York session can create significant XAUUSD
                    volatility.
                  </p>
                  <p>
                    US economic releases, Treasury yields, Federal Reserve
                    expectations and US dollar movement can all affect gold.
                  </p>
                  <p>
                    A technical level that held during quieter conditions may
                    experience much stronger pressure when New York liquidity
                    enters.
                  </p>
                  <p>
                    This is why traders should know when high-impact US economic
                    data is scheduled.
                  </p>
                  <p>
                    Technical analysis does not operate separately from market
                    conditions.
                  </p>
                  <p>
                    During major news, gold can move through several levels very
                    quickly. Risk management becomes even more important.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* DO NOT ENTER DIRECTLY INTO OPPOSING */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-red/10 to-transparent flex items-center justify-center">
                  <Crosshair className="w-7 h-7 text-trading-red" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">
                    Do Not Enter Directly Into{" "}
                  </span>
                  <span className="text-trading-gold text-glow-gold">
                    Opposing Structure
                  </span>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                <p>
                  One useful reason for marking support and resistance is to
                  avoid poor entries.
                </p>
                <p>
                  Imagine gold has already moved sharply higher and is now
                  approaching a major daily resistance zone.
                </p>
                <p>
                  Buying directly below that resistance may provide limited room
                  for price to move before encountering sellers.
                </p>
                <p>
                  Likewise, selling directly into major support can create poor
                  conditions.
                </p>
                <p>Before entering, ask:</p>
              </div>
              <ul className="space-y-2 mb-6">
                {[
                  "Where is the next important opposing level?",
                  "Is there enough room for the trade idea to develop?",
                  "Would I be entering directly into support or resistance?",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-base md:text-lg text-muted-foreground"
                  >
                    <Crosshair className="w-5 h-5 text-trading-red shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                This can help improve trade selection.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* NOT TRADE SIGNALS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">
                Support and Resistance Are Not{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Trade Signals
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>This point is important.</p>
              <p>A support zone is not automatically a buy signal.</p>
              <p>A resistance zone is not automatically a sell signal.</p>
              <p>The level is an area to watch.</p>
              <p>
                A trader may then look for additional confirmation such as:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {confirmationTypes.map((item) => (
                <div
                  key={item}
                  className="glass rounded-xl px-4 py-3 text-sm md:text-base text-muted-foreground flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              This helps prevent emotional entries based on a line alone.
            </p>
          </div>
        </FadeSection>

        {/* STOP-LOSS PLACEMENT */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-red/10 to-transparent flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7 text-trading-red" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">
                    Stop-Loss Placement Around{" "}
                  </span>
                  <span className="text-trading-gold text-glow-gold">
                    Key Levels
                  </span>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                <p>
                  Support and resistance can also help define where a trade idea
                  becomes invalid.
                </p>
                <p>
                  Suppose a trader considers a bullish setup because an
                  important support zone has held.
                </p>
                <p>
                  If price later breaks decisively through that support and the
                  bullish structure fails, the original reason for the trade may
                  no longer exist.
                </p>
                <p>
                  A stop loss should generally relate to the invalidation of the
                  setup rather than an arbitrary number of points.
                </p>
                <p>However, stop placement depends on:</p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {stopFactors.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-base md:text-lg text-muted-foreground"
                  >
                    <AlertTriangle className="w-4 h-4 text-trading-red shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                No support or resistance level is guaranteed to hold.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* STEP BY STEP */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">
                How to Mark XAUUSD Support and Resistance{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Step by Step
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              A simple process can look like this:
            </p>

            <div className="space-y-5">
              {[
                {
                  step: "Step 1",
                  title: "Open the Daily Chart",
                  points: [
                    "Identify the clearest swing highs and swing lows.",
                    "Mark major areas where price reversed strongly.",
                  ],
                },
                {
                  step: "Step 2",
                  title: "Check the Four-Hour Chart",
                  points: [
                    "Refine those areas and identify the current structure.",
                    "Avoid adding every small reaction.",
                  ],
                },
                {
                  step: "Step 3",
                  title: "Mark Previous Highs and Lows",
                  points: [
                    "Previous day high",
                    "Previous day low",
                    "Previous week high",
                    "Previous week low",
                    "only where they are useful to your trading approach.",
                  ],
                },
                {
                  step: "Step 4",
                  title: "Identify the Current Range",
                  points: [
                    "Trending higher",
                    "Trending lower",
                    "Consolidating",
                  ],
                },
                {
                  step: "Step 5",
                  title: "Wait for Price to Reach a Relevant Area",
                  points: [
                    "Do not force a trade in the middle of nowhere.",
                    "Let price come toward a level that actually matters.",
                  ],
                },
                {
                  step: "Step 6",
                  title: "Watch the Reaction",
                  points: [
                    "Look for confirmation through price action and structure.",
                  ],
                },
                {
                  step: "Step 7",
                  title: "Define Invalidation",
                  points: [
                    "Know where your idea is wrong before entering.",
                    "This makes support and resistance part of a complete trading plan rather than a guessing tool.",
                  ],
                },
              ].map((item, i) => (
                <FadeIn key={item.step} delay={i * 0.05}>
                  <div className="glass-strong rounded-2xl p-6 gradient-border flex gap-5">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-trading-gold/15 to-trading-green/10 flex items-center justify-center">
                      <span className="text-lg font-extrabold text-trading-gold">
                        {i + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-trading-green/80 mb-1">
                        {item.step}
                      </p>
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        {item.title}
                      </h3>
                      <ul className="space-y-1">
                        {item.points.map((pt) => (
                          <li
                            key={pt}
                            className="text-sm md:text-base text-muted-foreground flex items-start gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* BULLISH SCENARIO */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-green/10 to-transparent flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-trading-green" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">
                    Example of a Bullish{" "}
                  </span>
                  <span className="text-trading-green text-glow-green">
                    Support Scenario
                  </span>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Imagine XAU/USD is in a bullish higher-timeframe trend.
                </p>
                <p>Price retraces toward a daily support zone.</p>
                <p>
                  Instead of buying immediately, a trader watches the lower
                  timeframe.
                </p>
                <p>
                  Gold enters the zone, rejects lower prices and begins forming
                  a higher low.
                </p>
                <p>
                  Price then breaks the most recent lower-timeframe swing high.
                </p>
                <p>
                  That sequence provides more information than the support line
                  alone.
                </p>
                <p>The logic is:</p>
                <p className="text-foreground/90 font-medium">
                  Higher-timeframe support + rejection + improving structure.
                </p>
                <p>
                  That still does not guarantee a winning trade.
                </p>
                <p>
                  It simply creates a more structured reason for considering the
                  setup.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* BEARISH SCENARIO */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-red/10 to-transparent flex items-center justify-center">
                  <TrendingDown className="w-7 h-7 text-trading-red" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">
                    Example of a Bearish{" "}
                  </span>
                  <span className="text-trading-gold text-glow-gold">
                    Resistance Scenario
                  </span>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Now imagine gold is in a bearish market structure.
                </p>
                <p>
                  Price retraces upward toward an important four-hour resistance
                  zone.
                </p>
                <p>
                  At resistance, buyers fail to create a new significant high.
                </p>
                <p>
                  Price begins forming a lower high and later breaks short-term
                  support.
                </p>
                <p>The trader now has:</p>
                <p className="text-foreground/90 font-medium">
                  Higher-timeframe resistance + lower high + bearish structure
                  confirmation.
                </p>
                <p>
                  Again, the level did not create the trade by itself.
                </p>
                <p>
                  The reaction around the level provided the information.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* COMMON MISTAKES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Common Support and{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Resistance Mistakes
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {commonMistakes.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.05}>
                  <div className="glass-strong rounded-2xl p-6 gradient-border h-full flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-trading-red/10 to-transparent flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-trading-red" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* CHECKLIST */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-green/10 to-transparent flex items-center justify-center">
                  <Target className="w-7 h-7 text-trading-green" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">
                    XAUUSD Support and Resistance{" "}
                  </span>
                  <span className="text-trading-green text-glow-green">
                    Checklist
                  </span>
                </h2>
              </div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                Before trading around an important gold level, ask:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {checklistItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 text-sm md:text-base text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                A checklist can help traders stay consistent instead of making
                decisions based on emotion.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SIMPLIFY */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">
                Support and Resistance Should Simplify{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Your Analysis
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Good technical analysis does not need to make the chart
                complicated.
              </p>
              <p>
                Support and resistance should help reduce uncertainty by
                identifying the places where price deserves more attention.
              </p>
              <p>
                The goal is not to predict every reversal.
              </p>
              <p>
                The goal is to prepare for important areas and then observe how
                the market behaves when price reaches them.
              </p>
              <p>
                For XAUUSD traders, combining higher-timeframe support and
                resistance with market structure, session timing and risk
                management can provide a much clearer framework than using
                horizontal lines alone.
              </p>
              <p>
                If the market does not confirm the setup, there is no requirement
                to trade.
              </p>
              <p>
                Patience remains one of the most useful tools available to a
                trader.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* CONTINUE YOUR XAUUSD ANALYSIS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Continue Your </span>
                <span className="text-trading-gold text-glow-gold">
                  XAUUSD Analysis
                </span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  For a practical example of how these concepts apply to the
                  current market, read our latest{" "}
                  <Link
                    href="/blog/xauusd-weekly-outlook-september-14-18-2026/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    XAUUSD Weekly Outlook
                  </Link>
                  , where we map important gold levels and discuss possible
                  bullish and bearish scenarios for the trading week.
                </p>
                <p>
                  You can also explore our{" "}
                  <Link
                    href="/gold-signals/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    Gold Signals
                  </Link>{" "}
                  section for educational XAU/USD analysis and our{" "}
                  <Link
                    href="/xauusd-analysis/"
                    className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors"
                  >
                    XAUUSD Analysis
                  </Link>{" "}
                  section for more technical market-structure content.
                </p>
                <p>
                  To learn more about ForexWizard and our educational approach,
                  visit{" "}
                  <Link
                    href="/about/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    About ForexWizard
                  </Link>
                  .
                </p>
                <p>
                  Readers who want regular educational gold market observations
                  can also follow the ForexWizzz Telegram community.
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

        {/* RISK DISCLAIMER */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
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
                  Technical levels can fail and market conditions can change
                  quickly.
                </p>
                <p>
                  Always perform your own analysis and use appropriate risk
                  management.
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
                Explore more of Forex Wizard to deepen your gold trading
                knowledge and market understanding.
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
