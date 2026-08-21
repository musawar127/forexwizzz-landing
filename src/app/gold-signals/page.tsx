import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  BarChart3,
  Trophy,
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

export const metadata: Metadata = {
  title: "Gold Signals | XAUUSD Trading Signals & Gold Market Analysis",
  description:
    "Explore gold trading signals and XAUUSD market analysis with trade ideas, key levels, market context and responsible risk management.",
  alternates: {
    canonical: "https://forexwizard.online/gold-signals/",
  },
  openGraph: {
    title: "Gold Signals | XAUUSD Trading Signals & Gold Market Analysis",
    description:
      "Explore gold trading signals and XAUUSD market analysis with trade ideas, key levels, market context and responsible risk management.",
    type: "website",
    url: "https://forexwizard.online/gold-signals/",
    siteName: "ForexWizzz",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ForexWizzz - Free Forex & Gold Trading Telegram Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gold Signals | XAUUSD Trading Signals & Gold Market Analysis",
    description:
      "Explore gold trading signals and XAUUSD market analysis with trade ideas, key levels, market context and responsible risk management.",
    images: ["/og-image.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

const faqs = [
  {
    q: "What are gold trading signals?",
    a: "Gold trading signals are trade ideas or suggestions focused on the gold market, typically referencing the XAUUSD currency pair which represents gold priced in US dollars. A gold signal generally includes the direction of the trade (buy or sell), a suggested entry area, a stop-loss level to limit potential losses, and one or more take-profit targets. Some signals also include the technical reasoning behind the idea, such as key support or resistance levels, chart patterns, or macroeconomic context. Gold signals are analytical inputs, not instructions. Every trader should evaluate whether a signal aligns with their own trading plan, risk tolerance, and market understanding before committing capital to a position.",
  },
  {
    q: "What does XAUUSD mean?",
    a: "XAUUSD is the standard trading symbol for gold priced in US dollars on financial platforms. The code XAU is the ISO 4217 designation for one troy ounce of gold, and USD represents the US dollar. When you see XAUUSD on a chart or trading platform, it shows the current exchange rate telling you how many US dollars are required to buy one troy ounce of gold. XAUUSD is one of the most widely traded commodity pairs globally, attracting interest from retail traders, institutional investors, and central banks alike. Understanding this symbol is fundamental for anyone looking to analyze or trade gold in the financial markets.",
  },
  {
    q: "Are XAUUSD signals guaranteed to make money?",
    a: "No legitimate trading signal can guarantee profits, and this applies fully to XAUUSD signals. Gold trading involves significant risk, and even thoroughly researched signals can result in losses. Gold prices are influenced by countless unpredictable factors including economic data releases, central bank policy shifts, geopolitical developments, and sudden changes in market sentiment. Anyone who claims that their gold signals guarantee returns is being misleading. Traders should approach all signals with healthy skepticism, apply their own analysis, use proper risk management including stop-loss orders and appropriate position sizing, and never risk capital they cannot afford to lose.",
  },
  {
    q: "Is gold trading risky?",
    a: "Yes, gold trading involves substantial risk and is not suitable for all investors. Although gold is traditionally viewed as a store of value and a hedge against uncertainty, its price can experience sharp and sustained movements in either direction. The use of leverage in gold trading amplifies both potential gains and potential losses, meaning traders can lose more than their initial investment in some cases. Gold prices can be particularly volatile around major economic announcements, Federal Reserve decisions, and geopolitical events. It is essential to understand these risks fully, use stop-loss orders on every trade, manage position sizes carefully, and only trade with capital you can afford to lose entirely.",
  },
  {
    q: "What affects the price of gold?",
    a: "Gold prices are influenced by a complex interplay of factors. The strength of the US dollar is one of the most significant, as gold is priced in dollars and typically moves inversely to dollar strength. Interest rate expectations, particularly those set by the US Federal Reserve, also play a major role since higher rates increase the opportunity cost of holding non-yielding assets like gold. Inflation data, employment reports such as Non-Farm Payrolls, GDP figures, and consumer confidence indices can all drive significant gold price movements. Geopolitical tensions, trade disputes, and global uncertainty tend to support higher gold prices as investors seek safe-haven assets. Additionally, supply and demand dynamics from central bank gold reserves, jewelry demand, and industrial use provide underlying structural support for gold prices over time.",
  },
  {
    q: "What is the difference between gold signals and XAUUSD analysis?",
    a: "Gold signals and XAUUSD analysis serve different purposes for traders. A gold signal is a specific trade idea that typically includes a direction, entry area, stop-loss, and take-profit levels for a potential trade. XAUUSD analysis, on the other hand, is a broader study of the gold market that examines trends, key levels, market structure, and macroeconomic factors without necessarily issuing a specific trade recommendation. Analysis provides the context and reasoning that informs signals. Traders benefit from both: analysis helps build understanding of the gold market, while signals offer concrete trade ideas to consider within that analytical framework.",
  },
  {
    q: "Where can I get ForexWizard gold updates?",
    a: "You can join the ForexWizard Telegram community to follow gold and XAUUSD market updates, trading insights, and analysis discussions. The community is free to join and provides regular market commentary, potential gold trading setups, and educational content designed for gold traders at all experience levels. You can find the community by searching for ForexWizzz on Telegram or by visiting the ForexWizard website and clicking the Telegram link.",
  },
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

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
const signalComponents = [
  {
    icon: <TrendingUp className="w-7 h-7 text-trading-gold" />,
    title: "XAUUSD",
    desc: "XAUUSD represents gold priced against the US dollar. It is the standard symbol used on trading platforms to track the gold-to-dollar exchange rate in real time.",
  },
  {
    icon: <ArrowUpRight className="w-7 h-7 text-trading-green" />,
    title: "Market Direction",
    desc: "A signal may identify a potential bullish or bearish direction for gold based on technical analysis, market structure, and prevailing market conditions.",
  },
  {
    icon: <Crosshair className="w-7 h-7 text-trading-gold" />,
    title: "Entry Area",
    desc: "Rather than a single fixed price, a setup may identify a price zone where traders could consider entering a trade, allowing some flexibility for execution.",
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-trading-red" />,
    title: "Stop-Loss",
    desc: "A predetermined price level designed to limit potential losses if the market moves against the position. This is a fundamental risk management tool.",
  },
  {
    icon: <Trophy className="w-7 h-7 text-trading-gold" />,
    title: "Take-Profit",
    desc: "One or more target price levels where the trade may be closed to secure potential gains. Multiple targets allow traders to scale out of positions gradually.",
  },
  {
    icon: <Layers className="w-7 h-7 text-blue-400" />,
    title: "Technical Levels",
    desc: "Key support and resistance levels, trendlines, and structural price points that provide context for the trade idea and help define risk parameters.",
  },
  {
    icon: <BarChart3 className="w-7 h-7 text-purple-400" />,
    title: "Market Reasoning",
    desc: "The technical or fundamental factors that support the setup, such as chart patterns, economic context, or market sentiment driving the trade idea.",
  },
];

const analysisTopics = [
  {
    icon: <LineChart className="w-6 h-6 text-trading-gold" />,
    title: "Price Action",
    desc: "Reading raw price movement on charts to identify candlestick patterns, pin bars, engulfing formations, and other price behaviors that may signal potential market direction.",
  },
  {
    icon: <Layers className="w-6 h-6 text-trading-green" />,
    title: "Market Structure",
    desc: "Analyzing the sequence of higher highs, higher lows, lower highs, and lower lows to determine whether gold is in an uptrend, downtrend, or consolidating range.",
  },
  {
    icon: <Activity className="w-6 h-6 text-blue-400" />,
    title: "Support and Resistance",
    desc: "Identifying key price levels where gold has historically reversed or stalled, which may act as barriers to future price movement.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-trading-gold" />,
    title: "Trends and Breakouts",
    desc: "Recognizing sustained directional moves and identifying potential breakout points where price may move beyond established trading ranges.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
    title: "Candlestick Patterns",
    desc: "Using formations such as dojis, hammers, shooting stars, and engulfing patterns to assess market sentiment and potential reversals or continuations.",
  },
  {
    icon: <Globe className="w-6 h-6 text-trading-green" />,
    title: "USD Strength and Macro Factors",
    desc: "Monitoring the US dollar index, Federal Reserve policy, inflation data, and employment reports since gold is priced in dollars and reacts to macroeconomic shifts.",
  },
];

const strategies = [
  {
    icon: <LineChart className="w-6 h-6 text-trading-gold" />,
    title: "Gold Price Action",
    desc: "Trading based on raw price movement without heavy reliance on indicators. Reading candlestick formations, swing points, and market structure to identify potential entries and exits in the gold market.",
  },
  {
    icon: <Layers className="w-6 h-6 text-trading-green" />,
    title: "Support and Resistance",
    desc: "Using historical price levels where gold has reacted in the past to identify potential areas of interest. These levels may serve as entry zones, stop-loss placements, or take-profit targets.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
    title: "Trend Following",
    desc: "Identifying the prevailing direction of gold and looking for pullback entries that align with the larger trend. This approach aims to capture sustained moves rather than short-term fluctuations.",
  },
  {
    icon: <Zap className="w-6 h-6 text-trading-gold" />,
    title: "Breakout Analysis",
    desc: "Watching for price to move beyond established support or resistance levels with increased volume or momentum. Breakout traders look for confirmation before entering positions.",
  },
  {
    icon: <Activity className="w-6 h-6 text-purple-400" />,
    title: "Pullback Setups",
    desc: "Waiting for a temporary retracement within a larger trend before entering in the direction of the overall move. Pullbacks may offer favorable risk-to-reward entry points.",
  },
  {
    icon: <Target className="w-6 h-6 text-trading-green" />,
    title: "Risk/Reward Planning",
    desc: "Evaluating every potential trade by comparing the expected profit target against the required stop-loss distance. A sound risk/reward ratio helps traders maintain a disciplined approach over time.",
  },
];

const tradingSessions = [
  {
    icon: <Globe className="w-6 h-6 text-blue-400" />,
    title: "London Session",
    desc: "The London session (approximately 08:00-17:00 GMT) often sees increased gold volatility as European financial markets open. Many gold traders consider this an active period for XAUUSD analysis.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-trading-green" />,
    title: "New York Session",
    desc: "The New York session (approximately 13:00-22:00 GMT) overlaps with the tail end of London and is when major US economic data is released. Gold frequently responds to US announcements during this window.",
  },
  {
    icon: <Zap className="w-6 h-6 text-trading-gold" />,
    title: "London/New York Overlap",
    desc: "The overlap period between London and New York sessions typically experiences the highest trading volume and liquidity for gold, which can lead to more defined price action and tighter spreads.",
  },
  {
    icon: <Activity className="w-6 h-6 text-purple-400" />,
    title: "Major US Economic Announcements",
    desc: "Reports such as Non-Farm Payrolls, CPI inflation data, GDP figures, and retail sales can cause sharp gold price movements. Traders often exercise increased caution around these events.",
  },
  {
    icon: <Clock className="w-6 h-6 text-trading-gold" />,
    title: "Federal Reserve Events",
    desc: "FOMC meetings, interest rate decisions, and Fed chair press conferences are among the most influential catalysts for gold prices. Rate expectations directly affect the dollar and, by extension, gold.",
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-trading-red" />,
    title: "Volatility Considerations",
    desc: "Gold can experience rapid price swings around high-impact events. While volatility creates trading opportunities, it also increases risk. Traders should adjust position sizes accordingly.",
  },
];

const riskTopics = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-trading-red" />,
    title: "Stop-Loss Usage",
    desc: "Always use a stop-loss order to define the maximum amount you are willing to lose on a gold trade. Gold can move quickly, and a stop-loss helps protect your capital from unexpected adverse movements.",
  },
  {
    icon: <Layers className="w-6 h-6 text-trading-red" />,
    title: "Position Sizing",
    desc: "Determine how much of your account to risk on each gold trade based on the distance to your stop-loss. Many experienced traders risk only a small percentage of their total capital per trade.",
  },
  {
    icon: <Target className="w-6 h-6 text-trading-red" />,
    title: "Risk / Reward",
    desc: "Before entering any gold trade, consider the potential loss versus the potential gain. A favorable risk/reward ratio means the expected profit target justifies the risk being taken.",
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-trading-red" />,
    title: "Avoiding Excessive Leverage",
    desc: "High leverage amplifies both gains and losses on gold trades. Using too much leverage can rapidly deplete a trading account during volatile market conditions that gold frequently experiences.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-trading-red" />,
    title: "Avoiding Overtrading",
    desc: "Resist the urge to trade every gold movement. Overtrading leads to increased transaction costs, emotional fatigue, and poor decision-making. Wait for setups that meet your criteria.",
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-trading-red" />,
    title: "Never Risk Money You Cannot Afford to Lose",
    desc: "Only trade gold with capital that, if lost entirely, would not affect your ability to meet financial obligations or living expenses. This is the most fundamental rule of risk management.",
  },
];

const whyFollow = [
  {
    icon: <TrendingUp className="w-6 h-6 text-trading-gold" />,
    title: "Gold / XAUUSD Market Insights",
    desc: "Follow regular gold market commentary and XAUUSD analysis covering price action, key levels, and potential trading opportunities discussed within the community.",
  },
  {
    icon: <LineChart className="w-6 h-6 text-trading-green" />,
    title: "Technical Analysis",
    desc: "Access chart analysis, market structure breakdowns, and technical observations that can help you develop your own understanding of gold price behavior.",
  },
  {
    icon: <Activity className="w-6 h-6 text-blue-400" />,
    title: "Market Updates",
    desc: "Stay informed about market-moving events, economic data releases, and shifts in sentiment that may affect gold and XAUUSD prices throughout the trading week.",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-trading-gold" />,
    title: "Educational Content",
    desc: "Learn from market analysis and trading discussions that can help you understand how experienced traders approach the gold market and structure their trade ideas.",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-trading-green" />,
    title: "Trading Community",
    desc: "Join a group of traders who discuss gold market ideas, share perspectives on XAUUSD, and follow market movements together in a focused Telegram community.",
  },
  {
    icon: <Zap className="w-6 h-6 text-trading-gold" />,
    title: "Easy Telegram Access",
    desc: "All gold market updates and analysis are shared directly on Telegram, so you can follow XAUUSD developments from your phone or desktop without leaving the app.",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                              */
/* ------------------------------------------------------------------ */
export default function GoldSignalsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <header className="relative z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold text-foreground tracking-tight no-underline hover:text-trading-green transition-colors"
          >
            ForexWizzz
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
              className="text-sm font-medium text-trading-gold hover:text-trading-gold/80 transition-colors no-underline"
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
                ForexWizard Gold Trading Community
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">Gold Trading Signals</span>
              <br />
              <span className="text-foreground">&amp; </span>
              <span className="text-trading-gold text-glow-gold">XAUUSD Market Analysis</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              ForexWizard provides gold and XAUUSD market analysis, trading
              insights, and educational information for gold traders. Join our
              Telegram community to follow market updates and discussions.
            </p>

            <FadeIn delay={0.5} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <TelegramCTA text="Join ForexWizard Telegram" variant="gold" />
              <Link
                href="/forex-signals/"
                className="inline-flex items-center justify-center gap-2 font-bold text-base rounded-xl px-6 py-3.5 md:px-8 md:py-4 glass-strong text-foreground hover:text-trading-green border border-white/10 hover:border-trading-green/30 transition-all duration-300 no-underline select-none hover:scale-105 active:scale-95"
              >
                <BarChart3 className="w-5 h-5" />
                Explore Forex Signals
              </Link>
            </FadeIn>
          </HeroAnimation>
        </section>

        {/* SECTION 1: WHAT ARE GOLD TRADING SIGNALS? */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">What Are </span>
                <span className="text-trading-gold text-glow-gold">Gold Trading Signals?</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Gold trading signals are trade ideas or analysis-based suggestions
                focused on the gold market, typically referencing the XAUUSD
                currency pair. XAUUSD represents the price of one troy ounce of gold
                quoted in US dollars and is one of the most widely traded commodity
                pairs in global financial markets. These signals are usually
                developed by traders or analysts who have identified a potential
                trading opportunity through their study of the gold market.
              </p>
              <p>
                A typical gold signal includes the trade direction (buy or sell), a
                suggested entry price or zone, a stop-loss level to define and limit
                potential losses, and one or more take-profit targets where gains
                might be secured. Many well-structured signals also include the
                reasoning behind the setup, such as key technical levels, chart
                patterns, or macroeconomic factors that support the trade idea.
                Understanding the reasoning behind a signal is just as important as
                the signal itself, because it helps traders develop their own market
                analysis skills over time.
              </p>
              <p>
                It is important to understand that gold trading signals are not
                instructions and they do not guarantee profits. Traders should use
                signals as one input among many in their decision-making process.
                Every trader should evaluate whether a signal aligns with their own
                trading plan, account size, and risk tolerance. Risk management
                including the use of stop-losses and appropriate position sizing
                remains the trader's own responsibility, regardless of any signal
                they choose to follow.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SECTION 2: WHAT A GOLD SIGNAL CAN INCLUDE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">What Can a Gold Signal </span>
                <span className="text-trading-gold text-glow-gold">Include?</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                The components below are commonly found in a well-structured
                gold trading signal shared by analysts and trading communities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {signalComponents.map((item, i) => (
                <FadeIn key={i} delay={i * 0.07}>
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
          </div>
        </FadeSection>

        {/* SECTION 3: XAUUSD MARKET ANALYSIS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">How XAUUSD Market Analysis </span>
                <span className="text-trading-gold text-glow-gold">Supports Gold Signals</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                The types of analysis that traders commonly apply when studying
                the gold market and evaluating potential XAUUSD trading opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {analysisTopics.map((item, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-gold/10 to-transparent flex items-center justify-center">
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

            <div className="mt-10 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                For in-depth XAUUSD analysis, visit our{" "}
                <Link
                  href="/xauusd-analysis/"
                  className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium"
                >
                  XAUUSD analysis
                </Link>{" "}
                hub. To build your technical foundation, learn{" "}
                <Link
                  href="/how-to-read-xauusd-price-action/"
                  className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium"
                >
                  how to read XAUUSD price action
                </Link>{" "}
                and explore{" "}
                <Link
                  href="/xauusd-support-resistance/"
                  className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium"
                >
                  XAUUSD support and resistance
                </Link>{" "}
                levels in detail.
              </p>
              <p className="text-sm text-muted-foreground">
                For broader currency pair coverage, see our{" "}
                <Link
                  href="/forex-signals/"
                  className="text-trading-green hover:text-trading-green/80 transition-colors no-underline font-medium"
                >
                  Forex signals
                </Link>{" "}
                page.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SECTION 4: GOLD TRADING STRATEGIES */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Gold Trading </span>
                <span className="text-trading-gold text-glow-gold">Strategies</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Educational approaches that traders may consider when analyzing
                gold. Different market conditions require different strategies,
                and no single approach works in all situations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {strategies.map((item, i) => (
                <FadeIn key={i} delay={i * 0.07}>
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
              No strategy guarantees profits. Traders should backtest and
              demo-trade before committing real capital.
            </p>
          </div>
        </FadeSection>

        {/* SECTION 5: BEST TIME TO TRADE GOLD */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Best Time to </span>
                <span className="text-trading-gold text-glow-gold">Trade Gold</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Gold can experience different levels of volatility and liquidity
                during various market sessions and around major economic events.
                Understanding these patterns can help traders make more informed
                decisions about when to pay closer attention to the gold market.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {tradingSessions.map((item, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-gold/10 to-transparent flex items-center justify-center">
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
              There is no single "best" time to trade gold. Traders should
              consider their own schedule, strategy, and risk tolerance when
              deciding when to participate in the market.
            </p>
          </div>
        </FadeSection>

        {/* SECTION 6: GOLD RISK MANAGEMENT */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full glass-strong mb-6">
                <AlertTriangle className="w-8 h-8 text-trading-red" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Risk Management When Using </span>
                <span className="text-trading-red">Gold Signals</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Gold can be volatile, and managing risk is essential for anyone
                participating in the gold market. These are the core principles
                that every gold trader should follow.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {riskTopics.map((item, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 border border-trading-red/20 hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-trading-red/10 flex items-center justify-center">
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

            <div className="mt-10 glass-strong rounded-2xl p-6 md:p-8 text-center border border-trading-red/10">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Gold and forex trading involves significant risk and may not be
                suitable for all investors. Past performance does not guarantee
                future results. Information provided by ForexWizard is for
                educational and informational purposes only and should not be
                considered financial advice.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SECTION 7: WHY FOLLOW FOREXWIZARD FOR GOLD? */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Why Follow </span>
                <span className="text-trading-gold text-glow-gold">ForexWizard for Gold?</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                ForexWizard offers a focused space for gold traders who want to
                follow XAUUSD market analysis and trading community discussions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyFollow.map((item, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-gold/10 to-trading-green/10 flex items-center justify-center text-trading-gold">
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
          </div>
        </FadeSection>

        {/* SECTION 8: TELEGRAM CTA */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-gold/5 via-transparent to-trading-green/5 rounded-3xl blur-sm" />
            <div className="relative glass-strong rounded-3xl p-8 md:p-14 text-center gradient-border">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                <span className="text-foreground">Join the </span>
                <span className="text-trading-gold text-glow-gold">
                  ForexWizard
                </span>
                <br />
                <span className="text-foreground">Gold Trading Community</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                Follow gold and XAUUSD market updates, analysis and trading
                insights through the ForexWizard Telegram community.
              </p>
              <PulsingGlow className="inline-block rounded-xl">
                <TelegramCTA
                  text="Join ForexWizard Telegram"
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

        {/* CONTINUE LEARNING */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Continue </span>
                <span className="text-trading-gold text-glow-gold">Learning</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Explore more of ForexWizard to deepen your gold trading
                knowledge and market understanding.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <FadeIn delay={0}>
                <Link
                  href="/xauusd-analysis/"
                  className="block h-full no-underline"
                >
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-gold/10 to-transparent flex items-center justify-center">
                      <LineChart className="w-7 h-7 text-trading-gold" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">
                      XAUUSD Analysis
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The main hub for XAUUSD and gold market analysis, covering
                      price action, key levels, and market structure.
                    </p>
                  </div>
                </Link>
              </FadeIn>

              <FadeIn delay={0.07}>
                <Link
                  href="/forex-signals/"
                  className="block h-full no-underline"
                >
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-green/10 to-transparent flex items-center justify-center">
                      <BarChart3 className="w-7 h-7 text-trading-green" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">
                      Forex Signals
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Broader forex trading signals covering major and minor
                      currency pairs beyond gold and XAUUSD.
                    </p>
                  </div>
                </Link>
              </FadeIn>

              <FadeIn delay={0.14}>
                <Link
                  href="/about/"
                  className="block h-full no-underline"
                >
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-gold/10 to-trading-green/10 flex items-center justify-center">
                      <BookOpen className="w-7 h-7 text-trading-gold" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">
                      About ForexWizard
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Learn about the ForexWizard community, our approach to
                      market education, and what to expect.
                    </p>
                  </div>
                </Link>
              </FadeIn>
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
        <footer className="py-10 px-4 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground mb-2">
              ForexWizzz &mdash; Free Forex &amp; Gold Trading Signals Community
            </p>
            <p className="text-xs text-muted-foreground/50 max-w-lg mx-auto leading-relaxed">
              Risk Disclaimer: Forex and other financial markets involve
              significant risk of loss and are not suitable for all investors.
              Past performance does not guarantee future results. The content
              shared in our community is for educational and informational
              purposes only and should not be considered financial advice.
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Link
                href="/"
                className="text-xs text-muted-foreground/40 hover:text-trading-green transition-colors no-underline"
              >
                Home
              </Link>
              <Link
                href="/forex-signals/"
                className="text-xs text-muted-foreground/40 hover:text-trading-green transition-colors no-underline"
              >
                Forex Signals
              </Link>
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground/40 hover:text-trading-green transition-colors no-underline"
              >
                t.me/ForexWizzz
              </a>
            </div>
          </div>
        </footer>
      </main>

      <StickyTelegramButton
        href={TELEGRAM_LINK}
        label="Join ForexWizzz on Telegram"
      />
    </>
  );
}
