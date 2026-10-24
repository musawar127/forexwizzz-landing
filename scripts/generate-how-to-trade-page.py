#!/usr/bin/env python3
"""Generate the /how-to-trade-xauusd/page.tsx file."""

output_path = "/home/z/my-project/src/app/how-to-trade-xauusd/page.tsx"

content = r'''import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  BarChart3,
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
  Eye,
  ShieldCheck,
  Clock,
  Gauge,
  DollarSign,
  Calculator,
  Calendar,
  Ban,
  ListChecks,
  XCircle,
  Lightbulb,
  Scale,
  AlertOctagon,
  Pause,
} from "lucide-react";
import {
  FadeSection,
  FadeIn,
  HeroAnimation,
  StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";

export const metadata: Metadata = {
  title: "How to Trade XAUUSD | Beginner’s Guide to Gold Trading",
  description:
    "Learn how to trade XAUUSD with a beginner-friendly guide covering market analysis, trade planning, position sizing, risk management and gold market factors.",
  alternates: {
    canonical: "https://forexwizard.online/how-to-trade-xauusd/",
  },
  openGraph: {
    title: "How to Trade XAUUSD | Beginner’s Guide to Gold Trading",
    description:
      "Learn how to trade XAUUSD with a beginner-friendly guide covering market analysis, trade planning, position sizing, risk management and gold market factors.",
    type: "article",
    url: "https://forexwizard.online/how-to-trade-xauusd/",
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
    title: "How to Trade XAUUSD | Beginner’s Guide to Gold Trading",
    description:
      "Learn how to trade XAUUSD with a beginner-friendly guide covering market analysis, trade planning, position sizing, risk management and gold market factors.",
    images: ["/og-image.jpg"],
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
/*  DATA                                                              */
/* ------------------------------------------------------------------ */

const goldFactors = [
  {
    title: "Liquidity",
    icon: <Globe className="w-6 h-6 text-trading-gold" />,
    desc: "XAUUSD is one of the most heavily traded instruments in the world. High liquidity means that large orders can generally be filled without extreme slippage, and traders can enter and exit positions with relative ease during active market hours. This makes gold accessible to a wide range of participants, from individual retail traders to large institutions.",
  },
  {
    title: "Volatility",
    icon: <Activity className="w-6 h-6 text-trading-gold" />,
    desc: "Gold can experience significant price movements over short periods, particularly around major economic releases or during periods of market stress. This volatility creates potential trading opportunities, but it also means that losses can accumulate quickly. Understanding and respecting volatility is essential before committing capital to XAUUSD trades.",
  },
  {
    title: "Macroeconomic Sensitivity",
    icon: <TrendingUp className="w-6 h-6 text-trading-gold" />,
    desc: "Gold’s price is influenced by a wide range of macroeconomic factors including interest-rate policy, inflation expectations, currency movements, and geopolitical developments. For traders who follow economic news, gold offers a market where fundamental analysis can provide meaningful context alongside technical observation of price action.",
  },
  {
    title: "US Dollar Relationship",
    icon: <DollarSign className="w-6 h-6 text-trading-gold" />,
    desc: "Because XAUUSD is priced in US dollars, the strength or weakness of the dollar often has an inverse relationship with gold. When the dollar weakens, gold priced in dollars tends to rise, and vice versa. This relationship is not perfect or constant, but it is an important dynamic that traders should be aware of when analyzing the gold market.",
  },
  {
    title: "Safe-Haven Demand",
    icon: <ShieldCheck className="w-6 h-6 text-trading-gold" />,
    desc: "During periods of uncertainty, such as financial market turbulence, geopolitical tension, or economic downturns, gold is often perceived as a store of value. This safe-haven demand can drive prices higher even when other markets are declining. However, safe-haven flows are not guaranteed and can reverse without warning.",
  },
  {
    title: "Interest-Rate Expectations",
    icon: <Gauge className="w-6 h-6 text-trading-gold" />,
    desc: "Gold does not pay interest or dividends, so it tends to be more attractive when real interest rates are low or negative. When central banks signal rate cuts or when inflation outpaces nominal rates, gold may benefit. Conversely, rising real rates can create headwinds. Understanding the interest-rate environment helps provide context for gold’s price behavior.",
  },
];

const requirements = [
  {
    title: "A Trading Account",
    icon: <ListChecks className="w-6 h-6 text-trading-green" />,
    desc: "You will need an account with a broker that offers XAUUSD trading. Different brokers offer different contract specifications, platforms, and fee structures. It is important to understand what your specific broker offers before placing any trades, including the lot sizes available, the typical spread, and any commission charges.",
  },
  {
    title: "A Suitable Trading Platform",
    icon: <BarChart3 className="w-6 h-6 text-trading-green" />,
    desc: "Most brokers provide access to platforms like MetaTrader 4, MetaTrader 5, or their own proprietary platform. The platform is where you will view charts, place orders, and manage open positions. Familiarizing yourself with the platform’s order types, charting tools, and execution mechanics is a practical first step before trading with real money.",
  },
  {
    title: "Understanding Contract Specifications",
    icon: <Scale className="w-6 h-6 text-trading-green" />,
    desc: "Every XAUUSD contract has specific details: the lot size, the pip value, the typical spread, and the margin requirements. These vary between brokers. A standard lot of XAUUSD is typically 100 troy ounces, but many brokers also offer mini and micro lots. Knowing your broker’s specifications helps you understand exactly what each trade involves.",
  },
  {
    title: "Understanding Spread and Fees",
    icon: <DollarSign className="w-6 h-6 text-trading-green" />,
    desc: "The spread is the difference between the bid and ask price, and it represents a cost of trading. On XAUUSD, spreads can widen during volatile periods or around major news events. Some brokers also charge commissions. Being aware of these costs helps you make more informed decisions about when and how to trade.",
  },
  {
    title: "Understanding Leverage and Margin",
    icon: <AlertTriangle className="w-6 h-6 text-trading-green" />,
    desc: "Leverage allows you to control a larger position with a smaller amount of capital. While leverage can amplify profits, it equally amplifies losses. Margin is the amount of money required to maintain an open position. It is critical to understand how leverage and margin work at your specific broker before using them, as they can lead to rapid account losses if not managed carefully.",
  },
  {
    title: "A Defined Risk Limit",
    icon: <ShieldCheck className="w-6 h-6 text-trading-green" />,
    desc: "Before placing any trade, you should have a clear idea of the maximum amount you are willing to lose on that trade and across your account as a whole. This limit should be an amount that, if lost, would not affect your ability to meet financial obligations. Trading without a predefined risk limit is one of the most common and costly mistakes beginners make.",
  },
  {
    title: "A Basic Trading Plan",
    icon: <BookOpen className="w-6 h-6 text-trading-green" />,
    desc: "A trading plan does not need to be complex. At minimum, it should define what you look for before entering a trade, how you determine entry and exit points, how you manage risk on each trade, and what conditions would cause you to stop trading. Having a plan creates structure and reduces impulsive decision-making.",
  },
];

const analysisSteps = [
  {
    step: 1,
    title: "Start with Broader Market Context",
    desc: "Before zooming into the XAUUSD chart, it helps to have a sense of the broader market environment. Are global risk assets trending higher or lower? Is the US dollar strengthening or weakening? Are there upcoming economic events that could increase volatility? This context frames how you interpret what you see on the gold chart and helps you avoid getting caught off guard by sudden moves.",
  },
  {
    step: 2,
    title: "Determine Whether Price Is Trending or Ranging",
    desc: "Identifying the current market condition is one of the first steps in any analysis. In a trending market, price makes consistent higher highs and higher lows (uptrend) or lower highs and lower lows (downtrend). In a ranging market, price moves between relatively defined boundaries without making significant new extremes. The approach to trading each condition differs, so this distinction matters.",
  },
  {
    step: 3,
    title: "Identify Important Levels",
    desc: "Mark the key support and resistance levels on your chart. These are the price areas where buying or selling pressure has previously been strong enough to halt or reverse a move. Levels that have been tested multiple times or that align with significant highs or lows tend to carry more weight. Understanding these levels provides a map of where price may react in the future.",
  },
  {
    step: 4,
    title: "Examine Price Action",
    desc: "Look at how price is behaving around the key levels you have identified. Are candles showing rejection at a level? Is momentum increasing or decreasing? Is price consolidating or breaking out? Price action tells you how buyers and sellers are interacting at any given moment and can provide insight into whether a level is likely to hold or break.",
  },
  {
    step: 5,
    title: "Consider Relevant Economic Events",
    desc: "Check the economic calendar for upcoming releases that could affect gold, such as US interest-rate decisions, inflation data, or employment reports. These events can cause sharp moves in XAUUSD. You do not need to predict the outcome of these events, but being aware of when they occur helps you avoid being caught in volatile conditions unexpectedly.",
  },
  {
    step: 6,
    title: "Wait for a Defined Setup",
    desc: "Rather than entering a trade based on a general feeling about direction, wait for a specific, pre-defined setup to form. A setup might involve price reaching a key level and showing a particular candlestick pattern, or a trend structure confirming a continuation. Having a defined setup reduces the temptation to trade impulsively and provides a clear trigger for entry.",
  },
];

const chartConcepts = [
  {
    title: "Candles",
    icon: <BarChart3 className="w-6 h-6 text-trading-gold" />,
    desc: "Each candle on a chart represents a specific time period and shows four pieces of information: the open, high, low, and close. The body of the candle shows the range between the open and close, while the wicks (or shadows) show the highest and lowest prices reached during that period. Green or white candles typically indicate the close was higher than the open, while red or black candles indicate the close was lower. Learning to read candles is the foundation of chart analysis.",
  },
  {
    title: "Highs and Lows",
    icon: <TrendingUp className="w-6 h-6 text-trading-gold" />,
    desc: "Swing highs and swing lows are the peaks and troughs that price makes as it moves. An uptrend is characterized by higher highs and higher lows, while a downtrend shows lower highs and lower lows. The sequence of these swings defines the market structure and helps traders understand whether buyers or sellers are in control at any given time.",
  },
  {
    title: "Trends and Market Structure",
    icon: <Activity className="w-6 h-6 text-trading-gold" />,
    desc: "A trend is a sustained directional move in price. Market structure refers to the pattern of swing highs and lows that defines whether price is trending up, trending down, or moving sideways. Understanding market structure helps traders align their trades with the dominant direction and avoid fighting against a strong trend.",
  },
  {
    title: "Momentum",
    icon: <Zap className="w-6 h-6 text-trading-gold" />,
    desc: "Momentum describes the speed and strength of a price move. Strong momentum candles have large bodies with small wicks, showing that one side dominated the period. Weakening momentum may appear as candles get smaller or wicks get longer, suggesting that the move is losing steam. Momentum can help traders gauge whether a trend is likely to continue or slow down.",
  },
  {
    title: "Rejection",
    icon: <Target className="w-6 h-6 text-trading-gold" />,
    desc: "Rejection occurs when price moves toward a level but is pushed back in the opposite direction. On a candlestick chart, this often appears as a long wick extending away from the level. Rejection at support suggests buyers are defending that level, while rejection at resistance suggests sellers are active. Rejection is one of the most useful signals for identifying potential turning points.",
  },
  {
    title: "Breakouts and Retests",
    icon: <ArrowUpRight className="w-6 h-6 text-trading-gold" />,
    desc: "A breakout occurs when price moves through a previously established support or resistance level. A retest happens when price returns to the broken level after the breakout. If the level holds as new support (in an upward breakout) or new resistance (in a downward breakout), it can confirm the breakout’s validity. Breakouts and retests are important concepts for understanding how levels change roles.",
  },
];

const tradePlanSteps = [
  {
    title: "Trade Idea",
    icon: <Lightbulb className="w-6 h-6 text-trading-gold" />,
    desc: "A trade idea is the initial reasoning behind a potential trade. It might be based on a trend continuation at a key level, a reversal pattern at resistance, or a breakout from a range. The idea should be specific enough to describe what you expect to happen and why, rather than a vague feeling that price will go up or down.",
  },
  {
    title: "Entry Condition",
    icon: <Crosshair className="w-6 h-6 text-trading-gold" />,
    desc: "Define the specific condition that would trigger your entry. This could be a candlestick pattern completing at a key level, price breaking and closing above a resistance zone, or a pullback to a moving average. Having a clear entry condition prevents you from entering prematurely or chasing price after it has already moved.",
  },
  {
    title: "Invalidation Level",
    icon: <XCircle className="w-6 h-6 text-trading-gold" />,
    desc: "An invalidation level is the point at which your trade idea is no longer valid. If price reaches this level, it means the expected scenario has not played out and the trade should not be taken (or should be closed if already open). Defining invalidation before entering helps you exit objectively rather than emotionally.",
  },
  {
    title: "Stop-Loss",
    icon: <ShieldCheck className="w-6 h-6 text-trading-gold" />,
    desc: "A stop-loss is an order placed to automatically close a trade if price moves against you by a specified amount. It should be placed at or beyond your invalidation level and should account for normal market noise. On gold, where volatility can be significant, stop-losses that are too tight may get triggered by routine fluctuations before the trade has a chance to develop.",
  },
  {
    title: "Take-Profit Target",
    icon: <Target className="w-6 h-6 text-trading-gold" />,
    desc: "A take-profit level is where you plan to exit the trade if it moves in your favor. This is typically based on the next significant support or resistance level, a fixed risk/reward ratio, or a structure-based target. Having a take-profit plan helps you lock in gains rather than watching a profitable trade reverse into a loss.",
  },
  {
    title: "Position Size",
    icon: <Calculator className="w-6 h-6 text-trading-gold" />,
    desc: "Position size determines how much of your capital is at risk on a given trade. It should be calculated based on your stop-loss distance and the amount you are willing to risk, not chosen arbitrarily. Proper position sizing ensures that no single trade can cause disproportionate damage to your account.",
  },
  {
    title: "Risk/Reward Considerations",
    icon: <Scale className="w-6 h-6 text-trading-gold" />,
    desc: "The risk/reward ratio compares the potential loss on a trade to the potential gain. For example, risking $50 to potentially make $100 gives a 1:2 risk/reward ratio. While there is no universally correct ratio, understanding the relationship between your stop-loss distance and your take-profit target helps you evaluate whether a trade is worth taking based on your own criteria.",
  },
];

const riskPoints = [
  {
    title: "Avoid Oversized Positions",
    icon: <AlertTriangle className="w-6 h-6 text-trading-red" />,
    desc: "Taking positions that are too large relative to your account size is one of the fastest ways to incur significant losses. Even a well-analyzed trade can move against you, and an oversized position amplifies that loss. Position size should always be calculated based on your predefined risk limit and the distance to your stop-loss, not on how confident you feel about the trade.",
  },
  {
    title: "Understand Leverage",
    icon: <AlertOctagon className="w-6 h-6 text-trading-red" />,
    desc: "Leverage allows you to control a large position with a relatively small deposit. While this can magnify profits, it equally magnifies losses. A highly leveraged position can be wiped out by a relatively small adverse price movement. Understanding the actual leverage you are using and its implications for your account is essential before trading XAUUSD.",
  },
  {
    title: "Define Maximum Risk",
    icon: <ShieldCheck className="w-6 h-6 text-trading-red" />,
    desc: "Before each trade, decide the maximum amount you are willing to lose. This should be an amount that would not cause financial hardship if lost. Many experienced traders also set a daily or weekly loss limit, beyond which they stop trading to prevent further damage during losing streaks.",
  },
  {
    title: "Use Appropriate Stop-Losses",
    icon: <Target className="w-6 h-6 text-trading-red" />,
    desc: "A stop-loss should be placed at a level that invalidates your trade idea, not at an arbitrary pip distance. On XAUUSD, stops that are too tight can be triggered by normal volatility, while stops that are too wide expose you to larger losses than necessary. Finding the right balance requires understanding the typical price behavior around your entry level.",
  },
  {
    title: "Avoid Revenge Trading",
    icon: <XCircle className="w-6 h-6 text-trading-red" />,
    desc: "Revenge trading is the impulse to immediately re-enter the market after a loss in an attempt to recover the lost money. This emotional response often leads to poor decision-making, larger position sizes, and additional losses. After a losing trade, it is usually better to step away, review what happened objectively, and wait for the next valid setup.",
  },
  {
    title: "Avoid Emotional Decisions",
    icon: <Eye className="w-6 h-6 text-trading-red" />,
    desc: "Fear and greed are the two most common emotions that influence trading decisions. Fear can cause traders to exit winning trades too early or avoid valid setups. Greed can cause traders to hold losing positions too long, increase position sizes recklessly, or overtrade. Developing a structured plan and following it consistently helps reduce the influence of emotions.",
  },
  {
    title: "Never Risk Money You Cannot Afford to Lose",
    icon: <AlertTriangle className="w-6 h-6 text-trading-red" />,
    desc: "This principle applies to all forms of trading and investing. The money used to trade XAUUSD should be discretionary capital that, if lost entirely, would not affect your ability to pay for essential expenses. Trading with money you cannot afford to lose increases emotional pressure and can lead to poor decisions.",
  },
  {
    title: "Understand That Losses Are Possible",
    icon: <TrendingDown className="w-6 h-6 text-trading-red" />,
    desc: "No trade is guaranteed to profit. Even the most well-analyzed setup can be stopped out by an unexpected event or a random price fluctuation. Accepting that losses are a normal and unavoidable part of trading helps you manage them constructively rather than being surprised or demoralized when they occur.",
  },
];

const economicEvents = [
  {
    title: "US Interest-Rate Decisions",
    icon: <Gauge className="w-6 h-6 text-trading-gold" />,
    desc: "The US Federal Reserve’s interest-rate decisions are among the most closely watched events for gold traders. When rates rise, the opportunity cost of holding non-yielding gold increases, which can weigh on prices. When rates are cut or held steady with a dovish tone, gold may benefit. The market’s reaction depends not just on the decision itself but on how it compares to expectations.",
  },
  {
    title: "Inflation Data",
    icon: <TrendingUp className="w-6 h-6 text-trading-gold" />,
    desc: "Inflation reports, particularly the US Consumer Price Index (CPI) and Personal Consumption Expenditures (PCE) data, can influence gold significantly. Gold is sometimes viewed as a hedge against inflation, so higher-than-expected inflation can support gold prices. However, the relationship is not always straightforward, as inflation data also affects interest-rate expectations.",
  },
  {
    title: "Employment Data",
    icon: <BarChart3 className="w-6 h-6 text-trading-gold" />,
    desc: "US employment reports, including Non-Farm Payrolls (NFP) and the unemployment rate, provide insight into the health of the labor market. Strong employment data can strengthen the dollar and put downward pressure on gold, while weak data can have the opposite effect. Employment reports frequently cause sharp moves in XAUUSD.",
  },
  {
    title: "Central Bank Communication",
    icon: <Globe className="w-6 h-6 text-trading-gold" />,
    desc: "Speeches, press conferences, and meeting minutes from central banks, particularly the Federal Reserve, provide insight into future policy direction. Traders parse these communications for clues about whether rates are likely to rise, fall, or hold steady. Even subtle shifts in language can move gold prices, as they influence market expectations about the interest-rate environment.",
  },
  {
    title: "Geopolitical Developments",
    icon: <AlertTriangle className="w-6 h-6 text-trading-gold" />,
    desc: "Geopolitical events such as conflicts, trade disputes, elections, and international tensions can increase demand for gold as a perceived safe haven. These events are often unpredictable and can cause sudden price spikes. Traders should be aware that geopolitical developments can override technical patterns and create volatility that may not be manageable for all account sizes.",
  },
  {
    title: "US Dollar Movements",
    icon: <DollarSign className="w-6 h-6 text-trading-gold" />,
    desc: "Since XAUUSD is priced in US dollars, the strength of the dollar directly affects gold’s price. A stronger dollar generally makes gold more expensive for buyers using other currencies, which can reduce demand and push prices lower. A weaker dollar has the opposite effect. Monitoring the dollar index (DXY) can provide useful context for gold price movements.",
  },
];

const timeframeConcepts = [
  {
    title: "Higher Timeframe → Broader Context",
    icon: <Clock className="w-6 h-6 text-trading-gold" />,
    desc: "The higher timeframe, such as the daily or weekly chart, shows the dominant trend and the most significant support and resistance levels. Starting your analysis on a higher timeframe gives you a framework for understanding where price is within the larger picture. Many traders find that decisions aligned with the higher-timeframe direction tend to have a higher probability of success.",
  },
  {
    title: "Intermediate Timeframe → Structure",
    icon: <Layers className="w-6 h-6 text-trading-gold" />,
    desc: "An intermediate timeframe, such as the 4-hour chart, can help you see the market structure more clearly than the daily chart while filtering out much of the noise found on lower timeframes. This is often where traders identify the current swing structure, mark levels, and look for areas where price may react. It serves as a bridge between the broad view and the detailed entry.",
  },
  {
    title: "Lower Timeframe → Entry Refinement",
    icon: <Crosshair className="w-6 h-6 text-trading-gold" />,
    desc: "Lower timeframes, such as the 1-hour or 15-minute chart, can be used to refine entry timing once the higher timeframes have established the context and the area of interest. A trader might wait for a specific candlestick pattern or a pullback to a level on the lower timeframe before entering. However, lower timeframes also contain more noise, and relying on them exclusively without higher-timeframe context can lead to whipsaws.",
  },
];

const workflowSteps = [
  { step: 1, title: "Check broader market context", desc: "Before opening your XAUUSD chart, take a few minutes to review the broader environment. Is the dollar strengthening or weakening? Are stock markets risk-on or risk-off? Are there any major headlines that could affect sentiment? This step sets the stage for everything that follows." },
  { step: 2, title: "Review important economic events", desc: "Check the economic calendar for the day and week ahead. Note any high-impact releases relevant to gold, such as US CPI, NFP, or Fed decisions. You do not need to avoid trading around every event, but you should be aware of when volatility is likely to increase and plan accordingly." },
  { step: 3, title: "Examine the higher timeframe", desc: "Open the daily or 4-hour XAUUSD chart and identify the current market condition. Is price trending or ranging? Where are the most significant support and resistance levels? What does the market structure suggest about the balance between buyers and sellers?" },
  { step: 4, title: "Identify market structure", desc: "Mark the recent swing highs and lows and determine whether they form an uptrend, a downtrend, or a range. This structural identification tells you which direction has the current advantage and helps you avoid trading against the dominant structure." },
  { step: 5, title: "Mark important levels", desc: "Draw the key support and resistance zones on your chart. Focus on levels that have been tested multiple times, that align with significant swing points, or that are near the current price. These levels represent areas where price may react and where potential trading opportunities may develop." },
  { step: 6, title: "Wait for price to reach an area of interest", desc: "Rather than forcing a trade wherever price currently is, wait for it to reach one of the levels or zones you have identified. Patience is a critical skill in trading. Many of the best trades occur when price reaches a significant level and then shows a recognizable reaction." },
  { step: 7, title: "Look for confirmation", desc: "Once price reaches your area of interest, look for confirmation that the expected reaction is occurring. This might be a rejection candlestick pattern, a momentum shift, or a structural signal. Confirmation helps filter out false signals and reduces the chance of entering on noise." },
  { step: 8, title: "Define entry and invalidation", desc: "Specify exactly where you will enter the trade if confirmed, and exactly where the trade is invalidated. The invalidation level is where you would acknowledge that your analysis was incorrect and close or avoid the trade. Being precise about these levels before entering removes ambiguity during the heat of the trade." },
  { step: 9, title: "Calculate position size", desc: "Based on your stop-loss distance and the maximum amount you are willing to risk on the trade, calculate the appropriate position size. This step ensures that your risk is controlled and that a single trade cannot cause disproportionate damage to your account." },
  { step: 10, title: "Plan the exit", desc: "Determine where you will take profit if the trade moves in your favor. This might be at the next major support or resistance level, at a fixed risk/reward multiple, or based on a structural signal. Having an exit plan before entry prevents you from managing the trade emotionally." },
  { step: 11, title: "Execute only if the plan is valid", desc: "If all the conditions of your plan are met, execute the trade. If any condition is not met — whether the entry signal did not form, the risk/reward is insufficient, or market conditions have changed — do not enter. Discipline in following your plan is what separates structured trading from gambling." },
  { step: 12, title: "Record the trade afterward", desc: "After the trade is complete, whether it was profitable or not, record the details. What was the trade idea? Where did you enter and exit? What happened? Keeping a trading journal helps you identify patterns in your decision-making and learn from both successes and mistakes over time." },
];

const commonMistakes = [
  { title: "Trading Without a Plan", icon: <BookOpen className="w-6 h-6 text-trading-red" />, desc: "Entering trades based on intuition, tips, or impulse without a defined plan is one of the most common beginner errors. Without a plan, there is no framework for deciding when to enter, when to exit, or how much to risk. This leads to inconsistent and often poor results." },
  { title: "Using Excessive Leverage", icon: <AlertOctagon className="w-6 h-6 text-trading-red" />, desc: "High leverage can amplify both gains and losses. Beginners often underestimate how quickly losses can accumulate with leveraged positions. Using more leverage than you understand or can manage is a frequent cause of significant account drawdowns." },
  { title: "Oversized Positions", icon: <AlertTriangle className="w-6 h-6 text-trading-red" />, desc: "Taking positions that are too large relative to account size means that even a small adverse move can cause substantial damage. Position size should always be calculated based on a predefined risk amount and the stop-loss distance, not on confidence level or the desire to make large profits quickly." },
  { title: "Chasing Price", icon: <TrendingUp className="w-6 h-6 text-trading-red" />, desc: "Chasing occurs when a trader enters a trade after a large move has already happened, often at a poor price. This typically happens out of fear of missing out. By the time price has moved significantly, the risk/reward of entering is often unfavorable." },
  { title: "Entering Because of FOMO", icon: <Zap className="w-6 h-6 text-trading-red" />, desc: "Fear of missing out (FOMO) is a powerful psychological force that can cause traders to abandon their plan and enter trades that do not meet their criteria. FOMO-driven entries are almost always poorly timed and are a leading cause of preventable losses." },
  { title: "Moving Stop-Losses Emotionally", icon: <Eye className="w-6 h-6 text-trading-red" />, desc: "Widening a stop-loss because the trade is moving against you and you do not want to take the loss is a form of emotional trading. This practice removes the risk management that the stop-loss was designed to provide and can turn a small manageable loss into a much larger one." },
  { title: "Trading Every Small Movement", icon: <Activity className="w-6 h-6 text-trading-red" />, desc: "Overtrading, or attempting to catch every minor fluctuation, tends to generate more costs in spreads and commissions than it does in profits. It also increases the likelihood of emotional exhaustion and poor decision-making. Quality of trades matters more than quantity." },
  { title: "Ignoring Economic Events", icon: <Calendar className="w-6 h-6 text-trading-red" />, desc: "Entering trades without checking the economic calendar can lead to being caught in volatile conditions caused by major data releases. Even if your technical analysis is sound, an unexpected economic event can override it. Being aware of scheduled events is a basic part of responsible trade preparation." },
  { title: "Changing Strategy After a Few Losses", icon: <Gauge className="w-6 h-6 text-trading-red" />, desc: "Abandoning a strategy or approach after a small number of losing trades prevents you from evaluating it over a meaningful sample size. Losses are a normal part of trading, and even well-constructed approaches experience losing streaks. Consistent evaluation requires a larger body of trades to draw meaningful conclusions." },
  { title: "Expecting Guaranteed Profits", icon: <XCircle className="w-6 h-6 text-trading-red" />, desc: "No trading approach, no matter how well-researched, guarantees profits. The market is inherently uncertain and can behave in ways that no analysis could predict. Traders who expect guaranteed results are more likely to take excessive risks and become discouraged when losses inevitably occur." },
];

const stayOutReasons = [
  { title: "Unclear Market Structure", icon: <Layers className="w-6 h-6 text-trading-gold" />, desc: "When the chart is messy and the market structure is not clearly defined, it may be difficult to identify a valid trade setup. Sideways, choppy conditions with no discernible trend or clear levels can produce false signals in both directions. Waiting for the structure to clarify can help you avoid unnecessary losses." },
  { title: "No Valid Setup", icon: <Crosshair className="w-6 h-6 text-trading-gold" />, desc: "If price is not at a key level and no recognizable pattern or setup has formed, there is no reason to force a trade. The best traders often wait patiently for high-quality setups rather than trading constantly. Not having a clear reason to enter is itself a clear reason to stay out." },
  { title: "Poor Risk/Reward", icon: <Scale className="w-6 h-6 text-trading-gold" />, desc: "If the distance to your stop-loss is large relative to the potential profit target, the trade may not be worth taking. A poor risk/reward profile means you are risking a lot for the chance to gain a little. Passing on these trades preserves your capital for better opportunities." },
  { title: "Unusually Volatile Conditions", icon: <AlertTriangle className="w-6 h-6 text-trading-gold" />, desc: "Extreme volatility can cause prices to gap, spreads to widen dramatically, and stop-losses to be filled at significantly worse levels than expected. If the market is experiencing abnormal volatility, it may be prudent to wait until conditions stabilize before trading." },
  { title: "Major Event Risk You Do Not Understand", icon: <Globe className="w-6 h-6 text-trading-gold" />, desc: "If a major economic or geopolitical event is approaching and you are not confident about how the market may react, sitting out is a reasonable choice. Trading around events you do not understand is essentially gambling on the outcome, which is not a sustainable or responsible approach." },
  { title: "Emotional or Impulsive State", icon: <Eye className="w-6 h-6 text-trading-gold" />, desc: "If you are feeling frustrated, anxious, overly excited, or impulsive, your judgment may be compromised. Trading in an emotional state often leads to poor decisions, such as increasing position sizes, moving stop-losses, or entering trades that do not meet your criteria. Stepping away until you are calm and focused is the responsible choice." },
];

const distinctionPoints = [
  { title: "Trading XAUUSD", icon: <Target className="w-6 h-6 text-trading-gold" />, desc: "Trading XAUUSD means making your own decisions about when to enter, manage, and exit positions in the gold market. It involves conducting your own analysis, developing your own plan, and taking responsibility for the outcome of each trade. This is the most hands-on approach and requires the greatest level of personal knowledge and discipline." },
  { title: "XAUUSD Signals", icon: <Zap className="w-6 h-6 text-trading-green" />, desc: "XAUUSD signals are trade ideas or alerts shared by analysts or services. A signal typically includes an entry price, stop-loss, take-profit, and some context for the trade idea. Signals can be useful for learning how others approach the market, but they do not guarantee results and should not replace a trader’s own understanding of risk and market conditions." },
  { title: "XAUUSD Analysis", icon: <BarChart3 className="w-6 h-6 text-trading-gold" />, desc: "Analysis is the process of interpreting current market conditions. It involves studying price action, market structure, support and resistance levels, and economic factors to form a view of what the market might do next. Analysis is informational rather than prescriptive: it tells you what you are seeing, not necessarily what you should do about it." },
  { title: "XAUUSD Strategy", icon: <ListChecks className="w-6 h-6 text-trading-gold" />, desc: "A strategy is a predefined framework or set of rules that guides trading decisions. It defines what setups to look for, how to enter, where to place stop-losses and take-profits, and how to manage risk. A strategy provides structure and consistency, but it still requires the trader to apply judgment and adapt to changing market conditions." },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                               */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "What is XAUUSD?",
    a: "XAUUSD is the trading symbol for gold priced in US dollars. XAU is the ISO 4217 code for one troy ounce of gold, and USD is the US dollar. When you see an XAUUSD chart, you are looking at how many US dollars it costs to buy one troy ounce of gold at that moment. It is the most widely traded gold pair in the world and is available on most forex and CFD brokerage platforms.",
  },
  {
    q: "How do beginners start trading XAUUSD?",
    a: "Beginners should start by learning the basics: what XAUUSD is, how to read a chart, what drives gold prices, and how risk management works. Opening a demo account to practice without financial risk is a sensible first step. From there, developing a basic trading plan, understanding your broker’s contract specifications, and starting with small position sizes can help you gain experience gradually while limiting exposure.",
  },
  {
    q: "Is XAUUSD suitable for beginners?",
    a: "XAUUSD can be a useful market for beginners to learn about because its price drivers, such as interest rates, inflation, and dollar movements, are relatively identifiable and widely discussed. However, gold can also be highly volatile, and the leverage commonly available can amplify losses quickly. Beginners should approach XAUUSD with caution, use proper risk management, and consider practicing on a demo account before trading with real capital.",
  },
  {
    q: "What should I analyze before trading XAUUSD?",
    a: "Before trading XAUUSD, you should analyze the current market structure on a higher timeframe, identify key support and resistance levels, examine price action around those levels, and check the economic calendar for upcoming events that could affect gold. This combination of structural, technical, and fundamental awareness provides a more complete picture than relying on any single factor.",
  },
  {
    q: "What timeframe is best for trading XAUUSD?",
    a: "There is no single best timeframe for trading XAUUSD. Different traders use different timeframes depending on their style and availability. Many traders start with the daily or 4-hour chart to understand the broader trend and key levels, then use lower timeframes like the 1-hour or 15-minute chart to refine their entry. The best approach is to use multiple timeframes in combination rather than relying on just one.",
  },
  {
    q: "How should beginners manage risk when trading XAUUSD?",
    a: "Beginners should define the maximum amount they are willing to lose on each trade before entering, use stop-losses on every trade, avoid excessive leverage, keep position sizes small relative to their account, and never risk money they cannot afford to lose. It is also important to avoid emotional decisions such as revenge trading or moving stop-losses when a trade moves against you. Risk management is the foundation of sustainable trading.",
  },
  {
    q: "What is the difference between XAUUSD analysis and XAUUSD signals?",
    a: "XAUUSD analysis is the process of studying market conditions, price action, and economic factors to form a view of the gold market. It is informational and helps traders understand what is happening. XAUUSD signals are specific trade ideas that typically include entry, stop-loss, and take-profit levels. Signals are actionable suggestions, while analysis provides the context behind those suggestions. Both have different roles, and neither guarantees results.",
  },
  {
    q: "Is there a guaranteed way to profit from XAUUSD?",
    a: "No. There is no guaranteed way to profit from trading XAUUSD or any other financial market. Gold prices are influenced by countless factors, many of which are unpredictable, and every trade carries the risk of loss. Any person, service, or product that claims guaranteed profits should be treated with extreme caution. Responsible trading involves accepting risk, managing it carefully, and understanding that losses are a normal part of the process.",
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
/*  PAGE                                                              */
/* ------------------------------------------------------------------ */
export default function HowToTradeXauusdPage() {
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
            <Link href="/forex-signals/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">
              Forex Signals
            </Link>
            <Link href="/gold-signals/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">
              Gold Signals
            </Link>
            <Link href="/xauusd-analysis/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">
              XAUUSD Analysis
            </Link>
            <Link href="/about/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden lg:block">
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
                ForexWizard Beginner Guide
              </span>
            </FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">How to Trade </span>
              <span className="text-trading-gold text-glow-gold">XAUUSD</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              A beginner-friendly guide covering what XAUUSD is, what you need
              before trading, how to analyze gold, how to plan trades, manage
              risk, and develop a responsible approach to the gold market.
            </p>
            <FadeIn delay={0.5} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <TelegramCTA text="Join ForexWizard Telegram" variant="gold" />
              <Link
                href="/xauusd-analysis/"
                className="inline-flex items-center justify-center gap-2 font-bold text-base rounded-xl px-6 py-3.5 md:px-8 md:py-4 glass-strong text-foreground hover:text-trading-gold border border-white/10 hover:border-trading-gold/30 transition-all duration-300 no-underline select-none hover:scale-105 active:scale-95"
              >
                <BarChart3 className="w-5 h-5" />
                XAUUSD Analysis Hub
              </Link>
            </FadeIn>
          </HeroAnimation>
        </section>

        {/* 1. WHAT IS XAUUSD? */}
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
                XAUUSD is the trading symbol that represents the price of gold
                denominated in US dollars. The XAU component comes from the ISO
                4217 currency code for one troy ounce of gold, while USD
                represents the United States dollar. When you look at an XAUUSD
                chart, you are seeing how many US dollars it takes to purchase one
                troy ounce of gold at any given moment. This is the most widely
                traded gold pair globally and is available on virtually every
                forex and CFD brokerage platform.
              </p>
              <p>
                When traders buy XAUUSD, they are essentially taking a position
                that the price of gold will rise relative to the dollar. When
                they sell XAUUSD, they are positioning for gold to fall. No
                physical gold changes hands in most retail trading; instead,
                traders are speculating on price movements through contracts for
                difference (CFDs) or other derivative instruments offered by their
                broker.
              </p>
              <p>
                Gold has been traded for thousands of years and is recognized
                globally as a store of value. In modern financial markets, it
                serves multiple roles: it is traded as a commodity, used as a
                hedge against inflation, and sought as a safe-haven asset during
                periods of economic or geopolitical uncertainty. These overlapping
                roles contribute to gold’s unique price behavior and make it a
                market that responds to a wide range of fundamental drivers.
              </p>
              <p>
                For beginners, some basic terminology is helpful to understand. A{" "}
                <span className="text-foreground font-medium">pip</span> on
                XAUUSD typically refers to a 0.01 move in price (a 10-cent move
                on a standard lot). A{" "}
                <span className="text-foreground font-medium">lot</span>{" "}
                refers to a standardized trade size, with a standard lot being 100
                troy ounces. Many brokers also offer mini lots (10 ounces) and
                micro lots (1 ounce), making it possible to trade smaller
                positions. The{" "}
                <span className="text-foreground font-medium">spread</span> is
                the difference between the buying and selling price, and it
                represents one of the costs of trading.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* 2. WHY DO TRADERS TRADE XAUUSD? */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Why Do Traders Trade </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD?</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Gold is widely followed for several reasons, though none of these
                factors guarantee profits or predictable price movement.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goldFactors.map((item) => (
                <FadeIn key={item.title}>
                  <div className="glass rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      {item.icon}
                      <h3 className="text-lg font-bold text-foreground">
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

        {/* 3. WHAT YOU NEED BEFORE TRADING XAUUSD */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">What You Need Before Trading </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Before placing any trade, there are several practical and
                conceptual requirements that beginners should understand.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requirements.map((item) => (
                <FadeIn key={item.title}>
                  <div className="glass rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      {item.icon}
                      <h3 className="text-lg font-bold text-foreground">
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

        {/* 4. HOW TO ANALYZE XAUUSD BEFORE A TRADE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">How to Analyze XAUUSD </span>
                <span className="text-trading-gold text-glow-gold">Before a Trade</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                A logical analysis process helps traders form a structured view of
                current market conditions before committing to a trade. For a deeper
                look at ongoing market interpretation, see our{" "}
                <Link href="/xauusd-analysis/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">
                  XAUUSD analysis
                </Link>{" "}
                hub.
              </p>
            </div>
            <div className="space-y-8">
              {analysisSteps.map((item) => (
                <FadeIn key={item.step}>
                  <div className="glass rounded-2xl p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-trading-gold/10 flex items-center justify-center text-trading-gold font-extrabold text-lg">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* 5. HOW TO READ THE XAUUSD CHART */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">How to Read the </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD Chart</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Understanding the basic building blocks of a price chart is a
                foundational step. For a comprehensive guide to reading gold price
                action, see our detailed resource on{" "}
                <Link href="/how-to-read-xauusd-price-action/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">
                  how to read XAUUSD price action
                </Link>.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chartConcepts.map((item) => (
                <FadeIn key={item.title}>
                  <div className="glass rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      {item.icon}
                      <h3 className="text-lg font-bold text-foreground">
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

        {/* 6. HOW TO IDENTIFY XAUUSD SUPPORT AND RESISTANCE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">How to Identify XAUUSD </span>
                <span className="text-trading-gold text-glow-gold">Support and Resistance</span>
              </h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
              <p>
                Support and resistance are among the most widely used concepts in
                technical analysis. A <span className="text-foreground font-medium">support level</span>{" "}
                is a price area where buying interest has historically been strong
                enough to halt or reverse a downward move. A{" "}
                <span className="text-foreground font-medium">resistance level</span>{" "}
                is the opposite: a price area where selling pressure has
                historically been sufficient to stop or reverse an upward move.
              </p>
              <p>
                These levels are often found at previous swing highs and lows,
                round numbers, and areas where price has reacted multiple times.
                Rather than thinking of them as exact lines, it is generally more
                useful to think of them as <span className="text-foreground font-medium">zones</span>{" "}
                where price behavior may change. When price breaks through a
                support or resistance level, that level can switch roles: former
                resistance can become new support, and former support can become new
                resistance. This is known as a <span className="text-foreground font-medium">role reversal</span>.
              </p>
              <p>
                Identifying key levels is an important part of trade preparation, but
                levels alone do not tell you whether to buy or sell. They provide
                context that becomes more meaningful when combined with price action
                observation and an understanding of the broader market structure. For
                a thorough exploration of this topic, see our guide to{" "}
                <Link href="/xauusd-support-resistance/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">
                  XAUUSD support and resistance
                </Link>.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* 7. HOW TO PLAN AN XAUUSD TRADE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">How to Plan an </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD Trade</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                A trade plan should be defined before entering any position. The
                following components form the basis of a structured approach.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tradePlanSteps.map((item) => (
                <FadeIn key={item.title}>
                  <div className="glass rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      {item.icon}
                      <h3 className="text-lg font-bold text-foreground">
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
            <div className="mt-12 glass rounded-2xl p-6 md:p-8 border border-trading-gold/20">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="text-trading-gold font-semibold">Key Principle:</span>{" "}
                A trade plan should be fully defined before the position is opened.
                This means knowing your entry condition, stop-loss, take-profit,
                and position size in advance. Once the trade is open, the plan
                governs your decisions, not your emotions. For a structured
                step-by-step framework, see our{" "}
                <Link href="/xauusd-trading-strategy/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">
                  XAUUSD trading strategy
                </Link>{" "}
                guide.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* 8. UNDERSTANDING XAUUSD POSITION SIZE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Understanding XAUUSD </span>
                <span className="text-trading-gold text-glow-gold">Position Size</span>
              </h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Position size refers to the volume of the trade you are taking. It
                determines how much capital is exposed to the market and, combined
                with the distance to your stop-loss, how much money stands to be
                gained or lost if the trade reaches your exit levels. On XAUUSD,
                position size is typically measured in lots, where a standard lot
                represents 100 troy ounces of gold.
              </p>
              <p>
                The relationship between position size, account risk, and stop
                distance is fundamental. A smaller position size with the same
                stop-loss distance results in less money at risk. A larger position
                size with the same stop distance increases the dollar risk
                proportionally. This is why position size should be calculated
                deliberately based on how much you are willing to risk on the trade,
                not chosen arbitrarily or based on how much you want to make.
              </p>
              <p>
                Leverage affects how much margin is required to open a position
                but does not change the actual pip value or the real monetary risk.
                A common misconception is that higher leverage allows you to safely
                take larger positions. In reality, higher leverage allows you to
                control a larger position with less margin, but the potential loss
                remains the same relative to the position size. Leverage does not
                reduce risk; it changes the amount of capital required to hold the
                position.
              </p>
              <div className="glass rounded-2xl p-6 md:p-8 border border-trading-gold/20">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="text-trading-gold font-semibold">Hypothetical Example:</span>{" "}
                  Suppose a trader has a $1,000 account and decides to risk $10 on a
                  trade (1% of the account). If the stop-loss is placed 50 pips
                  from entry, the position size should be calculated so that a
                  50-pip move against the trade equals approximately $10 in loss.
                  The exact calculation depends on the broker’s contract
                  specifications and lot sizes. This is purely an educational
                  illustration and does not constitute a recommendation. Every
                  trader’s situation is different, and position sizing should
                  reflect individual risk tolerance and financial circumstances.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 9. RISK MANAGEMENT WHEN TRADING XAUUSD */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-trading-gold text-glow-gold">Risk Management</span>{" "}
                <span className="text-foreground">When Trading XAUUSD</span>
              </h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
              <p>
                Risk management is the most important aspect of trading. No
                analysis method, strategy, or market knowledge can protect a trader
                who does not manage risk properly. On XAUUSD, where volatility can
                be substantial, the importance of risk discipline is amplified.
                The following principles form the foundation of a responsible
                approach.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {riskPoints.map((item) => (
                <FadeIn key={item.title}>
                  <div className="glass rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      {item.icon}
                      <h3 className="text-lg font-bold text-foreground">
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
            <div className="mt-12 glass rounded-2xl p-6 md:p-8 border border-trading-red/30">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="text-trading-red font-semibold">Risk Disclaimer:</span>{" "}
                Forex and gold trading involve significant risk and may not be
                suitable for all investors. Past performance does not guarantee
                future results. The information on ForexWizard is for educational
                and informational purposes only and should not be considered
                personalized financial advice.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* 10. ECONOMIC EVENTS THAT CAN AFFECT GOLD */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Economic Events That Can Affect </span>
                <span className="text-trading-gold text-glow-gold">Gold</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Understanding which events can move gold prices helps traders
                avoid being caught off guard. This is about awareness, not
                prediction — no event guarantees a specific direction.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {economicEvents.map((item) => (
                <FadeIn key={item.title}>
                  <div className="glass rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      {item.icon}
                      <h3 className="text-lg font-bold text-foreground">
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

        {/* 11. CHOOSING A TIMEFRAME FOR XAUUSD */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Choosing a Timeframe for </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                There is no universally “best” timeframe. Different traders
                use different timeframes based on their style, availability, and
                objectives. The key is understanding what each timeframe offers.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {timeframeConcepts.map((item) => (
                <FadeIn key={item.title}>
                  <div className="glass rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      {item.icon}
                      <h3 className="text-lg font-bold text-foreground">
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

        {/* 12. A BEGINNER XAUUSD TRADING WORKFLOW */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">A Beginner XAUUSD </span>
                <span className="text-trading-gold text-glow-gold">Trading Workflow</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                The following is an educational workflow, not a guaranteed
                system. It represents a structured approach that traders can adapt
                to their own style and circumstances.
              </p>
            </div>
            <div className="space-y-4">
              {workflowSteps.map((item) => (
                <FadeIn key={item.step}>
                  <div className="glass rounded-2xl p-5 md:p-6">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-trading-gold/10 flex items-center justify-center text-trading-gold font-extrabold text-sm">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* 13. COMMON BEGINNER MISTAKES */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Common Beginner Mistakes When Trading </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commonMistakes.map((item) => (
                <FadeIn key={item.title}>
                  <div className="glass rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      {item.icon}
                      <h3 className="text-lg font-bold text-foreground">
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

        {/* 14. WHEN BEGINNERS SHOULD STAY OUT */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">When Beginners Should </span>
                <span className="text-trading-gold text-glow-gold">Stay Out of the Market</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Not trading is sometimes the correct decision. Recognizing when
                conditions are not suitable can be as valuable as identifying
                good setups.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stayOutReasons.map((item) => (
                <FadeIn key={item.title}>
                  <div className="glass rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      {item.icon}
                      <h3 className="text-lg font-bold text-foreground">
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

        {/* 15. DIFFERENCE BETWEEN TRADING, SIGNALS, ANALYSIS, STRATEGY */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Difference Between XAUUSD Trading and </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD Signals</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                These terms are sometimes used interchangeably, but they refer to
                different things. Understanding the distinction helps clarify what
                each resource on ForexWizard offers.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {distinctionPoints.map((item) => (
                <FadeIn key={item.title}>
                  <div className="glass rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      {item.icon}
                      <h3 className="text-lg font-bold text-foreground">
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
            <div className="mt-12 glass rounded-2xl p-6 md:p-8 border border-trading-gold/20">
              <p className="text-sm text-muted-foreground leading-relaxed">
                ForexWizard provides resources for each of these aspects. Explore{" "}
                <Link href="/gold-signals/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">
                  gold signals
                </Link>,{" "}
                <Link href="/xauusd-trading-strategy/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">
                  XAUUSD strategy
                </Link>, and{" "}
                <Link href="/xauusd-analysis/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">
                  XAUUSD analysis
                </Link>{" "}
                to dive deeper into each area. None of these resources guarantee
                results — they exist to support education and informed
                decision-making.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* 16. CONTINUE LEARNING */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Continue </span>
                <span className="text-trading-gold text-glow-gold">Learning</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Explore more of ForexWizard to deepen your gold trading
                knowledge and build a well-rounded understanding of XAUUSD.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <FadeIn delay={0}>
                <Link href="/xauusd-trading-strategy/" className="block h-full no-underline">
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-gold/10 to-transparent flex items-center justify-center">
                      <Target className="w-7 h-7 text-trading-gold" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">XAUUSD Trading Strategy</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">A step-by-step framework for building and executing a structured XAUUSD trading strategy.</p>
                    <span className="text-xs text-trading-gold font-medium mt-auto flex items-center gap-1">Read more <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </Link>
              </FadeIn>
              <FadeIn delay={0.07}>
                <Link href="/xauusd-analysis/" className="block h-full no-underline">
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-gold/10 to-transparent flex items-center justify-center">
                      <LineChart className="w-7 h-7 text-trading-gold" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">XAUUSD Analysis</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">The main hub for ongoing XAUUSD market analysis, key levels, and gold market structure updates.</p>
                    <span className="text-xs text-trading-gold font-medium mt-auto flex items-center gap-1">Read more <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </Link>
              </FadeIn>
              <FadeIn delay={0.14}>
                <Link href="/how-to-read-xauusd-price-action/" className="block h-full no-underline">
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-gold/10 to-transparent flex items-center justify-center">
                      <Activity className="w-7 h-7 text-trading-gold" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">How to Read XAUUSD Price Action</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">A dedicated guide to reading candlestick patterns, market structure, and price behavior on XAUUSD charts.</p>
                    <span className="text-xs text-trading-gold font-medium mt-auto flex items-center gap-1">Read more <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </Link>
              </FadeIn>
              <FadeIn delay={0.21}>
                <Link href="/xauusd-support-resistance/" className="block h-full no-underline">
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-gold/10 to-transparent flex items-center justify-center">
                      <Layers className="w-7 h-7 text-trading-gold" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">XAUUSD Support and Resistance</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">How to identify, draw, and trade from key support and resistance levels on the gold chart.</p>
                    <span className="text-xs text-trading-gold font-medium mt-auto flex items-center gap-1">Read more <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </Link>
              </FadeIn>
              <FadeIn delay={0.28}>
                <Link href="/gold-signals/" className="block h-full no-underline">
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-green/10 to-transparent flex items-center justify-center">
                      <BarChart3 className="w-7 h-7 text-trading-green" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">Gold Trading Signals</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Gold signals, XAUUSD trade ideas, and market updates from the ForexWizard community.</p>
                    <span className="text-xs text-trading-gold font-medium mt-auto flex items-center gap-1">Read more <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </Link>
              </FadeIn>
              <FadeIn delay={0.35}>
                <Link href="/forex-signals/" className="block h-full no-underline">
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-green/10 to-transparent flex items-center justify-center">
                      <TrendingUp className="w-7 h-7 text-trading-green" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">Forex Signals</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Broader forex trading signals covering major and minor currency pairs beyond gold and XAUUSD.</p>
                    <span className="text-xs text-trading-gold font-medium mt-auto flex items-center gap-1">Read more <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </Link>
              </FadeIn>
              <FadeIn delay={0.42}>
                <Link href="/about/" className="block h-full no-underline">
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-gold/10 to-trading-green/10 flex items-center justify-center">
                      <BookOpen className="w-7 h-7 text-trading-gold" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">About ForexWizard</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Learn about the ForexWizard community, our approach to market education, and what to expect.</p>
                    <span className="text-xs text-trading-gold font-medium mt-auto flex items-center gap-1">Read more <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </Link>
              </FadeIn>
            </div>
          </div>
        </FadeSection>

        {/* TELEGRAM CTA */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                <span className="text-foreground">Join the </span>
                <span className="text-trading-gold text-glow-gold">ForexWizard</span>
                <span className="text-foreground"> Community</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Follow XAUUSD market updates, educational analysis, and trading
                discussions with the ForexWizard Telegram community. Free to
                join.
              </p>
              <TelegramCTA text="Join ForexWizard on Telegram" variant="gold" />
            </FadeIn>
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
              <Link href="/" className="text-xs text-muted-foreground/40 hover:text-trading-green transition-colors no-underline">
                Home
              </Link>
              <Link href="/forex-signals/" className="text-xs text-muted-foreground/40 hover:text-trading-green transition-colors no-underline">
                Forex Signals
              </Link>
              <Link href="/gold-signals/" className="text-xs text-muted-foreground/40 hover:text-trading-green transition-colors no-underline">
                Gold Signals
              </Link>
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground/40 hover:text-trading-green transition-colors no-underline">
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
'''

with open(output_path, 'w') as f:
    f.write(content)

print(f"Written {len(content)} characters to {output_path}")
