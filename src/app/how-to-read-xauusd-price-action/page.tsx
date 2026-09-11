import type { Metadata } from "next";
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
  AlertOctagon,
  ShieldCheck,
  Clock,
  Gauge,
} from "lucide-react";
import {
  FadeSection,
  FadeIn,
  HeroAnimation,
  StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "How to Read XAUUSD Price Action | Forex Wizard",
  description:
    "Learn how to read XAUUSD price action using market structure, candlesticks, support and resistance, momentum, breakouts, and multiple-timeframe analysis.",
  authors: [{ name: "Forex Wizard", url: "https://forexwizard.online/about/" }],
  creator: "Forex Wizard",
  publisher: "Forex Wizard",
  alternates: {
    canonical: "https://forexwizard.online/how-to-read-xauusd-price-action/",
  },
  openGraph: {
    title: "How to Read XAUUSD Price Action | Forex Wizard",
    description:
      "A practical educational guide to reading gold/XAUUSD price action using market structure, candlestick analysis, support and resistance, and multiple timeframe analysis.",
    type: "article",
    publishedTime: "2026-08-20T09:00:00+05:00",
    modifiedTime: "2026-09-11T19:00:00+05:00",
    url: "https://forexwizard.online/how-to-read-xauusd-price-action/",
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
    title: "How to Read XAUUSD Price Action | Forex Wizard",
    description:
      "A practical educational guide to reading gold/XAUUSD price action using market structure, candlestick analysis, support and resistance, and multiple timeframe analysis.",
    images: ["/og-image.jpg"],
  },
};

const articleStructuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Read XAUUSD Price Action",
  description: "Learn how to read XAUUSD price action using market structure, candlesticks, support and resistance, momentum, breakouts, and multiple-timeframe analysis.",
  image: ["https://forexwizard.online/og-image.jpg"],
  datePublished: "2026-08-20T09:00:00+05:00",
  dateModified: "2026-09-11T19:00:00+05:00",
  mainEntityOfPage: "https://forexwizard.online/how-to-read-xauusd-price-action/",
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

const structurePoints = [
  {
    label: "Higher High (HH)",
    desc: "A swing high that rises above the previous swing high. When price pushes past a recent peak, it signals that buyers remain in control. A sequence of higher highs is a defining characteristic of an uptrend and suggests that demand is consistently overcoming supply at each successive resistance level.",
    color: "text-trading-green",
  },
  {
    label: "Higher Low (HL)",
    desc: "A swing low that stays above the previous swing low. In an uptrend, each pullback should find support above the prior low. Higher lows indicate that sellers are unable to push price down as far as before, which reinforces the bullish structure and the idea that the trend remains intact.",
    color: "text-trading-green",
  },
  {
    label: "Lower High (LH)",
    desc: "A swing high that falls short of the previous swing high. When price fails to reach the prior peak, it suggests that buyers are weakening and sellers are stepping in earlier. Lower highs are a key component of a bearish trend and can be an early sign that momentum is shifting toward the downside.",
    color: "text-trading-red",
  },
  {
    label: "Lower Low (LL)",
    desc: "A swing low that drops below the previous swing low. Each new low below the last confirms that sellers are in control. A sequence of lower lows alongside lower highs forms a complete bearish market structure, indicating sustained downward pressure and a higher probability of continued decline.",
    color: "text-trading-red",
  },
];

const candlestickConcepts = [
  {
    title: "Rejection Candles",
    icon: <Crosshair className="w-6 h-6 text-trading-gold" />,
    desc: "Also called pin bars or hammer/shooting star formations, these candles have a small body and a long wick that extends away from the current trend direction. A long lower wick at support suggests buyers rejected lower prices. A long upper wick at resistance suggests sellers rejected higher prices. The size of the wick relative to the body gives a sense of how strongly price was rejected. However, a rejection candle at a random location on the chart without a clear level behind it carries far less significance than one that forms at a known support or resistance zone.",
  },
  {
    title: "Engulfing Candles",
    icon: <Activity className="w-6 h-6 text-trading-green" />,
    desc: "An engulfing pattern forms when a candle's body completely covers the body of the previous candle. A bullish engulfing pattern occurs when a green candle fully engulfs the prior red candle, often appearing near support. A bearish engulfing pattern is the opposite, appearing near resistance. The significance of an engulfing candle increases when it forms at a key level, after a sustained move, or on higher timeframes where each candle represents more price information and trading activity.",
  },
  {
    title: "Inside Bars",
    icon: <Layers className="w-6 h-6 text-blue-400" />,
    desc: "An inside bar forms when an entire candle fits within the high-to-low range of the previous candle. It represents a period of consolidation or indecision after a directional move. Traders often watch for a breakout above or below the inside bar's parent candle as a potential signal that price is ready to continue. Inside bars are particularly useful on daily and weekly charts, where they can indicate a pause before the next leg of a larger move.",
  },
  {
    title: "Long Wicks",
    icon: <Target className="w-6 h-6 text-purple-400" />,
    desc: "Wicks, also called shadows, show the highest and lowest prices reached during the candle's timeframe. Long wicks can signal rejection at a level even when the candle itself is not a classic reversal pattern. A series of candles with long upper wicks near resistance may suggest repeated selling pressure. Similarly, long lower wicks near support may indicate repeated buying interest. Context matters: a long wick in the middle of a range means less than one at a clearly defined level.",
  },
  {
    title: "Strong Momentum Candles",
    icon: <Zap className="w-6 h-6 text-trading-gold" />,
    desc: "These are candles with large bodies and relatively small wicks, indicating that buyers or sellers dominated the entire session with little pushback. A strong bullish momentum candle that closes near its high after breaking through resistance suggests genuine buying conviction. A strong bearish candle closing near its low after breaking support suggests strong selling pressure. Momentum candles are useful for confirming breakouts, but they should not be chased without considering where price is relative to key levels.",
  },
  {
    title: "Consolidation",
    icon: <Gauge className="w-6 h-6 text-muted-foreground" />,
    desc: "Consolidation describes a period where price moves within a relatively narrow range without making significant new highs or lows. On a candlestick chart, this appears as a series of overlapping candles with small bodies. Consolidation often follows a strong directional move and can act as a resting phase before the next impulse. Traders generally avoid trading during tight consolidation and instead wait for a clear breakout or breakdown from the range with confirmation.",
  },
];

const trendMomentumPoints = [
  {
    title: "Trend Direction",
    icon: <TrendingUp className="w-6 h-6 text-trading-green" />,
    desc: "The first question in trend analysis is straightforward: is price generally moving up, down, or sideways? On XAUUSD, this can be assessed by looking at the sequence of swing highs and swing lows on your chosen timeframe. An uptrend is characterized by higher highs and higher lows. A downtrend shows lower highs and lower lows. When neither pattern is clear, the market is likely ranging. Trend direction on the higher timeframe should generally take priority over what appears on shorter timeframes, as the broader trend tends to exert more influence on price behavior.",
  },
  {
    title: "Momentum",
    icon: <Zap className="w-6 h-6 text-trading-gold" />,
    desc: "Momentum refers to the speed and strength of price movement. Strong momentum is visible when candles are large and directional with minimal overlap. Weakening momentum shows up as candles getting smaller, wicks getting longer, or price taking longer to make new highs or lows. On XAUUSD, momentum often increases around economic releases or Federal Reserve announcements. Recognizing whether momentum is building or fading helps traders assess whether a trend is likely to continue or slow down, even without using oscillator indicators.",
  },
  {
    title: "Pullbacks",
    icon: <ArrowDownRight className="w-6 h-6 text-blue-400" />,
    desc: "A pullback is a temporary move against the prevailing trend. In an uptrend, a pullback is a decline before the next push higher. In a downtrend, it is a rise before the next drop. Pullbacks are important because they often create more favorable entry points than chasing a fast-moving market. Traders watch for pullbacks to key levels such as previous support turning into resistance, moving averages, or Fibonacci retracement zones. The key is to distinguish between a normal pullback within a trend and the beginning of an actual trend reversal.",
  },
  {
    title: "Breakouts and Confirmed Breakouts",
    icon: <ArrowUpRight className="w-6 h-6 text-trading-green" />,
    desc: "A breakout occurs when price moves beyond a defined support or resistance level. However, not every breakout is genuine. A confirmed breakout typically involves price closing decisively beyond the level, followed by a retest where the old level holds as support (in a bullish breakout) or resistance (in a bearish breakout). On gold, false breakouts are common because the market often tests levels multiple times before committing to a direction. Waiting for confirmation rather than entering on the initial break can help filter out some of these false signals, though it may also mean entering at a less favorable price.",
  },
  {
    title: "Consolidation Before Breakouts",
    icon: <Gauge className="w-6 h-6 text-muted-foreground" />,
    desc: "Extended periods of consolidation often precede significant breakouts on XAUUSD. When gold has been trading in a tight range for an extended period, the eventual breakout can carry substantial momentum as pent-up energy is released. Traders who recognize consolidation phases can prepare for potential breakouts by identifying the range boundaries and watching for expansion in candle size and volume as signs that a move may be developing. The direction of the breakout is not always predictable from the consolidation itself, which is why many traders wait for confirmation rather than anticipating the direction.",
  },
  {
    title: "Failed Breakouts",
    icon: <AlertTriangle className="w-6 h-6 text-trading-red" />,
    desc: "A failed breakout happens when price moves beyond a key level but then quickly reverses back inside the previous range. On XAUUSD, failed breakouts are relatively common and can produce sharp reversals. When a resistance level is broken to the upside but price immediately falls back below it, traders who bought the breakout may be forced to sell, accelerating the downward move. Recognizing failed breakouts involves watching how price behaves after the initial break: if the candle that breaks the level has a long wick and closes back inside the range, or if the next few candles fail to hold above the level, the breakout may have failed.",
  },
];

const economicFactors = [
  {
    title: "US Dollar Strength",
    icon: <Globe className="w-6 h-6 text-trading-green" />,
    desc: "Gold is priced in US dollars, which means the two typically share an inverse relationship. When the dollar strengthens, gold becomes more expensive for holders of other currencies, which can reduce demand and push prices lower. When the dollar weakens, gold becomes more accessible globally, often providing support. Traders frequently monitor the DXY (US Dollar Index) alongside XAUUSD to understand the interplay between the two.",
  },
  {
    title: "Interest Rates",
    icon: <Activity className="w-6 h-6 text-trading-gold" />,
    desc: "Gold does not pay interest or dividends, so its attractiveness is partly determined by the opportunity cost of holding it versus yield-bearing assets. When interest rates rise, bonds and savings accounts become more appealing, which can draw capital away from gold. When rates are low or declining, the lower opportunity cost can make gold relatively more attractive. Rate expectations often matter more than actual rate decisions, as markets tend to price in anticipated changes in advance.",
  },
  {
    title: "Federal Reserve Decisions",
    icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
    desc: "The Federal Reserve is one of the single most influential drivers of XAUUSD price action. FOMC statements, interest rate decisions, dot-plot projections, and press conferences can all cause sharp and sustained gold movements. Traders watch for shifts in the Fed's language around inflation, employment, and the future path of rates. A more hawkish tone (favoring higher rates) often pressures gold, while a more dovish tone (favoring lower rates) can support it.",
  },
  {
    title: "Inflation Data",
    icon: <BarChart3 className="w-6 h-6 text-trading-gold" />,
    desc: "Gold has historically been viewed as a hedge against inflation, so inflation data releases can have a direct impact on XAUUSD. When inflation runs higher than expected, gold may rise as traders anticipate that the purchasing power of fiat currencies is eroding. Conversely, when inflation cools more than expected, gold may face headwinds. CPI, PCE, and producer price data are among the most closely watched inflation reports by gold traders.",
  },
  {
    title: "Treasury Yields",
    icon: <LineChart className="w-6 h-6 text-purple-400" />,
    desc: "US Treasury yields represent the return on government debt and are closely linked to interest rate expectations. Rising yields increase the opportunity cost of holding non-yielding assets like gold, which can weigh on XAUUSD. Falling yields have the opposite effect. The 10-year Treasury yield is particularly relevant because it serves as a benchmark for long-term borrowing costs and reflects broader market expectations about growth and monetary policy.",
  },
  {
    title: "Employment Data",
    icon: <Target className="w-6 h-6 text-trading-green" />,
    desc: "Employment reports, particularly the US Non-Farm Payrolls (NFP), can cause significant XAUUSD volatility. Strong employment data may reinforce expectations of continued rate hikes or delayed rate cuts, which can pressure gold. Weak employment data can have the opposite effect, supporting gold prices as traders anticipate a more accommodative monetary policy. The initial reaction to employment data can be sharp, and the follow-through over the rest of the session often depends on how the data fits into the broader economic picture.",
  },
  {
    title: "Geopolitical Developments",
    icon: <AlertOctagon className="w-6 h-6 text-trading-red" />,
    desc: "Gold is widely considered a safe-haven asset, meaning it tends to attract capital during periods of geopolitical tension or uncertainty. Armed conflicts, trade disputes, sanctions, political instability, and global health crises can all drive investors toward gold as a store of value. The impact of geopolitical events on XAUUSD can be rapid and substantial, sometimes overriding technical levels entirely. Traders who focus purely on technical analysis should be aware that geopolitical headlines can disrupt even the clearest price patterns.",
  },
  {
    title: "Risk Sentiment",
    icon: <TrendingDown className="w-6 h-6 text-trading-gold" />,
    desc: "Broader risk sentiment in financial markets influences gold. During risk-off environments, when equity markets are falling and investors are cautious, gold often benefits from safe-haven flows. During risk-on periods, when stocks are rising and confidence is high, gold may underperform as capital rotates toward higher-yielding assets. Understanding the current risk environment provides important context for interpreting XAUUSD price action, as the same candlestick pattern can have very different implications depending on whether the broader market is in a risk-on or risk-off mood.",
  },
];

const analysisSteps = [
  {
    step: 1,
    title: "Check the Higher-Timeframe Trend",
    desc: "Begin by stepping out to a higher timeframe, such as the daily or 4-hour chart, and assess the overall trend direction. Is XAUUSD making higher highs and higher lows (uptrend), lower highs and lower lows (downtrend), or moving sideways without clear structure (ranging)? Establishing the higher-timeframe trend first provides a framework that helps filter lower-timeframe signals. Trading in the direction of the higher-timeframe trend generally offers better alignment with the broader market momentum.",
  },
  {
    step: 2,
    title: "Identify Market Structure",
    desc: "Map out the sequence of swing highs and swing lows on your chart. Look for the patterns of higher highs, higher lows, lower highs, and lower lows that define the current structure. If the structure is clearly bullish, your analysis should bias toward finding long opportunities. If bearish, the bias shifts toward shorts. If the structure is mixed or unclear, the market may be transitioning, and it may be prudent to wait for clearer conditions before committing to a direction.",
  },
  {
    step: 3,
    title: "Mark Major Support and Resistance",
    desc: "Identify the price levels where XAUUSD has previously reacted with increased buying or selling pressure. These include previous swing highs and lows, areas of consolidation, and levels that price has tested multiple times. Mark these zones on your chart so you can quickly reference them as price approaches. Remember that these are zones, not exact lines, and price may react slightly above or below your marked level before committing to a direction.",
  },
  {
    step: 4,
    title: "Look for Price Reaction Around Important Levels",
    desc: "As price approaches a marked support or resistance zone, watch for signs of reaction. This might include slowing momentum, long wicks, reversal candlestick patterns, or a series of small-body candles indicating indecision. The way price behaves at a level can tell you a lot about the balance between buyers and sellers at that point. A strong rejection candle at a key level carries more weight than the same candle forming in the middle of nowhere on the chart.",
  },
  {
    step: 5,
    title: "Check for Breakouts, Pullbacks, or Consolidation",
    desc: "Determine what phase the market is in relative to your marked levels. Is price breaking through a level with momentum? Is it pulling back toward a level within a trend? Or is it consolidating in a range between two levels? Each phase suggests a different approach. Breakouts may offer trend-continuation opportunities if confirmed. Pullbacks within a trend may offer entry points at better prices. Consolidation often suggests waiting for a breakout rather than trading inside the range.",
  },
  {
    step: 6,
    title: "Consider Major Economic Events",
    desc: "Before acting on any price action observation, check the economic calendar for upcoming events that could significantly impact gold. Federal Reserve decisions, employment reports, inflation data, and geopolitical developments can all cause sharp and unpredictable XAUUSD moves. If a major event is imminent, it may be wise to wait until after the release when the market has had time to digest the information and establish a clearer direction.",
  },
  {
    step: 7,
    title: "Define Invalidation Before Considering an Idea",
    desc: "Before entering any trade idea, determine the price level at which your analysis would be proven wrong. This is your invalidation point. For a bullish idea, this might be a swing low that must hold. For a bearish idea, it might be a swing high that must not be exceeded. Defining invalidation before committing capital helps remove emotional decision-making and ensures that every trade idea has a clear exit plan if the market moves against you.",
  },
  {
    step: 8,
    title: "Consider Risk Management",
    desc: "Determine your position size based on the distance to your invalidation point and the amount of capital you are willing to risk. A common guideline is to risk no more than a small percentage of your account on any single trade. The specific percentage depends on your individual risk tolerance and account size. Proper position sizing ensures that no single loss can significantly damage your overall capital, which is essential for long-term survival in volatile markets like XAUUSD.",
  },
  {
    step: 9,
    title: "Avoid Entering Simply Because of a Single Candle or Signal",
    desc: "One of the most important principles of price action trading is that no single candle or pattern should be traded in isolation. A pin bar at support is more meaningful if the broader trend is bullish and the level has been significant in the past. An engulfing candle carries more weight if it aligns with the higher-timeframe direction. Always consider the context: the trend, the level, the timeframe, and the economic environment. Patience and context awareness are what separate thoughtful analysis from impulsive reacting.",
  },
];

const commonMistakes = [
  {
    title: "Trading Every Candle",
    icon: <Activity className="w-5 h-5 text-trading-red" />,
    desc: "Some traders feel compelled to act on every noticeable candlestick formation. In reality, most candles on a chart are noise. The meaningful formations are those that occur at significant levels, align with the broader trend, and appear on relevant timeframes. Selective trading based on confluence generally produces better results than trying to trade every pattern that appears.",
  },
  {
    title: "Ignoring Higher Timeframes",
    icon: <Clock className="w-5 h-5 text-trading-red" />,
    desc: "Focusing exclusively on short-term charts without checking the higher-timeframe context is a common error. A bullish signal on a 5-minute chart means very little if the daily trend is strongly bearish and price is approaching major resistance. Higher timeframes define the playing field; lower timeframes help with timing within that field.",
  },
  {
    title: "Treating Levels as Exact Prices",
    icon: <Crosshair className="w-5 h-5 text-trading-red" />,
    desc: "Support and resistance are zones, not precise lines. Price may overshoot or undershoot your marked level before reacting. Traders who place entries or stops at exact levels without any buffer often get stopped out before the expected move occurs. Allowing some room around levels accounts for the natural imprecision of financial markets.",
  },
  {
    title: "Chasing Breakouts",
    icon: <Zap className="w-5 h-5 text-trading-red" />,
    desc: "Entering a trade immediately when price breaks a level, without waiting for any confirmation, leads to many false breakout trades. On XAUUSD, where false breakouts are common, chasing every break can result in a series of losses. Waiting for a retest or for the breakout candle to close strongly beyond the level provides additional evidence that the breakout may be genuine.",
  },
  {
    title: "Ignoring Economic News",
    icon: <Globe className="w-5 h-5 text-trading-red" />,
    desc: "Pure technical analysis without awareness of the economic calendar can be dangerous on gold. A technically perfect setup can be invalidated instantly by a surprise Federal Reserve decision or an unexpected inflation print. Checking the economic calendar should be a standard part of every XAUUSD analysis routine, not an afterthought.",
  },
  {
    title: "Using Excessive Leverage",
    icon: <AlertTriangle className="w-5 h-5 text-trading-red" />,
    desc: "High leverage amplifies both gains and losses. Gold is already a volatile instrument, and adding excessive leverage can turn a moderate adverse move into a significant loss. Many experienced gold traders use relatively conservative leverage compared to what is available, recognizing that survival in the market is more important than maximizing short-term returns.",
  },
  {
    title: "Moving Stop-Losses Emotionally",
    icon: <AlertOctagon className="w-5 h-5 text-trading-red" />,
    desc: "When a trade moves against you, the temptation to widen the stop-loss in hopes that price will turn around can be strong. However, moving stops further from the original plan undermines the entire risk management framework. If your invalidation level was determined before entry, moving it afterward usually means you are trading on hope rather than analysis.",
  },
  {
    title: "Overtrading",
    icon: <Gauge className="w-5 h-5 text-trading-red" />,
    desc: "Taking too many trades, especially in quick succession, often leads to poor decision-making and cumulative losses. Overtrading is frequently driven by frustration after a loss or excitement after a win. Setting a maximum number of trades per day or week and stepping away from the chart when that limit is reached can help maintain discipline and objectivity.",
  },
  {
    title: "Assuming Past Performance Guarantees Future Results",
    icon: <ShieldCheck className="w-5 h-5 text-trading-red" />,
    desc: "A price action pattern that worked well in recent weeks may stop working as market conditions change. Gold's behavior shifts in response to the economic environment, and patterns that were reliable in one regime may be unreliable in another. Every analysis should be evaluated on its current merits, not on how similar situations played out in the past.",
  },
];

const riskPoints = [
  {
    title: "Stop-Loss",
    icon: <ShieldCheck className="w-6 h-6 text-trading-green" />,
    desc: "A stop-loss is a pre-defined price level at which a trade is automatically closed to limit further losses. On XAUUSD, where volatility can be significant, a stop-loss is not optional, it is essential. The stop should be placed at a level that represents genuine invalidation of your trade idea, such as beyond a key support or resistance zone, rather than at an arbitrary fixed distance from your entry.",
  },
  {
    title: "Position Sizing",
    icon: <Target className="w-6 h-6 text-trading-gold" />,
    desc: "Position sizing determines how much capital is allocated to each trade. It should be calculated based on your account size, your risk tolerance, and the distance to your stop-loss. A common approach is to risk a fixed small percentage of your account per trade. This means that on trades with wider stops, you take a smaller position, and on trades with tighter stops, you can take a slightly larger position, while keeping the dollar risk consistent.",
  },
  {
    title: "Risk/Reward",
    icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
    desc: "The risk/reward ratio compares the potential loss on a trade to the potential gain. A trade risking $100 to make $200 has a 1:2 risk/reward ratio. Many traders look for trades where the potential reward is at least equal to or greater than the risk taken. On XAUUSD, identifying clear support and resistance levels can help define both the stop-loss (risk) and the realistic profit target (reward) before entering a trade.",
  },
  {
    title: "Leverage",
    icon: <AlertTriangle className="w-6 h-6 text-trading-red" />,
    desc: "Leverage allows traders to control larger positions than their account balance would otherwise permit. While leverage can amplify profits, it equally amplifies losses. A 1% adverse move on XAUUSD with 100:1 leverage results in a 100% loss of the allocated margin. Many professional traders use far less leverage than what brokers offer, understanding that capital preservation is the foundation of long-term trading.",
  },
  {
    title: "Volatility",
    icon: <Activity className="w-6 h-6 text-trading-gold" />,
    desc: "Gold can be highly volatile, especially around major economic events. Volatility affects both the potential for profit and the potential for loss. During high-volatility periods, wider stops may be necessary to avoid being stopped out by normal price fluctuations. Traders should also consider reducing position sizes during volatile conditions to account for the increased risk of large adverse moves.",
  },
  {
    title: "Trading Plan",
    icon: <BookOpen className="w-6 h-6 text-trading-green" />,
    desc: "A trading plan is a written set of rules that defines what you trade, when you trade, how you manage risk, and how you handle both winning and losing trades. Having a plan helps remove emotional decision-making and provides a consistent framework for evaluating opportunities. Without a plan, traders are more likely to make impulsive decisions based on fear, greed, or frustration rather than on careful analysis.",
  },
  {
    title: "Emotional Discipline",
    icon: <Eye className="w-6 h-6 text-purple-400" />,
    desc: "Emotional reactions are among the biggest challenges in trading. Fear of missing out can lead to chasing trades. Fear of loss can lead to premature exits. Anger after a loss can lead to revenge trading. Developing emotional discipline involves recognizing these impulses, having rules in place to manage them, and being willing to step away from the charts when emotions are running high. This is an ongoing process that improves with experience and self-awareness.",
  },
];

const faqs = [
  {
    q: "What is XAUUSD price action?",
    a: "XAUUSD price action refers to the study of raw price movement on a gold chart (XAU/USD) without relying on mathematical indicators. It involves analyzing candlestick formations, swing highs and lows, support and resistance levels, and trend structure to understand how buyers and sellers are interacting. Price action traders use the open, high, low, and close of each candle along with the sequence of swings to form a reading of market sentiment and potential direction.",
  },
  {
    q: "How do I read XAUUSD price action?",
    a: "Reading XAUUSD price action typically starts with identifying the broader market condition on a higher timeframe such as the daily chart: is gold trending up, down, or moving sideways? From there, you identify the market structure using swing highs and lows, mark key support and resistance zones, and then examine candlestick behavior and momentum on lower timeframes around those levels. The goal is to combine multiple observations rather than relying on any single signal.",
  },
  {
    q: "What market structure should I look for on XAUUSD?",
    a: "On XAUUSD, look for sequences of higher highs and higher lows to identify an uptrend, or lower highs and lower lows to identify a downtrend. When neither pattern is clear, the market is likely ranging. Gold can be less clean in its structure than some other instruments due to its volatility and sensitivity to economic events, so structure breaks should be treated with caution and confirmed with additional evidence rather than traded in isolation.",
  },
  {
    q: "How do support and resistance help with XAUUSD?",
    a: "Support and resistance levels mark price areas where buying or selling interest has historically been strong enough to halt or reverse a move. On gold, these levels are often found at previous swing highs and lows, round numbers, and zones where price has reacted multiple times. Support and resistance provide context for interpreting candlestick patterns and potential entry or exit points, but they should be treated as zones rather than exact lines.",
  },
  {
    q: "Which timeframe should beginners use for XAUUSD analysis?",
    a: "Beginners generally benefit from starting with higher timeframes such as the daily or 4-hour chart. These timeframes filter out noise and make it easier to identify the dominant trend and major levels. Once the broader picture is clear on a higher timeframe, lower timeframes like the 1-hour or 15-minute chart can be used to study price action detail around the areas of interest identified on the higher timeframe.",
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
export default function HowToReadXauusdPriceActionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
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
                Forex Wizard Educational Guide
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">How to Read </span>
              <span className="text-trading-gold text-glow-gold">XAUUSD Price Action</span>
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground/80 mb-6">
              Last updated: September 11, 2026 · Educational content by{" "}
              <Link href="/about/" className="text-foreground/80 hover:text-trading-green no-underline">
                Forex Wizard
              </Link>
            </p>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Price action analysis is the study of raw price movement on a
              chart, without relying on indicators or external signals. When
              applied to XAUUSD, it helps traders understand how gold has been
              moving, where buyers and sellers have been most active, and what
              the current market structure suggests about potential future
              behavior. This guide explains the core concepts behind reading
              gold price action in a practical, educational way.
            </p>

            <FadeIn delay={0.5} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <TelegramCTA text="Join Forex Wizard Telegram" variant="gold" />
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

        {/* WHAT IS XAUUSD PRICE ACTION? */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">What Is </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD Price Action?</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                XAUUSD is the trading symbol for gold priced in US dollars. The
                XAU component is the ISO 4217 code for one troy ounce of gold,
                and USD represents the US dollar. When you look at an XAUUSD
                chart, you are seeing how many dollars it takes to buy one ounce
                of gold at any given moment. This is the most widely traded gold
                pair in the world and is available on virtually every forex and
                CFD brokerage platform.
              </p>
              <p>
                Price action, in simple terms, is the movement of price over
                time as displayed on a chart. Rather than relying on
                mathematical indicators like moving averages, RSI, or MACD,
                price action traders focus on the raw data: the open, high, low,
                and close of each candle, the size and shape of those candles,
                the sequence of swings, and the way price responds at certain
                levels. The idea is that price itself reflects all available
                information, and by studying its behavior directly, traders can
                develop a reading of market sentiment and potential direction.
              </p>
              <p>
                Traders study historical price movement because markets often
                exhibit repeatable behaviors. Support and resistance levels that
                mattered in the past often continue to influence price in the
                future. Trend structures tend to persist until something
                fundamentally changes the supply-demand balance. Candlestick
                formations that signaled reversals or continuations in the past
                may carry similar significance when they appear again under
                comparable conditions. This does not mean history repeats
                exactly, but rather that understanding past behavior provides a
                useful framework for interpreting current price action.
              </p>
              <p>
                Gold can behave differently from many currency pairs because its
                price drivers are unique. While forex pairs are primarily
                influenced by the relative strength of two economies and their
                central banks, gold responds to a broader set of factors:
                inflation expectations, real interest rates, geopolitical risk,
                currency strength, and investor sentiment. Gold is also widely
                regarded as a safe-haven asset, which means it can attract
                buying pressure during periods of market stress that would
                negatively affect most currency pairs. Understanding these
                differences helps traders apply price action analysis in a way
                that is appropriate for gold rather than mechanically applying
                concepts that work better on other instruments.
              </p>
              <p>
                Context is central to price action analysis. A bullish candlestick
                pattern at a major support level in an uptrend carries very
                different implications than the same pattern forming in the
                middle of a range with no clear trend. The same principle
                applies to breakouts, pullbacks, and every other concept
                discussed in this guide. Isolated signals without context are
                rarely reliable. The strength of price action analysis comes
                from combining multiple observations: the trend, the level, the
                candlestick formation, the volume, and the economic environment.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* START WITH THE BIGGER PICTURE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Start with the </span>
                <span className="text-trading-gold text-glow-gold">Bigger Picture</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Before zooming into individual candles or short-term patterns,
                the first step in reading XAUUSD price action is to determine
                the broader market condition. This means looking at a higher
                timeframe, such as the daily or 4-hour chart, and asking a
                simple question: is the market trending up, trending down, or
                moving sideways? The answer to this question shapes every
                subsequent analysis decision.
              </p>
              <p>
                A <span className="text-trading-green font-semibold">bullish trend</span> is
                identified by a series of higher highs and higher lows. Each time
                price pushes to a new peak, it exceeds the previous one. Each
                time it pulls back, the low is higher than the last pullback
                low. This pattern shows that buyers are consistently willing to
                pay more, and sellers are unable to push price down as far as
                before. On XAUUSD, a bullish trend might play out over weeks or
                months, driven by factors like declining real interest rates,
                dollar weakness, or rising geopolitical risk.
              </p>
              <p>
                A <span className="text-trading-red font-semibold">bearish trend</span> is
                the opposite: lower highs and lower lows. Each rally falls short
                of the previous peak, and each decline drops below the prior
                low. Sellers are in control, and buyers are unable or unwilling
                to push price higher. Bearish trends in gold often coincide with
                rising real yields, a strengthening dollar, or a broad shift
                toward risk-on sentiment in financial markets.
              </p>
              <p>
                A <span className="text-trading-gold font-semibold">sideways or ranging market</span>{" "}
                occurs when price fluctuates between a roughly defined upper and
                lower boundary without making meaningful new highs or lows. In
                this environment, buyers and sellers are roughly balanced, and
                neither side has established clear control. Range-bound
                conditions on XAUUSD can persist for extended periods,
                particularly when the market is waiting for a major catalyst such
                as a Federal Reserve decision or an inflation report.
              </p>
              <p>
                Understanding the bigger picture before analyzing details is
                important because the same candlestick pattern can have very
                different meanings depending on the broader context. A bullish
                reversal candle at support in an uptrend is a continuation
                signal. The same candle at resistance in a downtrend might be a
                brief pause before further decline. By establishing the
                higher-timeframe condition first, you give yourself a framework
                for interpreting lower-timeframe price action in a way that is
                aligned with the dominant market direction.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* XAUUSD MARKET STRUCTURE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-trading-gold text-glow-gold">How Market Structure Helps Read XAUUSD</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
              <p>
                Market structure refers to the pattern of swing highs and swing
                lows that price creates over time. By identifying these swings
                and the relationships between them, traders can determine
                whether the market is trending, and if so, in which direction.
                Market structure is one of the most fundamental concepts in
                price action analysis because it provides an objective framework
                for reading the market rather than relying on subjective
                interpretation.
              </p>
            </div>

            <div className="space-y-6">
              {structurePoints.map((item) => (
                <FadeIn key={item.label}>
                  <div className="glass rounded-2xl p-6 md:p-8">
                    <h3 className={`text-xl font-bold mb-3 ${item.color}`}>
                      {item.label}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="mt-12 space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                When these structures are clear and consistent, the market is
                said to be trending. An uptrend, for example, requires both
                higher highs and higher lows to be present. If price makes a
                higher high but then drops below the previous low, the
                bullish structure is broken, and the market may be transitioning
                into a range or a reversal. Similarly, a bearish trend is broken
                when price makes a higher high above the most recent swing high.
              </p>
              <p>
                On XAUUSD, market structure can sometimes be less clean than on
                other instruments. Gold frequently experiences sharp intraday
                reversals, extended periods of consolidation, and sudden
                directional shifts around economic events. This means that
                structure breaks on gold should be treated with the same
                caution as any other signal: they provide useful information,
                but they are not guarantees of a sustained move in the new
                direction.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SUPPORT AND RESISTANCE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Support and </span>
                <span className="text-trading-gold text-glow-gold">Resistance in XAUUSD Analysis</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Support and resistance are among the most widely used concepts
                in technical analysis, and they apply directly to XAUUSD price
                action. A support level is a price area where buying interest
                has historically been strong enough to halt a decline. A
                resistance level is where selling pressure has historically
                been sufficient to stop an advance. These levels are identified
                by looking at where price has reversed or paused in the past — a
                process covered in detail in our guide to{" "}
                <Link
                  href="/xauusd-support-resistance/"
                  className="text-trading-gold hover:text-trading-gold/80 underline underline-offset-2 transition-colors"
                >
                  identifying XAUUSD support and resistance levels
                </Link>{" "}.
              </p>
              <p>
                <span className="text-foreground font-semibold">Previous swing highs</span> serve
                as potential resistance because they represent prices at which
                sellers previously overwhelmed buyers. When gold approaches a
                prior swing high, traders watch to see whether sellers will
                appear again at the same area. If price pushes through and
                closes above that level, the old resistance may become new
                support, as traders who were previously waiting to sell at that
                level may now look to buy.
              </p>
              <p>
                <span className="text-foreground font-semibold">Previous swing lows</span> serve
                as potential support for the opposite reason: they mark prices
                where buyers previously overwhelmed sellers. When gold pulls
                back toward a prior swing low, the question is whether buyers
                will step in again. If the level breaks and price closes below
                it, the old support may become new resistance.
              </p>
              <p>
                <span className="text-foreground font-semibold">Repeated reaction areas</span> are
                particularly significant. When price has bounced off the same
                general zone multiple times, that zone has been tested and
                reinforced by the market. A level that has been respected two
                or three times is generally more significant than one that was
                only tested once. On XAUUSD, you will often find that gold
                reacts repeatedly around round numbers (such as $2,000, $2,100,
                $2,200) or around previous all-time highs and lows, because
                these levels attract attention from a large number of market
                participants.
              </p>
              <p>
                <span className="text-foreground font-semibold">Breakouts and retests</span> are an
                important part of support and resistance analysis. When price
                breaks through a significant level, traders often watch for a
                retest, where price returns to the broken level to see whether
                it will hold as new support (in a bullish breakout) or new
                resistance (in a bearish breakout). A successful retest that
                holds provides additional confirmation that the breakout is
                genuine and that the market has accepted the new level.
              </p>
              <p>
                <span className="text-foreground font-semibold">Psychological price levels</span> are
                round numbers that can influence trading behavior simply
                because many traders are watching them. On gold, levels like
                $2,000, $2,500, and $3,000 often act as support or resistance
                even without any prior price history at those exact levels.
                The reason is that large numbers of orders, stop-losses, and
                take-profit targets cluster around these round numbers, which
                can create self-fulfilling reactions.
              </p>
              <p>
                <span className="text-foreground font-semibold">Multiple-timeframe levels</span> add
                confluence. A support or resistance level that is visible on
                both the daily and the 4-hour chart is more significant than
                one that only appears on a single timeframe. When levels from
                different timeframes align, it suggests that a larger number of
                market participants are likely to be watching and reacting to
                that price area, which increases the probability of a
                meaningful response.
              </p>
              <p className="glass rounded-2xl p-6 border border-trading-gold/20">
                <span className="text-trading-gold font-semibold">Important:</span> Support and
                resistance are zones, not guaranteed exact turning points.
                Price may overshoot, undershoot, or briefly pierce a level before
                reacting. Treating these areas as approximate zones rather than
                precise lines generally leads to better trading decisions and
                fewer unnecessary stop-outs.
              </p>

              <div className="mt-8 text-center">
                <Link
                  href="/xauusd-support-resistance/"
                  className="inline-flex items-center gap-2 text-trading-gold hover:text-trading-gold/80 font-semibold text-sm transition-colors no-underline"
                >
                  Learn how to identify XAUUSD support and resistance
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* CANDLESTICK PRICE ACTION */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-trading-gold text-glow-gold">How to Read Candlestick Price Action</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
              <p>
                Candlestick charts display the open, high, low, and close for
                each time period. The body of the candle shows the range
                between the open and close, while the wicks (shadows) extend to
                the high and low. Green candles indicate that the close was
                above the open (bullish), and red candles indicate that the
                close was below the open (bearish). On XAUUSD, candlestick
                analysis can be particularly useful because gold's volatility
                often produces clear and pronounced candlestick formations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {candlestickConcepts.map((item) => (
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

            <div className="mt-12 glass rounded-2xl p-6 border border-trading-gold/20">
              <p className="text-base text-muted-foreground leading-relaxed">
                <span className="text-trading-gold font-semibold">Key principle:</span> A
                candlestick pattern should always be interpreted in context
                rather than traded blindly. A pin bar at a major support level in
                an uptrend is a very different signal from a pin bar forming in
                the middle of a range with no clear trend. No candlestick
                pattern guarantees any particular market direction.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* TREND AND MOMENTUM */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Trend and </span>
                <span className="text-trading-gold text-glow-gold">Momentum</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
              <p>
                Understanding trend and momentum is essential for interpreting
                XAUUSD price action effectively. The trend tells you the
                direction price has been moving, while momentum tells you how
                strongly it has been moving in that direction. A trend with
                strong momentum is more likely to continue than one with fading
                momentum, though neither condition guarantees future movement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trendMomentumPoints.map((item) => (
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

        {/* MULTIPLE TIMEFRAME ANALYSIS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-trading-gold text-glow-gold">How to Analyze XAUUSD Across Multiple Timeframes</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Multiple timeframe analysis involves examining the same market
                across different time periods to build a more complete picture of
                what is happening. The idea is straightforward: each timeframe
                provides different information. Higher timeframes show the
                broader trend and major levels. Lower timeframes show finer
                detail about how price is behaving around those levels. By
                combining these perspectives, traders can make more informed
                decisions about when and where to look for trading
                opportunities.
              </p>
              <p>
                A practical educational framework for multiple timeframe analysis
                on XAUUSD might look like this:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <FadeIn>
                <div className="glass rounded-2xl p-6 h-full border border-trading-gold/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-trading-gold/10 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-trading-gold" />
                    </div>
                    <h3 className="text-lg font-bold text-trading-gold">
                      Higher Timeframe
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Start with the daily or weekly chart to understand the
                    broader market structure. Identify the dominant trend,
                    mark the most significant support and resistance zones, and
                    note any large-scale patterns. This sets the context for
                    everything that follows. If the higher timeframe is bullish,
                    your default bias on lower timeframes should lean toward
                    finding long opportunities.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="glass rounded-2xl p-6 h-full border border-trading-green/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-trading-green/10 flex items-center justify-center">
                      <LineChart className="w-5 h-5 text-trading-green" />
                    </div>
                    <h3 className="text-lg font-bold text-trading-green">
                      Middle Timeframe
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Move to the 4-hour or 1-hour chart to identify important
                    levels within the broader trend. Look for swing highs and
                    lows, consolidation zones, and areas where price has
                    previously reacted. This is where you start narrowing down
                    potential areas of interest for trade entries.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="glass rounded-2xl p-6 h-full border border-blue-400/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-400/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-blue-400">
                      Lower Timeframe
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Use the 15-minute or 5-minute chart to study price action
                    detail around the areas identified on the middle
                    timeframe. Look for candlestick patterns, momentum shifts,
                    and entry signals. The lower timeframe is for precision,
                    not for determining the overall direction.
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="mt-12 glass rounded-2xl p-6 border border-trading-gold/20">
              <p className="text-base text-muted-foreground leading-relaxed">
                <span className="text-trading-gold font-semibold">Note:</span> This
                is an educational framework for organizing analysis, not a
                guaranteed trading system. No combination of timeframes can
                predict future price movements with certainty. The value of
                multiple timeframe analysis lies in providing a structured
                approach to reading the market, which can help traders make more
                informed and less impulsive decisions.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ECONOMIC FACTORS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Economic Factors That </span>
                <span className="text-trading-gold text-glow-gold">Influence XAUUSD</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
              <p>
                XAUUSD price action should not always be viewed in isolation
                from the broader economic environment. Gold is deeply connected
                to global macroeconomic conditions, and major economic events can
                cause rapid and substantial price movements that override
                technical patterns. Understanding these factors helps traders
                interpret why gold is moving the way it is, choose the{" "}
                <Link
                  href="/best-time-to-trade-xauusd/"
                  className="text-trading-gold hover:text-trading-gold/80 underline underline-offset-2 transition-colors"
                >
                  best time to trade XAUUSD
                </Link>{" "},
                and know when to exercise additional caution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {economicFactors.map((item) => (
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

        {/* PRACTICAL XAUUSD ANALYSIS PROCESS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-trading-gold text-glow-gold">Practical XAUUSD Analysis Process</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                The following is an educational step-by-step framework for
                approaching XAUUSD price action analysis. It is not a trading
                strategy and does not guarantee any specific outcome.
              </p>
            </div>

            <div className="space-y-6">
              {analysisSteps.map((item) => (
                <FadeIn key={item.step}>
                  <div className="glass rounded-2xl p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-trading-gold/10 border border-trading-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-trading-gold font-bold text-sm">
                          {item.step}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed">
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

        {/* HYPOTHETICAL EXAMPLE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Hypothetical </span>
                <span className="text-trading-gold text-glow-gold">Example</span>
              </h2>
            </div>

            <div className="glass rounded-2xl p-8 md:p-10 border border-trading-gold/20">
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="w-5 h-5 text-trading-gold" />
                <span className="text-sm font-bold text-trading-gold uppercase tracking-wider">
                  Hypothetical Example &mdash; Not Current Market Data
                </span>
              </div>

              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Imagine XAUUSD has been making higher highs and higher lows on
                  the daily chart over the past several weeks. The most recent
                  swing high reached a significant area around $2,150, and the
                  most recent swing low held above $2,080. The market structure
                  is clearly bullish, and the trend has been consistent.
                </p>
                <p>
                  Now imagine price pulls back from the $2,150 area and
                  approaches the $2,080 zone, which has served as support on
                  two previous occasions. On the 4-hour chart, you notice that
                  price is slowing down as it nears this zone. Candles are
                  getting smaller, and a long lower wick appears, suggesting
                  that buyers are starting to respond.
                </p>
                <p>
                  A trader applying price action analysis would note the
                  following: the higher-timeframe trend is bullish, price is at a
                  known support zone, and a candlestick pattern suggesting
                  rejection is forming. The confluence of these factors presents
                  a potential opportunity. However, the trader would also define
                  an invalidation level, perhaps below the $2,070 area, which
                  would signal that the bullish structure has been broken if
                  price closes below it.
                </p>
                <p>
                  This example illustrates how price action analysis combines
                  multiple observations: trend, level, and candlestick behavior.
                  It does not represent any actual market situation, and the
                  price levels used are purely illustrative. No past example can
                  guarantee how price will behave in the future, even if
                  conditions appear similar.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* COMMON MISTAKES */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Common XAUUSD </span>
                <span className="text-trading-gold text-glow-gold">Price Action Mistakes</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
              <p>
                Being aware of common mistakes can help traders develop more
                disciplined and thoughtful analysis habits. The following are
                errors that many traders encounter at some point, particularly
                when first applying price action concepts to gold.
              </p>
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

        {/* RISK MANAGEMENT */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-trading-gold text-glow-gold">Risk Management</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
              <p>
                Risk management is not a secondary consideration, it is the
                foundation upon which every other aspect of trading rests. No
                amount of price action analysis, pattern recognition, or market
                understanding can protect a trader who does not manage risk
                properly. On XAUUSD, where volatility can be substantial, risk
                management is particularly important.
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
                future results. The information on Forex Wizard is for educational
                and informational purposes only and should not be considered
                personalized financial advice.
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

        {/* INTERNAL LINKS / RELATED CONTENT */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Continue Learning</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Explore more XAUUSD and forex educational content from Forex Wizard.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <FadeIn>
                <Link
                  href="/xauusd-analysis/"
                  className="glass rounded-2xl p-6 block h-full hover:border-trading-gold/30 border border-transparent transition-all duration-300 no-underline group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <BarChart3 className="w-6 h-6 text-trading-gold" />
                    <h3 className="text-lg font-bold text-foreground group-hover:text-trading-gold transition-colors">
                      XAUUSD Analysis Hub
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Explore comprehensive XAUUSD analysis covering market
                    structure, technical levels, and the economic factors
                    that influence gold prices.
                  </p>
                </Link>
              </FadeIn>
              <FadeIn delay={0.05}>
                <Link
                  href="/xauusd-trading-strategy/"
                  className="glass rounded-2xl p-6 block h-full hover:border-trading-gold/30 border border-transparent transition-all duration-300 no-underline group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-6 h-6 text-trading-gold" />
                    <h3 className="text-lg font-bold text-foreground group-hover:text-trading-gold transition-colors">
                      XAUUSD Trading Strategy
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Learn how to combine market structure, price action, and
                    key levels into a structured XAUUSD trading strategy.
                  </p>
                </Link>
              </FadeIn>
              <FadeIn delay={0.1}>
                <Link
                  href="/xauusd-support-resistance/"
                  className="glass rounded-2xl p-6 block h-full hover:border-trading-gold/30 border border-transparent transition-all duration-300 no-underline group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Crosshair className="w-6 h-6 text-trading-gold" />
                    <h3 className="text-lg font-bold text-foreground group-hover:text-trading-gold transition-colors">
                      XAUUSD Support and Resistance
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Learn how to identify, confirm, and trade XAUUSD support
                    and resistance levels with detailed educational examples.
                  </p>
                </Link>
              </FadeIn>
              <FadeIn delay={0.1}>
                <Link
                  href="/gold-signals/"
                  className="glass rounded-2xl p-6 block h-full hover:border-trading-gold/30 border border-transparent transition-all duration-300 no-underline group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="w-6 h-6 text-trading-gold" />
                    <h3 className="text-lg font-bold text-foreground group-hover:text-trading-gold transition-colors">
                      Gold Trading Signals
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Learn about gold trading signals and how Forex Wizard
                    approaches sharing XAUUSD analysis with the community.
                  </p>
                </Link>
              </FadeIn>
              <FadeIn delay={0.15}>
                <Link
                  href="/forex-signals/"
                  className="glass rounded-2xl p-6 block h-full hover:border-trading-green/30 border border-transparent transition-all duration-300 no-underline group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-trading-green" />
                    <h3 className="text-lg font-bold text-foreground group-hover:text-trading-green transition-colors">
                      Forex Signals
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Explore Forex Wizard forex signals and educational content
                    for major and minor currency pairs.
                  </p>
                </Link>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Link
                  href="/about/"
                  className="glass rounded-2xl p-6 block h-full hover:border-trading-green/30 border border-transparent transition-all duration-300 no-underline group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-6 h-6 text-trading-green" />
                    <h3 className="text-lg font-bold text-foreground group-hover:text-trading-green transition-colors">
                      About Forex Wizard
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Learn about the Forex Wizard community, our approach to
                    analysis, and what we stand for.
                  </p>
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
                <span className="text-trading-gold text-glow-gold">Forex Wizard</span>
                <span className="text-foreground"> Community</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Follow XAUUSD market updates, educational analysis, and trading
                discussions with the Forex Wizard Telegram community. Free to
                join.
              </p>
              <TelegramCTA text="Join Forex Wizard on Telegram" variant="gold" />
            </FadeIn>
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
