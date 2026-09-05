import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle, TrendingUp, BarChart3, LineChart, BookOpen, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found | Forex Wizard",
  description: "The page you are looking for may have moved or no longer exists. Return to Forex Wizard for free Forex and Gold trading signals.",
  robots: { index: false, follow: false },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

const exploreLinks = [
  { href: "/forex-signals/", label: "Forex Signals", icon: <TrendingUp className="w-4 h-4" /> },
  { href: "/gold-signals/", label: "Gold Signals", icon: <BarChart3 className="w-4 h-4" /> },
  { href: "/xauusd-analysis/", label: "XAUUSD Analysis", icon: <LineChart className="w-4 h-4" /> },
  { href: "/how-to-trade-xauusd/", label: "How to Trade XAUUSD", icon: <BookOpen className="w-4 h-4" /> },
  { href: "/about/", label: "About", icon: <Info className="w-4 h-4" /> },
];

export default function NotFound() {
  return (
    <>
      {/* NAV */}
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
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className="min-h-[calc(100vh-180px)] bg-trading-dark text-foreground overflow-x-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-trading-green/5 rounded-full blur-[120px] pointer-events-none" />

        <section className="relative z-10 flex flex-col items-center justify-center px-4 py-20 md:py-28">
          <div className="text-center max-w-xl mx-auto">
            {/* 404 label */}
            <p className="text-sm font-medium text-trading-green tracking-widest uppercase mb-4">
              404
            </p>

            {/* H1 */}
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Page Not Found
            </h1>

            {/* Supporting text */}
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
              The page you are looking for may have moved, been removed, or the
              URL may be incorrect.
            </p>
            <p className="text-muted-foreground/70 text-sm leading-relaxed mb-10">
              You can return to Forex Wizard or continue learning with one of our
              trading guides.
            </p>

            {/* Primary CTA */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-base rounded-xl px-8 py-4 bg-trading-green text-trading-dark hover:scale-105 hover:shadow-[0_0_30px_rgba(0,230,118,0.6)] active:scale-95 transition-all duration-300 no-underline select-none"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Homepage
            </Link>
          </div>
        </section>

        {/* Explore links section */}
        <section className="relative z-10 max-w-2xl mx-auto px-4 pb-20">
          <p className="text-xs font-medium text-muted-foreground/50 tracking-widest uppercase text-center mb-6">
            Explore Forex Wizard
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exploreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 glass rounded-xl px-5 py-3.5 text-sm font-medium text-foreground hover:text-trading-green hover:border-trading-green/30 transition-all duration-300 no-underline group"
              >
                <span className="text-muted-foreground group-hover:text-trading-green transition-colors">
                  {link.icon}
                </span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Telegram CTA - subtle, non-aggressive */}
          <div className="mt-10 text-center">
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#0088cc] transition-colors no-underline"
            >
              <MessageCircle className="w-4 h-4" />
              Join our Telegram community
            </a>
          </div>
        </section>
      </main>

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
        </div>
      </footer>
    </>
  );
}
