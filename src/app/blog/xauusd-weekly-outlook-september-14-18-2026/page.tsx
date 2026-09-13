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

const post = getBlogPost("xauusd-weekly-outlook-september-14-18-2026")!;

const CANONICAL = `https://forexwizard.online/blog/${post.slug}/`;
const IMAGE_URL = `https://forexwizard.online${post.image}`;
const IMAGE_BASE = post.image.replace(/\.jpg$/, "");
// Responsive WebP srcset for the in-page hero (LCP candidate). Mobile loads a
// ~16-25KB WebP instead of the 49KB JPG fallback.
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
  {
    label: "Immediate support",
    value: "$4,300–$4,320",
    tone: "gold" as const,
  },
  {
    label: "Secondary support",
    value: "$4,280–$4,290",
    tone: "gold" as const,
  },
  {
    label: "Deeper support",
    value: "approx. $4,230",
    tone: "gold" as const,
  },
  {
    label: "Immediate resistance",
    value: "$4,385–$4,400",
    tone: "green" as const,
  },
  {
    label: "Major resistance",
    value: "$4,443–$4,450",
    tone: "green" as const,
  },
  {
    label: "Higher resistance",
    value: "approx. $4,507–$4,537",
    tone: "green" as const,
  },
];

const faqs = [
  {
    q: "What is the XAUUSD outlook for this week?",
    a: "Gold begins the September 14–18 week in a transitional structure. Buyers defended approximately $4,290–$4,300, but major resistance remains around $4,400 and $4,443–$4,450. The September 16 Federal Reserve decision could become the main catalyst for the next larger move.",
  },
  {
    q: "What are the main XAUUSD support levels this week?",
    a: "The first important support area is approximately $4,300–$4,320. Below it, traders can monitor the recent swing-low region around $4,280–$4,290, followed by deeper support near $4,230.",
  },
  {
    q: "What are the main gold resistance levels this week?",
    a: "Immediate resistance sits around $4,385–$4,400. A larger resistance area is located around $4,443–$4,450. If buyers recover those areas, approximately $4,507–$4,537 may become the next region to watch.",
  },
  {
    q: "When is the Federal Reserve decision this week?",
    a: "The Federal Reserve is scheduled to release its monetary-policy decision on Wednesday, September 16, 2026 at 2:00 PM Eastern Time, which is 7:00 PM British Summer Time. The press conference is scheduled approximately 30 minutes later.",
  },
  {
    q: "Does a Federal Reserve rate increase automatically make gold fall?",
    a: "No. Gold can react to interest rates, Treasury yields and the US dollar, but markets also react to expectations. If an interest-rate decision is already priced in, traders may focus more heavily on future guidance, economic projections and the tone of the press conference.",
  },
];

const checklistItems = [
  "Previous week’s high and low",
  "$4,300–$4,320 support",
  "$4,280–$4,290 lower support",
  "$4,385–$4,400 resistance",
  "$4,443–$4,450 major resistance",
  "Daily and four-hour market structure",
  "London-session high and low",
  "New York-session structure",
  "US retail-sales release",
  "Federal Reserve decision",
  "Fed press conference",
  "Treasury-yield direction",
  "US dollar direction",
  "Your stop-loss location",
  "Position size",
  "Risk-to-reward",
  "Whether the setup has actually been confirmed",
];

const economicEvents = [
  {
    day: "Tuesday, September 15",
    points: [
      "UK labour-market data is scheduled for 7:00 AM BST.",
      "US traders will also be watching regional manufacturing data during the New York morning.",
      "While these releases may not have the same impact as the Fed decision, they can influence currencies, bond yields and overall market sentiment.",
    ],
  },
  {
    day: "Wednesday, September 16",
    points: [
      "This is the key day.",
      "UK consumer inflation data is scheduled for 7:00 AM BST.",
      "US retail-sales data is scheduled for 8:30 AM ET / 1:30 PM BST.",
      "US import and export price data is also scheduled for the same time.",
      "The Federal Reserve decision follows later at 2:00 PM ET / 7:00 PM BST.",
      "The Fed press conference begins approximately 30 minutes later.",
      "Because several important releases arrive on the same day, XAU/USD traders should be prepared for increased volatility.",
    ],
  },
  {
    day: "Thursday, September 17",
    points: [
      "US housing-start and building-permit data is scheduled for 8:30 AM ET / 1:30 PM BST.",
      "UK traders will also be watching the Bank of England’s September monetary-policy announcement at approximately 12:00 PM BST.",
      "Although US interest-rate expectations normally have a more direct relationship with dollar-denominated gold, major global central-bank decisions can still influence yields, currencies and risk sentiment.",
    ],
  },
];

const continueLearning = [
  {
    href: "/gold-signals/",
    title: "Gold Signals",
    desc: "Educational gold signals and XAUUSD market analysis covering price action, key levels, trading sessions and risk management.",
    icon: <Newspaper className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/forex-signals/",
    title: "Forex Signals",
    desc: "Broader forex trading signals covering major and minor currency pairs beyond gold and XAUUSD.",
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
export default function WeeklyOutlookPage() {
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
                <Calendar className="w-4 h-4" />
                XAUUSD Weekly Outlook · Sep 14–18, 2026
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">
                XAUUSD Weekly Outlook: Gold Trading Plan for September 14–18,
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
                Gold enters the new trading week at an important technical and
                fundamental point.
              </p>
              <p>
                XAU/USD recovered strongly from the $4,290–$4,300 area on Friday
                and finished the week around $4,350, but the rebound did not
                completely erase the pressure seen throughout the previous
                sessions.
              </p>
              <p>
                Gold still finished the week lower, while rising Treasury
                yields, persistent inflation concerns and changing expectations
                for Federal Reserve policy continued to influence the market.
              </p>
              <p>
                For traders watching gold this week, Wednesday&apos;s Federal
                Reserve decision is likely to be the main event.
              </p>
              <p>
                Instead of trying to predict exactly where XAU/USD will move,
                this weekly outlook focuses on the levels, market structure and
                scenarios worth watching between September 14 and September 18.
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
                The short-term gold structure remains cautious while price
                stays below the major resistance area around
                $4,443–$4,450.
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
                The biggest scheduled catalyst is the Federal Reserve decision
                on Wednesday, September 16.
              </p>
              <p>
                That means traders should be prepared for conditions to change
                quickly, especially during the New York session.
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
                Gold entered last week under pressure after stronger US
                employment data increased expectations that the Federal Reserve
                could tighten monetary policy again.
              </p>
              <p>
                The market continued to react to rising Treasury yields, a
                stronger US dollar and sharply higher energy prices.
              </p>
              <p>
                Inflation became an even bigger focus after US producer-price
                data showed persistent price pressure.
              </p>
              <p>
                Gold then dropped toward the psychologically important $4,300
                area.
              </p>
              <p>
                Friday brought another important event: US consumer inflation.
              </p>
              <p>
                Gold initially entered the CPI session under heavy pressure, but
                buyers appeared around the $4,290–$4,300 region.
              </p>
              <p>
                That produced a strong intraday recovery and helped XAU/USD
                finish Friday around $4,350.
              </p>
              <p>
                However, the broader weekly picture remained weaker.
              </p>
              <p>
                This leaves traders with an interesting setup for the new week.
              </p>
              <p>
                Buyers have defended an important support area, but they have
                not yet recovered the resistance zones needed to confirm a
                stronger bullish reversal.
              </p>
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
                The cleanest answer is that gold begins the week in a
                transitional structure.
              </p>
              <p>
                The Friday rebound showed that buyers are still willing to
                defend the $4,300 region.
              </p>
              <p>
                At the same time, price remains below several important
                resistance areas.
              </p>
              <p>
                Because of this, it may be better to avoid treating gold as
                automatically bullish or bearish.
              </p>
              <p>
                The market can provide confirmation. For more on reading
                current structure, see our broader{" "}
                <Link
                  href="/xauusd-analysis/"
                  className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                >
                  XAUUSD analysis
                </Link>{" "}
                coverage.
              </p>
              <p>
                For the bullish structure to strengthen, buyers would ideally
                need to reclaim $4,400 and then break the $4,443–$4,450 region.
              </p>
              <p>
                For bearish continuation to become clearer, sellers would need
                to break the support structure around $4,300 and the recent lows
                below it.
              </p>
              <p>
                Until one of these happens, traders should be prepared for
                volatility and possible range conditions.
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
              The areas below are important structural zones to monitor. Read
              more about how to use these zones in our guide to{" "}
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
                  $4,300–$4,320 Support Zone
                </h3>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    The $4,300 region is one of the most important areas to
                    watch this week.
                  </p>
                  <p>
                    Gold attracted significant buying interest near this region
                    on Friday after falling sharply during the previous session.
                  </p>
                  <p>
                    It is also psychologically important because $4,300 is a
                    large round number that traders can easily identify.
                  </p>
                  <p>
                    As long as the market continues holding this area, buyers
                    may continue trying to recover the higher resistance zones.
                  </p>
                  <p>
                    A touch of support alone, however, does not confirm a buy.
                  </p>
                  <p>
                    Traders should watch how price behaves when the area is
                    tested.
                  </p>
                  <p>
                    Signs such as rejection, a higher low or a break of
                    short-term bearish structure may provide more useful
                    information than simply entering because price reaches the
                    zone.
                  </p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-gold mb-4">
                  $4,280–$4,290 Support
                </h3>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Below $4,300 sits another important structural area around
                    $4,280–$4,290.
                  </p>
                  <p>
                    This region is close to the recent swing lows.
                  </p>
                  <p>
                    If gold briefly trades below $4,300 but quickly recovers,
                    traders should pay attention to whether this lower area
                    produces another reaction.
                  </p>
                  <p>
                    A sustained breakdown beneath the recent lows would weaken
                    the short-term bullish recovery.
                  </p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-gold mb-4">
                  $4,230 Area
                </h3>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    If sellers gain stronger control and the recent swing-low
                    structure fails, approximately $4,230 becomes another
                    important area on the chart.
                  </p>
                  <p>
                    This is a deeper support zone and would represent a much
                    larger correction from current prices.
                  </p>
                  <p>
                    It should therefore be treated as a scenario rather than an
                    expectation.
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
                  $4,385–$4,400 Resistance
                </h3>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    The first major challenge for buyers is the area between
                    approximately $4,385 and $4,400.
                  </p>
                  <p>
                    Gold moved toward this region during Friday&apos;s recovery.
                  </p>
                  <p>
                    A move above $4,400 would be constructive for buyers, but
                    traders should watch whether price can remain above it
                    instead of producing another false breakout.
                  </p>
                  <p>
                    Acceptance above resistance is generally more meaningful
                    than a quick spike through it.
                  </p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-green mb-4">
                  $4,443–$4,450 Major Resistance
                </h3>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    The $4,443–$4,450 area is one of the most important
                    technical levels for the week.
                  </p>
                  <p>
                    This region is close to last week&apos;s upper trading range
                    and represents an area buyers would likely need to recover
                    before the short-term outlook becomes more convincingly
                    bullish.
                  </p>
                  <p>
                    If gold reaches this area and rejects strongly, sellers may
                    attempt to regain control.
                  </p>
                  <p>
                    If price breaks above it and successfully holds or retests
                    the zone, attention could shift toward higher resistance.
                  </p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-green mb-4">
                  $4,507–$4,537 Higher Resistance
                </h3>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Above $4,450, the next important technical area sits around
                    $4,507–$4,537.
                  </p>
                  <p>
                    This is not a prediction that gold will reach this level.
                  </p>
                  <p>
                    Instead, it represents the next resistance area that could
                    become relevant if buyers successfully recover the lower
                    resistance zones.
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
                  The bullish scenario starts with buyers continuing to defend
                  approximately $4,300–$4,320.
                </p>
                <p>
                  The structure would become more interesting if gold then forms
                  higher lows and begins reclaiming $4,385–$4,400.
                </p>
                <p>
                  A clean move above $4,400 would put the $4,443–$4,450
                  resistance area back into focus.
                </p>
                <p>
                  For a stronger bullish continuation signal, traders may want
                  to see price break above that resistance and remain above it.
                </p>
                <p>
                  A successful breakout and retest could then bring the
                  $4,507–$4,537 area into view as the next major resistance
                  zone.
                </p>
                <p>
                  The important point is confirmation.
                </p>
                <p>
                  Buying directly into major resistance simply because gold has
                  bounced from support can create poor risk-to-reward
                  conditions.
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
                  The first would be a strong rejection from the $4,385–$4,400
                  region or the larger $4,443–$4,450 resistance zone.
                </p>
                <p>
                  If sellers begin producing lower highs after such a rejection,
                  the market may return toward $4,320–$4,300.
                </p>
                <p>
                  The second and stronger bearish signal would be a confirmed
                  breakdown below the recent $4,290–$4,300 support structure.
                </p>
                <p>
                  If price breaks the area and later retests it from underneath,
                  former support could potentially begin acting as resistance.
                </p>
                <p>
                  That would place the deeper $4,230 region back into focus.
                </p>
                <p>
                  Again, these are scenarios rather than trade instructions.
                </p>
                <p>
                  The market should confirm the idea first.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* FED IS BIGGEST EVENT */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">
                The Federal Reserve Is the Biggest Event{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                This Week
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              <p>
                Wednesday, September 16 could be the most important trading
                session of the week.
              </p>
              <p>
                The Federal Reserve concludes its September 15–16 monetary-policy
                meeting and releases its decision at:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="glass-strong rounded-2xl p-5 gradient-border">
                <div className="flex items-center gap-2 mb-2 text-trading-green">
                  <Globe className="w-5 h-5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Eastern Time (US)
                  </span>
                </div>
                <p className="text-lg font-bold text-foreground">
                  2:00 PM ET
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Fed decision
                </p>
                <p className="text-lg font-bold text-foreground mt-3">
                  2:30 PM ET
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Press conference
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-5 gradient-border">
                <div className="flex items-center gap-2 mb-2 text-trading-gold">
                  <Globe className="w-5 h-5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    British Summer Time (UK)
                  </span>
                </div>
                <p className="text-lg font-bold text-foreground">
                  7:00 PM BST
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Fed decision
                </p>
                <p className="text-lg font-bold text-foreground mt-3">
                  7:30 PM BST
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Press conference
                </p>
              </div>
            </div>

            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                This meeting is especially important because updated economic
                projections are also scheduled.
              </p>
              <p>
                Going into the meeting, markets have been pricing a high
                probability of another interest-rate increase following stronger
                employment and inflation data.
              </p>
              <p>
                Gold traders should remember the basic relationship.
              </p>
              <p>
                Higher interest-rate expectations can increase Treasury yields
                and support the US dollar.
              </p>
              <p>
                Because gold does not pay interest, higher yields can make
                holding gold relatively less attractive.
              </p>
              <p>
                That does not mean a rate increase automatically makes gold fall.
              </p>
              <p>
                Markets often move based on the difference between what was
                expected and what actually happens.
              </p>
              <p>
                If a rate increase is already heavily priced in, traders may pay
                even more attention to the Fed&apos;s language, economic
                projections and guidance about future policy.
              </p>
              <p>
                The first reaction can also reverse during the press conference.
              </p>
              <p>
                For that reason, this is a session where patience can be
                particularly valuable.
              </p>
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
              This week contains several events worth monitoring.
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
                  For traders in the United Kingdom and Europe, the London
                  session can provide the first important clue about daily market
                  structure.
                </p>
                <p>
                  Watch how gold behaves around the previous day&apos;s high and
                  low and around the major weekly zones.
                </p>
                <p>
                  If London breaks an overnight range, avoid automatically
                  assuming that the breakout will continue.
                </p>
                <p>
                  Gold frequently produces liquidity sweeps and false breaks.
                </p>
                <p>
                  A more patient approach is to watch whether price can hold
                  beyond the level or whether it quickly returns inside the
                  previous range.
                </p>
                <p>
                  On Wednesday in particular, London-session traders should
                  remember that much larger US events arrive later in the day.
                </p>
                <p>
                  A good setup before the Fed can still be invalidated when New
                  York volatility increases.
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
                  The New York session will be especially important this week
                  because most of the major US catalysts occur during US trading
                  hours.
                </p>
                <p>Watch the relationship between:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>XAU/USD</li>
                  <li>US Treasury yields</li>
                  <li>The US dollar</li>
                  <li>Market expectations for Federal Reserve policy</li>
                </ul>
                <p>
                  When yields and the dollar rise sharply together, gold can face
                  additional pressure.
                </p>
                <p>
                  When yields fall and the dollar weakens, gold may receive
                  support.
                </p>
                <p>
                  These relationships are not guaranteed on every session, but
                  they provide useful context.
                </p>
                <p>
                  The Wednesday New York session deserves particular caution
                  because retail sales arrive before the Fed decision.
                </p>
                <p>
                  Traders may therefore see multiple changes in direction
                  throughout the day.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* AVOID PREDICTING FED */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">
                Why Traders Should Avoid Predicting the{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Fed Reaction
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                A common mistake before major central-bank decisions is becoming
                emotionally attached to one outcome.
              </p>
              <p>For example:</p>
            </div>
            <blockquote className="glass rounded-xl border-l-2 border-trading-gold/50 px-6 py-4 mb-6 italic text-foreground/90 text-base md:text-lg">
              “Fed hikes, therefore gold must fall.”
            </blockquote>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>Financial markets are rarely that simple.</p>
              <p>
                If traders already expect the Fed to increase rates, the actual
                decision may produce a very different reaction from what appears
                logical.
              </p>
              <p>The market may focus on:</p>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <li>Whether the decision matched expectations</li>
              <li>Changes to economic projections</li>
              <li>Inflation forecasts</li>
              <li>Growth forecasts</li>
              <li>The expected path of future interest rates</li>
              <li>The tone of the press conference</li>
              <li>Comments about future meetings</li>
            </ul>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              The better approach is to prepare scenarios and react to market
              structure after the information becomes available.
            </p>
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
                    Risk Management During a{" "}
                  </span>
                  <span className="text-trading-gold text-glow-gold">
                    High-Volatility Week
                  </span>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                <p>
                  This week&apos;s calendar makes risk management particularly
                  important.
                </p>
                <p>Major economic events can produce:</p>
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
                </p>
                <p>
                  Position size should also reflect the distance between the
                  entry and stop loss.
                </p>
                <p>
                  Increasing risk simply because a setup looks attractive can
                  turn one losing trade into an unnecessarily large loss.
                </p>
                <p>No technical level is guaranteed to hold.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* BREAKEVEN */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">
                When Should Traders Consider{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Breakeven?
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              <p>
                Moving a stop to breakeven can help protect a position after the
                market has moved favourably, but moving it too early can also
                close a good trade during a normal retracement.
              </p>
              <p>
                Instead of using breakeven automatically, traders can look for
                structural reasons.
              </p>
              <p>Examples may include:</p>
            </div>
            <ul className="space-y-2 mb-6">
              {[
                "Price breaking an important intraday level",
                "A first objective being reached",
                "A meaningful move away from the entry",
                "New structure forming in the trade direction",
                "Approaching high-impact economic news",
              ].map((item) => (
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
              The purpose of breakeven is risk management, not fear management.
            </p>
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
                    September 14–18
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
              <span className="text-foreground">
                XAUUSD Weekly Outlook:{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Final View
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Gold begins the September 14–18 trading week after buyers
                successfully defended the $4,290–$4,300 region, but the market
                still has important resistance overhead.
              </p>
              <p>That creates two clear areas of interest.</p>
              <p>
                Bulls will want to see gold maintain support, recover $4,400 and
                eventually break through approximately $4,443–$4,450.
              </p>
              <p>
                Bears will be watching for rejection from resistance or a
                confirmed breakdown beneath the recent $4,290–$4,300 lows.
              </p>
              <p>
                Wednesday&apos;s Federal Reserve decision could determine which
                side gains control.
              </p>
              <p>
                Until then, patience may be more valuable than prediction.
              </p>
              <p>
                Instead of trying to forecast every candle, identify your
                important areas and wait for price to show how buyers and sellers
                react around them.
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
                  and educational trading updates.
                </p>
                <p>
                  For more educational market content, explore our{" "}
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
                  financial instrument.
                </p>
                <p>Market conditions can change quickly.</p>
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
                  Statistics, US Census Bureau, UK Office for National
                  Statistics, Bank of England and established financial-market
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
