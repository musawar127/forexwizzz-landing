import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  MessageCircle,
  Target,
  TrendingUp,
  BookOpen,
  LineChart,
  Layers,
  Activity,
  Globe,
  Info,
  Eye,
} from "lucide-react";
import {
  FadeSection,
  FadeIn,
  HeroAnimation,
  PulsingGlow,
  StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "About Forex Wizard | Forex & Gold Market Analysis",
  description:
    "Learn about Forex Wizard, our forex and gold market analysis approach, educational content, trading insights and Telegram community.",
  alternates: {
    canonical: "https://forexwizard.online/about/",
  },
  openGraph: {
    title: "About Forex Wizard | Forex & Gold Market Analysis",
    description:
      "Learn about Forex Wizard, our approach to forex and gold market analysis, trading education and community updates.",
    type: "website",
    url: "https://forexwizard.online/about/",
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
    title: "About Forex Wizard | Forex & Gold Market Analysis",
    description:
      "Learn about Forex Wizard, our approach to forex and gold market analysis, trading education and community updates.",
    images: ["/og-image.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

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

const whatWeCover = [
  {
    icon: <TrendingUp className="w-6 h-6 text-trading-green" />,
    title: "Forex Signals",
    desc: "Information about forex trading signals and market setups covering major currency pairs. Our forex signals page explains what signals include, how they are structured, and what traders should consider before acting on any trade idea.",
    href: "/forex-signals/",
    linkText: "Explore forex signals",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-trading-gold" />,
    title: "Gold Signals",
    desc: "Gold and XAUUSD-focused market information including signal components, trading strategies, session analysis, and risk management principles specific to the gold market.",
    href: "/gold-signals/",
    linkText: "Explore gold trading signals",
  },
  {
    icon: <LineChart className="w-6 h-6 text-trading-gold" />,
    title: "XAUUSD Analysis",
    desc: "Educational and analytical content covering XAUUSD price action, market structure, support and resistance, the factors that influence gold prices, and how to think about bullish and bearish scenarios.",
    href: "/xauusd-analysis/",
    linkText: "Explore XAUUSD analysis",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-blue-400" />,
    title: "Trading Education",
    desc: "Concepts such as market structure, support and resistance, trend analysis, risk management, position sizing, and how to evaluate trading analysis independently.",
    href: "/xauusd-analysis/",
    linkText: "Learn about analysis approaches",
  },
];

const approachItems = [
  {
    icon: <LineChart className="w-5 h-5 text-trading-gold" />,
    title: "Price Action",
    desc: "Reading raw price movement to identify momentum, rejection, and potential areas of interest.",
  },
  {
    icon: <Layers className="w-5 h-5 text-trading-green" />,
    title: "Market Structure",
    desc: "Analyzing the sequence of swings to determine trend direction and market phase.",
  },
  {
    icon: <Target className="w-5 h-5 text-blue-400" />,
    title: "Support & Resistance",
    desc: "Identifying levels where buying or selling pressure has historically increased.",
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-trading-gold" />,
    title: "Trends & Volatility",
    desc: "Understanding directional momentum and adjusting for varying market conditions.",
  },
  {
    icon: <Globe className="w-5 h-5 text-purple-400" />,
    title: "Economic Events",
    desc: "Considering how data releases, central bank decisions, and macro factors may affect markets.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-trading-green" />,
    title: "Risk Management",
    desc: "Emphasizing stop-loss usage, position sizing, and risk/reward on every analysis.",
  },
];

const educationPoints = [
  {
    icon: <Eye className="w-5 h-5 text-trading-gold" />,
    title: "Understand the Setup",
    desc: "Before acting on any market analysis, take the time to understand the reasoning behind it. What levels are being watched? What factors support the view? What could invalidate it?",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-trading-red" />,
    title: "Consider the Risk",
    desc: "Every trade involves risk. Before entering any position, define how much capital you are willing to lose and ensure it is an amount you can afford. Use stop-loss orders consistently.",
  },
  {
    icon: <Layers className="w-5 h-5 text-trading-green" />,
    title: "Use Appropriate Position Sizing",
    desc: "The size of your position should be determined by your stop-loss distance and your account risk tolerance, not by how confident you feel about a particular trade idea.",
  },
  {
    icon: <Activity className="w-5 h-5 text-blue-400" />,
    title: "Account for Volatility",
    desc: "Markets behave differently during high-volatility periods. Adjust your approach around major economic events and understand that spreads can widen and slippage can increase.",
  },
  {
    icon: <BookOpen className="w-5 h-5 text-trading-gold" />,
    title: "Make Your Own Decisions",
    desc: "Market analysis from any source is an input, not an instruction. The final decision to enter, hold, or exit a trade should always be yours, based on your own assessment and risk parameters.",
  },
  {
    icon: <AlertTriangle className="w-5 h-5 text-trading-red" />,
    title: "Seek Professional Advice When Needed",
    desc: "If you are unsure about any aspect of trading or your financial situation, consider consulting a qualified financial advisor who can provide personalized guidance.",
  },
];

export default function AboutPage() {
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
              className="text-sm font-medium text-trading-green hover:text-trading-green/80 transition-colors no-underline"
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
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-trading-green/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-trading-gold/5 rounded-full blur-[100px] pointer-events-none" />
          <CandlestickBackground />

          <HeroAnimation className="relative z-10 text-center max-w-4xl mx-auto">
            <FadeIn delay={0.2} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-green">
                <span className="w-2 h-2 bg-trading-green rounded-full animate-pulse" />
                About Forex Wizard
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">About </span>
              <span className="text-trading-green text-glow-green">Forex Wizard</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Forex Wizard is an online resource focused on forex market analysis,
              gold and XAUUSD insights, trading education, and community updates.
              Explore our content and join the Telegram community to follow along.
            </p>

            <FadeIn delay={0.5}>
              <TelegramCTA text="Join Forex Wizard Telegram" variant="primary" />
            </FadeIn>
          </HeroAnimation>
        </section>

        {/* WHO IS FOREXWIZARD? */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Who Is </span>
                <span className="text-trading-green text-glow-green">Forex Wizard?</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Forex Wizard is an online resource focused on forex and gold market
                analysis, trading education, and market-related insights. The
                website provides educational content about forex and XAUUSD
                trading, including analysis frameworks, risk management concepts,
                and information about how traders may approach the market.
              </p>
              <p>
                In addition to the website, Forex Wizard operates a free Telegram
                community where members can follow market updates, analysis
                discussions, and trading-related insights. The Telegram
                community is an extension of the educational content available on
                the website and provides a space for traders to follow market
                developments together.
              </p>
              <p>
                Forex Wizard does not claim to be a registered financial advisory
                service, a licensed brokerage, or a regulated investment firm. The
                content on this website and in the Telegram community is for
                educational and informational purposes only. Visitors should
                always conduct their own research and consider seeking qualified
                professional advice before making any financial decisions.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* WHAT WE COVER */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">What We </span>
                <span className="text-trading-gold text-glow-gold">Cover</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                The main topics and resources available through Forex Wizard.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whatWeCover.map((item, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-green/10 to-trading-gold/10 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-trading-green hover:text-trading-green/80 transition-colors no-underline mt-auto"
                    >
                      {item.linkText} &rarr;
                    </Link>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* OUR APPROACH */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Our </span>
                <span className="text-trading-green text-glow-green">Approach</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                The types of analysis and considerations that may inform the
                market insights shared through Forex Wizard.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {approachItems.map((item, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-trading-green/10 to-transparent flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-sm font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="mt-8 glass-strong rounded-2xl p-5 text-center border border-white/5">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Market analysis is an interpretation of available information and
                does not guarantee future price movement. The same data can be
                interpreted differently by different traders, and markets can
                behave in ways that no analysis anticipates.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* EDUCATION FIRST */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full glass-strong mb-6">
                <BookOpen className="w-8 h-8 text-trading-gold" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Education </span>
                <span className="text-trading-gold text-glow-gold">First</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Forex Wizard believes that traders benefit most when they
                understand the reasoning behind market analysis rather than
                blindly following trade directions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {educationPoints.map((item, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-trading-gold/10 to-transparent flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-sm font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* TELEGRAM COMMUNITY */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-green/5 via-transparent to-trading-gold/5 rounded-3xl blur-sm" />
            <div className="relative glass-strong rounded-3xl p-8 md:p-14 text-center gradient-border">
              <div className="w-16 h-16 rounded-full bg-trading-green/10 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-trading-green" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                <span className="text-foreground">Forex Wizard </span>
                <span className="text-trading-green text-glow-green">Telegram Community</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                Forex Wizard also has a free Telegram community where members
                can follow market updates, analysis discussions, and trading
                insights. The community is an extension of the educational
                content on this website and provides a space to stay connected
                with market developments.
              </p>
              <PulsingGlow className="inline-block rounded-xl">
                <TelegramCTA
                  text="Join Forex Wizard on Telegram"
                  variant="primary"
                  className="text-lg md:text-xl px-10 py-5"
                />
              </PulsingGlow>
              <p className="mt-6 text-xs text-muted-foreground/60">
                Free to join &middot; Trading involves risk
              </p>
            </div>
          </div>
        </FadeSection>

        {/* RISK & TRANSPARENCY */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full glass-strong mb-6">
                <AlertTriangle className="w-8 h-8 text-trading-red" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Risk &amp; </span>
                <span className="text-trading-red">Transparency</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              <p>
                Forex and gold trading involve significant risk. Markets can move
                quickly and unpredictably in response to economic data, central
                bank decisions, and geopolitical events. Leverage, which is
                commonly available in forex and gold trading, amplifies both
                potential gains and potential losses.
              </p>
              <p>
                Past performance does not guarantee future results. No trading
                strategy, signal, or analysis method can guarantee profits. Any
                content that suggests otherwise is being misleading. Traders can
                and do lose money, and in some cases can lose more than their
                initial investment.
              </p>
              <p>
                Visitors should never risk money they cannot afford to lose.
                Before participating in forex or gold trading, individuals should
                carefully consider their financial situation, risk tolerance, and
                seek qualified professional financial advice if needed.
              </p>
            </div>

            <div className="glass-strong rounded-2xl p-6 md:p-8 text-center border border-trading-red/20">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Forex Wizard provides market-related information and educational
                content for informational purposes only. Forex and gold trading
                involve significant risk, and past performance does not guarantee
                future results. Nothing on this website should be considered
                personalized financial advice or a guarantee of trading
                performance.
              </p>
            </div>
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
