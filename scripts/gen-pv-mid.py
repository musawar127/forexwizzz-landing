#!/usr/bin/env python3
"""Generate the middle section of the page (end of section 7 through section 11). Writes to /tmp/pv-mid.tsx"""

mid = '''<div className="glass rounded-2xl p-6 border border-trading-gold/20">
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
              <p>Because gold pip conventions vary between brokers, platforms, and traders, stating that \u201cgold moved 250 pips\u201d can mean different things to different people. One trader might calculate that as a $2.50 move, another as a $25.00 move. The statement alone is ambiguous without additional context about the convention being used.</p>
              <p>In many practical situations, it is clearer and more precise to say <span className="text-foreground font-medium">\u201cthe price moved $2.50\u201d</span> rather than trying to convert that into pips. This approach eliminates the ambiguity entirely because the dollar amount is a concrete, universally understood figure. This is especially useful in several common scenarios:</p>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground ml-4">
                <li><span className="text-foreground font-medium">Discussing stop distances:</span> saying \u201cmy stop is $5.00 below entry\u201d is unambiguous regardless of who you are talking to or what broker they use.</li>
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
              <p>Consider a hypothetical $1.00 move in gold per ounce. If your position represents 10 troy ounces, the monetary movement is $10.00. If your position represents 100 troy ounces, the same $1.00 price move produces $100.00 of monetary movement. If your position represents 1 troy ounce, the result is $1.00. The pip count \u2014 regardless of convention \u2014 is the same in every case. What changes is the dollar amount.</p>
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
              <p>Contract size describes the amount of the underlying asset \u2014 in this case, gold in troy ounces \u2014 that one standard lot represents on your broker&rsquo;s platform. It is one of the most important specifications for understanding pip value because it determines how much monetary exposure each lot provides.</p>
              <p>Many retail XAUUSD products use a common contract convention, but traders should never assume this without checking their broker. The contract size is a broker-defined value, and while many brokers may use similar specifications, differences do exist. Using the wrong contract size in a calculation can lead to significantly incorrect risk estimates.</p>
              <p>To find the contract size and related specifications, look for the <span className="text-foreground font-medium">instrument specification</span> or <span className="text-foreground font-medium">contract specification</span> window in your trading platform. This is typically accessible by right-clicking the instrument in the market watch list or navigating to the platform&rsquo;s specification section. The key fields to locate include: contract size (troy ounces per lot), tick size (minimum price increment), tick value (monetary value of one tick per lot), minimum volume (smallest allowed lot size), and volume step (the increment for adjusting lot size).</p>
              <div className="glass rounded-2xl p-5 border border-trading-gold/20">
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-trading-gold font-semibold">Where to find it:</span> In MetaTrader, right-click XAUUSD in Market Watch and select \u201cSpecification.\u201d In other platforms, look for a contract details or instrument info section. The exact location varies, but the data should always be available before you trade.</p>
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
              <p>Of all the concepts discussed on this page, <span className="text-foreground font-medium">tick size and tick value</span> are the most technically precise and the most useful for actual calculations. Unlike \u201cpip\u201d and \u201cpoint,\u201d which can have varying definitions, ticks are defined by the broker and are verifiable in the instrument specification.</p>
              <p><span className="text-trading-gold font-semibold">Tick size</span> is the minimum quoted price increment for the instrument. It is the smallest possible price change that the broker recognizes. For example, if the tick size is 0.01, the price can move from 2350.00 to 2350.01, but not to 2350.005. If the tick size is 0.10, the price moves in $0.10 increments. The tick size is a fixed property of the instrument on that specific broker and does not change with market conditions or time of day.</p>
              <p><span className="text-trading-gold font-semibold">Tick value</span> is the monetary value of one tick of price movement for a defined volume, typically one standard lot. If the tick size is 0.01 and the tick value is $1.00 per lot, that means each $0.01 of price movement on one lot equals $1.00 of profit or loss. If you trade 0.10 lots, each tick is worth $0.10. If you trade 1.00 lots, each tick is worth $1.00. Tick value scales linearly with volume.</p>
              <p>The reason these values are more reliable for calculations than arguing about the word \u201cpip\u201d is simple: <span className="text-foreground font-medium">tick size and tick value are defined by the broker, not by convention</span>. There is no ambiguity. When you say \u201cthe price moved 50 ticks,\u201d the monetary impact can be calculated precisely using the tick value and your trade volume, regardless of what any trader calls a \u201cpip.\u201d This makes tick-based calculations particularly useful when communicating across different platforms or when precision matters for risk management.</p>
            </div>
          </div>
        </FadeSection>

'''

with open('/tmp/pv-mid.tsx', 'w', encoding='utf-8') as f:
    f.write(mid)

print(f"Mid section written: {len(mid)} chars")
