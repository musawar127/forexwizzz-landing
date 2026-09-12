import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, MessageCircle, Newspaper } from "lucide-react";
import {
  FadeSection,
  FadeIn,
  HeroAnimation,
  PulsingGlow,
  StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog | Forex Wizard XAUUSD & Gold Market Analysis",
  description:
    "The Forex Wizard blog shares educational XAUUSD and gold market analysis, weekly gold outlooks, key levels, trading sessions and risk management for traders.",
  alternates: {
    canonical: "https://forexwizard.online/blog/",
  },
  openGraph: {
    title: "Blog | Forex Wizard XAUUSD & Gold Market Analysis",
    description:
      "Educational XAUUSD and gold market analysis, weekly gold outlooks, key levels, trading sessions and risk management for traders.",
    type: "website",
    url: "https://forexwizard.online/blog/",
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
    title: "Blog | Forex Wizard XAUUSD & Gold Market Analysis",
    description:
      "Educational XAUUSD and gold market analysis, weekly gold outlooks, key levels, trading sessions and risk management for traders.",
    images: ["/og-image.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

/* ------------------------------------------------------------------ */
/*  CTA BUTTON                                                         */
/* ------------------------------------------------------------------ */
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

export default function BlogIndexPage() {
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
              href="/blog/"
              className="text-sm font-medium text-trading-gold hover:text-trading-gold/80 transition-colors no-underline"
            >
              Blog
            </Link>
            <Link
              href="/about/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden lg:block"
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
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 py-24 md:py-28 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-trading-green/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-trading-gold/5 rounded-full blur-[100px] pointer-events-none" />
          <CandlestickBackground />

          <HeroAnimation className="relative z-10 text-center max-w-4xl mx-auto">
            <FadeIn delay={0.2} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-green">
                <Newspaper className="w-4 h-4" />
                Forex Wizard Blog
              </span>
            </FadeIn>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">XAUUSD &amp; Gold </span>
              <span className="text-trading-gold text-glow-gold">
                Market Analysis
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Educational gold and XAUUSD market content from the Forex Wizard
              team &mdash; weekly outlooks, key levels, trading sessions and
              risk management. Explore our latest analysis below.
            </p>
          </HeroAnimation>
        </section>

        {/* ARTICLE CARDS */}
        <FadeSection className="py-16 md:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
                <span className="text-foreground">Latest </span>
                <span className="text-trading-gold text-glow-gold">
                  Articles
                </span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
                Weekly gold outlooks and educational XAUUSD analysis. New
                articles are added regularly.
              </p>
            </div>

            {blogPosts.length === 0 ? (
              <div className="glass-strong rounded-2xl p-10 text-center text-muted-foreground">
                No articles have been published yet. Please check back soon.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.map((post, i) => (
                  <FadeIn key={post.slug} delay={i * 0.07}>
                    <article className="glass-strong rounded-2xl overflow-hidden gradient-border hover:scale-[1.02] transition-transform duration-300 h-full flex flex-col">
                      <Link
                        href={`/blog/${post.slug}/`}
                        className="block no-underline group"
                      >
                        <img
                          src={post.image}
                          alt={post.imageAlt}
                          width={1200}
                          height={630}
                          loading="lazy"
                          className="w-full aspect-[1200/630] object-cover"
                        />
                      </Link>
                      <div className="p-6 flex flex-col gap-4 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-semibold uppercase tracking-wider text-trading-green/80 bg-trading-green/5 border border-trading-green/20 rounded-full px-3 py-1"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-col gap-2">
                          <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                            <Link
                              href={`/blog/${post.slug}/`}
                              className="no-underline hover:text-trading-gold transition-colors"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-xs text-muted-foreground/70">
                            {post.displayDate} &middot; {post.readingTime}
                          </p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                          {post.cardDescription}
                        </p>

                        <div className="pt-2">
                          <Link
                            href={`/blog/${post.slug}/`}
                            className="inline-flex items-center gap-2 text-sm font-bold text-trading-green hover:text-trading-green/80 transition-colors no-underline"
                          >
                            <BookOpen className="w-4 h-4" />
                            Read Article
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        </FadeSection>

        {/* TELEGRAM CTA */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-green/5 via-transparent to-trading-gold/5 rounded-3xl blur-sm" />
            <div className="relative glass-strong rounded-3xl p-8 md:p-14 text-center gradient-border">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                <span className="text-foreground">Follow XAUUSD Updates on </span>
                <span className="text-trading-green text-glow-green">
                  Telegram
                </span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                Join the Forex Wizard Telegram community for educational XAU/USD
                market structure, key zones and trading-related education.
              </p>
              <PulsingGlow className="inline-block rounded-xl">
                <TelegramCTA
                  text="Join Forex Wizard Telegram"
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

        {/* CONTINUE LEARNING */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">Explore </span>
                <span className="text-trading-gold text-glow-gold">
                  Forex Wizard
                </span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Continue learning with our core gold and forex market pages.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <Link href="/gold-signals/" className="block h-full no-underline">
                <div className="glass-strong rounded-2xl p-6 flex flex-col gap-3 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                  <Newspaper className="w-7 h-7 text-trading-gold" />
                  <h3 className="text-base font-bold text-foreground">
                    Gold Signals
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Educational gold signals and XAUUSD market analysis.
                  </p>
                </div>
              </Link>
              <Link href="/forex-signals/" className="block h-full no-underline">
                <div className="glass-strong rounded-2xl p-6 flex flex-col gap-3 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                  <Newspaper className="w-7 h-7 text-trading-green" />
                  <h3 className="text-base font-bold text-foreground">
                    Forex Signals
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Broader forex trading signals and currency-pair analysis.
                  </p>
                </div>
              </Link>
              <Link
                href="/xauusd-analysis/"
                className="block h-full no-underline"
              >
                <div className="glass-strong rounded-2xl p-6 flex flex-col gap-3 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                  <BookOpen className="w-7 h-7 text-trading-gold" />
                  <h3 className="text-base font-bold text-foreground">
                    XAUUSD Analysis
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The main hub for XAUUSD and gold market structure.
                  </p>
                </div>
              </Link>
              <Link href="/about/" className="block h-full no-underline">
                <div className="glass-strong rounded-2xl p-6 flex flex-col gap-3 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                  <BookOpen className="w-7 h-7 text-trading-green" />
                  <h3 className="text-base font-bold text-foreground">
                    About Forex Wizard
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Learn about the community and our educational approach.
                  </p>
                </div>
              </Link>
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
