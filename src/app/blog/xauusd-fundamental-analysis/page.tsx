import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  TrendingUp,
  Globe,
  AlertTriangle,
  Target,
  CheckCircle2,
  LineChart,
  Layers,
  Activity,
  DollarSign,
  Percent,
  Landmark,
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

const post = getBlogPost("xauusd-fundamental-analysis")!;

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
const driversTable = [
  {
    driver: "Federal Reserve policy",
    monitor: "FOMC decisions, dot plot, forward guidance, speeches",
    why: "Shapes rate expectations, which influence yields and the dollar.",
  },
  {
    driver: "Real Treasury yields",
    monitor: "10-year TIPS yield, nominal 10-year yield, breakeven inflation",
    why: "Reflects the inflation-adjusted opportunity cost of holding gold.",
  },
  {
    driver: "US dollar",
    monitor: "DXY (US Dollar Index), major FX pairs",
    why: "Gold is dollar-denominated; a stronger dollar can pressure gold.",
  },
  {
    driver: "Inflation",
    monitor: "CPI, Core CPI, PCE, Core PCE, PPI, inflation expectations",
    why: "Drives Fed policy expectations and long-term store-of-value demand.",
  },
  {
    driver: "Employment",
    monitor: "Nonfarm Payrolls, unemployment rate, wages, jobless claims",
    why: "Strong labour data can reduce expectations of easier policy.",
  },
  {
    driver: "Economic growth",
    monitor: "GDP, retail sales, ISM/PMI, consumer confidence, housing",
    why: "Affects risk sentiment and Fed policy expectations indirectly.",
  },
  {
    driver: "Risk / geopolitical sentiment",
    monitor: "Geopolitical events, financial stability, safe-haven flows",
    why: "Gold is often viewed as a safe-haven asset during stress.",
  },
  {
    driver: "Central-bank demand",
    monitor: "Official-sector gold purchases (World Gold Council, IMF)",
    why: "Sustained official demand can influence the longer-term backdrop.",
  },
  {
    driver: "Physical / investment demand",
    monitor: "ETF flows, bar and coin demand, jewellery, seasonal demand",
    why: "Medium-term supply-demand balance for physical gold.",
  },
];

const eventsTable = [
  { event: "FOMC rate decision", why: "Sets the federal-funds target range", channel: "Rate expectations → yields → USD → gold" },
  { event: "Fed Chair press conference", why: "Forward guidance and tone", channel: "Policy expectations → yields → gold" },
  { event: "CPI / Core CPI", why: "Headline inflation gauge", channel: "Fed expectations → yields/USD → gold" },
  { event: "PCE / Core PCE", why: "Fed's preferred inflation measure", channel: "Fed expectations → yields → gold" },
  { event: "PPI", why: "Producer-level price pressure", channel: "Inflation pipeline expectations → gold" },
  { event: "Nonfarm Payrolls", why: "Labour-market strength", channel: "Fed expectations → yields/USD → gold" },
  { event: "Unemployment rate", why: "Labour-market slack", channel: "Fed expectations → gold" },
  { event: "Average hourly earnings", why: "Wage inflation", channel: "Inflation/Fed expectations → gold" },
  { event: "Retail sales", why: "Consumer spending strength", channel: "Growth/Fed expectations → gold" },
  { event: "GDP", why: "Broad economic growth", channel: "Fed expectations, risk sentiment → gold" },
  { event: "ISM / PMIs", why: "Business activity sentiment", channel: "Growth expectations → gold" },
  { event: "Consumer sentiment", why: "Consumer inflation expectations", channel: "Inflation expectations → gold" },
  { event: "Initial jobless claims", why: "Weekly labour-market signal", channel: "Fed expectations → gold" },
];

const commonMistakes = [
  { title: "Assuming higher inflation automatically means higher gold", desc: "Short-term, hot inflation can lift yields and the dollar, pressuring gold. The long-term hedge narrative and the short-term trading reaction can differ." },
  { title: "Assuming every Fed hike automatically means lower gold", desc: "If a hike was already priced in or guidance is less restrictive than feared, gold may not fall. Expectations matter more than the label." },
  { title: "Ignoring market expectations", desc: "The same data print can produce opposite reactions depending on what was expected. Always compare actual versus forecast." },
  { title: "Watching XAUUSD without watching yields or USD", desc: "Gold rarely moves in isolation. Tracking yields and the dollar alongside gold adds essential context." },
  { title: "Trading the headline while ignoring revisions", desc: "Revisions and underlying components can tell a different story than the headline number." },
  { title: "Treating correlations as permanent", desc: "The gold-dollar or gold-yields relationship can break for extended periods. Several forces act on gold simultaneously." },
  { title: "Entering during extreme news volatility without slippage planning", desc: "Spreads can widen and orders can fill well beyond expected levels around major releases." },
  { title: "Using fundamentals without knowing technical structure", desc: "Fundamentals explain why; technicals show where. Using both is more robust than using either alone." },
  { title: "Building a narrative after the move has already happened", desc: "Rationalising a move after the fact is not the same as analysing it in advance." },
  { title: "Treating analysis as certainty", desc: "No fundamental framework guarantees a direction. Markets are influenced by many variables at once." },
];

const faqs = [
  {
    q: "What is XAUUSD fundamental analysis?",
    a: "XAUUSD fundamental analysis is the study of the economic, monetary and geopolitical forces that can influence demand for gold and the US dollar. It complements technical analysis, which studies price and market structure. Neither approach guarantees future price movements.",
  },
  {
    q: "What fundamental factors affect XAUUSD?",
    a: "The major factors include Federal Reserve policy, nominal and real Treasury yields, the US dollar, inflation data, employment reports, economic growth, risk sentiment, central-bank gold demand and physical/investment demand. Each factor matters, and their relative importance can shift over time.",
  },
  {
    q: "How does the Federal Reserve affect gold?",
    a: "The Fed influences rate expectations, which in turn affect Treasury yields and the dollar. More restrictive expected policy can create a headwind for gold, while expectations of easier policy can help. However, the reaction depends on whether the outcome was already priced in.",
  },
  {
    q: "Why do Treasury yields affect gold prices?",
    a: "Gold does not pay interest. When yields on interest-bearing government securities rise, gold may become relatively less attractive to some investors because the opportunity cost of holding it increases. When yields fall, that pressure may ease.",
  },
  {
    q: "What are real yields and why do they matter for gold?",
    a: "Real yields are nominal yields minus expected inflation, often approximated using Treasury Inflation-Protected Securities (TIPS). They measure the inflation-adjusted return on a government bond relative to non-yielding gold. Gold and real yields have often shown an inverse relationship, though it is not permanent or perfectly inverse.",
  },
  {
    q: "Does a stronger US dollar always make gold fall?",
    a: "No. Gold and the dollar often move in opposite directions, but the relationship is imperfect. During severe risk aversion or financial-system stress, both can rise together as investors seek liquidity and safe-haven assets.",
  },
  {
    q: "How does CPI affect XAUUSD?",
    a: "CPI measures inflation. A hot CPI print can raise expectations of tighter Fed policy, which can lift yields and the dollar and pressure gold. A softer CPI can have the opposite effect. What matters most is how the actual print compares to expectations and what it implies for the policy path.",
  },
  {
    q: "Why does NFP move gold?",
    a: "Nonfarm Payrolls is a key labour-market release. Strong payroll growth and wage gains can reduce expectations of easier monetary policy, influencing yields and the dollar, which can then affect gold. The details beneath the headline can also matter.",
  },
  {
    q: "Is fundamental or technical analysis better for XAUUSD?",
    a: "Neither is strictly better. Fundamental analysis can help answer why the market may move, while technical analysis can help answer where price is reacting. Many traders combine both rather than relying on one in isolation.",
  },
];

const continueLearning = [
  {
    href: "/xauusd-analysis/",
    title: "XAUUSD Analysis Hub",
    desc: "The parent hub for all XAUUSD and gold market analysis — price action, key levels, market structure and the broader analytical framework.",
    icon: <LineChart className="w-7 h-7 text-trading-gold" />,
    accent: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/how-to-read-xauusd-price-action/",
    title: "How to Read XAUUSD Price Action",
    desc: "A dedicated guide to reading candlestick patterns, market structure and price behaviour on XAUUSD charts.",
    icon: <Activity className="w-7 h-7 text-trading-green" />,
    accent: "from-trading-green/10 to-transparent",
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
    accent: "from-trading-gold/10 to-trading-green/10",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function FundamentalAnalysisPage() {
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
                XAUUSD Fundamental Analysis
              </span>
            </nav>

            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-gold">
                <Landmark className="w-4 h-4" />
                Evergreen Educational Guide · Macroeconomics
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">
                XAUUSD Fundamental Analysis: How the Fed, US Dollar and
                Treasury Yields Affect Gold
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
                XAUUSD fundamental analysis is the study of the economic,
                monetary and geopolitical forces that can influence the price of
                gold. While technical analysis examines price and market
                structure, fundamental analysis asks a different question:{" "}
                <strong className="text-foreground/90">
                  why might the market move?
                </strong>
              </p>
              <p>
                This guide explains what actually moves XAUUSD — Federal
                Reserve policy, Treasury yields, the US dollar, inflation,
                employment data, growth, risk sentiment and demand — and how to
                combine those drivers with the technical work already covered in
                our{" "}
                <Link
                  href="/xauusd-analysis/"
                  className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                >
                  complete XAUUSD analysis guide
                </Link>
                .
              </p>
              <p className="text-foreground/90 font-medium">
                This content is educational only and does not represent
                financial advice. None of the relationships described below are
                guaranteed, and no fundamental indicator can predict gold&apos;s
                direction with certainty.
              </p>
            </div>
          </HeroAnimation>
        </section>

        {/* WHAT IS FUNDAMENTAL ANALYSIS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">What Is </span>
              <span className="text-trading-gold text-glow-gold">
                XAUUSD Fundamental Analysis?
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Technical analysis studies price and market structure.
                Fundamental analysis studies the economic, monetary and
                geopolitical forces that can influence demand for gold and the
                US dollar.
              </p>
              <p>
                Neither approach guarantees future price movements. Technical
                analysis can show where price is reacting; fundamental analysis
                can help explain why participants may be repricing gold. Many
                experienced traders use both together rather than relying on one
                in isolation.
              </p>
              <p>
                For gold specifically, fundamental analysis often centres on the
                United States, because XAUUSD is gold priced in US dollars and
                because the dollar and US Treasury yields are deeply connected
                to global gold demand. That does not mean other regions are
                irrelevant — central-bank demand, physical demand and
                geopolitical risk matter too — but the US macro backdrop is
                usually the single most important fundamental frame for XAUUSD.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* WHAT ACTUALLY MOVES XAUUSD — TABLE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">What Actually Moves </span>
              <span className="text-trading-gold text-glow-gold">XAUUSD?</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              Gold is influenced by several drivers at once. The table below
              summarises the major categories, what traders commonly monitor
              within each, and why each can matter for gold.
            </p>

            <div className="glass-strong rounded-2xl gradient-border overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-trading-gold whitespace-nowrap">
                        Driver
                      </th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-trading-gold">
                        What traders monitor
                      </th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-trading-gold">
                        Why it can matter for gold
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {driversTable.map((row, i) => (
                      <tr
                        key={row.driver}
                        className={
                          i < driversTable.length - 1
                            ? "border-b border-white/5"
                            : ""
                        }
                      >
                        <td className="px-4 py-4 text-sm md:text-base text-foreground font-semibold whitespace-nowrap align-top">
                          {row.driver}
                        </td>
                        <td className="px-4 py-4 text-sm md:text-base text-muted-foreground align-top">
                          {row.monitor}
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
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              These drivers interact. A single release can move several of them
              at once, which is why gold sometimes reacts in ways that seem
              counterintuitive at first glance.
            </p>
          </div>
        </FadeSection>

        {/* FEDERAL RESERVE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-green/10 to-transparent flex items-center justify-center">
                  <Landmark className="w-7 h-7 text-trading-green" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">
                    How Federal Reserve Policy{" "}
                  </span>
                  <span className="text-trading-gold text-glow-gold">
                    Affects Gold
                  </span>
                </h2>
              </div>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The Federal Reserve is the central bank of the United States.
                  Its monetary-policy decisions are among the most important
                  fundamental drivers of XAUUSD. Traders commonly monitor:
                </p>
                <ul className="space-y-1">
                  {[
                    "The federal funds target rate",
                    "FOMC decisions and statements",
                    "Forward guidance about the future policy path",
                    "The Summary of Economic Projections",
                    "The dot plot of Fed officials' rate expectations",
                    "Fed Chair press conferences",
                    "Speeches and interviews from Fed officials",
                    "Market-implied expectations for future policy",
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
                <p>
                  A critical distinction: the current policy rate is not the
                  only factor. Markets are constantly repricing expectations for
                  what the Fed may do next. More restrictive expected monetary
                  policy can place upward pressure on yields and the dollar,
                  which can create a headwind for gold. Expectations for easier
                  monetary policy can sometimes have the opposite effect.
                </p>
                <p>
                  However, these relationships are not guaranteed. Risk
                  sentiment, positioning, inflation expectations and whether
                  the outcome was already priced in can all change the reaction.
                </p>
                <p className="text-foreground/90 font-medium">
                  This is why a simplistic &ldquo;rate hike = gold sell&rdquo;
                  or &ldquo;rate cut = gold buy&rdquo; framework can fail. If a
                  rate increase was already fully priced in, or if the
                  Fed&apos;s forward guidance is less restrictive than markets
                  feared, gold may not fall — and can even rise.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* TREASURY YIELDS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Why Treasury Yields Matter for{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">XAUUSD</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                US Treasury yields are closely watched by gold traders because
                of the opportunity-cost idea. Gold itself does not pay interest.
                When yields on interest-bearing government securities rise, gold
                may become relatively less attractive to some investors because
                holding it means giving up a higher available return. When
                yields decline, that opportunity-cost pressure may ease.
              </p>
              <p>
                The 10-year Treasury yield is one of the most commonly
                monitored benchmarks, but traders also watch shorter maturities
                (such as the 2-year yield, which is especially sensitive to
                Fed-policy expectations) and the shape of the yield curve.
              </p>
              <p>
                It is important to distinguish nominal yields from real yields.
                Both can matter, but they measure different things.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* REAL YIELDS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Real Yields and Gold: One of{" "}
                </span>
                <span className="text-trading-gold text-glow-gold">
                  the Most Important Relationships
                </span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Real yield is approximately nominal yield minus expected
                  inflation. In practice, real yields are often approximated
                  using the yield on Treasury Inflation-Protected Securities
                  (TIPS). A commonly monitored benchmark is the US 10-year real
                  (TIPS) yield.
                </p>
                <p>
                  Real yields can be particularly relevant for gold because they
                  provide a rough measure of the inflation-adjusted return
                  available on a government bond relative to a non-yielding
                  asset such as gold.
                </p>
                <p>
                  Historically, gold and real yields have often shown an inverse
                  relationship: when real yields fall, gold has tended to become
                  more attractive, and when real yields rise, gold has sometimes
                  faced pressure.
                </p>
                <p className="text-foreground/90 font-medium">
                  However, the relationship is not permanent and not perfectly
                  inverse. There can be periods when both gold and real yields
                  rise or fall together, because several forces influence gold
                  simultaneously — risk sentiment, central-bank demand,
                  geopolitical stress and positioning can all override the
                  real-yield channel for extended periods.
                </p>
                <p className="text-xs text-muted-foreground/80">
                  Authoritative yield data is published by the{" "}
                  <a
                    href="https://home.treasury.gov/policy-issues/financing-the-government/interest-rate-statistics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    US Treasury
                  </a>{" "}
                  and is also available through{" "}
                  <a
                    href="https://fred.stlouisfed.org/categories/22"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    Federal Reserve Economic Data (FRED)
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* US DOLLAR */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">How the US Dollar Affects{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Gold Prices
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                International gold is commonly quoted in US dollars. When the
                dollar strengthens, gold becomes more expensive in other
                currencies, all else being equal. This can create pressure on
                dollar-denominated gold. When the dollar weakens, that pressure
                may ease.
              </p>
              <p>
                The US Dollar Index (DXY) is one commonly watched gauge that
                measures the dollar against a basket of major currencies. Many
                gold traders track DXY alongside XAUUSD.
              </p>
              <p className="text-foreground/90 font-medium">
                It is a mistake to say &ldquo;gold always moves opposite the
                dollar.&rdquo; The inverse relationship is common but imperfect.
                Gold and the dollar can rise together during severe global risk
                aversion, safe-haven demand, geopolitical stress or
                financial-system concerns, because both can be sought as
                stores of value at the same time.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* INFLATION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How Inflation Data Can Move{" "}
                </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>Traders commonly monitor several inflation measures:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "CPI (Consumer Price Index)",
                    "Core CPI (excluding food and energy)",
                    "PCE (Personal Consumption Expenditures)",
                    "Core PCE (the Fed's preferred measure)",
                    "PPI (Producer Price Index)",
                    "Inflation expectations (survey and market-based)",
                  ].map((item) => (
                    <div
                      key={item}
                      className="glass rounded-xl px-4 py-3 text-sm md:text-base text-muted-foreground flex items-center gap-2"
                    >
                      <Percent className="w-4 h-4 text-trading-gold shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <p>
                  Gold is often discussed as a long-term inflation hedge, but
                  the short-term trading reaction can be very different. Hot
                  inflation can lead markets to expect tighter Fed policy, which
                  can lift yields and the dollar and initially pressure gold. At
                  the same time, high inflation can increase longer-term demand
                  for assets perceived as stores of value.
                </p>
                <p className="text-foreground/90 font-medium">
                  Therefore &ldquo;inflation up = gold up&rdquo; is too
                  simplistic, and &ldquo;inflation up = gold down&rdquo; is also
                  too simplistic. What matters is how the actual data compares
                  to expectations and what it implies for the policy path.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* NFP / EMPLOYMENT */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">How NFP and US Employment Data{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Affect Gold
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The monthly US employment report is one of the most closely
                watched releases for XAUUSD. It typically includes:
              </p>
              <ul className="space-y-1">
                {[
                  "Nonfarm Payrolls (NFP)",
                  "The unemployment rate",
                  "Average hourly earnings (wage growth)",
                  "Initial jobless claims (weekly, separate release)",
                  "Job openings where relevant",
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
              <p>
                The transmission mechanism is important. Employment data feeds
                into Fed expectations, which feed into Treasury yields and the
                dollar, which then affect XAUUSD.
              </p>
              <p>
                For example, if payroll growth materially exceeds expectations
                and wage growth remains strong, traders may interpret that as
                reducing the need for easier monetary policy. That can influence
                yields and the dollar. But this does not predict a guaranteed
                gold response — the details beneath the headline number can
                matter, and revisions can change the picture after the fact.
              </p>
              <p className="text-xs text-muted-foreground/80">
                Official US labour-market data is published by the{" "}
                <a
                  href="https://www.bls.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                >
                  US Bureau of Labor Statistics (BLS)
                </a>
                .
              </p>
            </div>
          </div>
        </FadeSection>

        {/* GDP / GROWTH DATA */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">GDP, Retail Sales and PMI:{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Why Growth Data Matters for Gold
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Economic growth data usually affects gold indirectly by
                changing Fed expectations, yield expectations, USD demand and
                risk sentiment. Commonly watched releases include:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "GDP (Gross Domestic Product)",
                  "Retail sales",
                  "ISM Manufacturing and Services",
                  "S&P Global PMIs",
                  "Consumer confidence",
                  "Housing data",
                ].map((item) => (
                  <div
                    key={item}
                    className="glass rounded-xl px-4 py-3 text-sm md:text-base text-muted-foreground flex items-center gap-2"
                  >
                    <TrendingUp className="w-4 h-4 text-trading-green shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <p>
                Strong growth can reduce expectations of policy easing and
                support the dollar, which can be a headwind for gold. Weak
                growth can do the opposite. But growth data rarely moves gold in
                isolation — it works through the same expectations channel as
                inflation and employment. Do not overstate any individual
                release.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* GEOPOLITICAL RISK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-red/10 to-transparent flex items-center justify-center">
                  <Globe className="w-7 h-7 text-trading-red" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">
                    Why Geopolitical and Risk Sentiment Can{" "}
                  </span>
                  <span className="text-trading-gold text-glow-gold">
                    Affect Gold
                  </span>
                </h2>
              </div>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Gold is often described as a safe-haven asset. During periods
                  of stress, demand for gold can increase as investors seek
                  stores of value outside the traditional banking and currency
                  system. Circumstances that can trigger safe-haven demand
                  include:
                </p>
                <ul className="space-y-1">
                  {[
                    "Geopolitical conflict",
                    "Financial instability",
                    "Banking stress",
                    "Sovereign concerns",
                    "Major risk-off events",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-base md:text-lg text-muted-foreground"
                    >
                      <AlertTriangle className="w-4 h-4 text-trading-red shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-foreground/90 font-medium">
                  It is wrong to claim that gold will always rise during
                  crises. During extreme liquidity events, investors may
                  initially sell gold along with other assets to raise cash.
                  The safe-haven narrative is a tendency, not a rule, and the
                  timing and magnitude of any reaction depends on the nature of
                  the event and the positioning of the market at the time.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* CENTRAL BANK DEMAND */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">
                How Central-Bank Gold Buying Can{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Influence the Market
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Central banks hold gold as part of reserve management.
                Sustained official-sector demand can influence the longer-term
                supply-demand backdrop by absorbing a portion of global gold
                supply over time.
              </p>
              <p>
                However, monthly central-bank purchases should not be treated as
                an immediate short-term trading signal. The impact is more
                structural and cumulative. Traders can be aware of the trend
                without overreacting to any single reported purchase.
              </p>
              <p className="text-xs text-muted-foreground/80">
                Reliable data on central-bank gold demand is published by the{" "}
                <a
                  href="https://www.gold.org/goldhub/data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                >
                  World Gold Council
                </a>{" "}
                and the{" "}
                <a
                  href="https://data.imf.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                >
                  IMF
                </a>
                . No specific purchase figures are cited here, because exact
                numbers change quarter to quarter and should be verified at the
                source.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* PHYSICAL / INVESTMENT DEMAND */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Physical Gold, ETFs and{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Investment Flows
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Beyond macro expectations, gold is a physical commodity with a
                real supply-demand balance. Important demand components include:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Gold ETFs (exchange-traded fund flows)",
                  "Institutional investment demand",
                  "Jewellery demand",
                  "Bar and coin demand",
                  "Seasonal demand (e.g. wedding and festival seasons)",
                ].map((item) => (
                  <div
                    key={item}
                    className="glass rounded-xl px-4 py-3 text-sm md:text-base text-muted-foreground flex items-center gap-2"
                  >
                    <DollarSign className="w-4 h-4 text-trading-gold shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <p>
                These factors can matter over medium and longer horizons, but
                intraday XAUUSD often responds more immediately to macroeconomic
                expectations, yields and currencies. A useful mental model is
                that fundamentals set the longer-term backdrop, while
                expectations and flows drive the day-to-day price action.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* EXPECTATIONS SECTION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Why Gold Can Move the{" "}
                </span>
                <span className="text-trading-gold text-glow-gold">
                  &ldquo;Wrong&rdquo; Way After Economic News
                </span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  One of the most important concepts in XAUUSD fundamental
                  analysis is that{" "}
                  <strong className="text-foreground/90">
                    markets trade expectations
                  </strong>
                  . The market&apos;s reaction to a data release depends not
                  only on the number itself, but on how it compares to what was
                  already expected.
                </p>
                <p className="text-foreground/90 font-medium">
                  The following is a hypothetical example. These numbers are
                  illustrative only and are not current economic data.
                </p>
                <div className="glass rounded-xl p-5 border border-white/10">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Hypothetical CPI example:</strong>
                    <br />
                    Actual: 3.2%
                    <br />
                    Forecast: 3.4%
                    <br />
                    Previous: 3.1%
                  </p>
                </div>
                <p>
                  Inflation increased compared with the previous reading. But it
                  came in below expectations. Therefore markets may react as
                  though the report was softer than feared — expectations for
                  tighter policy may ease, Treasury yields and the dollar may
                  fall, and gold may rise despite &ldquo;higher inflation.&rdquo;
                </p>
                <p>
                  The same logic applies to a Federal Reserve decision. If the
                  Fed raises rates but the statement and press conference are
                  less restrictive than feared, gold may not fall — and can
                  rise — because the market was already priced for a hike and
                  now expects a less aggressive path forward.
                </p>
                <p>
                  A useful way to read any release is to ask:
                </p>
                <ol className="list-decimal list-inside space-y-1 pl-2">
                  <li>What happened?</li>
                  <li>What was expected?</li>
                  <li>How did rate expectations change?</li>
                  <li>What happened to Treasury yields?</li>
                  <li>What happened to the US dollar?</li>
                  <li>How did XAUUSD respond?</li>
                </ol>
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
                Reading XAUUSD After Economic News
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              A repeatable framework can help traders stay disciplined around
              major releases:
            </p>
            <div className="space-y-4">
              {[
                { step: "Step 1", text: "Check actual vs forecast." },
                { step: "Step 2", text: "Check revisions and underlying components." },
                { step: "Step 3", text: "Watch Treasury yields — did they rise or fall?" },
                { step: "Step 4", text: "Watch DXY / USD reaction." },
                { step: "Step 5", text: "Watch XAUUSD price structure." },
                { step: "Step 6", text: "Avoid making a decision based only on the first candle." },
                { step: "Step 7", text: "Determine whether the initial reaction holds or reverses." },
              ].map((item, i) => (
                <FadeIn key={item.step} delay={i * 0.05}>
                  <div className="glass-strong rounded-2xl p-5 gradient-border flex gap-4 items-start">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-trading-gold/15 to-trading-green/10 flex items-center justify-center">
                      <span className="text-base font-extrabold text-trading-gold">
                        {i + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-trading-green/80 mb-1">
                        {item.step}
                      </p>
                      <p className="text-sm md:text-base text-foreground">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-6">
              Spreads and slippage can increase significantly around major
              releases. This framework is educational and does not tell you to
              enter any specific trade.
            </p>
          </div>
        </FadeSection>

        {/* FUNDAMENTAL + TECHNICAL */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">
                  How to Combine Fundamental and Technical{" "}
                </span>
                <span className="text-trading-gold text-glow-gold">
                  XAUUSD Analysis
                </span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Fundamental analysis can help answer:{" "}
                  <strong className="text-foreground/90">
                    why could the market move?
                  </strong>{" "}
                  Technical analysis can help answer:{" "}
                  <strong className="text-foreground/90">
                    where is price reacting?
                  </strong>
                </p>
                <p>
                  Consider a simple example. The macro context is that Treasury
                  yields are weakening and the US dollar is softening. The
                  technical context is that gold is holding an established
                  support zone. This combination does not guarantee a rally. But
                  the two forms of evidence can be considered together: the
                  fundamental backdrop is broadly supportive, and the technical
                  structure is holding.
                </p>
                <p>
                  To go deeper on the technical side, read our guides on{" "}
                  <Link
                    href="/xauusd-analysis/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    XAUUSD analysis
                  </Link>
                  ,{" "}
                  <Link
                    href="/how-to-read-xauusd-price-action/"
                    className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors"
                  >
                    XAUUSD price action
                  </Link>
                  ,{" "}
                  <Link
                    href="/xauusd-support-resistance/"
                    className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
                  >
                    XAUUSD support and resistance
                  </Link>{" "}
                  and the broader{" "}
                  <Link
                    href="/xauusd-trading-strategy/"
                    className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors"
                  >
                    XAUUSD trading strategy
                  </Link>{" "}
                  framework.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ECONOMIC CALENDAR TABLE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">
                Key Economic Events XAUUSD Traders{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Commonly Watch
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              The table below lists the releases most commonly monitored by gold
              traders. It is not exhaustive, and not every release produces high
              volatility every time.
            </p>

            <div className="glass-strong rounded-2xl gradient-border overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-trading-gold whitespace-nowrap">
                        Event
                      </th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-trading-gold">
                        Why traders watch it
                      </th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-trading-gold">
                        Typical channel to XAUUSD
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventsTable.map((row, i) => (
                      <tr
                        key={row.event}
                        className={
                          i < eventsTable.length - 1
                            ? "border-b border-white/5"
                            : ""
                        }
                      >
                        <td className="px-4 py-3 text-sm md:text-base text-foreground font-semibold whitespace-nowrap align-top">
                          {row.event}
                        </td>
                        <td className="px-4 py-3 text-sm md:text-base text-muted-foreground align-top">
                          {row.why}
                        </td>
                        <td className="px-4 py-3 text-sm md:text-base text-muted-foreground align-top">
                          {row.channel}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/80">
              Official release schedules are published by the{" "}
              <a
                href="https://www.bls.gov/schedule/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
              >
                US Bureau of Labor Statistics
              </a>{" "}
              and the{" "}
              <a
                href="https://www.bea.gov/news/schedule"
                target="_blank"
                rel="noopener noreferrer"
                className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors"
              >
                US Bureau of Economic Analysis
              </a>
              .
            </p>
          </div>
        </FadeSection>

        {/* WEEKLY CHECKLIST */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-green/10 to-transparent flex items-center justify-center">
                  <Target className="w-7 h-7 text-trading-green" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <span className="text-foreground">
                    Weekly XAUUSD Fundamental{" "}
                  </span>
                  <span className="text-trading-green text-glow-green">
                    Analysis Checklist
                  </span>
                </h2>
              </div>

              <h3 className="text-base md:text-lg font-bold text-trading-gold mb-3">
                Before the trading week
              </h3>
              <ul className="space-y-2 mb-6">
                {[
                  "Review major scheduled US economic releases.",
                  "Identify FOMC decisions and Fed speeches.",
                  "Check current market-implied Fed expectations.",
                  "Review recent Treasury-yield direction.",
                  "Review broad USD / DXY direction.",
                  "Note major geopolitical developments.",
                  "Identify major technical support and resistance.",
                  "Know which events can create unusual volatility.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm md:text-base text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-base md:text-lg font-bold text-trading-gold mb-3">
                Before an important release
              </h3>
              <ul className="space-y-2 mb-6">
                {[
                  "Know the forecast and previous value.",
                  "Reduce assumptions.",
                  "Be aware of spread and slippage risk.",
                  "Wait for the actual release.",
                  "Observe yields and USD alongside gold.",
                  "Evaluate whether the first reaction is confirmed.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm md:text-base text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-base md:text-lg font-bold text-trading-gold mb-3">
                After the release
              </h3>
              <ul className="space-y-2">
                {[
                  "Compare actual vs forecast.",
                  "Check revisions.",
                  "Look at yields.",
                  "Look at USD.",
                  "Reassess technical structure.",
                  "Avoid forcing a narrative if markets react differently than expected.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm md:text-base text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeSection>

        {/* COMMON MISTAKES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Common XAUUSD Fundamental{" "}
              </span>
              <span className="text-trading-gold text-glow-gold">
                Analysis Mistakes
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {commonMistakes.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.04}>
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

        {/* CURRENT WEEKLY OUTLOOK LINK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-6 md:p-8 border border-trading-green/20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-5">
                <span className="text-foreground">From Evergreen Fundamentals{" "}
                </span>
                <span className="text-trading-green text-glow-green">
                  to This Week&apos;s Outlook
                </span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                This article is an evergreen guide: the fundamental drivers it
                explains stay broadly relevant over time. The specific levels,
                events and scenarios change week by week. For the current
                time-sensitive view, read our{" "}
                <Link
                  href="/blog/xauusd-weekly-outlook-september-21-25-2026/"
                  className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors"
                >
                  current XAUUSD weekly outlook
                </Link>
                , which applies these fundamental concepts to the live market.
              </p>
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
                  Gold, forex and CFD trading involves significant risk and may
                  not be suitable for all traders.
                </p>
                <p>
                  Market analysis cannot guarantee future price movement. This
                  article is educational and informational only and does not
                  constitute financial or investment advice.
                </p>
                <p>
                  Economic releases can cause abnormal volatility, spread
                  widening and slippage. Readers should perform their own
                  analysis and apply appropriate risk management.
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
                market structure, macro observations and trading-related
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
                Explore the related ForexWizard guides that pair fundamental
                analysis with technical work.
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
