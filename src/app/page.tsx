"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
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

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

/* ------------------------------------------------------------------ */
/*  ANIMATED CANDLESTICK BACKGROUND (SVG canvas)                     */
/* ------------------------------------------------------------------ */
function CandlestickBackground() {
  const candles = [
    { x: 10, h: 40, o: 20, c: 50, green: true },
    { x: 40, h: 55, o: 45, c: 25, green: false },
    { x: 70, h: 35, o: 30, c: 60, green: true },
    { x: 100, h: 50, o: 55, c: 20, green: false },
    { x: 130, h: 45, o: 15, c: 55, green: true },
    { x: 160, h: 60, o: 50, c: 30, green: false },
    { x: 190, h: 38, o: 25, c: 58, green: true },
    { x: 220, h: 52, o: 48, c: 18, green: false },
    { x: 250, h: 42, o: 20, c: 56, green: true },
    { x: 280, h: 48, o: 52, c: 22, green: false },
    { x: 310, h: 36, o: 28, c: 60, green: true },
    { x: 340, h: 55, o: 50, c: 28, green: false },
    { x: 370, h: 40, o: 22, c: 54, green: true },
    { x: 400, h: 50, o: 46, c: 24, green: false },
    { x: 430, h: 44, o: 18, c: 58, green: true },
    { x: 460, h: 58, o: 52, c: 26, green: false },
    { x: 490, h: 34, o: 30, c: 62, green: true },
    { x: 520, h: 46, o: 42, c: 20, green: false },
    { x: 550, h: 38, o: 24, c: 56, green: true },
    { x: 580, h: 52, o: 48, c: 30, green: false },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 600 80"
      >
        {candles.map((c, i) => (
          <g key={i} style={{ animationDelay: `${i * 0.2}s` }} className="animate-candlestick">
            {/* Wick */}
            <line
              x1={c.x + 6}
              y1={80 - c.h - 10}
              x2={c.x + 6}
              y2={80 - c.h + 30}
              stroke={c.green ? "#00e676" : "#ff1744"}
              strokeWidth={1.5}
              opacity={0.6}
            />
            {/* Body */}
            <rect
              x={c.x}
              y={80 - Math.max(c.o, c.c)}
              width={12}
              height={Math.abs(c.c - c.o) || 4}
              fill={c.green ? "#00e676" : "#ff1744"}
              opacity={0.7}
              rx={1}
            />
          </g>
        ))}
        {/* Grid lines */}
        {[20, 40, 60].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="600"
            y2={y}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={0.5}
          />
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  REUSABLE CTA BUTTON                                               */
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
    <motion.a
      href={TELEGRAM_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="w-5 h-5" />
      {text}
      <ArrowRight className="w-4 h-4" />
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION WRAPPER WITH FADE-IN                                      */
/* ------------------------------------------------------------------ */
function FadeSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                         */
/* ------------------------------------------------------------------ */
export default function Home() {
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

  return (
    <main className="min-h-screen bg-trading-dark text-foreground overflow-x-hidden">
      {/* ================================================================ */}
      {/*  1. HERO SECTION                                                 */}
      {/* ================================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 md:py-28 overflow-hidden">
        {/* Radial glow behind headline */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-trading-green/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-trading-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <CandlestickBackground />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-green"
          >
            <span className="w-2 h-2 bg-trading-green rounded-full animate-pulse" />
            100% Free Trading Community
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            <span className="text-foreground">GET FREE </span>
            <span className="text-trading-green text-glow-green">FOREX</span>
            <span className="text-foreground"> & </span>
            <span className="text-trading-gold text-glow-gold">GOLD</span>
            <br />
            <span className="text-foreground">TRADING SIGNALS</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Join our free Telegram trading community and get access to daily
            market insights, trading setups, free signals, and market updates
            shared with our community.
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <TelegramCTA text="JOIN OUR FREE TELEGRAM GROUP" variant="primary" />
          </motion.div>

          {/* Tags */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6 text-sm text-muted-foreground flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
          >
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
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-trading-green rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/*  2. ATTENTION-GRABBING HOOK                                      */}
      {/* ================================================================ */}
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
            Stop searching for trading opportunities alone. Join our free
            Telegram community to discover trading ideas, market analysis, and
            potential setups shared with traders every day.
          </p>
          <TelegramCTA text="JOIN THE FREE SIGNALS GROUP" variant="gold" />
        </div>
      </FadeSection>

      {/* ================================================================ */}
      {/*  3. SOCIAL PROOF / COMMUNITY REVIEWS                             */}
      {/* ================================================================ */}
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

          {/* Testimonial Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Stars */}
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
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-muted-foreground/70 mb-8 max-w-lg mx-auto">
            Results vary. Trading involves risk. Past performance does not
            guarantee future results.
          </p>

          <div className="text-center">
            <TelegramCTA text="JOIN THE COMMUNITY" variant="primary" />
          </div>
        </div>
      </FadeSection>

      {/* ================================================================ */}
      {/*  4. MEMBER RESULTS SCREENSHOTS                                  */}
      {/* ================================================================ */}
      <FadeSection className="py-20 md:py-28 px-4" delay={0.1}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              <span className="text-trading-gold text-glow-gold">MEMBER RESULTS</span>
              <br />
              <span className="text-foreground">FROM OUR COMMUNITY</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
              Real screenshots shared by our community members showing their trading results.
            </p>
          </div>

          {/* Earning Screenshots Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {[
              { src: "/earning-1.jpg", alt: "Community member trading result screenshot" },
              { src: "/earning-2.jpg", alt: "Community member trading result screenshot" },
              { src: "/earning-3.jpg", alt: "Community member trading result screenshot" },
              { src: "/earning-4.jpg", alt: "Community member trading result screenshot" },
              { src: "/earning-5.jpg", alt: "Community member trading result screenshot" },
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-strong rounded-2xl overflow-hidden gradient-border hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="p-3 border-b border-white/5 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-trading-green animate-pulse" />
                  <span className="text-xs font-semibold text-muted-foreground">
                    Community Member
                  </span>
                  <span className="ml-auto text-xs text-trading-gold font-medium">Real Screenshot</span>
                </div>
                <div className="p-2">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl object-cover"
                    unoptimized
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-muted-foreground/70 mb-8 max-w-lg mx-auto">
            Results vary. Trading involves risk. Past performance does not
            guarantee future results. These are real screenshots shared by community members.
          </p>

          <div className="text-center">
            <TelegramCTA text="JOIN THE COMMUNITY" variant="primary" />
          </div>
        </div>
      </FadeSection>

      {/* ================================================================ */}
      {/*  5. INSIDE OUR TELEGRAM COMMUNITY (SCREENSHOT GALLERY)          */}
      {/* ================================================================ */}
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

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {/* Real community screenshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="sm:col-span-2 lg:col-span-2 glass-strong rounded-2xl overflow-hidden gradient-border"
            >
              <div className="p-3 border-b border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-trading-green" />
                <span className="text-xs font-semibold text-muted-foreground">
                  Live Community Screenshot
                </span>
              </div>
              <div className="p-2">
                <Image
                  src="/telegram-screenshot.jpg"
                  alt="ForexWizzz Telegram community screenshot showing trading signals and analysis"
                  width={800}
                  height={500}
                  className="w-full h-auto rounded-xl object-cover"
                  unoptimized
                />
              </div>
            </motion.div>

            {/* Feature info cards */}
            {[
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
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 1) * 0.1, duration: 0.5 }}
                className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300"
              >
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
              </motion.div>
            ))}
          </div>

          <div className="text-center mb-10">
            <p className="text-lg font-semibold text-foreground mb-5">
              WANT TO SEE OUR FREE SIGNALS FOR YOURSELF?
            </p>
            <TelegramCTA text="JOIN FREE TELEGRAM" variant="primary" />
          </div>
        </div>
      </FadeSection>

      {/* ================================================================ */}
      {/*  5. WHY JOIN OUR COMMUNITY?                                      */}
      {/* ================================================================ */}
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 group"
              >
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
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <TelegramCTA text="JOIN FOREX WIZZZ FREE" variant="primary" />
          </div>
        </div>
      </FadeSection>

      {/* ================================================================ */}
      {/*  6. URGENCY / FOMO SECTION                                       */}
      {/* ================================================================ */}
      <FadeSection className="py-20 md:py-28 px-4" delay={0.1}>
        <div className="max-w-3xl mx-auto text-center">
          {/* Pulsing clock icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full glass-strong mb-8 glow-green-sm"
          >
            <Clock className="w-10 h-10 text-trading-green" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
            <span className="text-foreground">DON&apos;T MISS THE NEXT</span>
            <br />
            <span className="text-trading-gold text-glow-gold">
              MARKET SETUP
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
            The market moves every day. Join the community now so you don&apos;t
            miss the next trading idea, market update, or potential setup.
          </p>
          <TelegramCTA
            text="JOIN THE FREE TELEGRAM GROUP NOW"
            variant="gold"
          />
        </div>
      </FadeSection>

      {/* ================================================================ */}
      {/*  7. FINAL CTA                                                    */}
      {/* ================================================================ */}
      <FadeSection className="py-20 md:py-28 px-4" delay={0.1}>
        <div className="relative max-w-4xl mx-auto">
          {/* Background glow */}
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
              Get free access to trading signals, market updates, Forex & Gold
              analysis, and trading discussions.
            </p>

            <motion.div
              animate={{ boxShadow: ["0 0 20px rgba(0,230,118,0.3)", "0 0 40px rgba(0,230,118,0.5)", "0 0 20px rgba(0,230,118,0.3)"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block rounded-xl"
            >
              <TelegramCTA
                text="JOIN OUR FREE TELEGRAM GROUP"
                variant="primary"
                className="text-lg md:text-xl px-10 py-5"
              />
            </motion.div>

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

      {/* ================================================================ */}
      {/*  FOOTER                                                          */}
      {/* ================================================================ */}
      <footer className="py-10 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-2">
            ForexWizzz &mdash; Free Forex & Gold Trading Signals Community
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

      {/* ================================================================ */}
      {/*  STICKY FLOATING TELEGRAM BUTTON                                 */}
      {/* ================================================================ */}
      <motion.a
        href={TELEGRAM_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="fixed bottom-6 right-4 md:right-8 z-50 flex items-center gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-sm md:text-base rounded-full pl-4 pr-5 py-3.5 shadow-[0_4px_20px_rgba(0,136,204,0.5)] hover:shadow-[0_4px_30px_rgba(0,136,204,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 no-underline select-none"
        aria-label="Join our free Telegram group"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
        <span className="hidden sm:inline">JOIN FREE TELEGRAM</span>
      </motion.a>
    </main>
  );
}