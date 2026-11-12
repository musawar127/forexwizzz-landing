import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, MessageCircle, TrendingUp, TrendingDown, Clock,
  Calendar, AlertTriangle, Target, CheckCircle2, BookOpen,
  LineChart, Layers, Activity, Minus, Globe, ListChecks,
} from "lucide-react";
import {
  FadeSection, FadeIn, HeroAnimation, PulsingGlow, StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";
import { getBlogPost } from "@/data/blog-posts";

const post = getBlogPost("xauusd-weekly-forecast-november-2-6-2026")!;
const CANONICAL = `https://forexwizard.online/blog/${post.slug}/`;
const IMAGE_URL = `https://forexwizard.online${post.image}`;
const IMAGE_BASE = post.image.replace(/\.jpg$/, "");
const HERO_WEBP_SRCSET = `${IMAGE_BASE}-640.webp 640w, ${IMAGE_BASE}-960.webp 960w, ${IMAGE_BASE}-1200.webp 1200w`;
const HERO_SIZES = "(max-width: 768px) 100vw, 768px";
const TELEGRAM_LINK = "https://t.me/ForexWizzz";

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  keywords: [
    "XAUUSD weekly forecast",
    "gold forecast this week",
    "XAUUSD analysis",
    "gold price prediction",
    "XAUUSD key levels",
    "gold NFP forecast",
    "gold price today",
    "Fed rate hike gold",
    "XAUUSD support and resistance",
    "gold forecast November 2026",
  ],
  authors: [{ name: post.author.name, url: post.author.url }],
  creator: "Forex Wizard",
  publisher: "Forex Wizard",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: post.title, description: post.description, type: "article",
    publishedTime: post.publishedAt, modifiedTime: post.modifiedAt,
    authors: [post.author.name], url: CANONICAL, siteName: "Forex Wizard",
    images: [{ url: post.image, width: 1200, height: 630, alt: post.imageAlt }],
  },
  twitter: {
    card: "summary_large_image", title: post.title, description: post.description,
    images: [post.image],
  },
};

const blogPostingStructuredData = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "XAUUSD Weekly Forecast Nov 2–6, 2026: Gold at One-Year Low Before NFP",
  description: post.description, image: [IMAGE_URL],
  datePublished: post.publishedAt, dateModified: post.modifiedAt, mainEntityOfPage: CANONICAL,
  author: { "@type": "Organization", name: "Forex Wizard", url: post.author.url },
  publisher: {
    "@type": "Organization", name: "Forex Wizard", url: "https://forexwizard.online/",
    logo: { "@type": "ImageObject", url: "https://forexwizard.online/brand/forexwizard-logo.webp" },
  },
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://forexwizard.online/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://forexwizard.online/blog/" },
    { "@type": "ListItem", position: 3, name: "XAUUSD Weekly Forecast Nov 2–6, 2026", item: CANONICAL },
  ],
};

const faqPageStructuredData = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question", name: "What is the XAUUSD forecast for November 2–6, 2026?",
      acceptedAnswer: { "@type": "Answer", text: "Gold ends the week near $3,890, a one-year low, with a bearish trend below $4,000. Support is $3,880–$3,850, then $3,800. Resistance is $3,930–$3,950 and $4,000–$4,010. Friday's Nonfarm Payrolls report is the main catalyst. This is educational analysis, not a prediction." },
    },
    {
      "@type": "Question", name: "Will gold go up or down next week?",
      acceptedAnswer: { "@type": "Answer", text: "It depends on the data. Strong ISM, ADP or NFP numbers and higher oil would support more selling. Weak jobs data, lower oil or a pause in Fed hike bets could spark an oversold bounce. Gold is deeply oversold, so sharp moves in both directions are possible." },
    },
    {
      "@type": "Question", name: "Why did gold fall on October 30, 2026?",
      acceptedAnswer: { "@type": "Answer", text: "Gold fell more than 3% as oil prices rose, Treasury yields stayed near 5%, and traders increased bets on a December Fed rate hike after strong GDP and PCE data. A slump in tech stocks also triggered broader selling across markets." },
    },
    {
      "@type": "Question", name: "What are the key support and resistance levels for gold this week?",
      acceptedAnswer: { "@type": "Answer", text: "Support is at $3,880–$3,890, then $3,850, $3,800 and $3,750. Resistance is at $3,930–$3,950, $4,000–$4,010, about $4,034 and $4,065–$4,083. Levels can differ by $10–$20 between brokers." },
    },
    {
      "@type": "Question", name: "What time is NFP in Pakistan time (PKT)?",
      acceptedAnswer: { "@type": "Answer", text: "The October Nonfarm Payrolls report is released on Friday, November 6 at 8:30 AM ET, which is 13:30 GMT or 18:30 PKT. This is one hour later in PKT than recent months because US daylight saving time ended on November 1." },
    },
    {
      "@type": "Question", name: "Did the Fed raise interest rates in October 2026?",
      acceptedAnswer: { "@type": "Answer", text: "No. The Fed held the target range at 3.75%–4.00% on October 28 in a 10–2 vote. Governor Lisa Cook and Cleveland Fed President Beth Hammack voted for a 25 bp hike. The next FOMC decision is on December 9." },
    },
  ],
};

function TelegramCTA({ text, variant = "primary", className = "" }: { text: string; variant?: "primary" | "secondary" | "gold"; className?: string }) {
  const base = "inline-flex items-center justify-center gap-2 font-bold text-base md:text-lg rounded-xl px-6 py-3.5 md:px-8 md:py-4 transition-all duration-300 cursor-pointer no-underline select-none";
  const variants: Record<string, string> = {
    primary: "bg-trading-green text-trading-dark glow-green hover:scale-105 hover:shadow-[0_0_30px_rgba(0,230,118,0.6)] active:scale-95",
    gold: "bg-trading-gold text-trading-dark glow-gold hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,64,0.6)] active:scale-95",
    secondary: "glass-strong text-trading-green border border-trading-green/30 hover:bg-trading-green/10 hover:scale-105 active:scale-95",
  };
  return <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className={`${base} ${variants[variant]} ${className}`}><MessageCircle className="w-5 h-5" />{text}<ArrowRight className="w-4 h-4" /></a>;
}

const supportResistanceTable = [
  { type: "Resistance 4", zone: "$4,065–$4,083", why: "Oct 28 weekly high and a major rejection zone", tone: "green" as const },
  { type: "Resistance 3", zone: "~$4,034", why: "Thursday's broken breakout level", tone: "green" as const },
  { type: "Resistance 2", zone: "$4,000–$4,010", why: "Psychological level and the 4-hour average area, a key recovery test", tone: "green" as const },
  { type: "Resistance 1", zone: "$3,930–$3,950", why: "First overhead supply and the area Friday's selloff accelerated from", tone: "green" as const },
  { type: "Current price", zone: "~$3,890", why: "Spot gold near Friday's close", tone: "muted" as const },
  { type: "Support 1", zone: "$3,880–$3,890", why: "Friday's low and the one-year low", tone: "gold" as const },
  { type: "Support 2", zone: "~$3,850", why: "Round-number reference", tone: "gold" as const },
  { type: "Support 3", zone: "~$3,800", why: "Major psychological level and a widely watched downside target", tone: "gold" as const },
  { type: "Support 4", zone: "~$3,750", why: "Next round-number reference if $3,800 fails", tone: "gold" as const },
];

const economicCalendar = [
  { day: "Mon, Nov 2", event: "ISM Manufacturing PMI (Oct)", et: "10:00", gmt: "15:00", pkt: "20:00" },
  { day: "Tue, Nov 3", event: "RBA rate decision", et: "n/a", gmt: "03:30", pkt: "08:30" },
  { day: "Tue, Nov 3", event: "US midterm elections", et: "Polls close in the evening (ET)", gmt: "", pkt: "Results arrive overnight, early Nov 4" },
  { day: "Wed, Nov 4", event: "Eurozone flash HICP inflation", et: "n/a", gmt: "10:00", pkt: "15:00" },
  { day: "Wed, Nov 4", event: "ADP private employment (Oct)", et: "08:15", gmt: "13:15", pkt: "18:15" },
  { day: "Wed, Nov 4", event: "ISM Services PMI (Oct)", et: "10:00", gmt: "15:00", pkt: "20:00" },
  { day: "Thu, Nov 5", event: "Bank of England rate decision", et: "n/a", gmt: "12:00", pkt: "17:00" },
  { day: "Thu, Nov 5", event: "US weekly jobless claims", et: "08:30", gmt: "13:30", pkt: "18:30" },
  { day: "Fri, Nov 6", event: "US Nonfarm Payrolls, unemployment rate, wages (Oct)", et: "08:30", gmt: "13:30", pkt: "18:30" },
  { day: "Fri, Nov 6", event: "UMich consumer sentiment (prelim)", et: "10:00", gmt: "15:00", pkt: "20:00" },
];

const tocItems = [
  { href: "#key-takeaways", label: "Key takeaways" },
  { href: "#last-week-recap", label: "Last week recap" },
  { href: "#why-gold-is-falling", label: "Why gold is falling" },
  { href: "#support-resistance", label: "Support and resistance levels" },
  { href: "#economic-calendar", label: "Economic calendar (PKT)" },
  { href: "#scenarios", label: "Bullish, bearish and range scenarios" },
  { href: "#risk-plan", label: "Risk plan for a volatile week" },
  { href: "#faq", label: "FAQ" },
];

const continueLearning = [
  { href: "/xauusd-support-resistance/", title: "XAUUSD Support and Resistance", desc: "How to identify important gold support and resistance zones for clearer trade planning.", icon: <Layers className="w-7 h-7 text-trading-gold" />, accent: "from-trading-gold/10 to-transparent" },
  { href: "/blog/xauusd-weekly-forecast-october-26-30-2026/", title: "Previous Weekly Forecast (Oct 26–30)", desc: "Last week's forecast covering the FOMC decision, GDP and PCE releases.", icon: <LineChart className="w-7 h-7 text-trading-gold" />, accent: "from-trading-gold/10 to-transparent" },
  { href: "/blog/xauusd-fundamental-analysis/", title: "XAUUSD Fundamental Analysis", desc: "How the Fed, real yields and the dollar drive gold prices over time.", icon: <Activity className="w-7 h-7 text-trading-green" />, accent: "from-trading-green/10 to-transparent" },
  { href: "/tools/forex-position-size-calculator/", title: "Forex Position Size Calculator", desc: "Calculate lot size from your account risk and stop-loss distance before entering.", icon: <Target className="w-7 h-7 text-trading-green" />, accent: "from-trading-green/10 to-transparent" },
];

export default function WeeklyForecastNov2Nov6Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageStructuredData) }} />

      <header className="relative z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-foreground tracking-tight no-underline hover:text-trading-green transition-colors">
            <img src="/brand/forexwizard-logo.webp" alt="ForexWizard logo" width={44} height={44} loading="eager" decoding="async" className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-lg object-cover" />
            Forex Wizard
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/forex-signals/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">Forex Signals</Link>
            <Link href="/gold-signals/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">Gold Signals</Link>
            <Link href="/xauusd-analysis/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">XAUUSD Analysis</Link>
            <Link href="/blog/" className="text-sm font-medium text-trading-gold hover:text-trading-gold/80 transition-colors no-underline">Blog</Link>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-trading-green hover:text-trading-green/80 transition-colors no-underline">Join on Telegram</a>
          </nav>
        </div>
      </header>

      <main className="min-h-screen bg-trading-dark text-foreground overflow-x-hidden">
        {/* HERO */}
        <section className="relative px-4 py-16 md:py-24 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-trading-gold/5 rounded-full blur-[120px] pointer-events-none" />
          <CandlestickBackground />
          <HeroAnimation className="relative z-10 max-w-3xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground/80 mb-6 flex-wrap">
              <Link href="/" className="hover:text-trading-green transition-colors no-underline">Home</Link>
              <span className="text-muted-foreground/40">/</span>
              <Link href="/blog/" className="hover:text-trading-green transition-colors no-underline">Blog</Link>
              <span className="text-muted-foreground/40">/</span>
              <span className="text-foreground/80">XAUUSD Weekly Forecast Nov 2–6</span>
            </nav>
            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-gold">
                <Calendar className="w-4 h-4" />XAUUSD Weekly Forecast · Nov 2–6, 2026
              </span>
            </FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">XAUUSD Weekly Forecast Nov 2–6, 2026: Gold at One-Year Low Before NFP</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground/80 mb-8">
              By the Forex Wizard Team · Published October 31, 2026 · Data through Friday&apos;s close (Oct 30) · 12 min read
            </p>
            <FadeIn delay={0.3} className="mb-8">
              <div className="glass-strong rounded-2xl overflow-hidden gradient-border">
                <picture>
                  <source type="image/webp" srcSet={HERO_WEBP_SRCSET} sizes={HERO_SIZES} />
                  <img src={post.image} alt={post.imageAlt} width={1200} height={630} className="w-full h-auto block" loading="eager" fetchPriority="high" />
                </picture>
              </div>
            </FadeIn>
            <p className="text-sm text-muted-foreground/80 mb-8 italic">
              This article is educational market analysis, not financial advice or a trading signal. Prices are spot XAUUSD unless stated, and levels may differ by $10–$20 between brokers.
            </p>
          </HeroAnimation>
        </section>

        {/* QUICK ANSWER + TOC */}
        <FadeSection className="py-8 md:py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div id="quick-answer" className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-gold/50 mb-6">
              <h2 className="text-xl md:text-2xl font-extrabold mb-4">
                <span className="text-foreground">Quick Answer: </span>
                <span className="text-trading-gold text-glow-gold">Gold Forecast This Week</span>
              </h2>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-medium mb-4">
                <strong>Gold (XAUUSD) ends the week near $3,890, a one-year low, after a drop of more than 3% on Friday driven by rising oil, Treasury yields near 5% and December Fed hike bets. For Nov 2–6, key support is $3,880–$3,850 and then $3,800. Resistance sits at $3,930–$3,950 and $4,000–$4,010. Friday&apos;s Nonfarm Payrolls report is the main catalyst.</strong>
              </p>
              <div className="mt-5 pt-5 border-t border-white/10">
                <p className="text-sm font-bold text-foreground mb-3">In this article:</p>
                <nav aria-label="Table of contents" className="flex flex-wrap gap-x-5 gap-y-2">
                  {tocItems.map(item => (
                    <a key={item.href} href={item.href} className="text-sm text-trading-green hover:text-trading-green/80 underline underline-offset-2 transition-colors">{item.label}</a>
                  ))}
                </nav>
              </div>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              This XAUUSD weekly forecast covers the November 2–6, 2026 trading week. Gold finished October with a second straight monthly loss after a sharp Friday selloff, so this week&apos;s gold price forecast focuses on where the market may find support, where sellers are likely to return, and how the major data releases could change the picture.
            </p>
          </div>
        </FadeSection>

        {/* KEY TAKEAWAYS */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div id="key-takeaways" className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Gold Price Forecast This Week: </span>
                <span className="text-trading-gold text-glow-gold">Key Takeaways</span>
              </h2>
              <ul className="space-y-3 text-base md:text-lg text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Price:</strong> Spot gold finished the week near $3,890, its lowest level in about a year. December gold futures settled at $3,898.90, a 52-week low.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Performance:</strong> Gold fell about 2.6–2.9% on the week, roughly 6% in October (a second straight monthly loss) and about 7% since October 19. It is around 30% below the January record near $5,595.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Fed:</strong> The Fed held rates at 3.75%–4.00% on October 28 in a 10–2 vote. Both dissenters wanted a hike. Odds of a 25 bp hike on December 9 are roughly 75–85%, depending on the source and the time of day.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Data:</strong> Q3 GDP grew 3.4% annualized. September PCE inflation was 3.6% year-on-year, and core PCE rose to 3.1%.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Oil and yields:</strong> WTI crude settled near $104, its highest close since September 15, and the 10-year Treasury yield is near 5%.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Key levels:</strong> Support is $3,880–$3,850, then $3,800. Resistance is $3,930–$3,950, then $4,000–$4,010.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">This week&apos;s events:</strong> ISM Manufacturing (Mon), US midterms and RBA (Tue), ADP and ISM Services (Wed), Bank of England (Thu) and <strong className="text-foreground/90">Nonfarm Payrolls (Fri)</strong>.</span></li>
              </ul>
            </div>
          </div>
        </FadeSection>

        {/* LAST WEEK RECAP */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 id="last-week-recap" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">What Happened to Gold Last Week (Oct 26–30)?</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Gold opened the week near $3,998 and held above $3,978 on Monday. It then rose about 1.2% on Tuesday to roughly $4,060 and reached a weekly high near $4,083 on Wednesday, the day of the Fed decision. The Fed&apos;s 10–2 hold, with two members voting for a hike, kept the policy bias hawkish, and the rally faded below the falling trendline from the October 8 high.
                </p>
                <p>
                  On Thursday, strong GDP and hotter PCE inflation pushed gold down about 1.2% to around $4,022. On Friday, gold broke below $4,000 and the selling accelerated. Oil climbed, Treasury yields stayed near 5%, and a slump in technology shares added pressure across risk assets. Spot gold fell as low as roughly $3,881, then finished near $3,890, down more than 3% on the day. Silver dropped about 6% and slipped below $50 for the first time since November 2025.
                </p>
                <p>
                  For context on the earlier leg of this selloff, see our{" "}
                  <Link href="/blog/xauusd-weekly-forecast-october-26-30-2026/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">Oct 26–30 weekly forecast</Link>{" "}
                  and our{" "}
                  <Link href="/blog/us-cpi-october-14-2026-gold-xauusd/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">US CPI October 14 gold analysis</Link>.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* WHY GOLD IS FALLING */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 id="why-gold-is-falling" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Why Is Gold Falling? The Main Drivers</span>
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">1. Fed rate hike expectations</h3>
                  <p>The Fed raised rates by 25 bp in September, its first hike since 2023, and held at 3.75%–4.00% on October 28. Governor Lisa Cook and Cleveland Fed President Beth Hammack both voted for another hike. The statement described growth as strong and inflation as elevated. Markets now price a good chance of a December 9 hike, which raises the opportunity cost of holding gold.</p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">2. Strong growth and sticky inflation</h3>
                  <p>Q3 GDP grew 3.4% annualized, up from 2.2% in Q2. September PCE rose 0.5% month-on-month and 3.6% year-on-year, and core PCE reached 3.1%. This follows the 3.7% September CPI reading. Strong growth combined with high inflation gives the Fed room to keep tightening.</p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">3. Oil and energy inflation</h3>
                  <p>WTI crude settled near $104, its highest close since mid-September, amid Middle East tensions. Higher energy prices push headline inflation up and strengthen expectations of a longer period of high interest rates.</p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">4. Higher yields and forced selling</h3>
                  <p>The 10-year Treasury yield is near 5%. Some analysts also point to forced selling and margin calls after the slump in technology stocks, which can hit even safe-haven assets when investors need cash. That kind of liquidation can overshoot and then reverse, but it does not guarantee a bottom.</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Why gold falls even when inflation rises</h3>
                  <p>
                    Gold pays no interest. When inflation pushes the Fed toward higher rates, real yields and the dollar tend to rise, and non-yielding gold becomes less attractive. In a tightening cycle, the rate story can overpower the usual inflation-hedge story. Read our full guide to{" "}
                    <Link href="/blog/xauusd-fundamental-analysis/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">XAUUSD fundamental analysis</Link>{" "}
                    to see how the Fed, real yields and the dollar drive gold.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* SUPPORT AND RESISTANCE */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 id="support-resistance" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
              <span className="text-foreground">XAUUSD Support and Resistance Levels for </span>
              <span className="text-trading-gold text-glow-gold">Nov 2–6</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              Gold is trading at a one-year low, so there is little recent chart history below the current price. The support levels below are mostly round-number and psychological zones. Treat all levels as reference zones, not exact lines.
            </p>
            <div className="hidden md:block glass-strong rounded-2xl overflow-hidden gradient-border">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10">
                  <th className="text-left p-4 font-bold text-foreground">Type</th>
                  <th className="text-left p-4 font-bold text-foreground">Zone</th>
                  <th className="text-left p-4 font-bold text-foreground">Why it matters</th>
                </tr></thead>
                <tbody>
                  {supportResistanceTable.map(row => (
                    <tr key={row.type} className="border-b border-white/5 last:border-0">
                      <td className="p-4 align-top font-medium text-foreground">{row.type}</td>
                      <td className="p-4 align-top"><span className={row.tone === "gold" ? "font-bold text-trading-gold" : row.tone === "green" ? "font-bold text-trading-green" : "font-bold text-muted-foreground"}>{row.zone}</span></td>
                      <td className="p-4 text-muted-foreground align-top">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden space-y-4">
              {supportResistanceTable.map(row => (
                <div key={row.type} className="glass-strong rounded-2xl p-5 gradient-border">
                  <p className="text-xs text-muted-foreground mb-1">{row.type}</p>
                  <p className={`text-2xl font-extrabold mb-2 ${row.tone === "gold" ? "text-trading-gold" : row.tone === "green" ? "text-trading-green" : "text-muted-foreground"}`}>{row.zone}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{row.why}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground/90">Technical read:</strong> Gold trades below its 50-day and 200-day moving averages and has made a series of lower highs since October 8. Momentum indicators are deeply oversold, with the daily RSI near 30 and shorter timeframes lower. This raises the chance of a sharp relief bounce, but oversold markets can stay oversold in strong downtrends. The first sign of stabilization would be gold holding above $3,880 and then recovering $4,000–$4,010. Until then, the trend remains bearish.
              </p>
              <p>
                <strong className="text-foreground/90">Weekend gap risk:</strong> News over the weekend, including oil and geopolitical headlines, can cause a gap at the Sunday market open. Check spreads and prices before placing any order in the first hour of the week.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ECONOMIC CALENDAR */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 id="economic-calendar" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
              <span className="text-foreground">Economic Calendar This Week: </span>
              <span className="text-trading-gold text-glow-gold">Nov 2–6, 2026 (ET, GMT and PKT)</span>
            </h2>
            <p className="text-sm text-muted-foreground/80 mb-6 leading-relaxed">
              <strong className="text-foreground/90">Clock change note:</strong> US daylight saving time ended on Sunday, November 1. From this week, US releases arrive <strong className="text-foreground/90">one hour later in PKT</strong> than in recent weeks. For example, 8:30 AM ET is now 18:30 PKT. UK clocks changed on October 25.
            </p>
            <div className="hidden md:block glass-strong rounded-2xl overflow-hidden gradient-border">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10">
                  <th className="text-left p-4 font-bold text-foreground">Day</th>
                  <th className="text-left p-4 font-bold text-foreground">Event</th>
                  <th className="text-left p-4 font-bold text-foreground">ET</th>
                  <th className="text-left p-4 font-bold text-foreground">GMT</th>
                  <th className="text-left p-4 font-bold text-foreground">PKT</th>
                </tr></thead>
                <tbody>
                  {economicCalendar.map((row, i) => (
                    <tr key={i} className={`border-b border-white/5 last:border-0 ${row.event.includes("Nonfarm Payrolls") ? "bg-trading-gold/5" : ""}`}>
                      <td className="p-4 text-muted-foreground align-top whitespace-nowrap">{row.day}</td>
                      <td className="p-4 align-top font-medium text-foreground">{row.event}</td>
                      <td className="p-4 text-foreground/90 align-top">{row.et}</td>
                      <td className="p-4 text-foreground/90 align-top">{row.gmt}</td>
                      <td className="p-4 text-foreground/90 align-top font-medium">{row.pkt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden space-y-4">
              {economicCalendar.map((row, i) => (
                <div key={i} className={`glass-strong rounded-2xl p-5 gradient-border ${row.event.includes("Nonfarm Payrolls") ? "border-l-4 border-l-trading-gold/50" : ""}`}>
                  <p className="text-xs text-muted-foreground mb-1">{row.day}</p>
                  <p className="text-base font-bold text-foreground mb-3">{row.event}</p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div><span className="text-muted-foreground/70 block">ET</span><span className="text-foreground/90">{row.et}</span></div>
                    <div><span className="text-muted-foreground/70 block">GMT</span><span className="text-foreground/90">{row.gmt}</span></div>
                    <div><span className="text-muted-foreground/70 block">PKT</span><span className="text-foreground/90 font-medium">{row.pkt}</span></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <h3 className="text-lg md:text-xl font-bold text-foreground">Events that matter most for gold</h3>
              <p>
                <strong className="text-foreground/90">ISM Manufacturing and Services (Mon, Wed).</strong> September readings were strong: manufacturing at 54.5 and services at 54.9. Watch the prices-paid components. Firm price pressure would support the December hike case and add to the selling in gold.
              </p>
              <p>
                <strong className="text-foreground/90">US midterm elections (Tue).</strong> Election results can shift expectations for fiscal policy, Treasury yields and the dollar. Results arrive overnight in Pakistan, and early headlines can cause thin-liquidity moves in the Asian session on Wednesday.
              </p>
              <p>
                <strong className="text-foreground/90">Bank of England (Thu).</strong> The BoE joins the RBA and the ECB as a central bank weighing energy-driven inflation. A hawkish tone would support the &quot;global tightening&quot; theme that has pressured gold.
              </p>
              <p>
                <strong className="text-foreground/90">Nonfarm Payrolls (Fri).</strong> This is the main event. September payrolls came in at just +29K against a forecast of about 90K, a weak print that sits oddly beside 3.4% GDP growth. Consensus for October was not widely published at the time of writing, so check the latest forecast before the release. A weak number does not automatically lift gold: with inflation running hot, wage growth and revisions may matter as much as the headline.
              </p>
              <p>
                <strong className="text-foreground/90">Just beyond this week:</strong> October CPI is scheduled for November 10 and the next FOMC decision is on December 9.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* SCENARIOS */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 id="scenarios" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-center">
              <span className="text-foreground">Gold Price Prediction: </span>
              <span className="text-trading-gold text-glow-gold">Bullish, Bearish and Range Scenarios</span>
            </h2>
            <p className="text-sm text-muted-foreground/80 mb-6 text-center">These are conditional scenarios, not predictions or trading signals.</p>
            <div className="space-y-6">
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-gold/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-trading-gold/10 flex items-center justify-center"><TrendingDown className="w-6 h-6 text-trading-gold" /></div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-trading-gold">Bearish scenario: selling continues</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground/90">Conditions:</strong> ISM prices-paid stays elevated, ADP and NFP beat expectations, wage growth firms up, oil rises further, or December hike odds move toward 90%.</p>
                  <p><strong className="text-foreground/90">What to watch:</strong> A sustained break and close below $3,880 would open $3,850, then $3,800. If forced selling continues, $3,750 becomes the next reference.</p>
                  <p><strong className="text-foreground/90">Weakens this scenario:</strong> A recovery back above $4,000–$4,010.</p>
                </div>
              </div>
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-green/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-trading-green/10 flex items-center justify-center"><TrendingUp className="w-6 h-6 text-trading-green" /></div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-trading-green">Bullish scenario: oversold relief bounce</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground/90">Conditions:</strong> Softer ISM or ADP data, a second weak NFP with cooler wages, falling oil, stabilizing equities or a shift in the Fed&apos;s tone.</p>
                  <p><strong className="text-foreground/90">What to watch:</strong> A hold above $3,880 followed by a reclaim of $3,930–$3,950 would be the first sign of recovery. The next test is $4,000–$4,010. Only a sustained move above $4,034 would put $4,065–$4,083 back in play.</p>
                  <p><strong className="text-foreground/90">Reality check:</strong> Even a strong bounce may meet sellers at $4,000–$4,034, the area where the hike repricing began.</p>
                </div>
              </div>
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-muted-foreground/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-muted-foreground/10 flex items-center justify-center"><Minus className="w-6 h-6 text-muted-foreground" /></div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-foreground">Range scenario: choppy consolidation</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground/90">Conditions:</strong> Mixed data and a market digesting Friday&apos;s large drop.</p>
                  <p><strong className="text-foreground/90">What to watch:</strong> Price rotating between roughly $3,850 and $3,950, with false breakouts around data releases. This is the most likely pattern between major events.</p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* RISK PLAN */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div id="risk-plan" className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How to Prepare for a </span>
                <span className="text-trading-gold text-glow-gold">High-Volatility Gold Week</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
                Friday&apos;s move of more than 3% shows how fast conditions can change. A volatile week calls for tighter risk control.
              </p>
              <ul className="space-y-3 text-base md:text-lg text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Expect wider ranges and spreads</strong> around ISM, ADP, the BoE and NFP. Gold can move $30–$60 within minutes on major releases.</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Avoid trading the first minutes after a release</strong> unless you have a clear plan. Let the first reaction settle.</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Size positions for the stop-loss distance.</strong> Bigger volatility means a smaller lot size, not a larger one. See our guide to <Link href="/blog/forex-risk-management-for-beginners/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">forex risk management for beginners</Link>.</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Know your sessions.</strong> Gold behaves differently in the Asian, London and New York sessions. Read <Link href="/blog/xauusd-volatility-trading-sessions/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">why XAUUSD volatility changes by trading session</Link> and our <Link href="/blog/best-time-to-trade-forex/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">best time to trade forex</Link> guide for PKT hours.</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Update your alarms.</strong> US events now fall one hour later in PKT.</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">If you follow signals,</strong> read <Link href="/blog/how-to-follow-forex-signals/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">how to follow forex signals</Link> to learn when to enter, skip or manage a trade, and never risk money you cannot afford to lose.</span></li>
              </ul>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-5">
                For our main hub on gold market structure, visit{" "}
                <Link href="/xauusd-analysis/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">XAUUSD Analysis</Link>{" "}
                and our{" "}
                <Link href="/gold-signals/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">Gold Signals</Link>{" "}
                page.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* FAQ */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 id="faq" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">FAQ: </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD Forecast Nov 2–6, 2026</span>
              </h2>
            </div>
            <div className="space-y-4">
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">What is the XAUUSD forecast for November 2–6, 2026?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">Gold ends the week near $3,890, a one-year low, with a bearish trend below $4,000. Support is $3,880–$3,850, then $3,800. Resistance is $3,930–$3,950 and $4,000–$4,010. Friday&apos;s Nonfarm Payrolls report is the main catalyst. This is educational analysis, not a prediction.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">Will gold go up or down next week?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">It depends on the data. Strong ISM, ADP or NFP numbers and higher oil would support more selling. Weak jobs data, lower oil or a pause in Fed hike bets could spark an oversold bounce. Gold is deeply oversold, so sharp moves in both directions are possible.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">Why did gold fall on October 30, 2026?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">Gold fell more than 3% as oil prices rose, Treasury yields stayed near 5%, and traders increased bets on a December Fed rate hike after strong GDP and PCE data. A slump in tech stocks also triggered broader selling across markets.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">What are the key support and resistance levels for gold this week?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">Support is at $3,880–$3,890, then $3,850, $3,800 and $3,750. Resistance is at $3,930–$3,950, $4,000–$4,010, about $4,034 and $4,065–$4,083. Levels can differ by $10–$20 between brokers.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">What time is NFP in Pakistan time (PKT)?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">The October Nonfarm Payrolls report is released on Friday, November 6 at 8:30 AM ET, which is 13:30 GMT or <strong className="text-foreground/90">18:30 PKT</strong>. This is one hour later in PKT than recent months because US daylight saving time ended on November 1.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">Did the Fed raise interest rates in October 2026?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">No. The Fed held the target range at 3.75%–4.00% on October 28 in a 10–2 vote. Governor Lisa Cook and Cleveland Fed President Beth Hammack voted for a 25 bp hike. The next FOMC decision is on December 9.</p></div>
              </details>
            </div>
          </div>
        </FadeSection>

        {/* FINAL THOUGHTS + DISCLAIMER + SOURCES */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-gold/50">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Final </span>
                <span className="text-trading-gold text-glow-gold">Thoughts</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Gold enters November at a one-year low, pressured by Fed hike expectations, strong growth, hot inflation, higher oil and a surge in yields. The week ahead is packed with catalysts, and Friday&apos;s jobs report could set the tone for the December Fed decision. Respect the key levels, plan around the calendar in PKT, keep position sizes small, and let price confirm a scenario before acting.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-4">
                For more educational XAUUSD analysis and weekly outlooks, join the Forex Wizard community on Telegram:{" "}
                <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">Join Forex Wizard Telegram</a>
              </p>
            </div>
            <div className="glass rounded-2xl border border-trading-red/20 p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-trading-red mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5" />Risk Disclaimer</h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Forex, gold and other financial markets involve significant risk of loss and are not suitable for all investors. Past performance does not guarantee future results. The content in this article is for educational and informational purposes only and should not be considered financial advice or a recommendation to buy or sell any instrument.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-trading-gold" />Sources and data</h2>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.federalreserve.gov/newsevents/pressreleases/monetary20261028a.htm" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Federal Reserve FOMC statement, Oct 28, 2026</a></span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.bea.gov/data/gdp/gross-domestic-product" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">U.S. Bureau of Economic Analysis, GDP and Personal Income &amp; Outlays, Oct 29, 2026</a></span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.kitco.com/news/off-the-wire/2026-10-30/gold-hits-3-12-month-low-fed-hike-fears-set-monthly-loss" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Reuters via Kitco, Oct 30, 2026</a></span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>Investing.com and Kitco spot data; CME FedWatch; public economic calendars. All figures as of October 30–31, 2026.</span></li>
              </ul>
            </div>
          </div>
        </FadeSection>

        {/* TELEGRAM CTA */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-gold/5 via-transparent to-trading-green/5 rounded-3xl blur-sm" />
            <div className="relative glass-strong rounded-3xl p-8 md:p-14 text-center gradient-border">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6"><span className="text-foreground">Follow XAU/USD on </span><span className="text-trading-green text-glow-green">Telegram</span></h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">Join the Forex Wizard Telegram community for educational XAU/USD market structure, key levels and trading-related education.</p>
              <PulsingGlow className="inline-block rounded-xl"><TelegramCTA text="Join Forex Wizard Telegram" variant="primary" className="text-lg md:text-xl px-10 py-5" /></PulsingGlow>
              <p className="mt-6 text-xs text-muted-foreground/80">Free to join &middot; Trading involves risk &middot; Not financial advice</p>
            </div>
          </div>
        </FadeSection>

        {/* CONTINUE LEARNING */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"><span className="text-foreground">Continue </span><span className="text-trading-gold text-glow-gold">Learning</span></h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">Explore related ForexWizard guides and tools to deepen your gold trading knowledge.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {continueLearning.map((item, i) => (
                <FadeIn key={item.href} delay={i * 0.07}>
                  <Link href={item.href} className="block h-full no-underline">
                    <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center`}>{item.icon}</div>
                      <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
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
