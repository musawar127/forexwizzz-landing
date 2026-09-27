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
  Activity,
  Calculator,
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

const post = getBlogPost("how-to-read-forex-signals")!;

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
const anatomyTable = [
  { field: "Instrument", meaning: "The market being traded", check: "Make sure you selected the correct symbol" },
  { field: "BUY / SELL", meaning: "Direction of the trade idea", check: "Confirm the direction before entering" },
  { field: "Entry", meaning: "Intended entry price or range", check: "Check whether current price is still near it" },
  { field: "Stop Loss (SL)", meaning: "Invalidation/risk level", check: "Know where the trade exits if it fails" },
  { field: "Take Profit (TP)", meaning: "Planned target", check: "Understand whether the provider uses one or several targets" },
  { field: "Status / Update", meaning: "Whether the idea is active, changed or closed", check: "Read new updates before acting" },
  { field: "Timestamp", meaning: "When the signal was posted", check: "Avoid treating old signals as fresh" },
];

const abbreviationsTable = [
  { abbr: "SL", meaning: "Stop Loss" },
  { abbr: "TP", meaning: "Take Profit" },
  { abbr: "TP1", meaning: "First Take-Profit Target" },
  { abbr: "TP2", meaning: "Second Take-Profit Target" },
  { abbr: "TP3", meaning: "Third Take-Profit Target" },
  { abbr: "TP4", meaning: "Fourth Take-Profit Target" },
  { abbr: "BE", meaning: "Break-Even" },
  { abbr: "R:R", meaning: "Risk-to-Reward" },
  { abbr: "CMP", meaning: "Current Market Price" },
  { abbr: "BUY", meaning: "Long-direction trade idea" },
  { abbr: "SELL", meaning: "Short-direction trade idea" },
];

const checklistItems = [
  "Correct instrument?",
  "Correct BUY or SELL direction?",
  "Signal still active?",
  "Current price still near entry?",
  "Stop Loss identified?",
  "TP levels understood?",
  "Position size calculated independently?",
  "Broker spread/execution reasonable?",
  "Major economic news approaching?",
  "Signal updates checked?",
  "Maximum potential loss understood?",
];

const commonMistakes = [
  { title: "Entering the Wrong Direction", desc: "Always verify BUY or SELL before submitting." },
  { title: "Chasing a Missed Entry", desc: "If price moved materially away from the entry, the original setup has changed." },
  { title: "Ignoring the Stop Loss", desc: "A signal without defined risk can expose the account to much larger losses." },
  { title: "Copying Someone Else's Lot Size", desc: "Position size should reflect your own account and stop distance." },
  { title: "Ignoring Signal Updates", desc: "A provider may close or modify a trade before the original TP or SL." },
  { title: "Moving the Stop Further Away", desc: "Increasing the distance to the stop after entry increases the risk beyond the original plan." },
  { title: "Assuming TP Is Guaranteed", desc: "A target is an objective, not a promise that price will reach it." },
  { title: "Treating BE as Literally Risk-Free", desc: "Spread, commission and slippage can cause a small result around entry." },
  { title: "Trading During Major News Without Knowing It", desc: "Economic releases can produce rapid volatility and execution differences." },
];

const faqs = [
  {
    q: "How do you read a forex signal?",
    a: "Start by identifying the instrument, BUY or SELL direction, entry price or range, Stop Loss and Take Profit levels. Then check whether the signal is still active and whether current price remains close to the original entry.",
  },
  {
    q: "What does SL mean in forex signals?",
    a: "SL means Stop Loss. It is a predefined exit level intended to limit the loss if the market moves against the trade idea.",
  },
  {
    q: "What does TP mean in forex signals?",
    a: "TP means Take Profit. It identifies a planned target where some or all of a position may be closed if price moves favorably.",
  },
  {
    q: "What do TP1, TP2, TP3 and TP4 mean?",
    a: "They are sequential take-profit targets. TP1 is the first target, TP2 the second, and so on. How much of the position is closed at each target depends on the trader or signal provider's management plan.",
  },
  {
    q: "What does BE mean in forex?",
    a: "BE means Break-Even. Moving SL to BE usually means moving the stop to approximately the original entry price. Trading costs and execution can still produce a small gain or loss.",
  },
  {
    q: "What is an entry range in forex signals?",
    a: "An entry range identifies a price zone rather than one exact entry. If price moves materially away from the range before you enter, the original risk/reward relationship may change.",
  },
  {
    q: "What should I do if I miss a forex signal entry?",
    a: "Check whether the signal is still active and compare current price with the original entry. If price has already moved materially, avoid assuming that entering late creates the same trade.",
  },
  {
    q: "What does \u201cmove SL to BE\u201d mean?",
    a: "It means moving the stop-loss level toward the original entry price after the trade has moved favorably, typically to reduce the remaining downside.",
  },
  {
    q: "Can a forex signal guarantee profit?",
    a: "No. A forex signal is a trade idea, not a guarantee. Markets can move against any setup.",
  },
  {
    q: "Should I copy the lot size shown by another trader?",
    a: "No. Position size depends on your account, stop distance, broker specifications and individual risk tolerance.",
  },
];

const continueLearning = [
  {
    href: "/forex-signals/",
    title: "Forex Signals",
    desc: "The main ForexWizard Forex Signals hub — educational trade ideas, currency-pair analysis and market observations.",
    icon: <Newspaper className="w-7 h-7 text-trading-green" />,
    accent: "from-trading-green/10 to-transparent",
  },
  {
    href: "/xauusd-analysis/",
    title: "XAUUSD Analysis",
    desc: "Gold market analysis covering price action, key levels, market structure and trading sessions.",
    icon: <LineChart className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/risk-disclosure/",
    title: "Risk Disclosure",
    desc: "Understand the risks of trading forex, gold and leveraged financial instruments before following any signal.",
    icon: <ShieldCheck className="w-7 h-7 text-trading-red" />,
    accent: "from-trading-red/10 to-transparent",
  },
  {
    href: "/about/",
    title: "About ForexWizard",
    desc: "Learn about the ForexWizard community, our educational approach and what to expect.",
    icon: <BookOpen className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-trading-green/10",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function HowToReadForexSignalsPage() {
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
              <span className="text-foreground/80">How to Read Forex Signals</span>
            </nav>

            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-green">
                <Activity className="w-4 h-4" />
                Beginner Educational Guide · Forex Signals
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">
                How to Read Forex Signals: Entry, Stop Loss, Take Profit &
                Break-Even
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground/80 mb-8">
              Published {post.displayDate} · By 
              <Link
                href="/about/"
                className="text-foreground/80 hover:text-trading-green no-underline"
              >
                {post.author.name}
              </Link> 
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
                A forex signal can look confusing when you first see one.
              </p>
              <p>
                A typical message may contain a currency pair, BUY or SELL, an
                entry price or range, a stop loss, several take-profit targets
                and abbreviations such as TP1, TP2, SL and BE.
              </p>
              <p>
                Once you understand what each part means, the format becomes
                much easier to read.
              </p>
              <p>
                This guide explains how to read forex signals step by step, how
                entry ranges work, what multiple take-profit levels mean, how
                break-even is used, and what to check before acting on a
                signal.
              </p>
              <p className="text-foreground/90 font-medium">
                Forex signals are trade ideas, not guarantees. Market prices
                can move quickly, execution can differ between brokers, and
                every trade carries risk.
              </p>
            </div>
          </HeroAnimation>
        </section>

        {/* QUICK ANSWER */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How to Read a Forex Signal: </span>
                <span className="text-trading-gold text-glow-gold">
                  Quick Answer
                </span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                A forex signal normally contains five essential pieces of
                information:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-6">
                <li className="text-base md:text-lg text-muted-foreground">
                  <strong className="text-foreground/90">Instrument or currency pair</strong> — the market being discussed, such as EUR/USD, GBP/USD or XAU/USD.
                </li>
                <li className="text-base md:text-lg text-muted-foreground">
                  <strong className="text-foreground/90">Direction</strong> — BUY if the idea expects price to rise, or SELL if it expects price to fall.
                </li>
                <li className="text-base md:text-lg text-muted-foreground">
                  <strong className="text-foreground/90">Entry</strong> — the price or range where the setup is intended to become active.
                </li>
                <li className="text-base md:text-lg text-muted-foreground">
                  <strong className="text-foreground/90">Stop Loss (SL)</strong> — the level where the trade idea is considered invalid or where risk is limited.
                </li>
                <li className="text-base md:text-lg text-muted-foreground">
                  <strong className="text-foreground/90">Take Profit (TP)</strong> — one or more target levels where part or all of the position may be closed.
                </li>
              </ol>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-2">
                Some signals also include:
              </p>
              <ul className="space-y-1">
                {[
                  "TP1, TP2, TP3 or TP4",
                  "Break-even instructions",
                  "Entry ranges",
                  "Market-entry instructions such as BUY NOW or SELL NOW",
                  "Pending-order instructions",
                  "Updates such as CLOSE, HOLD or MOVE SL TO BE",
                  "A timestamp or status",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-base md:text-lg text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-base md:text-lg text-foreground/90 font-medium mt-6">
                The most important habit is to read the entire signal before
                placing a trade.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ANATOMY TABLE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Anatomy of a </span>
              <span className="text-trading-gold text-glow-gold">Forex Signal</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              The table below summarises the main fields you will find in a
              typical forex signal and what to check for each one.
            </p>

            <div className="glass-strong rounded-2xl gradient-border overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-trading-gold whitespace-nowrap">
                        Signal Field
                      </th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-trading-gold">
                        Meaning
                      </th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-trading-gold">
                        What to Check
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {anatomyTable.map((row, i) => (
                      <tr
                        key={row.field}
                        className={
                          i < anatomyTable.length - 1
                            ? "border-b border-white/5"
                            : ""
                        }
                      >
                        <td className="px-4 py-4 text-sm md:text-base text-foreground font-semibold whitespace-nowrap align-top">
                          {row.field}
                        </td>
                        <td className="px-4 py-4 text-sm md:text-base text-muted-foreground align-top">
                          {row.meaning}
                        </td>
                        <td className="px-4 py-4 text-sm md:text-base text-muted-foreground align-top">
                          {row.check}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* EXAMPLE SIGNAL */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Example of a </span>
              <span className="text-trading-gold text-glow-gold">Forex Signal</span>
            </h2>
            <div className="glass rounded-2xl p-5 border border-trading-gold/20 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-trading-gold" />
                <span className="text-sm font-bold text-trading-gold uppercase tracking-wider">
                  Hypothetical Educational Example — Not a Current Market Signal
                </span>
              </div>
              <div className="font-mono text-sm md:text-base text-foreground space-y-1">
                <p><strong className="text-trading-green">EUR/USD BUY</strong></p>
                <p><strong>Entry:</strong> 1.1000–1.1010</p>
                <p><strong>Stop Loss:</strong> 1.0970</p>
                <p><strong>TP1:</strong> 1.1040</p>
                <p><strong>TP2:</strong> 1.1070</p>
                <p><strong>TP3:</strong> 1.1100</p>
              </div>
            </div>
            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>EUR/USD identifies the instrument.</p>
              <p>BUY indicates that the trade idea is based on price moving higher.</p>
              <p>The entry range between 1.1000 and 1.1010 identifies the intended activation area.</p>
              <p>The stop loss at 1.0970 defines the downside invalidation/risk level.</p>
              <p>TP1, TP2 and TP3 are progressively higher potential exit targets.</p>
              <p>
                The example demonstrates the structure of a signal only. It does
                not imply that these prices are currently relevant.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* BUY / SELL */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-trading-green" />
                  <h3 className="text-lg md:text-xl font-bold text-foreground">What Does BUY Mean?</h3>
                </div>
                <div className="space-y-3 text-base text-muted-foreground leading-relaxed">
                  <p>BUY means the trade idea is based on price increasing after entry.</p>
                  <p>For a BUY setup:</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>the entry is below the planned profit targets</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>the stop loss will normally be below the entry</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>higher prices benefit the position</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>lower prices move against the position</span></li>
                  </ul>
                  <p>Before placing anything, verify that the signal actually says BUY. Entering a SELL position by mistake changes the trade completely.</p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingDown className="w-6 h-6 text-trading-red" />
                  <h3 className="text-lg md:text-xl font-bold text-foreground">What Does SELL Mean?</h3>
                </div>
                <div className="space-y-3 text-base text-muted-foreground leading-relaxed">
                  <p>SELL means the trade idea is based on price decreasing after entry.</p>
                  <p>For a SELL setup:</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>profit targets are normally below the entry</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>the stop loss will normally be above the entry</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>lower prices benefit the position</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>higher prices move against the position</span></li>
                  </ul>
                  <p>Always confirm the direction before placing the order.</p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ENTRY PRICE / RANGE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">What Is the Entry Price in a </span>
              <span className="text-trading-gold text-glow-gold">Forex Signal?</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The entry identifies where the original trade idea is intended
                to become active. Some signals provide one exact price.
              </p>
              <div className="glass rounded-xl p-4 font-mono text-sm text-foreground">
                Entry: 1.1000
              </div>
              <p>Other signals use an entry range.</p>
              <div className="glass rounded-xl p-4 font-mono text-sm text-foreground">
                Entry: 1.1000–1.1010
              </div>
              <p>
                An entry range gives a zone rather than requiring one exact
                fill. Prices move continuously, so traders may receive slightly
                different execution prices depending on:
              </p>
              <ul className="space-y-1">
                {["broker", "spread", "market volatility", "connection speed", "order type", "the time the order is placed"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                The existence of an entry range does not mean every price inside
                the range must be traded.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ENTRY RANGE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">What Is a Forex Signal </span>
                <span className="text-trading-gold text-glow-gold">Entry Range?</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  An entry range gives two prices that define the area in which
                  the setup was originally intended to be considered.
                </p>
                <div className="glass rounded-xl p-4 font-mono text-sm text-foreground">
                  BUY EUR/USD<br />Entry: 1.1000–1.1010
                </div>
                <p>
                  This means the trade idea was built around that price area
                  rather than one exact number. The important point is that an
                  entry range is still time-sensitive.
                </p>
                <p>
                  If price has already moved far beyond the range, the original
                  risk/reward relationship may no longer exist. Do not assume
                  that an old entry range remains valid indefinitely.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* BUY NOW / SELL NOW */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">What Does BUY NOW or SELL NOW </span>
              <span className="text-trading-gold text-glow-gold">Mean?</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Some signal providers use phrases such as BUY NOW or SELL NOW.
                This generally refers to a market-entry style instruction rather
                than waiting for a future entry price.
              </p>
              <p>
                ForexWizard may also use shorthand such as G BUY NOW or G SELL
                NOW when referring to an immediate gold/XAUUSD market idea.
              </p>
              <p>
                However, market prices can move between the time a message is
                posted and the time it is read. Before entering, check:
              </p>
              <ul className="space-y-1">
                {["how old the message is", "where the current price is", "whether the signal has been updated", "whether the original stop and target still make sense from the current price"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Do not chase a market simply because the original message said
                NOW.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* MARKET VS PENDING ENTRY */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Market Entry vs </span>
              <span className="text-trading-gold text-glow-gold">Pending Entry</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                A market entry is executed around the current available market
                price. A pending order is designed to activate later if price
                reaches a specified level.
              </p>
              <p>
                Pending orders can be useful when the planned entry is away from
                the current market. The exact order types and execution rules
                depend on the platform and broker.
              </p>
              <p>
                The signal should make clear whether the intended entry is
                immediate or conditional.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SL */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-red/10 to-transparent flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7 text-trading-red" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">What Does SL Mean in </span>
                  <span className="text-trading-gold text-glow-gold">Forex Signals?</span>
                </h2>
              </div>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  SL means <strong className="text-foreground/90">Stop Loss</strong>.
                  The stop loss is a predefined level intended to limit the loss
                  if price moves against the trade idea.
                </p>
                <p>For a BUY setup, the stop is normally below the entry. For a SELL setup, the stop is normally above the entry.</p>
                <p>
                  A stop should represent a point where the original setup is no
                  longer valid rather than being moved repeatedly simply because
                  price is getting close to it.
                </p>
                <p>
                  Stop-loss execution is not guaranteed at the exact requested
                  price during fast markets, gaps or unusual execution
                  conditions.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* WHY STOP LOSS MATTERS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Why Stop Loss </span>
              <span className="text-trading-gold text-glow-gold">Matters</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Without a predefined exit, a losing position can continue moving
                further against the trader. A stop loss provides a defined risk
                reference.
              </p>
              <p>
                But the stop alone does not determine whether the position size
                is appropriate. Two traders using the exact same stop can have
                completely different monetary risk if one uses a much larger
                position.
              </p>
              <p>
                That is why stop distance and position size need to be
                considered together.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* TP */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">What Does TP Mean in </span>
              <span className="text-trading-gold text-glow-gold">Forex?</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                TP means <strong className="text-foreground/90">Take Profit</strong>.
                A take-profit level is a planned price where some or all of a
                position may be closed if the market moves in the expected
                direction.
              </p>
              <div className="glass rounded-xl p-4 font-mono text-sm text-foreground space-y-1">
                <p>TP1: 1.1040</p>
                <p>TP2: 1.1070</p>
                <p>TP3: 1.1100</p>
              </div>
              <p>
                Multiple targets allow a trade plan to divide the potential exit
                into stages. There is no universal rule that says every trader
                must close the same percentage at each TP. The provider&apos;s
                instructions and the trader&apos;s own risk plan matter.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* TP1-TP4 */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">What Do TP1, TP2, TP3 and TP4 </span>
              <span className="text-trading-gold text-glow-gold">Mean?</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                When a signal has several take-profit targets, they are usually
                ordered by distance from the entry.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "TP1", desc: "the first target" },
                  { label: "TP2", desc: "the second target" },
                  { label: "TP3", desc: "the third target" },
                  { label: "TP4", desc: "the fourth target" },
                ].map((item) => (
                  <div key={item.label} className="glass rounded-xl px-4 py-3 text-sm md:text-base text-muted-foreground flex items-center gap-2">
                    <Target className="w-4 h-4 text-trading-gold shrink-0" />
                    <strong className="text-foreground">{item.label}</strong> is {item.desc}
                  </div>
                ))}
              </div>
              <p>
                For a BUY trade, each successive target will normally be above
                the previous one. For a SELL trade, each successive target will
                normally be below the previous one.
              </p>
              <p>
                Multiple targets give traders different ways to manage a
                position. Some may close part of the position at earlier targets
                and leave the rest open. Others may use one chosen target. A
                signal provider may also publish specific management
                instructions.
              </p>
              <p>
                Do not assume a universal percentage should be closed at each
                target unless the signal specifically states it.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* BE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">What Does BE Mean in 
                </span>
                <span className="text-trading-gold text-glow-gold">Forex Signals?</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  BE means <strong className="text-foreground/90">Break-Even</strong>.
                  When an update says MOVE SL TO BE or SET BE, it usually means
                  moving the stop loss to or around the original entry price.
                </p>
                <p>
                  The purpose is to reduce the remaining downside if price has
                  already moved favorably.
                </p>
                <div className="glass rounded-xl p-4 text-sm text-muted-foreground space-y-1">
                  <p><strong className="text-foreground">Entry:</strong> 1.1000</p>
                  <p><strong className="text-foreground">Original SL:</strong> 1.0970</p>
                  <p>Price reaches a first target. An update says: <strong className="text-foreground">Move SL to BE</strong></p>
                  <p>The stop may then be changed from 1.0970 to approximately the entry at 1.1000.</p>
                </div>
                <p className="text-foreground/90 font-medium">
                  However, break-even does NOT literally guarantee a zero
                  result. Spread, commission, swaps, slippage and execution
                  differences can cause a small gain or loss. Use the phrase
                  &ldquo;approximately break-even&rdquo; where appropriate. Do
                  NOT call it guaranteed zero risk.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* WHEN TO MOVE TO BE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">When Should a Stop Be Moved to 
              </span>
              <span className="text-trading-gold text-glow-gold">Break-Even?</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>There is no universal rule. A signal provider may specify when to move the stop.</p>
              <div className="glass rounded-xl p-4 font-mono text-sm text-foreground">
                TP1 reached — move SL to BE
              </div>
              <p>
                If no management instruction has been provided, traders should
                not assume a particular break-even rule automatically applies.
              </p>
              <p>
                Moving a stop too early can reduce downside exposure, but it can
                also cause the remaining position to close during a normal
                pullback before price continues. This is a trade-management
                decision, not a guaranteed improvement.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* CLOSE WORST / HOLD BEST */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">
                  What Does &ldquo;Close Your Worst Position&rdquo; Mean?
                </h3>
                <div className="space-y-3 text-base text-muted-foreground leading-relaxed">
                  <p>
                    Some signal updates are designed for traders who entered
                    more than one position. An instruction such as CLOSE YOUR
                    WORST POSITION normally means reducing exposure by closing
                    the least favorable open fill while keeping another
                    position active.
                  </p>
                  <p>
                    What counts as the least favorable fill depends on
                    direction. For a BUY, a higher entry is generally less
                    favorable. For a SELL, a lower entry is generally less
                    favorable.
                  </p>
                  <p>
                    However, signal providers may use their own
                    position-management sequence. If a ForexWizard update
                    identifies which position should be closed or held, follow
                    the exact wording of that update.
                  </p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">
                  What Does &ldquo;Hold the Best Entry&rdquo; Mean?
                </h3>
                <div className="space-y-3 text-base text-muted-foreground leading-relaxed">
                  <p>
                    When several entries are open, the best entry generally
                    means the fill with the more favorable price relative to the
                    trade direction.
                  </p>
                  <p>
                    For a BUY: a lower entry is normally more favorable. For a
                    SELL: a higher entry is normally more favorable.
                  </p>
                  <p>
                    The purpose of closing some positions while holding another
                    is usually to reduce exposure while keeping part of the
                    trade active. Exact management depends on the signal
                    instructions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* MULTIPLE ENTRIES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">How Multiple Entries </span>
              <span className="text-trading-gold text-glow-gold">Work</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Some traders divide one planned position into several smaller
                entries within an entry zone. For example, instead of entering
                the full intended size at one price inside a range, the trader
                may split exposure across more than one fill.
              </p>
              <p>This changes trade management. Each fill can have a different:</p>
              <ul className="space-y-1">
                {["entry price", "unrealized profit or loss", "distance to stop", "risk/reward profile"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Splitting entries does not reduce total risk automatically. The
                total combined position size still matters.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* LATE ENTRY */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">What If Price Has Already Moved Away From 
                </span>
                <span className="text-trading-gold text-glow-gold">the Signal Entry?</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  This is one of the most important situations for beginners.
                  Suppose a BUY signal was posted with:
                </p>
                <div className="glass rounded-xl p-4 font-mono text-sm text-foreground">
                  Entry: 1.1000–1.1010
                </div>
                <p>But when you see it, price is already at 1.1050.</p>
                <p>Entering at 1.1050 is not the same trade. Your:</p>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-trading-red shrink-0 mt-1" /><span>distance to stop has changed</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-trading-red shrink-0 mt-1" /><span>remaining distance to target has changed</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-trading-red shrink-0 mt-1" /><span>risk/reward relationship has changed</span></li>
                </ul>
                <p>
                  A signal should therefore not be treated as permanently valid
                  merely because the message remains visible.
                </p>
                <p>Before considering a late entry:</p>
                <ul className="space-y-1">
                  {["confirm whether the signal is still active", "check for provider updates", "compare current price with the original range", "recalculate the risk", "consider whether the remaining target distance still makes sense"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  If the original entry has been missed materially, skipping the
                  trade may be more sensible than chasing price.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* CLOSE NOW */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">What Does &ldquo;Close Now&rdquo; 
              </span>
              <span className="text-trading-gold text-glow-gold">Mean?</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                CLOSE NOW means the provider is communicating that the open
                position should no longer be managed according to the original
                target plan.
              </p>
              <p>Possible reasons could include:</p>
              <ul className="space-y-1">
                {["market structure changed", "economic news changed conditions", "volatility increased", "the original thesis was invalidated", "risk needs to be reduced"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <AlertTriangle className="w-4 h-4 text-trading-red shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Do not assume that a signal must remain open until either TP or
                SL. Trade-management updates can change the plan.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ABBREVIATIONS TABLE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Common Forex Signal 
              </span>
              <span className="text-trading-gold text-glow-gold">Abbreviations</span>
            </h2>

            <div className="glass-strong rounded-2xl gradient-border overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-trading-gold whitespace-nowrap">
                        Abbreviation
                      </th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-trading-gold">
                        Meaning
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {abbreviationsTable.map((row, i) => (
                      <tr
                        key={row.abbr}
                        className={
                          i < abbreviationsTable.length - 1
                            ? "border-b border-white/5"
                            : ""
                        }
                      >
                        <td className="px-4 py-3 text-sm md:text-base text-foreground font-bold whitespace-nowrap">
                          {row.abbr}
                        </td>
                        <td className="px-4 py-3 text-sm md:text-base text-muted-foreground">
                          {row.meaning}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Signal terminology is not completely standardized. Providers may
              use different shorthand, so read their own instructions before
              assuming an abbreviation has a particular meaning.
            </p>
          </div>
        </FadeSection>

        {/* STEP BY STEP */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">How to Read a Forex Signal 
              </span>
              <span className="text-trading-gold text-glow-gold">Step by Step</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              Use this practical process.
            </p>

            <div className="space-y-5">
              {[
                { step: "Step 1", title: "Check the Instrument", points: ["Confirm the exact market.", "EUR/USD and GBP/USD are different instruments.", "XAU/USD refers to gold against the US dollar.", "Do not place the trade until the symbol matches the signal."] },
                { step: "Step 2", title: "Check BUY or SELL", points: ["Confirm the direction before entering.", "A direction mistake completely changes the trade."] },
                { step: "Step 3", title: "Check the Entry", points: ["Determine whether the signal uses exact entry, entry range, market entry, or pending order.", "Then check whether current price is still reasonably close to the intended entry."] },
                { step: "Step 4", title: "Find the Stop Loss", points: ["Know where the trade idea becomes invalid and how far the stop is from the planned entry.", "Do this before selecting position size."] },
                { step: "Step 5", title: "Read Every Take-Profit Level", points: ["Identify whether the signal has one TP, several targets, partial-close instructions, or later management instructions."] },
                { step: "Step 6", title: "Check the Timestamp and Status", points: ["A technically valid signal can become stale.", "Confirm that the message is still active and has not been closed or replaced."] },
                { step: "Step 7", title: "Check Upcoming Economic Events", points: ["High-impact economic releases can cause rapid changes in price, spread, execution, slippage and volatility.", "Do not treat a signal as isolated from market conditions."] },
                { step: "Step 8", title: "Determine Your Own Position Size", points: ["Do not copy another person's lot size automatically.", "Position size depends on account size, stop distance, broker specifications and personal risk tolerance.", "The signal tells you the trade idea. It does not determine what financial risk is appropriate for your account."] },
                { step: "Step 9", title: "Read Updates After Entry", points: ["Signal management may include TP1 reached, move SL to BE, close part, close now, hold, or cancel pending entry.", "Do not read only the first message and ignore later updates."] },
              ].map((item, i) => (
                <FadeIn key={item.step} delay={i * 0.04}>
                  <div className="glass-strong rounded-2xl p-6 gradient-border flex gap-5">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-trading-gold/15 to-trading-green/10 flex items-center justify-center">
                      <span className="text-lg font-extrabold text-trading-gold">{i + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-trading-green/80 mb-1">{item.step}</p>
                      <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                      <ul className="space-y-1">
                        {item.points.map((pt) => (
                          <li key={pt} className="text-sm md:text-base text-muted-foreground flex items-start gap-2">
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

        {/* MT5 */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How to Enter a Forex Signal in 
                </span>
                <span className="text-trading-gold text-glow-gold">MetaTrader 5</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>A basic MetaTrader 5 workflow is:</p>
                <ol className="list-decimal list-inside space-y-1">
                  {[
                    "Open the correct symbol.",
                    "Select New Order.",
                    "Verify BUY or SELL.",
                    "Choose the appropriate market or pending-order type.",
                    "Enter the position volume.",
                    "Add the planned Stop Loss.",
                    "Add the Take Profit where appropriate.",
                    "Check all fields again.",
                    "Submit the order.",
                    "Monitor subsequent management instructions.",
                  ].map((item) => (
                    <li key={item} className="text-base md:text-lg text-muted-foreground">{item}</li>
                  ))}
                </ol>
                <p>
                  MetaTrader 5 allows Stop Loss and Take Profit levels to be
                  attached to positions and pending orders. How multiple
                  take-profit targets are managed can depend on the broker,
                  account mode and execution approach. Traders may use separate
                  positions or partial position closures to manage multiple
                  targets.
                </p>
                <p>
                  Do not claim that every MT5 account handles multiple targets
                  identically. Platform terminology was checked against 
                  <a
                    href="https://www.metatrader5.com/en/terminal/help/trading/performing_deals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    official MetaTrader 5 documentation
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* FOREXWIZARD SIGNAL FORMAT */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">ForexWizard Signal 
                </span>
                <span className="text-trading-gold text-glow-gold">Format Explained</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  ForexWizard signals may contain formatting similar to:
                </p>
                <div className="glass rounded-xl p-4 font-mono text-sm text-foreground space-y-1">
                  <p><strong className="text-trading-green">GOLD BUY</strong></p>
                  <p>ENTRY: [price or range]</p>
                  <p>SL: [stop]</p>
                  <p>TP1: [target]</p>
                  <p>TP2: [target]</p>
                  <p>TP3: [target]</p>
                  <p>TP4: [target]</p>
                </div>
                <p>Possible updates may include:</p>
                <div className="flex flex-wrap gap-2">
                  {["BUY NOW / SELL NOW", "TP1 REACHED", "MOVE SL TO BE", "CLOSE WORST POSITION", "HOLD", "CLOSE NOW"].map((item) => (
                    <span key={item} className="text-xs font-semibold text-trading-green/80 bg-trading-green/5 border border-trading-green/20 rounded-full px-3 py-1">{item}</span>
                  ))}
                </div>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>entry describes intended activation area</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>SL defines the risk/invalidation level</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>TP1–TP4 are progressive targets</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>BE means approximately break-even around entry, subject to trading costs/execution</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>management instructions can change the original plan</span></li>
                </ul>
                <p className="text-foreground/90 font-medium">
                  Do not use real current trade prices in this example. Do not
                  imply guaranteed performance.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* RISK-TO-REWARD */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Risk-to-Reward When Reading 
              </span>
              <span className="text-trading-gold text-glow-gold">a Signal</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                A signal should not be evaluated only by whether it says BUY or
                SELL. The relationship between potential loss and potential
                target distance also matters.
              </p>
              <p>
                For example, if the stop is very far from entry but the
                remaining target is very close, the trade may have a very
                different risk profile from the original setup. This is
                especially important for late entries.
              </p>
              <p>
                Do not publish a universal &ldquo;good&rdquo; R:R number. The
                concept matters, but no single fixed ratio is correct for every
                trader or every market condition.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* POSITION SIZE / LEVERAGE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="w-6 h-6 text-trading-gold" />
                  <h3 className="text-lg font-bold text-foreground">Position Size Is Not Part of the Signal</h3>
                </div>
                <div className="space-y-3 text-base text-muted-foreground leading-relaxed">
                  <p>One trader may have a $500 account. Another may have a $50,000 account.</p>
                  <p>Using the same lot size would produce very different account-level risk.</p>
                  <p>That is why traders should not copy another person&apos;s lot size simply because they are following the same signal. The appropriate size depends on the individual account and broker specifications.</p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-trading-red" />
                  <h3 className="text-lg font-bold text-foreground">Leverage Does Not Make a Trade Safer</h3>
                </div>
                <div className="space-y-3 text-base text-muted-foreground leading-relaxed">
                  <p>Leverage reduces how much margin may be required to control a position. It does not reduce the market exposure created by that position.</p>
                  <p>Higher leverage can make it easier to open exposure that is too large for the account.</p>
                  <p>Risk should therefore be evaluated from the possible loss, not simply from how little margin the broker requires.</p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* COMMON MISTAKES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Common Mistakes When Following 
              </span>
              <span className="text-trading-gold text-glow-gold">Forex Signals</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {commonMistakes.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.04}>
                  <div className="glass-strong rounded-2xl p-6 gradient-border h-full flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-trading-red/10 to-transparent flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-trading-red" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">{item.title}</h3>
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
                  <span className="text-foreground">Forex Signal Checklist 
                  </span>
                  <span className="text-trading-green text-glow-green">Before Entering</span>
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

        {/* SHOULD BEGINNERS USE SIGNALS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Should Beginners Use 
              </span>
              <span className="text-trading-gold text-glow-gold">Forex Signals?</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Forex signals can be educational when they help beginners
                understand how trade ideas are structured. But they should not
                replace learning.
              </p>
              <p>A beginner should aim to understand:</p>
              <ul className="space-y-1">
                {["why a setup exists", "where it becomes invalid", "what market structure supports it", "what risk is being taken", "how economic events can affect it"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Blindly copying signals without understanding those factors can
                create problems when market conditions change. For ongoing
                educational market updates, readers can visit our 
                <Link href="/forex-signals/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">Forex Signals</Link> 
                page.
              </p>
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

        {/* CONTINUE LEARNING */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Continue </span>
              <span className="text-trading-gold text-glow-gold">Learning</span>
            </h2>
            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              <p>
                To see educational trade ideas and market observations, visit
                our 
                <Link href="/forex-signals/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">Forex Signals</Link> 
                page. Readers interested specifically in gold can explore our 
                <Link href="/xauusd-analysis/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">XAUUSD Analysis</Link> 
                section. For information about trading risks, read the 
                <Link href="/risk-disclosure/" className="text-trading-red underline underline-offset-2 hover:text-trading-red/80 transition-colors">ForexWizard Risk Disclosure</Link>.
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

        {/* RISK DISCLAIMER + SOURCES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="glass rounded-2xl border border-trading-red/20 p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-trading-red mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Risk Disclaimer
              </h2>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>Trading forex, gold and leveraged financial instruments involves substantial risk and may not be suitable for everyone.</p>
                <p>Forex signals and market commentary are provided for educational and informational purposes only. They are not guarantees of market direction, execution or profit.</p>
                <p>Stop-loss orders may not execute at the exact requested level during fast markets, gaps or unusual market conditions. Leverage can magnify both gains and losses.</p>
                <p>Never risk funds you cannot afford to lose. Perform your own analysis and verify all order details and broker specifications before placing a trade.</p>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-trading-gold" /> Sources &amp; Platform Note
              </h2>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                  Platform terminology was checked against official 
                  <a href="https://www.metatrader5.com/en/terminal/help/trading/performing_deals" target="_blank" rel="noopener noreferrer" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">MetaTrader 5 documentation</a>
                  , which confirms that Stop Loss and Take Profit can be attached to open positions and pending orders and describes pending-order execution.
                </p>
                <p>
                  General retail-forex risk considerations are consistent with public 
                  <a href="https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/CustomerAdvisory_MustKnowForex.html" target="_blank" rel="noopener noreferrer" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">CFTC educational guidance</a>
                  , which emphasizes that leveraged retail forex trading carries substantial risk.
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

        {/* FOOTER */}
        <SiteFooter />
      </main>

      <StickyTelegramButton href={TELEGRAM_LINK} label="Join Forex Wizard on Telegram" />
    </>
  );
}
