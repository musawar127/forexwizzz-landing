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
  title: "Forex Signals | Free Forex Trading Signals & Market Analysis",
  description:
    "Explore ForexWizard forex trading signals, market analysis and educational insights for forex and gold traders. Join our Telegram community for updates.",
  alternates: {
    canonical: "https://forexwizard.online/forex-signals/",
  },
  openGraph: {
    title: "Forex Signals | Free Forex Trading Signals & Market Analysis",
    description:
      "Explore ForexWizard forex trading signals, market analysis and educational insights for forex and gold traders. Join our Telegram community for updates.",
    type: "website",
    url: "https://forexwizard.online/forex-signals/",
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
    title: "Forex Signals | Free Forex Trading Signals & Market Analysis",
    description:
      "Explore ForexWizard forex trading signals, market analysis and educational insights for forex and gold traders. Join our Telegram community for updates.",
    images: ["/og-image.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are forex signals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Forex signals are trade ideas or suggestions that indicate potential entry and exit points for currency pair trades. A typical forex signal may include the currency pair, trade direction (buy or sell), suggested entry price, stop-loss level, and take-profit target. Traders use forex signals as one input in their decision-making process, but they should always apply their own analysis and risk management before entering any trade.",
      },
    },
    {
      "@type": "Question",
      name: "Are forex signals guaranteed to make money?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No legitimate trading signal can guarantee profits. Forex trading involves significant risk, and even well-analyzed signals can result in losses. Market conditions can change rapidly, and no analysis method is foolproof. Traders should never risk money they cannot afford to lose and should always use proper risk management regardless of any signal they follow.",
      },
    },
    {
      "@type": "Question",
      name: "What currency pairs can forex traders analyze?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Forex traders commonly analyze major currency pairs such as EUR/USD, GBP/USD, USD/JPY, AUD/USD, USD/CAD, USD/CHF, and NZD/USD. Some traders also follow cross pairs and exotic currencies. The specific pairs covered by any community or analyst can vary depending on market conditions and the trader's focus.",
      },
    },
    {
      "@type": "Question",
      name: "Are forex signals suitable for beginners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Beginners should focus on understanding forex market fundamentals, risk management, and trading basics before relying heavily on signals. Forex signals can be educational for beginners who want to see how experienced traders approach the market, but they should not replace learning how to trade independently. Understanding concepts like stop-loss, position sizing, and market structure is essential before using any trading signal.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I get ForexWizard updates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can join the ForexWizard community on Telegram to follow forex market updates, trading insights, and analysis discussions. The community is free to join and provides market commentary, potential trading setups, and educational content for forex and gold traders.",
      },
    },
    {
      "@type": "Question",
      name: "Is forex trading risky?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, forex trading involves substantial risk of loss and is not suitable for all investors. The forex market is highly leveraged, which means both gains and losses can be amplified. Traders can lose more than their initial investment in some cases. It is important to only trade with capital you can afford to lose, use stop-loss orders, and understand the risks fully before participating in the forex market.",
      },
    },
  ],
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
    icon: <Target className="w-7 h-7 text-trading-green" />,
    title: "Currency Pair",
    desc: "The specific forex pair being analyzed, such as EUR/USD or GBP/USD. Each pair has its own characteristics and volatility profile.",
  },
  {
    icon: <ArrowUpRight className="w-7 h-7 text-trading-green" />,
    title: "Buy / Sell Direction",
    desc: "Whether the signal suggests a long (buy) or short (sell) position, based on the analysis of current market conditions.",
  },
  {
    icon: <Crosshair className="w-7 h-7 text-trading-gold" />,
    title: "Entry Area",
    desc: "A suggested price zone or range where a trader might consider entering the trade, rather than a single fixed price.",
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-trading-red" />,
    title: "Stop-Loss",
    desc: "A predetermined price level where the trade would be closed to limit potential losses. This is a critical risk management tool.",
  },
  {
    icon: <Trophy className="w-7 h-7 text-trading-gold" />,
    title: "Take-Profit",
    desc: "A target price level where the trade may be closed to secure potential gains. Multiple take-profit levels are sometimes used.",
  },
  {
    icon: <BarChart3 className="w-7 h-7 text-blue-400" />,
    title: "Market Reasoning",
    desc: "The analysis and rationale behind the signal, including technical factors, price levels, or market context that support the idea.",
  },
  {
    icon: <Layers className="w-7 h-7 text-purple-400" />,
    title: "Technical Levels",
    desc: "Key support, resistance, and structural levels that informed the trade idea. These help traders understand the market context.",
  },
];

const forexPairs = [
  { pair: "EUR/USD", desc: "The most traded currency pair in the world, representing the Euro against the US Dollar." },
  { pair: "GBP/USD", desc: "A major pair tracking the British Pound against the US Dollar, known for its volatility." },
  { pair: "USD/JPY", desc: "Reflects the US Dollar against the Japanese Yen, influenced by Bank of Japan and Fed policy." },
  { pair: "AUD/USD", desc: "The Australian Dollar against the US Dollar, sensitive to commodity prices and Asian market sentiment." },
  { pair: "USD/CAD", desc: "US Dollar versus the Canadian Dollar, often correlated with oil price movements." },
  { pair: "USD/CHF", desc: "The US Dollar against the Swiss Franc, considered a safe-haven pair during market uncertainty." },
  { pair: "NZD/USD", desc: "The New Zealand Dollar against the US Dollar, influenced by dairy trade and RBNZ policy." },
];

const analysisTypes = [
  { icon: <LineChart className="w-6 h-6 text-trading-green" />, title: "Technical Analysis", desc: "Chart patterns, indicators, and price action used to identify potential trading opportunities based on historical price data." },
  { icon: <Activity className="w-6 h-6 text-trading-gold" />, title: "Price Action", desc: "Reading raw price movement on charts without heavy indicator reliance, focusing on candlestick patterns and market structure." },
  { icon: <Layers className="w-6 h-6 text-blue-400" />, title: "Support and Resistance", desc: "Identifying key price levels where buying or selling pressure has historically increased, which may influence future price behavior." },
  { icon: <TrendingUp className="w-6 h-6 text-purple-400" />, title: "Market Structure", desc: "Understanding higher highs, higher lows, and trend phases to determine whether a market is trending or ranging." },
  { icon: <BarChart3 className="w-6 h-6 text-trading-green" />, title: "Key Economic Events", desc: "Monitoring central bank decisions, employment data, inflation reports, and other events that can drive significant market moves." },
  { icon: <Target className="w-6 h-6 text-trading-gold" />, title: "Risk/Reward Considerations", desc: "Evaluating whether a potential trade offers a favorable balance between the expected gain and the potential loss." },
];

const whyFollow = [
  { icon: <TrendingUp className="w-6 h-6 text-trading-green" />, title: "Forex Market Insights", desc: "Follow daily forex market commentary and analysis covering major currency pairs and key market themes." },
  { icon: <Trophy className="w-6 h-6 text-trading-gold" />, title: "Gold / XAUUSD Coverage", desc: "In addition to forex pairs, the community covers Gold price analysis and XAUUSD trading discussions." },
  { icon: <BookOpen className="w-6 h-6 text-blue-400" />, title: "Educational Information", desc: "Access market analysis that can help you understand how professional traders approach the forex market." },
  { icon: <Activity className="w-6 h-6 text-purple-400" />, title: "Market Updates", desc: "Stay informed about market-moving events, economic data releases, and shifts in market sentiment." },
  { icon: <MessageCircle className="w-6 h-6 text-trading-green" />, title: "Trading Community", desc: "Join a group of traders who discuss ideas, share perspectives, and follow market movements together." },
  { icon: <BarChart3 className="w-6 h-6 text-trading-gold" />, title: "Easy Telegram Access", desc: "All updates are shared directly on Telegram, so you can follow along from your phone or desktop." },
];

const riskTopics = [
  { icon: <ShieldCheck className="w-6 h-6 text-trading-red" />, title: "Stop-Loss", desc: "Always use a stop-loss order to define the maximum amount you are willing to lose on a trade. This helps protect your capital when the market moves against your position." },
  { icon: <Layers className="w-6 h-6 text-trading-red" />, title: "Position Sizing", desc: "Determine how much of your account to risk on each trade. Many experienced traders risk only a small percentage of their total capital per trade." },
  { icon: <Target className="w-6 h-6 text-trading-red" />, title: "Risk / Reward", desc: "Before entering a trade, consider the potential loss versus the potential gain. A favorable risk/reward ratio means the potential reward outweighs the risk." },
  { icon: <AlertTriangle className="w-6 h-6 text-trading-red" />, title: "Avoiding Excessive Leverage", desc: "High leverage amplifies both gains and losses. Using too much leverage can quickly deplete a trading account during unfavorable market moves." },
  { icon: <ShieldCheck className="w-6 h-6 text-trading-red" />, title: "Never Risk Money You Cannot Afford to Lose", desc: "Only trade with capital that, if lost entirely, would not affect your ability to meet your financial obligations or living expenses." },
];

const faqs = [
  {
    q: "What are forex signals?",
    a: "Forex signals are trade ideas or suggestions that indicate potential entry and exit points for currency pair trades. A typical forex signal includes the currency pair (such as EUR/USD), the trade direction (buy or sell), a suggested entry area, a stop-loss level to limit risk, and one or more take-profit targets. Signals are usually based on technical analysis, fundamental analysis, or a combination of both. However, forex signals are not instructions — they are ideas that traders can evaluate alongside their own analysis. Every trader should understand the reasoning behind a signal and decide whether it fits their trading plan before committing capital.",
  },
  {
    q: "Are forex signals guaranteed to make money?",
    a: "No legitimate trading signal can guarantee profits. Forex trading involves significant risk, and even thoroughly analyzed signals can result in losses. Market conditions can change rapidly due to economic data releases, geopolitical events, or shifts in market sentiment. No analysis method is foolproof. Anyone who claims guaranteed returns from forex signals is being misleading. Traders should approach all signals with caution, use proper risk management, and never risk money they cannot afford to lose.",
  },
  {
    q: "What currency pairs can forex traders analyze?",
    a: "Forex traders commonly analyze major currency pairs such as EUR/USD, GBP/USD, USD/JPY, AUD/USD, USD/CAD, USD/CHF, and NZD/USD. Some traders also follow cross pairs like EUR/GBP or AUD/JPY, and occasionally exotic pairs. The specific pairs covered by any community or analyst vary depending on market conditions, volatility, and the trader's expertise. Not every pair receives attention every day — coverage tends to focus on pairs where the market is presenting clearer opportunities.",
  },
  {
    q: "Are forex signals suitable for beginners?",
    a: "Beginners should prioritize learning forex fundamentals, risk management, and basic technical analysis before relying heavily on signals. Forex signals can be educational — seeing how experienced traders analyze the market and structure trade ideas can help beginners learn. However, signals should not replace developing your own trading skills. Understanding concepts like stop-loss placement, position sizing, support and resistance, and market structure is essential. Following signals without understanding them can lead to poor risk management decisions.",
  },
  {
    q: "Where can I get ForexWizard updates?",
    a: "You can join the ForexWizard Telegram community to follow forex market updates, trading insights, and analysis discussions. The community is free to join and provides market commentary, potential trading setups, and educational content for forex and gold traders. Visit the ForexWizard homepage or search for ForexWizzz on Telegram to find the community.",
  },
  {
    q: "Is forex trading risky?",
    a: "Yes, forex trading involves substantial risk and is not suitable for all investors. The forex market operates with high leverage, which amplifies both potential gains and potential losses. Currency prices can move rapidly in response to economic data, central bank decisions, and geopolitical events. Traders can lose their entire investment and, in some cases with high leverage, more than their initial deposit. It is critical to understand these risks fully, use stop-loss orders, manage position sizes carefully, and only trade with capital you can afford to lose entirely.",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                              */
/* ------------------------------------------------------------------ */
export default function ForexSignalsPage() {
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
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block"
            >
              Home
            </Link>
            <Link
              href="/forex-signals/"
              className="text-sm font-medium text-trading-green hover:text-trading-green/80 transition-colors no-underline"
            >
              Forex Signals
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
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-trading-green/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-trading-gold/5 rounded-full blur-[100px] pointer-events-none" />
          <CandlestickBackground />

          <HeroAnimation className="relative z-10 text-center max-w-4xl mx-auto">
            <FadeIn delay={0.2} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-green">
                <span className="w-2 h-2 bg-trading-green rounded-full animate-pulse" />
                ForexWizard Trading Community
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">Forex Trading Signals</span>
              <br />
              <span className="text-foreground">&amp; </span>
              <span className="text-trading-gold text-glow-gold">Market Analysis</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              ForexWizard provides forex market analysis, trading insights, and
              educational information for forex and gold traders. Join our
              Telegram community to follow market updates and discussions.
            </p>

            <FadeIn delay={0.5} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <TelegramCTA text="Join ForexWizard Telegram" variant="primary" />
              <a
                href="#market-analysis"
                className="inline-flex items-center justify-center gap-2 font-bold text-base rounded-xl px-6 py-3.5 md:px-8 md:py-4 glass-strong text-foreground hover:text-trading-green border border-white/10 hover:border-trading-green/30 transition-all duration-300 no-underline select-none hover:scale-105 active:scale-95"
              >
                <BarChart3 className="w-5 h-5" />
                Explore Market Analysis
              </a>
            </FadeIn>
          </HeroAnimation>
        </section>

        {/* WHAT ARE FOREX SIGNALS? */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">What Are </span>
                <span className="text-trading-green text-glow-green">Forex Signals?</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Forex signals are trade ideas or suggestions that indicate
                potential entry and exit points for currency pair trades. They are
                typically shared by experienced traders or analysts who have
                identified a possible trading opportunity based on their market
                analysis.
              </p>
              <p>
                A forex signal usually includes the currency pair being traded
                (such as EUR/USD or GBP/USD), the direction of the trade (buy or
                sell), a suggested entry price or zone, a stop-loss level to limit
                potential losses, and one or more take-profit targets where gains
                might be secured. Some signals also include the reasoning behind the
                idea, such as key technical levels or market context.
              </p>
              <p>
                Traders use forex signals as one input in their decision-making
                process. A signal does not replace a trader's own analysis, judgment,
                or risk management. Every trader should evaluate whether a signal
                aligns with their trading plan, account size, and risk tolerance
                before entering a position. Risk management — including the use of
                stop-losses and appropriate position sizing — remains the
                trader's responsibility regardless of any signal they follow.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* WHAT A FOREX SIGNAL CAN INCLUDE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">What a Forex Signal</span>
                <br />
                <span className="text-trading-gold text-glow-gold">Can Include</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                The components below are commonly found in a well-structured
                forex trading signal shared by analysts and trading communities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {signalComponents.map((item, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-green/10 to-trading-gold/10 flex items-center justify-center">
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

        {/* FOREX PAIRS WE FOLLOW */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Forex Pairs </span>
                <span className="text-trading-green text-glow-green">We Follow</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                These are the major currency pairs that the ForexWizard community
                commonly covers. Market analysis and available signals vary
                depending on market conditions and opportunity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {forexPairs.map((p, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className="glass-strong rounded-2xl p-5 gradient-border hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-trading-green/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-trading-green" />
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        {p.pair}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground/60 mt-8 max-w-lg mx-auto">
              Market coverage varies depending on conditions. Not every pair
              receives signals or analysis every day.
            </p>
          </div>
        </FadeSection>

        {/* FOREX MARKET ANALYSIS */}
        <FadeSection className="py-20 md:py-28 px-4" id="market-analysis">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Forex </span>
                <span className="text-trading-gold text-glow-gold">Market Analysis</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                The types of analysis that ForexWizard may cover when sharing
                market insights and trading ideas with the community.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {analysisTypes.map((item, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-green/10 to-transparent flex items-center justify-center">
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
              <p className="text-sm text-muted-foreground mb-4">
                For more detailed analysis, visit our{" "}
                <Link
                  href="/forex-analysis/"
                  className="text-trading-green hover:text-trading-green/80 transition-colors no-underline font-medium"
                >
                  Forex analysis
                </Link>{" "}
                page or explore{" "}
                <Link
                  href="/gold-signals/"
                  className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium"
                >
                  Gold analysis
                </Link>{" "}
                coverage.
              </p>
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
                <span className="text-foreground">Risk </span>
                <span className="text-trading-red">Management</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Understanding and managing risk is essential for anyone
                participating in the forex market. These are the core principles
                that every trader should follow.
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
                Forex trading involves significant risk and may not be suitable
                for all investors. Past performance does not guarantee future
                results. The information provided on ForexWizard is for
                educational and informational purposes only and should not be
                considered financial advice.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* WHY FOLLOW FOREXWIZARD */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Why Follow </span>
                <span className="text-trading-green text-glow-green">ForexWizard?</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                ForexWizard offers a focused space for forex and gold traders
                who want to follow market analysis and trading community
                discussions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyFollow.map((item, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-green/10 to-trading-gold/10 flex items-center justify-center text-trading-green">
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

        {/* TELEGRAM CTA */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-green/5 via-transparent to-trading-gold/5 rounded-3xl blur-sm" />
            <div className="relative glass-strong rounded-3xl p-8 md:p-14 text-center gradient-border">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                <span className="text-foreground">Join the </span>
                <span className="text-trading-green text-glow-green">
                  ForexWizard
                </span>
                <br />
                <span className="text-foreground">Telegram Community</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                Follow Forex and market updates, analysis and trading insights
                through the ForexWizard community on Telegram.
              </p>
              <PulsingGlow className="inline-block rounded-xl">
                <TelegramCTA
                  text="Join Telegram"
                  variant="primary"
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
                      <ArrowDownRight className="w-5 h-5 text-trading-green shrink-0 transition-transform group-open:rotate-180" />
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
