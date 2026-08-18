import Link from "next/link";
import {
  TrendingUp,
  BarChart3,
  Trophy,
  Smartphone,
  GraduationCap,
  Zap,
  Clock,
  Star,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import {
  FadeSection,
  FadeIn,
  ScaleIn,
  HeroAnimation,
  PulsingGlow,
  FloatingElement,
  PulsingIcon,
  StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

/* ------------------------------------------------------------------ */
/*  REUSABLE CTA BUTTON (server-rendered, no motion dependency)       */
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

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */
const features = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "FREE TRADING SIGNALS",
    emoji: "✅",
    desc: "Access trading ideas and potential setups shared with the community.",
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "MARKET ANALYSIS",
    emoji: "📊",
    desc: "Stay updated with market movements and important trading opportunities.",
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: "FOREX & GOLD",
    emoji: "🥇",
    desc: "Follow trading setups covering popular Forex pairs and Gold/XAUUSD.",
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "TELEGRAM COMMUNITY",
    emoji: "📱",
    desc: "Join a community of traders and follow market discussions in one place.",
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "LEARN & IMPROVE",
    emoji: "🎓",
    desc: "Use market insights and analysis to improve your own trading knowledge.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "EASY TO JOIN",
    emoji: "⚡",
    desc: "Click the button and instantly access our free Telegram community.",
  },
];

const testimonials = [
  {
    name: "Ahmed K.",
    text: "The free signals have helped me understand the market much better. I always check the group before entering a trade.",
    stars: 5,
  },
  {
    name: "Sarah M.",
    text: "I joined for the free signals and stayed because the market analysis is really useful. Great community.",
    stars: 5,
  },
  {
    name: "Raj P.",
    text: "Daily updates on Gold and Forex pairs have been a great addition to my trading routine. Highly recommend.",
    stars: 4,
  },
  {
    name: "Omar T.",
    text: "The community shares real market insights. It is a good place to learn and follow trading discussions.",
    stars: 5,
  },
  {
    name: "David L.",
    text: "I appreciate the transparency. The signals come with clear entry and exit levels which helps a lot.",
    stars: 4,
  },
  {
    name: "Yusuf H.",
    text: "Best free Telegram group I have found for Forex and Gold. The analysis quality is solid.",
    stars: 5,
  },
];

const earningImages = [
  { src: "earning-1.jpg", alt: "ForexWizzz community member shared screenshot of a Gold trade on their trading platform", width: 590, height: 1280 },
  { src: "earning-2.jpg", alt: "Trading account screenshot shared by a ForexWizzz Telegram group member", width: 891, height: 1280 },
  { src: "earning-3.jpg", alt: "XAUUSD trade screenshot from a member of the ForexWizzz trading community", width: 591, height: 1280 },
  { src: "earning-4.jpg", alt: "Forex trade activity screenshot submitted by a ForexWizzz community member", width: 1080, height: 1042 },
  { src: "earning-5.jpg", alt: "Gold trade screenshot shared in the ForexWizzz free Telegram signals group", width: 589, height: 1280 },
];

const telegramFeatures = [
  {
    title: "Forex Trading Signals",
    desc: "Daily buy/sell setups with entry, TP, and SL levels for major pairs.",
    gradient: "from-trading-green/10 to-transparent",
    icon: <TrendingUp className="w-6 h-6 text-trading-green" />,
  },
  {
    title: "XAUUSD / Gold Signals",
    desc: "Gold-specific analysis and trading ideas shared with the community.",
    gradient: "from-trading-gold/10 to-transparent",
    icon: <Trophy className="w-6 h-6 text-trading-gold" />,
  },
  {
    title: "Market Analysis",
    desc: "In-depth market breakdowns and key levels to watch.",
    gradient: "from-blue-400/10 to-transparent",
    icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
  },
  {
    title: "Community Discussions",
    desc: "Real-time conversations with traders sharing ideas and feedback.",
    gradient: "from-purple-400/10 to-transparent",
    icon: <MessageCircle className="w-6 h-6 text-purple-400" />,
  },
];

/* ------------------------------------------------------------------ */
/*  MAIN PAGE (Server Component)                                      */
/* ------------------------------------------------------------------ */
export default function Home() {
  return (
    <>
      <header className="relative z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-lg font-bold text-foreground tracking-tight">
            ForexWizzz
          </span>
          <nav className="flex items-center gap-6">
            <Link
              href="/forex-signals/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block"
            >
              Forex Signals
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
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 md:py-28 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-trading-green/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-trading-gold/5 rounded-full blur-[100px] pointer-events-none" />

          <CandlestickBackground />

          <HeroAnimation className="relative z-10 text-center max-w-4xl mx-auto">
            <FadeIn delay={0.2} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-green">
                <span className="w-2 h-2 bg-trading-green rounded-full animate-pulse" />
                100% Free Trading Community
              </span>
            </FadeIn>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">GET FREE </span>
              <span className="text-trading-green text-glow-green">FOREX</span>
              <span className="text-foreground"> &amp; </span>
              <span className="text-trading-gold text-glow-gold">GOLD</span>
              <br />
              <span className="text-foreground">TRADING SIGNALS</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              ForexWizzz is a free Telegram community where traders share daily
              Forex and Gold trading signals, XAUUSD analysis, market breakdowns,
              and educational trading content. Join to follow real-time discussions
              and improve your understanding of the forex market.
            </p>

            <FadeIn delay={0.5}>
              <TelegramCTA text="Join ForexWizzz on Telegram" variant="primary" />
            </FadeIn>

            <FadeIn delay={0.8}>
              <p className="mt-6 text-sm text-muted-foreground flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-trading-green" />
                  100% Free to Join
                </span>
                <span className="text-trading-border">|</span>
                <span>Daily Signals</span>
                <span className="text-trading-border">|</span>
                <span>Forex</span>
                <span className="text-trading-border">|</span>
                <span>Gold</span>
                <span className="text-trading-border">|</span>
                <span>Market Analysis</span>
              </p>
            </FadeIn>
          </HeroAnimation>

          <FloatingElement className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5">
              <div className="w-1.5 h-1.5 bg-trading-green rounded-full animate-bounce" />
            </div>
          </FloatingElement>
        </section>

        <FadeSection className="relative py-20 md:py-28 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-trading-green/[0.03] to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
              <span className="text-trading-gold text-glow-gold">
                LOOKING FOR YOUR NEXT
              </span>
              <br />
              <span className="text-foreground">TRADING OPPORTUNITY?</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              Instead of searching for trading opportunities alone, join the
              ForexWizzz free Telegram community. Members share daily Forex analysis,
              Gold and XAUUSD trading ideas, and market commentary to help each
              other stay informed.
            </p>
            <TelegramCTA text="Join ForexWizzz on Telegram" variant="gold" />
          </div>
        </FadeSection>

        <FadeSection className="py-20 md:py-28 px-4" delay={0.1}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">SEE WHAT OUR </span>
                <span className="text-trading-green text-glow-green">
                  COMMUNITY
                </span>
                <br />
                <span className="text-foreground">IS SAYING</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                Real feedback from members of our trading community.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {testimonials.map((t, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star
                          key={si}
                          className={`w-4 h-4 ${
                            si < t.stars
                              ? "fill-trading-gold text-trading-gold"
                              : "text-white/20"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed flex-1">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-trading-green/20 to-trading-gold/20 flex items-center justify-center text-sm font-bold text-trading-green">
                        {t.name.charAt(0)}
                      </div>
                      <span className="text-sm font-semibold text-foreground/80">
                        {t.name}
                      </span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground/70 mb-8 max-w-lg mx-auto">
              Results vary. Trading involves risk. Past performance does not
              guarantee future results.
            </p>

            <div className="text-center">
              <TelegramCTA text="Join ForexWizzz on Telegram" variant="primary" />
            </div>
          </div>
        </FadeSection>

        <FadeSection className="py-20 md:py-28 px-4" delay={0.1}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-trading-gold text-glow-gold">MEMBER RESULTS</span>
                <br />
                <span className="text-foreground">FROM OUR COMMUNITY</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                Real screenshots shared by our community members showing their trading activity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {earningImages.map((img, i) => (
                <ScaleIn key={i} delay={i * 0.1}>
                  <div className="glass-strong rounded-2xl overflow-hidden gradient-border hover:scale-[1.02] transition-transform duration-300">
                    <div className="p-3 border-b border-white/5 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-trading-green animate-pulse" />
                      <span className="text-xs font-semibold text-muted-foreground">
                        Community Member
                      </span>
                      <span className="ml-auto text-xs text-trading-gold font-medium">Real Screenshot</span>
                    </div>
                    <div className="p-2">
                      <img
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        className="w-full h-auto rounded-xl object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </ScaleIn>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground/70 mb-8 max-w-lg mx-auto">
              Results vary. Trading involves risk. Past performance does not
              guarantee future results. These are real screenshots shared by community members.
            </p>

            <div className="text-center">
              <TelegramCTA text="Join ForexWizzz on Telegram" variant="primary" />
            </div>
          </div>
        </FadeSection>

        <FadeSection className="py-20 md:py-28 px-4" delay={0.1}>
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-trading-gold text-glow-gold">INSIDE OUR</span>
                <br />
                <span className="text-foreground">TELEGRAM COMMUNITY</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                Take a look at what our members see every day in the group.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              <ScaleIn className="sm:col-span-2 lg:col-span-2">
                <div className="glass-strong rounded-2xl overflow-hidden gradient-border">
                  <div className="p-3 border-b border-white/5 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-trading-green" />
                    <span className="text-xs font-semibold text-muted-foreground">
                      Live Community Screenshot
                    </span>
                  </div>
                  <div className="p-2">
                    <img
                      src="telegram-screenshot.jpg"
                      alt="ForexWizzz Telegram group screenshot showing Forex and Gold signal discussions"
                      width={640}
                      height={640}
                      className="w-full h-auto rounded-xl object-cover"
                    />
                  </div>
                </div>
              </ScaleIn>

              {telegramFeatures.map((item, i) => (
                <FadeIn key={i} delay={(i + 1) * 0.1}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="text-center mb-10">
              <p className="text-lg font-semibold text-foreground mb-5">
                WANT TO SEE OUR FREE SIGNALS FOR YOURSELF?
              </p>
              <TelegramCTA text="Join ForexWizzz on Telegram" variant="primary" />
            </div>
          </div>
        </FadeSection>

        <FadeSection className="py-20 md:py-28 px-4" delay={0.1}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-foreground">WHY JOIN OUR</span>
                <br />
                <span className="text-trading-green text-glow-green">
                  COMMUNITY?
                </span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                ForexWizzz provides a focused space for Forex and Gold traders
                to share market analysis, discuss XAUUSD price levels, and follow
                trading setups together. Explore our{" "}
                <Link href="/forex-signals/" className="text-trading-green hover:text-trading-green/80 transition-colors no-underline font-medium">
                  forex trading signals
                </Link>{" "}
                and{" "}
                <Link href="/gold-signals/" className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium">
                  gold analysis
                </Link>{" "}
                coverage for more details.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              {features.map((f, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 group h-full">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-green/10 to-trading-gold/10 flex items-center justify-center text-trading-green group-hover:from-trading-green/20 group-hover:to-trading-gold/20 transition-colors duration-300">
                        {f.icon}
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        {f.emoji} {f.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="text-center">
              <TelegramCTA text="Join ForexWizzz on Telegram" variant="primary" />
            </div>
          </div>
        </FadeSection>

        <FadeSection className="py-20 md:py-28 px-4" delay={0.1}>
          <div className="max-w-3xl mx-auto text-center">
            <PulsingIcon className="inline-flex items-center justify-center w-20 h-20 rounded-full glass-strong mb-8 glow-green-sm">
              <Clock className="w-10 h-10 text-trading-green" />
            </PulsingIcon>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
              <span className="text-foreground">DON&apos;T MISS THE NEXT</span>
              <br />
              <span className="text-trading-gold text-glow-gold">
                MARKET SETUP
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              The Forex and Gold markets move every day. Join the ForexWizzz
              community now so you don&apos;t miss the next trading idea, market
              update, or XAUUSD analysis shared by fellow traders.
            </p>
            <TelegramCTA
              text="Join ForexWizzz on Telegram"
              variant="gold"
            />
          </div>
        </FadeSection>

        <FadeSection className="py-20 md:py-28 px-4" delay={0.1}>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-green/5 via-transparent to-trading-gold/5 rounded-3xl blur-sm" />

            <div className="relative glass-strong rounded-3xl p-8 md:p-14 text-center gradient-border">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                <span className="text-foreground">READY TO JOIN THE</span>
                <br />
                <span className="text-trading-green text-glow-green">
                  COMMUNITY?
                </span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                Get free access to Forex and Gold trading signals, daily market
                updates, XAUUSD analysis, and trading community discussions. Forex
                trading involves significant risk — all content shared is for
                educational and informational purposes.
              </p>

              <PulsingGlow className="inline-block rounded-xl">
                <TelegramCTA
                  text="Join ForexWizzz on Telegram"
                  variant="primary"
                  className="text-lg md:text-xl px-10 py-5"
                />
              </PulsingGlow>

              <p className="mt-6 text-xs text-muted-foreground/60 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-trading-green" />
                  Free to join
                </span>
                <span className="text-trading-border">|</span>
                <span>No payment required</span>
                <span className="text-trading-border">|</span>
                <span>Trading involves risk</span>
              </p>
            </div>
          </div>
        </FadeSection>

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
              <Link
                href="/forex-signals/"
                className="text-xs text-muted-foreground/40 hover:text-trading-green transition-colors no-underline"
              >
                Forex Signals
              </Link>
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground/40 hover:text-trading-green transition-colors no-underline"
              >
                t.me/ForexWizzz
              </a>
            </div>
          </div>
        </footer>
      </main>

      <StickyTelegramButton
        href={TELEGRAM_LINK}
        label="Join ForexWizzz on Telegram"
      />
    </>
  );
}
