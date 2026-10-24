#!/usr/bin/env python3
"""Part 5: Sections 19-22, Continue Learning, Telegram CTA, FAQ, Footer. Writes to /tmp/pv-part5.tsx"""

part5 = '''        {/* 19. COMMON XAUUSD PIP MISTAKES */}
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
'''

with open('/tmp/pv-part5.tsx', 'w', encoding='utf-8') as f:
    f.write(part5)

print(f"Part 5 written: {len(part5)} chars")
