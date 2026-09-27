import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  Calendar,
  Globe,
  AlertTriangle,
  Target,
  CheckCircle2,
  BookOpen,
  Newspaper,
  LineChart,
  Layers,
  Activity,
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

const post = getBlogPost("xauusd-weekly-forecast-september-28-october-2-2026")!;

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
const keyLevelsTable = [
  { area: "Last week’s low", level: "~$4,245", why: "Main downside reference from the previous week", tone: "muted" as const },
  { area: "Immediate support", level: "$4,240–$4,250", why: "First zone buyers recently defended", tone: "gold" as const },
  { area: "Secondary support", level: "$4,210–$4,230", why: "Next area if the recent low fails", tone: "gold" as const },
  { area: "Psychological support", level: "~$4,200", why: "Major round-number reference", tone: "gold" as const },
  { area: "Immediate resistance", level: "$4,300–$4,320", why: "First recovery hurdle", tone: "green" as const },
  { area: "Secondary resistance", level: "$4,365–$4,390", why: "Previous weekly structure", tone: "green" as const },
  { area: "Major resistance", level: "$4,400–$4,440", why: "Larger recovery zone", tone: "green" as const },
];

const economicEvents = [
  {
    day: "Tuesday, September 29 — JOLTS",
    points: [
      "The US Job Openings and Labor Turnover Survey (JOLTS) for August is scheduled for 10:00 AM ET / 3:00 PM BST.",
      "JOLTS provides information about labour demand and the relationship between available workers and open positions.",
      "Gold traders mainly care about what the data may imply for interest-rate expectations, Treasury yields and the US dollar.",
      "A result that meaningfully changes expectations for Federal Reserve policy can affect XAU/USD. However, the reaction is not mechanical — watch how gold behaves together with yields and the dollar after the release.",
    ],
  },
  {
    day: "Wednesday, September 30 — PCE & GDP",
    points: [
      "The US Bureau of Economic Analysis is scheduled to release August Personal Income and Outlays at 8:30 AM ET / 1:30 PM BST. The report includes the PCE price indexes.",
      "The BEA is also scheduled to release the third estimate of second-quarter US GDP at the same time.",
      "For UK readers, the Office for National Statistics is scheduled to publish the UK’s quarterly national accounts for April to June 2026 at 7:00 AM BST.",
      "This creates a busy Wednesday for both US and UK market participants.",
    ],
  },
  {
    day: "Thursday, October 1 — ISM Manufacturing",
    points: [
      "The September ISM Manufacturing PMI is scheduled for 10:00 AM ET / 3:00 PM BST.",
      "Manufacturing PMI can influence expectations for US economic growth and inflation. Traders may also pay attention to components such as employment, new orders and prices.",
      "Thursday is also the final full session before Friday’s employment report. Positioning ahead of Nonfarm Payrolls may affect intraday price action.",
    ],
  },
  {
    day: "Friday, October 2 — Nonfarm Payrolls",
    points: [
      "The US Employment Situation report for September is scheduled for 8:30 AM ET / 1:30 PM BST.",
      "The report includes Nonfarm Payrolls, the unemployment rate, average hourly earnings and revisions to previous employment data.",
      "The labour market matters because it can change expectations for economic growth and Federal Reserve policy. Those expectations can affect Treasury yields and the US dollar.",
      "Gold can therefore experience substantial volatility around the release. The first move does not always become the final direction.",
    ],
  },
];

const checklistItems = [
  "Previous week’s high",
  "Previous week’s low",
  "$4,240–$4,250 support",
  "$4,210–$4,230 secondary support",
  "$4,200 psychological area",
  "$4,300–$4,320 resistance",
  "$4,365–$4,390 resistance",
  "$4,400–$4,440 major resistance",
  "Daily market structure",
  "Four-hour market structure",
  "London-session structure",
  "New York-session structure",
  "US Treasury yields",
  "US dollar direction",
  "Tuesday JOLTS",
  "Wednesday PCE inflation",
  "Wednesday US GDP",
  "Wednesday UK GDP",
  "Thursday ISM Manufacturing",
  "Friday Nonfarm Payrolls",
  "Unemployment rate",
  "Average hourly earnings",
  "Stop-loss location",
  "Position size",
  "Risk-to-reward",
  "Whether the setup has actually been confirmed",
];

const faqs = [
  {
    q: "What is the XAUUSD forecast for this week?",
    a: "Gold begins September 28–October 2 below $4,300 after trading as low as approximately $4,245 during the previous week. The first support area is approximately $4,240–$4,250, while buyers would need to recover roughly $4,300–$4,320 to strengthen the short-term recovery case.",
  },
  {
    q: "What are the main XAUUSD support levels this week?",
    a: "The nearest support zone is approximately $4,240–$4,250. Below that, traders can monitor approximately $4,210–$4,230 and the psychological $4,200 area.",
  },
  {
    q: "What are the main gold resistance levels this week?",
    a: "Immediate resistance is approximately $4,300–$4,320. Above that, approximately $4,365–$4,390 becomes important, followed by broader resistance around $4,400–$4,440.",
  },
  {
    q: "Is XAUUSD bullish or bearish this week?",
    a: "Gold begins the week with short-term bearish pressure still visible below $4,300, but buyers recently defended approximately $4,245. The technical picture becomes more constructive if price reclaims $4,300–$4,320 and stronger again above $4,365–$4,390. A confirmed loss of approximately $4,240 would strengthen the bearish scenario.",
  },
  {
    q: "When is US PCE inflation released this week?",
    a: "The US Personal Income and Outlays report for August is scheduled for Wednesday, September 30, 2026 at 8:30 AM Eastern Time, or 1:30 PM British Summer Time.",
  },
  {
    q: "When is Nonfarm Payrolls this week?",
    a: "The US Employment Situation report for September is scheduled for Friday, October 2, 2026 at 8:30 AM Eastern Time, or 1:30 PM British Summer Time.",
  },
  {
    q: "Why does Nonfarm Payrolls affect gold?",
    a: "Employment data can influence expectations for US economic growth and Federal Reserve policy. Those expectations can affect Treasury yields and the US dollar, which can influence XAU/USD.",
  },
  {
    q: "Why does PCE inflation affect gold?",
    a: "PCE inflation can influence expectations about future US monetary policy. Changes in those expectations may affect Treasury yields and the US dollar, both of which can influence gold prices.",
  },
];

const continueLearning = [
  {
    href: "/xauusd-support-resistance/",
    title: "XAUUSD Support and Resistance",
    desc: "How to identify important gold support and resistance zones, mark key levels and combine them with market structure for clearer trade planning.",
    icon: <Layers className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/xauusd-analysis/",
    title: "XAUUSD Analysis",
    desc: "The main hub for XAUUSD and gold market analysis — price action, key levels, market structure and the broader analytical framework.",
    icon: <LineChart className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/gold-signals/",
    title: "Gold Signals",
    desc: "Educational gold signals and XAUUSD market observations covering price action, key levels, trading sessions and risk management.",
    icon: <Newspaper className="w-7 h-7 text-trading-green" />,
    accent: "from-trading-green/10 to-transparent",
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
export default function WeeklyForecastSep28Oct2Page() {
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
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-trading-gold/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-trading-green/5 rounded-full blur-[100px] pointer-events-none" />
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
              <span className="text-foreground/80">
                XAUUSD Weekly Forecast Sep 28–Oct 2
              </span>
            </nav>

            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-gold">
                <Calendar className="w-4 h-4" />
                XAUUSD Weekly Forecast · Sep 28–Oct 2, 2026
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">
                XAUUSD Weekly Forecast: Gold Price Outlook &amp; Key Levels for
                Sep 28–Oct 2, 2026
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
                Gold enters the September 28–October 2 trading week below the
                important $4,300 area after sellers controlled much of the
                previous week.
              </p>
              <p>
                XAU/USD closed Friday near $4,287 after trading as low as
                approximately $4,245 during the week. That leaves gold close to
                an important support area, but still below the resistance buyers
                need to recover before the short-term technical picture
                improves.
              </p>
              <p>
                The economic calendar also becomes increasingly important as the
                week develops. US JOLTS job-openings data arrives Tuesday, US
                PCE inflation and an updated GDP estimate arrive Wednesday, ISM
                Manufacturing is due Thursday, and the September US Employment
                Situation report — including Nonfarm Payrolls — arrives Friday.
              </p>
              <p>
                That combination makes this an important week for traders
                watching the US dollar, Treasury yields and XAU/USD.
              </p>
              <p>
                Instead of predicting one guaranteed direction, this XAUUSD
                weekly forecast maps the important gold levels and explains what
                would strengthen the bullish, bearish or range scenario.
              </p>
              <p className="text-foreground/90 font-medium">
                The levels below are approximate technical zones for educational
                analysis. They are not guaranteed entries or trade
                recommendations.
              </p>
            </div>
          </HeroAnimation>
        </section>

        {/* QUICK ANSWER */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">XAUUSD Forecast This Week:{" "}
                </span>
                <span className="text-trading-gold text-glow-gold">
                  Quick Answer
                </span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  XAU/USD enters September 28–October 2 around the $4,287 area
                  after trading between approximately $4,245 and $4,388 during
                  the previous week.
                </p>
                <p>
                  The first important support zone is approximately{" "}
                  <strong className="text-foreground/90">$4,240–$4,250</strong>.
                  Below that, traders can monitor approximately{" "}
                  <strong className="text-foreground/90">$4,210–$4,230</strong>{" "}
                  and the psychological{" "}
                  <strong className="text-foreground/90">$4,200</strong> level.
                </p>
                <p>
                  The first resistance buyers need to recover is approximately{" "}
                  <strong className="text-foreground/90">$4,300–$4,320</strong>.
                  Above that,{" "}
                  <strong className="text-foreground/90">$4,365–$4,390</strong>{" "}
                  becomes the next important technical area, followed by broader
                  resistance around{" "}
                  <strong className="text-foreground/90">$4,400–$4,440</strong>.
                </p>
                <p>
                  The week&apos;s biggest scheduled US catalysts are PCE
                  inflation, ISM Manufacturing and Friday&apos;s Nonfarm
                  Payrolls report.
                </p>
                <p>
                  The technical picture therefore begins cautiously below
                  $4,300, but the upcoming macro data could quickly change the
                  structure.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* KEY LEVELS TABLE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Gold Price Forecast This Week:{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Key Levels
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              The table below summarises the main XAUUSD areas to watch this
              week. On mobile it scrolls horizontally inside its container — it
              will not break the page layout.
            </p>

            <div className="glass-strong rounded-2xl gradient-border overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-trading-gold whitespace-nowrap">
                        XAUUSD Area
                      </th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-trading-gold whitespace-nowrap">
                        Level
                      </th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-trading-gold">
                        Why It Matters
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {keyLevelsTable.map((row, i) => (
                      <tr
                        key={row.area}
                        className={
                          i < keyLevelsTable.length - 1
                            ? "border-b border-white/5"
                            : ""
                        }
                      >
                        <td className="px-4 py-4 text-sm md:text-base text-foreground font-semibold whitespace-nowrap align-top">
                          {row.area}
                        </td>
                        <td
                          className={`px-4 py-4 text-sm md:text-base font-bold whitespace-nowrap align-top ${
                            row.tone === "green"
                              ? "text-trading-green"
                              : row.tone === "gold"
                              ? "text-trading-gold"
                              : "text-muted-foreground"
                          }`}
                        >
                          {row.level}
                        </td>
                        <td className="px-4 py-4 text-sm md:text-base text-muted-foreground align-top">
                          {row.why}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Levels are approximate technical zones. Spot gold prices can
              differ slightly between brokers and liquidity providers.
            </p>
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
                Gold began the previous trading week around the upper $4,300s
                but struggled to hold those levels.
              </p>
              <p>
                XAU/USD reached approximately $4,388 early in the week before
                selling pressure returned. Price then moved lower through the
                middle of the week and eventually traded near approximately
                $4,245.
              </p>
              <p>
                Friday produced a modest recovery, with spot gold finishing
                around $4,287.
              </p>
              <p>The weekly structure therefore left two important messages.</p>
              <p>
                First, buyers reacted around the lower $4,200s. Second, they
                were not yet able to reclaim the $4,300 area convincingly. That
                keeps the short-term structure cautious going into the new week.
              </p>
              <p>
                Treasury yields, US-dollar movement and expectations for future
                Federal Reserve policy also remain important macro drivers for
                gold. For a deeper explanation of these forces, read our{" "}
                <Link
                  href="/blog/xauusd-fundamental-analysis/"
                  className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                >
                  XAUUSD fundamental analysis
                </Link>{" "}
                guide.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* TECHNICAL ANALYSIS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">XAUUSD Technical Analysis for{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Sep 28–Oct 2
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The short-term XAUUSD structure remains under pressure while
                price stays below the main recovery zones.
              </p>
              <p>
                The previous week&apos;s decline created lower short-term price
                structure, but the reaction near approximately $4,245 means
                sellers have not yet produced an uncontested breakdown.
              </p>
              <p>This creates three useful scenarios.</p>
              <ul className="space-y-2 pl-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                  <span>
                    A recovery above $4,300–$4,320 would be the first sign that
                    buyers are rebuilding momentum.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                  <span>
                    A stronger recovery through $4,365–$4,390 would materially
                    improve the short-term structure.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-trading-red shrink-0 mt-1" />
                  <span>
                    A confirmed breakdown beneath approximately $4,240 would
                    increase the risk of a deeper move toward $4,230–$4,210 and
                    potentially the $4,200 psychological region.
                  </span>
                </li>
              </ul>
              <p>
                If gold remains between roughly $4,250 and $4,320, the market
                may instead continue consolidating until one side establishes
                clearer control.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SUPPORT LEVELS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">XAUUSD Support Levels{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                This Week
              </span>
            </h2>

            <div className="space-y-8">
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-gold mb-4">
                  $4,240–$4,250: Immediate Gold Support
                </h3>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    The most important nearby support zone begins around
                    $4,240–$4,250. Gold reached approximately this region during
                    the previous week&apos;s decline before buyers appeared.
                  </p>
                  <p>
                    That makes it an important technical reference heading into
                    the new week. If price revisits the zone, traders should
                    focus on the reaction.
                  </p>
                  <p>Useful information could include:</p>
                  <ul className="space-y-1 pl-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                      <span>rejection of lower prices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                      <span>formation of a higher low</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                      <span>recovery above intraday resistance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                      <span>a shift from lower highs toward higher highs</span>
                    </li>
                  </ul>
                  <p>
                    A touch of support alone is not confirmation. The market
                    must show that buyers are actually defending the zone.
                  </p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-gold mb-4">
                  $4,210–$4,230: Secondary Support
                </h3>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    If the recent weekly low fails, approximately $4,210–$4,230
                    becomes the next important support region.
                  </p>
                  <p>
                    This zone becomes particularly relevant if price breaks
                    below $4,240 and later fails to recover the broken support.
                    That would indicate that the previous week&apos;s floor is
                    no longer functioning effectively.
                  </p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-gold mb-4">
                  $4,200: Psychological Support
                </h3>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    The $4,200 area is an important round-number reference.
                    Round numbers can attract attention and orders, but they
                    should not be treated as guaranteed reversal levels.
                  </p>
                  <p>
                    If price approaches $4,200, traders should still evaluate
                    the surrounding market structure rather than assuming the
                    level must hold.
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
              <span className="text-foreground">XAUUSD Resistance Levels{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                This Week
              </span>
            </h2>

            <div className="space-y-8">
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-green mb-4">
                  $4,300–$4,320: First Recovery Hurdle
                </h3>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    The $4,300 region is likely to be one of the most closely
                    watched areas early in the week. It is psychologically
                    important and sits directly above Friday&apos;s close.
                  </p>
                  <p>
                    A sustained recovery above $4,300–$4,320 would be an early
                    indication that buyers are attempting to reverse part of the
                    previous week&apos;s decline.
                  </p>
                  <p>
                    However, a quick move above the zone followed by an
                    immediate return below it would provide very different
                    information from a breakout that holds and successfully
                    retests the area.
                  </p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-green mb-4">
                  $4,365–$4,390: Secondary Resistance
                </h3>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Above $4,320, the next significant technical region is
                    approximately $4,365–$4,390. This area contains price
                    structure from the previous week.
                  </p>
                  <p>
                    Recovering it would represent a more meaningful technical
                    improvement than simply moving back above $4,300.
                  </p>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                <h3 className="text-lg md:text-xl font-bold text-trading-green mb-4">
                  $4,400–$4,440: Major Resistance
                </h3>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    The broader recovery case becomes considerably stronger if
                    gold can eventually reclaim the $4,400–$4,440 region. This
                    area contains significant September structure.
                  </p>
                  <p>
                    Until price begins holding above this broader zone, traders
                    should remain aware that rallies may still be corrective
                    within the recent weakness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* BULLISH OR BEARISH */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Is XAUUSD Bullish or </span>
              <span className="text-trading-gold text-glow-gold">
                Bearish This Week?
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Gold begins the week with short-term bearish pressure still
                visible, but price is also sitting above an important recent
                low. That means the market does not need to be forced into a
                permanent bullish or bearish label.
              </p>
              <p>The levels can provide confirmation.</p>
              <p>
                The recovery case improves above{" "}
                <strong className="text-foreground/90">$4,300–$4,320</strong>{" "}
                and becomes considerably stronger above{" "}
                <strong className="text-foreground/90">$4,365–$4,390</strong>.
              </p>
              <p>
                The bearish case strengthens below{" "}
                <strong className="text-foreground/90">$4,240–$4,250</strong>,
                especially if price breaks the area and then fails to recover
                it.
              </p>
              <p>
                Between approximately $4,250 and $4,320, range conditions
                remain possible.
              </p>
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
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                A constructive bullish sequence could look like this:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-4">
                {[
                  "Gold continues defending approximately $4,240–$4,250.",
                  "Buyers form a higher low.",
                  "Price recovers $4,300–$4,320.",
                  "A retest of that region holds.",
                  "Buyers challenge $4,365–$4,390.",
                  "A sustained breakout through that area opens the possibility of $4,400–$4,440.",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-base md:text-lg text-muted-foreground leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ol>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                The important word is{" "}
                <strong className="text-foreground/90">confirmation</strong>.
                One strong candle does not automatically reverse an entire
                weekly structure.
              </p>
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
                  The bearish case remains relevant while gold trades beneath
                  major resistance. One scenario would involve rejection from
                  $4,300–$4,320 followed by another lower high.
                </p>
                <p>A stronger bearish sequence would be:</p>
                <ol className="list-decimal list-inside space-y-2">
                  {[
                    "Gold breaks below approximately $4,240.",
                    "Price fails to recover the broken area.",
                    "Former support begins acting as resistance.",
                    "Sellers move toward $4,230–$4,210.",
                    "The $4,200 psychological area becomes increasingly relevant.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-base md:text-lg text-muted-foreground leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ol>
                <p>
                  Traders should still be cautious about chasing a breakdown
                  after an already extended move, particularly during major US
                  economic releases.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* WHAT WOULD CHANGE THIS FORECAST */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">What Would Change This{" "}
                </span>
                <span className="text-trading-gold text-glow-gold">
                  XAUUSD Forecast?
                </span>
              </h2>

              <div className="space-y-6">
                <div className="glass rounded-xl p-5 border border-trading-green/20">
                  <h3 className="text-base md:text-lg font-bold text-trading-green mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    What Would Strengthen the Bullish Case?
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    A sustained recovery above $4,365–$4,390 would materially
                    improve the short-term structure. Acceptance above
                    approximately $4,400–$4,440 would strengthen the recovery
                    case further.
                  </p>
                </div>

                <div className="glass rounded-xl p-5 border border-trading-red/20">
                  <h3 className="text-base md:text-lg font-bold text-trading-red mb-2 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5" />
                    What Would Strengthen the Bearish Case?
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    A confirmed break beneath approximately $4,240 followed by
                    failure to reclaim that area would weaken the existing
                    support structure. That would expose approximately
                    $4,230–$4,210 and potentially $4,200.
                  </p>
                </div>

                <div className="glass rounded-xl p-5 border border-white/10">
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-trading-gold" />
                    What Would Keep Gold Neutral?
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    If XAU/USD remains trapped between roughly $4,250 and
                    $4,320, the market may simply be consolidating. In that
                    environment, avoiding a forced directional conclusion may
                    be more useful than trying to predict every intraday move.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ECONOMIC EVENTS — DAY BY DAY */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">
                Gold Forecast Before the Week&apos;s Major US Releases
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              This week brings a dense calendar of US economic data. Each
              release can change expectations for the Federal Reserve, Treasury
              yields and the US dollar — and therefore for XAU/USD.
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

        {/* WHY PCE MATTERS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Why PCE Inflation Matters for{" "}
                </span>
                <span className="text-trading-gold text-glow-gold">Gold</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Inflation data can influence expectations about future Federal
                  Reserve policy. If inflation appears persistent, markets may
                  expect monetary policy to remain tighter for longer.
                </p>
                <p>
                  That can place upward pressure on Treasury yields and the US
                  dollar, which can create challenges for non-yielding gold.
                  Softer inflation can sometimes have the opposite effect.
                </p>
                <p>However, traders should not assume:</p>
                <blockquote className="glass rounded-xl border-l-2 border-trading-red/50 px-6 py-4 my-4 italic text-foreground/90 text-base md:text-lg">
                  &ldquo;Higher PCE automatically means gold falls.&rdquo;
                </blockquote>
                <p>or</p>
                <blockquote className="glass rounded-xl border-l-2 border-trading-red/50 px-6 py-4 my-4 italic text-foreground/90 text-base md:text-lg">
                  &ldquo;Lower PCE automatically means gold rises.&rdquo;
                </blockquote>
                <p>
                  Markets often react to the difference between expectations and
                  the actual result. After the release, watch:
                </p>
                <ul className="space-y-1 pl-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>XAU/USD</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>US Treasury yields</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>US dollar movement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>whether key support/resistance breaks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>whether the first reaction is sustained or reversed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* WHY NFP MATTERS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Why Nonfarm Payrolls Can Move{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">XAUUSD</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>US employment data can influence several markets at once.</p>
              <p>A significant surprise can move:</p>
              <ul className="space-y-1 pl-2">
                <li className="flex items-start gap-2">
                  <Activity className="w-4 h-4 text-trading-gold shrink-0 mt-1" />
                  <span>Treasury yields</span>
                </li>
                <li className="flex items-start gap-2">
                  <Activity className="w-4 h-4 text-trading-gold shrink-0 mt-1" />
                  <span>US dollar</span>
                </li>
                <li className="flex items-start gap-2">
                  <Activity className="w-4 h-4 text-trading-gold shrink-0 mt-1" />
                  <span>rate expectations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Activity className="w-4 h-4 text-trading-gold shrink-0 mt-1" />
                  <span>equity markets</span>
                </li>
                <li className="flex items-start gap-2">
                  <Activity className="w-4 h-4 text-trading-gold shrink-0 mt-1" />
                  <span>gold</span>
                </li>
              </ul>
              <p>
                For XAU/USD traders, the important question is not simply
                whether payrolls are &ldquo;good&rdquo; or &ldquo;bad.&rdquo;
                The important question is how the result changes market
                expectations. That is why watching the reaction in yields and
                the dollar can add useful context.
              </p>
              <p>
                The first move does not always become the final direction.
                Waiting for price structure to become clearer after the initial
                reaction may provide more information than trying to predict the
                first spike.
              </p>
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
                  <span className="text-foreground">London Session XAUUSD{" "}
                  </span>
                  <span className="text-trading-green text-glow-green">
                    Outlook
                  </span>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The London session often provides the first meaningful
                  intraday structure for gold. Before London becomes active,
                  mark:
                </p>
                <ul className="space-y-1 pl-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>Asian-session high</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>Asian-session low</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>previous-day high</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>previous-day low</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>nearby weekly support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>nearby weekly resistance</span>
                  </li>
                </ul>
                <p>
                  If London breaks an overnight range, do not automatically
                  assume continuation. Gold frequently produces liquidity sweeps
                  and failed breakouts.
                </p>
                <p>
                  This week, Wednesday and Friday deserve additional caution
                  because major US releases arrive later in the day. A strong
                  London move can still reverse when New York data changes
                  market expectations.
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
                  <span className="text-foreground">New York Session XAUUSD{" "}
                  </span>
                  <span className="text-trading-gold text-glow-gold">
                    Outlook
                  </span>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The New York session should be especially important this week.
                  Tuesday&apos;s JOLTS report, Wednesday&apos;s PCE/GDP
                  releases, Thursday&apos;s ISM Manufacturing report and
                  Friday&apos;s Employment Situation all occur during US trading
                  hours.
                </p>
                <p>Before each release, know:</p>
                <ul className="space-y-1 pl-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>nearest support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>nearest resistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>current market structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>release time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>invalidation point</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>maximum acceptable risk</span>
                  </li>
                </ul>
                <p>
                  Do not wait until volatility arrives to build the plan.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* USD AND TREASURY YIELDS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Watch the US Dollar and{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Treasury Yields
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                XAU/USD should not be analysed in isolation. The US dollar and
                Treasury yields remain useful contextual markets.
              </p>
              <p>
                Rising yields can increase the opportunity cost of holding
                non-yielding gold. A stronger US dollar can also create pressure
                on dollar-denominated gold. Falling yields and a weaker dollar
                can provide support.
              </p>
              <p>
                These relationships do not work perfectly in every session. They
                should be treated as context rather than guaranteed trading
                signals.
              </p>
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
                  <span className="text-foreground">XAUUSD Weekly{" "}
                  </span>
                  <span className="text-trading-green text-glow-green">
                    Trading Checklist
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
              <span className="text-foreground">XAUUSD Weekly Forecast:{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Final View
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Gold enters September 28–October 2 below $4,300 after sellers
                controlled much of the previous week.
              </p>
              <p>
                The first major downside reference is approximately
                $4,240–$4,250. As long as that region continues to hold, buyers
                still have an opportunity to build a recovery.
              </p>
              <p>
                The first step would be reclaiming $4,300–$4,320. A stronger
                move through $4,365–$4,390 would improve the technical picture
                further and could eventually bring $4,400–$4,440 back into
                focus.
              </p>
              <p>
                On the bearish side, a confirmed breakdown below approximately
                $4,240 would weaken the recent support structure and expose the
                $4,230–$4,210 region, followed by the psychological $4,200
                area.
              </p>
              <p>
                The macro calendar could determine which scenario develops. With
                JOLTS, PCE, ISM Manufacturing and Nonfarm Payrolls all
                scheduled during the week, traders should remain flexible
                rather than becoming attached to one prediction.
              </p>
              <p>Prepare the important levels.</p>
              <p>Know the economic-event times.</p>
              <p>Watch the market reaction.</p>
              <p>
                And wait for confirmation before treating a scenario as active.
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
                  For a deeper explanation of how important gold zones are
                  identified, read our{" "}
                  <Link
                    href="/xauusd-support-resistance/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    XAUUSD Support and Resistance
                  </Link>{" "}
                  guide.
                </p>
                <p>
                  You can also explore our{" "}
                  <Link
                    href="/xauusd-analysis/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    XAUUSD Analysis
                  </Link>{" "}
                  section for technical-market education and our{" "}
                  <Link
                    href="/gold-signals/"
                    className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors"
                  >
                    Gold Signals
                  </Link>{" "}
                  section for educational gold-market observations.
                </p>
                <p>
                  To learn more about ForexWizard and our approach, visit{" "}
                  <Link
                    href="/about/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    About ForexWizard
                  </Link>
                  .
                </p>
                <p>
                  Readers who want regular educational XAU/USD market
                  observations can also follow the ForexWizzz Telegram
                  community.
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

        {/* RISK DISCLAIMER + SOURCES & METHODOLOGY */}
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
                <p>
                  Technical levels can fail. Economic releases can cause rapid
                  volatility, spreads may widen and market conditions can change
                  quickly.
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
                Sources and Methodology
              </h2>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                  This weekly analysis combines publicly available spot-gold
                  market data, higher-timeframe technical structure and
                  scheduled macroeconomic releases.
                </p>
                <p>
                  Economic-event dates and times should be verified immediately
                  before publication using official schedules from:
                </p>
                <ul className="space-y-1 pl-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>US Bureau of Labor Statistics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>US Bureau of Economic Analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>Institute for Supply Management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>UK Office for National Statistics</span>
                  </li>
                </ul>
                <p>
                  Spot XAU/USD prices can differ slightly between brokers and
                  liquidity providers, so the technical prices in this article
                  should be treated as approximate zones rather than exact
                  guaranteed values.
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
                Explore related ForexWizard guides to deepen your gold trading
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
