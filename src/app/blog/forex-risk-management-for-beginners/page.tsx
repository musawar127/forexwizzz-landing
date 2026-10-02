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
  Calculator,
  Scale,
  Layers,
  Percent,
  TrendingDown,
  Clock,
  DollarSign,
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

const post = getBlogPost("forex-risk-management-for-beginners")!;

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
const threeParts = [
  {
    title: "Account Risk",
    desc: "How much of your account you are willing to lose on a single trade. This is the monetary amount you accept as a potential loss before opening the position.",
    icon: <DollarSign className="w-7 h-7 text-trading-green" />,
    accent: "from-trading-green/10 to-transparent",
  },
  {
    title: "Stop-Loss Distance",
    desc: "How far your entry is from the price level that invalidates the setup. The distance is measured in pips, points, or price units, depending on the instrument.",
    icon: <ShieldCheck className="w-7 h-7 text-trading-red" />,
    accent: "from-trading-red/10 to-transparent",
  },
  {
    title: "Position Size",
    desc: "The lot size that combines your account risk and stop-loss distance into one number. Position size is the output, not the starting point, of risk planning.",
    icon: <Calculator className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
  },
];

const commonMistakes = [
  { title: "Risking a fixed lot size on every trade", desc: "The same lot size produces very different losses when the stop distance changes." },
  { title: "Removing the stop loss when the trade goes against you", desc: "This converts a defined risk into an open-ended loss." },
  { title: "Copying another trader's lot size", desc: "Account balance, leverage, stop distance and risk tolerance differ between traders." },
  { title: "Opening multiple correlated positions", desc: "Several trades on the same currency direction can add up to a much larger real exposure." },
  { title: "Using maximum leverage to open the largest position", desc: "Leverage lowers margin, not market risk. It can enable oversized positions." },
  { title: "Ignoring the economic calendar", desc: "High-impact news can widen spreads and move price past the stop in seconds." },
  { title: "Calculating risk from balance instead of equity", desc: "Equity reflects floating losses. Balance does not." },
  { title: "Treating partial profit as if remaining risk is gone", desc: "Closing part of a position reduces exposure, but the remaining portion is still at risk." },
  { title: "Increasing risk to recover losses", desc: "Revenge trading after a losing streak is one of the fastest ways to deepen a drawdown." },
  { title: "Not setting daily or weekly loss limits", desc: "Without a circuit breaker, a single bad day can erase weeks of disciplined trading." },
];

const checklistItems = [
  "Account risk decided before opening the trade?",
  "Currency pair and direction (BUY/SELL) confirmed?",
  "Stop Loss level that invalidates the setup marked?",
  "Stop-loss distance measured in pips or points?",
  "Position size calculated from risk and stop distance?",
  "Lot size checked against broker minimum and contract specs?",
  "Leverage reviewed against the position size?",
  "Margin requirement and free margin checked?",
  "Total open exposure across all positions reviewed?",
  "Correlated positions identified?",
  "Economic calendar checked for high-impact events?",
  "Daily loss limit still intact?",
  "Weekly loss limit still intact?",
  "Trade-management plan (BE, partial close, updates) understood?",
];

const routine = [
  { step: "1", title: "Check account balance and equity", desc: "Confirm available capital before deciding any risk amount." },
  { step: "2", title: "Decide the maximum risk for the trade", desc: "Set the monetary amount you are willing to lose, independent of lot size." },
  { step: "3", title: "Identify the setup, instrument and direction", desc: "Know exactly which currency pair and whether you are buying or selling." },
  { step: "4", title: "Mark the Stop Loss that invalidates the setup", desc: "The stop is a structural level, not a random distance from entry." },
  { step: "5", title: "Measure entry-to-stop distance", desc: "Express the distance in pips, points, or price units." },
  { step: "6", title: "Calculate the position size", desc: "Use your risk amount and stop distance to find the correct lot size." },
  { step: "7", title: "Verify lot size against broker specifications", desc: "Check the minimum lot, step size and contract specifications for the instrument." },
  { step: "8", title: "Review leverage, margin and free margin", desc: "Confirm the position can be opened without exceeding safe margin levels." },
  { step: "9", title: "Review total exposure and correlation", desc: "Combine this trade with existing positions to estimate real account risk." },
  { step: "10", title: "Check the economic calendar and place the order", desc: "Avoid entering just before high-impact releases unless that is your plan." },
];

const continueLearning = [
  {
    href: "/blog/how-to-read-forex-signals/",
    title: "How to Read Forex Signals",
    desc: "Learn every signal field — entry, SL, TP1\u2013TP4, BE and the common abbreviations used by providers.",
    icon: <BookOpen className="w-7 h-7 text-trading-green" />,
    accent: "from-trading-green/10 to-transparent",
  },
  {
    href: "/blog/how-to-follow-forex-signals/",
    title: "How to Follow Forex Signals",
    desc: "Execution guide covering entry ranges, late entries, signal updates and when to skip a trade.",
    icon: <Activity className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/forex-signals/",
    title: "Forex Signals",
    desc: "The ForexWizard Forex Signals hub — educational trade ideas, currency-pair analysis and market observations.",
    icon: <Newspaper className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/xauusd-lot-size/",
    title: "XAUUSD Lot Size",
    desc: "Position sizing for gold — contract specifications, tick value, margin and lot size calculations.",
    icon: <Calculator className="w-7 h-7 text-trading-green" />,
    accent: "from-trading-green/10 to-transparent",
  },
];

const faqs = [
  {
    q: "What is forex risk management?",
    a: "Forex risk management is the process of deciding how much you are willing to lose on a trade before opening it, and then sizing the position, placing a stop loss, and managing exposure so that no single trade can disproportionately damage the account.",
  },
  {
    q: "How much should I risk per forex trade?",
    a: "There is no universal correct percentage. Risk per trade should reflect your personal tolerance, account size, experience, and total open exposure. Many educational sources discuss small percentages, but the right number is a personal decision, not a rule we recommend.",
  },
  {
    q: "What is the best lot size for a beginner?",
    a: "There is no universally correct lot size. Lot size depends on account balance, stop-loss distance, broker contract specifications, leverage and personal risk tolerance. Lot size should be calculated from risk, not chosen arbitrarily.",
  },
  {
    q: "Do I need to use a stop loss on every trade?",
    a: "A stop loss defines where the setup becomes invalid and caps the potential loss on a trade. Trading without one means accepting an undefined downside. Removing a stop after entry generally increases risk rather than reducing it.",
  },
  {
    q: "What is the difference between margin and risk?",
    a: "Margin is the amount the broker requires to open a position, set by leverage and contract specifications. Risk is the amount you are willing to lose on a trade, set by stop distance and lot size. Low margin does not mean low risk.",
  },
  {
    q: "How does leverage affect forex risk?",
    a: "Leverage lowers the margin required to open a position. It does not reduce the underlying market exposure. High leverage can make it easier to open oversized positions, which increases potential loss if the trade moves against you.",
  },
  {
    q: "What is drawdown in forex trading?",
    a: "Drawdown is the decline in account equity from a previous peak to a subsequent trough. It is usually expressed as a percentage. Larger drawdowns require larger percentage gains just to return to breakeven.",
  },
  {
    q: "Should I risk a fixed dollar amount or a percentage?",
    a: "Both approaches are used. A fixed dollar amount is easy to apply but does not adapt as the account grows or shrinks. A percentage scales with the account but still needs to be combined with a personal loss limit. Neither method guarantees profitability.",
  },
  {
    q: "How do I manage multiple open forex trades?",
    a: "Look at the combined exposure, not each trade individually. Several small positions can add up to a large total risk, especially if they are on correlated currency pairs. Review total exposure, free margin and the economic calendar before opening additional positions.",
  },
  {
    q: "Can forex risk management guarantee I won't lose?",
    a: "No. Risk management limits how much you can lose on a trade and helps preserve capital over a series of trades, but it cannot guarantee profits or prevent losses entirely. Forex trading involves substantial risk and may not be suitable for everyone.",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function ForexRiskManagementForBeginnersPage() {
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
              <span className="text-foreground/80">Forex Risk Management for Beginners</span>
            </nav>

            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-gold">
                <ShieldCheck className="w-4 h-4" />
                Beginner Guide · Risk Management
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">Forex Risk Management for Beginners: Lot Size, Stop Loss &amp; Position Sizing</span>
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
              <p>Forex risk management is what separates trading from gambling.</p>
              <p>
                Without a defined risk plan, even a good trading idea can produce a
                catastrophic loss. A single oversized position, a stop that gets moved
                further away, or a cluster of correlated trades can damage an account
                far more than any single bad call.
              </p>
              <p>
                This guide walks through the core principles of forex risk management
                for beginners &mdash; position sizing, lot size, stop loss, leverage,
                margin, correlated exposure, drawdown and practical examples &mdash;
                in plain language.
              </p>
              <p className="text-foreground/90 font-medium">
                This article is educational. No universal risk percentage is
                recommended, no specific lot size is suggested, and nothing here is
                financial advice.
              </p>
            </div>
          </HeroAnimation>
        </section>

        {/* QUICK ANSWER */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Forex Risk Management for Beginners: </span>
                <span className="text-trading-gold text-glow-gold">Quick Answer</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                A simple, repeatable forex risk-management process:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-6">
                {[
                  "Decide how much you are willing to lose on the trade before opening it.",
                  "Identify the currency pair and the direction (BUY or SELL).",
                  "Mark the Stop Loss level that invalidates the setup.",
                  "Measure the distance from entry to Stop Loss.",
                  "Calculate the position size that keeps loss within your risk.",
                  "Check the lot size against your broker\u2019s minimum and contract specifications.",
                  "Review leverage, margin and total open exposure before placing the order.",
                  "After entry, monitor the trade and follow any updates from your signal provider.",
                ].map((item) => (
                  <li key={item} className="text-base md:text-lg text-muted-foreground">{item}</li>
                ))}
              </ol>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                The order matters. Risk is decided first, lot size is calculated
                second, and the order is only placed after exposure is reviewed.
              </p>
              <p className="text-base md:text-lg text-foreground/90 font-medium mt-3">
                Risk management does not guarantee profits, but it is what keeps a
                single bad trade from ending an account.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* WHAT IS FOREX RISK MANAGEMENT */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">What Is Forex Risk </span>
              <span className="text-trading-gold text-glow-gold">Management?</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Forex risk management is the process of deciding, before each trade, how much you are willing to lose and then structuring the position so that the loss stays inside that limit.</p>
              <p>It is not a single rule such as &ldquo;risk 1% per trade.&rdquo; It is a system that combines several elements:</p>
              <ul className="space-y-1">
                {[
                  "the amount of money you accept as a potential loss",
                  "the stop-loss distance that defines where the setup is wrong",
                  "the lot size that links risk and stop distance together",
                  "an awareness of leverage, margin and total open exposure",
                  "a plan for what happens after the trade is open",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>A trader with a weak analysis but a strong risk plan will survive a long series of mistakes. A trader with a strong analysis but no risk plan can lose everything on a single trade.</p>
            </div>
          </div>
        </FadeSection>

        {/* THREE PARTS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">The Three Parts of Every Forex Trade </span>
              <span className="text-trading-gold text-glow-gold">Risk Calculation</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              Every forex risk calculation, no matter how complex it looks, comes down to three elements working together.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {threeParts.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.07}>
                  <div className="glass-strong rounded-2xl p-6 gradient-border h-full flex flex-col gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center`}>
                      {item.icon}
                    </div>
                    <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <p className="text-sm text-muted-foreground/80 mt-6">
              Change any one of the three and the position size changes. A larger stop distance with the same risk requires a smaller lot. A larger risk with the same stop distance requires a larger lot.
            </p>
          </div>
        </FadeSection>

        {/* DECIDE RISK BEFORE LOT SIZE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Decide Risk Before </span>
                <span className="text-trading-gold text-glow-gold">Lot Size</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>The most common beginner mistake is to start with a lot size &mdash; &ldquo;I will trade 0.10 lots&rdquo; &mdash; and then ask what the risk is.</p>
                <p>The correct sequence runs the other way. First decide the risk, then measure the stop distance, then compute the lot size that satisfies both.</p>
                <p>If you start with lot size, two trades with identical lot sizes can produce very different losses simply because the stop distances differ. A 0.10 lot position with a 20-pip stop is not the same risk as a 0.10 lot position with a 60-pip stop.</p>
                <p className="text-foreground/90 font-medium">
                  Lot size is the output of risk planning. It is not the input.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* PERFECT RISK PERCENTAGE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Is There a Perfect Forex </span>
              <span className="text-trading-gold text-glow-gold">Risk Percentage?</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>No. There is no universally correct risk percentage for every trader.</p>
              <p>Educational sources often quote small percentages such as 1% or 2% per trade. These numbers are guidelines, not laws. The right risk for one trader can be too aggressive for another, depending on:</p>
              <ul className="space-y-1">
                {[
                  "account size",
                  "trading experience",
                  "personal risk tolerance",
                  "number of open positions",
                  "confidence in the specific setup",
                  "overall market volatility",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <Percent className="w-4 h-4 text-trading-gold shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>This article deliberately does not recommend a specific percentage. The decision belongs to each trader, ideally after understanding the consequences of drawdown (explained below).</p>
            </div>
          </div>
        </FadeSection>

        {/* MONETARY VS PERCENTAGE RISK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Monetary Risk vs </span>
              <span className="text-trading-gold text-glow-gold">Percentage Risk</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-trading-green" />
                  <h3 className="text-lg font-bold text-foreground">Monetary Risk</h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  A fixed dollar amount per trade, for example &ldquo;risk no more than $50 on any single position.&rdquo; Easy to apply and easy to translate into a lot size. The drawback is that it does not automatically scale as the account grows or shrinks.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <div className="flex items-center gap-3 mb-4">
                  <Percent className="w-6 h-6 text-trading-gold" />
                  <h3 className="text-lg font-bold text-foreground">Percentage Risk</h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  A percentage of account equity, for example &ldquo;risk a small percentage of equity per trade.&rdquo; Scales naturally with the account but still requires a personal maximum loss limit. A percentage is a method, not a guarantee of safety.
                </p>
              </div>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-6">
              Both methods are used in practice. The key is to combine whichever you choose with an absolute loss limit so that no single trade &mdash; or single bad day &mdash; can cause disproportionate damage.
            </p>
          </div>
        </FadeSection>

        {/* BASIC POSITION-SIZING CONCEPT */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">The Basic Forex Position-Sizing </span>
              <span className="text-trading-gold text-glow-gold">Concept</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Position sizing answers a simple question: given the amount you are willing to lose and the distance to your stop, how large should the position be?</p>
              <p>The basic relationship can be expressed conceptually as:</p>
              <div className="glass rounded-xl p-4 font-mono text-sm text-foreground">
                <p><strong>Position size</strong> = <strong>Monetary risk</strong> &divide; <strong>Stop-loss distance (in money per lot)</strong></p>
              </div>
              <p>In words: divide the money you are willing to lose by the money you would lose per lot if price reaches the stop. The result is the lot size that keeps the potential loss inside your risk.</p>
              <p>The exact money-per-lot value depends on the currency pair, the contract specifications of your broker, the account currency, and how the stop distance is measured. Always confirm the contract specification on your own platform before relying on a position-sizing calculation.</p>
              <p className="text-sm text-muted-foreground/80">This formula is a conceptual teaching tool. It is not a recommendation for any specific risk amount, lot size, or instrument.</p>
              <p>
                For a practical tool that automates this calculation for gold,
                try our free{" "}
                <Link
                  href="/xauusd-lot-size/"
                  className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors font-medium"
                >
                  XAUUSD Lot Size Calculator
                </Link>{" "}
                &mdash; it handles contract size, commission, slippage and
                multi-currency conversion automatically.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SIMPLE POSITION-SIZING EXAMPLE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Simple Position-Sizing </span>
              <span className="text-trading-gold text-glow-gold">Example</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Consider a hypothetical educational setup:</p>
              <div className="glass rounded-xl p-4 font-mono text-sm text-foreground space-y-1">
                <p>Instrument: EUR/USD</p>
                <p>Direction: BUY</p>
                <p>Entry: 1.1000</p>
                <p>Stop Loss: 1.0970</p>
                <p>Stop distance: 30 pips</p>
                <p>Monetary risk: $60 (chosen by the trader)</p>
              </div>
              <p>If the contract specification says one standard lot of EUR/USD is worth roughly $10 per pip, then:</p>
              <div className="glass rounded-xl p-4 font-mono text-sm text-foreground space-y-1">
                <p>Money at risk per lot = 30 pips &times; $10 = $300</p>
                <p>Position size = $60 &divide; $300 = 0.20 lots</p>
              </div>
              <p>So a $60 risk with a 30-pip stop corresponds, in this hypothetical example, to a position of roughly 0.20 lots.</p>
              <p className="text-sm text-muted-foreground/80">This is a hypothetical educational example. The dollar-per-pip value, contract size, pip definition and minimum lot differ by broker, account type and instrument. Always verify the specification on your own platform. Do NOT treat this as a recommendation for any specific lot size or risk amount.</p>
            </div>
          </div>
        </FadeSection>

        {/* HOW STOP-LOSS DISTANCE CHANGES LOT SIZE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">How Stop-Loss Distance </span>
              <span className="text-trading-gold text-glow-gold">Changes Lot Size</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>For the same monetary risk, a larger stop distance requires a smaller lot size, and a smaller stop distance requires a larger lot size.</p>
              <p>Using the same hypothetical $60 risk:</p>
              <div className="glass rounded-xl p-4 font-mono text-sm text-foreground space-y-1">
                <p>15-pip stop &rarr; larger lot</p>
                <p>30-pip stop &rarr; medium lot</p>
                <p>60-pip stop &rarr; smaller lot</p>
                <p>120-pip stop &rarr; even smaller lot</p>
              </div>
              <p>This is the core reason a fixed lot size is dangerous. The same 0.20 lots with a 120-pip stop does not produce a $60 loss &mdash; it produces a much larger one. Risk must always be re-derived from the actual stop distance of each individual trade.</p>
              <p className="text-sm text-muted-foreground/80">Hypothetical example only. Do NOT generalize the numbers to your own account without verifying contract specifications.</p>
            </div>
          </div>
        </FadeSection>

        {/* WHAT IS A STOP LOSS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">What Is a </span>
              <span className="text-trading-gold text-glow-gold">Stop Loss?</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>A stop loss is a price level at which the trade idea is considered invalid. When price reaches the stop, the position is closed, ideally before the loss grows further.</p>
              <p>A stop loss serves three purposes:</p>
              <ul className="space-y-1">
                {[
                  "it defines where the setup is wrong",
                  "it caps the maximum intended loss on the trade",
                  "it provides the stop distance needed for position sizing",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-trading-red shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>Without a stop loss, two of the three parts of risk calculation simply do not exist. The trade has no defined invalidation and no defined maximum loss.</p>
            </div>
          </div>
        </FadeSection>

        {/* STOP LOSS DOES NOT GUARANTEE EXACT LOSS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl border border-trading-gold/20 p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-trading-gold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Stop Loss Does Not Guarantee an Exact Loss
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                A stop-loss order is an instruction to close the position when price reaches a specified level. It does not guarantee execution at exactly that level. During fast-moving conditions, gaps, wide spreads, or low liquidity, the fill price can be worse than the requested stop price. This is known as slippage. The actual loss may therefore be larger than the calculated risk. Spreads, commissions and overnight swaps also affect the net result. Risk calculations describe an intended loss, not a guaranteed one.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* WHY REMOVING A STOP INCREASES RISK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl border border-trading-red/20 p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-trading-red mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Why Removing a Stop Can Increase Risk
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Removing a stop loss because the trade is going against you converts a defined, finite risk into an open-ended loss. The original risk calculation assumed the position would be closed at the stop. Without the stop, that assumption no longer holds. Price can keep moving against the position, leverage can magnify the loss, and margin calls can force liquidation at unfavorable prices. Moving the stop further away is just as dangerous: it increases the maximum loss beyond the original plan. Changing a stop should follow a defined strategy or a provider update, not the hope that the market will eventually turn.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* LOT SIZE EXPLAINED */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Lot Size Explained for </span>
              <span className="text-trading-gold text-glow-gold">Beginners</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>In forex, &ldquo;lot&rdquo; refers to the size of a position. Common lot-size concepts include:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass rounded-xl p-4">
                  <p className="text-sm font-bold text-foreground mb-1">Standard Lot</p>
                  <p className="font-mono text-sm text-muted-foreground">1.00 lot</p>
                  <p className="text-xs text-muted-foreground/80 mt-2">The largest of the three common sizes.</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-sm font-bold text-foreground mb-1">Mini Lot</p>
                  <p className="font-mono text-sm text-muted-foreground">0.10 lot</p>
                  <p className="text-xs text-muted-foreground/80 mt-2">One-tenth of a standard lot.</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-sm font-bold text-foreground mb-1">Micro Lot</p>
                  <p className="font-mono text-sm text-muted-foreground">0.01 lot</p>
                  <p className="text-xs text-muted-foreground/80 mt-2">One-hundredth of a standard lot.</p>
                </div>
              </div>
              <p>The exact money-per-pip value for each lot size depends on the currency pair, the account currency, and the broker&apos;s contract specification. A 0.10 lot position is not automatically &ldquo;safe&rdquo; &mdash; with a large enough stop distance, even a small lot size can produce a large loss.</p>
              <p className="text-sm text-muted-foreground/80">Lot sizes and contract specifications vary by broker and instrument. Always verify the specification on your own platform.</p>
            </div>
          </div>
        </FadeSection>

        {/* COPYING LOT SIZE IS DANGEROUS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Why Copying Another Trader&apos;s Lot Size </span>
              <span className="text-trading-gold text-glow-gold">Is Dangerous</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Two traders can receive the same signal and still need completely different lot sizes.</p>
              <p>Account balance, leverage, broker contract specifications, stop distance from the actual entry, and personal risk tolerance can all differ. A lot size that represents a small risk for one account can represent a large risk for another.</p>
              <ul className="space-y-1">
                {[
                  "different account balances",
                  "different leverage settings",
                  "different broker contract specifications",
                  "different entry prices (because of slippage or late entry)",
                  "different stop distances from the actual entry",
                  "different personal risk tolerance",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <AlertTriangle className="w-4 h-4 text-trading-red shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                If you are following a signal provider, first learn{" "}
                <Link href="/blog/how-to-read-forex-signals/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors font-medium">
                  how to read forex signals
                </Link>{" "}
                so you understand each field, and then calculate your own position size from your own account, stop distance and risk tolerance.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* RISK MANAGEMENT WHEN FOLLOWING SIGNALS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Risk Management When Following </span>
              <span className="text-trading-gold text-glow-gold">Forex Signals</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Following a forex signal does not transfer risk management to the provider. The provider offers a trade idea; the follower is still responsible for sizing, stop placement and exposure.</p>
              <p>Before entering a signal, you should:</p>
              <ul className="space-y-1">
                {[
                  "verify the signal is still active",
                  "compare current price with the original entry",
                  "check the Stop Loss and Take Profit levels",
                  "recalculate position size for your own account",
                  "review total exposure and correlated positions",
                  "check the economic calendar",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                For the full execution workflow &mdash; entry ranges, late entries, signal updates, and when to skip a trade &mdash; read our guide on{" "}
                <Link href="/blog/how-to-follow-forex-signals/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors font-medium">
                  how to follow forex signals
                </Link>
                .
              </p>
            </div>
          </div>
        </FadeSection>

        {/* LEVERAGE VS RISK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Leverage vs </span>
              <span className="text-trading-gold text-glow-gold">Risk</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Leverage and risk are not the same thing, and confusing them is one of the most common beginner mistakes.</p>
              <p>Leverage controls how much margin the broker requires to open a position. Risk controls how much money you can lose if the trade goes against you. High leverage lowers the margin requirement; it does not lower the loss if price hits the stop.</p>
              <p>A position that requires very little margin can still produce a very large loss. The two numbers move independently.</p>
              <p className="text-foreground/90 font-medium">
                Risk should be measured from the potential loss at the stop, not from the margin required to open the position.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* HIGH LEVERAGE → OVERSIZED POSITIONS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Why High Leverage Can Lead to </span>
              <span className="text-trading-gold text-glow-gold">Oversized Positions</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>When leverage is high, the margin required to open a position is low. That makes it easy to open a position much larger than the account can safely absorb.</p>
              <p>For example, with very high leverage, a small account may be able to open a position whose potential loss at the stop exceeds the entire account balance. In that situation, a single bad trade &mdash; or even a single spike of slippage &mdash; can wipe out the account.</p>
              <p>High leverage does not create risk by itself. It creates the <em>opportunity</em> to take risk that the account cannot afford. Lower leverage is a structural safeguard: by raising the margin requirement, it limits the maximum position size and therefore the maximum potential loss.</p>
              <p className="text-sm text-muted-foreground/80">This is a conceptual explanation. Available leverage varies by jurisdiction, broker and instrument. Always confirm the leverage that applies to your account.</p>
            </div>
          </div>
        </FadeSection>

        {/* MARGIN VS RISK TABLE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Margin vs </span>
              <span className="text-trading-gold text-glow-gold">Risk</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              Because the two are so often confused, here is a direct side-by-side comparison.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-trading-gold/10 to-trading-green/10">
                    <th className="text-left p-4 font-bold text-foreground border-b border-trading-gold/20">Margin</th>
                    <th className="text-left p-4 font-bold text-foreground border-b border-trading-gold/20">Risk</th>
                  </tr>
                </thead>
                <tbody className="glass-strong">
                  <tr className="border-b border-border/30">
                    <td className="p-4 text-muted-foreground align-top">Money required by the broker to open a position</td>
                    <td className="p-4 text-muted-foreground align-top">Money a trader is willing to lose on a trade</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="p-4 text-muted-foreground align-top">Set by leverage, lot size and contract specifications</td>
                    <td className="p-4 text-muted-foreground align-top">Set by stop-loss distance and lot size</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="p-4 text-muted-foreground align-top">Returned when the position is closed</td>
                    <td className="p-4 text-muted-foreground align-top">Lost if the stop-loss is reached</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="p-4 text-muted-foreground align-top">Determined by the broker</td>
                    <td className="p-4 text-muted-foreground align-top">Chosen by the trader</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-muted-foreground align-top">Does not indicate the size of potential loss</td>
                    <td className="p-4 text-muted-foreground align-top">Directly indicates potential loss</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground/80 mt-4">
              A position that requires very little margin can still produce a very large loss. Always measure risk from the stop, not from the margin.
            </p>
          </div>
        </FadeSection>

        {/* EQUITY VS BALANCE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Equity vs </span>
              <span className="text-trading-gold text-glow-gold">Balance</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-6 h-6 text-trading-green" />
                  <h3 className="text-lg font-bold text-foreground">Balance</h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  The cash amount in the account, ignoring all open positions. Balance only changes when a position is closed or when money is deposited or withdrawn.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <div className="flex items-center gap-3 mb-4">
                  <LineChart className="w-6 h-6 text-trading-gold" />
                  <h3 className="text-lg font-bold text-foreground">Equity</h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Balance plus the floating profit or loss of all open positions. Equity changes in real time as the market moves. Risk should be calculated from equity, not balance.
                </p>
              </div>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-6">
              If you have open positions in heavy floating loss, your balance may look healthy while your equity does not. Basing risk on balance hides the true state of the account.
            </p>
          </div>
        </FadeSection>

        {/* FREE MARGIN AND MARGIN LEVEL */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Free Margin and </span>
              <span className="text-trading-gold text-glow-gold">Margin Level</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Two related numbers that beginners should understand:</p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                  <span><strong className="text-foreground">Free margin</strong> is the money in the account still available to open new positions. It is equity minus the margin already used.</span>
                </li>
                <li className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                  <span><strong className="text-foreground">Margin level</strong> is equity divided by used margin, shown as a percentage. A low margin level indicates that the account is close to a margin call or stop-out.</span>
                </li>
              </ul>
              <p>If free margin is low, opening another position &mdash; even one that looks small &mdash; can push the account toward forced liquidation. Always check free margin before adding exposure.</p>
            </div>
          </div>
        </FadeSection>

        {/* MULTIPLE OPEN TRADES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Multiple Open Trades Can Create </span>
                <span className="text-trading-gold text-glow-gold">Hidden Risk</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>Each individual position may look small. Combined, they can represent a much larger exposure.</p>
                <p>For example, four positions of 0.10 lots create 0.40 lots of combined exposure. If all four stop out, the total loss is the sum of all four, not the loss of any single trade.</p>
                <div className="glass rounded-xl p-4 font-mono text-sm text-foreground">
                  4 &times; 0.10 lots = 0.40 lots of combined exposure
                </div>
                <p className="text-sm text-muted-foreground/80">Hypothetical example. Do NOT treat it as a recommendation for any specific number of positions or lot size.</p>
                <p>The correct approach is to evaluate total exposure across all open positions, not each trade in isolation.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* CORRELATED POSITIONS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Correlated Forex </span>
              <span className="text-trading-gold text-glow-gold">Positions</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Some currency pairs tend to move in the same direction because they share a common currency or a common economic driver.</p>
              <p>For example, EUR/USD and GBP/USD both have the US dollar on one side. When the US dollar weakens, both pairs often rise together. A BUY on EUR/USD and a BUY on GBP/USD is, in effect, two bets on the same theme.</p>
              <p>If both positions stop out, the trader takes two losses from the same market move. The apparent diversification is weaker than it looks.</p>
              <p className="text-foreground/90 font-medium">
                Before opening a new position, check whether it is correlated with positions already open. Treat correlated exposure as one larger trade.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SAME-DIRECTION EXPOSURE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Same-Direction </span>
              <span className="text-trading-gold text-glow-gold">Exposure</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Opening several positions in the same direction on correlated pairs stacks risk rather than spreading it.</p>
              <div className="glass rounded-xl p-4 font-mono text-sm text-foreground space-y-1">
                <p>BUY EUR/USD</p>
                <p>BUY GBP/USD</p>
                <p>BUY AUD/USD</p>
                <p>&rarr; all three lean on a weaker US dollar</p>
              </div>
              <p>If the US dollar strengthens across the board, all three positions can move against the trader at the same time. The losses add up. This is the opposite of diversification.</p>
              <p className="text-sm text-muted-foreground/80">Hypothetical example for illustration only. Correlations are statistical tendencies, not guarantees, and can break down during news events.</p>
            </div>
          </div>
        </FadeSection>

        {/* MULTIPLE POSITIONS ON SAME SIGNAL */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Multiple Positions on </span>
              <span className="text-trading-gold text-glow-gold">the Same Signal</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Some providers issue multiple entries on the same instrument &mdash; for example, scaling into a position as price moves into a zone. Each entry adds exposure.</p>
              <p>Before adding a second or third position, check:</p>
              <ul className="space-y-1">
                {[
                  "the combined lot size of all entries",
                  "the combined distance to the stop",
                  "the combined potential loss if all positions stop out",
                  "free margin and margin level after adding the new entry",
                  "whether the new entry is still inside the original plan",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <Layers className="w-4 h-4 text-trading-gold shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>Adding entries without recalculating total exposure is one of the fastest ways to quietly exceed your intended risk.</p>
            </div>
          </div>
        </FadeSection>

        {/* PARTIAL PROFIT */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Partial Profit Does Not Erase </span>
              <span className="text-trading-gold text-glow-gold">Remaining Risk</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Closing part of a position locks in some profit and reduces exposure. It does not eliminate the risk on the portion that remains open.</p>
              <p>For example, closing half of a 0.20 lot position leaves 0.10 lots still exposed. If price reverses to the stop, the remaining 0.10 lots can still produce a loss.</p>
              <p>Common management moves such as moving the stop to break-even (BE) are designed to limit remaining downside, but break-even is not literally guaranteed to produce exactly zero: spread, commission, swaps and slippage can produce a small gain or loss around the entry.</p>
              <p className="text-foreground/90 font-medium">
                Always re-evaluate risk on the remaining position, not on the original size.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* WHAT IS RISK-TO-REWARD */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">What Is </span>
              <span className="text-trading-gold text-glow-gold">Risk-to-Reward?</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Risk-to-reward (often written as R:R) compares the potential loss on a trade with the potential gain.</p>
              <div className="glass rounded-xl p-4 font-mono text-sm text-foreground">
                <p>Risk-to-reward = Potential reward &divide; Potential risk</p>
              </div>
              <p>For example, a trade with a 30-pip stop and a 60-pip target has a risk-to-reward of approximately 1:2 &mdash; the potential reward is twice the potential risk.</p>
              <p>Risk-to-reward is a planning tool. It describes the structure of a trade before it is taken. It does not predict whether the target will actually be reached.</p>
              <p className="text-sm text-muted-foreground/80">Hypothetical example. Do NOT treat any specific R:R number as a rule or guarantee.</p>
            </div>
          </div>
        </FadeSection>

        {/* HIGH R:R DOES NOT GUARANTEE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Why a High Risk-to-Reward Ratio Does Not </span>
              <span className="text-trading-gold text-glow-gold">Guarantee a Good Trade</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>A large potential reward relative to risk looks attractive on paper. But the reward only materializes if price actually reaches the target.</p>
              <p>A trade with a 1:5 risk-to-reward might have a very distant target and a very tight stop. That structure can mean a low probability of the target being reached, even though the ratio looks impressive.</p>
              <p>Risk-to-reward is one factor. It should be considered alongside the quality of the setup, market structure, the timeframe, the distance to the stop, and current market conditions. A high ratio alone does not make a trade worth taking.</p>
            </div>
          </div>
        </FadeSection>

        {/* DRAWDOWN */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Drawdown </span>
              <span className="text-trading-gold text-glow-gold">Explained</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Drawdown is the decline in account equity from a previous peak to a subsequent trough, usually expressed as a percentage.</p>
              <p>Drawdowns matter because of how recovery works. The larger the drawdown, the larger the percentage gain required just to return to breakeven.</p>
              <div className="glass rounded-xl p-4 font-mono text-sm text-foreground space-y-1">
                <p>10% drawdown &rarr; ~11% gain needed to recover</p>
                <p>25% drawdown &rarr; ~33% gain needed to recover</p>
                <p>50% drawdown &rarr; 100% gain needed to recover</p>
                <p>75% drawdown &rarr; 300% gain needed to recover</p>
              </div>
              <p className="text-sm text-muted-foreground/80">Illustrative figures only. Recovery percentages are mathematical, not predictions of future performance.</p>
              <p>This asymmetry is the core reason risk management exists. A single deep drawdown can take a very long time to recover from &mdash; if it recovers at all.</p>
            </div>
          </div>
        </FadeSection>

        {/* LOSING STREAKS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-red/10 to-transparent flex items-center justify-center">
                  <TrendingDown className="w-7 h-7 text-trading-red" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">Losing Streaks and </span>
                  <span className="text-trading-gold text-glow-gold">Risk</span>
                </h2>
              </div>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>No trading approach avoids losing trades entirely. Losses cluster: a series of losing trades in a row is statistically normal, even with a sound method.</p>
                <p>The damage from a losing streak depends on how much is risked per trade. Larger per-trade risk produces a steeper equity decline during a streak.</p>
                <p>Two dangerous reactions often appear after a losing streak:</p>
                <ul className="space-y-1">
                  {[
                    "increasing risk to recover the losses faster (revenge trading)",
                    "abandoning the plan entirely and trading impulsively",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                      <AlertTriangle className="w-4 h-4 text-trading-red shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>Both reactions tend to deepen the drawdown rather than end it. A pre-defined risk per trade and a pre-defined loss limit are the structural defenses against this pattern.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* DAILY AND WEEKLY RISK LIMITS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Daily and Weekly </span>
              <span className="text-trading-gold text-glow-gold">Risk Limits</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>A per-trade risk limit is not enough on its own. A run of losses in a single session can still cause serious damage.</p>
              <p>Many experienced traders add two further circuit breakers:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-trading-gold" />
                    <p className="text-sm font-bold text-foreground">Daily Loss Limit</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">A maximum loss for a single trading day. When reached, trading stops until the next session.</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-trading-gold" />
                    <p className="text-sm font-bold text-foreground">Weekly Loss Limit</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">A maximum loss for the trading week. When reached, trading pauses for the rest of the week.</p>
                </div>
              </div>
              <p>These limits do not prevent losses &mdash; they prevent a bad day or a bad week from becoming a catastrophic one.</p>
              <p className="text-sm text-muted-foreground/80">This is an educational concept. The actual numbers are a personal decision. We do not recommend specific loss limits.</p>
            </div>
          </div>
        </FadeSection>

        {/* ECONOMIC NEWS RISK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Economic News </span>
              <span className="text-trading-gold text-glow-gold">Risk</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>High-impact economic releases can move currency prices sharply in a matter of seconds. Common examples include:</p>
              <div className="flex flex-wrap gap-2">
                {["US Nonfarm Payrolls", "CPI", "PCE inflation", "Federal Reserve decisions", "central-bank rate decisions", "GDP releases", "employment data"].map((item) => (
                  <span key={item} className="text-xs font-semibold text-trading-gold/80 bg-trading-gold/5 border border-trading-gold/20 rounded-full px-3 py-1">{item}</span>
                ))}
              </div>
              <p>During these releases, market conditions can deteriorate quickly:</p>
              <ul className="space-y-1">
                {[
                  "spreads can widen sharply",
                  "price can gap past the stop",
                  "slippage can be significant",
                  "liquidity can thin out temporarily",
                  "initial moves can reverse within minutes",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <AlertTriangle className="w-4 h-4 text-trading-red shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>Before placing a trade, check the economic calendar. Holding a position through a major release is a deliberate decision, not a default one.</p>
            </div>
          </div>
        </FadeSection>

        {/* EUR/USD AND GBP/USD */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Risk Management for </span>
              <span className="text-trading-gold text-glow-gold">EUR/USD and GBP/USD</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>EUR/USD and GBP/USD are two of the most-traded forex pairs. They are also correlated, because both have the US dollar on one side.</p>
              <p>For risk management, this matters in two ways:</p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                  <span>Contract specifications such as pip value, lot size and margin are usually similar across major brokers, but they still need to be verified on your own platform.</span>
                </li>
                <li className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                  <AlertTriangle className="w-4 h-4 text-trading-red shrink-0 mt-1" />
                  <span>Because the pairs are correlated, opening same-direction positions on both stacks exposure to the same underlying driver.</span>
                </li>
              </ul>
              <p>For higher-impact US data, both pairs can move together in seconds. Position sizing and total exposure should reflect that correlation.</p>
              <p>
                For educational trade ideas and market observations on these and other pairs, visit our{" "}
                <Link href="/forex-signals/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors font-medium">
                  Forex Signals
                </Link>{" "}
                page.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* WHAT ABOUT XAUUSD */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">What About </span>
              <span className="text-trading-gold text-glow-gold">XAUUSD?</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Gold, traded as XAUUSD, has different contract specifications from forex pairs. The contract size, tick value, pip definition and margin requirement are not the same as EUR/USD.</p>
              <p>That means the lot-size calculations shown earlier in this article do not transfer directly to gold. A 0.10 lot position on XAUUSD does not produce the same loss per point as a 0.10 lot position on EUR/USD.</p>
              <p>
                For a dedicated walkthrough of gold position sizing &mdash; contract specifications, tick value, margin and worked examples &mdash; read our{" "}
                <Link href="/xauusd-lot-size/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors font-medium">
                  XAUUSD Lot Size
                </Link>{" "}
                guide.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* FULL PROCESS EXAMPLE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Forex Risk Management Example: </span>
              <span className="text-trading-gold text-glow-gold">Full Process</span>
            </h2>
            <div className="glass rounded-2xl p-5 border border-trading-gold/20 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-trading-gold" />
                <span className="text-sm font-bold text-trading-gold uppercase tracking-wider">
                  Hypothetical Educational Example — Not a Live Signal
                </span>
              </div>
              <div className="font-mono text-sm text-foreground space-y-1">
                <p><strong className="text-trading-green">EUR/USD BUY</strong></p>
                <p><strong>Entry:</strong> 1.1000</p>
                <p><strong>Stop Loss:</strong> 1.0970 (30 pips)</p>
                <p><strong>Target:</strong> 1.1060 (60 pips)</p>
                <p><strong>Account equity:</strong> $5,000 (hypothetical)</p>
                <p><strong>Monetary risk chosen by the trader:</strong> $60</p>
              </div>
            </div>
            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p><strong className="text-foreground">Step 1 &mdash; Risk decided:</strong> The trader is willing to lose $60 on this trade.</p>
              <p><strong className="text-foreground">Step 2 &mdash; Stop distance measured:</strong> 30 pips from entry to the Stop Loss.</p>
              <p><strong className="text-foreground">Step 3 &mdash; Position size calculated:</strong> If one standard lot of EUR/USD is worth roughly $10 per pip on this account, then a 30-pip stop risks $300 per lot. To keep the loss inside $60, the position size is $60 &divide; $300 = 0.20 lots.</p>
              <p><strong className="text-foreground">Step 4 &mdash; Exposure reviewed:</strong> The trader checks free margin, checks for correlated open positions, and confirms no major US data is due before entry.</p>
              <p><strong className="text-foreground">Step 5 &mdash; Order placed:</strong> The position is opened with the Stop Loss attached. The trade-management plan (move to BE, partial closes, target) is decided before entry.</p>
              <p className="text-sm text-muted-foreground/80">This is a hypothetical educational example. The dollar-per-pip value, contract size, pip definition and minimum lot differ by broker, account type and instrument. The $60 risk and $5,000 equity are illustrative numbers, not recommendations. Always verify the contract specification on your own platform before relying on any calculation.</p>
            </div>
          </div>
        </FadeSection>

        {/* MINIMUM LOT TOO LARGE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">What If the Minimum Lot Size Is </span>
              <span className="text-trading-gold text-glow-gold">Still Too Large?</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Every broker sets a minimum lot size (often 0.01 lots) and a minimum step between sizes. Sometimes the calculation produces a position smaller than the broker minimum, or a size that still implies more risk than the trader wants.</p>
              <p>In that situation, do not simply round up to the minimum and accept the higher risk. Options include:</p>
              <ul className="space-y-1">
                {[
                  "skip the trade, because the risk is too large for the account",
                  "wait for a setup with a tighter stop that produces an acceptable lot size",
                  "use a broker or account type that supports smaller position sizes",
                  "reduce risk elsewhere by closing or reducing other open positions",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground/90 font-medium">
                The correct response to a lot that is too large is not to take the trade anyway. It is to recognise that the risk does not fit the account.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* COMMON MISTAKES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Common Forex Risk Management </span>
              <span className="text-trading-gold text-glow-gold">Mistakes</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {commonMistakes.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.04}>
                  <div className="glass-strong rounded-2xl p-5 gradient-border h-full flex flex-col gap-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-trading-red/10 to-transparent flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-trading-red" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
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
                  <span className="text-foreground">Forex Risk Management </span>
                  <span className="text-trading-green text-glow-green">Checklist</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {checklistItems.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm md:text-base text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeSection>

        {/* SIMPLE ROUTINE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">A Simple Forex Risk Management </span>
              <span className="text-trading-gold text-glow-gold">Routine</span>
            </h2>
            <div className="space-y-4">
              {routine.map((item, i) => (
                <FadeIn key={item.step} delay={i * 0.04}>
                  <div className="glass-strong rounded-2xl p-5 gradient-border flex gap-4 items-start">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-trading-gold/15 to-trading-green/10 flex items-center justify-center">
                      <span className="text-base font-extrabold text-trading-gold">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* FOLLOWING FOREXWIZARD SIGNALS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Risk Management When Following </span>
              <span className="text-trading-gold text-glow-gold">ForexWizard Signals</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>ForexWizard publishes educational forex trade ideas. The signals are a starting point for your own analysis &mdash; not a replacement for it.</p>
              <p>When following any ForexWizard signal, the responsibility for risk management stays with you:</p>
              <ul className="space-y-1">
                {[
                  "decide your own risk before opening the trade",
                  "calculate your own position size from your own account",
                  "verify the signal is still active before entering",
                  "review total exposure and correlated positions",
                  "check the economic calendar",
                  "follow provider updates after entry",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                For the full set of educational trade ideas and market observations, visit our{" "}
                <Link href="/forex-signals/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors font-medium">
                  Forex Signals
                </Link>{" "}
                page. For execution guidance on entry ranges, late entries and signal updates, read our{" "}
                <Link href="/blog/how-to-follow-forex-signals/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors font-medium">
                  how to follow forex signals
                </Link>{" "}
                guide.
              </p>
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
                Risk management is one part of a trader&apos;s education. To go further, learn how to read and execute forex signals, and how to size positions on gold. For trading-risk information, read the{" "}
                <Link href="/risk-disclosure/" className="text-trading-red underline underline-offset-2 hover:text-trading-red/80 transition-colors font-medium">
                  ForexWizard Risk Disclosure
                </Link>
                .
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
                <p>This article is provided for educational and informational purposes only. It does not constitute financial, investment or trading advice, and it does not recommend any specific risk percentage, lot size, leverage level, or instrument.</p>
                <p>All examples in this article are explicitly hypothetical and educational. They are not live signals, recommendations, or predictions of future market behaviour.</p>
                <p>Prices can move rapidly. Spreads can widen. Slippage can occur. Stop-loss orders may execute at a different level from the requested price during fast market conditions. Leverage can magnify both gains and losses.</p>
                <p>Use your own analysis and risk controls before placing any trade. Past performance does not guarantee future results.</p>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-trading-gold" /> Sources &amp; Methodology
              </h2>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                  Platform terminology for market orders, pending orders, Stop Loss and Take Profit behaviour, margin, free margin and margin level was checked against official{" "}
                  <a href="https://www.metatrader5.com/en/terminal/help/trading/performing_deals" target="_blank" rel="noopener noreferrer" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">
                    MetaTrader 5 documentation
                  </a>
                  .
                </p>
                <p>
                  General retail-forex risk considerations &mdash; including leverage, margin and the risks of over-the-counter forex trading &mdash; are consistent with public{" "}
                  <a href="https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/CustomerAdvisory_MustKnowForex.html" target="_blank" rel="noopener noreferrer" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">
                    CFTC educational guidance
                  </a>
                  .
                </p>
                <p>
                  All calculations, examples and numbers in this article are hypothetical and educational. Contract specifications, pip definitions, tick values, lot sizes and margin requirements vary by broker, account type, jurisdiction and instrument, and must be verified on your own trading platform before any live use.
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
                signals, market observations and trading-related education.
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
