#!/usr/bin/env python3
"""Part 2: Generate the JSX body (sections 1-11). Writes to /tmp/pv-part2.tsx"""

part2 = r'''/* ------------------------------------------------------------------ */
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
              <div className=