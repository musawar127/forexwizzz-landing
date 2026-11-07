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

const post = getBlogPost("xauusd-weekly-forecast-november-9-13-2026")!;
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
    "gold CPI forecast",
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
  headline: "XAUUSD Weekly Forecast Nov 9–13, 2026: Gold Holds $4,000 Before US CPI",
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
    { "@type": "ListItem", position: 3, name: "XAUUSD Weekly Forecast Nov 9–13, 2026", item: CANONICAL },
  ],
};

const faqPageStructuredData = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question", name: "What is the XAUUSD forecast for November 9–13, 2026?",
      acceptedAnswer: { "@type": "Answer", text: "Gold closed last week near $4,045. Support is $4,035–$4,000 and $3,990. Resistance is $4,075–$4,090 and $4,125–$4,147. Tuesday's US CPI report is the main catalyst. This is educational analysis, not a prediction." },
    },
    {
      "@type": "Question", name: "What time is US CPI in Pakistan time (PKT)?",
      acceptedAnswer: { "@type": "Answer", text: "The October CPI report is released on Tuesday, November 10 at 8:30 AM ET, which is 13:30 GMT or 18:30 PKT. US PPI follows on Friday, November 13 at the same time." },
    },
    {
      "@type": "Question", name: "Will gold go up or down after CPI?",
      acceptedAnswer: { "@type": "Answer", text: "It depends on the data. A hot core CPI could lift December Fed hike odds and push gold toward $4,000 and lower. A clearly soft reading could ease hike bets and support a move toward $4,125–$4,147. Expect sharp moves in both directions around the release." },
    },
    {
      "@type": "Question", name: "Why did gold fall after the NFP report on November 6?",
      acceptedAnswer: { "@type": "Answer", text: "US payrolls rose by 165,000, well above the roughly 65,000 forecast, and unemployment fell to 4.1%. This raised the odds of a December Fed hike to about 77–80%, lifted the dollar and Treasury yields, and pushed gold about 1% lower to $4,045." },
    },
    {
      "@type": "Question", name: "What are the key support and resistance levels for gold this week?",
      acceptedAnswer: { "@type": "Answer", text: "Support is at $4,035–$4,040, $4,000–$4,022, $3,990 and $3,930–$3,940. Resistance is at $4,075–$4,090, $4,125–$4,135 and $4,145–$4,157. Levels can differ by $10–$20 between brokers." },
    },
    {
      "@type": "Question", name: "Is the US market open on Veterans Day, November 11?",
      acceptedAnswer: { "@type": "Answer", text: "The US stock market is open, but the bond market and government offices are closed, and no major US data is scheduled. Gold still trades, but liquidity can be thinner, so moves can be uneven." },
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
  { type: "Resistance 4", zone: "$4,200–$4,247", why: "Round number and the 50-week moving average area", tone: "green" as const },
  { type: "Resistance 3", zone: "$4,145–$4,157", why: "Thursday's two-week high and a rejection zone", tone: "green" as const },
  { type: "Resistance 2", zone: "$4,125–$4,135", why: "4-hour 200-period average area where the rally stalled", tone: "green" as const },
  { type: "Resistance 1", zone: "$4,075–$4,090", why: "Thursday's close and Friday's futures settlement area", tone: "green" as const },
  { type: "Current price", zone: "~$4,045", why: "Spot gold at Friday's close", tone: "muted" as const },
  { type: "Support 1", zone: "$4,035–$4,040", why: "Friday's low and the area buyers defended", tone: "gold" as const },
  { type: "Support 2", zone: "$4,000–$4,022", why: "Psychological level and a widely watched support zone", tone: "gold" as const },
  { type: "Support 3", zone: "~$3,990", why: "Second support and a common downside reference", tone: "gold" as const },
  { type: "Support 4", zone: "$3,930–$3,940", why: "Pre-election base from Tuesday's close", tone: "gold" as const },
  { type: "Support 5", zone: "$3,870–$3,895", why: "Oct 30 low and the one-year-low zone", tone: "gold" as const },
];

const economicCalendar = [
  { day: "Mon, Nov 9", event: "China CPI and PPI (Oct)", et: "n/a", gmt: "01:30", pkt: "06:30" },
  { day: "Mon, Nov 9", event: "NY Fed consumer inflation expectations", et: "11:00", gmt: "16:00", pkt: "21:00" },
  { day: "Tue, Nov 10", event: "US CPI (Oct): headline and core", et: "08:30", gmt: "13:30", pkt: "18:30" },
  { day: "Wed, Nov 11", event: "US Veterans Day (bond market closed, no major US data)", et: "n/a", gmt: "n/a", pkt: "n/a" },
  { day: "Thu, Nov 12", event: "UK GDP (Q3)", et: "n/a", gmt: "07:00", pkt: "12:00" },
  { day: "Thu, Nov 12", event: "US weekly jobless claims", et: "08:30", gmt: "13:30", pkt: "18:30" },
  { day: "Thu, Nov 12", event: "US existing home sales (Oct)", et: "10:00", gmt: "15:00", pkt: "20:00" },
  { day: "Thu, Nov 12", event: "US 30-year Treasury auction", et: "13:00", gmt: "18:00", pkt: "23:00" },
  { day: "Fri, Nov 13", event: "US PPI (Oct)", et: "08:30", gmt: "13:30", pkt: "18:30" },
];

const tocItems = [
  { href: "#key-takeaways", label: "Key takeaways" },
  { href: "#forecast-review", label: "How last week's forecast played out" },
  { href: "#last-week-recap", label: "Last week recap" },
  { href: "#why-gold-moved", label: "Why gold moved" },
  { href: "#support-resistance", label: "Support and resistance levels" },
  { href: "#economic-calendar", label: "Economic calendar (PKT)" },
  { href: "#scenarios", label: "Bullish, bearish and range scenarios" },
  { href: "#risk-plan", label: "Risk plan for CPI week" },
  { href: "#faq", label: "FAQ" },
];

const continueLearning = [
  { href: "/xauusd-support-resistance/", title: "XAUUSD Support and Resistance", desc: "How to identify important gold support and resistance zones for clearer trade planning.", icon: <Layers className="w-7 h-7 text-trading-gold" />, accent: "from-trading-gold/10 to-transparent" },
  { href: "/blog/xauusd-weekly-forecast-november-2-6-2026/", title: "Previous Weekly Forecast (Nov 2–6)", desc: "Last week's forecast covering the one-year low, Fed hike odds and the NFP preview.", icon: <LineChart className="w-7 h-7 text-trading-gold" />, accent: "from-trading-gold/10 to-transparent" },
  { href: "/blog/xauusd-fundamental-analysis/", title: "XAUUSD Fundamental Analysis", desc: "How the Fed, real yields and the dollar drive gold prices over time.", icon: <Activity className="w-7 h-7 text-trading-green" />, accent: "from-trading-green/10 to-transparent" },
  { href: "/xauusd-lot-size/", title: "XAUUSD Lot Size Calculator", desc: "Calculate the right lot size for your gold trades from account risk and stop distance.", icon: <Target className="w-7 h-7 text-trading-green" />, accent: "from-trading-green/10 to-transparent" },
];

export default function WeeklyForecastNov9Nov13Page() {
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
              <span className="text-foreground/80">XAUUSD Weekly Forecast Nov 9–13</span>
            </nav>
            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-gold">
                <Calendar className="w-4 h-4" />XAUUSD Weekly Forecast · Nov 9–13, 2026
              </span>
            </FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">XAUUSD Weekly Forecast Nov 9–13, 2026: Gold Holds $4,000 Before US CPI</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground/80 mb-8">
              By the Forex Wizard Team · Published November 7, 2026 · Data through Friday&apos;s close (Nov 6) · 12 min read
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
                <strong>Gold (XAUUSD) closed last week near $4,045, about 4% above its Oct 30 low but below the $4,145 weekly high, after a strong NFP lifted December Fed hike odds to roughly 80%. For Nov 9–13, support is $4,035–$4,000 and then $3,990. Resistance is $4,075–$4,090 and $4,125–$4,147. Tuesday&apos;s US CPI report (18:30 PKT) is the main catalyst.</strong>
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
              This XAUUSD weekly forecast covers the November 9–13, 2026 trading week. Gold rebounded from a one-year low last week and reclaimed $4,000, then gave back part of the gain on Friday when a much stronger jobs report lifted Fed rate-hike expectations. There is no major US data on Monday and Wednesday is a US holiday, so this week&apos;s gold price forecast centers on Tuesday&apos;s October CPI report and Friday&apos;s PPI.
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
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Price:</strong> Spot gold closed Friday near $4,045, down about 1% on the day. December gold futures settled at $4,079.50.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Weekly move:</strong> Gold gained about 4.4% from the Oct 30 close near $3,875 and touched roughly $4,145 on Thursday, a two-week high. It is still around 27% below its January record.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">NFP:</strong> US payrolls rose 165,000 in October against a forecast of about 65,000. Unemployment fell to 4.1%, and August–September data was revised up by 84,000 jobs.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Fed:</strong> Rates are at 3.75%–4.00%. Odds of a 25 bp hike at the December 8–9 meeting rose to roughly 77–80% after the jobs report, from about 67% beforehand.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Dollar and yields:</strong> The US dollar index rose about 0.7% on Friday to near 102.3, and the 10-year Treasury yield rose to about 4.87%.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Oil:</strong> Brent crude fell more than 16% on the week to near $98 on hopes of a US–Iran deal, easing some inflation pressure.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Key levels:</strong> Support is $4,035–$4,000, then $3,990. Resistance is $4,075–$4,090, then $4,125–$4,147.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">This week&apos;s events:</strong> US CPI (Tue, 18:30 PKT), US Veterans Day (Wed) and US PPI (Fri).</span></li>
              </ul>
            </div>
          </div>
        </FadeSection>

        {/* FORECAST REVIEW */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div id="forecast-review" className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-green/40">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How Last Week&apos;s Forecast Played Out</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Our{" "}
                  <Link href="/blog/xauusd-weekly-forecast-november-2-6-2026/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">Nov 2–6 weekly forecast</Link>{" "}
                  named an oversold relief bounce as the main bullish scenario. It marked $4,000–$4,010 as the first recovery test, then $4,034 and $4,065–$4,083 as the next resistance zones. It also listed a strong NFP as a bearish trigger.
                </p>
                <p>
                  Both ideas played out. Gold reclaimed $4,000 on Wednesday after the midterm results weakened the dollar, moved through $4,034 and $4,065–$4,083 on Thursday, and stalled near $4,145. When NFP beat expectations on Friday, gold fell about 1% but held above $4,000. Levels are reference zones, not guarantees, and markets do not always follow a plan this closely.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* LAST WEEK RECAP */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 id="last-week-recap" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">What Happened to Gold Last Week (Nov 2–6)?</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Gold started the week below $4,000 and closed Tuesday near $3,940, ahead of the US midterm results. On Wednesday, results pointing to Democratic control of Congress pushed the dollar index to a one-month low near 101.3 and lowered Treasury yields. Gold jumped about 2–3% to roughly $4,050.
                </p>
                <p>
                  On Thursday, the Bank of England raised Bank Rate by 25 bp to 4.00%, its first hike of the cycle. The dollar slipped further and gold rose to about $4,145. US stocks then sold off sharply, with the S&amp;P 500 falling about 4.4%, and traders trimmed gold to cover losses. Gold closed Thursday near $4,088.
                </p>
                <p>
                  On Friday, the October jobs report beat forecasts by a wide margin. The dollar rose, yields climbed and gold fell about 1% to $4,045. For the earlier part of this move, see our{" "}
                  <Link href="/blog/xauusd-weekly-forecast-october-26-30-2026/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">Oct 26–30 weekly forecast</Link>{" "}
                  and our{" "}
                  <Link href="/blog/us-cpi-october-14-2026-gold-xauusd/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">US CPI October 14 gold analysis</Link>.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* WHY GOLD MOVED */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 id="why-gold-moved" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Why Did Gold Move This Week? The Main Drivers</span>
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">1. A weaker dollar early in the week</h3>
                  <p>The dollar index fell to a one-month low after the midterm results and the Bank of England hike. A weaker dollar makes gold cheaper for buyers using other currencies and tends to lift gold. That gave the rebound its first leg.</p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">2. Stock-market volatility</h3>
                  <p>Technology shares sold off sharply on Thursday. Investors sometimes sell profitable positions, including gold, to cover losses elsewhere. This is why gold dropped from its high even before the jobs report.</p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">3. A strong jobs report and Fed hike pricing</h3>
                  <p>Payrolls of 165,000 were far above the roughly 65,000 forecast, and the three-month average rose to about 137,000. The stronger labor market makes it harder for the Fed to pause. December hike odds jumped to roughly 77–80%, which raises the opportunity cost of holding non-yielding gold.</p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">4. Lower oil prices</h3>
                  <p>Brent crude fell more than 16% on hopes of a US–Iran deal. Lower energy prices ease inflation pressure, which is supportive for gold, but the effect was outweighed by the jobs data on Friday. If talks stall and oil rebounds toward $100, inflation pressure could return.</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Why gold still faces headwinds</h3>
                  <p>
                    Gold pays no interest, so higher expected rates and a firm dollar are the main obstacles. Analyst forecasts have also come down: Goldman Sachs cut its end-2026 gold forecast to $4,150 from $4,650, according to Reuters. Read our guide to{" "}
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
              <span className="text-trading-gold text-glow-gold">Nov 9–13</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              Levels come from recent price action and may differ by $10–$20 between brokers and data providers. Treat them as zones, not exact lines. For a refresher on how to mark these zones, see our guide to{" "}
              <Link href="/xauusd-support-resistance/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">XAUUSD support and resistance</Link>.
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
                <strong className="text-foreground/90">Technical read:</strong> Gold has recovered above $4,000 and is trading inside a $4,000–$4,200 zone, but it remains below the 50-week moving average near $4,247 and has not reclaimed the 4-hour 200-period average near $4,125. That keeps the bigger picture cautious. As long as gold holds above $4,000, the recovery structure stays intact. A sustained break below $4,000 would weaken it and bring $3,990 and $3,930–$3,940 into play.
              </p>
              <p>
                <strong className="text-foreground/90">Thin-liquidity note:</strong> The US bond market is closed on Wednesday for Veterans Day, so rate-sensitive moves can be uneven that day.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ECONOMIC CALENDAR */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 id="economic-calendar" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
              <span className="text-foreground">Economic Calendar This Week: </span>
              <span className="text-trading-gold text-glow-gold">Nov 9–13, 2026 (ET, GMT and PKT)</span>
            </h2>
            <p className="text-sm text-muted-foreground/80 mb-6 leading-relaxed">
              US clocks changed on November 1, so US releases are at 8:30 AM ET = 13:30 GMT = <strong className="text-foreground/90">18:30 PKT</strong>.
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
                    <tr key={i} className={`border-b border-white/5 last:border-0 ${(row.event.includes("US CPI") || row.event.includes("US PPI")) ? "bg-trading-gold/5" : ""}`}>
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
                <div key={i} className={`glass-strong rounded-2xl p-5 gradient-border ${(row.event.includes("US CPI") || row.event.includes("US PPI")) ? "border-l-4 border-l-trading-gold/50" : ""}`}>
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
                <strong className="text-foreground/90">US CPI (Tue).</strong> This is the main event. Analysts expect headline CPI to rise about 0.3% month-on-month in October, down from 0.6% in September, and core CPI to rise about 0.2%, down from 0.3%. According to CMC Markets, year-on-year figures may not be published for October because last year&apos;s October CPI was not released during the government shutdown, so the month-on-month numbers will drive the reaction. After last week&apos;s strong jobs report, a core reading at or above 0.3% would likely strengthen December hike bets and pressure gold. A clearly softer print could ease hike odds and support a recovery toward $4,125–$4,147.
              </p>
              <p>
                <strong className="text-foreground/90">US PPI (Fri).</strong> September PPI rose 1.3% month-on-month and 6.3% year-on-year, so pipeline inflation is a concern. A hot PPI after CPI would reinforce the hawkish tone. A softer reading would add to any relief after CPI.
              </p>
              <p>
                <strong className="text-foreground/90">Fed speakers and hike odds (all week).</strong> With December hike odds near 80%, any comment from Fed officials on inflation or the labor market can move yields, the dollar and gold between data releases.
              </p>
              <p>
                <strong className="text-foreground/90">Oil and US–Iran headlines.</strong> A deal would extend the drop in oil and ease inflation pressure. A breakdown in talks could send oil higher and revive the inflation and rate-hike story.
              </p>
              <p>
                <strong className="text-foreground/90">Just beyond this week:</strong> Advance retail sales for October are due on November 17, and the next FOMC decision is on December 9.
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
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-green/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-trading-green/10 flex items-center justify-center"><TrendingUp className="w-6 h-6 text-trading-green" /></div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-trading-green">Bullish scenario: soft CPI extends the recovery</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground/90">Conditions:</strong> CPI at or below expectations, especially core at 0.2% or lower, December hike odds falling below about 70%, the dollar index sliding back toward 101, and oil staying lower.</p>
                  <p><strong className="text-foreground/90">What to watch:</strong> A reclaim of $4,075–$4,090 would be the first sign of strength, followed by $4,125–$4,135 and $4,145–$4,157. A sustained break above $4,157 would put $4,200 in play.</p>
                  <p><strong className="text-foreground/90">Weakens this scenario:</strong> A close back below $4,035.</p>
                </div>
              </div>
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-gold/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-trading-gold/10 flex items-center justify-center"><TrendingDown className="w-6 h-6 text-trading-gold" /></div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-trading-gold">Bearish scenario: hot CPI revives the selloff</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground/90">Conditions:</strong> Core CPI at 0.3% or higher, December hike odds rising above about 85%, the dollar holding above 102 and the 10-year yield moving above 4.9%.</p>
                  <p><strong className="text-foreground/90">What to watch:</strong> A break and close below $4,035–$4,000 would open $3,990, then $3,930–$3,940. A move through those levels would put $3,870–$3,895, the one-year-low zone, back in focus.</p>
                  <p><strong className="text-foreground/90">Weakens this scenario:</strong> A quick recovery above $4,090.</p>
                </div>
              </div>
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-muted-foreground/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-muted-foreground/10 flex items-center justify-center"><Minus className="w-6 h-6 text-muted-foreground" /></div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-foreground">Range scenario: in-line CPI and a digestion week</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground/90">Conditions:</strong> CPI close to forecasts and hike odds staying near 75–80%.</p>
                  <p><strong className="text-foreground/90">What to watch:</strong> Price rotating between roughly $4,000 and $4,130, with sharp spikes around CPI and PPI that fade. The Wednesday holiday may lead to quiet, uneven trading.</p>
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
                <span className="text-foreground">How to Prepare for </span>
                <span className="text-trading-gold text-glow-gold">CPI Week</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
                CPI and PPI can move gold by tens of dollars within minutes. A few basic habits help.
              </p>
              <ul className="space-y-3 text-base md:text-lg text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Expect wide spreads and fast moves</strong> at 18:30 PKT on Tuesday and Friday.</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Avoid trading the first minutes after a release</strong> unless you have a clear plan. Let the first reaction settle.</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Size positions for the stop-loss distance.</strong> Bigger volatility means a smaller lot size. Use our <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">XAUUSD lot size calculator</Link> and read our guide to <Link href="/blog/forex-risk-management-for-beginners/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">forex risk management for beginners</Link>.</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Know your sessions.</strong> Read <Link href="/blog/xauusd-volatility-trading-sessions/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">why XAUUSD volatility changes by trading session</Link> and our <Link href="/blog/best-time-to-trade-forex/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">best time to trade forex</Link> guide for PKT hours.</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Expect a quiet Monday and a thin Wednesday.</strong> Do not force trades on low-volume days.</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">If you follow signals,</strong> read <Link href="/blog/how-to-follow-forex-signals/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">how to follow forex signals</Link> and never risk money you cannot afford to lose.</span></li>
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
                <span className="text-trading-gold text-glow-gold">XAUUSD Forecast Nov 9–13, 2026</span>
              </h2>
            </div>
            <div className="space-y-4">
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">What is the XAUUSD forecast for November 9–13, 2026?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">Gold closed last week near $4,045. Support is $4,035–$4,000 and $3,990. Resistance is $4,075–$4,090 and $4,125–$4,147. Tuesday&apos;s US CPI report is the main catalyst. This is educational analysis, not a prediction.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">What time is US CPI in Pakistan time (PKT)?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">The October CPI report is released on Tuesday, November 10 at 8:30 AM ET, which is 13:30 GMT or <strong className="text-foreground/90">18:30 PKT</strong>. US PPI follows on Friday, November 13 at the same time.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">Will gold go up or down after CPI?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">It depends on the data. A hot core CPI could lift December Fed hike odds and push gold toward $4,000 and lower. A clearly soft reading could ease hike bets and support a move toward $4,125–$4,147. Expect sharp moves in both directions around the release.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">Why did gold fall after the NFP report on November 6?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">US payrolls rose by 165,000, well above the roughly 65,000 forecast, and unemployment fell to 4.1%. This raised the odds of a December Fed hike to about 77–80%, lifted the dollar and Treasury yields, and pushed gold about 1% lower to $4,045.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">What are the key support and resistance levels for gold this week?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">Support is at $4,035–$4,040, $4,000–$4,022, $3,990 and $3,930–$3,940. Resistance is at $4,075–$4,090, $4,125–$4,135 and $4,145–$4,157. Levels can differ by $10–$20 between brokers.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">Is the US market open on Veterans Day, November 11?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">The US stock market is open, but the bond market and government offices are closed, and no major US data is scheduled. Gold still trades, but liquidity can be thinner, so moves can be uneven.</p></div>
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
                Gold enters the week holding above $4,000 after a 4% rebound, but strong US data and a Fed that is still leaning toward hikes keep the bigger picture cautious. Tuesday&apos;s CPI report is the key test. Respect the levels, plan around the calendar in PKT, keep position sizes small, and let price confirm a scenario before acting.
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
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/november-2026" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Bank of England Monetary Policy Summary, Nov 2026</a></span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.federalreserve.gov/newsevents/pressreleases/monetary20261028a.htm" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Federal Reserve FOMC statement, Oct 28, 2026</a></span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>U.S. Bureau of Labor Statistics (Employment Situation and release schedule); Reuters; Investing.com and Rio Times closing data; CME FedWatch; CMC Markets; public economic calendars. All figures as of November 6–7, 2026.</span></li>
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
