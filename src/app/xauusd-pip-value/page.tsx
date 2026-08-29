import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp, BarChart3, AlertTriangle, ArrowRight, MessageCircle,
  Target, Crosshair, Layers, Activity, BookOpen, LineChart,
  ArrowDownRight, ArrowUpRight, Globe, Zap, TrendingDown,
  Eye, ShieldCheck, Clock, Gauge, DollarSign, Calculator,
  Calendar, ListChecks, XCircle, Lightbulb, Scale,
  AlertOctagon, Info, SquareStack, HelpCircle,
  ArrowLeftRight, Hash, Ruler,
} from "lucide-react";
import {
  FadeSection, FadeIn, HeroAnimation, StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";

export const metadata: Metadata = {
  title: "XAUUSD Pip Value | How to Calculate Gold Pips",
  description: "Learn how XAUUSD pip value works, how to calculate gold pips, and understand the difference between pips, points, ticks, contract size and lot size.",
  alternates: { canonical: "https://forexwizard.online/xauusd-pip-value/" },
  openGraph: {
    title: "XAUUSD Pip Value | How to Calculate Gold Pips",
    description: "Learn how XAUUSD pip value works, how to calculate gold pips, and understand the difference between pips, points, ticks, contract size and lot size.",
    type: "article",
    url: "https://forexwizard.online/xauusd-pip-value/",
    siteName: "ForexWizzz",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "ForexWizzz - Free Forex &amp; Gold Trading Telegram Community" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "XAUUSD Pip Value | How to Calculate Gold Pips",
    description: "Learn how XAUUSD pip value works, how to calculate gold pips, and understand the difference between pips, points, ticks, contract size and lot size.",
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

const pipVsPointItems = [
  {
    term: "Pip",
    desc: "A pip is a commonly used term in forex trading to describe a small standardized price movement. For major currency pairs, one pip is typically the fourth decimal place (0.0001). However, gold does not follow this convention because it is a commodity quoted with different digit structures. In XAUUSD, the term “pip” is used by different traders, platforms, and brokers to mean different price increments. Some may refer to $0.01 as a pip, while others may use $0.10. Because there is no universal retail gold pip standard, you should always verify what price increment your broker or platform treats as a pip.",
    icon: <Hash className="w-6 h-6 text-trading-gold" />,
  },
  {
    term: "Point",
    desc: "In many trading platforms, a “point” refers to the smallest displayed price increment. This can create confusion because some platforms and traders use “pip” and “point” interchangeably, while others treat them as distinct. In MetaTrader, for example, “point” typically means the minimum price step (tick size). The most reliable approach is to check the platform’s definition rather than assuming it matches a general convention.",
    icon: <Target className="w-6 h-6 text-trading-gold" />,
  },
  {
    term: "Tick",
    desc: "A tick is the minimum price increment defined by the broker for the instrument. It is a concrete, measurable value specified in the instrument’s contract details. Tick size tells you the smallest price step, and tick value tells you the monetary impact of that step for a given volume. Unlike “pip” and “point,” which can have varying definitions, tick size and tick value are defined by the broker and can be verified in the symbol specification. This makes them more reliable for calculations.",
    icon: <Ruler className="w-6 h-6 text-trading-gold" />,
  },
  {
    term: "Pipette",
    desc: "A pipette (also called a “fractional pip”) is a term used to describe a price movement that is one-tenth of a pip. In forex, this typically refers to the fifth decimal place. In gold trading, the term is less commonly used and its meaning depends on what the trader or platform defines as a pip in the first place. If someone defines a gold pip as $0.10, then a pipette would be $0.01 under that convention. The concept is only meaningful once the pip definition is established.",
    icon: <Crosshair className="w-6 h-6 text-trading-gold" />,
  },
];

const pipValueFactors = [
  { label: "Price Increment Called a Pip", desc: "The monetary value of a “pip” depends entirely on how large a price movement is being labeled as one pip. If one trader calls $0.01 a pip and another calls $0.10 a pip, the same trade will have very different “pip values.” The first step is always to clarify the convention." },
  { label: "Contract Size", desc: "The number of troy ounces (or other unit) that one lot represents. This is set by the broker and defines how much underlying exposure each lot provides. A larger contract size means each unit of price movement has a larger monetary impact." },
  { label: "Trade Volume / Lot Size", desc: "How many lots you are trading. A larger trade volume multiplies the effect of each price increment. The monetary value scales linearly with volume: doubling the volume doubles the monetary impact of the same price movement." },
  { label: "Account Currency", desc: "XAUUSD is priced in US dollars. If your account is denominated in a different currency, the monetary value must be converted. This introduces an exchange-rate variable into the calculation." },
  { label: "Conversion Rate", desc: "If your account currency differs from USD, the current USD-to-account-currency rate will affect the final pip value. This rate fluctuates, meaning the same XAUUSD price movement can have a slightly different monetary impact at different times." },
  { label: "Broker Specifications", desc: "The tick size, tick value, and contract size defined by your broker. These specifications determine the mechanics of how price movement translates into profit and loss on your specific platform." },
];

const calcSteps = [
  { step: "1", title: "Identify Starting Price", desc: "Note the price at the beginning of the period or trade you are measuring. This is your reference point." },
  { step: "2", title: "Identify Ending Price", desc: "Note the price at the end of the period or trade. This is where the movement concludes." },
  { step: "3", title: "Calculate Absolute Price Difference", desc: "Subtract the starting price from the ending price (or vice versa, depending on direction). The result is the raw price movement in dollar terms per ounce." },
  { step: "4", title: "Determine the Pip/Point Convention", desc: "Check your broker or platform to find what price increment is being used as a pip or point. This might be $0.01, $0.10, or another value depending on the environment." },
  { step: "5", title: "Divide to Get Pip Count", desc: "Divide the price difference by the convention’s price increment. For example, a $0.25 move with a $0.01 convention equals 25 pips. The same $0.25 move with a $0.10 convention equals 2.5 pips." },
];

const commonMistakes = [
  { title: "Assuming Gold Uses Forex Pip Rules", desc: "Forex major pairs typically define a pip as the fourth decimal place. Gold is a commodity with a different price structure. Applying forex pip rules to XAUUSD without verification can lead to incorrect calculations.", icon: <XCircle className="w-6 h-6 text-trading-red" /> },
  { title: "Assuming Every Broker Defines a Pip Identically", desc: "Different brokers may use different contract sizes, tick sizes, and display formats. A pip value calculated for one broker may not apply to another. Always check the specific instrument specification.", icon: <AlertOctagon className="w-6 h-6 text-trading-red" /> },
  { title: "Confusing Pips with Points", desc: "Some platforms use “pip” and “point” to mean the same thing, while others distinguish them. Without understanding which convention your platform uses, calculations and communication can become inconsistent.", icon: <AlertTriangle className="w-6 h-6 text-trading-red" /> },
  { title: "Confusing Pip Count with Monetary Value", desc: "Knowing that gold moved “50 pips” tells you nothing about the dollar impact unless you also know the pip convention, contract size, and trade volume. Pip count and monetary profit or loss are separate concepts.", icon: <DollarSign className="w-6 h-6 text-trading-red" /> },
  { title: "Ignoring Contract Size", desc: "Two brokers may both display “1.00 lot” for XAUUSD but use different contract sizes. Without verifying the contract size, you cannot accurately determine how much a pip is worth.", icon: <SquareStack className="w-6 h-6 text-trading-red" /> },
  { title: "Ignoring Lot Size When Calculating Value", desc: "A pip’s monetary value is not a fixed number. It changes with trade volume. A pip on 0.01 lots has a different dollar impact than a pip on 1.00 lots of the same instrument.", icon: <Layers className="w-6 h-6 text-trading-red" /> },
  { title: "Ignoring Tick Size and Tick Value", desc: "These are the most reliable specifications for calculations. Skipping them and relying on an assumed pip definition is a common source of error, especially when moving between brokers.", icon: <Ruler className="w-6 h-6 text-trading-red" /> },
  { title: "Copying Another Trader’s Pip Calculation", desc: "Another trader’s calculation is based on their broker, account currency, and convention. Copying it without verifying the underlying assumptions can lead to misleading results for your situation.", icon: <Eye className="w-6 h-6 text-trading-red" /> },
  { title: "Assuming Leverage Changes Pip Definition", desc: "Leverage affects margin and how much exposure you can take. It does not change what a pip, point, or tick is. The definition of a price increment is independent of leverage.", icon: <Gauge className="w-6 h-6 text-trading-red" /> },
  { title: "Calculating Risk with Undefined Convention", desc: "Risk calculations require a clear, defined price increment. Using the word “pips” without establishing what monetary movement that word refers to makes risk management imprecise.", icon: <AlertTriangle className="w-6 h-6 text-trading-red" /> },
];

const brokerSpecChecklist = [
  { label: "Symbol", desc: "The instrument identifier on your platform, such as XAUUSD or GOLD. Confirm this matches what you intend to trade." },
  { label: "Digits", desc: "The number of decimal places displayed in the price quote. This affects how price movement is displayed but does not, by itself, define the pip value." },
  { label: "Contract Size", desc: "The amount of the underlying asset (typically in troy ounces) that one standard lot represents. This is fundamental to calculating monetary exposure." },
  { label: "Tick Size", desc: "The minimum price increment for the instrument. This is the smallest price change the broker allows." },
  { label: "Tick Value", desc: "The monetary value of one tick of price movement for one standard lot. This directly affects how price changes translate into profit and loss." },
  { label: "Minimum Volume", desc: "The smallest lot size the broker permits. This determines the minimum position you can open." },
  { label: "Maximum Volume", desc: "The largest lot size the broker permits. Useful for understanding position limits." },
  { label: "Volume Step", desc: "The increment by which you can adjust your lot size (e.g., 0.01)." },
  { label: "Margin Requirements", desc: "The margin required per lot. This depends on leverage and contract size." },
  { label: "Account Currency", desc: "The currency your account is denominated in. If not USD, conversion will be relevant for XAUUSD pip value." },
];

const simpleChecklist = [
  "Check your broker’s XAUUSD specifications.",
  "Identify the price increment being called a pip or point.",
  "Calculate the raw price movement.",
  "Determine your trade volume.",
  "Confirm the contract size.",
  "Check tick size and tick value.",
  "Calculate monetary exposure.",
  "Confirm account-currency effects.",
  "Verify the result before trading.",
];

const faqs = [
  { q: "What is a pip in XAUUSD?", a: "A pip in XAUUSD is a term used to describe a small unit of price movement in gold trading. Unlike forex major currency pairs where a pip is standardized (typically the fourth decimal place), gold does not have a universally agreed-upon retail pip definition. Different brokers, platforms, and traders may define a gold pip as $0.01, $0.10, or another increment. The most reliable approach is to check your broker’s instrument specification for tick size and tick value, and clarify what convention your platform or community uses." },
  { q: "How much is 1 pip worth in gold?", a: "The monetary value of 1 gold pip depends on several variables: what price increment you define as a pip, the contract size, your trade volume (lot size), and your account currency. For example, if a pip is defined as $0.01 and the contract size is 100 troy ounces, then one pip on 1.00 lot would represent a $1.00 price movement per ounce, yielding a $100.00 monetary difference. But if the pip definition, contract size, or volume is different, the value changes. There is no single universal gold pip value." },
  { q: "Is one XAUUSD pip always $0.01?", a: "No. While some brokers, platforms, and traders treat a $0.01 gold price movement as one pip, this is not a universal standard. Other environments may use $0.10 as the relevant increment, or use different terminology entirely (points, ticks). The only way to know what a pip means in your specific context is to check your broker’s symbol specification and clarify the convention being used. Assuming $0.01 without verification can lead to incorrect risk calculations." },
  { q: "What is the difference between a pip and a point in XAUUSD?", a: "The difference depends on the platform and context. In some environments, “pip” and “point” are used interchangeably. In others (such as MetaTrader platforms), “point” specifically refers to the minimum price step (tick size) defined by the broker, while “pip” may refer to a different, larger increment. The key is not to assume the terms mean the same thing everywhere. Always verify what each term refers to on your specific platform." },
  { q: "How do I calculate XAUUSD pips?", a: "To count pips in XAUUSD, first calculate the absolute price difference between two points (entry and exit, for example). Then, divide that difference by the price increment that your broker or platform defines as one pip. For instance, if the price moves from a hypothetical 2350.00 to 2350.25, the absolute movement is $0.25. If your convention defines $0.01 as one pip, that is 25 pips. If your convention defines $0.10 as one pip, that same movement is 2.5 pips. The convention must be established before the calculation is meaningful." },
  { q: "Does lot size change XAUUSD pip value?", a: "Yes. The monetary value of a gold pip scales with trade volume. If you increase your lot size, the same price movement produces a proportionally larger profit or loss. For example, if one pip (under your convention) is worth $1.00 on 0.01 lots, it would be worth $100.00 on 1.00 lot (assuming the same contract size and pip definition). The number of pips in a price movement does not change with lot size, but the monetary impact does." },
  { q: "What is tick value in XAUUSD?", a: "Tick value is the monetary amount that one tick (the minimum price increment) is worth for a defined volume, typically one standard lot. It is specified by the broker in the instrument’s contract details. For example, if the tick size is 0.01 and the tick value for one lot is $1.00, that means each $0.01 of price movement on one lot equals $1.00 of profit or loss. Tick value is a concrete, broker-defined number that is more reliable for calculations than the often-ambiguous term “pip.”" },
  { q: "Why do different gold pip calculators give different answers?", a: "Different calculators may use different assumptions about what constitutes a pip for XAUUSD, what contract size to apply, what lot size to reference, and what account currency to convert to. Some calculators might assume a $0.01 pip, others a $0.10 pip. Some may use a 100-ounce contract, others a different size. The disagreement between calculators is a direct result of the lack of universal gold pip standardization. The most accurate calculation always uses your own broker’s actual specifications." },
  { q: "How can I check my broker’s XAUUSD pip value?", a: "Open your trading platform and look for the instrument specification or contract specification for XAUUSD. Key fields to find are: contract size (ounces per lot), tick size (minimum price increment), and tick value (monetary value of one tick per lot). You should also note the number of displayed digits and your account currency. With these specifications, you can determine both the price increment convention and the monetary value of any given price movement at your specific broker." },
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

const continueLearningCards = [
  { href: "/xauusd-lot-size/", title: "XAUUSD Lot Size", desc: "Understand how lot size works in gold trading and how it interacts with pip value to determine your total monetary exposure.", icon: <Layers className="w-7 h-7 text-trading-gold" />, gradient: "from-trading-gold/10 to-transparent" },
  { href: "/how-to-trade-xauusd/", title: "How to Trade XAUUSD", desc: "A beginner-friendly guide to the XAUUSD trading process, from platform setup to placing your first trade.", icon: <BookOpen className="w-7 h-7 text-trading-green" />, gradient: "from-trading-green/10 to-transparent" },
  { href: "/xauusd-trading-strategy/", title: "XAUUSD Trading Strategy", desc: "Learn a structured framework for developing and applying gold trading strategies with proper risk management.", icon: <TrendingUp className="w-7 h-7 text-trading-gold" />, gradient: "from-trading-gold/10 to-transparent" },
  { href: "/best-time-to-trade-xauusd/", title: "Best Time to Trade XAUUSD", desc: "Discover which trading sessions and hours tend to offer the most favorable conditions for gold trading.", icon: <Clock className="w-7 h-7 text-trading-gold" />, gradient: "from-trading-gold/10 to-transparent" },
  { href: "/xauusd-analysis/", title: "XAUUSD Analysis", desc: "Follow regular gold market analysis covering price structure, key levels, and potential trade setups.", icon: <LineChart className="w-7 h-7 text-trading-green" />, gradient: "from-trading-green/10 to-transparent" },
  { href: "/how-to-read-xauusd-price-action/", title: "XAUUSD Price Action", desc: "Learn to read candlestick patterns, market structure, and price behavior for better trade decisions.", icon: <BarChart3 className="w-7 h-7 text-trading-gold" />, gradient: "from-trading-gold/10 to-transparent" },
  { href: "/xauusd-support-resistance/", title: "XAUUSD Support and Resistance", desc: "Understand how to identify and trade from key support and resistance levels in gold.", icon: <Target className="w-7 h-7 text-trading-gold" />, gradient: "from-trading-gold/10 to-transparent" },
  { href: "/gold-signals/", title: "Gold Trading Signals", desc: "Access free gold trading signals and market updates through the ForexWizard Telegram community.", icon: <Zap className="w-7 h-7 text-trading-green" />, gradient: "from-trading-green/10 to-transparent" },
  { href: "/about/", title: "About ForexWizard", desc: "Learn more about the ForexWizzz community, our approach, and what we offer to traders.", icon: <Info className="w-7 h-7 text-trading-gold" />, gradient: "from-trading-gold/10 to-transparent" },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                              */
/* ------------------------------------------------------------------ */

export default function XauusdPipValuePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-extrabold text-trading-gold tracking-tight no-underline">
            ForexWizzz
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/forex-signals/" className="text-sm font-medium text-muted-foreground hover:text-trading-green transition-colors no-underline">Forex Signals</Link>
            <Link href="/gold-signals/" className="text-sm font-medium text-muted-foreground hover:text-trading-green transition-colors no-underline">Gold Signals</Link>
            <Link href="/xauusd-analysis/" className="text-sm font-medium text-muted-foreground hover:text-trading-green transition-colors no-underline">XAUUSD Analysis</Link>
            <Link href="/about/" className="text-sm font-medium text-muted-foreground hover:text-trading-green transition-colors no-underline">About</Link>
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
                ForexWizard Trading Guide
              </span>
            </FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-trading-gold text-glow-gold">XAUUSD Pip Value</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Learn what a pip means in gold trading, why definitions vary
              between brokers, and how to calculate XAUUSD price movement
              accurately for your specific setup.
            </p>
            <FadeIn delay={0.5} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <TelegramCTA text="Join ForexWizard Telegram" variant="gold" />
              <Link href="/xauusd-lot-size/" className="inline-flex items-center justify-center gap-2 font-bold text-base rounded-xl px-6 py-3.5 md:px-8 md:py-4 glass-strong text-foreground hover:text-trading-gold border border-white/10 hover:border-trading-gold/30 transition-all duration-300 no-underline select-none hover:scale-105 active:scale-95">
                <Layers className="w-5 h-5" />XAUUSD Lot Size
              </Link>
            </FadeIn>
          </HeroAnimation>
        </section>

        {/* 1. WHAT IS A PIP IN XAUUSD? */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">What Is a Pip in </span><span className="text-trading-gold text-glow-gold">XAUUSD?</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>XAUUSD represents the price of <span className="text-foreground font-medium">gold quoted in US dollars</span>. A pip is a term commonly used in trading to describe a small unit of price movement. In forex currency pairs like EUR/USD, a pip is relatively well standardized as the fourth decimal place (0.0001). However, gold is a commodity, not a currency pair, and it is quoted with a different price structure.</p>
              <p>This means that <span className="text-foreground font-medium">gold does not have a universally standardized retail pip convention</span>. Different brokers, trading platforms, educational resources, and traders may use the term “pip” to refer to different price increments in XAUUSD. Some may describe a $0.01 movement as a pip, others may use $0.10, and still others may rely on “point” or “tick” terminology instead.</p>
              <p>The critical point for anyone trading gold is this: before using pip-based calculations, you must verify what price increment your broker or platform actually uses. The broker&rsquo;s instrument specification — which includes tick size, tick value, and contract size — provides the concrete, verifiable data needed for accurate calculations. Understanding the concept of a pip is useful for communicating about price movement, but the actual mechanics of profit and loss depend on broker-defined specifications.</p>
              <div className="glass rounded-2xl p-6 border border-trading-gold/20">
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-gold font-semibold">Key principle:</span> The term “pip” is a communication convention, not a technical standard, in gold trading. Always verify your broker&rsquo;s symbol specification before making any calculation that depends on pip value.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 2. WHY GOLD PIPS CAN BE CONFUSING */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Why Gold Pips Can Be </span><span className="text-trading-gold text-glow-gold">Confusing</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>If you search online for “what is a gold pip,” you will find conflicting answers. One source may tell you a gold pip is $0.01. Another may say it is $0.10. A third may insist on a different value entirely. None of these sources is necessarily wrong — they are simply using different conventions. This confusion arises from several overlapping factors that are worth understanding.</p>
              <p>First, <span className="text-foreground font-medium">different quote digits</span>: some brokers display XAUUSD with two decimal places (e.g., 2350.50), while others display three or more (e.g., 2350.500). The number of displayed digits alone does not define what a pip is, but it influences how traders visually perceive price movement and may lead them to adopt different conventions.</p>
              <p>Second, <span className="text-foreground font-medium">pip vs. point terminology</span>: some platforms use “pip” and “point” to mean the same thing, while others distinguish them. In MetaTrader, for example, “point” often refers to the smallest displayed price increment, while “pip” may refer to a larger, more traditional increment. A trader who learned on MetaTrader and a trader who learned on a different platform may describe the same price movement using different terms and different numbers.</p>
              <p>Third, <span className="text-foreground font-medium">tick-size terminology</span>: in some professional or institutional contexts, the focus is on ticks (the broker-defined minimum price increment) rather than pips. A trader from this background may describe a price move in ticks rather than pips, creating another layer of terminology variation.</p>
              <p>Fourth, <span className="text-foreground font-medium">trader slang and regional differences</span>: in some trading communities, traders colloquially refer to a $1.00 move in gold as “100 points” or use other informal shorthand. This kind of slang can be efficient within a community but confusing to outsiders.</p>
              <p>Consider a simple example. Gold moves from a hypothetical price of 2350.00 to 2350.50. A trader who calls $0.01 a pip would describe this as a 50-pip move. A trader who calls $0.10 a pip would call it a 5-pip move. A trader focused on ticks might describe it differently still. The actual price change — $0.50 per ounce — is identical in every case. Only the label and the count change.</p>
              <div className="glass rounded-2xl p-6 border border-trading-gold/20">
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-gold font-semibold">Important:</span> None of these conventions is inherently “correct” or “incorrect.” They are different ways of describing the same market reality. The problem arises only when someone assumes their convention is universal and uses it for calculations without verification.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 3. HOW XAUUSD PRICES ARE QUOTED */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">How XAUUSD Prices Are </span><span className="text-trading-gold text-glow-gold">Quoted</span></h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">Understanding the structure of a gold price quote is the foundation for understanding pip calculations.</p>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>XAUUSD represents the price of one troy ounce of gold in US dollars. A hypothetical quote might look like this: <span className="text-foreground font-medium">2350.50</span>. This is a hypothetical example only and does not represent the current market price of gold.</p>
              <p>In this hypothetical quote, the structure breaks down as follows: the digits before the decimal point (2350) represent the whole-dollar portion, and the digits after the decimal point (50) represent the cents. So this quote would describe gold at approximately two thousand three hundred fifty dollars and fifty cents per troy ounce.</p>
              <p>However, the way a broker displays this price can vary. One broker might show <span className="text-foreground font-medium">2350.50</span> (two decimal places), while another might display <span className="text-foreground font-medium">2350.500</span> (three decimal places) or even more. The additional digit provides finer price resolution, but it also means that traders on different platforms may develop different intuitions about what constitutes a “small” or “standard” price movement.</p>
              <p>The critical takeaway is that <span className="text-foreground font-medium">the number of displayed decimal places should not be used as the sole basis for assuming monetary pip value</span>. A three-digit display does not automatically mean that $0.001 is the relevant trading increment, and a two-digit display does not guarantee that $0.01 is the standard pip. The only reliable way to determine what a price increment means in monetary terms is to consult the broker&rsquo;s instrument specification, which defines tick size, tick value, and contract size.</p>
              <div className="glass rounded-2xl p-6 border border-trading-gold/20">
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-gold font-semibold">Remember:</span> Price quotes in this section are hypothetical and for educational illustration only. Always check your live broker feed for actual current pricing and your broker&rsquo;s specification for the meaning of each price increment.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 4. XAUUSD PIP VS POINT VS TICK */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">XAUUSD Pip vs Point vs </span><span className="text-trading-gold text-glow-gold">Tick</span></h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">These terms overlap in common usage. Understanding the variations is essential for clear communication and accurate calculation.</p>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              <p>The section below explains how each term is commonly used in the context of XAUUSD trading. Note that none of these definitions is universal across all brokers and platforms. The most reliable technical inputs for any calculation remain <span className="text-foreground font-medium">tick size</span>, <span className="text-foreground font-medium">tick value</span>, and <span className="text-foreground font-medium">contract size</span> — all of which are defined by the broker and can be verified in the instrument specification.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pipVsPointItems.map((item) => (
                <FadeIn key={item.term}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-trading-gold/10 to-transparent flex items-center justify-center shrink-0">{item.icon}</div>
                      <h3 className="text-base font-bold text-foreground">{item.term}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* 5. WHAT DETERMINES XAUUSD PIP VALUE? */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">What Determines </span><span className="text-trading-gold text-glow-gold">XAUUSD Pip Value?</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>There is no single fixed “XAUUSD pip value” that applies to all traders at all brokers. The monetary value of what someone calls a pip depends on several variables working together. Understanding each of these is important for anyone who wants to calculate gold price movement accurately.</p>
              <p>The most fundamental factor is <span className="text-foreground font-medium">the size of the price movement being labeled as a pip</span>. This is a convention, not a physical law. If one environment defines a pip as $0.01 and another defines it as $0.10, the same trade will produce different “pip values” purely because the word refers to a different amount of price movement. The actual monetary outcome of the trade is the same — only the count and the per-pip value change.</p>
              <p>Beyond the convention, the monetary impact is determined by the <span className="text-foreground font-medium">contract size</span> (how many troy ounces one lot represents), the <span className="text-foreground font-medium">trade volume</span> (how many lots you are trading), and the <span className="text-foreground font-medium">account currency</span> (which may require conversion from USD). These factors interact multiplicatively: changing any one of them changes the final dollar amount.</p>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {pipValueFactors.map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.07}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-3 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <h3 className="text-base font-bold text-foreground">{item.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* 6. BASIC GOLD PRICE-MOVEMENT FORMULA */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Basic Gold Price-Movement </span><span className="text-trading-gold text-glow-gold">Formula</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Rather than presenting a single universal “pip formula,” it is more accurate and useful to teach a <span className="text-foreground font-medium">convention-neutral approach</span> to calculating the monetary impact of a gold price movement. The core idea is straightforward: the profit or loss from a price change depends on how much the price moved and how much gold you are exposed to.</p>
              <div className="glass rounded-2xl p-6 border border-trading-gold/20 my-8">
                <p className="text-lg md:text-xl font-bold text-foreground mb-4">Monetary P/L = Price Movement &times; Position Exposure in Ounces</p>
                <p className="text-sm text-muted-foreground leading-relaxed">This is a conceptual framework, not a universal formula. The exact calculation depends on your broker&rsquo;s contract size, tick value, and your account currency.</p>
              </div>
              <p>To put this into practice, you need to know your total exposure in troy ounces. This is typically calculated as: <span className="text-foreground font-medium">contract size (oz per lot) &times; trade volume (lots)</span>. For example, if your broker defines one lot as 100 troy ounces and you trade 0.50 lots, your total exposure is 50 troy ounces. If gold moves $0.50 per ounce, the monetary movement is $0.50 &times; 50 = $25.00.</p>
              <p>Your broker&rsquo;s platform may perform this calculation differently, using tick size, tick value, and the number of ticks in the price movement. The underlying logic is equivalent — it converts a price change into a monetary amount based on your position size. The important point is that the specific values (contract size, tick size, tick value) come from <span className="text-foreground font-medium">your broker&rsquo;s instrument specification</span>, not from a generic formula.</p>
              <div className="glass rounded-2xl p-5 border border-trading-red/30">
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-red font-semibold">Why there is no single universal formula:</span> Each broker can define contract size, tick size, and tick value differently for XAUUSD. A formula that produces the correct result for one broker may produce an incorrect result for another. Any calculation must use your own broker&rsquo;s specifications to be accurate.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 7. HYPOTHETICAL XAUUSD PIP EXAMPLE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Hypothetical </span><span className="text-trading-gold text-glow-gold">XAUUSD Pip Example</span></h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">Seeing how the same price movement produces different pip counts under different conventions makes the concept clear.</p>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Consider a hypothetical scenario where the XAUUSD price moves from <span className="text-foreground font-medium">2350.00 to 2350.25</span>. This is a purely illustrative example and does not reflect any specific market event or current price. The absolute price movement is <span className="text-foreground font-medium">$0.25 per troy ounce</span>.</p>
              <p>Now consider how two different traders might describe this exact same movement:</p>
              <div className="glass rounded-2xl p-6 border border-trading-gold/20">
                <div className="space-y-4">
                  <div>
                    <p className="text-foreground font-semibold mb-1">Trader A (uses $0.01 = 1 pip):</p>
                    <p className="text-sm text-muted-foreground">$0.25 &divide; $0.01 = <span className="text-trading-gold font-bold">25 pips</span></p>
                  </div>
                  <div>
                    <p className="text-foreground font-semibold mb-1">Trader B (uses $0.10 = 1 pip):</p>
                    <p className="text-sm text-muted-foreground">$0.25 &divide; $0.10 = <span className="text-trading-gold font-bold">2.5 pips</span></p>
                  </div>
                </div>
              </div>
              <p>The price of gold moved by exactly the same amount in both descriptions: $0.25 per ounce. The monetary value of that movement on any given position is identical regardless of what you call it. The only difference is the label and the count. This example illustrates why <span className="text-foreground font-medium">always defining your convention before communicating or calculating is essential</span> in gold trading.</p>
              <div className="glass rounded-2xl p-5 border border-trading-red/30">
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-red font-semibold">Educational note:</span> The prices used above (2350.00 and 2350.25) are hypothetical and do not represent the current market price of gold. Real-world prices change continuously. The principle being demonstrated applies regardless of the specific prices involved.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 8. WHY PRICE DISTANCE IS OFTEN CLEARER */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Why Price Distance Is Often </span><span className="text-trading-gold text-glow-gold">Clearer</span></h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">In gold trading, raw price distance can sometimes communicate more precisely than pip counts.</p>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Because gold pip conventions vary between brokers, platforms, and traders, stating that “gold moved 250 pips” can mean different things to different people. One trader might calculate that as a $2.50 move, another as a $25.00 move. The statement alone is ambiguous without additional context about the convention being used.</p>
              <p>In many practical situations, it is clearer and more precise to say <span className="text-foreground font-medium">“the price moved $2.50”</span> rather than trying to convert that into pips. This approach eliminates the ambiguity entirely because the dollar amount is a concrete, universally understood figure. This is especially useful in several common scenarios:</p>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground ml-4">
                <li><span className="text-foreground font-medium">Discussing stop distances:</span> saying “my stop is $5.00 below entry” is unambiguous regardless of who you are talking to or what broker they use.</li>
                <li><span className="text-foreground font-medium">Comparing brokers:</span> if you are evaluating different brokers, raw price distances allow direct comparison without first translating between pip conventions.</li>
                <li><span className="text-foreground font-medium">Calculating risk:</span> risk is ultimately measured in currency, not in pip counts. Starting with the dollar amount and working from there reduces the chance of a convention mismatch.</li>
                <li><span className="text-foreground font-medium">Discussing trade ideas:</span> when sharing analysis with traders who use different platforms, stating the price distance in dollars ensures everyone is referring to the same thing.</li>
              </ul>
              <p>This is not a recommendation to abandon pip terminology entirely. Pips are widely used and can be efficient for communication within a community that shares a common convention. The key is to <span className="text-foreground font-medium">define the convention you are using</span> when you communicate, or to use raw price distance when the convention is unknown or mixed.</p>
            </div>
          </div>
        </FadeSection>

        {/* 9. HOW LOT SIZE CHANGES XAUUSD PIP VALUE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">How Lot Size Changes </span><span className="text-trading-gold text-glow-gold">XAUUSD Pip Value</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>A given price movement in gold produces different monetary outcomes depending on the size of your position. This is the connection between pip value and <Link href="/xauusd-lot-size/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">XAUUSD lot size</Link>. The price movement itself does not change, but the dollar impact on your account scales with how much gold you are exposed to.</p>
              <p>Consider a hypothetical $1.00 move in gold per ounce. If your position represents 10 troy ounces, the monetary movement is $10.00. If your position represents 100 troy ounces, the same $1.00 price move produces $100.00 of monetary movement. If your position represents 1 troy ounce, the result is $1.00. The pip count — regardless of convention — is the same in every case. What changes is the dollar amount.</p>
              <p>This is why understanding both concepts is important. <span className="text-foreground font-medium">Pip value</span> tells you what a price movement means in terms of the number of units. <span className="text-foreground font-medium">Lot size</span> determines how much monetary weight each of those units carries. Together, they determine the actual profit or loss on a trade. A thorough understanding of <Link href="/xauusd-lot-size/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">how XAUUSD lot size works</Link> is essential for translating pip-based analysis into real risk numbers.</p>
            </div>
          </div>
        </FadeSection>

        {/* 10. CONTRACT SIZE AND GOLD PIP VALUE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Contract Size and </span><span className="text-trading-gold text-glow-gold">Gold Pip Value</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Contract size describes the amount of the underlying asset — in this case, gold in troy ounces — that one standard lot represents on your broker&rsquo;s platform. It is one of the most important specifications for understanding pip value because it determines how much monetary exposure each lot provides.</p>
              <p>Many retail XAUUSD products use a common contract convention, but traders should never assume this without checking their broker. The contract size is a broker-defined value, and while many brokers may use similar specifications, differences do exist. Using the wrong contract size in a calculation can lead to significantly incorrect risk estimates.</p>
              <p>To find the contract size and related specifications, look for the <span className="text-foreground font-medium">instrument specification</span> or <span className="text-foreground font-medium">contract specification</span> window in your trading platform. This is typically accessible by right-clicking the instrument in the market watch list or navigating to the platform&rsquo;s specification section. The key fields to locate include: contract size (troy ounces per lot), tick size (minimum price increment), tick value (monetary value of one tick per lot), minimum volume (smallest allowed lot size), and volume step (the increment for adjusting lot size).</p>
              <div className="glass rounded-2xl p-5 border border-trading-gold/20">
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-gold font-semibold">Where to find it:</span> In MetaTrader, right-click XAUUSD in Market Watch and select “Specification.” In other platforms, look for a contract details or instrument info section. The exact location varies, but the data should always be available before you trade.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 11. TICK SIZE AND TICK VALUE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Tick Size and </span><span className="text-trading-gold text-glow-gold">Tick Value</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Of all the concepts discussed on this page, <span className="text-foreground font-medium">tick size and tick value</span> are the most technically precise and the most useful for actual calculations. Unlike “pip” and “point,” which can have varying definitions, ticks are defined by the broker and are verifiable in the instrument specification.</p>
              <p><span className="text-trading-gold font-semibold">Tick size</span> is the minimum quoted price increment for the instrument. It is the smallest possible price change that the broker recognizes. For example, if the tick size is 0.01, the price can move from 2350.00 to 2350.01, but not to 2350.005. If the tick size is 0.10, the price moves in $0.10 increments. The tick size is a fixed property of the instrument on that specific broker and does not change with market conditions or time of day.</p>
              <p><span className="text-trading-gold font-semibold">Tick value</span> is the monetary value of one tick of price movement for a defined volume, typically one standard lot. If the tick size is 0.01 and the tick value is $1.00 per lot, that means each $0.01 of price movement on one lot equals $1.00 of profit or loss. If you trade 0.10 lots, each tick is worth $0.10. If you trade 1.00 lots, each tick is worth $1.00. Tick value scales linearly with volume.</p>
              <p>The reason these values are more reliable for calculations than arguing about the word “pip” is simple: <span className="text-foreground font-medium">tick size and tick value are defined by the broker, not by convention</span>. There is no ambiguity. When you say “the price moved 50 ticks,” the monetary impact can be calculated precisely using the tick value and your trade volume, regardless of what any trader calls a “pip.” This makes tick-based calculations particularly useful when communicating across different platforms or when precision matters for risk management.</p>
            </div>
          </div>
        </FadeSection>

        {/* 12. XAUUSD PIP VALUE BY LOT SIZE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">XAUUSD Pip Value by </span><span className="text-trading-gold text-glow-gold">Lot Size</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>The table below demonstrates how the monetary value of a price increment scales with trade volume. <span className="text-foreground font-medium">This is a hypothetical example only</span>, based on a specific set of assumptions that may not match your broker.</p>
              <div className="glass rounded-2xl p-5 border border-trading-gold/20 mb-6">
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-gold font-semibold">Hypothetical example under a specified broker convention:</span> Contract size = 100 troy ounces per lot. Pip defined as $0.01 price movement. Account currency = USD.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 px-4 text-foreground font-bold">Lot Size</th>
                      <th className="py-3 px-4 text-foreground font-bold">Exposure (oz)</th>
                      <th className="py-3 px-4 text-foreground font-bold">Value of 1 Pip ($0.01 move)</th>
                      <th className="py-3 px-4 text-foreground font-bold">Value of 10 Pips ($0.10 move)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-white/5"><td className="py-3 px-4 text-foreground">1.00</td><td className="py-3 px-4">100 oz</td><td className="py-3 px-4">$1.00</td><td className="py-3 px-4">$10.00</td></tr>
                    <tr className="border-b border-white/5"><td className="py-3 px-4 text-foreground">0.10</td><td className="py-3 px-4">10 oz</td><td className="py-3 px-4">$0.10</td><td className="py-3 px-4">$1.00</td></tr>
                    <tr className="border-b border-white/5"><td className="py-3 px-4 text-foreground">0.01</td><td className="py-3 px-4">1 oz</td><td className="py-3 px-4">$0.01</td><td className="py-3 px-4">$0.10</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="glass rounded-2xl p-5 border border-trading-red/30">
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-red font-semibold">Disclaimer:</span> These values are examples only. Check your broker&rsquo;s XAUUSD contract and tick specifications before calculating trade risk. Different contract sizes, pip definitions, or tick values will produce different results.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 13. HOW TO CALCULATE XAUUSD PIPS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">How to Calculate </span><span className="text-trading-gold text-glow-gold">XAUUSD Pips</span></h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">A practical process rather than a single oversimplified equation.</p>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              <p>Counting pips in XAUUSD is a straightforward process once you know the convention. The key step is identifying what price increment is being treated as one pip on your platform or in the context where you are communicating. The following steps outline the process:</p>
              <div className="glass rounded-2xl p-6 border border-trading-gold/20">
                <p className="text-lg md:text-xl font-bold text-foreground mb-2">Price Difference &divide; Defined Pip Size = Number of Pips</p>
                <p className="text-sm text-muted-foreground">The defined pip size must come from the convention or platform being used.</p>
              </div>
            </div>
            <div className="space-y-4">
              {calcSteps.map((item) => (
                <FadeIn key={item.step}>
                  <div className="glass-strong rounded-2xl p-6 flex gap-5 items-start gradient-border hover:scale-[1.01] transition-transform duration-300">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-trading-gold/20 to-trading-gold/5 flex items-center justify-center shrink-0 text-trading-gold font-bold text-lg">{item.step}</div>
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* 14. HOW TO CALCULATE THE MONETARY VALUE OF A GOLD MOVE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Monetary Value of a </span><span className="text-trading-gold text-glow-gold">Gold Move</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>There is an important distinction between the <span className="text-foreground font-medium">number of pips</span> in a price movement and the <span className="text-foreground font-medium">monetary profit or loss</span> that movement produces. These are not the same thing, and confusing them is a common source of error in risk management.</p>
              <p>The number of pips is a count based on a convention. It tells you how many “units” of price movement occurred, but it says nothing about the dollar amount unless you also know the per-pip monetary value. And the per-pip monetary value depends on your contract size, your trade volume, and your account currency — not on the word “pip” itself.</p>
              <p>To calculate the monetary impact of a gold price movement, you need to combine the raw price movement with your position size. Conceptually, the calculation follows this logic: the price moves by a certain dollar amount per ounce, and your position represents a certain number of ounces. Multiply these together, and you get the monetary result. If your account is not in USD, an additional conversion step applies.</p>
              <p>For a thorough explanation of how to determine position size and how it interacts with price movement, see the <Link href="/xauusd-lot-size/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">XAUUSD lot size guide</Link>, which covers position sizing, contract size, and risk calculations in detail.</p>
            </div>
          </div>
        </FadeSection>

        {/* 15. XAUUSD PIP CALCULATOR — WHAT SHOULD IT ASK FOR? */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">XAUUSD Pip Calculator &mdash; </span><span className="text-trading-gold text-glow-gold">What It Should Ask For</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>An accurate gold pip calculator needs several inputs to produce a meaningful result. The reason many online calculators give different answers is that they make different assumptions about these inputs, often without making those assumptions visible to the user. A reliable calculator should allow you to specify or verify each of the following:</p>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground ml-4">
                <li><span className="text-foreground font-medium">Starting price and ending price:</span> the two price points between which you want to measure movement.</li>
                <li><span className="text-foreground font-medium">Pip/point convention:</span> what price increment should be treated as one pip or point. This is the convention variable that causes the most disagreement between calculators.</li>
                <li><span className="text-foreground font-medium">Contract size:</span> the number of troy ounces per lot as defined by your broker.</li>
                <li><span className="text-foreground font-medium">Lot size:</span> the trade volume you are using or evaluating.</li>
                <li><span className="text-foreground font-medium">Tick size and tick value:</span> the broker-defined minimum price increment and its monetary value per lot.</li>
                <li><span className="text-foreground font-medium">Account currency:</span> if your account is not in USD, the calculator needs to account for the conversion rate.</li>
              </ul>
              <p>Many online calculators simplify by assuming a specific broker convention (such as $0.01 = 1 pip, 100-ounce contract, USD account) without stating these assumptions. This can produce misleading results for traders whose broker uses different specifications. The safest approach is to use a calculator that either asks you for these inputs explicitly or clearly displays its assumptions so you can verify whether they match your situation.</p>
            </div>
          </div>
        </FadeSection>

        {/* 16. XAUUSD PIPS AND STOP-LOSS DISTANCE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">XAUUSD Pips and </span><span className="text-trading-gold text-glow-gold">Stop-Loss Distance</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Traders frequently describe the distance to their stop-loss in terms of pips, points, or raw price distance. Each approach can work, but the convention must be understood by everyone involved in the discussion — and, more importantly, by the person doing the risk calculation.</p>
              <p>If a trader says “my stop is 50 pips away,” the monetary risk depends entirely on what that trader means by “pip.” Without knowing the convention and the position size, the statement does not communicate the actual dollar risk. This is one reason why many experienced gold traders prefer to state stop distances in raw price terms (e.g., “my stop is $5.00 below entry”) — it eliminates the convention variable entirely.</p>
              <p>Regardless of how you measure stop distance, the placement of the stop-loss should come from the <span className="text-foreground font-medium">trade setup and invalidation logic</span>, not from choosing an arbitrary number of pips. The stop should be placed where the trade idea is proven wrong — which might be below a support level, above a resistance level, or at another technically significant point. For more on identifying key levels, see the guide to <Link href="/xauusd-support-resistance/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">XAUUSD support and resistance</Link>.</p>
              <p>Once the stop level is determined by the market structure, the distance can be translated into a monetary risk figure. This is where understanding <Link href="/xauusd-lot-size/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">XAUUSD lot size</Link> becomes critical: the combination of stop distance, contract size, and lot size determines how much capital is at risk on the trade.</p>
            </div>
          </div>
        </FadeSection>

        {/* 17. XAUUSD PIPS AND PRICE ACTION */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">XAUUSD Pips and </span><span className="text-trading-gold text-glow-gold">Price Action</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Pips measure <span className="text-foreground font-medium">how much</span> the price moved. They do not explain <span className="text-foreground font-medium">why</span> the price moved, whether the movement is likely to continue, or what market structure looks like. A 50-pip move (under any convention) could be a breakout, a retracement, a false signal, or part of a larger trend — the pip count alone cannot distinguish between these scenarios.</p>
              <p>Understanding price action — the study of how price behaves, including candlestick patterns, rejection wicks, breakout candles, retests, and structural shifts — provides the context that gives meaning to price movement. If you want to understand whether a price movement represents a genuine breakout, a liquidity grab, or a structural shift, the pip count will not tell you. You need to analyze the candles, the levels, and the market narrative.</p>
              <p>For a detailed guide to reading gold price behavior, including candlestick patterns, market structure, and how to interpret rejection and continuation signals, see the <Link href="/how-to-read-xauusd-price-action/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">XAUUSD price action guide</Link>. That resource focuses on the “why” behind price movement, complementing the measurement focus of this page.</p>
            </div>
          </div>
        </FadeSection>

        {/* 18. XAUUSD PIPS DURING ACTIVE TRADING SESSIONS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">XAUUSD Pips During Active </span><span className="text-trading-gold text-glow-gold">Trading Sessions</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Gold price activity can vary significantly depending on the time of day and the trading session. During the overlap of the London and New York sessions, XAUUSD typically experiences higher volatility and larger price movements than during the quieter Asian session. This is a well-observed pattern, though it is not guaranteed on any given day.</p>
              <p>However, it is important to understand that <span className="text-foreground font-medium">the definition and value of a pip does not change because volatility changes</span>. If your broker defines a tick size of 0.01, that remains the tick size during quiet Asian hours and during volatile London&ndash;New York overlap periods. What changes is how many ticks or pips of movement occur within a given time frame, not what those ticks or pips represent.</p>
              <p>During high-volatility periods, several practical considerations become more relevant. <span className="text-foreground font-medium">Spreads</span> may widen, meaning the difference between bid and ask prices increases. <span className="text-foreground font-medium">Slippage</span> — the difference between the expected fill price and the actual fill price — may be more pronounced, especially around major economic events such as US Non-Farm Payrolls, CPI releases, or FOMC decisions. These factors affect the effective cost and execution quality of a trade, but they do not redefine the pip or the tick.</p>
              <p>For more on understanding which sessions tend to offer the most active gold trading conditions, see the <Link href="/best-time-to-trade-xauusd/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">best time to trade XAUUSD</Link> guide. That resource covers session timing, volatility patterns, and practical considerations for scheduling gold trades.</p>
            </div>
          </div>
        </FadeSection>

        {/* 19. COMMON XAUUSD PIP MISTAKES */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Common XAUUSD Pip </span><span className="text-trading-gold text-glow-gold">Mistakes</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              <p>Gold pip terminology creates several common traps for both new and experienced traders. Being aware of these mistakes can help you avoid miscalculations and communicate more precisely about XAUUSD price movement.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {commonMistakes.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.05}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-3 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* 20. XAUUSD PIP VALUE AND LEVERAGE */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">XAUUSD Pip Value and </span><span className="text-trading-gold text-glow-gold">Leverage</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>Leverage is one of the most misunderstood concepts in trading, and its relationship to pip value is a common source of confusion. To be clear: <span className="text-foreground font-medium">leverage does not change the definition of a pip, a point, or a tick</span>. These are properties of the instrument and the broker&rsquo;s specification, not of the leverage on your account.</p>
              <p>What leverage does change is your <span className="text-foreground font-medium">margin requirement</span> and the <span className="text-foreground font-medium">maximum position size</span> you can open relative to your account balance. Higher leverage means you can control a larger position with less margin. For example, with 1:100 leverage, you can open a position worth $100,000 with $1,000 of margin. With 1:500 leverage, the same $1,000 controls $500,000 of exposure.</p>
              <p>The risk is this: while leverage does not redefine what a pip is, it makes it <span className="text-foreground font-medium">easier to take on a larger position</span>, which means each pip of price movement has a larger monetary impact on your account. A trader with high leverage might open a position so large that a relatively small price movement — perhaps just a few dollars per ounce — results in a significant percentage loss of their account. The pip value per lot has not changed, but the trader has chosen (or been able) to trade more lots than their account can safely handle.</p>
              <div className="glass rounded-2xl p-5 border border-trading-gold/20">
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-gold font-semibold">Key point:</span> Leverage amplifies position size, which amplifies monetary risk. It does not amplify or change the pip itself. The price of gold moves the same amount regardless of your leverage. What changes is how much of that movement you are exposed to.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 21. HOW TO CHECK YOUR BROKER'S XAUUSD SPECIFICATIONS */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">How to Check Your Broker&rsquo;s </span><span className="text-trading-gold text-glow-gold">XAUUSD Specifications</span></h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">A practical checklist of the fields to verify before calculating gold pip value or risk.</p>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              <p>Before making any calculation that depends on XAUUSD pip value, you should locate and verify the following fields in your broker&rsquo;s instrument specification. The exact location varies by platform, but most trading platforms provide access to these details. This checklist does not reference any specific broker — the fields listed are standard across most platforms and are the data points you need regardless of which broker you use.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {brokerSpecChecklist.map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.05}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-3 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <h3 className="text-base font-bold text-foreground">{item.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* 22. SIMPLE XAUUSD PIP-VALUE CHECKLIST */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Simple XAUUSD </span><span className="text-trading-gold text-glow-gold">Pip-Value Checklist</span></h2>
            </div>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              <p>Before relying on any XAUUSD pip calculation for trade decisions, work through this concise checklist. Each step addresses a potential source of error.</p>
            </div>
            <div className="space-y-3">
              {simpleChecklist.map((item, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="glass-strong rounded-2xl p-5 flex gap-4 items-start gradient-border">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-trading-gold/20 to-trading-gold/5 flex items-center justify-center shrink-0 text-trading-gold font-bold text-sm">{i + 1}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed pt-1">{item}</p>
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
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">Explore more of ForexWizard to deepen your gold trading knowledge and build a well-rounded understanding of XAUUSD.</p>
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
                <span className="text-trading-gold text-glow-gold">ForexWizard</span>
                <br />
                <span className="text-foreground">Trading Community</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                Follow XAUUSD market analysis, trading discussions and
                educational content through the ForexWizard Telegram community.
              </p>
              <TelegramCTA text="Join ForexWizard Telegram" variant="gold" className="text-lg md:text-xl px-10 py-5" />
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
              <Link href="/" className="text-xs text-muted-foreground/40 hover:text-trading-green transition-colors no-underline">Home</Link>
              <Link href="/forex-signals/" className="text-xs text-muted-foreground/40 hover:text-trading-green transition-colors no-underline">Forex Signals</Link>
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground/40 hover:text-trading-green transition-colors no-underline">t.me/ForexWizzz</a>
            </div>
          </div>
        </footer>
      </main>

      <StickyTelegramButton href={TELEGRAM_LINK} label="Join ForexWizzz on Telegram" />
    </>
  );
}
