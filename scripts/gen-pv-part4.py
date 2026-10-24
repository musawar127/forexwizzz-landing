part4 = r'''        {/* 12. XAUUSD PIP VALUE BY LOT SIZE */}
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

'''

with open('/tmp/pv-part4.tsx', 'w', encoding='utf-8') as f:
    f.write(part4)

print(f"Part 4 written: {len(part4)} chars")
