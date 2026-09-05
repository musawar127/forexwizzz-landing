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
  RotateCcw,
} from "lucide-react";
import {
  FadeSection,
  FadeIn,
  HeroAnimation,
  StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";

export const metadata: Metadata = {
  title: "XAUUSD Support and Resistance | How to Identify Key Levels",
  description:
    "Learn how to identify XAUUSD support and resistance, key price levels, zones, breakouts, role reversals and price action around important levels.",
  alternates: {
    canonical: "https://forexwizard.online/xauusd-support-resistance/",
  },
  openGraph: {
    title: "XAUUSD Support and Resistance | How to Identify Key Levels",
    description:
      "Learn how to identify XAUUSD support and resistance zones, key price levels, breakouts, role reversals and price action around important levels.",
    type: "article",
    url: "https://forexwizard.online/xauusd-support-resistance/",
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
    title: "XAUUSD Support and Resistance | How to Identify Key Levels",
    description:
      "Learn how to identify XAUUSD support and resistance zones, key price levels, breakouts, role reversals and price action around important levels.",
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
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const findSteps = [
  {
    step: 1,
    title: "Start with a Higher Timeframe",
    desc: "Begin on the daily or weekly chart to identify the most significant levels. Higher timeframes filter out market noise and reveal the price areas that have mattered most over weeks or months. A level that has caused multiple reactions on the daily chart is almost always more significant than one that only appears on a 15-minute chart. This step establishes the major zones that will frame your entire analysis.",
  },
  {
    step: 2,
    title: "Find Significant Swing Highs and Swing Lows",
    desc: "Look for the peaks and valleys that stand out on the chart. These are the points where price clearly reversed direction. Not every minor peak qualifies as a significant swing high, focus on the ones that produced a clear directional move afterward. On XAUUSD, major swing points often correspond to important economic events or shifts in market sentiment, which is why they tend to be revisited by price in the future.",
  },
  {
    step: 3,
    title: "Look for Areas Where Price Reacted Multiple Times",
    desc: "A zone that price has touched two, three, or more times carries more significance than one tested only once. Multiple reactions suggest that a large number of market participants are aware of the level and are willing to act on it. On gold, you will often see price bounce off the same general area several times over the course of weeks or months, creating a clearly identifiable support or resistance zone that traders on all timeframes can recognize.",
  },
  {
    step: 4,
    title: "Mark Zones Rather Than Single Exact Prices",
    desc: "Instead of drawing a single horizontal line at a specific price, highlight a zone that covers a small range. This range might span from the wick lows to the wick highs of the candles that formed at that level. By thinking in terms of zones, you account for the fact that price rarely reverses at an exact pip. A zone-based approach reduces the chance of being stopped out by a small overshoot before the expected reaction occurs.",
  },
  {
    step: 5,
    title: "Check Whether the Level Is Still Relevant",
    desc: "Markets evolve, and not every historical level remains important. A support zone that was significant six months ago may have lost its relevance if price has since moved far above it and never returned. Ask yourself: has price recently interacted with this level? Is it aligned with the current market structure? A level is most relevant when it is relatively recent, has been tested multiple times, or aligns with other significant factors on the chart.",
  },
  {
    step: 6,
    title: "Move to Lower Timeframes for Additional Context",
    desc: "Once you have identified the major zones on the higher timeframe, drop down to a middle or lower timeframe to study how price has been behaving around those zones in more detail. You may notice specific candlestick reactions, consolidation patterns, or micro-structure that was not visible on the higher chart. This additional context can help you understand how price is likely to behave when it next approaches the zone.",
  },
  {
    step: 7,
    title: "Wait for Price Behavior Around the Zone",
    desc: "After identifying and marking your zones, the final step is to wait and observe. As price approaches a zone, watch for signs of reaction: slowing momentum, long wicks, reversal candlestick patterns, or a series of small-body candles indicating indecision. The way price behaves at a zone provides information about the current balance between buyers and sellers. This observation should inform your next decision, whether that is to consider a trade idea, adjust an existing position, or simply continue watching.",
  },
];

const swingConcepts = [
  {
    term: "Swing High",
    desc: "A peak on the chart where price rose and then reversed lower. A swing high is surrounded by lower highs on either side. It represents a point where selling pressure overwhelmed buying pressure, at least temporarily. The most significant swing highs are those that stand out clearly on the chart and are followed by a sustained move downward.",
    color: "text-trading-red",
  },
  {
    term: "Swing Low",
    desc: "A valley on the chart where price fell and then reversed higher. A swing low is surrounded by higher lows on either side. It marks a point where buying interest was strong enough to halt a decline. The most significant swing lows are those that lead to a sustained move upward and are later tested again by future pullbacks.",
    color: "text-trading-green",
  },
  {
    term: "Higher High",
    desc: "A swing high that rises above the previous swing high. When a sequence of higher highs forms, it indicates that buyers are willing to push price to new peaks. On XAUUSD, a series of higher highs suggests that demand for gold is consistently overcoming selling pressure at each successive resistance area.",
    color: "text-trading-green",
  },
  {
    term: "Higher Low",
    desc: "A swing low that stays above the previous swing low. In an uptrend, each pullback should form a low that is higher than the last one. Higher lows indicate that sellers are unable to push price down as far as before, reinforcing the bullish structure.",
    color: "text-trading-green",
  },
  {
    term: "Lower High",
    desc: "A swing high that falls short of the previous swing high. When price fails to reach the prior peak, it suggests buyers are weakening. Lower highs are a key component of a bearish trend and can serve as potential resistance levels for future rallies.",
    color: "text-trading-red",
  },
  {
    term: "Lower Low",
    desc: "A swing low that drops below the previous swing low. Each new low below the last confirms that sellers are in control. Lower lows can serve as potential support levels for future declines, though in a strong downtrend, these support areas may break quickly.",
    color: "text-trading-red",
  },
];

const priceActionObservations = [
  {
    title: "Rejection Wicks",
    icon: <Crosshair className="w-6 h-6 text-trading-gold" />,
    desc: "Long wicks (shadows) extending away from a support or resistance zone suggest that price was pushed back by opposing market participants. A long lower wick at support indicates that buyers absorbed selling pressure. A long upper wick at resistance suggests that sellers absorbed buying pressure. The length of the wick relative to the candle body provides a visual sense of how decisively price was rejected.",
  },
  {
    title: "Strong Momentum Candles",
    icon: <Zap className="w-6 h-6 text-trading-green" />,
    desc: "When a large-bodied candle with small wicks closes decisively beyond a support or resistance zone, it suggests genuine conviction from the moving side. A strong bullish candle breaking above resistance and closing near its high may indicate a genuine breakout. The key word is may: momentum candles should be considered alongside the broader context, not traded in isolation.",
  },
  {
    title: "Engulfing Candles",
    icon: <Activity className="w-6 h-6 text-blue-400" />,
    desc: "An engulfing pattern at a key level can signal a shift in momentum. A bullish engulfing candle at support, where a green candle's body fully covers the previous red candle's body, suggests buyers have taken control. A bearish engulfing candle at resistance suggests the opposite. The significance increases when the engulfing candle appears after a sustained move toward the level.",
  },
  {
    title: "Consolidation",
    icon: <Gauge className="w-6 h-6 text-muted-foreground" />,
    desc: "When price moves into a support or resistance zone and then begins to consolidate, forming a series of small, overlapping candles, it suggests indecision. Consolidation near a level does not indicate direction, but it does suggest that the level is actively influencing price behavior. A breakout from this consolidation, in either direction, may provide information about which side ultimately gains control.",
  },
  {
    title: "Failed Breakouts",
    icon: <AlertTriangle className="w-6 h-6 text-trading-red" />,
    desc: "A failed breakout occurs when price moves briefly beyond a level but then quickly reverses back inside the previous range. On XAUUSD, this often produces a candle with a long wick extending beyond the level. Failed breakouts can be significant because they may trap traders who entered on the initial break, and their subsequent stop-losses can accelerate the reversal.",
  },
  {
    title: "Breakout and Retest",
    icon: <RotateCcw className="w-6 h-6 text-trading-gold" />,
    desc: "After price breaks through a significant level and moves away, it often returns to retest the broken level. In a bullish breakout, the old resistance becomes new support, and the retest is an opportunity to see whether buyers will defend that new support. A successful retest that holds adds confidence that the breakout was genuine, though it does not guarantee continued movement in the breakout direction.",
  },
  {
    title: "Changes in Market Structure",
    icon: <TrendingDown className="w-6 h-6 text-trading-red" />,
    desc: "The most significant thing that can happen at a support or resistance zone is a structural change. If price breaks below a major swing low that had been holding, the bullish market structure is potentially broken. If price breaks above a major swing high, the bearish structure may be breaking. These structural shifts often signal that the market dynamics have changed and should be treated with particular attention.",
  },
];

const economicFactors = [
  {
    title: "Federal Reserve Decisions",
    icon: <TrendingUp className="w-6 h-6 text-trading-gold" />,
    desc: "FOMC meetings, interest rate announcements, and Fed chair press conferences are among the most impactful events for gold. A hawkish surprise can send gold through support levels that looked strong moments before the announcement. Conversely, a dovish surprise can propel gold through resistance with little resistance. Traders should be aware of the Fed calendar and exercise caution around these events.",
  },
  {
    title: "Interest Rates",
    icon: <Activity className="w-6 h-6 text-trading-green" />,
    desc: "Rising interest rates increase the opportunity cost of holding non-yielding gold, which can weaken support levels. Falling rates reduce that cost, which can strengthen support and make resistance levels easier to break. Rate expectations often matter more than actual decisions, as markets price in anticipated changes well before they are announced.",
  },
  {
    title: "US Inflation Data",
    icon: <BarChart3 className="w-6 h-6 text-trading-gold" />,
    desc: "CPI, PCE, and other inflation reports can cause rapid XAUUSD movement. Higher-than-expected inflation may strengthen gold's support levels as traders anticipate dollar weakness. Lower-than-expected inflation can weaken support and strengthen resistance. Inflation data releases frequently produce sharp candle wicks that temporarily pierce support or resistance zones before price settles.",
  },
  {
    title: "Employment Reports",
    icon: <Target className="w-6 h-6 text-blue-400" />,
    desc: "The US Non-Farm Payrolls report is a regular source of high volatility for XAUUSD. Strong employment data can push gold through support as rate-cut expectations decline. Weak data can push gold through resistance as traders anticipate more accommodative policy. The initial reaction to NFP is often volatile and can temporarily override even the most well-established technical levels.",
  },
  {
    title: "US Dollar Movements",
    icon: <Globe className="w-6 h-6 text-trading-green" />,
    desc: "Because gold is priced in dollars, the DXY and broader dollar trends have a direct influence on how support and resistance levels behave. A surging dollar can overwhelm gold support levels that appeared solid. A weakening dollar can push gold through resistance with relative ease. Monitoring the dollar alongside gold provides important context for interpreting level reactions.",
  },
  {
    title: "Treasury Yields",
    icon: <LineChart className="w-6 h-6 text-purple-400" />,
    desc: "Rising US Treasury yields, particularly the 10-year yield, can weaken gold support as the appeal of yield-bearing assets increases. Falling yields can strengthen gold support and help price break through resistance. Yield movements often correlate with gold movements in an inverse fashion, making them a valuable context tool when analyzing gold levels.",
  },
  {
    title: "Geopolitical Events",
    icon: <AlertOctagon className="w-6 h-6 text-trading-red" />,
    desc: "Armed conflicts, sanctions, trade disputes, and political crises can cause gold to surge through multiple resistance levels in a single session as safe-haven buying intensifies. These events are difficult to predict and can override technical analysis entirely. A geopolitical shock may transform what appeared to be strong resistance into a minor speed bump.",
  },
  {
    title: "Risk Sentiment",
    icon: <TrendingDown className="w-6 h-6 text-trading-gold" />,
    desc: "During risk-off periods, when equity markets are falling and investor confidence is low, gold often benefits from capital flows seeking safety. This can strengthen support and weaken resistance across multiple levels. During risk-on periods, the opposite can occur as capital rotates toward higher-yielding assets. Understanding the current risk environment helps explain why a level might hold in one session and fail in another.",
  },
];

const commonMistakes = [
  {
    title: "Drawing Too Many Levels",
    icon: <Layers className="w-5 h-5 text-trading-red" />,
    desc: "Marking every minor swing high and low clutters the chart and makes it difficult to identify which levels actually matter. Focus on the most significant reactions, the ones that produced clear directional moves. A clean chart with five to eight well-chosen zones is usually more useful than one covered in twenty lines.",
  },
  {
    title: "Treating Every Minor Swing as Important",
    icon: <Activity className="w-5 h-5 text-trading-red" />,
    desc: "Not every peak or valley on the chart represents a meaningful support or resistance level. Minor swings within a consolidation range, or during low-volatility periods, often carry little significance. The key is to distinguish between levels that caused a genuine market reaction and those that simply happened to be a local high or low.",
  },
  {
    title: "Using Exact Lines Instead of Zones",
    icon: <Crosshair className="w-5 h-5 text-trading-red" />,
    desc: "Marking support and resistance as exact price lines can lead to frustration when price overshoots the level by a few dollars before reversing. Using zones that account for wicks and candle ranges provides more realistic expectations and reduces the temptation to make hasty decisions based on small price movements.",
  },
  {
    title: "Ignoring Higher Timeframes",
    icon: <Clock className="w-5 h-5 text-trading-red" />,
    desc: "A support or resistance level identified on a 5-minute chart means very little if the daily chart shows price is about to reach a much more significant zone. Higher timeframes carry more weight because they represent the collective decisions of more market participants over a longer period. Always check the higher-timeframe context before acting on a lower-timeframe level.",
  },
  {
    title: "Trading Every Touch",
    icon: <Zap className="w-5 h-5 text-trading-red" />,
    desc: "Just because price reaches a support or resistance zone does not mean a trade should be taken. Some touches occur in poor context: against the trend, during low-volatility periods, or right before a major news event. Selective trading based on confluence and context generally produces better outcomes than trading every single touch.",
  },
  {
    title: "Assuming Every Breakout Is Real",
    icon: <AlertTriangle className="w-5 h-5 text-trading-red" />,
    desc: "False breakouts are common on XAUUSD. Price may briefly pierce a level and then reverse, trapping traders who entered on the initial break. Waiting for confirmation, such as a close beyond the level or a successful retest, helps filter out some false signals, though it may also mean entering at a less favorable price.",
  },
  {
    title: "Ignoring Economic News",
    icon: <Globe className="w-5 h-5 text-trading-red" />,
    desc: "A technically perfect setup at a major support zone can be invalidated instantly by a surprise economic release or central bank decision. Checking the economic calendar should be part of every analysis routine. If a high-impact event is imminent, it may be prudent to wait until after the release when the market has digested the information.",
  },
  {
    title: "Chasing Price",
    icon: <TrendingUp className="w-5 h-5 text-trading-red" />,
    desc: "When price breaks through a resistance level and moves quickly higher, the temptation to chase the move can be strong. However, chasing often means entering at an unfavorable price with a poor risk/reward ratio. Waiting for a pullback or retest of the broken level generally offers a better balance between entry price and risk.",
  },
  {
    title: "Using Excessive Leverage",
    icon: <AlertOctagon className="w-5 h-5 text-trading-red" />,
    desc: "High leverage amplifies the impact of every adverse move. On XAUUSD, where volatility around key levels can be significant, excessive leverage can turn a normal pullback into a catastrophic loss. Many experienced gold traders use far less leverage than what brokers offer.",
  },
  {
    title: "Moving Stop-Losses Emotionally",
    icon: <Eye className="w-5 h-5 text-trading-red" />,
    desc: "When price approaches your stop-loss, the temptation to move it further away in hopes of a reversal can be strong. However, this undermines the entire risk management framework that was established before the trade. If the invalidation level was defined logically before entry, it should not be changed based on emotion during the trade.",
  },
];

const riskPoints = [
  {
    title: "Stop-Loss Planning",
    icon: <ShieldCheck className="w-6 h-6 text-trading-green" />,
    desc: "A stop-loss should be placed at a level that represents genuine invalidation of your trade idea. For a long trade at support, this might be just below the support zone. For a short trade at resistance, just above the resistance zone. The stop should be based on market structure, not on an arbitrary number of pips or a fixed percentage.",
  },
  {
    title: "Position Sizing",
    icon: <Target className="w-6 h-6 text-trading-gold" />,
    desc: "Position size should be calculated based on your account size, risk tolerance, and the distance to your stop-loss. Risking a consistent small percentage per trade ensures that no single loss can severely damage your account. On wider stops, take a smaller position. On tighter stops, a slightly larger one, keeping the dollar risk consistent.",
  },
  {
    title: "Risk/Reward",
    icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
    desc: "Compare the distance to your stop-loss (risk) against the distance to a logical profit target (reward). On XAUUSD, clear support and resistance zones can help define both sides of this equation. A trade where the potential reward meaningfully exceeds the risk generally offers a better foundation than one where the risk is disproportionate to the potential gain.",
  },
  {
    title: "Leverage",
    icon: <AlertTriangle className="w-6 h-6 text-trading-red" />,
    desc: "Leverage amplifies both gains and losses equally. A 1% adverse move on gold with 100:1 leverage results in a 100% loss of the allocated margin. On an instrument as volatile as XAUUSD, many professional traders use relatively conservative leverage, understanding that capital preservation matters more than short-term returns.",
  },
  {
    title: "Volatility",
    icon: <Activity className="w-6 h-6 text-trading-gold" />,
    desc: "Gold can move hundreds of dollars per ounce in a single session, especially around economic events. During high-volatility periods, wider stops may be necessary, and position sizes should be reduced to account for the increased risk of large adverse moves. Volatility is not constant, and your risk management should adapt to current conditions.",
  },
  {
    title: "Trading Plan",
    icon: <BookOpen className="w-6 h-6 text-trading-green" />,
    desc: "A written trading plan defines what you trade, when you trade, how you manage risk, and how you handle both winning and losing trades. Having a plan removes emotional decision-making and provides a consistent framework. Without one, traders are more likely to make impulsive decisions based on fear, greed, or frustration.",
  },
  {
    title: "Maximum Acceptable Risk",
    icon: <AlertOctagon className="w-6 h-6 text-trading-red" />,
    desc: "Define a maximum amount of capital you are willing to lose in a single day, week, or month before stopping. This could be a percentage of your account or a fixed dollar amount. When that limit is reached, stepping away from the charts prevents emotional revenge trading and allows you to return with a clearer mindset.",
  },
  {
    title: "Emotional Discipline",
    icon: <Eye className="w-6 h-6 text-purple-400" />,
    desc: "Emotional reactions, including fear of missing out, frustration after losses, and overconfidence after wins, are among the biggest challenges in trading. Developing discipline involves recognizing these impulses, having rules in place to manage them, and being willing to step away when emotions are running high. This is an ongoing process that improves with experience and self-awareness.",
  },
];

const faqs = [
  {
    q: "What is support and resistance in XAUUSD?",
    a: "Support refers to a price area where buying interest has historically been strong enough to slow or halt a decline, while resistance refers to an area where selling pressure has slowed or reversed an upward move. On XAUUSD, these areas are typically identified at previous swing lows (support) and swing highs (resistance), as well as at psychological round numbers and consolidation zones. They represent zones where market participants have shown a willingness to act, rather than guaranteed turning points.",
  },
  {
    q: "How do I find support and resistance on XAUUSD?",
    a: "Start on a higher timeframe such as the daily or weekly chart and identify the most significant swing highs and swing lows. Look for areas where price has reacted multiple times, as repeated touches increase the significance of a level. Mark zones rather than exact single prices, and then drop to lower timeframes to study how price behaves around those zones in more detail. Checking whether a level is still relevant to the current market structure is also important.",
  },
  {
    q: "What is the difference between a support level and a support zone?",
    a: "A support level is a single specific price, while a support zone covers a small range of prices. In practice, price rarely reverses at an exact pip. A zone-based approach accounts for wicks, closes, and consolidation ranges, giving price room to react within a broader area. For example, if price bounced off a general area spanning five to ten dollars on three separate occasions, the entire range forms the support zone rather than a single line.",
  },
  {
    q: "Can XAUUSD support become resistance?",
    a: "Yes. When price breaks below a significant support zone and moves away, that former support area can sometimes become new resistance if price returns to it. The same principle applies in reverse: former resistance can become support after a confirmed bullish breakout. This is called role reversal. Not every breakout produces a role reversal, but when one does occur, it often provides a meaningful reference point because the area has significance to both the buyers and sellers who were previously active there.",
  },
  {
    q: "How should beginners use support and resistance?",
    a: "Beginners should focus on identifying the most obvious levels on higher timeframes, such as the daily chart, rather than trying to mark every minor level. It is more effective to identify a few significant zones where price has reacted multiple times than to draw many lines at every peak and valley. Combining support and resistance with an understanding of the broader trend, and waiting to see how price actually behaves when it reaches a zone, provides a more reliable approach than reacting to levels in isolation.",
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
export default function XauusdSupportResistancePage() {
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
              <span className="text-foreground">XAUUSD Support and </span>
              <span className="text-trading-gold text-glow-gold">Resistance</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Support and resistance are two of the most foundational concepts in
              technical analysis. A support zone is a price area where buying
              interest has historically been strong enough to halt a decline. A
              resistance zone is where selling pressure has been sufficient to
              stop an advance. On XAUUSD, identifying these levels helps traders
              understand where price may react, plan entries and exits, and
              define risk. This guide explains how to find, interpret, and apply
              support and resistance when analyzing gold.
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

        {/* WHAT IS SUPPORT? */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-trading-gold text-glow-gold">What Is Support?</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                A support zone is a price area on the chart where buying interest
                has historically been strong enough to slow or reverse a
                downward move. When gold falls toward a support zone, the
                expectation is not that it will automatically bounce, but rather
                that the probability of a reaction increases compared to areas
                with no historical significance. Think of it as a region where
                buyers have previously shown up in meaningful numbers.
              </p>
              <p>
                The most common way to identify support on XAUUSD is by looking
                at previous swing lows. A swing low is a valley on the chart where
                price declined and then reversed higher. When multiple swing lows
                form in roughly the same price area over time, that area becomes a
                clearly identifiable support zone. Each time price pulls back to
                that zone and reacts, it reinforces the idea that buyers are
                active there.
              </p>
              <p>
                Previous reaction zones also serve as support. These are areas
                where price slowed down, consolidated, or showed visible
                rejection (such as long lower wicks) even if it did not produce a
                dramatic reversal. A zone where price has reacted multiple times,
                even if the reactions were modest, can carry more significance
                than a single dramatic reversal at a level that has never been
                tested again.
              </p>
              <p>
                An important point that is often overlooked is that support is a
                zone rather than an exact price. Gold may overshoot a support
                area by several dollars before reversing, or it may reverse just
                above the zone without touching the exact level you marked. By
                thinking in terms of zones that span a small range, you account
                for this natural imprecision and avoid the frustration of seeing
                price stop just short of, or just past, a single line.
              </p>
              <p>
                Support can and does fail. When selling pressure is sufficient to
                push price through a support zone and close decisively below it,
                the support is said to have broken. A break of a significant
                support zone often leads to accelerated selling as traders who
                had been buying at that level now close their positions or reverse.
                This is why it is important not to assume that any support level
                will hold, and why defining an invalidation point below support is
                essential for risk management.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* WHAT IS RESISTANCE? */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-trading-gold text-glow-gold">What Is Resistance?</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                A resistance zone is a price area where selling pressure has
                historically been strong enough to slow or reverse an upward move.
                When gold rises toward a resistance zone, the expectation is that
                sellers may become more active, increasing the likelihood of a
                reaction compared to areas with no historical selling interest.
                Resistance represents a ceiling that price has struggled to move
                beyond in the past.
              </p>
              <p>
                The most common source of resistance on XAUUSD is previous swing
                highs. A swing high is a peak on the chart where price rose and
                then reversed lower. When gold approaches a prior swing high,
                traders watch to see whether sellers will appear at the same area
                again. A single test may be coincidental, but when price has
                reversed at the same general level multiple times, the resistance
                zone becomes more significant.
              </p>
              <p>
                Previous reaction areas above the current price also serve as
                potential resistance. These might include areas where price
                previously consolidated before breaking out, zones that produced
                long upper wicks showing selling interest, or levels where price
                stalled before declining. The more times price has reacted at a
                given area, the more market participants are likely to be aware
                of it, which can create a self-reinforcing effect.
              </p>
              <p>
                Like support, resistance is a zone, not a precise line. Price may
                approach a resistance area, overshoot it briefly by a few dollars,
                and then reverse. Or it may reverse just before reaching the exact
                level. Marking a zone that covers the range of previous reactions
                accounts for this behavior and provides more realistic
                expectations than a single horizontal line.
              </p>
              <p>
                No resistance level is guaranteed to hold. When buying pressure is
                strong enough to push price through a resistance zone and close
                decisively above it, the resistance breaks. A breakout above a
                significant resistance level often leads to accelerated buying as
                short-sellers cover their positions and new buyers enter the
                market. Understanding that resistance can break is crucial
                because it prevents traders from blindly selling at every
                resistance touch without considering the broader context.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* HOW TO FIND XAUUSD SUPPORT AND RESISTANCE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">How to Find </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD Support and Resistance</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                A practical step-by-step process for identifying key levels on the
                gold chart.
              </p>
            </div>

            <div className="space-y-6">
              {findSteps.map((item) => (
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

        {/* SWING HIGHS AND SWING LOWS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-trading-gold text-glow-gold">How Swing Highs and Lows Reveal Key Levels</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
              <p>
                Swing highs and swing lows are the building blocks of support
                and resistance identification. A swing high is a point on the
                chart where price rose and then turned lower, creating a
                visible peak. A swing low is where price fell and then turned
                higher, creating a visible valley. These points represent
                moments when the balance between buyers and sellers shifted, at
                least temporarily, in one direction.
              </p>
              <p>
                The relationship between consecutive swings defines market
                structure. In an uptrend, you see higher highs and higher lows:
                each peak is higher than the last, and each valley is higher than
                the last. In a downtrend, lower highs and lower lows appear. When
                the pattern is mixed, the market may be ranging or transitioning.
                These structural relationships help traders identify which swing
                points are most significant and whether the overall trend
                supports or contradicts the signal from a particular level.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {swingConcepts.map((item) => (
                <FadeIn key={item.term}>
                  <div className="glass rounded-2xl p-6 h-full">
                    <h3 className={`text-lg font-bold mb-3 ${item.color}`}>
                      {item.term}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="mt-12 space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                As a simple hypothetical example, imagine gold on the daily chart
                makes a swing low at $2,050, then rises to a swing high at
                $2,150, pulls back to a higher low at $2,080, and then pushes to
                a higher high at $2,200. The swing low at $2,080 is a higher
                low, confirming bullish structure. If price later pulls back to
                the $2,080 area again, that higher low now serves as a potential
                support zone because it was a significant structural point in the
                uptrend. Conversely, the swing high at $2,150 could act as
                resistance on a pullback because it was a point where sellers
                previously became active.
              </p>
              <p>
                This example uses hypothetical prices for illustration only and
                does not represent any actual market situation. The principles
                apply regardless of the specific price levels involved.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SUPPORT AND RESISTANCE ZONES */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-trading-gold text-glow-gold">Understanding Support and Resistance Zones</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                One of the most common mistakes traders make is treating support
                and resistance as exact single-price lines. In practice, zones are
                almost always more useful because markets do not reverse at a
                precise pip. Price may overshoot, undershoot, or wick through a
                level before committing to a direction. A zone-based approach
                accounts for this natural imprecision.
              </p>
              <p>
                <span className="text-foreground font-semibold">Multiple reactions</span> help
                define the boundaries of a zone. If price has bounced off a
                general area three different times, and the bounces occurred
                across a range of, say, five to ten dollars, then that entire
                range forms the zone. The upper and lower boundaries are defined
                by the extremes of the reactions. Price may react anywhere
                within that range, not necessarily at the middle.
              </p>
              <p>
                <span className="text-foreground font-semibold">Wick areas</span> are
                particularly useful for defining zones. The wicks (shadows) of
                candles at a level show how far price traveled before reversing.
                If multiple candles at a support zone have long lower wicks
                extending to roughly the same area, the zone should encompass the
                range of those wicks. The wicks represent the maximum extent of
                selling pressure before buyers responded.
              </p>
              <p>
                <span className="text-foreground font-semibold">Closing prices</span> matter
                because they show where price settled at the end of the period.
                A candle that closes near the low of its range suggests sellers
                retained control. A candle that closes well above its low after
                touching support suggests buyers stepped in. When multiple
                candle closes cluster at a similar price, that area may be more
                significant than areas where price only touched via wicks.
              </p>
              <p>
                <span className="text-foreground font-semibold">Consolidation zones</span> occur
                when price moves sideways within a range for an extended period.
                The top of the consolidation becomes resistance and the bottom
                becomes support. When price eventually breaks out of the
                consolidation, the entire zone remains relevant because traders
                remember where price spent time and may watch for a retest.
              </p>
              <p>
                <span className="text-foreground font-semibold">Strong rejection areas</span> are
                zones where price was pushed away sharply, often visible as
                candles with very long wicks or large reversal bodies. The more
                decisive the rejection, the more likely traders are to remember
                the level and watch for future reactions. A zone that produced a
                sharp rejection carries more weight than one where price simply
                drifted away slowly.
              </p>
              <p>
                <span className="text-foreground font-semibold">Breakout areas</span> can also
                become zones. When price breaks through a level and then
                retests it, the area around the old level becomes a new zone.
                The exact point of the breakout, the retest candles, and the
                surrounding price behavior all contribute to defining the zone's
                boundaries.
              </p>
              <p className="glass rounded-2xl p-6 border border-trading-gold/20">
                <span className="text-trading-gold font-semibold">Key point:</span> Price
                can move through part of a zone without invalidating the entire
                concept. If the upper portion of a support zone is briefly
                pierced but price reverses from the middle or lower portion, the
                zone still functioned. Zones are approximate areas, not
                all-or-nothing lines.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ROLE REVERSAL */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">When Support </span>
                <span className="text-trading-gold text-glow-gold">Becomes Resistance</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Role reversal is one of the most well-known concepts in support
                and resistance analysis. The idea is straightforward: when a
                significant support level breaks and price closes below it, that
                old support often becomes new resistance. The logic is that
                traders who were buying at that support level may now look to
                sell there if price returns, attempting to recover losses or
                exit positions that are now losing. Similarly, new traders who
                missed the initial breakdown may see the retest as an opportunity
                to sell at the level that previously represented a floor.
              </p>
              <p>
                The same principle works in reverse. When a significant
                resistance level breaks and price closes above it, that old
                resistance often becomes new support. Traders who were selling at
                that resistance may now look to buy there if price returns, and
                new traders may see the retest as a second chance to enter long
                positions at the broken level. The retest is an important part of
                this process because it provides visible evidence that the level
                is now acting in its new role.
              </p>
              <p>
                As a hypothetical example, imagine XAUUSD has a well-established
                support zone around $2,100. Price has bounced off this area three
                times over the past two months. Then, during a period of strong
                dollar strength and rising yields, price breaks below $2,100 and
                closes the daily candle well below the zone. In the following
                weeks, price rallies back toward $2,100. Traders who had been
                buying at $2,100 may now look to sell there, and new sellers may
                also appear. The old support at $2,100 now acts as resistance.
                Whether it actually holds as resistance depends on the market
                conditions at the time of the retest.
              </p>
              <p className="glass rounded-2xl p-6 border border-trading-gold/20">
                <span className="text-trading-gold font-semibold">Important:</span> Role
                reversal is a concept that describes common market behavior, not a
                guaranteed setup. Not every broken support level becomes effective
                resistance, and not every broken resistance level becomes effective
                support. The significance of the original level, the manner of the
                break, and the market context at the time of the retest all
                influence whether role reversal actually occurs.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* BREAKOUTS AND FALSE BREAKOUTS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-trading-gold text-glow-gold">Breakouts and False Breakouts</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                A breakout occurs when price moves beyond a defined support or
                resistance level. The initial break may generate excitement,
                particularly if it happens with momentum, but not every breakout
                is genuine. On XAUUSD, where volatility is substantial and
                stop-loss clusters accumulate around key levels, false breakouts
                are relatively common and deserve careful attention.
              </p>
              <p>
                <span className="text-foreground font-semibold">Retest and confirmation</span> are
                the process that separates a potential breakout from a confirmed
                one. After the initial break, price often returns to the broken
                level to test it. If the old resistance now holds as support (in a
                bullish breakout) or the old support now holds as resistance (in a
                bearish breakout), the breakout is considered more confirmed. A
                successful retest suggests that the market has accepted the new
                level and that the breakout was driven by genuine conviction rather
                than a temporary spike.
              </p>
              <p>
                <span className="text-foreground font-semibold">A false breakout</span> (also
                called a failed breakout or trap) happens when price moves beyond a
                level but then quickly reverses back inside the previous range. On
                the chart, this often appears as a candle with a long wick
                extending beyond the level, followed by price moving decisively in
                the opposite direction. False breakouts on gold can be particularly
                sharp because the stop-losses of traders who entered on the
                initial break can accelerate the reversal when they are triggered.
              </p>
              <p>
                <span className="text-foreground font-semibold">Breakout failure</span> refers
                to the broader situation where a breakout initially looks
                convincing but ultimately does not follow through. Price may close
                beyond a level on one candle, only to reverse back below it on the
                next. Or price may push beyond a level, retest it successfully,
                and then still fail to continue in the breakout direction. These
                failures remind traders that a breakout is an event, not a
                prediction, and that subsequent price behavior must be monitored
                to determine whether the breakout was genuine.
              </p>
              <p>
                The key takeaway is that traders should avoid assuming every move
                through a level is a confirmed breakout. Waiting for price
                behavior, such as a close beyond the level, a retest that holds, or
                continued momentum in the breakout direction, provides additional
                evidence. Context matters: a breakout during a major news event
                may behave differently from one during a quiet market. Patience
                and observation at the level generally provide more information
                than reacting to the initial break.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* MULTIPLE TIMEFRAME ANALYSIS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-trading-gold text-glow-gold">Using Multiple Timeframes to Confirm Key Levels</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
              <p>
                Support and resistance can be studied across multiple timeframes
                to build a more complete picture. A level that is significant on
                the daily chart carries different weight than one that only
                appears on a 15-minute chart. Higher timeframes represent the
                decisions of more market participants over longer periods, which
                tends to produce more significant and more reliable levels. Lower
                timeframes provide detail about how price behaves around those
                levels but should not be used to establish the levels themselves.
              </p>
              <p>
                A practical framework for multiple-timeframe support and resistance
                analysis on XAUUSD:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    Use the daily or weekly chart to identify the major support
                    and resistance zones. These are the levels that define the
                    broader playing field. A zone that has caused multiple
                    reactions on the daily chart is likely being watched by
                    institutional participants and tends to carry the most
                    significance for future price behavior.
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
                    Move to the 4-hour or 1-hour chart to study market structure
                    and how price has been reacting to the major zones. Look for
                    swing points, consolidation patterns, and candlestick
                    reactions at or near the levels identified on the higher
                    timeframe. This helps refine your understanding of each
                    zone's strength and current relevance.
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
                    Use the 15-minute or 5-minute chart to study detailed price
                    behavior as price approaches a major zone. Look for specific
                    candlestick patterns, momentum shifts, and entry signals.
                    The lower timeframe is for precision and timing, not for
                    identifying new levels. It shows how price is behaving right
                    now around the zones you have already identified.
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="mt-12 glass rounded-2xl p-6 border border-trading-gold/20">
              <p className="text-base text-muted-foreground leading-relaxed">
                <span className="text-trading-gold font-semibold">Note:</span> Different
                timeframes can produce different support and resistance levels, and
                that is normal. A level on the 15-minute chart may not be visible
                on the daily chart, and vice versa. Higher-timeframe zones
                generally carry more context and should take priority when there
                is a conflict. The purpose of multiple timeframe analysis is to
                add depth to your reading, not to find perfect alignment between
                every timeframe.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* PSYCHOLOGICAL LEVELS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-trading-gold text-glow-gold">Psychological Levels</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Psychological levels are round-number price areas that can
                influence trading behavior simply because many traders are aware
                of them. On XAUUSD, levels like $2,000, $2,100, $2,200, $2,500,
                and $3,000 are examples of round numbers that may attract
                attention from a large number of market participants. These
                levels do not have any inherent technical significance, but they
                can become significant because of the collective behavior they
                trigger.
              </p>
              <p>
                The reason psychological levels can matter is that traders and
                algorithms often place orders, stop-losses, and take-profit targets
                at round numbers. A large cluster of stop-loss orders just below
                $2,000, for example, can create a cascade of selling if that
                level is breached. Similarly, take-profit orders clustered at
                $2,200 can create selling pressure as price approaches that
                level, potentially causing a temporary reaction even if there is
                no other technical reason for resistance there.
              </p>
              <p>
                Psychological levels can also coincide with actual technical
                levels, creating a confluence zone that is more significant than
                either factor alone. If a round number like $2,000 also happens
                to be near a previous swing low or a major moving average, the
                combined effect can make that area particularly important.
                Traders who are already watching the round number for
                psychological reasons may be joined by those watching it for
                technical reasons, resulting in a stronger collective reaction.
              </p>
              <p className="glass rounded-2xl p-6 border border-trading-gold/20">
                <span className="text-trading-gold font-semibold">Caution:</span> Psychological
                levels should not be treated as guaranteed support or resistance.
                Price can and does move through round numbers without any
                meaningful reaction, particularly when a strong fundamental
                catalyst is driving the market. These levels are one factor to
                consider among many, not standalone trading signals.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* PRICE ACTION AROUND KEY LEVELS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">How to Read XAUUSD </span>
                <span className="text-trading-gold text-glow-gold">Price Action Around Key Levels</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
              <p>
                The way price behaves as it approaches and reaches a support or
                resistance zone provides valuable information. No single pattern
                guarantees direction, but certain behaviors are commonly observed
                around key levels on XAUUSD. The context in which these patterns
                appear, including the trend, the timeframe, and the economic
                environment, determines their significance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {priceActionObservations.map((item) => (
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
                <span className="text-trading-gold font-semibold">Context is
                everything.</span> A rejection wick at a major daily support zone in an
                uptrend is a very different observation from the same wick forming
                in the middle of a range with no clear trend. No single candlestick
                pattern or price behavior at a level guarantees any particular
                direction. Always consider the broader picture before drawing
                conclusions from price action at a single level.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ECONOMIC EVENTS AND GOLD */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">How Economic Events Affect </span>
                <span className="text-trading-gold text-glow-gold">Gold's Key Levels</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
              <p>
                XAUUSD support and resistance levels do not exist in a vacuum.
                Major economic events can cause gold to move through technical
                levels with surprising speed and force. A support zone that has
                held for weeks can be breached in a single candle if the
                catalyst is strong enough. Understanding which events have the
                potential to override technical levels helps traders know when
                to exercise additional caution.
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

            <div className="mt-12 glass rounded-2xl p-6 border border-trading-red/30">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="text-trading-red font-semibold">Reminder:</span>{" "}
                Major news events can cause rapid and substantial XAUUSD price
                movements that temporarily invalidate technical levels. Traders
                should always check the economic calendar and consider adjusting
                their approach around high-impact events.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* HYPOTHETICAL EXAMPLE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Hypothetical </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD Example</span>
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
                  Imagine XAUUSD on the daily chart has been ranging between
                  roughly $2,320 and $2,400 for several weeks. Price has bounced
                  off the $2,320 area three times and has been rejected from the
                  $2,400 area twice. These repeated reactions have created a
                  clearly identifiable support zone around $2,320 and a
                  resistance zone around $2,400.
                </p>
                <p>
                  <span className="text-foreground font-semibold">How the zone was identified:</span>{" "}
                  The support zone at $2,320 was identified by observing three
                  separate swing lows where price declined toward that area and
                  then reversed higher. The reversals were not identical: one
                  produced a long lower wick, one showed a bullish engulfing
                  candle, and one was a more gradual shift from selling to buying.
                  Despite the different forms, all three reactions occurred in the
                  same general price area, confirming it as a significant zone.
                </p>
                <p>
                  <span className="text-foreground font-semibold">What a breakout could mean:</span>{" "}
                  If price closes decisively above the $2,400 resistance zone on
                  the daily chart, the range may be ending. The old resistance at
                  $2,400 could become new support, and traders might watch for a
                  retest of that level. However, a breakout alone does not
                  guarantee continued upward movement. A failed breakout above
                  $2,400, where price quickly reverses back below the zone,
                  would suggest that sellers remain in control of the range.
                </p>
                <p>
                  <span className="text-foreground font-semibold">What a retest could look like:</span>{" "}
                  After a breakout above $2,400, price might pull back toward that
                  level in the following days. If the pullback finds buyers at or
                  near $2,400 and reverses higher, the retest has held. The old
                  resistance is now acting as support. If, however, price falls
                  back below $2,400 and closes there, the breakout has failed,
                  and the range may resume.
                </p>
                <p>
                  <span className="text-foreground font-semibold">Why confirmation matters:</span>{" "}
                  A single candle breaking through a level provides limited
                  information. Waiting for a daily close beyond the level, and
                  ideally a retest, provides more evidence that the market has
                  genuinely accepted the new price relationship. Confirmation
                  does not eliminate risk, but it filters out some of the noise
                  and false signals that are common on gold.
                </p>
                <p>
                  <span className="text-trading-red font-semibold">This example is NOT a prediction.</span>{" "}
                  The price levels used are entirely hypothetical and do not
                  represent any actual or current market situation. No past
                  example guarantees how price will behave in the future.
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
                <span className="text-foreground">Common XAUUSD Support and Resistance </span>
                <span className="text-trading-gold text-glow-gold">Mistakes</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
              <p>
                Being aware of these common errors can help traders develop more
                disciplined and effective habits when working with support and
                resistance on gold.
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
                Risk management is the foundation of every trading decision.
                No understanding of support and resistance can protect a trader
                who does not manage risk properly. On XAUUSD, where volatility
                can be substantial, this is particularly important.
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
                future results. The information on Forex Wizard is provided for
                educational and informational purposes only and should not be
                considered personalized financial advice.
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

        {/* HOW THIS FITS INTO XAUUSD ANALYSIS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">How This Fits Into </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD Analysis</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Support and resistance are one component of a broader analytical
                framework. Used alone, they provide useful reference points, but
                their effectiveness increases significantly when combined with
                other forms of analysis. Market structure tells you whether the
                trend supports a long or short bias at a given level. Price
                action tells you how price is behaving as it approaches a zone.
                Economic awareness tells you whether a major event might override
                the technical picture. Each of these layers adds context.
              </p>
              <p>
                For a more comprehensive view of gold analysis, including market
                structure, trend analysis, and the economic factors that drive
                XAUUSD, you can explore the{" "}
                <Link
                  href="/xauusd-analysis/"
                  className="text-trading-gold hover:text-trading-gold/80 font-semibold transition-colors no-underline"
                >
                  XAUUSD analysis
                </Link>{" "}
                hub on Forex Wizard. To go deeper into reading raw price movement
                on the chart, including candlestick patterns and momentum, see
                our guide on{" "}
                <Link
                  href="/how-to-read-xauusd-price-action/"
                  className="text-trading-gold hover:text-trading-gold/80 font-semibold transition-colors no-underline"
                >
                  how to read XAUUSD price action
                </Link>
                . Combining support and resistance identification with these
                broader analytical skills provides a more well-rounded approach
                to studying gold markets.
              </p>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              <FadeIn delay={0.1}>
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
                    Learn how to build a structured XAUUSD trading strategy
                    using support, resistance, and price action.
                  </p>
                </Link>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Link
                  href="/how-to-read-xauusd-price-action/"
                  className="glass rounded-2xl p-6 block h-full hover:border-trading-gold/30 border border-transparent transition-all duration-300 no-underline group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <LineChart className="w-6 h-6 text-trading-gold" />
                    <h3 className="text-lg font-bold text-foreground group-hover:text-trading-gold transition-colors">
                      How to Read XAUUSD Price Action
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Learn how to read gold price action using market structure,
                    candlesticks, trends, and multiple timeframes.
                  </p>
                </Link>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Link
                  href="/gold-signals/"
                  className="glass rounded-2xl p-6 block h-full hover:border-trading-green/30 border border-transparent transition-all duration-300 no-underline group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="w-6 h-6 text-trading-green" />
                    <h3 className="text-lg font-bold text-foreground group-hover:text-trading-green transition-colors">
                      Gold Trading Signals
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Learn about gold trading signals and how Forex Wizard
                    approaches sharing XAUUSD analysis with the community.
                  </p>
                </Link>
              </FadeIn>
              <FadeIn delay={0.3}>
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
              <FadeIn delay={0.4}>
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
        <footer className="py-10 px-4 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Forex Wizard &mdash; Free Forex &amp; Gold Trading Signals Community
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
              <Link
                href="/gold-signals/"
                className="text-xs text-muted-foreground/40 hover:text-trading-green transition-colors no-underline"
              >
                Gold Signals
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
        label="Join Forex Wizard on Telegram"
      />
    </>
  );
}