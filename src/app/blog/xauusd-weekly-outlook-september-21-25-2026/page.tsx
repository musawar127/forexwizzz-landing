import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Clock,
  Calendar,
  Globe,
  AlertTriangle,
  Target,
  CheckCircle2,
  BookOpen,
  Newspaper,
  LineChart,
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

const post = getBlogPost("xauusd-weekly-outlook-september-21-25-2026")!;

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
const atAGlanceLevels = [
  { label: "Immediate support", value: "$4,340–$4,350", tone: "gold" as const },
  { label: "Secondary support", value: "$4,300–$4,320", tone: "gold" as const },
  {
    label: "Major support",
    value: "approx. $4,235–$4,260",
    tone: "gold" as const,
  },
  {
    label: "Immediate resistance",
    value: "approx. $4,395–$4,410",
    tone: "green" as const,
  },
  {
    label: "Major resistance",
    value: "approx. $4,430–$4,465",
    tone: "green" as const,
  },
  {
    label: "Higher resistance",
    value: "approx. $4,500–$4,520",
    tone: "green" as const,
  },
];

const economicEvents = [
  {
    day: "Wednesday, September 23",
    points: [
      "S&P Global releases its Flash US Manufacturing and Services PMI.",
      "The standard flash-US-PMI release is scheduled for approximately 9:45 AM ET.",
      "PMI data can influence expectations for US growth, inflation and Federal Reserve policy.",
      "Whether the result is strong or weak cannot be known in advance, so traders can monitor how the market reacts rather than predicting the print.",
    ],
  },
  {
    day: "Thursday, September 24",
    points: [
      "US New Residential Sales (New Home Sales) is scheduled for approximately 10:00 AM ET.",
      "Traders will also continue monitoring Federal Reserve speakers and post-FOMC commentary, which can shift rate-path expectations.",
    ],
  },
  {
    day: "Friday, September 25",
    points: [
      "US Durable Goods Orders for August is scheduled for approximately 8:30 AM ET.",
      "The University of Michigan final September Consumer Sentiment is scheduled for 10:00 AM ET.",
      "The preliminary September consumer-sentiment index was 47.8. The final survey and its inflation expectations may receive attention because inflation remains important for Fed expectations.",
      "Note: PCE and GDP are not scheduled for September 25. Those major BEA releases are currently scheduled for September 30.",
    ],
  },
];

const checklistItems = [
  "Previous week’s high and low",
  "$4,340–$4,350 immediate support",
  "$4,300–$4,320 secondary support",
  "$4,235–$4,260 major support",
  "$4,395–$4,410 immediate resistance",
  "$4,430–$4,465 major resistance",
  "$4,500–$4,520 higher resistance",
  "Daily and four-hour market structure",
  "London-session high and low",
  "New York-session structure",
  "Flash PMI (Wednesday)",
  "New Home Sales (Thursday)",
  "Durable Goods Orders (Friday)",
  "University of Michigan final sentiment",
  "Fed speakers and post-FOMC commentary",
  "Treasury-yield direction",
  "US dollar direction",
  "Crude-oil direction",
  "Your stop-loss location",
  "Position size",
  "Risk-to-reward",
  "Whether the setup has actually been confirmed",
];

const faqs = [
  {
    q: "What is the XAUUSD outlook for this week?",
    a: "Gold begins the September 21–25 week in a neutral-to-transitional structure with improving short-term momentum after recovering from the post-Fed lows. Buyers defended the approximately $4,235–$4,260 region, but major resistance remains around $4,395–$4,410 and $4,430–$4,465. How gold behaves around those areas, and around this week’s US data, could shape the next larger move.",
  },
  {
    q: "What are the main XAUUSD support levels this week?",
    a: "The first important support area is approximately $4,340–$4,350. Below it, traders can monitor $4,300–$4,320, followed by the deeper major support region around $4,235–$4,260 that held during the post-Fed selloff.",
  },
  {
    q: "What are the main gold resistance levels this week?",
    a: "Immediate resistance sits around $4,395–$4,410. A larger resistance region is located around $4,430–$4,465. If buyers recover those areas, approximately $4,500–$4,520 may become the next region to watch.",
  },
  {
    q: "What changed after the September Federal Reserve meeting?",
    a: "On September 16, 2026, the Federal Reserve raised the federal-funds target range by 25 basis points to 3.75%–4.00% and stated that inflation remains elevated. Gold dropped sharply around the decision before recovering later in the week. The market is now trying to determine whether further tightening could occur.",
  },
  {
    q: "What economic events could affect gold this week?",
    a: "Key releases include S&P Global Flash US PMI on September 23, US New Home Sales on September 24, and US Durable Goods Orders plus the final University of Michigan Consumer Sentiment on September 25. Traders will also monitor Federal Reserve speakers and post-FOMC commentary.",
  },
  {
    q: "Is $4,400 an important level for XAUUSD?",
    a: "The $4,400 region is psychologically important and also sits close to this week’s immediate resistance around $4,395–$4,410. Whether gold can reclaim and accept above it, rather than just spiking through it, may provide useful information about the strength of the recovery.",
  },
  {
    q: "Do higher interest rates automatically make gold fall?",
    a: "No. Higher expected interest rates and Treasury yields can create a headwind for non-yielding gold, and a stronger US dollar can pressure dollar-denominated gold. However, the relationship is not mechanical. Positioning, inflation expectations, geopolitical uncertainty, safe-haven demand, central-bank demand and already-priced expectations can all affect how gold reacts.",
  },
];

const continueLearning = [
  {
    href: "/blog/xauusd-weekly-outlook-september-14-18-2026/",
    title: "XAUUSD Weekly Outlook: Sep 14–18",
    desc: "Last week’s XAUUSD weekly outlook — the Fed decision, key levels entering the week and the post-Fed recovery context that set up this week’s structure.",
    icon: <Newspaper className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/gold-signals/",
    title: "Gold Signals",
    desc: "Educational gold signals and XAUUSD market analysis covering price action, key levels, trading sessions and risk management.",
    icon: <Newspaper className="w-7 h-7 text-trading-green" />,
    accent: "from-trading-green/10 to-transparent",
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
export default function WeeklyOutlookSep2125Page() {
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
                XAUUSD Weekly Outlook: Gold Trading Plan for September 21–25, 2026
              </span>
            </nav>

            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-gold">
                <Calendar className="w-4 h-4" />
                XAUUSD Weekly Outlook · Sep 21–25, 2026
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">
                XAUUSD Weekly Outlook: Gold Trading Plan for September 21–25,
                2026
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
                This XAUUSD weekly outlook covers the September 21–25, 2026
                trading week and the key gold levels worth watching after a
                volatile Federal Reserve meeting.
              </p>
              <p>
                Gold enters the new week recovering from an aggressive post-Fed
                selloff. The September 16 rate increase pushed XAU/USD toward
                the $4,235–$4,260 region, but buyers responded with a strong
                recovery that reached approximately the $4,400 area on Friday.
              </p>
              <p>
                That recovery produced gold&apos;s first positive week after
                three consecutive weekly declines. It also leaves the market at
                an important technical checkpoint: buyers have defended deeper
                support, but they still need to clear overhead resistance to
                confirm that the move is more than a short-covering rebound.
              </p>
              <p>
                Rather than predicting where gold will go, this outlook focuses
                on the levels, market structure and scenarios worth monitoring
                between September 21 and September 25.
              </p>
              <p className="text-foreground/90 font-medium">
                This analysis is educational only. The levels discussed below
                are areas to monitor, not guaranteed trade entries or
                predictions.
              </p>
            </div>
          </HeroAnimation>
        </section>

        {/* AT A GLANCE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">
                  XAUUSD Weekly Outlook at a{" "}
                </span>
                <span className="text-trading-gold text-glow-gold">
                  Glance
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              <p>
                Gold begins the September 21–25 week in a neutral-to-transitional
                structure with improving short-term momentum. The recovery from
                the post-Fed lows is real, but it still needs confirmation above
                important resistance.
              </p>
              <p>Important areas for the coming week include:</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {atAGlanceLevels.map((level, i) => (
                <FadeIn key={level.label} delay={i * 0.05}>
                  <div className="glass-strong rounded-2xl p-5 gradient-border h-full flex flex-col gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                      {level.label}
                    </span>
                    <span
                      className={`text-xl font-extrabold ${
                        level.tone === "green"
                          ? "text-trading-green"
                          : "text-trading-gold"
                      }`}
                    >
                      {level.value}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The biggest scheduled catalysts this week are lighter than last
                week&apos;s FOMC-heavy calendar, but S&P Global Flash PMI
                (Wednesday), New Home Sales (Thursday) and Durable Goods plus
                final University of Michigan sentiment (Friday) can still shift
                the dollar, Treasury yields and XAUUSD.
              </p>
              <p>
                Traders should be prepared for conditions to change quickly,
                especially around those releases and during the New York
                session.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* WHAT HAPPENED LAST WEEK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">What Happened to Gold </span>
              <span className="text-trading-gold text-glow-gold">
                Last Week?
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Gold started the September 14–18 week under pressure. The
                Federal Reserve&apos;s Wednesday rate increase produced
                significant volatility, and gold traded toward approximately
                $4,235–$4,260 during the post-decision selloff.
              </p>
              <p>
                The market then recovered sharply on Thursday and Friday. By
                Friday, gold had tested approximately the $4,400 area, with
                reference prices around $4,380–$4,390 depending on the data
                feed.
              </p>
              <p>
                The recovery was supported partly by easing crude-oil prices,
                which helped calm inflation concerns during the second half of
                the week. Pullbacks in Treasury yields and periods of US-dollar
                weakness also helped gold recover after the Fed-driven selloff.
              </p>
              <p>
                The result was gold&apos;s first weekly gain following three
                declining weeks. This creates an interesting setup: buyers
                successfully defended the deeper support region, but they still
                need to clear important overhead resistance to confirm that the
                recovery is more than a short-covering rebound.
              </p>
              <p>
                You can read the full context of that week in{" "}
                <Link
                  href="/blog/xauusd-weekly-outlook-september-14-18-2026/"
                  className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                >
                  last week&apos;s XAUUSD weekly outlook
                </Link>
                .
              </p>
            </div>
          </div>
        </FadeSection>

        {/* WHAT DID THE FED RATE HIKE CHANGE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">
                  What Did the September Fed Rate Hike{" "}
                </span>
                <span className="text-trading-gold text-glow-gold">
                  Change?
                </span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  On September 16, 2026, the Federal Reserve raised the
                  federal-funds target range by 25 basis points to 3.75%–4.00%.
                  The Fed stated that inflation remains elevated.
                </p>
                <p>
                  The market is now trying to determine whether further
                  tightening could occur. Another rate increase is not certain.
                  Much depends on incoming inflation, employment and growth
                  data, plus the tone of post-meeting Fed commentary.
                </p>
                <p>
                  The basic relationship matters for gold. Higher expected
                  interest rates and higher Treasury yields can create a
                  headwind for non-yielding gold. A stronger US dollar can also
                  pressure dollar-denominated gold.
                </p>
                <p>
                  However, these relationships are not mechanical. Gold can rise
                  even when rates are high because positioning, inflation
                  expectations, geopolitical uncertainty, safe-haven demand,
                  central-bank demand and already-priced expectations can all
                  affect the reaction.
                </p>
                <p>
                  That is why the immediate post-Fed drop did not simply
                  continue — gold recovered as the dollar and yields pulled
                  back and as oil eased. The same principle applies this week:
                  the data and the market&apos;s reaction to it matter more than
                  the rate-hike label alone.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* BULLISH OR BEARISH */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Is Gold Bullish or </span>
              <span className="text-trading-gold text-glow-gold">
                Bearish This Week?
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The cleanest description is neutral-to-transitional with
                improving short-term momentum.
              </p>
              <p>
                Holding above roughly $4,340–$4,350 would keep the short-term
                recovery structure constructive. A clean recovery and acceptance
                above approximately $4,400–$4,410 would strengthen the recovery
                case.
              </p>
              <p>
                Approximately $4,430–$4,465 is a more important resistance
                region. If that area is recovered and successfully held or
                retested, approximately $4,500–$4,520 can become relevant.
              </p>
              <p>
                Conversely, failure around $4,400 or $4,430–$4,465 could produce
                renewed selling pressure. A break back beneath $4,340 may expose
                $4,300–$4,320 again, and a decisive breakdown below $4,300 would
                weaken the recovery significantly and could bring approximately
                $4,235–$4,260 back into focus.
              </p>
              <p>
                For a broader framework on reading these transitions, see our{" "}
                <Link
                  href="/xauusd-analysis/"
                  className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                >
                  XAUUSD analysis
                </Link>{" "}
                coverage.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SUPPORT LEVELS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Key XAUUSD </span>
              <span className="text-trading-gold text-glow-gold">
                Support Levels
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              The areas below are important structural zones to monitor. Treating
              them as zones rather than exact prices is more useful because
              different feeds can show slightly different highs and lows. Read
              more about how to use these areas in our guide to{" "}
              <Link
                href="/xauusd-support-resistance/"
                className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
              >
                XAUUSD support and resistance
              </Link>
              .
            </p>

            <div className="space-y-8">
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-gold mb-4">
                  $4,340–$4,350 Support
                </h3>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    This is the first area to watch on any pullback. If buyers
                    continue defending roughly $4,340–$4,350, the short-term
                    recovery structure remains constructive and attention can
                    stay on the overhead resistance zones.
                  </p>
                  <p>
                    A touch of support alone does not confirm a buy. Traders can
                    watch how price behaves when the area is tested — signs such
                    as rejection, a higher low or a break of short-term bearish
                    structure may provide more useful information than simply
                    entering because price reaches the zone.
                  </p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-gold mb-4">
                  $4,300–$4,320 Support
                </h3>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Below $4,340, the next important structural area sits around
                    $4,300–$4,320. The $4,300 region is also psychologically
                    important as a large round number.
                  </p>
                  <p>
                    If gold briefly trades below $4,340 but quickly recovers,
                    traders can pay attention to whether this lower area produces
                    another reaction. A sustained breakdown beneath $4,300 would
                    weaken the short-term recovery.
                  </p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-gold mb-4">
                  $4,235–$4,260 Major Support
                </h3>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    This is the deeper major-support region that held during the
                    post-Fed selloff. If sellers regain control and the
                    short-term recovery structure fails, this area may become
                    relevant again.
                  </p>
                  <p>
                    It should be treated as a scenario rather than an
                    expectation. The fact that buyers defended it last week does
                    not guarantee it will hold again, but it is the most
                    important structural floor beneath the current market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* RESISTANCE LEVELS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Key XAUUSD </span>
              <span className="text-trading-gold text-glow-gold">
                Resistance Levels
              </span>
            </h2>

            <div className="space-y-8">
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-green mb-4">
                  $4,395–$4,410 Resistance
                </h3>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    This is the first major challenge for buyers. The $4,400
                    region is both psychologically important and close to where
                    gold stalled on Friday.
                  </p>
                  <p>
                    A move above $4,410 would be constructive, but traders can
                    watch whether price can remain above it instead of producing
                    another false breakout. Acceptance above resistance is
                    generally more meaningful than a quick spike through it.
                  </p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-green mb-4">
                  $4,430–$4,465 Major Resistance
                </h3>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    This is the most important technical resistance region for
                    the week. Recovering it would represent a stronger
                    confirmation that the post-Fed recovery has legs.
                  </p>
                  <p>
                    If gold reaches this area and rejects strongly, sellers may
                    attempt to regain control. If price breaks above it and
                    successfully holds or retests the zone, attention could
                    shift toward higher resistance.
                  </p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-green mb-4">
                  $4,500–$4,520 Higher Resistance
                </h3>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Above $4,465, the next important technical and psychological
                    area sits around $4,500–$4,520. This is not a prediction that
                    gold will reach this level.
                  </p>
                  <p>
                    It represents the next resistance area that could become
                    relevant only if buyers successfully recover the lower
                    resistance zones first.
                  </p>
                </div>
              </div>
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
                  <span className="text-foreground">Bullish XAUUSD </span>
                  <span className="text-trading-green text-glow-green">
                    Scenario
                  </span>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The bullish scenario starts with gold maintaining approximately
                  $4,340–$4,350 and continuing to form higher lows.
                </p>
                <p>
                  If buyers reclaim approximately $4,395–$4,410 and accept above
                  it, attention shifts toward the $4,430–$4,465 major resistance
                  region.
                </p>
                <p>
                  A confirmed break and successful retest of that larger zone
                  could then bring the $4,500–$4,520 region into view as the
                  next area to monitor.
                </p>
                <p>
                  The important point is confirmation. Buying directly into
                  major resistance simply because gold has bounced from support
                  can create poor risk-to-reward conditions. Traders can look
                  for evidence — a decisive close, follow-through, a clean
                  retest — rather than assuming resistance will automatically
                  break.
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
                  <span className="text-foreground">Bearish XAUUSD </span>
                  <span className="text-trading-gold text-glow-gold">
                    Scenario
                  </span>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The bearish scenario could develop in two ways.
                </p>
                <p>
                  The first is a strong rejection from $4,395–$4,410 or the
                  larger $4,430–$4,465 resistance zone, followed by lower-high
                  formation. If sellers begin producing lower highs after such a
                  rejection, the market may return toward $4,340–$4,300.
                </p>
                <p>
                  The second and stronger bearish signal would be a confirmed
                  loss of support. If $4,340 fails, $4,300–$4,320 may become
                  relevant. A decisive breakdown beneath the $4,300 structure
                  could return attention toward approximately $4,235–$4,260.
                </p>
                <p>
                  Again, these are scenarios rather than trade instructions. The
                  market should confirm the idea first.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ECONOMIC EVENTS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">
                Important Economic Events for{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Gold Traders
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              This week is lighter than last week&apos;s FOMC-heavy calendar, but
              several releases can still influence the US dollar, Treasury
              yields and XAUUSD.
            </p>

            <div className="space-y-5">
              {economicEvents.map((evt) => (
                <div
                  key={evt.day}
                  className="glass-strong rounded-2xl p-6 md:p-8 gradient-border"
                >
                  <h3 className="text-lg md:text-xl font-bold text-trading-gold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {evt.day}
                  </h3>
                  <div className="space-y-3 text-base md:text-lg text-muted-foreground leading-relaxed">
                    {evt.points.map((point, i) => (
                      <p key={i}>{point}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* LONDON SESSION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-green/10 to-transparent flex items-center justify-center">
                  <Globe className="w-7 h-7 text-trading-green" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">London Session Gold </span>
                  <span className="text-trading-green text-glow-green">
                    Outlook
                  </span>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The London session can provide the first important clue about
                  daily market structure. Watch how gold behaves around the
                  previous day&apos;s high and low and around the major weekly
                  zones.
                </p>
                <p>
                  If London breaks an overnight range, avoid automatically
                  assuming the breakout will continue. Gold frequently produces
                  liquidity sweeps and false breaks, particularly after a
                  volatile week.
                </p>
                <p>
                  A more patient approach is to watch whether price can hold
                  beyond a level or whether it quickly returns inside the
                  previous range. This is especially relevant on Wednesday and
                  Friday, when US data arrives later in the day and can
                  invalidate a London setup.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* NEW YORK SESSION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-gold/10 to-transparent flex items-center justify-center">
                  <Clock className="w-7 h-7 text-trading-gold" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">
                    New York Session Gold{" "}
                  </span>
                  <span className="text-trading-gold text-glow-gold">
                    Outlook
                  </span>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The New York session will be important again this week because
                  most of the major US catalysts occur during US trading hours —
                  Flash PMI on Wednesday, New Home Sales on Thursday, and
                  Durable Goods plus final Michigan sentiment on Friday.
                </p>
                <p>Watch the relationship between:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>XAU/USD</li>
                  <li>US Treasury yields</li>
                  <li>The US dollar</li>
                  <li>Market expectations for Federal Reserve policy</li>
                </ul>
                <p>
                  When yields and the dollar rise sharply together, gold can
                  face additional pressure. When yields fall and the dollar
                  weakens, gold may receive support. These relationships are not
                  guaranteed on every session, but they provide useful context.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* TREASURY YIELDS & USD */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">
                What Treasury Yields and the US Dollar Could Mean for{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">Gold</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                After the Fed&apos;s 25 basis-point hike to a 3.75%–4.00% target
                range, the market is sensitive to any signal about whether
                further tightening could occur. That keeps Treasury yields and
                the dollar central to gold&apos;s near-term direction.
              </p>
              <p>
                Higher expected rates and higher yields can create a headwind for
                non-yielding gold. A stronger dollar can pressure
                dollar-denominated gold. But last week showed the limits of
                treating that relationship mechanically — gold fell hard on the
                decision, then recovered as yields and the dollar pulled back.
              </p>
              <p>
                This week, traders can monitor whether yields continue to ease or
                push back higher, and whether the dollar holds its recent
                pullback. Those moves may matter as much as the data itself. For
                a deeper explanation of{" "}
                <Link
                  href="/blog/xauusd-fundamental-analysis/"
                  className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                >
                  how fundamental drivers affect XAUUSD
                </Link>
                , read our complete fundamental analysis guide.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* OIL */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Why Oil Still Matters for{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Gold After the Fed
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Crude-oil prices fell during the second half of last week, which
                helped ease inflation concerns and supported gold&apos;s
                recovery. That link is worth watching again this week.
              </p>
              <p>
                Oil is not a direct gold driver, but it influences inflation
                expectations, which in turn influence Fed expectations, which
                influence yields and the dollar. Falling oil can soften the
                macro headwinds for gold; rising oil can re-introduce them.
              </p>
              <p>
                Traders can treat oil as context rather than a primary signal.
                The most relevant drivers for XAUUSD this week remain yields,
                the dollar and the scheduled US data.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* RISK MANAGEMENT */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-red/10 to-transparent flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7 text-trading-red" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">
                    Risk Management During{" "}
                  </span>
                  <span className="text-trading-gold text-glow-gold">
                    Volatile Gold Sessions
                  </span>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                <p>
                  Even on a lighter calendar week, gold can move quickly around
                  US data and Fed-speaker commentary. Major events can produce:
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {[
                  "Sudden price spikes",
                  "Wider spreads",
                  "Slippage",
                  "False breakouts",
                  "Rapid reversals",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-base md:text-lg text-muted-foreground"
                  >
                    <AlertTriangle className="w-4 h-4 text-trading-red shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Traders should know their invalidation point before entering.
                  Position size should reflect the distance between entry and
                  stop loss — and after a volatile week, stops may need more
                  room than usual.
                </p>
                <p>
                  Increasing risk simply because a setup looks attractive can
                  turn one losing trade into an unnecessarily large loss. No
                  technical level is guaranteed to hold.
                </p>
              </div>
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
                    XAUUSD Trading Checklist for{" "}
                  </span>
                  <span className="text-trading-green text-glow-green">
                    September 21–25
                  </span>
                </h2>
              </div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                Before trading gold this week, consider checking:
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
                Having a plan before price reaches an important level can make
                decision-making easier when volatility increases.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* FINAL VIEW */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">XAUUSD Weekly Outlook:{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Final View
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Gold begins the September 21–25 week after an aggressive recovery
                from the post-Fed lows, but the recovery still needs confirmation
                above important resistance.
              </p>
              <p>That creates two clear areas of interest.</p>
              <p>
                Bulls will want to see gold maintain $4,340–$4,350, reclaim
                approximately $4,395–$4,410, and eventually break through the
                $4,430–$4,465 region.
              </p>
              <p>
                Bears will be watching for rejection from resistance or a
                confirmed breakdown beneath $4,340, with $4,300–$4,320 and then
                approximately $4,235–$4,260 as deeper supports.
              </p>
              <p>
                This week&apos;s US data — Flash PMI, New Home Sales, Durable
                Goods and final Michigan sentiment — and the tone of Fed
                speakers could shape which side gains control.
              </p>
              <p>
                Until then, patience may be more valuable than prediction.
                Identify your important areas and wait for price to show how
                buyers and sellers react around them.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* FOLLOW FOREXWIZARD */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Follow </span>
                <span className="text-trading-green text-glow-green">
                  ForexWizard
                </span>
                <span className="text-foreground"> XAU/USD Updates</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  ForexWizard shares educational XAU/USD market structure, key
                  levels, technical observations and trading-related education.
                </p>
                <p>
                  Readers who want to follow our regular gold market updates can
                  join the ForexWizzz Telegram community:
                </p>
                <p className="flex flex-wrap items-center gap-2">
                  <a
                    href={TELEGRAM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-trading-green font-semibold underline underline-offset-2 hover:text-trading-green/80 transition-colors break-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    https://t.me/ForexWizzz
                  </a>
                </p>
                <p>
                  Follow ForexWizzz for XAU/USD market structure, important zones
                  and educational trading updates. For more, explore our{" "}
                  <Link
                    href="/gold-signals/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    Gold Signals
                  </Link>{" "}
                  section for XAU/USD-focused analysis and our{" "}
                  <Link
                    href="/forex-signals/"
                    className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors"
                  >
                    Forex Signals
                  </Link>{" "}
                  section for broader forex market updates.
                </p>
                <p>
                  You can also learn more about ForexWizard, our educational
                  approach and the community on the{" "}
                  <Link
                    href="/about/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    About ForexWizard
                  </Link>{" "}
                  page.
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

        {/* RISK DISCLAIMER + MARKET DATA NOTE */}
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
                  financial instrument. Technical levels can fail and market
                  conditions can change quickly.
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
                Market Data Note
              </h2>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                  Spot gold is traded across multiple liquidity providers, so
                  exact XAU/USD highs, lows and closing prices can differ
                  slightly between brokers and data feeds.
                </p>
                <p>
                  The levels in this article should therefore be treated as
                  approximate technical zones rather than exact guaranteed
                  prices.
                </p>
                <p>
                  Research for this article is based on publicly available
                  information from the Federal Reserve, US Bureau of Labor
                  Statistics, US Census Bureau, US Bureau of Economic Analysis,
                  University of Michigan and established financial-market
                  reporting available before publication.
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
                market structure, important zones and trading-related education.
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
