import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp, BarChart3, AlertTriangle, ArrowRight, MessageCircle,
  Target, Crosshair, Layers, Activity, BookOpen, LineChart,
  ArrowDownRight, ArrowUpRight, Globe, Zap, TrendingDown,
  Eye, ShieldCheck, Clock, Gauge, DollarSign, Calculator,
  Calendar, ListChecks, XCircle, Lightbulb, Scale,
  AlertOctagon, Pause, Info, SquareStack,
} from "lucide-react";
import {
  FadeSection, FadeIn, HeroAnimation, StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";

export const metadata: Metadata = {
  title: "XAUUSD Lot Size | How to Calculate Gold Position Size",
  description: "Learn how XAUUSD lot size works, how to calculate gold position size, understand contract size, leverage, stop distance and risk before placing a trade.",
  alternates: { canonical: "https://forexwizard.online/xauusd-lot-size/" },
  openGraph: {
    title: "XAUUSD Lot Size | How to Calculate Gold Position Size",
    description: "Learn how XAUUSD lot size works, how to calculate gold position size, understand contract size, leverage, stop distance and risk before placing a trade.",
    type: "article",
    url: "https://forexwizard.online/xauusd-lot-size/",
    siteName: "Forex Wizard",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Forex Wizard - Free Forex & Gold Trading Telegram Community" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "XAUUSD Lot Size | How to Calculate Gold Position Size",
    description: "Learn how XAUUSD lot size works, how to calculate gold position size, understand contract size, leverage, stop distance and risk before placing a trade.",
    images: ["/og-image.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

function TelegramCTA({ text, variant = "primary", className = "" }: { text: string; variant?: "primary" | "secondary" | "gold"; className?: string }) {
  const base = "inline-flex items-center justify-center gap-2 font-bold text-base md:text-lg rounded-xl px-6 py-3.5 md:px-8 md:py-4 transition-all duration-300 cursor-pointer no-underline select-none";
  const variants: Record<string, string> = {
    primary: "bg-trading-green text-trading-dark glow-green hover:scale-105 hover:shadow-[0_0_30px_rgba(0,230,118,0.6)] active:scale-95",
    secondary: "glass-strong text-trading-green border border-trading-green/30 hover:bg-trading-green/10 hover:scale-105 active:scale-95",
    gold: "bg-trading-gold text-trading-dark glow-gold hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,64,0.6)] active:scale-95",
  };
  return (
    <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className={`${base} ${variants[variant]} ${className}`}>
      <MessageCircle className="w-5 h-5" />{text}<ArrowRight className="w-4 h-4" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  DATA                                                              */
/* ------------------------------------------------------------------ */

const specChecklist = [
  { label: "Contract Size", desc: "The number of troy ounces (or other unit) that one lot represents. This is the most fundamental specification and varies between brokers." },
  { label: "Minimum Volume", desc: "The smallest lot size your broker allows you to trade. This determines the minimum exposure you can take on a single XAUUSD position." },
  { label: "Maximum Volume", desc: "The largest lot size permitted per trade. Exceeding this will result in the order being rejected." },
  { label: "Volume Step", desc: "The increment by which lot size can be adjusted. For example, a step of 0.01 means you can trade 0.01, 0.02, 0.03 and so on, but not 0.015." },
  { label: "Tick Size", desc: "The minimum price increment for the instrument. On some brokers this may be 0.01, on others 0.1 or another value. This affects how price movement translates into monetary loss or gain." },
  { label: "Tick Value", desc: "The monetary value of one tick of price movement for one lot. This is critical for calculating how much you stand to lose or gain per unit of price movement." },
];

const lotConcepts = [
  { title: "Standard Lot", desc: "In forex, a standard lot typically refers to 100,000 units of the base currency. For XAUUSD, many brokers define a standard lot using a contract size of 100 troy ounces of gold, but this is not universal. Some brokers may use different contract sizes. The term “standard” is a label, not a guarantee of what the contract represents. Always check your broker's symbol specification before trading.", icon: <SquareStack className="w-6 h-6 text-trading-gold" /> },
  { title: "Mini Lot", desc: "A mini lot is commonly understood as one-tenth of a standard lot. In XAUUSD terms, if a broker defines a standard lot as 100 ounces, a mini lot would represent 10 ounces. However, not all brokers offer a clearly labeled “mini” lot, and some may allow you to trade fractional volumes (such as 0.10 lots) without using the mini label. The key is to understand what volume you are actually trading in your broker's system.", icon: <Layers className="w-6 h-6 text-trading-gold" /> },
  { title: "Micro Lot", desc: "A micro lot is commonly understood as one-hundredth of a standard lot, or in XAUUSD terms, 1 troy ounce if the standard lot is 100 ounces. Many brokers allow trading at 0.01 lot increments, which can be useful for managing risk on smaller accounts. Again, the exact meaning depends on your broker's contract size. The term “micro” is a convention, not a standardized definition.", icon: <BarChart3 className="w-6 h-6 text-trading-gold" /> },
];

const whyMattersPoints = [
  { title: "Exposure", desc: "Lot size directly determines how much of the market you are exposed to. A larger lot means each pip of price movement has a greater financial impact on your account. Understanding this relationship is fundamental before placing any trade.", icon: <TrendingUp className="w-6 h-6 text-trading-gold" /> },
  { title: "Account Risk", desc: "The amount of money you can lose on a trade is a function of lot size, stop distance, and tick value. A larger lot size at the same stop distance means a larger potential loss. This is why position sizing must be calculated, not guessed.", icon: <AlertTriangle className="w-6 h-6 text-trading-red" /> },
  { title: "Stop-Loss Impact", desc: "For a given lot size, a wider stop-loss results in a larger monetary risk. For a given monetary risk, a wider stop requires a smaller lot size. Lot size and stop distance are linked and should always be considered together.", icon: <Target className="w-6 h-6 text-trading-gold" /> },
  { title: "Volatility", desc: "XAUUSD can move significantly in a short time, especially during active sessions or around economic events. An appropriately sized position accounts for the possibility of adverse moves. An oversized position can lead to rapid, outsized losses during volatile conditions.", icon: <Activity className="w-6 h-6 text-trading-gold" /> },
  { title: "Leverage and Margin", desc: "Leverage allows you to control a large position with a smaller margin deposit. While leverage does not change the market risk of the position, it determines how much of your own capital is required to hold it. High leverage makes it easy to take on disproportionately large positions relative to your account.", icon: <Gauge className="w-6 h-6 text-trading-gold" /> },
  { title: "Emotional Pressure", desc: "An oversized position creates psychological stress. When a large amount of money is at stake, traders are more likely to make impulsive decisions, move stop-losses, or exit trades prematurely. Proper position sizing helps maintain the emotional clarity needed to follow a trading plan.", icon: <Eye className="w-6 h-6 text-trading-gold" /> },
];

type DistinctionItem = { title: string; desc: string; icon: React.ReactNode };

const distinctions: DistinctionItem[] = [
  { title: "Lot Size", desc: "Lot size is the unit of volume you select when placing a trade through your broker's platform. It is the input you provide, and its meaning depends on what your broker defines as one lot. Two brokers may both use the label “1.00 lot” but represent different actual exposures if their contract sizes differ.", icon: <SquareStack className="w-6 h-6 text-trading-gold" /> },
  { title: "Contract Size", desc: "Contract size defines the real-world quantity that one lot represents. For XAUUSD, this is typically expressed in troy ounces. For example, a contract size of 100 means that one lot corresponds to 100 troy ounces of gold. Contract size is set by the broker and must be verified in the symbol specification.", icon: <Scale className="w-6 h-6 text-trading-gold" /> },
  { title: "Position Size / Exposure", desc: "Position size refers to the total market exposure of your trade, often expressed in monetary terms. It is a function of lot size, contract size, and the current price. Two traders with the same lot size but different contract sizes have different actual exposures.", icon: <TrendingUp className="w-6 h-6 text-trading-gold" /> },
  { title: "Margin", desc: "Margin is the amount of capital your broker requires you to hold in your account to maintain an open position. It is not the same as risk. Margin depends on leverage, lot size, and contract size. You can have a small margin requirement but a very large potential loss if the position moves against you.", icon: <DollarSign className="w-6 h-6 text-trading-gold" /> },
];

const calcChecklist = [
  { label: "Account Size", desc: "The total balance in your trading account. This is the starting point for determining how much you can reasonably risk on a single trade." },
  { label: "Maximum Planned Loss", desc: "The maximum amount of money you are willing to lose on this specific trade if your stop-loss is hit. This should be an amount you have decided on in advance." },
  { label: "Entry Price", desc: "The price at which you plan to enter the trade." },
  { label: "Stop-Loss Level", desc: "The price at which your stop-loss order will be placed. This defines the invalidation point of your trade idea." },
  { label: "Stop Distance", desc: "The difference between your entry price and your stop-loss level, expressed in price units. This is a key input for calculating position size." },
  { label: "Broker Contract Size", desc: "The number of troy ounces (or other unit) per lot as defined by your broker. This is essential for translating price movement into monetary terms." },
  { label: "Tick Size", desc: "The minimum price increment for the instrument at your broker. This affects how you calculate the monetary value of your stop distance." },
  { label: "Tick Value", desc: "The monetary value of one tick for one standard lot at your broker. This allows you to convert price movement into a dollar amount." },
  { label: "Account Currency", desc: "The currency your account is denominated in. If your account is not in USD, conversion between USD (in which XAUUSD is priced) and your account currency may be necessary." },
  { label: "Conversion Rate (if relevant)", desc: "If your account is in a currency other than USD, the current exchange rate between USD and your account currency. This affects the final position size calculation." },
];

const commonMistakes = [
  { title: "Choosing Lot Size Before Defining Risk", desc: "Some traders pick a lot size based on what “feels right” or what they can afford the margin for, then place a stop-loss afterward. The correct process is the opposite: define your maximum risk, set your stop based on the market structure, then calculate the lot size that fits those parameters.", icon: <XCircle className="w-6 h-6 text-trading-red" /> },
  { title: "Ignoring Stop Distance", desc: "A trader might use the same lot size on every trade regardless of whether the stop-loss is 20 pips away or 200 pips away. The stop distance directly affects how much money is at risk, so lot size must be adjusted accordingly for each trade.", icon: <Target className="w-6 h-6 text-trading-red" /> },
  { title: "Assuming All Brokers Use Identical Specifications", desc: "Contract sizes, tick values, and margin requirements vary between brokers. A lot size calculation that is correct for one broker may be wrong for another. Always use your own broker's specifications.", icon: <AlertOctagon className="w-6 h-6 text-trading-red" /> },
  { title: "Using Leverage to Justify Larger Positions", desc: "Some traders reason that because they have high leverage available, they can afford a larger lot size. Leverage reduces the margin required, not the actual market risk. A highly leveraged position can still result in a loss that exceeds the margin.", icon: <Gauge className="w-6 h-6 text-trading-red" /> },
  { title: "Copying Someone Else's Lot Size", desc: "Another trader's lot size is based on their account balance, risk tolerance, broker specifications, and stop distance — none of which may match yours. Copying their position size without adapting it to your own situation can lead to disproportionately large or small risk.", icon: <Eye className="w-6 h-6 text-trading-red" /> },
  { title: "Ignoring Account Currency Conversion", desc: "If your account is denominated in EUR, GBP, or another currency, the profit and loss on XAUUSD (which is priced in USD) will be affected by the exchange rate. Failing to account for this conversion can result in a position size that risks more or less than intended.", icon: <Globe className="w-6 h-6 text-trading-red" /> },
  { title: "Confusing Margin with Risk", desc: "Margin is the deposit required to hold a position. It is not the same as the amount you stand to lose. A trade might require only $50 in margin but carry a potential loss of $500. Position sizing should be based on the potential loss at your stop-loss, not on the margin.", icon: <DollarSign className="w-6 h-6 text-trading-red" /> },
  { title: "Increasing Lot Size After Losses", desc: "After a series of losses, some traders increase their lot size to try to recover quickly. This is a form of revenge trading and typically leads to even larger losses. Position sizing should be consistent and based on your predefined risk rules, not on emotional reactions to recent outcomes.", icon: <TrendingDown className="w-6 h-6 text-trading-red" /> },
  { title: "Risking More Because a Setup Looks Certain", desc: "No trade setup has a guaranteed outcome. Even the strongest-looking setup can lose. Increasing your lot size because you feel confident about a particular trade undermines the risk management principles that protect your account over time.", icon: <AlertTriangle className="w-6 h-6 text-trading-red" /> },
];

const planSteps = [
  { step: 1, title: "Analyze market conditions", desc: "Review the chart, identify the trend or range, mark key levels, and assess overall market context before thinking about position size." },
  { step: 2, title: "Identify a setup", desc: "Wait for a specific, pre-defined setup to form. This could be a pattern at a key level, a breakout confirmation, or any other condition your strategy defines." },
  { step: 3, title: "Define your entry", desc: "Determine the exact price (or conditional order) at which you would enter the trade." },
  { step: 4, title: "Define invalidation / stop-loss", desc: "Identify the price level at which your trade idea would be invalidated. Place your stop-loss at or beyond this level based on market structure, not an arbitrary distance." },
  { step: 5, title: "Decide maximum acceptable loss", desc: "Determine the maximum amount of money you are willing to lose on this trade. This should be a predetermined figure based on your overall risk management approach." },
  { step: 6, title: "Calculate position size", desc: "Using the information above — your maximum loss, stop distance, and broker specifications — calculate the lot size that limits your risk to the predetermined amount. This is where understanding XAUUSD lot size becomes practical." },
];

const volSessionPoints = [
  { title: "Increased Volatility", desc: "During the London-New York overlap, XAUUSD can experience larger price swings than during quieter sessions. The same lot size that seems manageable during the Asian session may produce larger-than-expected fluctuations during the overlap.", icon: <Activity className="w-6 h-6 text-trading-gold" /> },
  { title: "Wider Spreads", desc: "Some brokers widen spreads around major news releases or during session transitions. A wider spread increases the effective cost of entering and exiting the trade, which can affect the net outcome of a position.", icon: <DollarSign className="w-6 h-6 text-trading-gold" /> },
  { title: "Slippage", desc: "In fast-moving markets, orders may be filled at a different price than requested. Slippage can affect both entries and stop-loss executions, meaning the actual risk of a trade may differ slightly from the calculated risk.", icon: <Zap className="w-6 h-6 text-trading-gold" /> },
  { title: "Event Risk", desc: "Economic releases, central bank decisions, and geopolitical developments can cause sudden, large moves. Some traders reduce position size during high-event periods or avoid trading entirely around major releases. Position sizing should account for the possibility of outsized moves.", icon: <Calendar className="w-6 h-6 text-trading-gold" /> },
];

const preTradeChecklist = [
  { label: "Verify broker specifications", desc: "Confirm the contract size, tick size, tick value, margin requirements, and volume step for XAUUSD at your specific broker before calculating position size." },
  { label: "Define your stop-loss level", desc: "Place your stop at a level that invalidates the trade idea, based on market structure. Do not use an arbitrary pip distance." },
  { label: "Calculate monetary loss at stop", desc: "Using your planned lot size, stop distance, and tick value, calculate exactly how much money you would lose if the stop is hit." },
  { label: "Check margin requirement", desc: "Verify that the margin required for your planned position does not exceed your available free margin." },
  { label: "Check leverage", desc: "Understand the actual leverage your position represents. High leverage does not mean low risk." },
  { label: "Review economic events", desc: "Check the economic calendar for scheduled releases during the expected holding period of your trade." },
  { label: "Confirm position size", desc: "Ensure the lot size you are about to trade is consistent with your maximum acceptable loss and stop distance." },
  { label: "Ensure the loss is acceptable", desc: "Ask yourself: if this trade hits the stop-loss, will the loss be manageable? If the answer is no, reduce the lot size or do not take the trade." },
  { label: "Avoid increasing size emotionally", desc: "Do not increase your lot size because you feel confident, because you want to recover a loss, or because the market is moving fast. Stick to your calculated position size." },
];

const continueLearningCards = [
  { href: "/how-to-trade-xauusd/", icon: <BookOpen className="w-7 h-7 text-trading-gold" />, title: "How to Trade XAUUSD", desc: "A beginner-friendly guide covering what you need before trading gold, how to analyze XAUUSD, plan trades and manage risk.", gradient: "from-trading-gold/10 to-transparent" },
  { href: "/xauusd-trading-strategy/", icon: <Target className="w-7 h-7 text-trading-gold" />, title: "XAUUSD Trading Strategy", desc: "A step-by-step framework for building and executing a structured XAUUSD trading strategy.", gradient: "from-trading-gold/10 to-transparent" },
  { href: "/best-time-to-trade-xauusd/", icon: <Clock className="w-7 h-7 text-trading-gold" />, title: "Best Time to Trade XAUUSD", desc: "Understand how Asian, London and New York sessions affect gold liquidity, volatility and trading conditions.", gradient: "from-trading-gold/10 to-transparent" },
  { href: "/xauusd-analysis/", icon: <LineChart className="w-7 h-7 text-trading-gold" />, title: "XAUUSD Analysis", desc: "The main hub for ongoing XAUUSD market analysis, key levels, and gold market structure updates.", gradient: "from-trading-gold/10 to-transparent" },
  { href: "/how-to-read-xauusd-price-action/", icon: <Activity className="w-7 h-7 text-trading-gold" />, title: "How to Read XAUUSD Price Action", desc: "A dedicated guide to reading candlestick patterns, market structure, and price behavior on XAUUSD charts.", gradient: "from-trading-gold/10 to-transparent" },
  { href: "/xauusd-support-resistance/", icon: <Layers className="w-7 h-7 text-trading-gold" />, title: "XAUUSD Support and Resistance", desc: "How to identify, draw, and trade from key support and resistance levels on the gold chart.", gradient: "from-trading-gold/10 to-transparent" },
  { href: "/gold-signals/", icon: <BarChart3 className="w-7 h-7 text-trading-green" />, title: "Gold Trading Signals", desc: "Gold signals, XAUUSD trade ideas, and market updates from the Forex Wizard community.", gradient: "from-trading-green/10 to-transparent" },
  { href: "/about/", icon: <Info className="w-7 h-7 text-trading-gold" />, title: "About Forex Wizard", desc: "Learn about the Forex Wizard community, our approach to market education, and what to expect.", gradient: "from-trading-gold/10 to-trading-green/10" },
];

const faqs = [
  { q: "What is XAUUSD lot size?", a: "XAUUSD lot size refers to the unit of volume you select when opening a gold trade. It determines how much of the gold market you are exposed to. However, the exact meaning of one lot depends on your broker's contract size. One broker may define a standard lot as 100 troy ounces, while another may use a different specification. Always check your broker's symbol specifications before trading to understand what each lot represents." },
  { q: "How do you calculate XAUUSD lot size?", a: "The general concept involves dividing your maximum planned monetary loss by the monetary loss per unit of volume at your planned stop distance. This requires knowing your stop distance, your broker's contract size, tick size, and tick value. Because these specifications differ between brokers, there is no single universal formula. A proper calculation must use your own broker's specifications and account currency." },
  { q: "What does 1 lot mean in gold trading?", a: "The meaning of 1 lot in gold trading depends entirely on your broker's contract specification. Many brokers define 1 standard lot of XAUUSD as 100 troy ounces of gold, but this is not universal. Some brokers may use different contract sizes. The only way to know what 1 lot means at your broker is to check the contract specification for the XAUUSD symbol in your trading platform." },
  { q: "Is XAUUSD lot size the same at every broker?", a: "No. Brokers can and do use different contract sizes, tick sizes, tick values, margin requirements, and volume steps for XAUUSD. A lot size that represents one exposure level at one broker may represent a different exposure at another. This is why you must always verify your own broker's specifications and never assume that information from another broker applies to yours." },
  { q: "How does stop-loss distance affect XAUUSD lot size?", a: "For a given maximum monetary risk, a wider stop-loss distance means you need a smaller lot size to keep the potential loss within your limit. A tighter stop-loss allows a larger lot size for the same risk. However, stop-losses should be placed based on the trade idea and market structure, not manipulated solely to increase lot size. A stop that is too tight may be hit by normal market noise before the trade has a chance to develop." },
  { q: "Does leverage change the correct lot size?", a: "Leverage affects the margin required to hold a position, but it does not change the market risk. The correct lot size should be based on the potential loss at your stop-loss level relative to your account size and risk tolerance, not on how much margin leverage saves you. High leverage can make it easy to take on positions that are far too large for your account. Lower margin does not mean lower risk." },
  { q: "What is the difference between lot size and margin?", a: "Lot size determines your market exposure and the potential profit or loss of your trade. Margin is the amount of money your broker locks as collateral to maintain the open position. They are related but distinct concepts. A trade might require a small margin but carry a very large potential loss. Position sizing should always be based on the potential loss at the stop-loss, not on the margin requirement." },
  { q: "Can an XAUUSD lot size calculator give the exact position size?", a: "A calculator can provide a useful estimate, but its accuracy depends entirely on the inputs you provide. If you enter incorrect contract size, tick value, or stop distance, the output will be wrong. Additionally, a calculator cannot account for slippage, spread widening, or other real-market execution factors. A calculator is a tool to support decision-making, not a substitute for understanding the concepts behind the calculation." },
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

/* ------------------------------------------------------------------ */
/*  PAGE                                                              */
/* ------------------------------------------------------------------ */
export default function XauusdLotSizePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />

      <header className="relative z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-foreground tracking-tight no-underline hover:text-trading-green transition-colors">Forex Wizard</Link>
          <nav className="flex items-center gap-6">
            <Link href="/forex-signals/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">Forex Signals</Link>
            <Link href="/gold-signals/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">Gold Signals</Link>
            <Link href="/xauusd-analysis/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">XAUUSD Analysis</Link>
            <Link href="/about/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden lg:block">About</Link>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-trading-green hover:text-trading-green/80 transition-colors no-underline">Join on Telegram</a>
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
                Forex Wizard Trading Guide
              </span>
            </FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-trading-gold text-glow-gold">XAUUSD Lot Size</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Understand how lot size works in gold trading, learn what you need
              to calculate position size, and see why broker specifications
              matter for every XAUUSD trade you place.
            </p>
            <FadeIn delay={0.5} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <TelegramCTA text="Join Forex Wizard Telegram" variant="gold" />
              <Link href="/how-to-trade-xauusd/" className="inline-flex items-center justify-center gap-2 font-bold text-base rounded-xl px-6 py-3.5 md:px-8 md:py-4 glass-strong text-foreground hover:text-trading-gold border border-white/10 hover:border-trading-gold/30 transition-all duration-300 no-underline select-none hover:scale-105 active:scale-95">
                <BookOpen className="w-5 h-5" />How to Trade XAUUSD
              </Link>
            </FadeIn>
          </HeroAnimation>
        </section>

        {/* 1. WHAT IS XAUUSD LOT SIZE? */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">What Is </span><span className="text-trading-gold text-glow-gold">XAUUSD Lot Size?</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>In gold trading, <span className="text-foreground font-medium">lot size</span> represents the volume or size of the trade you are placing. It is the unit you select on your broker&rsquo;s platform when you open a position, and it directly determines how much of the gold market you are exposed to. A larger lot size means greater exposure: each point of price movement will have a larger financial impact on your account. A smaller lot size means smaller exposure and smaller profit or loss per unit of price movement.</p>
              <p>Lot size is one of the most important decisions in any XAUUSD trade because it controls the relationship between price movement and monetary outcome. Two traders could enter the same trade at the same price with the same stop-loss, but if one uses a lot size ten times larger than the other, their potential loss is also ten times larger. Understanding lot size is therefore essential for managing risk.</p>
              <p>It is critical to understand that the exact definition of what one lot represents depends on your <span className="text-foreground font-medium">broker&rsquo;s specifications</span>. Different brokers may define XAUUSD using different contract sizes, tick sizes, and tick values. This means that the same numerical lot size can represent different actual exposures at different brokers. Before trading, you should always verify what one lot of XAUUSD means at your specific broker by checking the symbol specification in your trading platform.</p>
              <div className="glass rounded-2xl p-6 border border-trading-gold/20">
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-gold font-semibold">Key principle:</span> Lot size directly affects profit/loss sensitivity. Before choosing a lot size, you should understand your broker&rsquo;s contract specifications, your stop distance, and the maximum amount you are willing to risk on the trade.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 2. WHAT DOES 1 LOT MEAN IN XAUUSD? */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">What Does 1 Lot Mean in </span><span className="text-trading-gold text-glow-gold">XAUUSD?</span></h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">The answer depends on your broker. There is no single universal definition.</p>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Many brokers may define XAUUSD using a standard contract size, but specifications vary. A common example (though not universal) is a contract size of 100 troy ounces per standard lot. Under this definition, trading 1.00 lot would mean you are trading 100 troy ounces of gold. If your broker uses a different contract size, the exposure for 1.00 lot will be different.</p>
              <p>Because broker specifications differ, you should never assume that you know what 1 lot means without verifying. The following details should be confirmed in your broker&rsquo;s symbol specification before you trade:</p>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {specChecklist.map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.07}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-3 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <h3 className="text-base font-bold text-foreground">{item.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div className="mt-8 glass rounded-2xl p-5 border border-trading-red/30">
              <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-red font-semibold">Important:</span> Forex Wizard does not provide broker-specific contract specifications. The information above describes concepts. Always refer to your own broker&rsquo;s specification for exact figures.</p>
            </div>
          </div>
        </FadeSection>

        {/* 3. STANDARD, MINI AND MICRO LOT CONCEPTS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Standard, Mini and Micro </span><span className="text-trading-gold text-glow-gold">Lot Concepts</span></h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">Common terminology explained — with the caveat that XAUUSD conventions vary by broker.</p>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>In forex trading, lot terminology is relatively standardized: a standard lot is 100,000 units of the base currency, a mini lot is 10,000, and a micro lot is 1,000. These terms are widely understood for currency pairs. However, <span className="text-foreground font-medium">XAUUSD broker volume conventions may not map perfectly to these forex conventions</span>, because gold uses troy ounces rather than currency units.</p>
              <p>Many brokers allow fractional lot sizes for XAUUSD (such as 0.01, 0.05, 0.10), which can be useful for managing risk on smaller accounts. The important thing is not the label (standard, mini, micro) but the actual contract size that the lot represents at your specific broker.</p>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {lotConcepts.map((item) => (
                <FadeIn key={item.title}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-gold/10 to-transparent flex items-center justify-center">{item.icon}</div>
                    <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div className="mt-8 glass rounded-2xl p-5 border border-trading-gold/20">
              <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-gold font-semibold">Note:</span> Do not assume every broker labels lots identically. Some brokers may not use the standard/mini/micro labels at all and instead simply allow you to trade in volume increments (e.g., 0.01 to 50.00 lots) with the contract size defining the actual exposure.</p>
            </div>
          </div>
        </FadeSection>

        {/* 4. WHY LOT SIZE MATTERS IN GOLD TRADING */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Why Lot Size Matters in </span><span className="text-trading-gold text-glow-gold">Gold Trading</span></h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">Lot size is one of the primary controls you have over risk. Understanding its impact helps you make more informed decisions.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyMattersPoints.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.07}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 border border-trading-gold/20 hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-gold/10 to-transparent flex items-center justify-center">{item.icon}</div>
                    <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div className="mt-10 glass-strong rounded-2xl p-6 md:p-8 border border-trading-red/10">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl mx-auto">An oversized position can create excessive risk that goes beyond what your risk management plan allows. Even a well-analyzed trade can move against you, and a position that is too large amplifies that loss. The goal of proper position sizing is to ensure that no single trade can cause disproportionate damage to your account.</p>
            </div>
          </div>
        </FadeSection>

        {/* 5. XAUUSD POSITION SIZE VS LOT SIZE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">XAUUSD Position Size vs </span><span className="text-trading-gold text-glow-gold">Lot Size</span></h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">These terms are related but distinct. Understanding the difference helps you calculate risk more accurately.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {distinctions.map((item) => (
                <FadeIn key={item.title}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="flex items-center gap-3">{item.icon}<h3 className="text-lg font-bold text-foreground">{item.title}</h3></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div className="mt-10 glass rounded-2xl p-5 border border-trading-gold/20">
              <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-gold font-semibold">Beginner tip:</span> When traders say "position size" in the context of risk management, they usually mean the calculated volume (in lots) that limits their loss to a specific monetary amount. When brokers say "position size" in their platform, they may mean the monetary value of your open trade. Always clarify which meaning is being used in context.</p>
            </div>
          </div>
        </FadeSection>

        {/* 6. WHAT INFORMATION IS NEEDED TO CALCULATE XAUUSD LOT SIZE? */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">What Information Is Needed to Calculate </span><span className="text-trading-gold text-glow-gold">XAUUSD Lot Size?</span></h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">Before you can calculate lot size, you need several pieces of information — some personal and some broker-specific.</p>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Calculating XAUUSD lot size requires both <span className="text-foreground font-medium">trade-specific inputs</span> (entry, stop, risk amount) and <span className="text-foreground font-medium">broker-specific inputs</span> (contract size, tick size, tick value). Missing or guessing any of these values can lead to an incorrect calculation and unintended risk levels.</p>
            </div>
            <div className="mt-8 space-y-3">
              {calcChecklist.map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.04}>
                  <div className="glass rounded-2xl p-5 flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-trading-gold/10 flex items-center justify-center text-trading-gold font-extrabold text-xs">{i + 1}</span>
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1">{item.label}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div className="mt-8 glass rounded-2xl p-5 border border-trading-red/30">
              <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-red font-semibold">Broker-specific inputs are essential.</span> Two traders with the same account size, risk amount, and stop distance may need different lot sizes if their brokers have different contract specifications. Never use another broker's specifications to calculate your own position size.</p>
            </div>
          </div>
        </FadeSection>

        {/* 7. BASIC XAUUSD LOT SIZE FORMULA */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Basic XAUUSD </span><span className="text-trading-gold text-glow-gold">Lot Size Formula</span></h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">A general educational concept — not a universal formula for all brokers.</p>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>At its core, the concept behind calculating position size is straightforward:</p>
              <div className="glass-strong rounded-2xl p-6 md:p-8 text-center gradient-border">
                <p className="text-lg md:text-xl font-bold text-foreground mb-4">Position Size = Maximum Monetary Risk &divide; Monetary Loss per Unit of Volume at the Planned Stop</p>
                <p className="text-sm text-muted-foreground">This is a conceptual framework, not a universal formula. The exact implementation depends on your broker&rsquo;s contract size, tick value, your account currency, and the stop distance.</p>
              </div>
              <p>In practice, this means you are answering the question: <span className="text-foreground font-medium">"How many units of volume can I trade such that, if my stop-loss is hit, I lose no more than my planned maximum?"</span> The answer depends on how much money each unit of volume loses when price moves from your entry to your stop.</p>
              <p>The monetary loss per unit of volume is calculated using your broker&rsquo;s tick value and the number of ticks between your entry and stop. This is why broker-specific inputs (contract size, tick size, tick value) are essential — without them, the calculation cannot be completed accurately.</p>
              <p>For account currencies other than USD, an additional conversion step may be required, because XAUUSD is priced in US dollars but your profit and loss will be reflected in your account currency. The exchange rate at the time of the trade affects the final position size.</p>
              <div className="glass rounded-2xl p-5 border border-trading-gold/20">
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-gold font-semibold">Why there is no single universal formula:</span> Each broker can define contract size, tick size, and tick value differently. A formula that produces the correct lot size for one broker may produce an incorrect result for another. Any calculation must use your own broker&rsquo;s specifications.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 8. HYPOTHETICAL XAUUSD LOT SIZE EXAMPLE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Hypothetical </span><span className="text-trading-gold text-glow-gold">XAUUSD Lot Size Example</span></h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">A step-by-step walkthrough using hypothetical values. This is not a recommended trade.</p>
            </div>
            <div className="space-y-6">
              <FadeIn>
                <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                  <h3 className="text-lg font-bold text-foreground mb-4">Hypothetical Inputs</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between glass rounded-xl p-4"><span className="text-muted-foreground">Hypothetical account balance</span><span className="text-foreground font-bold">$10,000</span></div>
                    <div className="flex justify-between glass rounded-xl p-4"><span className="text-muted-foreground">Hypothetical max risk</span><span className="text-foreground font-bold">$100</span></div>
                    <div className="flex justify-between glass rounded-xl p-4"><span className="text-muted-foreground">Hypothetical entry price</span><span className="text-foreground font-bold">2,350.00</span></div>
                    <div className="flex justify-between glass rounded-xl p-4"><span className="text-muted-foreground">Hypothetical stop-loss</span><span className="text-foreground font-bold">2,345.00</span></div>
                    <div className="flex justify-between glass rounded-xl p-4"><span className="text-muted-foreground">Hypothetical stop distance</span><span className="text-foreground font-bold">5.00</span></div>
                    <div className="flex justify-between glass rounded-xl p-4"><span className="text-muted-foreground">Hypothetical contract size</span><span className="text-foreground font-bold">100 oz</span></div>
                    <div className="flex justify-between glass rounded-xl p-4"><span className="text-muted-foreground">Hypothetical tick size</span><span className="text-foreground font-bold">0.01</span></div>
                    <div className="flex justify-between glass rounded-xl p-4"><span className="text-muted-foreground">Hypothetical tick value</span><span className="text-foreground font-bold">$1.00</span></div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn>
                <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
                  <h3 className="text-lg font-bold text-foreground mb-4">Step-by-Step Calculation</h3>
                  <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-trading-gold/10 flex items-center justify-center text-trading-gold font-extrabold text-xs">1</span>
                      <p><span className="text-foreground font-medium">Calculate stop distance in ticks.</span> The stop distance is 5.00 price units. With a tick size of 0.01, that is 5.00 &divide; 0.01 = 500 ticks.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-trading-gold/10 flex items-center justify-center text-trading-gold font-extrabold text-xs">2</span>
                      <p><span className="text-foreground font-medium">Calculate monetary loss per lot at stop.</span> For each lot, 500 ticks &times; $1.00 tick value = $500.00 loss if the stop is hit for 1.00 lot.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-trading-gold/10 flex items-center justify-center text-trading-gold font-extrabold text-xs">3</span>
                      <p><span className="text-foreground font-medium">Calculate position size.</span> Maximum risk ($100) &divide; loss per lot ($500) = 0.20 lots. This means a hypothetical lot size of 0.20 would limit the loss to approximately $100 if the stop is hit.</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <div className="glass rounded-2xl p-5 border border-trading-red/30">
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-red font-semibold">Disclaimer:</span> This example is entirely hypothetical and uses illustrative broker specifications. It does not represent a recommended trade, a real market scenario, or a suggestion about appropriate lot sizes for any reader. The actual contract size, tick size, and tick value at your broker may differ. Do not use this example as the basis for real trading decisions.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 9. HOW STOP-LOSS DISTANCE AFFECTS LOT SIZE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">How Stop-Loss Distance Affects </span><span className="text-trading-gold text-glow-gold">Lot Size</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>The relationship between stop-loss distance and lot size is inverse when the maximum monetary risk is held constant. A <span className="text-foreground font-medium">wider stop</span> with the same monetary risk generally means a <span className="text-foreground font-medium">smaller position</span>, because each unit of volume represents a larger loss over the greater distance. A <span className="text-foreground font-medium">tighter stop</span> with the same monetary risk generally allows a <span className="text-foreground font-medium">larger position</span>, because each unit of volume represents a smaller loss over the shorter distance.</p>
              <p>However, tighter stops are not automatically better. A stop-loss that is placed too close to the entry may be triggered by normal market noise or minor price fluctuations that do not genuinely invalidate the trade idea. On XAUUSD, which can be volatile, stops that are too tight may get hit repeatedly even when the broader analysis is correct. This can lead to a series of small losses that add up over time.</p>
              <p>Stop placement should be based on the <span className="text-foreground font-medium">trade idea and market structure</span>, not manipulated just to increase lot size. Your stop should be placed at a level where, if price reaches it, the reason you entered the trade is no longer valid. If the correct stop placement based on market structure requires a wider distance, the appropriate response is to use a smaller lot size, not to tighten the stop artificially.</p>
              <p>For a thorough understanding of how to identify key levels for stop placement, see our guides on <Link href="/xauusd-support-resistance/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">XAUUSD support and resistance</Link> and <Link href="/how-to-read-xauusd-price-action/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">reading XAUUSD price action</Link>.</p>
            </div>
          </div>
        </FadeSection>

        {/* 10. HOW ACCOUNT RISK AFFECTS LOT SIZE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">How Account Risk Affects </span><span className="text-trading-gold text-glow-gold">Lot Size</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>The maximum amount of money you are willing to lose on a trade directly determines how large your position can be. A <span className="text-foreground font-medium">higher allowed monetary loss</span> increases the possible position size, while a <span className="text-foreground font-medium">lower allowed monetary loss</span> decreases it. This relationship is linear: doubling your maximum risk doubles the lot size you can use (assuming all other variables remain the same).</p>
              <p>There is no universally correct risk percentage. Some traders risk a small fraction of their account per trade, while others may use different figures based on their experience, strategy, and personal circumstances. The appropriate risk level depends on individual factors that only the trader can assess. What matters is that the risk is predefined, is an amount the trader can afford to lose, and is applied consistently.</p>
              <p>What is universal is the principle that risk should be decided before lot size. The process should always be: define the maximum acceptable loss first, then calculate the lot size that fits that loss given your stop distance and broker specifications. Choosing a lot size first and then accepting whatever risk it produces is the reverse of sound risk management.</p>
              <div className="glass rounded-2xl p-5 border border-trading-gold/20">
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-gold font-semibold">Example using hypothetical figures:</span> If a trader decides to risk a hypothetical $50 on a trade (regardless of what percentage of their account that represents), and the loss per lot at their stop is $250, the maximum lot size would be $50 &divide; $250 = 0.20 lots. This is purely illustrative — the actual numbers depend on individual circumstances and broker specifications.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 11. XAUUSD LOT SIZE AND LEVERAGE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">XAUUSD Lot Size and </span><span className="text-trading-gold text-glow-gold">Leverage</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p><span className="text-foreground font-medium">Leverage affects margin requirements</span> — the amount of capital your broker requires you to hold to maintain an open position. Higher leverage means the broker requires less margin for the same position size. For example, with higher leverage, a 1.00 lot XAUUSD position might require $200 in margin instead of $2,000.</p>
              <p>However, <span className="text-foreground font-medium">leverage does not reduce actual market risk</span>. The profit or loss on a trade is determined by the position size and the price movement, not by how much margin was required to open it. A 1.00 lot position loses the same amount whether the margin was $200 or $2,000. The lower margin simply means less of your capital is locked up — but the potential loss is unchanged.</p>
              <p>Large leverage can enable <span className="text-foreground font-medium">oversized exposure</span>. Because high leverage reduces the margin barrier, traders may be tempted to open positions that are far too large relative to their account size. A trader with a $1,000 account and 1:500 leverage could theoretically open a position worth $500,000 — but a relatively small adverse move in gold would wipe out the entire account. The fact that leverage makes the trade possible does not make it prudent.</p>
              <div className="glass rounded-2xl p-6 border border-trading-red/30">
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-red font-semibold">Critical distinction:</span> Lower margin requirement does not mean lower risk. A low margin means your broker is requiring less collateral, not that the trade is safer. Position sizing should be based on the potential loss at your stop-loss and your risk tolerance, not on how much leverage you have available. High leverage is a tool that requires extreme caution.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 12. XAUUSD LOT SIZE AND MARGIN */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">XAUUSD Lot Size and </span><span className="text-trading-gold text-glow-gold">Margin</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p><span className="text-foreground font-medium">Margin</span> is the amount of money your broker locks as collateral to maintain your open position. When you open a trade, a portion of your account balance is set aside as used margin. The remaining balance is your free margin, which is available for new trades or to absorb losses on existing positions.</p>
              <p><span className="text-foreground font-medium">Free margin</span> is the difference between your account equity (balance plus or minus floating profit/loss) and the used margin. If your free margin falls to zero, you may receive a margin call, and your broker may begin closing positions. The specific margin call and stop-out levels vary between brokers.</p>
              <p><span className="text-foreground font-medium">Used margin</span> increases as you increase your position size. A larger lot size requires more margin. If you open multiple positions simultaneously, the combined used margin can reduce your free margin significantly, limiting your ability to manage those positions or open new ones.</p>
              <p><span className="text-foreground font-medium">Margin level</span> is typically expressed as a percentage: (equity &divide; used margin) &times; 100. Brokers often have a minimum margin level that must be maintained. If the margin level falls below this threshold, the broker may automatically close positions (a stop-out). The specific threshold varies between brokers.</p>
              <div className="glass rounded-2xl p-5 border border-trading-gold/20">
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-gold font-semibold">Key point:</span> Margin is not a measure of risk. It is a broker requirement for holding a position. Your actual risk is determined by your position size, stop distance, and the market's price movement. A trade can have very low margin but very high risk if the position is large and the stop is far away. Forex Wizard does not provide specific broker margin figures, as these vary significantly between brokers.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 13. TICK SIZE, TICK VALUE AND PRICE MOVEMENT */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Tick Size, Tick Value and </span><span className="text-trading-gold text-glow-gold">Price Movement</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p><span className="text-foreground font-medium">Tick size</span> is the smallest price increment for the instrument. On some XAUUSD brokers, this may be 0.01 (one cent per ounce). On others, it could be 0.10 or another value. The tick size determines how price changes are quantified and affects how you calculate the distance between your entry and stop in terms of ticks.</p>
              <p><span className="text-foreground font-medium">Tick value</span> is the monetary value of one tick of price movement for one standard lot. For example, if the tick size is 0.01 and the contract size is 100 ounces, then one tick (a $0.01 move per ounce) on a 100-ounce contract represents $1.00 of profit or loss per lot. This relationship depends on the contract size, so it varies between brokers.</p>
              <p><span className="text-foreground font-medium">Price movement</span> in XAUUSD is measured in the price units displayed on your chart. When gold moves from 2,350.00 to 2,351.00, that is a movement of 1.00 in price terms. To convert this into a monetary amount, you need to know how many ticks that represents (based on tick size) and multiply by the tick value and the number of lots.</p>
              <p>Understanding these three concepts together is essential for calculating lot size accurately. If you do not know your broker's tick size and tick value, you cannot accurately determine how much money a given stop distance represents, which means you cannot accurately calculate your position size. For a detailed explanation of pip and tick terminology in gold, see the guide to <Link href="/xauusd-pip-value/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">XAUUSD pip value</Link>.</p>
              <div className="glass rounded-2xl p-5 border border-trading-red/30">
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-red font-semibold">Reminder:</span> Tick size, tick value, and contract size are broker-specific. Always verify these values in your broker's symbol specification. Using incorrect values will lead to an incorrect lot size calculation.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 14. XAUUSD LOT SIZE CALCULATOR — WHAT IT SHOULD INCLUDE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">XAUUSD Lot Size Calculator &mdash; </span><span className="text-trading-gold text-glow-gold">What It Should Include</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>A reliable XAUUSD lot size calculator should allow traders to input all the variables that affect position size. The most important feature of any calculator is that it must <span className="text-foreground font-medium">not hardcode broker-specific values</span>. Since contract sizes, tick sizes, and tick values differ between brokers, a useful calculator should allow the user to enter their own broker's specifications.</p>
              <p>The following inputs are needed for an accurate calculation:</p>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Account Currency", desc: "USD, EUR, GBP, or other" },
                { label: "Account Size", desc: "Total account balance" },
                { label: "Monetary Risk", desc: "Maximum loss in account currency" },
                { label: "Entry Price", desc: "Planned entry level" },
                { label: "Stop-Loss Price", desc: "Planned stop level" },
                { label: "Contract Size", desc: "Per your broker's specification" },
                { label: "Tick Size", desc: "Per your broker's specification" },
                { label: "Tick Value", desc: "Per your broker's specification" },
              ].map((item) => (
                <div key={item.label} className="glass rounded-xl p-4 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-trading-gold flex-shrink-0" />
                  <div>
                    <span className="text-sm font-bold text-foreground">{item.label}</span>
                    <span className="text-sm text-muted-foreground ml-2">&mdash; {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>If your account currency differs from USD, a conversion rate input should also be included, because XAUUSD is priced in US dollars.</p>
              <p>Any calculator output should be clearly labeled as <span className="text-foreground font-medium">educational and approximate</span>. It should not be presented as financial advice, and the user should understand that real-market conditions (slippage, spread, execution delays) may cause actual outcomes to differ from the calculated estimate.</p>
              <div className="glass rounded-2xl p-5 border border-trading-gold/20">
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-gold font-semibold">Note:</span> There are many XAUUSD lot size calculators available online. When using any calculator, verify that it allows you to input your own broker's contract size, tick size, and tick value. A calculator that assumes a single universal XAUUSD specification may produce inaccurate results for your broker.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 15. COMMON XAUUSD LOT SIZE MISTAKES */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Common XAUUSD </span><span className="text-trading-gold text-glow-gold">Lot Size Mistakes</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {commonMistakes.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.06}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-3 border border-trading-red/20 hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="flex items-center gap-3">{item.icon}<h3 className="text-base font-bold text-foreground">{item.title}</h3></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* 16. HOW LOT SIZE FITS INTO AN XAUUSD TRADING PLAN */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">How Lot Size Fits Into an XAUUSD </span><span className="text-trading-gold text-glow-gold">Trading Plan</span></h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">Position sizing comes after analysis and planning, not before.</p>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              <p>Proper position sizing is one of the last steps before entering a trade. It should come only after you have analyzed the market, identified a setup, defined your entry and stop, and decided how much you are willing to lose. Calculating lot size before completing these steps is putting the cart before the horse.</p>
              <p>Here is the sequence that position sizing fits into within a broader trading plan:</p>
            </div>
            <div className="space-y-4">
              {planSteps.map((item) => (
                <FadeIn key={item.step}>
                  <div className="glass rounded-2xl p-5 md:p-6">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-trading-gold/10 flex items-center justify-center text-trading-gold font-extrabold text-sm">{item.step}</span>
                      <div>
                        <h3 className="text-base font-bold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>For a complete framework on building and executing an XAUUSD trading strategy, see our guide on <Link href="/xauusd-trading-strategy/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">XAUUSD trading strategy</Link>. For beginners who want to understand the full trading process from start to finish, our <Link href="/how-to-trade-xauusd/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">how to trade XAUUSD</Link> guide covers each stage in detail.</p>
            </div>
          </div>
        </FadeSection>

        {/* 17. LOT SIZE DURING VOLATILE XAUUSD SESSIONS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Lot Size During Volatile </span><span className="text-trading-gold text-glow-gold">XAUUSD Sessions</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Volatility and execution conditions in XAUUSD can change significantly depending on the time of day, the session, and scheduled economic events. While position sizing principles remain the same regardless of when you trade, the practical implications of a given lot size can differ considerably between a quiet Asian session and a volatile London&ndash;New York overlap.</p>
              <p>Some traders choose to reduce position sizes during periods of expected high volatility, such as around major US economic releases or during session overlaps, not because the calculation method changes, but because the potential for rapid, outsized moves is greater. This is a risk management adjustment, not a change in the position sizing formula.</p>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {volSessionPoints.map((item) => (
                <FadeIn key={item.title}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="flex items-center gap-3">{item.icon}<h3 className="text-lg font-bold text-foreground">{item.title}</h3></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div className="mt-8 text-base text-muted-foreground leading-relaxed">
              <p>For a detailed guide to understanding how sessions affect XAUUSD trading conditions, see our resource on the <Link href="/best-time-to-trade-xauusd/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">best time to trade XAUUSD</Link>.</p>
            </div>
          </div>
        </FadeSection>

        {/* 18. RISK MANAGEMENT CHECKLIST BEFORE PLACING AN XAUUSD TRADE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Risk Management Checklist Before Placing an </span><span className="text-trading-gold text-glow-gold">XAUUSD Trade</span></h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">A practical pre-trade checklist. Going through these steps helps reduce impulsive decisions.</p>
            </div>
            <div className="space-y-3">
              {preTradeChecklist.map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.04}>
                  <div className="glass rounded-2xl p-5 flex items-start gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${i < 9 ? 'border-trading-gold/40' : 'border-muted-foreground/20'}`}>
                        <ListChecks className={`w-3.5 h-3.5 ${i < 9 ? 'text-trading-gold/60' : 'text-muted-foreground/30'}`} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1">{item.label}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* CONTINUE LEARNING */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Continue </span><span className="text-trading-gold text-glow-gold">Learning</span></h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">Explore more of Forex Wizard to deepen your gold trading knowledge and build a well-rounded understanding of XAUUSD.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {continueLearningCards.map((item, i) => (
                <FadeIn key={item.href} delay={i * 0.07}>
                  <Link href={item.href} className="block h-full no-underline">
                    <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>{item.icon}</div>
                      <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      <span className="text-xs text-trading-gold font-medium mt-auto flex items-center gap-1">Read more <ArrowRight className="w-3 h-3" /></span>
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
                <span className="text-trading-gold text-glow-gold">Forex Wizard</span>
                <br />
                <span className="text-foreground">Trading Community</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                Follow XAUUSD market analysis, trading discussions and
                educational content through the Forex Wizard Telegram community.
              </p>
              <TelegramCTA text="Join Forex Wizard Telegram" variant="gold" className="text-lg md:text-xl px-10 py-5" />
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
                      <h3 className="text-base font-bold text-foreground pr-4">{faq.q}</h3>
                      <ArrowDownRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-6 pb-6 -mt-2">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
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
              <Link href="/" className="text-xs text-muted-foreground/40 hover:text-trading-green transition-colors no-underline">Home</Link>
              <Link href="/forex-signals/" className="text-xs text-muted-foreground/40 hover:text-trading-green transition-colors no-underline">Forex Signals</Link>
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground/40 hover:text-trading-green transition-colors no-underline">t.me/ForexWizzz</a>
            </div>
          </div>
        </footer>
      </main>

      <StickyTelegramButton href={TELEGRAM_LINK} label="Join Forex Wizard on Telegram" />
    </>
  );
}
