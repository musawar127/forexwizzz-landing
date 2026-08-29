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
  CheckCircle2,
  XCircle,
  Eye,
  Pause,
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
  title: "XAUUSD Trading Strategy | How to Trade Gold Step by Step",
  description:
    "Learn an XAUUSD trading strategy using market structure, price action, key levels, trade planning and risk management in a practical step-by-step framework.",
  alternates: {
    canonical: "https://forexwizard.online/xauusd-trading-strategy/",
  },
  openGraph: {
    title: "XAUUSD Trading Strategy | How to Trade Gold Step by Step",
    description:
      "Learn an XAUUSD trading strategy using market structure, price action, key levels, trade planning and risk management in a practical step-by-step framework.",
    type: "website",
    url: "https://forexwizard.online/xauusd-trading-strategy/",
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
    title: "XAUUSD Trading Strategy | How to Trade Gold Step by Step",
    description:
      "Learn an XAUUSD trading strategy using market structure, price action, key levels, trade planning and risk management in a practical step-by-step framework.",
    images: ["/og-image.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

/* ------------------------------------------------------------------ */
/*  FAQ                                                               */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    q: "What is an XAUUSD trading strategy?",
    a: "An XAUUSD trading strategy is a structured plan that defines how a trader approaches buying or selling gold on the financial markets. Rather than making impulsive decisions, a strategy establishes clear conditions for when to enter a trade, where to place a stop-loss, where to take profits, and how much capital to risk. A well-built XAUUSD strategy typically incorporates market structure analysis, price action observation, support and resistance levels, timeframe selection, and defined risk management rules. The goal of a strategy is to remove emotional decision-making and provide a repeatable framework that a trader can follow consistently, evaluate over time, and refine as their understanding of the gold market develops.",
  },
  {
    q: "What is a simple XAUUSD strategy for beginners?",
    a: "A straightforward approach for someone learning how to trade XAUUSD is to start by identifying the trend on a higher timeframe such as the daily or 4-hour chart, then wait for price to pull back to a notable support or resistance level on an intermediate timeframe. Once price reaches that area, the trader looks for price action confirmation, such as a rejection candlestick or a break and retest of the level, before entering in the direction of the larger trend. The trade includes a stop-loss placed just beyond the key level and a take-profit target at the next logical level in the trade direction. This approach is not guaranteed to produce profits, but it provides beginners with a structured process that emphasizes patience, risk management, and learning to read the market rather than chasing random entries.",
  },
  {
    q: "How do you analyze XAUUSD before a trade?",
    a: "Before considering an XAUUSD trade, a common analytical sequence begins with checking the higher timeframe to understand the current market context, whether gold is trending, ranging, or showing signs of a structural shift. Next, traders identify key support and resistance levels that may influence price behavior. They then assess the current price action around those levels, looking for signs of strength, weakness, rejection, or continuation. Additional factors include reviewing upcoming economic events that could affect gold prices, such as Federal Reserve announcements or major data releases, and evaluating whether the current setup offers a favorable balance between potential reward and risk. This multi-step process helps traders make more informed decisions rather than reacting impulsively to short-term price movements.",
  },
  {
    q: "Which timeframes can be used for XAUUSD trading?",
    a: "XAUUSD can be traded across a wide range of timeframes, and the best choice depends on the individual trader's schedule, strategy, and experience level. Longer timeframes such as the daily and 4-hour charts are often used to establish market context and identify the prevailing trend or range conditions. Intermediate timeframes like the 1-hour and 15-minute charts are commonly used to observe market structure and locate potential entry areas. Shorter timeframes such as the 5-minute chart may be used for entry refinement but tend to carry more noise and require quicker decision-making. Many traders use multiple timeframes in combination, for example using the daily chart for bias, the 1-hour chart for structure, and the 15-minute chart for entry timing. There is no single best timeframe for trading gold.",
  },
  {
    q: "How should risk be managed when trading XAUUSD?",
    a: "Risk management when trading XAUUSD involves several core principles. Position sizing should be calculated so that each trade risks only a small, predetermined percentage of total account capital, commonly one to two percent for experienced traders and less for beginners. Every trade should have a stop-loss order placed at a technically justified level before the trade is entered. Traders should evaluate the risk-to-reward ratio of each setup, ensuring the potential profit target justifies the capital being risked. Excessive leverage should be avoided because it amplifies both gains and losses. Overtrading should be avoided as well, since taking too many trades increases transaction costs and the likelihood of emotional decisions. Finally, traders should only use capital they can afford to lose entirely, and they should never move their stop-loss further away simply to avoid taking a loss.",
  },
  {
    q: "Is there a guaranteed XAUUSD trading strategy?",
    a: "No. There is no trading strategy for XAUUSD or any other financial instrument that guarantees profits. Gold prices are influenced by a wide range of unpredictable factors including economic data releases, central bank policy decisions, geopolitical events, and shifts in market sentiment. Even the most carefully constructed strategy will experience losing trades, and no historical pattern repeats itself perfectly in the future. Traders who claim to have a guaranteed or fail-proof strategy are being misleading. The value of a trading strategy lies not in guaranteeing outcomes, but in providing a structured, repeatable process that helps traders make consistent decisions, manage risk effectively, and evaluate and improve their approach over time through honest record-keeping and review.",
  },
  {
    q: "What is the difference between an XAUUSD strategy and an XAUUSD signal?",
    a: "An XAUUSD strategy is a personal framework that a trader builds and follows. It defines the conditions under which they will consider entering a trade, how they will manage risk, and how they will exit. A strategy is owned by the trader and evolves with their experience. An XAUUSD signal, on the other hand, is a specific trade idea shared by an analyst or community, typically including an entry area, stop-loss, and take-profit levels for a particular setup at a particular time. Signals are external inputs that a trader may choose to evaluate within the context of their own strategy. In practice, many traders use signals as one source of ideas while applying their own strategy's risk management and analysis framework before deciding whether to act on them.",
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
/*  DATA                                                               */
/* ------------------------------------------------------------------ */
const planElements = [
  {
    icon: <Eye className="w-7 h-7 text-trading-gold" />,
    title: "Market Conditions",
    desc: "Define whether the strategy applies to trending markets, ranging markets, or both. No single approach works equally well in all conditions, so clarity here helps a trader know when to be active and when to wait.",
  },
  {
    icon: <Clock className="w-7 h-7 text-trading-gold" />,
    title: "Trading Timeframe",
    desc: "Select the primary timeframe for identifying setups and a higher timeframe for context. This combination helps align trades with the larger market direction while using the lower timeframe for precision.",
  },
  {
    icon: <Target className="w-7 h-7 text-trading-green" />,
    title: "Setup Criteria",
    desc: "List the specific conditions that must be present before a trade is considered, such as price reaching a key level, a trend being established, or a particular price action pattern forming.",
  },
  {
    icon: <Crosshair className="w-7 h-7 text-trading-gold" />,
    title: "Entry Conditions",
    desc: "Define exactly what must happen at the setup area to trigger an entry. This could be a candlestick pattern, a structural break, a retest, or a combination of confirming signals.",
  },
  {
    icon: <XCircle className="w-7 h-7 text-trading-red" />,
    title: "Invalidation Level",
    desc: "Identify what would prove the original trade idea wrong. If price moves beyond this point, the setup is no longer valid and the trade should not be taken or should be exited.",
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-trading-red" />,
    title: "Stop-Loss Planning",
    desc: "Place the stop-loss at a technically logical position beyond the invalidation point. The distance to the stop-loss then determines position size based on the risk rule.",
  },
  {
    icon: <Trophy className="w-7 h-7 text-trading-gold" />,
    title: "Take-Profit Planning",
    desc: "Identify one or more logical targets where the trade thesis is complete, such as the next structural level, a measured move, or a previous swing point.",
  },
  {
    icon: <AlertTriangle className="w-7 h-7 text-trading-red" />,
    title: "Risk Rules",
    desc: "Define the maximum percentage of account capital risked per trade, maximum daily or weekly loss limits, and rules for stopping trading after a series of losses.",
  },
];

const frameworkSteps = [
  {
    step: 1,
    title: "Establish Higher-Timeframe Context",
    desc: "Open a daily or 4-hour chart and determine whether XAUUSD is trending, ranging, or showing signs of a potential structural shift. This sets the directional bias and tells you whether you should be looking for longs, shorts, or standing aside.",
  },
  {
    step: 2,
    title: "Identify Trend or Range Conditions",
    desc: "On your intermediate timeframe, analyze the sequence of swing highs and swing lows. Higher highs and higher lows indicate an uptrend, lower highs and lower lows indicate a downtrend, and overlapping ranges suggest a consolidating market. Each condition requires a different tactical approach.",
  },
  {
    step: 3,
    title: "Mark Important Levels",
    desc: "Identify the most significant support and resistance levels on your chart. These are the price zones where the market has previously reacted and where future reactions are most likely. These levels become the areas where you will watch for potential trading opportunities.",
  },
  {
    step: 4,
    title: "Wait for Price to Reach the Area",
    desc: "Patience is a critical component of any XAUUSD strategy. Rather than chasing price, wait for gold to reach one of the key levels you have identified. The best setups occur when multiple factors converge at a single price zone.",
  },
  {
    step: 5,
    title: "Look for Price-Action Confirmation",
    desc: "Once price reaches your area, observe how it behaves. Look for rejection candles, structural breaks, retests, or continuation patterns that confirm the market is responding to the level as expected. This confirmation step helps filter out false signals.",
  },
  {
    step: 6,
    title: "Define Invalidation",
    desc: "Before entering, identify the exact point at which your trade idea would be proven wrong. This is typically just beyond the key level or structure you are trading from. Knowing your invalidation point keeps the trade objective and removes emotional guessing.",
  },
  {
    step: 7,
    title: "Calculate Position Size from Risk",
    desc: "Using the distance from your entry to your invalidation point, calculate how many units to trade so that the total risk on the trade does not exceed your predetermined risk percentage. This step should be completed before the trade is placed.",
  },
  {
    step: 8,
    title: "Plan the Exit",
    desc: "Identify your take-profit target or targets before entering the trade. Consider the risk-to-reward ratio and ensure it meets your minimum threshold. Having an exit plan before entry reduces the temptation to make impulsive decisions once the trade is live.",
  },
  {
    step: 9,
    title: "Record the Trade",
    desc: "After the trade is complete, document the setup, entry reasoning, outcome, and any observations. Maintaining a trade journal allows you to review your decisions objectively, identify recurring patterns in your own behavior, and refine your strategy over time.",
  },
];

const riskItems = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-trading-red" />,
    title: "Position Sizing",
    desc: "Calculate each position so that the risk per trade is a small, fixed percentage of total account capital. This ensures that no single trade can cause catastrophic damage to the account, even in a worst-case scenario.",
  },
  {
    icon: <Target className="w-6 h-6 text-trading-red" />,
    title: "Stop-Loss on Every Trade",
    desc: "Always place a stop-loss order before or immediately after entering a gold trade. Gold can move quickly, especially around economic events, and a stop-loss is the primary tool for limiting potential losses.",
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-trading-red" />,
    title: "Avoid Excessive Leverage",
    desc: "High leverage amplifies both potential gains and potential losses. Gold is already a volatile instrument, and excessive leverage can cause rapid account depletion during normal market fluctuations.",
  },
  {
    icon: <Layers className="w-6 h-6 text-trading-red" />,
    title: "Avoid Oversized Positions",
    desc: "Even with a stop-loss in place, an oversized position can create emotional pressure that leads to poor decisions. Keep positions small enough that you can think clearly while the trade is active.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-trading-red" />,
    title: "Risk/Reward Planning",
    desc: "Before entering any XAUUSD trade, compare the potential loss to the potential gain. A favorable risk/reward ratio means that even if some trades lose, the overall approach can remain viable over a series of trades.",
  },
  {
    icon: <XCircle className="w-6 h-6 text-trading-red" />,
    title: "Avoid Revenge Trading",
    desc: "After a losing trade, the urge to immediately re-enter the market to recover losses can be strong. Revenge trading typically leads to poorly planned entries and compounded losses. Taking a break is often the better choice.",
  },
  {
    icon: <Activity className="w-6 h-6 text-trading-red" />,
    title: "Avoid Overtrading",
    desc: "Not every price movement represents a trading opportunity. Overtrading increases transaction costs, causes mental fatigue, and often results in entering setups that do not meet your strategy's criteria.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-trading-red" />,
    title: "Understand Volatility",
    desc: "Gold volatility varies significantly depending on the session, economic calendar, and market conditions. Adjusting position sizes and stop-loss distances to account for current volatility helps manage risk more effectively.",
  },
];

const mistakes = [
  {
    icon: <Crosshair className="w-6 h-6 text-trading-red" />,
    title: "Entering Without a Defined Setup",
    desc: "Opening a position because price is moving, without a clear reason, invalidation level, or exit plan, is one of the most common causes of avoidable losses in XAUUSD trading.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-trading-red" />,
    title: "Trading Against Higher-Timeframe Structure",
    desc: "Taking trades that oppose the trend on the daily or 4-hour chart without a compelling reason increases the probability of being caught on the wrong side of a sustained move.",
  },
  {
    icon: <Activity className="w-6 h-6 text-trading-red" />,
    title: "Chasing Large Moves",
    desc: "Entering a trade after a significant move has already occurred, hoping it will continue further, often results in poor entry placement and a stop-loss that is disproportionately far from the current price.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-trading-red" />,
    title: "Moving Stop-Losses to Avoid Losses",
    desc: "Widening or removing a stop-loss to avoid taking a planned loss removes the entire risk management foundation of the trade and exposes the account to potentially unlimited losses.",
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-trading-red" />,
    title: "Risking Too Much on One Trade",
    desc: "Allocating a large portion of account capital to a single XAUUSD trade means that one unexpected move can cause severe or even total account damage, regardless of how confident the trader feels.",
  },
  {
    icon: <Layers className="w-6 h-6 text-trading-red" />,
    title: "Trading Every Market Condition",
    desc: "Attempting to trade when the market structure is unclear, when no valid setup is present, or during low-liquidity periods often leads to unnecessary losses and frustration.",
  },
  {
    icon: <Clock className="w-6 h-6 text-trading-red" />,
    title: "Ignoring Major Economic Events",
    desc: "Entering or holding positions through high-impact news events like Non-Farm Payrolls or Federal Reserve rate decisions without accounting for the expected volatility can result in large, unpredictable losses.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-trading-red" />,
    title: "Changing Strategy After a Few Losses",
    desc: "Abandoning a strategy after a small number of losing trades prevents the trader from gathering enough data to evaluate whether the approach has merit. No strategy wins every trade.",
  },
];

const whenNotToTrade = [
  {
    icon: <Eye className="w-6 h-6 text-trading-gold" />,
    title: "Unclear Market Structure",
    desc: "When the sequence of highs and lows is chaotic and no discernible trend or range can be identified, it is often better to wait for structure to develop rather than forcing a trade.",
  },
  {
    icon: <Activity className="w-6 h-6 text-trading-gold" />,
    title: "Unusually Volatile News Conditions",
    desc: "Around major economic announcements or unexpected geopolitical events, spreads can widen and price can gap beyond stop-loss levels. Many experienced traders reduce or eliminate exposure during these windows.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-trading-gold" />,
    title: "Poor Risk/Reward",
    desc: "If the distance to your stop-loss is large relative to the distance to the nearest logical take-profit target, the setup does not offer a favorable balance. Passing on these setups preserves capital for better opportunities.",
  },
  {
    icon: <Target className="w-6 h-6 text-trading-gold" />,
    title: "No Valid Setup Present",
    desc: "When price is between levels and no price action confirmation has occurred, there is no actionable setup. Waiting for a clear signal is a discipline that separates patient traders from impulsive ones.",
  },
  {
    icon: <Pause className="w-6 h-6 text-trading-gold" />,
    title: "Emotional or Impulsive State",
    desc: "If a trader is feeling frustrated, overly confident, fearful, or rushed, their judgment is likely compromised. Recognizing these emotional states and choosing not to trade during them is a valuable risk management skill.",
  },
];

const continueLearningCards = [
  {
    href: "/best-time-to-trade-xauusd/",
    icon: <Clock className="w-7 h-7 text-trading-gold" />,
    title: "Best Time to Trade XAUUSD",
    desc: "Understand how Asian, London and New York sessions affect gold liquidity, volatility and trading conditions.",
    gradient: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/how-to-trade-xauusd/",
    icon: <ShieldCheck className="w-7 h-7 text-trading-gold" />,
    title: "How to Trade XAUUSD",
    desc: "A beginner-friendly guide covering what you need before trading gold, how to analyze XAUUSD, plan trades and manage risk.",
    gradient: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/xauusd-analysis/",
    icon: <LineChart className="w-7 h-7 text-trading-gold" />,
    title: "XAUUSD Analysis",
    desc: "The main hub for ongoing XAUUSD market analysis, key levels, and gold market structure updates.",
    gradient: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/how-to-read-xauusd-price-action/",
    icon: <Activity className="w-7 h-7 text-trading-gold" />,
    title: "How to Read XAUUSD Price Action",
    desc: "A dedicated guide to reading candlestick patterns, market structure, and price behavior on XAUUSD charts.",
    gradient: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/xauusd-support-resistance/",
    icon: <Layers className="w-7 h-7 text-trading-gold" />,
    title: "XAUUSD Support and Resistance",
    desc: "How to identify, draw, and trade from key support and resistance levels on the gold chart.",
    gradient: "from-trading-gold/10 to-transparent",
  },
  {
    href: "/gold-signals/",
    icon: <BarChart3 className="w-7 h-7 text-trading-green" />,
    title: "Gold Trading Signals",
    desc: "Gold signals, XAUUSD trade ideas, and market updates from the ForexWizard community.",
    gradient: "from-trading-green/10 to-transparent",
  },
  {
    href: "/forex-signals/",
    icon: <TrendingUp className="w-7 h-7 text-trading-green" />,
    title: "Forex Signals",
    desc: "Broader forex trading signals covering major and minor currency pairs beyond gold.",
    gradient: "from-trading-green/10 to-transparent",
  },
  {
    href: "/about/",
    icon: <BookOpen className="w-7 h-7 text-trading-gold" />,
    title: "About ForexWizard",
    desc: "Learn about the ForexWizard community, our approach, and what to expect.",
    gradient: "from-trading-gold/10 to-trading-green/10",
  },
];

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
/*  PAGE                                                              */
/* ------------------------------------------------------------------ */
export default function XauusdTradingStrategyPage() {
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
                Educational XAUUSD Strategy Guide
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-trading-gold text-glow-gold">XAUUSD Trading Strategy</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Learn how to build and execute a structured XAUUSD trading
              strategy using market structure, price action, key levels, and
              responsible risk management.
            </p>

            <FadeIn delay={0.5} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <TelegramCTA text="Join ForexWizard Telegram" variant="gold" />
              <Link
                href="/xauusd-analysis/"
                className="inline-flex items-center justify-center gap-2 font-bold text-base rounded-xl px-6 py-3.5 md:px-8 md:py-4 glass-strong text-foreground hover:text-trading-gold border border-white/10 hover:border-trading-gold/30 transition-all duration-300 no-underline select-none hover:scale-105 active:scale-95"
              >
                <LineChart className="w-5 h-5" />
                View XAUUSD Analysis
              </Link>
            </FadeIn>
          </HeroAnimation>
        </section>

        {/* SECTION 1: WHAT IS AN XAUUSD TRADING STRATEGY? */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">What Is an </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD Trading Strategy?</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                An XAUUSD trading strategy is a structured plan that defines how a
                trader approaches the gold market. Rather than making impulsive
                decisions based on emotion or short-term price movements, a
                strategy establishes clear, repeatable conditions for when to
                enter a trade, where to place a stop-loss, where to take profits,
                and how much capital to risk on each position. The distinction
                between a strategy and a signal is important: a signal is a
                specific trade idea shared at a point in time, while a strategy
                is the personal framework a trader uses to evaluate any signal or
                market situation.
              </p>
              <p>
                A well-built XAUUSD strategy typically incorporates market
                structure analysis to understand the current trend or range,
                price action observation to identify potential entry and exit
                points, support and resistance levels to define areas of
                interest, timeframe selection to align with the trader's
                schedule, and defined risk management rules to protect capital
                over time. The goal is not to predict where gold will go, but to
                have a clear process that can be followed consistently and
                evaluated honestly.
              </p>
              <p>
                No strategy guarantees profits. Gold is influenced by economic
                data, central bank policy, geopolitical events, and market
                sentiment, all of which are unpredictable. A strategy's value
                lies in providing discipline and structure, not in eliminating
                risk. Traders who follow a structured approach are better
                positioned to learn from their results and refine their method
                over time compared to those who trade without a plan.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SECTION 2: HOW TO BUILD AN XAUUSD TRADING PLAN */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">How to Build an </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD Trading Plan</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                The core elements that form the foundation of a structured XAUUSD
                trading strategy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {planElements.map((item, i) => (
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

        {/* SECTION 3: HOW TO IDENTIFY THE XAUUSD MARKET TREND */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">How to Identify the </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD Market Trend</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Identifying the trend is one of the first steps in any XAUUSD
                trading strategy. On a chart, an uptrend is characterized by a
                series of higher highs and higher lows, where each push upward
                reaches a higher point than the last and each pullback holds
                above the previous low. A downtrend is the opposite: lower highs
                and lower lows, where each bounce fails to reach the previous
                high and each decline pushes to a new low. When neither pattern
                is clearly present and price is moving sideways between
                overlapping levels, the market is likely in a range.
              </p>
              <p>
                The timeframe used to assess the trend matters significantly.
                A daily chart may show a clear uptrend while a 15-minute chart
                shows a ranging or even bearish structure within that larger
                move. This is why many XAUUSD strategies use a higher timeframe
                to establish context and bias, and a lower timeframe for
                execution. The higher-timeframe trend acts as a filter that
                reduces the number of counter-trend trades a trader might
                otherwise take.
              </p>
              <p>
                Trend identification is not about certainty but about
                probability. A trader who aligns their entries with the
                higher-timeframe trend is working with the prevailing market
                momentum rather than against it. For ongoing XAUUSD trend
                analysis and market structure updates, the{" "}
                <Link
                  href="/xauusd-analysis/"
                  className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium"
                >
                  XAUUSD analysis
                </Link>{" "}
                page provides regular market context.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SECTION 4: HOW TO USE XAUUSD SUPPORT AND RESISTANCE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">How to Use XAUUSD </span>
                <span className="text-trading-gold text-glow-gold">Support and Resistance</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Support and resistance levels are price zones where gold has
                historically shown increased buying or selling pressure. In an
                XAUUSD strategy, these levels serve as reference points for
                identifying potential entry areas, placing stop-losses, and
                setting take-profit targets. Rather than treating these levels
                as exact lines, experienced traders often view them as zones
                where the market may react, giving some flexibility in execution
                while still providing a clear structural framework.
              </p>
              <p>
                In a trend-following approach, a trader might wait for price to
                pull back to a support level in an uptrend and look for
                confirmation before entering long. In a range-bound approach,
                a trader might buy near established support and sell near
                established resistance. When a level breaks, it can flip from
                support to resistance or vice versa, which is why understanding
                the dynamics of these levels is valuable for adapting to
                changing market conditions.
              </p>
              <p>
                For a comprehensive guide on identifying and drawing these levels
                on the XAUUSD chart, visit the{" "}
                <Link
                  href="/xauusd-support-resistance/"
                  className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium"
                >
                  XAUUSD support and resistance
                </Link>{" "}
                page.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SECTION 5: HOW TO USE XAUUSD PRICE ACTION FOR CONFIRMATION */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">How to Use XAUUSD Price Action </span>
                <span className="text-trading-gold text-glow-gold">for Confirmation</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Price action refers to the movement of price on a chart and the
                patterns that form as a result. In an XAUUSD strategy, price
                action serves as the confirmation signal that tells a trader
                whether the market is responding to a key level or structural
                area as expected. Without confirmation, a trader is essentially
                guessing that a level will hold or break, which increases the
                risk of entering on a false signal.
              </p>
              <p>
                Common price-action signals that XAUUSD traders watch for include
                rejection patterns such as long wicks or pin bars at key levels,
                which suggest that the market is pushing back from the area.
                Continuation patterns like strong directional candles that close
                near their highs or lows can confirm that a trend is intact.
                Breakout patterns occur when price moves decisively through a
                level, and retest patterns occur when price returns to a broken
                level before continuing in the breakout direction. Market
                structure changes, such as a break in the sequence of higher
                highs or lower lows, can signal that the current trend may be
                weakening or reversing.
              </p>
              <p>
                Using price action as a confirmation step before entering a trade
                is a way of letting the market prove the setup to you, rather
                than anticipating what it will do. This approach requires
                patience and discipline, but it helps filter out weaker setups
                and improves the quality of trade selection over time. For a
                deeper understanding of reading XAUUSD charts, the{" "}
                <Link
                  href="/how-to-read-xauusd-price-action/"
                  className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium"
                >
                  how to read XAUUSD price action
                </Link>{" "}
                guide covers these concepts in detail.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SECTION 6: CHOOSING TIMEFRAMES FOR XAUUSD */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Choosing Timeframes </span>
                <span className="text-trading-gold text-glow-gold">for XAUUSD</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Timeframe selection is a practical decision that affects how a
                trader interacts with the XAUUSD market. There is no single
                best timeframe for trading gold. The right choice depends on the
                trader's schedule, their strategy's requirements, and their
                personal tolerance for screen time and rapid decision-making.
                Understanding how different timeframes serve different purposes
                within a strategy is more useful than searching for an ideal
                timeframe.
              </p>
              <p>
                Higher timeframes such as the daily and 4-hour charts are
                commonly used to establish the broader market context. They show
                the major trend, the most significant support and resistance
                levels, and the overall structure of the market. Because each
                candle on a daily chart represents a full day of trading, these
                charts filter out short-term noise and reveal the bigger picture.
                Intermediate timeframes like the 1-hour and 15-minute charts are
                useful for observing market structure in more detail and locating
                potential entry areas. Lower timeframes such as the 5-minute
                chart may be used for entry refinement, but they tend to contain
                more noise and require faster execution.
              </p>
              <p>
                A common approach in XAUUSD strategies is to use multiple
                timeframes in combination. For example, a trader might use the
                daily chart to determine the directional bias, the 1-hour chart
                to identify the market structure and mark key levels, and the
                15-minute chart to look for price-action confirmation at those
                levels. This layered approach aligns trades with the larger
                trend while using lower timeframes for precision, though it
                requires more screen time and careful attention.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SECTION 7: A SIMPLE XAUUSD STRATEGY FRAMEWORK */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">A Simple XAUUSD </span>
                <span className="text-trading-gold text-glow-gold">Strategy Framework</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                An educational step-by-step framework for approaching XAUUSD
                trades. This is not a guaranteed-profit system. It is a
                structured process designed to help traders make more informed
                and consistent decisions.
              </p>
            </div>

            <div className="space-y-5">
              {frameworkSteps.map((item, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <div className="glass-strong rounded-2xl p-5 md:p-6 gradient-border flex gap-5 items-start">
                    <div className="w-10 h-10 rounded-xl bg-trading-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-trading-gold font-extrabold text-sm">
                        {item.step}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="mt-10 glass-strong rounded-2xl p-6 md:p-8 text-center border border-trading-gold/10">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                This framework is educational in nature and does not guarantee
                profits. Every step involves judgment, and the same setup can
                produce different results under different market conditions.
                Traders should practice on a demo account before applying any
                framework with real capital.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SECTION 8: XAUUSD STRATEGY EXAMPLES (HYPOTHETICAL) */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">XAUUSD Strategy </span>
                <span className="text-trading-gold text-glow-gold">Examples</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                The following scenarios are entirely hypothetical and are
                presented for educational purposes only. They do not represent
                real trades, and no performance claims are implied.
              </p>
            </div>

            <div className="space-y-8">
              {/* Example 1 */}
              <FadeIn>
                <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-trading-green" />
                    Trend Continuation After a Pullback
                  </h3>
                  <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      In this hypothetical scenario, the daily chart shows XAUUSD
                      making higher highs and higher lows, indicating an uptrend.
                      On the 1-hour chart, price pulls back to a previous swing
                      high that has turned into support. The trader waits for a
                      bullish confirmation candle at this level, such as a pin bar
                      with a long lower wick or a strong bullish engulfing
                      candle. Once confirmed, the trader enters long with a
                      stop-loss placed below the support zone and a take-profit
                      target at the most recent swing high. The setup aligns the
                      entry with the higher-timeframe trend while using the
                      pullback for a better entry price.
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Example 2 */}
              <FadeIn>
                <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-3">
                    <Activity className="w-5 h-5 text-trading-gold" />
                    Breakout and Retest
                  </h3>
                  <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      In this hypothetical scenario, XAUUSD has been consolidating
                      below a significant resistance level for several sessions.
                      Price eventually breaks above the resistance with a strong
                      directional candle. Rather than entering immediately on the
                      breakout, the trader waits for price to retrace back to the
                      broken level, which now acts as support. When price
                      approaches this former resistance and shows a bullish
                      reaction, the trader enters long. The stop-loss is placed
                      below the retest area and the take-profit is set at the
                      next structural resistance level. This approach waits for
                      the breakout to be confirmed by a successful retest before
                      committing capital.
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Example 3 */}
              <FadeIn>
                <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-trading-red" />
                    Rejection From a Key Level
                  </h3>
                  <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      In this hypothetical scenario, XAUUSD is in a broader
                      downtrend on the daily chart and approaches a well-established
                      resistance level on the 1-hour chart. The trader observes a
                      bearish rejection pattern at this level, such as a shooting
                      star candle with a long upper wick or a bearish engulfing
                      pattern. This rejection signals that sellers are active at
                      the level. The trader enters short with a stop-loss placed
                      above the resistance zone and a take-profit at the next
                      support level or measured move target. This approach uses
                      the existing trend as directional context and the key level
                      as the trigger point.
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Example 4 */}
              <FadeIn>
                <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-3">
                    <Layers className="w-5 h-5 text-trading-gold" />
                    Range-Bound Conditions
                  </h3>
                  <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      In this hypothetical scenario, XAUUSD is moving sideways
                      between a defined support level below and a resistance level
                      above, with no clear trend on the daily chart. The trader
                      waits for price to reach one of these boundaries and looks
                      for a reaction candle confirming a reversal. If price
                      reaches support and shows a bullish rejection, the trader
                      enters long with the stop-loss below the support zone and
                      the take-profit near the resistance level. If price reaches
                      resistance and shows a bearish rejection, the trader enters
                      short targeting support. In range conditions, the strategy
                      adapts to the absence of a directional trend by trading the
                      boundaries.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <p className="text-center text-xs text-muted-foreground/60 mt-8 max-w-lg mx-auto">
              These examples are hypothetical and for educational purposes only.
              They do not represent real trades, and similar setups in the future
              may produce different results.
            </p>
          </div>
        </FadeSection>

        {/* SECTION 9: RISK MANAGEMENT WHEN TRADING XAUUSD */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full glass-strong mb-6">
                <AlertTriangle className="w-8 h-8 text-trading-red" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Risk Management When </span>
                <span className="text-trading-red">Trading XAUUSD</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Risk management is the most important component of any XAUUSD
                trading strategy. Without it, even a good analytical approach can
                lead to significant losses.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {riskItems.map((item, i) => (
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

            <div className="mt-10 glass-strong rounded-2xl p-6 md:p-8 text-center border border-trading-gold/20">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Position sizing is a critical part of risk management. To understand how to calculate XAUUSD lot size, including contract specifications, tick value, and the relationship between stop distance and position size, see our guide on{" "}
                <Link href="/xauusd-lot-size/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">
                  XAUUSD lot size
                </Link>.
              </p>
            </div>

            <div className="mt-6 glass-strong rounded-2xl p-6 md:p-8 text-center border border-trading-gold/20">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Understanding how to measure gold price movement is essential for risk calculations. To learn about pip, point, and tick terminology in XAUUSD, see our guide on{" "}
                <Link href="/xauusd-pip-value/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">
                  XAUUSD pip value
                </Link>.
              </p>
            </div>

            <div className="mt-6 glass-strong rounded-2xl p-6 md:p-8 text-center border border-trading-red/10">
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

        {/* SECTION 10: COMMON XAUUSD TRADING MISTAKES */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Common XAUUSD </span>
                <span className="text-trading-red">Trading Mistakes</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Understanding these common pitfalls can help traders develop
                more disciplined habits and avoid repeated errors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {mistakes.map((item, i) => (
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
          </div>
        </FadeSection>

        {/* SECTION 11: WHEN NOT TO TRADE XAUUSD */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">When NOT to </span>
                <span className="text-trading-gold text-glow-gold">Trade XAUUSD</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Knowing when to stay out of the market is an underrated part of
                any XAUUSD trading strategy. Standing aside is a valid and often
                the correct decision.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {whenNotToTrade.map((item, i) => (
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
          </div>
        </FadeSection>

        {/* SECTION 12: CONTINUE LEARNING */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Continue </span>
                <span className="text-trading-gold text-glow-gold">Learning</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Explore the rest of the ForexWizard XAUUSD education cluster to
                build a well-rounded understanding of gold trading.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {continueLearningCards.map((item, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <Link
                    href={item.href}
                    className="block h-full no-underline"
                  >
                    <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                        {item.icon}
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                      <span className="text-xs text-trading-gold font-medium mt-auto flex items-center gap-1">
                        Read more <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* TELEGRAM CTA */}
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
                <span className="text-foreground">Trading Community</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                Follow XAUUSD market analysis, trading discussions and
                educational content through the ForexWizard Telegram community.
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
