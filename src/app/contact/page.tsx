import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle, ArrowRight, HelpCircle } from "lucide-react";
import {
  FadeSection,
  FadeIn,
  StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Contact Forex Wizard",
  description:
    "Contact Forex Wizard for questions about our educational content, trading community, or website. Reach us via email or Telegram.",
  alternates: {
    canonical: "https://forexwizard.online/contact/",
  },
  openGraph: {
    title: "Contact Forex Wizard",
    description:
      "Contact Forex Wizard for questions about our educational content, trading community, or website.",
    type: "article",
    url: "https://forexwizard.online/contact/",
    siteName: "Forex Wizard",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Forex Wizard - Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Forex Wizard",
    description:
      "Contact Forex Wizard for questions about our educational content, trading community, or website.",
    images: ["/og-image.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

export default function ContactPage() {
  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-trading-dark/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-4">
          <Link
            href="/"
            className="text-lg font-bold text-trading-green hover:text-trading-green/80 transition-colors no-underline"
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
              href="/contact/"
              className="text-sm font-medium text-trading-green hover:text-trading-green/80 transition-colors no-underline"
            >
              Contact
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
        <section className="relative min-h-[50vh] flex flex-col items-center justify-center px-4 py-24 md:py-28 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-trading-green/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-trading-gold/5 rounded-full blur-[100px] pointer-events-none" />
          <CandlestickBackground />

          <FadeIn className="relative z-10 text-center max-w-4xl mx-auto">
            <FadeIn delay={0.2} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-green">
                <span className="w-2 h-2 bg-trading-green rounded-full animate-pulse" />
                Get In Touch
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">Contact </span>
              <span className="text-trading-green text-glow-green">
                Forex Wizard
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We welcome questions about our educational content, trading
              community, and website. You can reach Forex Wizard through the
              following contact methods.
            </p>
          </FadeIn>
        </section>

        {/* CONTACT CARDS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Email Card */}
              <FadeIn className="glass-strong gradient-border rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-trading-green/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-trading-green" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Email</h2>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  For questions about website content, educational material, or
                  general inquiries. We aim to respond within a reasonable
                  timeframe.
                </p>
                <a
                  href="mailto:forexwizardy@gmail.com"
                  className="inline-flex items-center gap-2 text-trading-green hover:text-trading-gold transition-colors font-semibold no-underline"
                >
                  forexwizardy@gmail.com
                  <ArrowRight className="w-4 h-4" />
                </a>
              </FadeIn>

              {/* Telegram Card */}
              <FadeIn
                delay={0.15}
                className="glass-strong gradient-border rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#0088cc]/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#0088cc]" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">
                    Telegram
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Join our free Telegram community for daily forex and gold
                  trading discussions, market analysis, and educational content.
                </p>
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#0088cc] hover:text-[#0088cc]/80 transition-colors font-semibold no-underline"
                >
                  @ForexWizzz
                  <ArrowRight className="w-4 h-4" />
                </a>
              </FadeIn>
            </div>
          </div>
        </FadeSection>

        {/* WHAT WE CAN HELP WITH */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">What We Can </span>
                <span className="text-trading-green text-glow-green">
                  Help With
                </span>
              </h2>
            </FadeIn>

            <FadeIn
              delay={0.1}
              className="glass-strong gradient-border rounded-2xl p-6 md:p-8"
            >
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <HelpCircle className="w-5 h-5 text-trading-green shrink-0 mt-0.5" />
                  <span>
                    Questions about website content and educational articles
                  </span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <HelpCircle className="w-5 h-5 text-trading-green shrink-0 mt-0.5" />
                  <span>
                    Inquiries about the Forex Wizard Telegram community
                  </span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <HelpCircle className="w-5 h-5 text-trading-green shrink-0 mt-0.5" />
                  <span>Feedback about the website or content</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <HelpCircle className="w-5 h-5 text-trading-green shrink-0 mt-0.5" />
                  <span>Reporting issues with the website</span>
                </li>
              </ul>
            </FadeIn>
          </div>
        </FadeSection>

        {/* IMPORTANT NOTE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn
              delay={0.1}
              className="glass-strong gradient-border rounded-2xl p-6 md:p-8 border border-trading-gold/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-trading-gold/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-trading-gold" />
                </div>
                <h2 className="text-lg font-bold text-trading-gold">
                  Important Note
                </h2>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Forex Wizard does not provide personalized financial advice
                through any contact channel. Any response to inquiries is for
                informational purposes only and should not be treated as a
                recommendation to enter, modify, or exit any trade or investment.
                For personalized financial advice, please consult a qualified and
                licensed financial adviser.
              </p>
            </FadeIn>
          </div>
        </FadeSection>

        {/* ADDITIONAL RESOURCES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
                <span className="text-foreground">Additional </span>
                <span className="text-trading-green text-glow-green">
                  Resources
                </span>
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FadeIn delay={0.1}>
                <Link
                  href="/privacy-policy/"
                  className="glass-strong rounded-xl p-5 flex items-center gap-3 text-muted-foreground hover:text-trading-green transition-colors no-underline group"
                >
                  <ArrowRight className="w-4 h-4 text-trading-green group-hover:translate-x-1 transition-transform" />
                  <span className="text-sm font-medium">Privacy Policy</span>
                </Link>
              </FadeIn>
              <FadeIn delay={0.15}>
                <Link
                  href="/terms-of-use/"
                  className="glass-strong rounded-xl p-5 flex items-center gap-3 text-muted-foreground hover:text-trading-green transition-colors no-underline group"
                >
                  <ArrowRight className="w-4 h-4 text-trading-green group-hover:translate-x-1 transition-transform" />
                  <span className="text-sm font-medium">Terms of Use</span>
                </Link>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Link
                  href="/risk-disclosure/"
                  className="glass-strong rounded-xl p-5 flex items-center gap-3 text-muted-foreground hover:text-trading-green transition-colors no-underline group"
                >
                  <ArrowRight className="w-4 h-4 text-trading-green group-hover:translate-x-1 transition-transform" />
                  <span className="text-sm font-medium">Risk Disclosure</span>
                </Link>
              </FadeIn>
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
