import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Clock, Percent, TrendingUp, DollarSign, ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import {
  FadeSection,
  FadeIn,
  HeroAnimation,
  StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Free Forex Trading Tools & Calculators | Forex Wizard",
  description:
    "Free forex trading tools and calculators from Forex Wizard. Calculate XAUUSD lot size, position risk, and plan your trades with our educational trading utilities.",
  alternates: {
    canonical: "https://forexwizard.online/tools/",
  },
  openGraph: {
    title: "Free Forex Trading Tools & Calculators | Forex Wizard",
    description:
      "Free forex trading tools and calculators from Forex Wizard. Calculate XAUUSD lot size, position risk, and plan your trades with our educational trading utilities.",
    type: "website",
    url: "https://forexwizard.online/tools/",
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
    title: "Free Forex Trading Tools & Calculators | Forex Wizard",
    description:
      "Free forex trading tools and calculators from Forex Wizard. Calculate XAUUSD lot size, position risk, and plan your trades with our educational trading utilities.",
    images: ["/og-image.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://forexwizard.online/" },
    { "@type": "ListItem", position: 2, name: "Trading Tools", item: "https://forexwizard.online/tools/" },
  ],
};

const activeTools = [
  {
    href: "/xauusd-lot-size/",
    title: "XAUUSD Lot Size & Risk Calculator",
    desc: "Calculate the correct XAUUSD position size based on your account equity, risk percentage, entry price, stop loss and broker specifications. Includes commission and slippage adjustments.",
    icon: <Calculator className="w-7 h-7 text-trading-green" />,
    badge: "LIVE",
  },
  {
    href: "/tools/forex-market-hours/",
    title: "Forex Market Hours & Live Session Clock",
    desc: "See live forex market hours in your local time. Track Sydney, Tokyo, London and New York sessions with countdowns, overlaps and DST-aware timezone conversion.",
    icon: <Clock className="w-7 h-7 text-trading-green" />,
    badge: "LIVE",
  },
  {
    href: "/xauusd-pip-value/",
    title: "XAUUSD & Forex Pip Value Calculator",
    desc: "Calculate pip values for gold and forex pairs. Compare pip conventions, convert to your account currency, and measure price distance between two prices.",
    icon: <Percent className="w-7 h-7 text-trading-green" />,
    badge: "LIVE",
  },
  {
    href: "/tools/risk-reward-calculator/",
    title: "Forex & XAUUSD Risk Reward Calculator",
    desc: "Calculate risk-to-reward from entry, stop loss and target. See R multiple, break-even win rate, expectancy and advanced multiple take-profit planning.",
    icon: <TrendingUp className="w-7 h-7 text-trading-green" />,
    badge: "LIVE",
  },
];

const upcomingTools = [
  { title: "Margin Calculator", desc: "Estimate the required margin for a position based on leverage and contract size.", icon: <DollarSign className="w-6 h-6 text-muted-foreground/50" /> },
  { title: "Drawdown Calculator", desc: "Calculate how much gain is needed to recover from a given percentage drawdown.", icon: <ShieldCheck className="w-6 h-6 text-muted-foreground/50" /> },
];

const relatedGuides = [
  { href: "/xauusd-lot-size/", title: "XAUUSD Lot Size Guide", desc: "The complete educational guide to gold position sizing and lot size calculations." },
  { href: "/blog/forex-risk-management-for-beginners/", title: "Forex Risk Management", desc: "Learn how lot size, stop-loss distance, leverage and total exposure work together." },
  { href: "/xauusd-pip-value/", title: "XAUUSD Pip Value", desc: "Understand how pip value works for gold trading." },
  { href: "/forex-signals/", title: "Forex Signals", desc: "Educational forex signals and market analysis from Forex Wizard." },
];

export default function ToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <header className="relative z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-foreground tracking-tight no-underline hover:text-trading-green transition-colors flex items-center gap-2">
            <img src="/brand/forexwizard-logo.webp" alt="ForexWizard logo" width={44} height={44} loading="eager" decoding="async" className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-lg object-cover" />
            Forex Wizard
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/forex-signals/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">Forex Signals</Link>
            <Link href="/gold-signals/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">Gold Signals</Link>
            <Link href="/xauusd-analysis/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">XAUUSD Analysis</Link>
            <Link href="/tools/" className="text-sm font-medium text-trading-gold hover:text-trading-gold/80 transition-colors no-underline">Trading Tools</Link>
            <Link href="/blog/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">Blog</Link>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-trading-green hover:text-trading-green/80 transition-colors no-underline">Join on Telegram</a>
          </nav>
        </div>
      </header>

      <main className="min-h-screen bg-trading-dark text-foreground overflow-x-hidden">
        <section className="relative px-4 py-16 md:py-24 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-trading-green/5 rounded-full blur-[120px] pointer-events-none" />
          <CandlestickBackground />
          <HeroAnimation className="relative z-10 max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">Free Forex </span>
              <span className="text-trading-green text-glow-green">Trading Tools</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Free forex and gold trading calculators from Forex Wizard. Plan
              position sizing with the XAUUSD Lot Size Calculator, track session
              timing with the Forex Market Hours Clock, measure movement value
              with the Pip Value Calculator, and evaluate trade payoff geometry
              with the Risk Reward Calculator &mdash; all directly in your
              browser, no registration or login required.
            </p>
            <p className="text-sm text-muted-foreground/70 max-w-xl mx-auto leading-relaxed mt-4">
              All results are educational estimates. Actual trading losses can
              differ due to spreads, slippage, gaps, commissions and execution
              conditions. Always verify broker specifications before trading.
            </p>
          </HeroAnimation>
        </section>

        {/* ACTIVE TOOLS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-10 text-center">
              <span className="text-foreground">Available </span>
              <span className="text-trading-green text-glow-green">Tools</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeTools.map((tool, i) => (
                <FadeIn key={tool.href} delay={i * 0.07}>
                  <Link href={tool.href} className="block h-full no-underline group">
                    <div className="glass-strong rounded-2xl p-6 md:p-8 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-trading-green/10 to-transparent flex items-center justify-center">
                          {tool.icon}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-trading-green bg-trading-green/10 border border-trading-green/30 rounded-full px-3 py-1">
                          {tool.badge}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-foreground">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {tool.desc}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-trading-green group-hover:translate-x-1 transition-transform">
                        Open Calculator <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* UPCOMING TOOLS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-center">
              <span className="text-foreground">Coming </span>
              <span className="text-trading-gold text-glow-gold">Soon</span>
            </h2>
            <p className="text-muted-foreground text-center text-base md:text-lg max-w-2xl mx-auto mb-10">
              More free calculators are being developed. These are shown as
 previews only and are not yet available.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcomingTools.map((tool, i) => (
                <FadeIn key={tool.title} delay={i * 0.05}>
                  <div className="glass rounded-2xl p-6 flex flex-col gap-3 opacity-60">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      {tool.icon}
                    </div>
                    <h3 className="text-sm font-bold text-foreground">{tool.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* RELATED GUIDES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-10 text-center">
              <span className="text-foreground">Related </span>
              <span className="text-trading-gold text-glow-gold">Guides</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedGuides.map((guide, i) => (
                <FadeIn key={guide.href} delay={i * 0.07}>
                  <Link href={guide.href} className="block h-full no-underline">
                    <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                      <BookOpen className="w-7 h-7 text-trading-gold" />
                      <h3 className="text-base font-bold text-foreground">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{guide.desc}</p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        <SiteFooter />
      </main>

      <StickyTelegramButton href={TELEGRAM_LINK} label="Join Forex Wizard on Telegram" />
    </>
  );
}
