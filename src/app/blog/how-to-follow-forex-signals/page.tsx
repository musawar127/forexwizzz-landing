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

const post = getBlogPost("how-to-follow-forex-signals")!;

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
const checklistItems = [
  "Correct instrument?",
  "Correct BUY/SELL direction?",
  "Signal still active?",
  "Timestamp checked?",
  "Current price close to original entry?",
  "Entry range still valid?",
  "Stop Loss identified?",
  "Remaining TP distance checked?",
  "Position size based on own account?",
  "Total exposure checked?",
  "Spread reasonable?",
  "Major news approaching?",
  "Latest provider update checked?",
  "Comfortable skipping if setup has changed?",
];

const skipReasons = [
  "price moved far from the entry",
  "the provider cancelled the setup",
  "the target was already reached",
  "Stop Loss was already hit",
  "spread widened significantly",
  "high-impact economic news is about to be released",
  "signal instructions are unclear",
  "your position size would create unacceptable account risk",
  "the setup no longer matches the original structure",
  "you cannot monitor the trade or its updates",
];

const commonMistakes = [
  { title: "Entering without checking the timestamp", desc: "Old signals may no longer be active." },
  { title: "Chasing price", desc: "A late entry can materially change risk/reward." },
  { title: "Ignoring provider updates", desc: "The trade-management plan may have changed." },
  { title: "Copying another member's lot size", desc: "Account-level risk differs." },
  { title: "Opening too many positions", desc: "Several small orders can create large combined exposure." },
  { title: "Moving Stop Loss further away", desc: "This increases risk beyond the original plan." },
  { title: "Entering just before major news", desc: "Market conditions can change rapidly." },
  { title: "Assuming break-even means guaranteed zero loss", desc: "Trading costs and execution matter." },
  { title: "Assuming every broker price is identical", desc: "Quotes and spreads vary." },
];

const faqs = [
  {
    q: "How do I follow forex signals correctly?",
    a: "Read the full signal, verify the instrument and direction, check whether the signal is still active, compare current price with the intended entry, review the Stop Loss and Take Profit levels, evaluate your own risk and continue monitoring updates after entry.",
  },
  {
    q: "What happens if I miss the forex signal entry?",
    a: "If price has moved materially away from the original entry, entering later creates a different trade. Check whether the provider issued an updated entry and reassess the stop distance and remaining target distance rather than chasing price.",
  },
  {
    q: "What is a forex signal entry range?",
    a: "An entry range is a price zone where the original setup was intended to become active. It provides flexibility around execution but does not remain valid indefinitely.",
  },
  {
    q: "Can I enter after price leaves the signal entry range?",
    a: "You can technically place an order at any available market price, but entering materially outside the original range changes the setup's risk and potential reward. Check the latest signal update and reassess before considering the trade.",
  },
  {
    q: "What should I do if TP1 was already reached?",
    a: "Check the provider's latest update. The trade may already have moved into partial-close or break-even management, and the original entry may no longer apply.",
  },
  {
    q: "What should I do if the signal's Stop Loss was already hit?",
    a: "The original setup has been invalidated under its initial plan. Do not treat the old signal as active simply because price later returns.",
  },
  {
    q: "Should I use the same lot size as the signal provider?",
    a: "Not automatically. Position size should reflect your own account, stop distance, broker specifications and personal risk tolerance.",
  },
  {
    q: "Why do different traders get different entry prices?",
    a: "Broker quotes, spreads, execution speed, slippage and the timing of order submission can create different fills.",
  },
  {
    q: "Should I follow every forex signal?",
    a: "No. A signal can be skipped if the entry is missed, instructions are unclear, market conditions have changed or the trade does not fit your risk constraints.",
  },
  {
    q: "Can forex signals guarantee profit?",
    a: "No. Forex signals are trade ideas and cannot guarantee market direction or profit.",
  },
];

const continueLearning = [
  {
    href: "/blog/how-to-read-forex-signals/",
    title: "How to Read Forex Signals",
    desc: "The prerequisite guide — learn what every signal field means, including entry, SL, TP1–TP4, BE and common abbreviations.",
    icon: <BookOpen className="w-7 h-7 text-trading-green" />,
    accent: "from-trading-green/10 to-transparent",
  },
  {
    href: "/forex-signals/",
    title: "Forex Signals",
    desc: "The main ForexWizard Forex Signals hub — educational trade ideas, currency-pair analysis and market observations.",
    icon: <Newspaper className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
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
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function HowToFollowForexSignalsPage() {
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
              <span className="text-foreground/80">How to Follow Forex Signals</span>
            </nav>

            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-gold">
                <Activity className="w-4 h-4" />
                Execution Guide · Forex Signals
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">How to Follow Forex Signals: Entry Timing, Late Entries &amp; Risk</span>
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
              <p>Receiving a forex signal is only the beginning.</p>
              <p>
                A signal may provide a currency pair, BUY or SELL direction, entry
                price, stop loss and one or more take-profit levels, but the market
                can move between the time the signal is published and the time you
                read it.
              </p>
              <p>That makes execution important.</p>
              <p>
                A trader needs to know whether the signal is still active, whether
                price is still near the intended entry, whether market conditions
                have changed and whether the potential risk still makes sense from
                the current price.
              </p>
              <p>
                This guide explains how to follow forex signals step by step,
                including entry ranges, late entries, market and pending orders,
                signal updates, break-even instructions and situations where
                skipping the setup may be more appropriate than chasing it.
              </p>
              <p className="text-foreground/90 font-medium">
                Forex signals are trade ideas, not guarantees of market direction
                or profit.
              </p>
            </div>
          </HeroAnimation>
        </section>

        {/* QUICK ANSWER */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How to Follow Forex Signals: </span>
                <span className="text-trading-gold text-glow-gold">Quick Answer</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                Before acting on a forex signal:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-6">
                {[
                  "Confirm the correct market or currency pair.",
                  "Verify BUY or SELL.",
                  "Check the timestamp and current status.",
                  "Compare current price with the original entry.",
                  "Confirm Stop Loss and Take Profit levels.",
                  "Determine whether the original risk/reward relationship still exists.",
                  "Check for major economic news.",
                  "Calculate position size for your own account.",
                  "Enter only if the original setup is still relevant.",
                  "Continue monitoring provider updates after entry.",
                ].map((item) => (
                  <li key={item} className="text-base md:text-lg text-muted-foreground">{item}</li>
                ))}
              </ol>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                If price has already moved materially away from the intended entry,
                entering later creates a different trade.
              </p>
              <p className="text-base md:text-lg text-foreground/90 font-medium mt-3">
                Do not assume an old signal remains valid simply because the
                message is still visible.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* UNDERSTAND THE SIGNAL */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Understand the Signal Before </span>
              <span className="text-trading-gold text-glow-gold">Following It</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Before learning execution, you should understand each field in the signal.</p>
              <p>A typical signal might contain:</p>
              <div className="glass rounded-xl p-4 font-mono text-sm text-foreground space-y-1">
                <p><strong className="text-trading-green">EUR/USD BUY</strong></p>
                <p><strong>Entry:</strong> 1.1000–1.1010</p>
                <p><strong>SL:</strong> 1.0970</p>
                <p><strong>TP1:</strong> 1.1040</p>
                <p><strong>TP2:</strong> 1.1070</p>
                <p><strong>TP3:</strong> 1.1100</p>
              </div>
              <p className="text-sm text-muted-foreground/80">This is a hypothetical educational example, not a live signal.</p>
              <p>
                If terms such as entry, SL, TP1–TP4 or BE are unfamiliar, first
                read our complete guide on{" "}
                <Link href="/blog/how-to-read-forex-signals/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors font-medium">
                  how to read forex signals
                </Link>
                . This article should NOT repeat every terminology explanation from that guide.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* STEP 1: CHECK ACTIVE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Step 1: Check Whether the Signal Is </span>
                <span className="text-trading-gold text-glow-gold">Still Active</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>The first question should not be: &ldquo;Where is the Buy button?&rdquo;</p>
                <p>It should be: &ldquo;Is this signal still active?&rdquo;</p>
                <p>Forex prices can change quickly. A signal posted twenty minutes ago may be in a completely different situation from a signal that arrived seconds ago.</p>
                <p>Look for updates such as:</p>
                <div className="flex flex-wrap gap-2">
                  {["ACTIVE", "ENTRY ACTIVE", "CANCEL", "CLOSE", "TP1 REACHED", "MOVE SL TO BE", "HOLD", "DO NOT ENTER", "SIGNAL CLOSED"].map((item) => (
                    <span key={item} className="text-xs font-semibold text-trading-green/80 bg-trading-green/5 border border-trading-green/20 rounded-full px-3 py-1">{item}</span>
                  ))}
                </div>
                <p>If the provider has already cancelled or closed the setup, the original entry should not be treated as current.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* STEP 2: COMPARE PRICE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Step 2: Compare Current Price With </span>
              <span className="text-trading-gold text-glow-gold">the Original Entry</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>The entry is where the original setup was designed to become active.</p>
              <div className="glass rounded-xl p-4 font-mono text-sm text-foreground">
                BUY EUR/USD<br />Entry: 1.1000–1.1010
              </div>
              <p>Suppose you open the signal and current price is 1.1006. Price is still inside the hypothetical entry zone.</p>
              <p>Now imagine current price is 1.1050. That is materially different.</p>
              <p>Entering at 1.1050 changes:</p>
              <ul className="space-y-1">
                {["distance to the stop loss", "distance to the take-profit targets", "potential loss", "remaining potential reward", "overall risk/reward relationship"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <AlertTriangle className="w-4 h-4 text-trading-red shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>The original analysis may still ultimately be directionally correct, but your entry would no longer be the original trade.</p>
            </div>
          </div>
        </FadeSection>

        {/* ENTRY RANGE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Forex Signal Entry Range </span>
              <span className="text-trading-gold text-glow-gold">Explained</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Some forex signals provide a range instead of one exact entry.</p>
              <div className="glass rounded-xl p-4 font-mono text-sm text-foreground">Entry: 1.1000–1.1010</div>
              <p>The range represents the area in which the original trade idea was intended to become active.</p>
              <p>It does NOT mean:</p>
              <ul className="space-y-1">
                {["every price in the range must be traded", "you must open multiple positions", "the range stays valid indefinitely", "price outside the range is automatically acceptable"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <AlertTriangle className="w-4 h-4 text-trading-red shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>An entry range gives flexibility because broker prices, spreads and execution can differ slightly. It does not remove the need to check current market conditions.</p>
            </div>
          </div>
        </FadeSection>

        {/* EXACT VS RANGE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Exact Entry vs </span>
              <span className="text-trading-gold text-glow-gold">Entry Range</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass rounded-xl p-4">
                  <p className="text-sm font-bold text-foreground mb-1">Exact Entry</p>
                  <p className="font-mono text-sm text-muted-foreground">Entry: 1.1000</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-sm font-bold text-foreground mb-1">Entry Range</p>
                  <p className="font-mono text-sm text-muted-foreground">Entry: 1.1000–1.1010</p>
                </div>
              </div>
              <p>An exact entry provides one reference price. A range provides an area.</p>
              <p>Neither format guarantees execution at the stated price. Broker quotes, spreads, slippage and market speed can cause fills to differ.</p>
            </div>
          </div>
        </FadeSection>

        {/* INSIDE / OUTSIDE RANGE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-green mb-4">What If Price Is Inside the Entry Range?</h3>
                <div className="space-y-3 text-base text-muted-foreground leading-relaxed">
                  <p>If price is still within the intended entry range, the signal is closer to its original setup.</p>
                  <p>Even then, check:</p>
                  <ul className="space-y-1">
                    {["whether the signal remains active", "whether the Stop Loss is unchanged", "whether targets remain unchanged", "whether an important economic release is approaching", "whether spread has widened unusually", "whether the provider has issued an update"].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>Being inside the range does not automatically make the trade suitable for every account.</p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-red mb-4">What If Price Has Already Left the Entry Range?</h3>
                <div className="space-y-3 text-base text-muted-foreground leading-relaxed">
                  <p>A signal might say BUY with Entry: 1.1000–1.1010, but current price is already 1.1045.</p>
                  <p>Entering immediately because the signal says BUY means you are entering substantially above the original range.</p>
                  <p>The safer analytical process is:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Check whether the provider issued a new entry.</li>
                    <li>Check whether the signal remains active.</li>
                    <li>Compare current price with the original Stop Loss.</li>
                    <li>Compare current price with the remaining target distance.</li>
                    <li>Reassess risk before doing anything.</li>
                  </ol>
                  <p>Do not chase price merely because you are afraid of missing the move.</p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* LATE ENTRY */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">What Is a Late Entry in </span>
                <span className="text-trading-gold text-glow-gold">Forex Signals?</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>A late entry occurs when a trader enters after price has already moved significantly away from the original entry.</p>
                <p>The important issue is not simply time. A signal can be several minutes old while price remains near the original entry. Another signal can be only seconds old during a volatile release but already move substantially.</p>
                <p>Therefore, late entry is better judged by:</p>
                <ul className="space-y-1">
                  {["price distance", "changed risk", "remaining target distance", "market structure", "signal status"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>rather than the clock alone.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* WHY LATE ENTRIES CHANGE RISK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Why Late Entries Can </span>
              <span className="text-trading-gold text-glow-gold">Change Risk</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Suppose a hypothetical BUY signal has:</p>
              <div className="glass rounded-xl p-4 font-mono text-sm text-foreground space-y-1">
                <p>Entry: 1.1000</p>
                <p>SL: 1.0970</p>
                <p>TP: 1.1060</p>
              </div>
              <p>At the original entry: distance to SL = 30 pips, distance to TP = 60 pips.</p>
              <p>Now imagine a trader enters at 1.1040 while keeping the same stop and target.</p>
              <p>The trade is now very different. The remaining target distance is smaller. The stop distance is larger.</p>
              <p>This illustrates why copying the original SL and TP from a substantially different entry price can materially alter the risk/reward structure.</p>
              <p className="text-sm text-muted-foreground/80">This example is educational only. Do NOT turn it into a universal minimum risk/reward rule.</p>
            </div>
          </div>
        </FadeSection>

        {/* WHEN TO SKIP */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">When Should You Skip </span>
                <span className="text-trading-gold text-glow-gold">a Forex Signal?</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>Skipping a signal can be reasonable when the original setup has materially changed. Possible reasons include:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {skipReasons.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm md:text-base text-muted-foreground">
                      <AlertTriangle className="w-4 h-4 text-trading-red shrink-0 mt-1" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-foreground/90 font-medium">
                  Missing one trade is different from taking a poor-quality late
                  entry. There will always be other market opportunities.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* MARKET VS PENDING ORDER */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Market Order vs </span>
              <span className="text-trading-gold text-glow-gold">Pending Order</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg font-bold text-foreground mb-3">Market Order</h3>
                <div className="space-y-3 text-base text-muted-foreground leading-relaxed">
                  <p>A market order attempts to execute at the currently available price. This may be appropriate when the signal specifically indicates an immediate market-entry setup.</p>
                  <p>However, the actual fill may differ from the price visible when the order was submitted.</p>
                </div>
              </div>
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg font-bold text-foreground mb-3">Pending Order</h3>
                <div className="space-y-3 text-base text-muted-foreground leading-relaxed">
                  <p>A pending order is designed to activate only if price reaches a specified level. Common pending-order concepts include Buy Limit, Sell Limit, Buy Stop and Sell Stop.</p>
                  <p>The correct type depends on the signal structure and trading platform. Do not change a pending-entry signal into an immediate market entry unless you understand how doing so changes the setup.</p>
                </div>
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
              <p>Some providers use BUY NOW or SELL NOW to indicate an immediate market-entry idea. ForexWizard may also use shorthand such as G BUY NOW or G SELL NOW for immediate XAUUSD ideas.</p>
              <p>But &ldquo;NOW&rdquo; describes the situation when the signal was issued. It does not mean the instruction remains current indefinitely.</p>
              <p>If you see the message later, check:</p>
              <ul className="space-y-1">
                {["signal timestamp", "current market price", "latest provider update", "current spread", "proximity to Stop Loss", "remaining distance to targets"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>Do not treat &ldquo;NOW&rdquo; as permission to chase price long after the message was posted.</p>
            </div>
          </div>
        </FadeSection>

        {/* STEP 3: STOP LOSS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Step 3: Check the Stop Loss </span>
              <span className="text-trading-gold text-glow-gold">Before Entering</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Before placing a trade, know the Stop Loss. The stop helps define:</p>
              <ul className="space-y-1">
                {["where the setup becomes invalid", "approximate price risk", "the information needed for position sizing"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-trading-red shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>Do not enter first and look for the stop afterward. If the Stop Loss is unclear, the trade&apos;s potential downside is also unclear.</p>
            </div>
          </div>
        </FadeSection>

        {/* DO NOT MOVE STOP */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl border border-trading-red/20 p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-trading-red mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Do Not Move the Stop Further Away Just to Stay in a Trade
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Suppose the signal&apos;s original stop was chosen because the setup
                would no longer make sense beyond that level. Moving the stop
                significantly further away after entry increases potential loss
                beyond the original plan. Changing a stop should be based on a
                defined strategy or provider update, not on hoping a losing
                position eventually returns.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* STEP 4: TP DISTANCE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Step 4: Check the Remaining </span>
              <span className="text-trading-gold text-glow-gold">Take-Profit Distance</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>A target that made sense from the original entry may become less attractive after price has already moved.</p>
              <p>Before a late entry, compare:</p>
              <ul className="space-y-1">
                {["current price", "first target", "later targets", "stop distance"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <Target className="w-4 h-4 text-trading-gold shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>Do not look only at how far price has already moved in the expected direction. The relevant question is what remains from your actual entry.</p>
            </div>
          </div>
        </FadeSection>

        {/* STEP 5: POSITION SIZE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Step 5: Calculate Position Size </span>
              <span className="text-trading-gold text-glow-gold">Independently</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>A forex signal does not determine the correct lot size for every account. Different followers can have:</p>
              <ul className="space-y-1">
                {["different account balances", "different leverage", "different brokers", "different stop distances", "different personal risk tolerances"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <Calculator className="w-4 h-4 text-trading-gold shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>Do not automatically copy another trader&apos;s position size. The same lot size can represent dramatically different account risk for two people.</p>
              <p>Your position size should be considered using your own account and the actual stop distance from your entry.</p>
              <p>
                For a deeper explanation of position sizing, stop distance,
                leverage and combined account exposure, read our{" "}
                <Link
                  href="/blog/forex-risk-management-for-beginners/"
                  className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors font-medium"
                >
                  forex risk management for beginners
                </Link>{" "}
                guide.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* LEVERAGE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Why Leverage Does Not Reduce </span>
              <span className="text-trading-gold text-glow-gold">Market Risk</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Leverage can reduce the amount of margin required to open a position. It does not reduce the underlying price exposure.</p>
              <p>High leverage can make it easier to open a position that is large relative to an account. That can amplify both gains and losses.</p>
              <p>Risk should therefore be considered from the potential loss if the trade moves to its stop, not simply from the margin required to open it.</p>
            </div>
          </div>
        </FadeSection>

        {/* STEP 6: SPREAD */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Step 6: Check Spread and </span>
              <span className="text-trading-gold text-glow-gold">Execution Conditions</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>A signal provider and follower may use different brokers. That can create small differences in:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {["bid/ask prices", "spread", "entry fill", "Stop Loss execution", "Take Profit execution"].map((item) => (
                  <div key={item} className="glass rounded-xl px-4 py-2 text-sm md:text-base text-muted-foreground flex items-center gap-2">
                    <Activity className="w-4 h-4 text-trading-gold shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <p>This is especially relevant during market open, major economic releases, periods of low liquidity and sudden volatility.</p>
              <p>If spread has expanded substantially, the live conditions may differ from those present when the signal was created.</p>
            </div>
          </div>
        </FadeSection>

        {/* SLIPPAGE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">What Is </span>
              <span className="text-trading-gold text-glow-gold">Slippage?</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Slippage occurs when the executed price differs from the requested price. It can occur during fast-moving conditions when prices change between order submission and execution.</p>
              <p>Slippage can be favorable or unfavorable. For signal followers, this means two people following the same signal can receive different fills.</p>
              <p>Do not assume every member will have an identical result.</p>
            </div>
          </div>
        </FadeSection>

        {/* STEP 7: ECONOMIC CALENDAR */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Step 7: Check the </span>
              <span className="text-trading-gold text-glow-gold">Economic Calendar</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>High-impact economic releases can rapidly change market conditions. Examples include:</p>
              <div className="flex flex-wrap gap-2">
                {["US Nonfarm Payrolls", "CPI", "PCE inflation", "Federal Reserve decisions", "central-bank rate decisions", "major GDP releases", "employment data"].map((item) => (
                  <span key={item} className="text-xs font-semibold text-trading-gold/80 bg-trading-gold/5 border border-trading-gold/20 rounded-full px-3 py-1">{item}</span>
                ))}
              </div>
              <p>Before entering a signal, check whether an important event is approaching. During high-impact releases:</p>
              <ul className="space-y-1">
                {["spreads may widen", "price may move rapidly", "slippage may increase", "technical levels can break quickly", "initial moves may reverse"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <AlertTriangle className="w-4 h-4 text-trading-red shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>A signal should be considered in the context of current market conditions.</p>
            </div>
          </div>
        </FadeSection>

        {/* STEP 8: UPDATES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Step 8: Read Every </span>
              <span className="text-trading-gold text-glow-gold">Signal Update</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Following a signal does not stop after entry. Possible updates include:</p>
              <div className="flex flex-wrap gap-2">
                {["TP1 reached", "move SL to BE", "close partial", "close worst entry", "hold", "change SL", "cancel pending order", "close now"].map((item) => (
                  <span key={item} className="text-xs font-semibold text-trading-green/80 bg-trading-green/5 border border-trading-green/20 rounded-full px-3 py-1">{item}</span>
                ))}
              </div>
              <p>Ignoring later updates can result in following a management plan that is no longer current.</p>
            </div>
          </div>
        </FadeSection>

        {/* BE / CLOSE WORST / HOLD BEST */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-strong rounded-2xl p-6 gradient-border">
                <h3 className="text-base font-bold text-foreground mb-3">What Does &ldquo;Move SL to BE&rdquo; Mean?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  BE means break-even. If a provider says MOVE SL TO BE, the stop may be moved toward the original entry level after price has moved favorably. The purpose is generally to reduce remaining downside exposure. However, break-even is not literally guaranteed to produce exactly zero financial result. Spread, commission, swaps and slippage can produce a small gain or loss around the entry.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-6 gradient-border">
                <h3 className="text-base font-bold text-foreground mb-3">What Does &ldquo;Close Your Worst Position&rdquo; Mean?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This instruction generally applies when more than one position is open. It normally means reducing exposure by closing the least favorable fill and retaining the more favorable one. For a BUY, the higher entry is usually less favorable. For a SELL, the lower entry is usually less favorable. Exact trade-management instructions should always follow the provider&apos;s current update.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-6 gradient-border">
                <h3 className="text-base font-bold text-foreground mb-3">What Does &ldquo;Hold the Best Entry&rdquo; Mean?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The best entry generally refers to the more favorable open fill. For BUY, lower entries are generally more favorable. For SELL, higher entries are generally more favorable. Holding the better entry while reducing other positions can reduce overall exposure while keeping part of the original idea active. This does not guarantee the remaining position will become profitable.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* MULTIPLE POSITIONS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Multiple Positions and </span>
                <span className="text-trading-gold text-glow-gold">Total Risk</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>Opening several small positions does not automatically reduce risk. Consider the TOTAL combined exposure.</p>
                <p>For example, four positions of 0.10 lots create 0.40 lots of combined exposure. The risk should be assessed across the entire group of positions rather than treating each order as unrelated.</p>
                <p className="text-sm text-muted-foreground/80">Do not present this example as a recommendation for any specific lot size.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* STEP BY STEP */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">How to Follow a Forex Signal </span>
              <span className="text-trading-gold text-glow-gold">Step by Step</span>
            </h2>
            <div className="space-y-4">
              {[
                { step: "1", title: "Read the full signal", desc: "Do not act after seeing only BUY or SELL." },
                { step: "2", title: "Check the timestamp", desc: "Confirm the signal is current." },
                { step: "3", title: "Verify status", desc: "Look for cancellations or updates." },
                { step: "4", title: "Confirm the instrument", desc: "Open the exact market specified." },
                { step: "5", title: "Compare price with entry", desc: "Determine whether the original entry is still available." },
                { step: "6", title: "Check Stop Loss", desc: "Understand where the setup becomes invalid." },
                { step: "7", title: "Check Take Profit", desc: "Understand remaining target distance from your actual entry." },
                { step: "8", title: "Calculate your position size", desc: "Use your own account and risk constraints." },
                { step: "9", title: "Check market conditions", desc: "Review spread and scheduled economic events." },
                { step: "10", title: "Monitor updates", desc: "Follow management changes after entry." },
              ].map((item, i) => (
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

        {/* FOREXWIZARD EXAMPLE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">ForexWizard Signal-Following </span>
              <span className="text-trading-gold text-glow-gold">Example</span>
            </h2>
            <div className="glass rounded-2xl p-5 border border-trading-gold/20 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-trading-gold" />
                <span className="text-sm font-bold text-trading-gold uppercase tracking-wider">
                  Hypothetical Educational Example — Not a Live Signal
                </span>
              </div>
              <div className="font-mono text-sm text-foreground space-y-1">
                <p><strong className="text-trading-red">GOLD SELL</strong></p>
                <p><strong>ENTRY:</strong> 4300–4305</p>
                <p><strong>SL:</strong> 4312</p>
                <p><strong>TP1:</strong> 4295</p>
                <p><strong>TP2:</strong> 4290</p>
                <p><strong>TP3:</strong> 4285</p>
                <p><strong>TP4:</strong> 4280</p>
              </div>
            </div>
            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>If gold is still within the intended range and the signal remains active, the setup is closer to its original structure.</p>
              <p>If price has already dropped to 4287 before the trader sees the message, entering then is not equivalent to entering around 4300–4305. TP1 and TP2 may already have been reached. The remaining target distance and stop distance are completely different.</p>
              <p>The correct action is not to recreate the old trade blindly. Check the latest update and reassess the setup.</p>
            </div>
          </div>
        </FadeSection>

        {/* TP / SL ALREADY HIT */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg font-bold text-foreground mb-3">When a Signal Reaches TP Before You Enter</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  If TP1 or another target has already been reached before you entered, do not assume the original entry instructions still apply. The signal may have completed part of its move, moved to break-even management, reached multiple targets, been closed entirely, or produced a new entry update. Always check the latest message.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg font-bold text-foreground mb-3">What If Stop Loss Was Already Hit?</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  If the original Stop Loss was already reached, the original trade idea has been invalidated according to its initial plan. Do not enter the old signal afterward simply because price later returns toward the original entry. That would require a new setup and new analysis.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* MISS THE TRADE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">What If You Miss the Trade </span>
              <span className="text-trading-gold text-glow-gold">Completely?</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Missing a trade is normal. Do not increase risk or chase the next setup because of fear of missing out.</p>
              <p>A missed trade did not create a loss. Taking a poorly timed trade simply to participate can create one.</p>
            </div>
          </div>
        </FadeSection>

        {/* COMMON MISTAKES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Common Mistakes When Following </span>
              <span className="text-trading-gold text-glow-gold">Forex Signals</span>
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
                  <span className="text-foreground">Pre-Entry Forex Signal </span>
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

        {/* SHOULD YOU FOLLOW EVERY SIGNAL */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Should You Follow Every </span>
              <span className="text-trading-gold text-glow-gold">Forex Signal?</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>No. A signal is an opportunity to evaluate, not an obligation to trade.</p>
              <p>Reasons to skip can include:</p>
              <ul className="space-y-1">
                {["entry already missed", "unclear instructions", "unacceptable account risk", "major news approaching", "unusually wide spread", "too much existing market exposure", "conflicting provider update", "inability to monitor the position"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>Following fewer suitable signals can be more disciplined than trying to participate in every alert.</p>
            </div>
          </div>
        </FadeSection>

        {/* INDEPENDENT ANALYSIS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Forex Signals and </span>
              <span className="text-trading-gold text-glow-gold">Independent Analysis</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Signals can help traders understand how setups are structured. They should not replace learning how markets work.</p>
              <p>Useful skills include:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {["support and resistance", "market structure", "risk management", "economic-calendar awareness", "position sizing", "understanding spreads and execution"].map((item) => (
                  <div key={item} className="glass rounded-xl px-4 py-2 text-sm md:text-base text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <p>The more you understand, the better equipped you are to judge whether a signal still makes sense when conditions change.</p>
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
                If you&apos;re still learning signal terminology, read our guide on{" "}
                <Link href="/blog/how-to-read-forex-signals/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors font-medium">
                  How to Read Forex Signals
                </Link>
                . For current educational market observations, visit our{" "}
                <Link href="/forex-signals/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors font-medium">
                  Forex Signals
                </Link>{" "}
                page. For gold-specific technical education, explore our{" "}
                <Link href="/xauusd-analysis/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors font-medium">
                  XAUUSD Analysis
                </Link>{" "}
                section. For trading-risk information, read the{" "}
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
                <p>Signals and market commentary are provided for educational and informational purposes only. They do not guarantee execution, market direction or profitability.</p>
                <p>Prices can move rapidly. Spreads can widen. Slippage can occur. Stop-loss orders may execute differently from the requested level during fast market conditions. Leverage can magnify both gains and losses.</p>
                <p>Use your own analysis and risk controls before placing any trade.</p>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-trading-gold" /> Sources and Execution Note
              </h2>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                  Platform terminology was checked against official{" "}
                  <a href="https://www.metatrader5.com/en/terminal/help/trading/performing_deals" target="_blank" rel="noopener noreferrer" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">
                    MetaTrader 5 documentation
                  </a>{" "}
                  for market/pending orders, Stop Loss and Take Profit behavior.
                </p>
                <p>
                  General retail-forex risk considerations are consistent with public{" "}
                  <a href="https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/CustomerAdvisory_MustKnowForex.html" target="_blank" rel="noopener noreferrer" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">
                    CFTC educational guidance
                  </a>{" "}
                  regarding leverage and the risks of OTC forex trading.
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
