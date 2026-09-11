import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  BarChart3,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  MessageCircle,
  Target,
  Crosshair,
  Layers,
  Activity,
  BookOpen,
  LineChart,
  ArrowDownRight,
  ArrowUpRight,
  Globe,
  Zap,
  TrendingDown,
  Info,
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

export const metadata: Metadata = {
  title: "XAUUSD Analysis: Gold Price Action Guide | Forex Wizard",
  description:
    "Learn XAUUSD analysis step by step using gold price action, market structure, support and resistance, economic drivers, and responsible risk management.",
  authors: [{ name: "Forex Wizard", url: "https://forexwizard.online/about/" }],
  creator: "Forex Wizard",
  publisher: "Forex Wizard",
  alternates: {
    canonical: "https://forexwizard.online/xauusd-analysis/",
  },
  openGraph: {
    title: "XAUUSD Analysis: Gold Price Action Guide | Forex Wizard",
    description:
      "Learn XAUUSD analysis step by step using gold price action, market structure, support and resistance, economic drivers, and responsible risk management.",
    type: "article",
    publishedTime: "2026-08-19T09:00:00+05:00",
    modifiedTime: "2026-09-11T19:00:00+05:00",
    url: "https://forexwizard.online/xauusd-analysis/",
    siteName: "Forex Wizard",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Forex Wizard - Free Forex & Gold Trading Telegram Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XAUUSD Analysis: Gold Price Action Guide | Forex Wizard",
    description:
      "Learn XAUUSD analysis step by step using gold price action, market structure, support and resistance, economic drivers, and responsible risk management.",
    images: ["/og-image.jpg"],
  },
};

const articleStructuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "XAUUSD Analysis: Gold Price Action & Key Levels",
  description: "Learn XAUUSD analysis step by step using gold price action, market structure, support and resistance, economic drivers, and responsible risk management.",
  image: ["https://forexwizard.online/og-image.jpg"],
  datePublished: "2026-08-19T09:00:00+05:00",
  dateModified: "2026-09-11T19:00:00+05:00",
  mainEntityOfPage: "https://forexwizard.online/xauusd-analysis/",
  author: {
    "@type": "Organization",
    name: "Forex Wizard",
    url: "https://forexwizard.online/about/",
  },
  publisher: {
    "@type": "Organization",
    name: "Forex Wizard",
    url: "https://forexwizard.online/",
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

/* ------------------------------------------------------------------ */
/*  CTA BUTTON                                                        */
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
/*  DATA                                                               */
/* ------------------------------------------------------------------ */
const analysisFramework = [
  {
    icon: <LineChart className="w-6 h-6 text-trading-gold" />,
    title: "Price Action",
    desc: (<span>Studying raw price movement on the chart without relying on indicators. Traders examine candlestick formations, the size and shape of recent candles, wicks (shadows) that show rejection at certain levels, and the overall pace of price movement. <Link href="/how-to-read-xauusd-price-action/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline">Reading XAUUSD price action</Link> helps traders understand where buyers and sellers have been most active and whether momentum is shifting in either direction.</span>),
  },
  {
    icon: <Layers className="w-6 h-6 text-trading-green" />,
    title: "Market Structure",
    desc: "Reading the sequence of price swings to determine the current market phase. An uptrend forms higher highs and higher lows. A downtrend forms lower highs and lower lows. When neither pattern is clearly present, the market may be ranging. Understanding structure helps traders identify whether conditions favor trend-following, reversal, or range-based approaches.",
  },
  {
    icon: <Activity className="w-6 h-6 text-blue-400" />,
    title: "Support & Resistance",
    desc: "Identifying price levels where gold has historically responded with increased buying or selling pressure. Support levels are areas where price has tended to find buyers and move higher, while resistance levels are areas where selling pressure has increased. These levels are not guaranteed to hold, but they provide useful reference points for trade planning and risk management.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-trading-gold" />,
    title: "Trend Analysis",
    desc: "Determining whether gold is in a bullish (upward), bearish (downward), or sideways phase. Traders often use a combination of price structure, moving averages, and higher-timeframe context to assess the trend. Trading in the direction of the prevailing trend is a common approach, though counter-trend trades may also be considered at key levels.",
  },
  {
    icon: <Zap className="w-6 h-6 text-purple-400" />,
    title: "Breakouts",
    desc: "Monitoring price as it approaches and potentially moves beyond established support or resistance boundaries. A breakout occurs when price closes decisively beyond a key level, often accompanied by increased volume or momentum. Traders typically watch for a retest of the broken level before considering entry, as false breakouts can occur when price quickly reverses back.",
  },
  {
    icon: <ArrowDownRight className="w-6 h-6 text-trading-green" />,
    title: "Pullbacks",
    desc: "Analyzing temporary price retracements within a larger directional move. In an uptrend, a pullback is a downward move before the next leg higher. In a downtrend, it is an upward bounce before further decline. Pullbacks are often monitored as potential entry opportunities because they may offer a favorable balance between entry price and stop-loss placement.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-trading-gold" />,
    title: "Candlestick Analysis",
    desc: "Reading individual and groups of candlesticks to assess market sentiment and potential shifts in momentum. Common patterns include pin bars (long wicks showing rejection), engulfing candles (one candle's body fully covering the previous one), dojis (indicating indecision), and hammers or shooting stars at key levels. These formations are most meaningful when they appear at significant support or resistance zones.",
  },
];

const goldFactors = [
  {
    icon: <Globe className="w-6 h-6 text-trading-green" />,
    title: "US Dollar Strength",
    desc: "Gold is priced in US dollars, so the two typically share an inverse relationship. When the dollar strengthens against other major currencies, gold often faces downward pressure because it becomes more expensive for holders of other currencies. The DXY (US Dollar Index) is a common reference point traders use to gauge dollar strength and its potential effect on gold.",
  },
  {
    icon: <Activity className="w-6 h-6 text-trading-gold" />,
    title: "Interest Rates",
    desc: "Interest rates influence gold because gold does not yield interest or dividends. When interest rates rise, yield-bearing assets become more attractive relative to gold, which can weigh on gold prices. Conversely, when rates are low or declining, the opportunity cost of holding gold decreases, which can provide support. Traders monitor rate expectations as much as actual rate decisions.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
    title: "Federal Reserve Policy",
    desc: "The Federal Reserve is one of the most influential institutions for gold pricing. FOMC statements, interest rate decisions, dot-plot projections, and Fed chair press conferences can all cause significant XAUUSD movement. Traders pay close attention to shifts in the Fed's tone — particularly language around inflation, employment, and the future path of interest rates.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-trading-gold" />,
    title: "Inflation Expectations",
    desc: "Gold is often viewed as a hedge against inflation because it has historically preserved purchasing power over long periods. When inflation expectations rise, demand for gold may increase as investors seek to protect their portfolios. Key inflation indicators include the Consumer Price Index (CPI), Personal Consumption Expenditures (PCE), and producer price data.",
  },
  {
    icon: <Target className="w-6 h-6 text-purple-400" />,
    title: "Employment Data",
    desc: "US employment reports, particularly Non-Farm Payrolls (NFP), the unemployment rate, and average hourly earnings, can trigger sharp gold price reactions. Strong employment data may strengthen the dollar and weigh on gold, while weak data can have the opposite effect. These reports are released monthly and are among the most closely watched economic events by gold traders.",
  },
  {
    icon: <LineChart className="w-6 h-6 text-trading-green" />,
    title: "Treasury Yields",
    desc: "US Treasury yields, particularly the 10-year yield, are closely linked to gold. Rising yields increase the opportunity cost of holding non-yielding assets like gold, often creating downward pressure. Falling yields can have the opposite effect. The yield curve — the difference between short-term and long-term rates — also provides context about economic expectations that can influence gold.",
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-trading-gold" />,
    title: "Geopolitical Risk",
    desc: "Geopolitical tensions, military conflicts, trade disputes, and political instability tend to increase demand for gold as a safe-haven asset. During periods of elevated uncertainty, investors often move capital toward assets perceived as stores of value. These events can cause rapid and sometimes sustained gold price increases that may not be fully anticipated by technical analysis alone.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-trading-green" />,
    title: "Risk Sentiment",
    desc: 'Broader market risk appetite affects gold. In risk-on environments where equities and riskier assets are performing well, gold may experience less demand. In risk-off periods, where markets are selling off and uncertainty is elevated, gold often attracts safe-haven flows. Monitoring equity indices, VIX volatility, and credit spreads can help traders gauge the prevailing risk sentiment.',
  },
  {
    icon: <Globe className="w-6 h-6 text-blue-400" />,
    title: "Central Bank Activity",
    desc: "Central banks around the world hold significant gold reserves. When central banks increase their gold purchases, it signals confidence in gold as a reserve asset and can provide structural price support. Conversely, if a major central bank were to reduce its gold holdings, it could influence market perception. Central bank buying and selling activity is tracked through monthly reporting.",
  },
  {
    icon: <Zap className="w-6 h-6 text-trading-gold" />,
    title: "Major Economic Announcements",
    desc: "GDP figures, retail sales, consumer confidence, manufacturing data, and other high-impact economic releases can all move gold prices. Traders often reduce position sizes or avoid new entries around major announcements because these events can cause unpredictable price spikes and increased spread widening.",
  },
];

const riskTopics = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-trading-red" />,
    title: "Stop-Loss",
    desc: "Always use a stop-loss order on every gold trade to define your maximum acceptable loss. Gold can move quickly, especially around economic events, and a stop-loss helps protect your capital from large adverse moves.",
  },
  {
    icon: <Layers className="w-6 h-6 text-trading-red" />,
    title: "Position Sizing",
    desc: (<span>Calculate your position size based on the distance to your stop-loss and the percentage of your account you are willing to risk. Many experienced traders risk only a small fraction of their total capital on any single trade. See our guide on <Link href="/xauusd-lot-size/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline">XAUUSD lot size and position sizing</Link> for practical calculations.</span>),
  },
  {
    icon: <Target className="w-6 h-6 text-trading-red" />,
    title: "Risk / Reward",
    desc: "Evaluate every trade by comparing the potential profit target against the required stop-loss distance. A favorable risk/reward ratio helps maintain a disciplined approach even during losing streaks.",
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-trading-red" />,
    title: "Leverage",
    desc: "High leverage amplifies both gains and losses on gold trades. Gold is already volatile, and excessive leverage can rapidly deplete an account. Use only the leverage you fully understand and can manage.",
  },
  {
    icon: <Activity className="w-6 h-6 text-trading-red" />,
    title: "Volatility",
    desc: "Gold can experience sharp price swings, particularly around Federal Reserve decisions, employment data, and geopolitical events. Adjust your position sizes and stop-loss distances to account for current volatility conditions.",
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-trading-red" />,
    title: "Overtrading",
    desc: "Resist the urge to trade every gold movement. Overtrading leads to increased costs, emotional fatigue, and poor decisions. Wait for setups that genuinely meet your criteria.",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-trading-red" />,
    title: "Emotional Decisions",
    desc: "Fear and greed are the most common reasons traders deviate from their plan. Having a written trading plan and sticking to it helps reduce the influence of emotions on your gold trading decisions.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-trading-red" />,
    title: "Never Risk Money You Cannot Afford to Lose",
    desc: "Only trade gold with capital that, if lost entirely, would not affect your ability to meet financial obligations or living expenses. This is the most fundamental rule of trading.",
  },
];

const faqs = [
  {
    q: "What is XAUUSD?",
    a: "XAUUSD is the standard trading symbol for gold priced in US dollars. XAU is the ISO 4217 currency code for one troy ounce of gold, and USD is the US dollar. When you see XAUUSD on a trading platform, it represents the current exchange rate between gold and the US dollar — essentially telling you how many dollars are needed to buy one troy ounce of gold. XAUUSD is one of the most widely traded commodity pairs globally, followed by retail traders, institutional investors, and central banks.",
  },
  {
    q: "What does XAUUSD analysis mean?",
    a: "XAUUSD analysis refers to the process of studying the gold market to form a view on potential price direction. This can include technical analysis (studying price charts, patterns, and indicators), fundamental analysis (evaluating economic data, interest rates, and macroeconomic conditions), or a combination of both. The goal of analysis is not to predict the future with certainty, but to identify conditions where the probability of a particular outcome may be higher, allowing traders to make more informed decisions about when and how to participate in the market.",
  },
  {
    q: "What affects the price of gold?",
    a: "Gold prices are influenced by multiple interconnected factors. The strength of the US dollar is primary, since gold is priced in dollars and they typically share an inverse relationship. Interest rate expectations set by central banks — particularly the Federal Reserve — also play a major role. Inflation data, employment reports, GDP figures, and consumer confidence all affect gold through their impact on rate expectations and dollar strength. Geopolitical tensions and broader risk sentiment can drive safe-haven demand for gold. Additionally, central bank gold purchases, physical demand from jewelry and industry, and overall supply dynamics provide longer-term structural influence. No single factor operates in isolation, and traders should consider the full picture rather than focusing on one variable.",
  },
  {
    q: "Is XAUUSD good for beginners?",
    a: "XAUUSD can be an interesting market for beginners because gold's price behavior is often driven by identifiable macroeconomic factors, which makes it relatively accessible from a learning perspective. However, gold can also be highly volatile, and the leverage commonly available on XAUUSD can amplify losses quickly. Beginners should take the time to learn about risk management, position sizing, and fundamental drivers before trading gold with real capital. Starting on a demo account and practicing analysis without financial risk is a sensible first step.",
  },
  {
    q: "How do traders analyze gold?",
    a: "Traders analyze gold using a combination of approaches. Technical analysis involves studying price charts to identify trends, support and resistance levels, chart patterns, and candlestick formations. Many traders also use indicators such as moving averages, RSI, and Fibonacci retracements as supplementary tools. Fundamental analysis focuses on the economic forces that drive gold prices — interest rates, inflation data, dollar strength, central bank policy, and geopolitical risk. Many traders combine both approaches, using fundamental analysis to establish a broader view and technical analysis to time specific entries and exits.",
  },
  {
    q: "Is XAUUSD trading risky?",
    a: "Yes, XAUUSD trading involves substantial risk. Gold prices can move sharply and unpredictably in response to economic data, central bank decisions, and geopolitical events. The use of leverage, which is commonly available on gold trading, amplifies both potential gains and potential losses. Traders can lose more than their initial investment in some leveraged scenarios. Gold is not inherently safe just because it is a physical commodity. It requires the same discipline, risk management, and respect for market risk as any other form of trading.",
  },
  {
    q: "Where can I get Forex Wizard gold updates?",
    a: "You can join the Forex Wizard Telegram community to follow XAUUSD market updates, gold analysis, and trading discussions. The community is free to join and shares market commentary, educational content, and potential trading ideas for gold and forex traders. Search for @ForexWizzz on Telegram or visit the Forex Wizard website to access the community link.",
  },
  {
    q: "Is XAUUSD analysis guaranteed to predict price movements?",
    a: "No form of market analysis, including XAUUSD analysis, can guarantee future price movements. Markets are influenced by countless variables, many of which are unpredictable. Technical analysis, fundamental analysis, and price action all provide frameworks for thinking about probability, not certainty. Traders who treat analysis as a tool for managing risk and identifying potential opportunities, rather than as a crystal ball, tend to make more disciplined decisions. Any source that claims guaranteed predictions should be treated with extreme caution.",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                              */
/* ------------------------------------------------------------------ */
export default function XauusdAnalysisPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
              className="text-sm font-medium text-trading-gold hover:text-trading-gold/80 transition-colors no-underline"
            >
              XAUUSD Analysis
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
        <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 py-24 md:py-32 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-trading-gold/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-trading-green/5 rounded-full blur-[100px] pointer-events-none" />
          <CandlestickBackground />

          <HeroAnimation className="relative z-10 text-center max-w-4xl mx-auto">
            <FadeIn delay={0.2} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-gold">
                <span className="w-2 h-2 bg-trading-gold rounded-full animate-pulse" />
                Forex Wizard XAUUSD Analysis Hub
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-trading-gold text-glow-gold">XAUUSD Analysis</span>
              <br />
              <span className="text-foreground">Gold Price Action &amp; Key Levels</span>
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground/80 mb-6">
              Last updated: September 11, 2026 · Educational content by{" "}
              <Link href="/about/" className="text-foreground/80 hover:text-trading-green no-underline">
                Forex Wizard
              </Link>
            </p>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Explore educational XAUUSD analysis covering price action, market
              structure, key technical levels, and the economic factors that
              influence gold prices. Content provided by Forex Wizard is for
              educational and informational purposes.
            </p>

            <FadeIn delay={0.5} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <TelegramCTA text="Join Forex Wizard Telegram" variant="gold" />
              <Link
                href="/gold-signals/"
                className="inline-flex items-center justify-center gap-2 font-bold text-base rounded-xl px-6 py-3.5 md:px-8 md:py-4 glass-strong text-foreground hover:text-trading-gold border border-white/10 hover:border-trading-gold/30 transition-all duration-300 no-underline select-none hover:scale-105 active:scale-95"
              >
                <BarChart3 className="w-5 h-5" />
                Gold Trading Signals
              </Link>
            </FadeIn>
          </HeroAnimation>
        </section>

        {/* WHAT IS XAUUSD? */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">What Is </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD?</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                XAUUSD is the standard trading symbol used across financial
                platforms to represent gold priced in US dollars. The XAU
                component comes from the ISO 4217 currency code for one troy
                ounce of gold, while USD represents the US dollar. When you
                see XAUUSD on a chart, you are looking at the exchange rate
                that tells you how many US dollars are required to purchase
                one troy ounce of gold at any given moment.
              </p>
              <p>
                Gold has been traded as a store of value for thousands of years,
                and in modern financial markets it serves multiple roles: a
                safe-haven asset during periods of uncertainty, a hedge against
                inflation, and a portfolio diversification tool. Because gold is
                globally priced in US dollars, its value is closely tied to
                dollar strength, interest rate expectations, and the broader
                macroeconomic environment.
              </p>
              <p>
                Traders monitor XAUUSD because gold can experience significant
                volatility — sometimes moving hundreds of dollars per ounce in a
                single trading session, particularly around major economic
                announcements or Federal Reserve decisions. This volatility
                creates both opportunity and risk, which is why understanding the
                factors that drive gold prices is essential for anyone
                participating in the gold market. For a detailed look at how different
                trading sessions affect XAUUSD conditions, see our guide on the
                <Link
                  href="/best-time-to-trade-xauusd/"
                  className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline"
                >
                  best time to trade XAUUSD
                </Link>{"."}
              </p>
            </div>
          </div>
        </FadeSection>

        {/* XAUUSD MARKET ANALYSIS FRAMEWORK */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">How </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD Market Analysis Works</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                The core components of a structured approach to analyzing
                the gold market. Each element provides a different perspective
                on market conditions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {analysisFramework.map((item, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-gold/10 to-transparent flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* GOLD PRICE FACTORS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Key Factors That Influence </span>
                <span className="text-trading-gold text-glow-gold">Gold Prices</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Gold responds to a complex web of economic, monetary, and
                geopolitical forces. Understanding these factors helps traders
                interpret price movements more effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {goldFactors.map((item, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-gold/10 to-trading-green/10 flex items-center justify-center">
                      {item.icon}
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

            <p className="text-center text-xs text-muted-foreground/60 mt-8 max-w-lg mx-auto">
              No single factor guarantees a particular price movement. Gold is
              influenced by the interaction of multiple forces at any given time.
            </p>
          </div>
        </FadeSection>

        {/* BULLISH AND BEARISH SCENARIOS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Understanding </span>
                <span className="text-trading-gold text-glow-gold">Bullish and Bearish Scenarios</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Rather than predicting a single outcome, professional traders
                often consider multiple scenarios and define what conditions
                would make each one more or less likely.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FadeIn delay={0.1}>
                <div className="glass-strong rounded-2xl p-6 md:p-8 flex flex-col gap-5 border border-trading-green/20 hover:scale-[1.01] transition-transform duration-300 h-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-trading-green/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-trading-green" />
                    </div>
                    <h3 className="text-lg font-bold text-trading-green">
                      Bullish Scenario
                    </h3>
                  </div>
                  <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      A bullish scenario could become more relevant if gold
                      establishes a series of higher highs and higher lows on
                      the daily chart, confirming that buyers are in control of
                      the market structure. This would typically be accompanied
                      by price holding above a key moving average or a
                      previously broken resistance level that has turned into
                      support.
                    </p>
                    <p>
                      Supporting conditions for a bullish scenario may include
                      weakening US dollar strength, declining Treasury yields,
                      or expectations of interest rate cuts from the Federal
                      Reserve. Geopolitical tensions or rising inflation
                      expectations could further strengthen the bullish case.
                    </p>
                    <p>
                      A potential invalidation area for a bullish scenario would
                      be a break below the most recent significant swing low,
                      which would suggest that market structure is shifting from
                      bullish to bearish. Traders often use this level as a
                      reference for stop-loss placement.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="glass-strong rounded-2xl p-6 md:p-8 flex flex-col gap-5 border border-trading-red/20 hover:scale-[1.01] transition-transform duration-300 h-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-trading-red/10 flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-trading-red" />
                    </div>
                    <h3 className="text-lg font-bold text-trading-red">
                      Bearish Scenario
                    </h3>
                  </div>
                  <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      A bearish scenario could become more relevant if gold
                      begins forming lower highs and lower lows, indicating
                      that sellers are gaining control. This structural shift
                      would be confirmed if price closes below a significant
                      support level that had previously held multiple tests.
                    </p>
                    <p>
                      Supporting conditions for a bearish scenario may include
                      a strengthening US dollar, rising real yields, or
                      expectations of interest rate increases from the Federal
                      Reserve. A reduction in geopolitical risk or improving
                      economic data that reduces safe-haven demand could also
                      support a bearish outlook.
                    </p>
                    <p>
                      A potential invalidation area for a bearish scenario would
                      be a break above the most recent significant swing high,
                      which would suggest that sellers are losing control and
                      the bearish structure may be breaking down. As with any
                      scenario, traders should define their risk before entering
                      a position.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="mt-8 glass-strong rounded-2xl p-5 text-center border border-white/5">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Scenarios are not predictions. They are frameworks for thinking
                about what could happen and planning how to respond. Markets
                can behave in ways that no scenario anticipates.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SUPPORT & RESISTANCE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">How Support and Resistance Help </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD Analysis</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Understanding how key price levels work in the gold market
                is fundamental to developing a structured analysis approach.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <FadeIn delay={0.05}>
                <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                  <div className="w-10 h-10 rounded-lg bg-trading-green/10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-trading-green" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">Major Support</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Price levels where gold has historically found buyers and
                    reversed higher. These levels are identified by looking at
                    areas where price has bounced multiple times in the past.
                    A major support level that breaks can signal a significant
                    shift in market sentiment.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                  <div className="w-10 h-10 rounded-lg bg-trading-red/10 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-trading-red" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">Major Resistance</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Price levels where selling pressure has historically
                    increased and gold has reversed lower. Identifying these
                    levels helps traders understand where price may struggle
                    to move higher. When resistance breaks, it often becomes
                    future support.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                  <div className="w-10 h-10 rounded-lg bg-trading-gold/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-trading-gold" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">Psychological Levels</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Round numbers such as $2,000, $2,500, or $3,000 per ounce
                    tend to attract attention from traders and can act as
                    support or resistance. These levels matter because many
                    market participants place orders around them, creating
                    genuine supply and demand zones.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                  <div className="w-10 h-10 rounded-lg bg-trading-green/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-trading-green" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">Previous Highs &amp; Lows</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Recent swing highs and lows provide reference points for
                    where price has previously turned. A break above a previous
                    high may signal bullish continuation, while a break below
                    a previous low may signal bearish continuation.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.25}>
                <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                  <div className="w-10 h-10 rounded-lg bg-purple-400/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">Breakout Levels</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    When price moves beyond a well-established support or
                    resistance zone, the breakout level itself becomes
                    significant. Traders watch for price to return to the
                    breakout level (a retest) to see whether it holds as
                    new support or new resistance.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                  <div className="w-10 h-10 rounded-lg bg-blue-400/10 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">Retest Areas</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    After a breakout, price often returns to the broken level
                    to test whether it will hold as new support or resistance.
                    These retest areas can provide favorable entry points
                    because the risk (stop-loss beyond the level) is clearly
                    defined.
                  </p>
                </div>
              </FadeIn>
            </div>

            <p className="text-center text-xs text-muted-foreground/60 mt-8 max-w-lg mx-auto">
              The examples above describe general concepts. Specific levels
              change as the market moves and should always be identified on
              current charts.
            </p>

            <div className="mt-6 text-center">
              <FadeIn>
                <Link
                  href="/xauusd-support-resistance/"
                  className="inline-flex items-center gap-2 text-trading-gold hover:text-trading-gold/80 font-semibold text-sm transition-colors no-underline"
                >
                  Learn about XAUUSD support and resistance in depth
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </FadeIn>
            </div>
          </div>
        </FadeSection>

        {/* HOW TO READ XAUUSD ANALYSIS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">How to Interpret </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD Analysis</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                A step-by-step framework for evaluating gold market analysis,
                whether from Forex Wizard or any other source.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Identify the Market Trend",
                  text: "Start by determining whether gold is currently trending upward, downward, or moving sideways. Look at the sequence of swing highs and lows on the daily and 4-hour charts. A series of higher highs and higher lows suggests an uptrend. Lower highs and lower lows suggest a downtrend. If neither pattern is clear, the market may be in a range. Understanding the trend context should inform how you interpret everything that follows.",
                },
                {
                  step: "2",
                  title: "Find Important Price Levels",
                  text: "Mark the most significant support and resistance levels on your chart. These are the areas where price has reacted strongly in the past — where gold has bounced, reversed, or broken through. Pay attention to major levels that have been tested multiple times, as these tend to be the most significant. Also note psychological round-number levels that may act as invisible barriers.",
                },
                {
                  step: "3",
                  title: "Check the Market Structure",
                  text: "Verify whether the current price action is consistent with the broader trend. In an uptrend, pullbacks should hold above the most recent higher low. In a downtrend, rallies should fail below the most recent lower high. If structure is breaking down, the trend may be weakening or reversing, and this should affect how you evaluate any analysis you are reading.",
                },
                {
                  step: "4",
                  title: "Consider Upcoming Economic Events",
                  text: "Check the economic calendar for upcoming data releases, Federal Reserve events, and other high-impact announcements that could affect gold. Analysis that does not account for a major event scheduled in the coming hours or days may need to be reconsidered. Events can override technical levels and cause price to move in ways that pure chart analysis would not predict.",
                },
                {
                  step: "5",
                  title: "Define a Possible Invalidation Level",
                  text: "Every analysis or trade idea has a level that, if reached, would suggest the original view is no longer valid. This might be a key support level in a bullish scenario or a key resistance level in a bearish one. Knowing this level before you enter a trade helps you define where your stop-loss should go and how much capital you are risking.",
                },
                {
                  step: "6",
                  title: "Consider Risk / Reward",
                  text: "Compare the potential profit target against the distance to your invalidation level. If the potential reward does not justify the risk, the trade may not be worth taking regardless of how compelling the analysis sounds. A common guideline is to look for setups where the potential reward is at least twice the potential risk, but this is a personal decision based on your own trading style and risk tolerance.",
                },
                {
                  step: "7",
                  title: "Think Independently",
                  text: "Do not enter a trade simply because someone says BUY or SELL. Evaluate the reasoning, check whether it aligns with your own analysis, and make sure the trade fits your trading plan and risk parameters. The best traders are those who can consider external analysis while maintaining their own independent judgment and discipline.",
                },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="glass-strong rounded-2xl p-6 flex gap-5 gradient-border hover:scale-[1.01] transition-transform duration-300">
                    <div className="w-10 h-10 rounded-xl bg-trading-gold/10 flex items-center justify-center shrink-0">
                      <span className="text-trading-gold font-extrabold text-sm">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="mt-10 text-center">
              <FadeIn>
                <p className="text-sm text-muted-foreground mb-3">
                  Want to go deeper into reading gold price action on the chart?
                </p>
                <Link
                  href="/how-to-read-xauusd-price-action/"
                  className="inline-flex items-center gap-2 text-trading-gold hover:text-trading-gold/80 font-semibold text-sm transition-colors no-underline"
                >
                  Learn how to read XAUUSD price action
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </FadeIn>
              <FadeIn className="mt-3">
                <p className="text-sm text-muted-foreground mb-3">
                  Ready to combine these concepts into a structured approach?
                </p>
                <Link
                  href="/xauusd-trading-strategy/"
                  className="inline-flex items-center gap-2 text-trading-gold hover:text-trading-gold/80 font-semibold text-sm transition-colors no-underline"
                >
                  Build an XAUUSD trading strategy
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </FadeIn>
            </div>
          </div>
        </FadeSection>

        {/* RISK MANAGEMENT */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full glass-strong mb-6">
                <AlertTriangle className="w-8 h-8 text-trading-red" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Gold Trading </span>
                <span className="text-trading-red">Risk Management</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Managing risk is the most important aspect of trading gold.
                These principles apply regardless of your experience level or
                the quality of any analysis you follow.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {riskTopics.map((item, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className="glass-strong rounded-2xl p-5 flex flex-col gap-3 border border-trading-red/20 hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-10 h-10 rounded-lg bg-trading-red/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-sm font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="mt-10 glass-strong rounded-2xl p-6 md:p-8 text-center border border-trading-red/10">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Gold and forex trading involves significant risk and may not be
                suitable for all investors. Past performance does not guarantee
                future results. Information provided by Forex Wizard is for
                educational and informational purposes only and should not be
                considered financial advice. If you are new to gold, our{" "}
                <Link
                  href="/how-to-trade-xauusd/"
                  className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline"
                >
                  how to trade XAUUSD
                </Link>{" "}
                guide is a good starting point. Learn more about the{" "}
                <Link
                  href="/about/"
                  className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline"
                >
                  Forex Wizard community
                </Link>{" "}
                and our approach.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* LATEST XAUUSD ANALYSIS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Latest </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD Analysis</span>
              </h2>
            </div>

            <div className="glass-strong rounded-2xl p-8 md:p-12 text-center gradient-border">
              <div className="w-16 h-16 rounded-full bg-trading-gold/10 flex items-center justify-center mx-auto mb-6">
                <Info className="w-8 h-8 text-trading-gold" />
              </div>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
                Market updates and analysis will be published here as new
                market conditions are reviewed. Join the Forex Wizard Telegram
                community to receive gold market analysis directly.
              </p>
              <TelegramCTA text="Join Forex Wizard Telegram" variant="gold" />
            </div>
          </div>
        </FadeSection>

        {/* TELEGRAM CTA */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-gold/5 via-transparent to-trading-green/5 rounded-3xl blur-sm" />
            <div className="relative glass-strong rounded-3xl p-8 md:p-14 text-center gradient-border">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                <span className="text-foreground">Follow Forex Wizard </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD Analysis</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                Follow Forex Wizard for gold market analysis, XAUUSD insights,
                trading education and community updates.
              </p>
              <PulsingGlow className="inline-block rounded-xl">
                <TelegramCTA
                  text="Join Forex Wizard Telegram"
                  variant="gold"
                  className="text-lg md:text-xl px-10 py-5"
                />
              </PulsingGlow>
              <p className="mt-6 text-xs text-muted-foreground/60">
                Free to join &middot; Trading involves risk
              </p>
            </div>
          </div>
        </FadeSection>

        {/* FAQ */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Frequently Asked </span>
                <span className="text-trading-gold text-glow-gold">Questions</span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <details className="glass-strong rounded-2xl gradient-border group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none select-none">
                      <h3 className="text-base font-bold text-foreground pr-4">
                        {faq.q}
                      </h3>
                      <ArrowDownRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-6 pb-6 -mt-2">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </details>
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
