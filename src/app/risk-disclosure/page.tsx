import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { FadeSection, FadeIn, StickyTelegramButton } from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Risk Disclosure | Forex Wizard",
  description:
    "Risk Disclosure for Forex Wizard. Understand the significant risks involved in forex trading, gold trading, leverage, and the limitations of trading signals and market analysis.",
  alternates: {
    canonical: "https://forexwizard.online/risk-disclosure/",
  },
  openGraph: {
    title: "Risk Disclosure | Forex Wizard",
    description:
      "Risk Disclosure for Forex Wizard. Understand the significant risks involved in forex and gold trading, leverage, signals, and market analysis.",
    type: "article",
    url: "https://forexwizard.online/risk-disclosure/",
    siteName: "Forex Wizard",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Forex Wizard - Risk Disclosure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Risk Disclosure | Forex Wizard",
    description:
      "Risk Disclosure for Forex Wizard. Understand the significant risks involved in forex and gold trading.",
    images: ["/og-image.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

export default function RiskDisclosurePage() {
  return (
    <>
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
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block"
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
        <section className="relative min-h-[50vh] flex flex-col items-center justify-center px-4 py-24 md:py-32 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-trading-red/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-trading-gold/5 rounded-full blur-[100px] pointer-events-none" />
          <CandlestickBackground />

          <FadeIn className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full glass-strong mb-6">
              <AlertTriangle className="w-8 h-8 text-trading-red" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-trading-red">Risk Disclosure</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Last updated: September 5, 2026
            </p>
          </FadeIn>
        </section>

        {/* 1. GENERAL TRADING RISK */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-trading-red/10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-trading-red font-mono text-sm">01</span>
                General Trading Risk
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  Trading in financial instruments, including foreign exchange (forex) and precious
                  metals (gold/XAUUSD), involves substantial risk of loss. You should only trade
                  with capital that you can afford to lose entirely. The possibility exists that you
                  could sustain a total loss of your initial investment and may be required to
                  deposit additional funds to maintain your positions.
                </p>
                <p>
                  If you cannot afford to lose the capital you intend to trade, you should not trade.
                  Trading is not suitable for everyone, and you must carefully evaluate your
                  financial situation, risk tolerance, and investment objectives before engaging in
                  any trading activity. The risks described in this disclosure are not exhaustive,
                  and additional risks may apply depending on the instruments you trade and the
                  markets you access.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 2. RISK OF LOSS */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-trading-red/10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-trading-red font-mono text-sm">02</span>
                Risk of Loss
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  <span className="text-trading-red font-semibold">
                    Losses in trading can exceed your initial deposit
                  </span>
                  , particularly when using leverage. You may be liable for losses beyond your
                  account balance depending on your broker&apos;s policies and applicable regulations.
                  There is no guarantee that stop-loss orders will be executed at the specified
                  price, and under certain market conditions, you may not be able to close a
                  position at any price.
                </p>
                <p>
                  You should fully understand these risks before engaging in any trading activity.
                  Markets can move against your position rapidly and without warning, and the
                  resulting losses can be significant and immediate. It is essential that you
                  understand the worst-case scenarios before committing any capital to trading,
                  including the possibility of losing more than the funds you have deposited with
                  your broker.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 3. LEVERAGE AND MARGIN */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-trading-red/10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-trading-red font-mono text-sm">03</span>
                Leverage and Margin
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  Leverage allows you to control a large position with a relatively small amount of
                  capital. While leverage can amplify profits, it equally amplifies losses. A small
                  adverse price movement can result in a total loss of your margin and may require
                  additional deposits.
                </p>
                <p>
                  <span className="text-trading-red font-semibold">
                    For example, with 100:1 leverage, a 1% adverse price movement results in a 100%
                    loss of your margin.
                  </span>{" "}
                  High-leverage trading is extremely risky and should only be undertaken by
                  experienced traders who fully understand the implications. Even experienced
                  traders can suffer catastrophic losses when using high leverage, as market
                  movements can exceed historical ranges during periods of extreme volatility or
                  unexpected events.
                </p>
                <p>
                  Margin calls may require you to deposit additional funds on short notice, and if
                  you fail to meet a margin call, your broker may liquidate some or all of your
                  positions at a loss. You should never use leverage that could put your entire
                  account at risk from a single trade or a small number of trades.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 4. VOLATILITY */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-trading-red/10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-trading-red font-mono text-sm">04</span>
                Volatility
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  Financial markets, particularly forex and gold markets, can experience periods of
                  extreme volatility. Sudden price movements can occur due to economic news,
                  geopolitical events, central bank decisions, or other factors. These movements
                  can happen so quickly that you may not have time to react or adjust your
                  positions.
                </p>
                <p>
                  <span className="text-trading-red font-semibold">
                    Volatility can cause significant losses in a very short period
                  </span>
                  , including losses that exceed your account balance. During high-volatility
                  events such as Non-Farm Payrolls, Federal Reserve announcements, or geopolitical
                  crises, spreads can widen dramatically, slippage can increase substantially, and
                  the market may gap through your stop-loss levels. You should be prepared for
                  these scenarios and understand that extreme volatility is a normal part of
                  financial markets, not an exception.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 5. SLIPPAGE AND EXECUTION */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-trading-red/10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-trading-red font-mono text-sm">05</span>
                Slippage and Execution
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  The price at which a trade is executed may differ from the price you intended, a
                  phenomenon known as slippage. Slippage occurs most frequently during periods of
                  high volatility, low liquidity, or around major economic events. Stop-loss and
                  take-profit orders are not guaranteed to execute at the specified price.
                </p>
                <p>
                  Under certain market conditions, it may be impossible to execute any order at a
                  reasonable price. Requotes, order rejections, and delays in execution are all
                  possibilities that can result in trades being filled at significantly worse prices
                  than expected. You should understand your broker&apos;s execution policy, including
                  whether they offer guaranteed stop-loss orders and under what conditions orders
                  may be rejected or delayed.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 6. STOP-LOSS LIMITATIONS */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-trading-red/10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-trading-red font-mono text-sm">06</span>
                Stop-Loss Limitations
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  While stop-loss orders are an important risk management tool, they have inherent
                  limitations. In fast-moving or illiquid markets, stop-loss orders may be
                  executed at prices significantly worse than the specified level (gap risk).
                  <span className="text-trading-red font-semibold">
                    {" "}Stop-loss orders do not guarantee that your loss will be limited to the
                    specified amount.
                  </span>
                </p>
                <p>
                  You should not rely solely on stop-loss orders as your only risk management
                  mechanism. Additional risk management strategies, such as reducing position
                  sizes, avoiding trading during high-impact news events, and diversifying your
                  exposure, should be employed alongside stop-loss orders. Understanding the
                  limitations of stop-loss orders is critical to developing a comprehensive risk
                  management plan that accounts for the realities of live market conditions.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 7. SIGNALS AND TRADE IDEAS */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-trading-red/10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-trading-red font-mono text-sm">07</span>
                Signals and Trade Ideas
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  Any trading signals, trade ideas, or market commentary shared by Forex Wizard
                  through our website or Telegram community are provided for{" "}
                  <span className="text-trading-green font-semibold">
                    educational and informational purposes only
                  </span>
                  . Signals do not guarantee profit, do not eliminate risk, do not guarantee market
                  direction, and do not guarantee execution at any particular price.
                </p>
                <p>
                  Past signals, even if they were accurate, do not predict future results. You
                  should not follow any signal without conducting your own independent analysis and
                  understanding the risks involved. Forex Wizard is not a licensed broker,
                  registered investment adviser, regulated firm, financial planner, or portfolio
                  manager. The signals and trade ideas shared are observations and opinions, not
                  personalized financial advice or guarantees of any outcome.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 8. MARKET ANALYSIS */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-trading-red/10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-trading-red font-mono text-sm">08</span>
                Market Analysis
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  Market analysis, commentary, and educational content provided by Forex Wizard
                  represents opinions and observations at a particular point in time. Market
                  conditions change rapidly, and analysis that was accurate at one time may become
                  outdated. No form of analysis, whether technical, fundamental, or otherwise, can
                  guarantee future market movements.
                </p>
                <p>
                  You should treat all analysis as one input among many, not as a definitive
                  prediction. Multiple analytical perspectives should be considered before making
                  any trading decision, and you should always apply your own judgment. Forex
                  Wizard&apos;s analysis is not a substitute for your own due diligence or
                  independent research. Markets are inherently unpredictable, and even the most
                  thorough analysis can be wrong.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 9. HISTORICAL AND HYPOTHETICAL EXAMPLES */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-trading-red/10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-trading-red font-mono text-sm">09</span>
                Historical and Hypothetical Examples
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  Any historical trading results, hypothetical scenarios, or backtested strategies
                  discussed on Forex Wizard are provided for illustrative and educational purposes
                  only.{" "}
                  <span className="text-trading-red font-semibold">
                    Historical results do not guarantee or predict future performance.
                  </span>{" "}
                  Hypothetical results are by nature theoretical and may not reflect actual trading
                  conditions, including the impact of slippage, commissions, and liquidity.
                </p>
                <p>
                  There are frequently significant differences between hypothetical results and
                  actual results achieved by any particular trader. Backtested strategies may show
                  favorable results in historical data but perform poorly in live markets due to
                  overfitting, changing market conditions, or execution realities that are not
                  captured in the backtest. Never assume that past performance, whether real or
                  hypothetical, will continue in the future.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 10. BROKER DIFFERENCES */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-trading-red/10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-trading-red font-mono text-sm">10</span>
                Broker Differences
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  Trading conditions, including spreads, commissions, leverage, execution speed,
                  and margin requirements, vary significantly between brokers. Information about
                  lot sizes, pip values, and margin discussed on Forex Wizard is educational in
                  nature and may not match your specific broker&apos;s conditions.
                </p>
                <p>
                  You must verify all trading parameters with your own broker before placing any
                  trade. Forex Wizard does not provide broker-specific trading conditions. A trade
                  idea that is profitable at one broker may result in a loss at another due to
                  differences in spreads, execution, or swap rates. Always confirm the exact
                  specifications of your trading account and ensure that any analysis or signal
                  you consider is compatible with your broker&apos;s offering and your account
                  parameters.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 11. THIRD-PARTY PLATFORMS */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-trading-red/10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-trading-red font-mono text-sm">11</span>
                Third-Party Platforms
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  Content shared in the Forex Wizard Telegram community may reference third-party
                  platforms, tools, or services. Forex Wizard does not control, verify, or endorse
                  any third-party platform or service. Use of any third-party platform is at your
                  own risk, and you should review that platform&apos;s terms of service and risk
                  disclosures independently.
                </p>
                <p>
                  Forex Wizard is not responsible for any losses resulting from the use of
                  third-party platforms. Third-party services may have their own fees, risks, and
                  limitations that are separate from and in addition to the risks of trading itself.
                  Before using any external tool or platform, you should conduct thorough research,
                  read user reviews, and understand the security and privacy implications of
                  granting access to your trading accounts or personal information.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 12. TELEGRAM CONTENT */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-trading-red/10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-trading-red font-mono text-sm">12</span>
                Telegram Content
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  Content shared in the Forex Wizard Telegram community at{" "}
                  <a
                    href="https://t.me/ForexWizzz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-trading-green hover:text-trading-green/80 transition-colors no-underline"
                  >
                    https://t.me/ForexWizzz
                  </a>{" "}
                  is informational and educational. Members may share their own trade results,
                  opinions, and analysis, which have not been verified by Forex Wizard. Community
                  content does not represent official recommendations from Forex Wizard.
                </p>
                <p>
                  You should exercise independent judgment and not rely on community-shared
                  information as the sole basis for trading decisions. The Telegram community is
                  subject to Telegram&apos;s own terms of service. Other members&apos; reported
                  results may be selective, inaccurate, or not reflective of typical outcomes.
                  Never assume that another member&apos;s experience will be representative of your
                  own, as individual results depend on numerous factors including capital, risk
                  management, execution, and market timing.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 13. NO GUARANTEED RESULTS */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-trading-red/10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-trading-red font-mono text-sm">13</span>
                No Guaranteed Results
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  <span className="text-trading-red font-semibold">
                    Forex Wizard makes no representation, warranty, or guarantee that any trading
                    approach, strategy, signal, or method discussed on the website or in the
                    Telegram community will result in profits or avoid losses.
                  </span>{" "}
                  There are no guaranteed outcomes in trading. Any claim or suggestion that a
                  particular method eliminates risk or guarantees returns would be misleading and
                  is not made by Forex Wizard.
                </p>
                <p>
                  Trading involves uncertainty by its very nature. Markets are influenced by
                  countless factors, many of which are unpredictable and beyond the control of any
                  analyst or trader. No system, strategy, or signal service can change this
                  fundamental reality. You should be deeply skeptical of anyone who promises or
                  implies guaranteed returns, risk-free trading, or a system that never loses.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 14. USER RESPONSIBILITY */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-trading-red/10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-trading-red font-mono text-sm">14</span>
                User Responsibility
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  <span className="text-trading-red font-semibold">
                    You bear full responsibility for your trading decisions and their outcomes.
                  </span>{" "}
                  You are responsible for:
                </p>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>
                    Understanding the risks of trading before entering any position
                  </li>
                  <li>
                    Conducting your own independent analysis and research
                  </li>
                  <li>
                    Determining whether any signal or analysis is appropriate for your financial
                    situation
                  </li>
                  <li>
                    Managing your own risk, including position sizing and stop-loss placement
                  </li>
                  <li>
                    Complying with any applicable laws and regulations in your jurisdiction
                  </li>
                  <li>
                    Understanding your broker&apos;s terms, conditions, and execution policies
                  </li>
                </ul>
                <p>
                  No signal provider, community, or educational resource can make these decisions
                  for you or assume responsibility for the outcomes of your trades. Taking
                  responsibility for your own trading is not optional &mdash; it is an essential
                  prerequisite for participating in financial markets.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 15. SEEK INDEPENDENT PROFESSIONAL ADVICE */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-trading-red/10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-trading-red font-mono text-sm">15</span>
                Seek Independent Professional Advice Where Appropriate
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  Before engaging in forex or gold trading, you should consider seeking advice
                  from an independent and duly licensed financial adviser. This is particularly
                  important if you are unfamiliar with the risks involved, have limited trading
                  experience, or are trading with capital you cannot afford to lose.
                </p>
                <p>
                  A qualified professional can help you assess whether trading is suitable for
                  your individual financial circumstances and risk tolerance. They can also help
                  you understand the tax implications of trading in your jurisdiction, develop an
                  appropriate financial plan, and identify whether there are alternative
                  investment approaches that may better align with your goals and risk profile.
                  Forex Wizard is not a substitute for professional financial advice.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 16. CONTACT */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-trading-green/10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-trading-green font-mono text-sm">16</span>
                Contact
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  For questions about this Risk Disclosure, contact:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-muted-foreground/60">Email:</span>{" "}
                    <a
                      href="mailto:forexwizardy@gmail.com"
                      className="text-trading-green hover:text-trading-green/80 transition-colors no-underline"
                    >
                      forexwizardy@gmail.com
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-muted-foreground/60">Telegram:</span>{" "}
                    <a
                      href="https://t.me/ForexWizzz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-trading-green hover:text-trading-green/80 transition-colors no-underline"
                    >
                      https://t.me/ForexWizzz
                    </a>
                  </li>
                </ul>
                <p>
                  You may also wish to review our{" "}
                  <Link
                    href="/terms-of-use/"
                    className="text-trading-green hover:text-trading-green/80 transition-colors no-underline"
                  >
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy/"
                    className="text-trading-green hover:text-trading-green/80 transition-colors no-underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  for additional information about how Forex Wizard operates and how your data is
                  handled.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* IMPORTANT NOTICE BANNER */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-trading-red/20 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-trading-red/10 mb-4">
                <AlertTriangle className="w-6 h-6 text-trading-red" />
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                <span className="text-trading-red font-semibold">Important:</span>{" "}
                This Risk Disclosure does not constitute financial advice. It is provided to help
                you understand the risks associated with trading forex and gold. By using the Forex
                Wizard website or Telegram community, you acknowledge that you have read and
                understood this disclosure. If you do not understand any part of this disclosure,
                you should seek clarification before engaging in any trading activity.
              </p>
            </div>
          </div>
        </FadeSection>

        <SiteFooter />
      </main>

      <StickyTelegramButton
        href={TELEGRAM_LINK}
        label="Join Forex Wizard on Telegram"
      />
    </>
  );
}
