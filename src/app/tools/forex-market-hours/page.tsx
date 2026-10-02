import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDownRight,
  MessageCircle,
  BookOpen,
  Globe,
  Clock,
  CalendarClock,
  Sun,
  Moon,
  Activity,
  TrendingUp,
  Info,
  ShieldAlert,
} from "lucide-react";
import {
  FadeSection,
  FadeIn,
  HeroAnimation,
  StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";
import { ForexMarketHoursClock } from "@/components/tools/forex-market-hours-clock";

export const metadata: Metadata = {
  title: "Forex Market Hours & Live Session Clock | Forex Wizard",
  description:
    "Free live forex market hours clock with Sydney, Tokyo, London and New York session times in your local timezone. See which forex markets are open now, the London-NY overlap, countdown timers and DST-aware session conversions.",
  alternates: {
    canonical: "https://forexwizard.online/tools/forex-market-hours/",
  },
  openGraph: {
    title: "Forex Market Hours & Live Session Clock | Forex Wizard",
    description:
      "Free live forex market hours clock with Sydney, Tokyo, London and New York session times in your local timezone. See which forex markets are open now, the London-NY overlap, countdown timers and DST-aware session conversions.",
    type: "website",
    url: "https://forexwizard.online/tools/forex-market-hours/",
    siteName: "Forex Wizard",
    images: [
      {
        url: "/og-forex-market-hours.jpg",
        width: 1200,
        height: 630,
        alt: "Forex Market Hours live session clock showing Sydney, Tokyo, London and New York trading sessions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forex Market Hours & Live Session Clock | Forex Wizard",
    description:
      "Free live forex market hours clock with Sydney, Tokyo, London and New York session times in your local timezone. See which forex markets are open now and the London-NY overlap.",
    images: ["/og-forex-market-hours.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

const webAppStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Forex Market Hours & Live Session Clock",
  description:
    "Free live forex market hours clock showing Sydney, Tokyo, London and New York session times in your local timezone, with countdown timers, the London-New York overlap window and DST-aware conversions.",
  url: "https://forexwizard.online/tools/forex-market-hours/",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: {
    "@type": "Organization",
    name: "Forex Wizard",
    url: "https://forexwizard.online/",
    logo: {
      "@type": "ImageObject",
      url: "https://forexwizard.online/brand/forexwizard-logo.webp",
    },
  },
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://forexwizard.online/" },
    { "@type": "ListItem", position: 2, name: "Trading Tools", item: "https://forexwizard.online/tools/" },
    { "@type": "ListItem", position: 3, name: "Forex Market Hours", item: "https://forexwizard.online/tools/forex-market-hours/" },
  ],
};

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
  const variants: Record<string, string> = {
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

const sessionCards = [
  {
    name: "Sydney",
    tz: "Australia/Sydney",
    hours: "07:00 &ndash; 16:00 (AEST/AEDT)",
    desc: "The Sydney session opens the trading week. Liquidity is typically lighter than the London and New York sessions, with AUD, NZD and JPY crosses seeing the most activity. Volatility can pick up around scheduled Australian and New Zealand economic releases.",
  },
  {
    name: "Tokyo",
    tz: "Asia/Tokyo",
    hours: "09:00 &ndash; 18:00 (JST)",
    desc: "The Tokyo session is the dominant Asian session. JPY pairs and regional equity market flows drive activity. Liquidity often increases when Tokyo overlaps with the later part of Sydney and the early part of London.",
  },
  {
    name: "London",
    tz: "Europe/London",
    hours: "08:00 &ndash; 17:00 (GMT/BST)",
    desc: "London is the largest forex trading centre by volume. The London open often produces the day&apos;s first major move, and the session sets the tone for European crosses. Most institutional flow from European banks and funds passes through London.",
  },
  {
    name: "New York",
    tz: "America/New_York",
    hours: "08:00 &ndash; 17:00 (EST/EDT)",
    desc: "New York is the second-largest centre and hosts the most important US economic releases. The New York open overlaps with the London afternoon, producing the highest-volume window of the day. The weekly market close happens at 17:00 New York time on Friday.",
  },
];

const continueLearningCards = [
  {
    href: "/blog/best-time-to-trade-forex/",
    icon: <Clock className="w-7 h-7 text-trading-gold" />,
    title: "Best Time to Trade Forex",
    desc: "A detailed guide to choosing trading windows by session, volatility and currency pair behaviour.",
  },
  {
    href: "/tools/",
    icon: <BookOpen className="w-7 h-7 text-trading-green" />,
    title: "Trading Tools",
    desc: "All free Forex Wizard calculators and utilities in one place, including the XAUUSD Lot Size Calculator.",
  },
  {
    href: "/xauusd-lot-size/",
    icon: <TrendingUp className="w-7 h-7 text-trading-gold" />,
    title: "XAUUSD Lot Size Calculator",
    desc: "Estimate gold position size from your account equity, risk percentage, entry and stop loss.",
  },
  {
    href: "/about/",
    icon: <Info className="w-7 h-7 text-trading-gold" />,
    title: "About Forex Wizard",
    desc: "Learn about the Forex Wizard community and our educational approach to forex and gold trading.",
  },
];

const faqs = [
  {
    q: "What time does the forex market open?",
    a: "The retail forex market opens at 17:00 New York time on Sunday, which is Monday morning in Australia and Asia. This is when the first major trading session of the week begins in Sydney. The exact local time depends on your timezone and whether daylight saving time is in effect where you live. Use the clock above to see the exact opening time in your local timezone.",
  },
  {
    q: "What time does the forex market close?",
    a: "The retail forex market closes at 17:00 New York time on Friday. After this time, trading is suspended until the following Sunday at 17:00 New York time. The market is closed all day Saturday. The Friday close is based on New York time, so the local time in your region may differ.",
  },
  {
    q: "Is forex open 24 hours a day?",
    a: "Forex is open 24 hours a day, five days a week (often written as 24/5), from Sunday 17:00 New York time to Friday 17:00 New York time. It is not open 24/7. The market closes for the weekend. Within the 24/5 trading week, activity moves from one financial centre to another as the Sydney, Tokyo, London and New York sessions open and close.",
  },
  {
    q: "What is the best time to trade forex?",
    a: "There is no universally best time. It depends on your strategy, the currency pairs you trade and your personal schedule. The London and New York overlap typically sees the highest trading volume and the largest price moves, which may suit short-term strategies, but higher volatility also means higher risk. For a detailed discussion of timing considerations, see our guide on the best time to trade forex.",
  },
  {
    q: "What is the London and New York overlap?",
    a: "The London-New York overlap is the window when both the London and New York sessions are open simultaneously. It typically lasts about four hours, roughly from 12:00 to 16:00 UTC (the exact times shift with daylight saving time). This period is often associated with the highest liquidity and the largest intraday moves, because both European and North American institutional flow are active at the same time.",
  },
  {
    q: "How do I convert forex session times to my timezone?",
    a: "Use the timezone selector in the clock above. It auto-detects your local timezone when the page loads, and you can manually select any IANA timezone from the dropdown. All session open and close times, the countdown timers and the 24-hour timeline will be displayed in your selected timezone. The conversion is fully DST-aware.",
  },
  {
    q: "Does the forex market close on weekends?",
    a: "Yes. The retail forex market closes at 17:00 New York time on Friday and reopens at 17:00 New York time on Sunday. It is closed all day Saturday. Some brokers may offer limited weekend trading on specific instruments through separate venues, but the main interbank spot forex market is closed over the weekend.",
  },
  {
    q: "How does daylight saving time affect forex hours?",
    a: "Daylight saving time (DST) shifts the local clock in the regions that observe it. Because forex session times are defined in local time (for example London 08:00 GMT/BST, New York 08:00 EST/EDT), the UTC equivalent of each session changes when DST starts or ends. The clock above handles DST automatically using IANA timezones, so you do not need to adjust anything manually.",
  },
  {
    q: "What are the four forex trading sessions?",
    a: "The four major forex trading sessions are Sydney, Tokyo, London and New York. Each represents the trading activity of its respective region. The sessions overlap at certain times of day, creating periods of higher trading volume. The Sydney session opens the week, Tokyo follows, then London, and finally New York before the cycle hands back to Sydney.",
  },
  {
    q: "Are forex trading hours the same in every country?",
    a: "The underlying market hours are the same globally, because they are anchored to New York time (Sunday 17:00 to Friday 17:00). However, the local clock time at which each session opens and closes depends on your timezone. A trader in Pakistan sees different session times than a trader in London or New York. Use the clock above to convert to your local time.",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function ForexMarketHoursPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      <header className="relative z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold text-foreground tracking-tight no-underline hover:text-trading-green transition-colors flex items-center gap-2"
          >
            <img
              src="/brand/forexwizard-logo.webp"
              alt="ForexWizard logo"
              width={44}
              height={44}
              loading="eager"
              decoding="async"
              className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-lg object-cover"
            />
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
              href="/tools/"
              className="text-sm font-medium text-trading-gold hover:text-trading-gold/80 transition-colors no-underline"
            >
              Trading Tools
            </Link>
            <Link
              href="/blog/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block"
            >
              Blog
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
        {/* ===== HERO + CLOCK ===== */}
        <section className="relative px-4 py-12 md:py-16 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-trading-green/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-trading-gold/5 rounded-full blur-[100px] pointer-events-none" />
          <CandlestickBackground />
          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-6"
            >
              <Link href="/" className="hover:text-trading-green transition-colors no-underline">
                Home
              </Link>
              <span className="text-muted-foreground/50">&rsaquo;</span>
              <Link href="/tools/" className="hover:text-trading-green transition-colors no-underline">
                Trading Tools
              </Link>
              <span className="text-muted-foreground/50">&rsaquo;</span>
              <span className="text-trading-gold font-medium">Forex Market Hours</span>
            </nav>

            <HeroAnimation className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-5">
                <span className="text-foreground">Forex Market Hours </span>
                <span className="text-trading-green text-glow-green">Live Session Clock</span>
                <span className="text-foreground"> &amp; Time Converter</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                See which forex sessions are open right now, with live
                countdowns, the London &ndash; New York overlap window and a
                24-hour visual timeline &mdash; all converted to your local
                timezone automatically.
              </p>
            </HeroAnimation>

            {/* Live clock — immediately below the H1 / intro */}
            <FadeIn delay={0.2}>
              <ForexMarketHoursClock />
            </FadeIn>
          </div>
        </section>

        {/* ===== 1. WHICH FOREX MARKETS ARE OPEN RIGHT NOW ===== */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">Which Forex Markets Are </span>
                <span className="text-trading-gold text-glow-gold">Open Right Now?</span>
              </h2>
            </div>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The forex market is not a single exchange. It is a global,
                decentralised network of banks, institutions and brokers. Trading
                activity flows from one financial centre to another as the
                business day moves around the world. At any given moment, between
                one and three of the four major sessions may be open
                simultaneously.
              </p>
              <p>
                The live clock above answers the question in real time. The four
                session cards show whether <span className="text-foreground font-medium">Sydney</span>,{" "}
                <span className="text-foreground font-medium">Tokyo</span>,{" "}
                <span className="text-foreground font-medium">London</span> and{" "}
                <span className="text-foreground font-medium">New York</span> are
                currently open, together with each session&apos;s local time and a
                countdown to its next open or close.
              </p>
              <p>
                The retail forex week runs from Sunday 17:00 New York time to
                Friday 17:00 New York time. Outside that window the market is
                closed. The large status banner at the top of the clock shows the
                global market state and a countdown to the next weekly open or
                close.
              </p>
              <p>
                Understanding which sessions are open matters because liquidity
                and volatility change throughout the day. The same currency pair
                can behave very differently during the quiet Asian session
                compared with the busy London &ndash; New York overlap. For a
                deeper look at how timing affects trading decisions, read our
                guide on the{" "}
                <Link
                  href="/blog/best-time-to-trade-forex/"
                  className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium"
                >
                  best time to trade forex
                </Link>
                .
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ===== 2. FOREX TRADING SESSIONS AND OPENING TIMES ===== */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">Forex Trading Sessions and </span>
                <span className="text-trading-gold text-glow-gold">Opening Times</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                The four major sessions and their indicative local trading
                windows. These are commonly cited retail FX activity windows, not
                official exchange hours.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sessionCards.map((s, i) => (
                <FadeIn key={s.name} delay={i * 0.07}>
                  <div className="glass-strong rounded-2xl p-6 flex flex-col gap-3 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-trading-gold/10 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-trading-gold" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{s.name} Session</h3>
                        <p className="text-xs text-muted-foreground">{s.tz}</p>
                      </div>
                    </div>
                    <p
                      className="text-sm font-semibold text-trading-green tabular-nums"
                      dangerouslySetInnerHTML={{ __html: s.hours }}
                    />
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="mt-8 glass rounded-2xl p-5 border border-trading-gold/20">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="text-trading-gold font-semibold">Note:</span>{" "}
                These hours are indicative. Actual liquidity ramps up before the
                nominal open and tapers after the nominal close. Holiday
                schedules, daylight saving transitions and economic releases can
                all affect intraday activity. The clock above converts these
                windows into your local timezone automatically.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ===== 3. FOREX MARKET HOURS IN YOUR LOCAL TIMEZONE ===== */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">Forex Market Hours in </span>
                <span className="text-trading-gold text-glow-gold">Your Local Timezone</span>
              </h2>
            </div>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Forex session times are published in the local time of each
                trading centre. That is useful if you live in one of those
                cities, but confusing if you do not. A session that opens at
                08:00 in London does not open at 08:00 on your wall clock unless
                you happen to be in the UK.
              </p>
              <p>
                The clock above solves this by converting every session open and
                close into your local timezone. When the page loads, it
                auto-detects your timezone using your browser settings. You can
                also pick any timezone manually from the dropdown, which includes
                common presets (Pakistan, UAE, Saudi Arabia, Qatar, Kuwait,
                Oman, Bahrain, UK, US, UTC) plus every IANA timezone your
                browser supports.
              </p>
              <p>
                All conversions are <span className="text-foreground font-medium">DST-aware</span>.
                When London shifts between GMT and BST, or New York shifts
                between EST and EDT, the displayed times update automatically.
                You never need to adjust for daylight saving manually.
              </p>
              <p>
                The 24-hour timeline at the bottom of the clock shows all four
                sessions as coloured bars positioned on your local day, with a
                gold vertical line marking the current time. This makes it easy
                to see at a glance which sessions are active and when the next
                one opens.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ===== 4. FOREX TRADING HOURS IN PAKISTAN (PKT) ===== */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">Forex Trading Hours in Pakistan </span>
                <span className="text-trading-gold text-glow-gold">(PKT)</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Pakistan Standard Time is UTC+5 year-round (Pakistan does not
                observe daylight saving time).
              </p>
            </div>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Because Pakistan does not observe daylight saving time, the PKT
                equivalent of each session shifts twice a year as the other
                regions move their clocks forward or back. The table below shows
                approximate windows; use the live clock above for exact,
                up-to-the-second times by selecting &ldquo;Pakistan (PKT)&rdquo;
                in the timezone dropdown.
              </p>
            </div>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-white/5 text-left">
                    <th className="px-4 py-3 font-bold text-foreground">Session</th>
                    <th className="px-4 py-3 font-bold text-foreground">Local Window</th>
                    <th className="px-4 py-3 font-bold text-foreground">Approx. PKT (winter)</th>
                    <th className="px-4 py-3 font-bold text-foreground">Approx. PKT (summer)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-semibold text-trading-gold">Sydney</td>
                    <td className="px-4 py-3 tabular-nums">07:00 &ndash; 16:00 AEST/AEDT</td>
                    <td className="px-4 py-3 tabular-nums">02:00 &ndash; 11:00</td>
                    <td className="px-4 py-3 tabular-nums">03:00 &ndash; 12:00</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-semibold text-trading-red">Tokyo</td>
                    <td className="px-4 py-3 tabular-nums">09:00 &ndash; 18:00 JST</td>
                    <td className="px-4 py-3 tabular-nums">05:00 &ndash; 14:00</td>
                    <td className="px-4 py-3 tabular-nums">05:00 &ndash; 14:00</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-semibold text-trading-green">London</td>
                    <td className="px-4 py-3 tabular-nums">08:00 &ndash; 17:00 GMT/BST</td>
                    <td className="px-4 py-3 tabular-nums">13:00 &ndash; 22:00</td>
                    <td className="px-4 py-3 tabular-nums">12:00 &ndash; 21:00</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 font-semibold" style={{ color: "#ba68c8" }}>New York</td>
                    <td className="px-4 py-3 tabular-nums">08:00 &ndash; 17:00 EST/EDT</td>
                    <td className="px-4 py-3 tabular-nums">18:00 &ndash; 03:00*</td>
                    <td className="px-4 py-3 tabular-nums">17:00 &ndash; 02:00*</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-muted-foreground/70 mt-2">
                * New York session crosses midnight in PKT. Winter = Northern
                Hemisphere winter (EST/GMT). Summer = Northern Hemisphere summer
                (EDT/BST). Approximate only &mdash; use the live clock for exact
                times.
              </p>
            </div>

            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              For Pakistani traders, the most active window is typically the
              London &ndash; New York overlap, which falls in the early evening
              PKT. For guidance on how to approach timing decisions, see our
              article on the{" "}
              <Link
                href="/blog/best-time-to-trade-forex/"
                className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium"
              >
                best time to trade forex
              </Link>
              .
            </p>
          </div>
        </FadeSection>

        {/* ===== 5. LONDON AND NEW YORK SESSION OVERLAP ===== */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">London and New York </span>
                <span className="text-trading-gold text-glow-gold">Session Overlap</span>
              </h2>
            </div>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The London &ndash; New York overlap is the period when both the
                London and New York sessions are open at the same time. Because
                London opens at 08:00 local and New York opens at 08:00 local,
                the overlap begins when New York opens and ends when London
                closes.
              </p>
              <p>
                In UTC terms, the overlap typically runs from roughly 12:00 to
                16:00 UTC during the Northern Hemisphere summer (when both
                regions are on daylight saving time) and from 13:00 to 17:00 UTC
                during the winter. The window is approximately{" "}
                <span className="text-foreground font-medium">four hours</span>{" "}
                long, though the exact duration and clock times shift with
                daylight saving transitions.
              </p>
              <p>
                This window is widely associated with the highest trading
                volume of the day, because both European and North American
                institutional flows are active. For short-term traders, this can
                mean larger moves and tighter spreads on major pairs. However,
                higher volume and volatility also mean higher risk &mdash;
                stops can be hit more easily during fast moves, and spreads can
                widen briefly around scheduled US economic releases.
              </p>
              <p>
                The clock above shows the overlap window in your local timezone,
                with a live countdown to when it starts or ends. When the
                overlap is active, a pulsing badge appears next to the overlap
                card.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FadeIn>
                <div className="glass-strong rounded-2xl p-5 flex flex-col gap-2 gradient-border">
                  <Activity className="w-6 h-6 text-trading-gold" />
                  <h3 className="text-sm font-bold text-foreground">Highest Liquidity</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Both European and North American institutional order flow is
                    active, producing the day&apos;s peak volume on major pairs.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.07}>
                <div className="glass-strong rounded-2xl p-5 flex flex-col gap-2 gradient-border">
                  <TrendingUp className="w-6 h-6 text-trading-green" />
                  <h3 className="text-sm font-bold text-foreground">Larger Moves</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The overlap often produces the largest intraday price
                    movements, which can suit short-term strategies &mdash; but
                    also increases risk.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.14}>
                <div className="glass-strong rounded-2xl p-5 flex flex-col gap-2 gradient-border">
                  <ShieldAlert className="w-6 h-6 text-trading-red" />
                  <h3 className="text-sm font-bold text-foreground">Event Risk</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Major US releases (NFP, CPI, FOMC) land inside this window
                    and can cause sharp, sudden moves. Manage size accordingly.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </FadeSection>

        {/* ===== 6. WHEN DOES THE FOREX MARKET OPEN AND CLOSE ===== */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">When Does the Forex Market </span>
                <span className="text-trading-gold text-glow-gold">Open and Close?</span>
              </h2>
            </div>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The retail forex market opens at{" "}
                <span className="text-foreground font-medium">17:00 New York time on Sunday</span>.
                At that moment, it is already Monday morning in Sydney and the
                Asia-Pacific region, so the weekly trading cycle begins with the
                Sydney session.
              </p>
              <p>
                The market closes at{" "}
                <span className="text-foreground font-medium">17:00 New York time on Friday</span>,
                after the New York session ends. The market is then closed for
                the weekend, including all of Saturday. Trading resumes the
                following Sunday at 17:00 New York time.
              </p>
              <p>
                Because the open and close are anchored to New York time, the
                local equivalent in your timezone depends on your offset from
                New York and whether you and New York are currently observing
                daylight saving time. The status banner at the top of the clock
                shows the global market state and a live countdown to the next
                weekly open or close, converted to your timezone.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FadeIn>
                <div className="glass-strong rounded-2xl p-6 flex items-start gap-4 gradient-border">
                  <div className="w-10 h-10 rounded-lg bg-trading-green/10 flex items-center justify-center shrink-0">
                    <Sun className="w-5 h-5 text-trading-green" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Weekly Open</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      Sunday 17:00 New York time. Sydney session begins the new
                      trading week.
                    </p>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.07}>
                <div className="glass-strong rounded-2xl p-6 flex items-start gap-4 gradient-border">
                  <div className="w-10 h-10 rounded-lg bg-trading-red/10 flex items-center justify-center shrink-0">
                    <Moon className="w-5 h-5 text-trading-red" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Weekly Close</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      Friday 17:00 New York time. Market closed Saturday and
                      until Sunday 17:00 NY.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </FadeSection>

        {/* ===== 7. HOW DST AFFECTS FOREX HOURS ===== */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">How Daylight Saving Time </span>
                <span className="text-trading-gold text-glow-gold">Affects Forex Hours</span>
              </h2>
            </div>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Daylight saving time (DST) shifts the local clock by one hour in
                the regions that observe it. Because forex session times are
                defined in local time &mdash; London 08:00 GMT/BST, New York
                08:00 EST/EDT, Sydney 07:00 AEST/AEDT &mdash; the UTC equivalent
                of each session changes when DST starts or ends.
              </p>
              <p>
                The three main DST regions relevant to forex do not all switch
                on the same date:
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FadeIn>
                <div className="glass-strong rounded-2xl p-5 flex flex-col gap-2 gradient-border">
                  <CalendarClock className="w-6 h-6 text-trading-green" />
                  <h3 className="text-sm font-bold text-foreground">United States</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    DST runs from the second Sunday in March to the first Sunday
                    in November. Affects New York session (EST &harr; EDT).
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.07}>
                <div className="glass-strong rounded-2xl p-5 flex flex-col gap-2 gradient-border">
                  <CalendarClock className="w-6 h-6 text-trading-gold" />
                  <h3 className="text-sm font-bold text-foreground">Europe / UK</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    DST runs from the last Sunday in March to the last Sunday in
                    October. Affects London session (GMT &harr; BST).
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.14}>
                <div className="glass-strong rounded-2xl p-5 flex flex-col gap-2 gradient-border">
                  <CalendarClock className="w-6 h-6 text-trading-red" />
                  <h3 className="text-sm font-bold text-foreground">Australia</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    DST runs from the first Sunday in October to the first Sunday
                    in April (opposite to the Northern Hemisphere). Affects
                    Sydney session (AEST &harr; AEDT).
                  </p>
                </div>
              </FadeIn>
            </div>
            <div className="mt-8 space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Twice a year, around the US and European transition dates, there
                is a brief period (usually one to two weeks) when the US has
                switched but Europe has not, or vice versa. During these gaps,
                the London &ndash; New York overlap shifts by roughly one hour.
                The clock above handles all of this automatically using IANA
                timezones, so the displayed times are always correct for the
                current date.
              </p>
              <p>
                Tokyo does not observe DST, so the Tokyo session (JST) stays at
                a fixed UTC+9 offset year-round. Similarly, Pakistan (PKT),
                the Gulf states and many other regions do not observe DST.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ===== CONTINUE LEARNING ===== */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">Continue </span>
                <span className="text-trading-gold text-glow-gold">Learning</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Explore more free Forex Wizard tools and guides.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {continueLearningCards.map((item, i) => (
                <FadeIn key={item.href} delay={i * 0.07}>
                  <Link href={item.href} className="block h-full no-underline">
                    <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trading-gold/10 to-transparent flex items-center justify-center">
                        {item.icon}
                      </div>
                      <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
                      <span className="text-xs text-trading-gold font-medium flex items-center gap-1">
                        Read more <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* ===== TELEGRAM CTA ===== */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-green/5 via-transparent to-trading-gold/5 rounded-3xl blur-sm" />
            <div className="relative glass-strong rounded-3xl p-8 md:p-14 text-center gradient-border">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                <span className="text-foreground">Join the </span>
                <span className="text-trading-green text-glow-green">Forex Wizard</span>
                <br />
                <span className="text-foreground">Trading Community</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                Follow forex and gold market analysis, session discussions and
                educational content through the free Forex Wizard Telegram
                community.
              </p>
              <TelegramCTA text="Join Forex Wizard Telegram" variant="primary" className="text-lg md:text-xl px-10 py-5" />
              <p className="mt-6 text-xs text-muted-foreground/80">
                Free to join &middot; Trading involves risk
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ===== FAQ ===== */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">Frequently Asked </span>
                <span className="text-trading-gold text-glow-gold">Questions</span>
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <details className="glass-strong rounded-2xl gradient-border group">
                    <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer list-none select-none">
                      <h3 className="text-base font-bold text-foreground pr-4">{faq.q}</h3>
                      <ArrowDownRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-5 md:px-6 pb-5 md:pb-6 -mt-2">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* ===== RISK DISCLAIMER ===== */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">Risk </span>
                <span className="text-trading-red">Disclaimer</span>
              </h2>
            </div>
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-trading-red/20">
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  The forex market hours clock on this page is an educational
                  tool. Session times shown are indicative retail FX activity
                  windows and are not official exchange hours. Actual liquidity
                  and volatility can differ from the nominal session schedule.
                </p>
                <p>
                  Trading forex and other financial markets involves significant
                  risk of loss and is not suitable for all investors. Past
                  performance does not guarantee future results. The content on
                  this page is for educational and informational purposes only
                  and does not constitute financial advice. You alone are
                  responsible for any trading decisions you make.
                </p>
                <p>
                  Forex Wizard does not provide broker-specific information,
                  guaranteed returns, or personalised trading recommendations.
                  Always do your own research and consult a licensed
                  professional before trading. For the full disclaimer, see our{" "}
                  <Link
                    href="/risk-disclosure/"
                    className="text-trading-gold hover:text-trading-gold/80 transition-colors no-underline font-medium"
                  >
                    risk disclosure
                  </Link>{" "}
                  page.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        <SiteFooter />
      </main>

      <StickyTelegramButton href={TELEGRAM_LINK} label="Join Forex Wizard on Telegram" />
    </>
  );
}
