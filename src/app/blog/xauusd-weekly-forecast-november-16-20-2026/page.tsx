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

const post = getBlogPost("xauusd-weekly-forecast-november-16-20-2026")!;
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
    "gold price today",
    "Fed rate hike gold",
    "XAUUSD support and resistance",
    "gold forecast November 2026",
    "FOMC minutes time UK",
    "FOMC minutes time GMT",
    "FOMC minutes time Pakistan",
    "US retail sales time UK",
    "UK CPI gold",
    "gold price in euros",
    "gold price in pounds",
    "XAUEUR forecast",
    "XAUGBP forecast",
    "gold forecast UK",
    "XAUUSD forecast Europe",
    "gold forecast GMT time",
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
  headline: "XAUUSD Weekly Forecast Nov 16–20, 2026: Gold Near One-Year Low Before Fed Minutes",
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
    { "@type": "ListItem", position: 3, name: "XAUUSD Weekly Forecast Nov 16–20, 2026", item: CANONICAL },
  ],
};

const faqPageStructuredData = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question", name: "What is the XAUUSD forecast for November 16–20, 2026?",
      acceptedAnswer: { "@type": "Answer", text: "Gold closed last week near $3,880, just above its one-year low of $3,852. Support is $3,867–$3,852, then $3,800. Resistance is $3,903–$3,925 and $3,960–$3,985. The FOMC minutes on Wednesday are the key event. This is educational analysis, not a prediction." },
    },
    {
      "@type": "Question", name: "What time are the FOMC minutes in the UK, Europe, UAE, India and Pakistan?",
      acceptedAnswer: { "@type": "Answer", text: "The minutes of the October Fed meeting are released on Wednesday, November 18 at 2:00 PM ET. That is 19:00 GMT in the UK, 20:00 CET in Europe, 23:00 in the UAE, 00:30 IST on Thursday in India and 00:00 PKT on Thursday in Pakistan." },
    },
    {
      "@type": "Question", name: "What is the gold price in euros and pounds this week?",
      acceptedAnswer: { "@type": "Answer", text: "At Friday's closing exchange rates, gold was worth about €3,518 per ounce (EUR/USD near 1.1028) and about £2,938 per ounce (GBP/USD near 1.3209). These figures are calculated from XAUUSD and move with both gold and the exchange rates." },
    },
    {
      "@type": "Question", name: "Why did gold fall to a one-year low last week?",
      acceptedAnswer: { "@type": "Answer", text: "Gold fell about 4–5% as the dollar reached a 19-month high, Treasury yields surged and Fed officials signalled openness to a larger December rate hike after hot US CPI. Higher oil prices added to inflation worries. Gold touched about $3,852 on Thursday before bouncing." },
    },
    {
      "@type": "Question", name: "What time is US retail sales in the UK and Europe?",
      acceptedAnswer: { "@type": "Answer", text: "US retail sales for October are released on Tuesday, November 17 at 8:30 AM ET. That is 13:30 GMT in the UK, 14:30 CET in Europe, 17:30 in the UAE, 18:30 PKT in Pakistan and 19:00 IST in India." },
    },
    {
      "@type": "Question", name: "Does UK CPI move gold?",
      acceptedAnswer: { "@type": "Answer", text: "UK CPI is released on Wednesday, November 18 at 07:00 GMT. It mainly affects sterling and Bank of England expectations, so it matters most for gold priced in pounds (XAUGBP). Its direct effect on XAUUSD is usually smaller than US data, but it can move the dollar through GBP/USD." },
    },
    {
      "@type": "Question", name: "Will gold go up or down after the FOMC minutes?",
      acceptedAnswer: { "@type": "Answer", text: "It depends on the content. Minutes showing broad support for a larger hike could push gold lower. A more cautious tone could help an oversold rebound. Gold has been very volatile, so expect sharp moves in both directions." },
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
  { type: "Resistance 4", zone: "$4,055–$4,070", why: "Area gold lost during the Nov 10–11 selloff", tone: "green" as const },
  { type: "Resistance 3", zone: "$4,000–$4,031", why: "Psychological level lost on Nov 11 and the 20-day average area", tone: "green" as const },
  { type: "Resistance 2", zone: "$3,960–$3,985", why: "Next recovery target if gold clears $3,925", tone: "green" as const },
  { type: "Resistance 1", zone: "$3,903–$3,925", why: "Friday's high and the first level gold must reclaim", tone: "green" as const },
  { type: "Current price", zone: "~$3,880", why: "Spot gold near Friday's close", tone: "muted" as const },
  { type: "Support 1", zone: "$3,867–$3,874", why: "Friday's low and Thursday's late-session low", tone: "gold" as const },
  { type: "Support 2", zone: "$3,852", why: "Thursday's one-year low", tone: "gold" as const },
  { type: "Support 3", zone: "~$3,800", why: "Round-number reference and a widely watched downside target", tone: "gold" as const },
  { type: "Support 4", zone: "~$3,700", why: "Next round-number reference if $3,800 fails", tone: "gold" as const },
];

const goldEurGbpTable = [
  { xauusd: "$4,000", eur: "~€3,627", gbp: "~£3,028" },
  { xauusd: "$3,925", eur: "~€3,559", gbp: "~£2,972" },
  { xauusd: "$3,880 (Friday close)", eur: "~€3,518", gbp: "~£2,938" },
  { xauusd: "$3,852", eur: "~€3,493", gbp: "~£2,916" },
  { xauusd: "$3,800", eur: "~€3,446", gbp: "~£2,877" },
];

const economicCalendar = [
  { day: "Mon, Nov 16", event: "China industrial production and retail sales (Oct)", et: "21:00 (Sun, Nov 15)", gmt: "02:00", cet: "03:00", gst: "06:00", pkt: "07:00", ist: "07:30" },
  { day: "Mon, Nov 16", event: "Empire State manufacturing survey (Nov)", et: "08:30", gmt: "13:30", cet: "14:30", gst: "17:30", pkt: "18:30", ist: "19:00" },
  { day: "Mon, Nov 16", event: "Fed Chair Warsh speaks at a Fed conference", et: "TBC", gmt: "TBC", cet: "TBC", gst: "TBC", pkt: "TBC", ist: "TBC" },
  { day: "Tue, Nov 17", event: "UK labour market data", et: "02:00", gmt: "07:00", cet: "08:00", gst: "11:00", pkt: "12:00", ist: "12:30" },
  { day: "Tue, Nov 17", event: "Eurozone and German ZEW survey (Nov)", et: "05:00", gmt: "10:00", cet: "11:00", gst: "14:00", pkt: "15:00", ist: "15:30" },
  { day: "Tue, Nov 17", event: "US retail sales (Oct)", et: "08:30", gmt: "13:30", cet: "14:30", gst: "17:30", pkt: "18:30", ist: "19:00" },
  { day: "Tue, Nov 17", event: "NVIDIA earnings (after the US close, approx.)", et: "~16:20", gmt: "~21:20", cet: "~22:20", gst: "~01:20 (Wed)", pkt: "~02:20 (Wed)", ist: "~02:50 (Wed)" },
  { day: "Wed, Nov 18", event: "UK CPI inflation (Oct)", et: "02:00", gmt: "07:00", cet: "08:00", gst: "11:00", pkt: "12:00", ist: "12:30" },
  { day: "Wed, Nov 18", event: "Eurozone final CPI (Oct)", et: "05:00", gmt: "10:00", cet: "11:00", gst: "14:00", pkt: "15:00", ist: "15:30" },
  { day: "Wed, Nov 18", event: "FOMC minutes (Oct 27–28 meeting)", et: "14:00", gmt: "19:00", cet: "20:00", gst: "23:00", pkt: "00:00 (Thu)", ist: "00:30 (Thu)" },
  { day: "Thu, Nov 19", event: "US weekly jobless claims", et: "08:30", gmt: "13:30", cet: "14:30", gst: "17:30", pkt: "18:30", ist: "19:00" },
  { day: "Fri, Nov 20", event: "UK retail sales (Oct)", et: "02:00", gmt: "07:00", cet: "08:00", gst: "11:00", pkt: "12:00", ist: "12:30" },
  { day: "Fri, Nov 20", event: "University of Michigan consumer sentiment (final, Nov)", et: "10:00", gmt: "15:00", cet: "16:00", gst: "19:00", pkt: "20:00", ist: "20:30" },
];

const releaseTimeByCountry = [
  { city: "New York, Washington, Toronto", tz: "EST (UTC−5)", t830: "8:30 AM", t200: "2:00 PM" },
  { city: "Chicago, Dallas", tz: "CST (UTC−6)", t830: "7:30 AM", t200: "1:00 PM" },
  { city: "London, Dublin, Lisbon (UK / Ireland / Portugal)", tz: "GMT (UTC+0)", t830: "1:30 PM", t200: "7:00 PM" },
  { city: "Paris, Berlin, Frankfurt, Madrid, Rome, Zurich", tz: "CET (UTC+1)", t830: "2:30 PM", t200: "8:00 PM" },
  { city: "Lagos (Nigeria)", tz: "WAT (UTC+1)", t830: "2:30 PM", t200: "8:00 PM" },
  { city: "Athens, Cairo, Johannesburg", tz: "EET / SAST (UTC+2)", t830: "3:30 PM", t200: "9:00 PM" },
  { city: "Istanbul, Riyadh, Doha, Nairobi, Moscow", tz: "UTC+3", t830: "4:30 PM", t200: "10:00 PM" },
  { city: "Dubai, Abu Dhabi, Muscat (UAE / Oman)", tz: "GST (UTC+4)", t830: "5:30 PM", t200: "11:00 PM" },
  { city: "Karachi, Lahore, Islamabad (Pakistan)", tz: "PKT (UTC+5)", t830: "6:30 PM", t200: "12:00 AM (next day)" },
  { city: "Mumbai, Delhi (India)", tz: "IST (UTC+5:30)", t830: "7:00 PM", t200: "12:30 AM (next day)" },
  { city: "Dhaka (Bangladesh)", tz: "UTC+6", t830: "7:30 PM", t200: "1:00 AM (next day)" },
  { city: "Bangkok, Jakarta", tz: "UTC+7", t830: "8:30 PM", t200: "2:00 AM (next day)" },
  { city: "Singapore, Hong Kong, Kuala Lumpur, Manila, Perth", tz: "UTC+8", t830: "9:30 PM", t200: "3:00 AM (next day)" },
  { city: "Tokyo, Seoul", tz: "UTC+9", t830: "10:30 PM", t200: "4:00 AM (next day)" },
  { city: "Sydney, Melbourne", tz: "AEDT (UTC+11)", t830: "12:30 AM (next day)", t200: "6:00 AM (next day)" },
];

const tocItems = [
  { href: "#key-takeaways", label: "Key takeaways" },
  { href: "#forecast-review", label: "How last week's forecast played out" },
  { href: "#last-week-recap", label: "Last week recap" },
  { href: "#why-gold-moved", label: "Why gold moved" },
  { href: "#support-resistance", label: "Support and resistance levels" },
  { href: "#gold-in-eur-gbp", label: "Gold price in euros and pounds" },
  { href: "#economic-calendar", label: "Economic calendar (GMT, CET, PKT)" },
  { href: "#time-by-country", label: "Release times by country" },
  { href: "#scenarios", label: "Bullish, bearish and range scenarios" },
  { href: "#risk-plan", label: "Risk plan for the week" },
  { href: "#faq", label: "FAQ" },
];

const continueLearning = [
  { href: "/xauusd-support-resistance/", title: "XAUUSD Support and Resistance", desc: "How to identify important gold support and resistance zones for clearer trade planning.", icon: <Layers className="w-7 h-7 text-trading-gold" />, accent: "from-trading-gold/10 to-transparent" },
  { href: "/blog/xauusd-weekly-forecast-november-9-13-2026/", title: "Previous Weekly Forecast (Nov 9–13)", desc: "Last week's forecast and CPI update covering the hot CPI selloff and the break below $4,000.", icon: <LineChart className="w-7 h-7 text-trading-gold" />, accent: "from-trading-gold/10 to-transparent" },
  { href: "/blog/xauusd-fundamental-analysis/", title: "XAUUSD Fundamental Analysis", desc: "How the Fed, real yields and the dollar drive gold prices over time.", icon: <Activity className="w-7 h-7 text-trading-green" />, accent: "from-trading-green/10 to-transparent" },
  { href: "/xauusd-lot-size/", title: "XAUUSD Lot Size Calculator", desc: "Calculate the right lot size for your gold trades from account risk and stop distance.", icon: <Target className="w-7 h-7 text-trading-green" />, accent: "from-trading-green/10 to-transparent" },
];

export default function WeeklyForecastNov16Nov20Page() {
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
              <span className="text-foreground/80">XAUUSD Weekly Forecast Nov 16–20</span>
            </nav>
            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-gold">
                <Calendar className="w-4 h-4" />XAUUSD Weekly Forecast · Nov 16–20, 2026
              </span>
            </FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">XAUUSD Weekly Forecast Nov 16–20, 2026: Gold Near One-Year Low Before Fed Minutes</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground/80 mb-8">
              By the Forex Wizard Team · Published November 14, 2026 · Data through Friday&apos;s close (Nov 13) · 12 min read
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
                <strong>Gold (XAUUSD) closed last week near $3,880, just above its one-year low of $3,852 set on Thursday, as the dollar reached a 19-month high and Fed officials signaled openness to a larger December rate hike after hot US CPI. Support is $3,867–$3,852, then $3,800. Resistance is $3,903–$3,925 and $3,960–$3,985. The FOMC minutes on Wednesday (19:00 GMT / 20:00 CET / 00:00 PKT Thursday) are the key event.</strong>
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
              This XAUUSD weekly forecast covers the November 16–20, 2026 trading week. Gold fell about 4–5% last week and touched a one-year low near $3,852 on Thursday before steadying around $3,880 on Friday. The dollar is at a 19-month high, Treasury yields are near 5.00%, and markets price roughly a 90% chance of a December Fed hike. This week&apos;s gold price forecast centers on Wednesday&apos;s FOMC minutes from the October 27–28 meeting and Tuesday&apos;s US retail sales report.
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
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Price:</strong> Spot gold closed Friday near $3,880 after a Friday range of roughly $3,867–$3,924. Thursday&apos;s low of about $3,852 was the lowest since October 2025.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Performance:</strong> Gold fell roughly 4–5% on the week, is about flat versus the Oct 30 close near $3,875, is down about 10% in 2026 and sits roughly 30% below its January record near $5,595.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Fed:</strong> Rates are at 3.75%–4.00%. Markets see a December 9 hike as very likely (roughly 85–90%), and the CME FedWatch tool, as reported by Reuters, showed about a 14.5% chance of a larger 50 bp hike, up from 0% a week earlier.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Dollar and yields:</strong> The US dollar index is near 103.2, its highest in about 19 months, and had its best week since September. The 2-year Treasury yield rose about 34 bp in two sessions, the sharpest two-day rise in 3½ years.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Inflation:</strong> October CPI rose 0.4% month-on-month (core 0.3%), above forecasts. October PPI rose 0.3% month-on-month, below forecasts, but about 6.5% year-on-year.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Gold in EUR and GBP:</strong> At Friday&apos;s closing exchange rates, gold was about €3,518 and £2,938 per ounce.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Key levels:</strong> Support is $3,867–$3,852, then $3,800. Resistance is $3,903–$3,925, then $3,960–$3,985.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">This week&apos;s events:</strong> US retail sales (Tue, 13:30 GMT), UK CPI (Wed, 07:00 GMT), FOMC minutes (Wed, 19:00 GMT) and NVIDIA earnings (Tue, after the US close).</span></li>
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
                  <Link href="/blog/xauusd-weekly-forecast-november-9-13-2026/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">Nov 9–13 weekly forecast</Link>{", "}
                  updated on November 12 after the CPI report, listed $3,930–$3,940 and then $3,870–$3,895 as support, with $3,800 as the next reference. It marked $3,980–$4,000 as the area where sellers had been active and said a softer PPI could bring a rebound.
                </p>
                <p>
                  The levels worked as a map. Gold broke through $3,930–$3,940 and $3,870–$3,895 on Thursday and hit a one-year low near $3,852. Friday&apos;s softer PPI lifted gold only to $3,924, well below the $3,980–$4,000 resistance zone. The $3,800 reference has not been tested yet. Levels are reference zones, not guarantees, and markets do not always follow a plan this closely.
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
                <span className="text-foreground">What Happened to Gold Last Week (Nov 9–13)?</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Gold started the week strongly, closing Monday near $4,139, a three-week high, as Iran diplomacy pushed oil lower and the dollar slipped. That reversed on Tuesday, when hotter-than-expected US CPI sent gold down about 3% to near $4,013. Gold lost $4,000 on Wednesday and closed near $3,984.
                </p>
                <p>
                  On Thursday gold fell about 2.8% to close near $3,877 and touched $3,852. The dollar climbed to its highest in about 19 months and the 2-year Treasury yield jumped as Fed officials warned that inflation remains stubborn, with some signalling openness to a 50 bp hike. Oil rose after President Trump said the US does not need a deal with Iran, which added to inflation worries.
                </p>
                <p>
                  On Friday, US PPI rose 0.3% month-on-month, below forecasts, but remained about 6.5% higher than a year ago. Gold traded between roughly $3,867 and $3,924 and finished near $3,880. For earlier context, see our{" "}
                  <Link href="/blog/xauusd-weekly-forecast-november-2-6-2026/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">Nov 2–6 weekly forecast</Link>{" "}
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
                <span className="text-foreground">Why Is Gold Falling? The Main Drivers</span>
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">1. Fed hike expectations moved up a gear</h3>
                  <p>After the CPI report, Fed officials pointed to stubborn inflation and some said they were open to a larger rate rise. The chance of a 50 bp hike in December went from zero to about 14.5% in one week. Higher expected rates raise the opportunity cost of holding non-yielding gold.</p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">2. The dollar and Treasury yields surged</h3>
                  <p>The dollar index reached its highest level in about 19 months and posted its strongest weekly gain since September. A strong dollar makes gold more expensive for buyers in other currencies and tends to weigh on it.</p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">3. Inflation data stayed hot</h3>
                  <p>October CPI was above forecasts, and PPI was still running at about 6.5% year-on-year even though the monthly gain was smaller than expected. This kept the market focused on how much further the Fed may raise rates.</p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">4. Oil and Middle East headlines</h3>
                  <p>Oil prices jumped on Friday and remain a key inflation input. Headlines about an Iran deal can swing oil, yields and gold quickly in either direction.</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">The longer-term view is mixed</h3>
                  <p>
                    Analyst forecasts remain divided. Goldman Sachs cut its end-2026 gold target to $4,150, while still expecting higher prices in 2027, according to Kitco. Read our guide to{" "}
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
              <span className="text-trading-gold text-glow-gold">Nov 16–20</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              Levels come from recent price action and may differ by $10–$20 between brokers. Treat them as zones, not exact lines. For how to mark these zones yourself, see our guide to{" "}
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
                    <tr key={row.type} className={`border-b border-white/5 last:border-0 ${row.type === "Current price" ? "bg-trading-gold/5" : ""}`}>
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
                <strong className="text-foreground/90">Technical read:</strong> Gold remains in a clear downtrend, trading below its 20-day average of about $4,031 and close to its one-year low. Friday&apos;s bounce stalled at $3,924. As long as gold stays below $3,925, the bias stays cautious. The first sign of stabilization would be a hold above $3,852 followed by a recovery of $3,903–$3,925. A weekly close below $3,852 would put $3,800 in play.
              </p>
              <p>
                <strong className="text-foreground/90">Weekend gap risk:</strong> Headlines on Iran, oil or Fed speakers over the weekend can cause a gap at the Sunday market open. Check spreads and prices before placing any order in the first hour of the week.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* GOLD IN EUR/GBP */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div id="gold-in-eur-gbp" className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">Gold Price in </span>
                <span className="text-trading-gold text-glow-gold">Euros and Pounds</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                Gold is priced in US dollars, so its price in euros and pounds depends on XAUUSD and on the exchange rate. At Friday&apos;s closing rates (EUR/USD near 1.1028 and GBP/USD near 1.3209), gold was worth about €3,518 and £2,938 per ounce. These are calculated figures, not broker quotes.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                Gold fell by less in euros and pounds than in dollars last week, because both currencies also weakened. EUR/USD is near its lowest level since April 2025 as the Fed&apos;s tightening path outpaces the ECB&apos;s. GBP/USD fell from about 1.346 to 1.321 on the week, its biggest weekly decline since September, although the Bank of England&apos;s rate rise to 4.00% on November 5 has limited the slide.
              </p>
              <div className="hidden md:block glass rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-white/10">
                    <th className="text-left p-4 font-bold text-foreground">XAUUSD level</th>
                    <th className="text-left p-4 font-bold text-foreground">In euros (EUR/USD 1.1028)</th>
                    <th className="text-left p-4 font-bold text-foreground">In pounds (GBP/USD 1.3209)</th>
                  </tr></thead>
                  <tbody>
                    {goldEurGbpTable.map(row => (
                      <tr key={row.xauusd} className={`border-b border-white/5 last:border-0 ${row.xauusd.includes("Friday close") ? "bg-trading-gold/5" : ""}`}>
                        <td className="p-4 align-top font-medium text-foreground">{row.xauusd}</td>
                        <td className="p-4 align-top font-bold text-trading-green">{row.eur}</td>
                        <td className="p-4 align-top font-bold text-trading-gold">{row.gbp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="md:hidden space-y-3">
                {goldEurGbpTable.map(row => (
                  <div key={row.xauusd} className="glass rounded-xl p-4">
                    <p className="text-sm font-bold text-foreground mb-2">{row.xauusd}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-muted-foreground/70 block">Euros</span><span className="text-trading-green font-bold">{row.eur}</span></div>
                      <div><span className="text-muted-foreground/70 block">Pounds</span><span className="text-trading-gold font-bold">{row.gbp}</span></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-5">
                The euro and pound values shift whenever EUR/USD or GBP/USD move, so recalculate before you trade. Euro and sterling traders should also watch UK CPI on Wednesday and the ZEW survey on Tuesday, which can move the currency side of the calculation.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ECONOMIC CALENDAR */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 id="economic-calendar" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
              <span className="text-foreground">Economic Calendar This Week: </span>
              <span className="text-trading-gold text-glow-gold">Nov 16–20, 2026 (ET, GMT, CET and PKT)</span>
            </h2>
            <p className="text-sm text-muted-foreground/80 mb-6 leading-relaxed">
              <strong className="text-foreground/90">Time zones this week:</strong> There are no clock changes. New York is on EST, the UK is on GMT and Central Europe is on CET. New York is 5 hours behind London, 6 hours behind Central Europe and 10 hours behind Pakistan. So 8:30 AM ET = 13:30 GMT = 14:30 CET = 18:30 PKT, and 2:00 PM ET = 19:00 GMT = 20:00 CET = 00:00 PKT (next day).
            </p>
            <div className="hidden md:block glass-strong rounded-2xl overflow-hidden gradient-border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[900px]">
                  <thead><tr className="border-b border-white/10">
                    <th className="text-left p-3 font-bold text-foreground whitespace-nowrap">Day</th>
                    <th className="text-left p-3 font-bold text-foreground">Event</th>
                    <th className="text-left p-3 font-bold text-foreground whitespace-nowrap">New York (ET)</th>
                    <th className="text-left p-3 font-bold text-foreground whitespace-nowrap">UK (GMT)</th>
                    <th className="text-left p-3 font-bold text-foreground whitespace-nowrap">Europe (CET)</th>
                    <th className="text-left p-3 font-bold text-foreground whitespace-nowrap">UAE (GST)</th>
                    <th className="text-left p-3 font-bold text-foreground whitespace-nowrap">Pakistan (PKT)</th>
                    <th className="text-left p-3 font-bold text-foreground whitespace-nowrap">India (IST)</th>
                  </tr></thead>
                  <tbody>
                    {economicCalendar.map((row, i) => (
                      <tr key={i} className={`border-b border-white/5 last:border-0 ${(row.event.includes("FOMC minutes") || row.event.includes("US retail sales") || row.event.includes("UK CPI")) ? "bg-trading-gold/5" : ""}`}>
                        <td className="p-3 text-muted-foreground align-top whitespace-nowrap">{row.day}</td>
                        <td className="p-3 align-top font-medium text-foreground">{row.event}</td>
                        <td className="p-3 text-foreground/90 align-top">{row.et}</td>
                        <td className="p-3 text-foreground/90 align-top">{row.gmt}</td>
                        <td className="p-3 text-foreground/90 align-top">{row.cet}</td>
                        <td className="p-3 text-foreground/90 align-top">{row.gst}</td>
                        <td className="p-3 text-foreground/90 align-top font-medium">{row.pkt}</td>
                        <td className="p-3 text-foreground/90 align-top">{row.ist}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:hidden space-y-4">
              {economicCalendar.map((row, i) => (
                <div key={i} className={`glass-strong rounded-2xl p-5 gradient-border ${(row.event.includes("FOMC minutes") || row.event.includes("US retail sales") || row.event.includes("UK CPI")) ? "border-l-4 border-l-trading-gold/50" : ""}`}>
                  <p className="text-xs text-muted-foreground mb-1">{row.day}</p>
                  <p className="text-base font-bold text-foreground mb-3">{row.event}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-muted-foreground/70 block">New York (ET)</span><span className="text-foreground/90">{row.et}</span></div>
                    <div><span className="text-muted-foreground/70 block">UK (GMT)</span><span className="text-foreground/90">{row.gmt}</span></div>
                    <div><span className="text-muted-foreground/70 block">Europe (CET)</span><span className="text-foreground/90">{row.cet}</span></div>
                    <div><span className="text-muted-foreground/70 block">UAE (GST)</span><span className="text-foreground/90">{row.gst}</span></div>
                    <div><span className="text-muted-foreground/70 block">Pakistan (PKT)</span><span className="text-foreground/90 font-medium">{row.pkt}</span></div>
                    <div><span className="text-muted-foreground/70 block">India (IST)</span><span className="text-foreground/90">{row.ist}</span></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Release Time by Country sub-table */}
            <div id="time-by-country" className="mt-10">
              <h3 className="text-xl md:text-2xl font-extrabold text-foreground mb-4">US Data Release Times by Country (8:30 AM ET and 2:00 PM ET)</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
                Use this table for the 8:30 AM ET releases — US retail sales on Tuesday, November 17 and weekly jobless claims on Thursday, November 19 — and for the 2:00 PM ET release of the FOMC minutes on Wednesday, November 18. Times for the 2:00 PM ET release may fall on the next day in Asia and Australia.
              </p>
              <div className="hidden md:block glass-strong rounded-2xl overflow-hidden gradient-border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[700px]">
                    <thead><tr className="border-b border-white/10">
                      <th className="text-left p-4 font-bold text-foreground">City / region</th>
                      <th className="text-left p-4 font-bold text-foreground whitespace-nowrap">Time zone</th>
                      <th className="text-left p-4 font-bold text-foreground whitespace-nowrap">Local time of the 8:30 AM ET release</th>
                      <th className="text-left p-4 font-bold text-foreground whitespace-nowrap">Local time of the 2:00 PM ET release (FOMC minutes)</th>
                    </tr></thead>
                    <tbody>
                      {releaseTimeByCountry.map((row, i) => (
                        <tr key={i} className="border-b border-white/5 last:border-0">
                          <td className="p-4 align-top font-medium text-foreground">{row.city}</td>
                          <td className="p-4 text-foreground/90 align-top whitespace-nowrap">{row.tz}</td>
                          <td className="p-4 text-trading-green align-top font-bold whitespace-nowrap">{row.t830}</td>
                          <td className="p-4 text-trading-gold align-top font-bold whitespace-nowrap">{row.t200}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="md:hidden space-y-3">
                {releaseTimeByCountry.map((row, i) => (
                  <div key={i} className="glass-strong rounded-xl p-4 gradient-border">
                    <p className="text-sm font-bold text-foreground mb-1">{row.city}</p>
                    <p className="text-xs text-muted-foreground mb-3">{row.tz}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-muted-foreground/70 block">8:30 AM ET release</span><span className="text-trading-green font-bold">{row.t830}</span></div>
                      <div><span className="text-muted-foreground/70 block">2:00 PM ET (minutes)</span><span className="text-trading-gold font-bold">{row.t200}</span></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-5">
                <strong className="text-foreground/90">Quick rule:</strong> UK = New York + 5 hours, Central Europe = New York + 6, UAE = New York + 9, Pakistan = New York + 10, India = New York + 10.5. Use our{" "}
                <Link href="/tools/forex-market-hours/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">Forex Market Hours &amp; Live Session Clock</Link>{" "}
                to see sessions in your own time zone.
              </p>
            </div>

            <div className="mt-10 space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <h3 className="text-lg md:text-xl font-bold text-foreground">Events that matter most for gold</h3>
              <p>
                <strong className="text-foreground/90">FOMC minutes (Wed, 19:00 GMT / 20:00 CET / 00:00 PKT Thursday).</strong> The minutes cover the October 27–28 meeting, when the Fed held rates at 3.75%–4.00% with two members voting for a hike. Traders will look for how many officials were open to hiking soon and how much support there was for a larger move. A hawkish tone could extend the pressure on gold. A message of patience could support a relief bounce. Because Fed officials have spoken openly since CPI, the minutes will matter most if they contain surprises.
              </p>
              <p>
                <strong className="text-foreground/90">US retail sales (Tue, 13:30 GMT / 14:30 CET / 18:30 PKT).</strong> Forecasts point to a modest October gain of around 0.2%. Strong consumer spending would reinforce the case for more tightening. A weak reading could ease hike bets.
              </p>
              <p>
                <strong className="text-foreground/90">NVIDIA earnings (Tue, after the US close).</strong> Technology stocks have driven cross-market selling in recent weeks, and gold has sometimes fallen with equities when investors needed to raise cash. A large move in tech shares can spill over into gold, in either direction.
              </p>
              <p>
                <strong className="text-foreground/90">UK CPI (Wed, 07:00 GMT / 08:00 CET).</strong> UK inflation shapes Bank of England expectations after its recent hike to 4.00%. It moves sterling and therefore XAUGBP more than XAUUSD, but it can affect the dollar side of gold through GBP/USD.
              </p>
              <p>
                <strong className="text-foreground/90">Fed speakers and Iran headlines.</strong> Fed Chair Kevin Warsh speaks on Monday, and other officials will speak through the week. Any hint about the size of a December hike can move yields and the dollar. Oil and Iran headlines remain a wildcard.
              </p>
              <p>
                <strong className="text-foreground/90">Just beyond this week:</strong> Flash PMIs are due on November 23–24, PCE inflation and the second GDP estimate on November 25, the November jobs report on December 4, and the Fed decision on December 9. November CPI is due on December 10, after the Fed meeting.
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
                  <h3 className="text-xl md:text-2xl font-extrabold text-trading-green">Bullish scenario: an oversold rebound</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground/90">Conditions:</strong> Minutes that show division or patience, weak retail sales, a pullback in the dollar, easing oil prices or a calmer tone from Fed speakers.</p>
                  <p><strong className="text-foreground/90">What to watch:</strong> A hold above $3,852 followed by a reclaim of $3,903–$3,925 would be the first sign of recovery. The next test is $3,960–$3,985, then $4,000–$4,031.</p>
                  <p><strong className="text-foreground/90">Reality check:</strong> Gold has failed to hold bounces since the CPI report, so rallies into $3,960–$4,031 may meet sellers.</p>
                </div>
              </div>
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-gold/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-trading-gold/10 flex items-center justify-center"><TrendingDown className="w-6 h-6 text-trading-gold" /></div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-trading-gold">Bearish scenario: the slide continues</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground/90">Conditions:</strong> Hawkish FOMC minutes or Fed speeches, firm retail sales, the dollar index holding above 103, Treasury yields rising further, or oil moving higher.</p>
                  <p><strong className="text-foreground/90">What to watch:</strong> A close below $3,852 would open $3,800, then $3,700. A move toward 50 bp hike pricing above about 20% would add to the pressure.</p>
                  <p><strong className="text-foreground/90">Weakens this scenario:</strong> A recovery back above $3,925.</p>
                </div>
              </div>
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-muted-foreground/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-muted-foreground/10 flex items-center justify-center"><Minus className="w-6 h-6 text-muted-foreground" /></div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-foreground">Range scenario: a digestion week</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground/90">Conditions:</strong> Mixed data and a market waiting for the Fed&apos;s December decision.</p>
                  <p><strong className="text-foreground/90">What to watch:</strong> Price rotating between roughly $3,852 and $3,925, with sharp spikes around retail sales and the minutes that fade.</p>
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
                <span className="text-trading-gold text-glow-gold">Fed Minutes Week</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
                Gold has made large moves in recent weeks, so risk control matters more than usual.
              </p>
              <ul className="space-y-3 text-base md:text-lg text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Expect fast moves and wide spreads</strong> around US retail sales (13:30 GMT) and the FOMC minutes (19:00 GMT).</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Avoid trading the first minutes after a release</strong> unless you have a clear plan. Let the first reaction settle.</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Size positions for the stop-loss distance.</strong> Bigger volatility means a smaller lot size. Use our <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">XAUUSD lot size calculator</Link> and read our guide to <Link href="/blog/forex-risk-management-for-beginners/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">forex risk management for beginners</Link>.</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Know your sessions.</strong> Read <Link href="/blog/xauusd-volatility-trading-sessions/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">why XAUUSD volatility changes by trading session</Link> and our <Link href="/blog/best-time-to-trade-forex/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">best time to trade forex</Link> guide for PKT hours.</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Plan for the late-night release.</strong> The FOMC minutes arrive at 20:00 CET, 23:00 in the UAE and midnight in Pakistan. Do not hold a trade you cannot watch.</span></li>
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
                <span className="text-trading-gold text-glow-gold">XAUUSD Forecast Nov 16–20, 2026</span>
              </h2>
            </div>
            <div className="space-y-4">
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">What is the XAUUSD forecast for November 16–20, 2026?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">Gold closed last week near $3,880, just above its one-year low of $3,852. Support is $3,867–$3,852, then $3,800. Resistance is $3,903–$3,925 and $3,960–$3,985. The FOMC minutes on Wednesday are the key event. This is educational analysis, not a prediction.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">What time are the FOMC minutes in the UK, Europe, UAE, India and Pakistan?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">The minutes of the October Fed meeting are released on Wednesday, November 18 at 2:00 PM ET. That is 19:00 GMT in the UK, 20:00 CET in Europe, 23:00 in the UAE, 00:30 IST on Thursday in India and 00:00 PKT on Thursday in Pakistan.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">What is the gold price in euros and pounds this week?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">At Friday&apos;s closing exchange rates, gold was worth about €3,518 per ounce (EUR/USD near 1.1028) and about £2,938 per ounce (GBP/USD near 1.3209). These figures are calculated from XAUUSD and move with both gold and the exchange rates.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">Why did gold fall to a one-year low last week?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">Gold fell about 4–5% as the dollar reached a 19-month high, Treasury yields surged and Fed officials signalled openness to a larger December rate hike after hot US CPI. Higher oil prices added to inflation worries. Gold touched about $3,852 on Thursday before bouncing.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">What time is US retail sales in the UK and Europe?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">US retail sales for October are released on Tuesday, November 17 at 8:30 AM ET. That is 13:30 GMT in the UK, 14:30 CET in Europe, 17:30 in the UAE, 18:30 PKT in Pakistan and 19:00 IST in India.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">Does UK CPI move gold?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">UK CPI is released on Wednesday, November 18 at 07:00 GMT. It mainly affects sterling and Bank of England expectations, so it matters most for gold priced in pounds (XAUGBP). Its direct effect on XAUUSD is usually smaller than US data, but it can move the dollar through GBP/USD.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">Will gold go up or down after the FOMC minutes?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">It depends on the content. Minutes showing broad support for a larger hike could push gold lower. A more cautious tone could help an oversold rebound. Gold has been very volatile, so expect sharp moves in both directions.</p></div>
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
                Gold enters the new week near a one-year low, pressured by a strong dollar, rising Fed hike expectations and stubborn inflation. The FOMC minutes, US retail sales and Fed speakers are the main tests, and the December 9 Fed decision is the next big milestone. Respect the levels, plan around the calendar in your local time (GMT, CET or PKT), keep position sizes small, and let price confirm a scenario before acting.
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
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.federalreserve.gov/newsevents/pressreleases/monetary20261028a.htm" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">Federal Reserve FOMC statement, Oct 28, 2026</a></span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.bls.gov/news.release/cpi.htm" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">U.S. Bureau of Labor Statistics CPI release</a> and PPI release, Nov 13, 2026</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>Reuters, Kitco and Investing.com spot data; CME FedWatch (as reported by Reuters); Yahoo Finance and Trading Economics currency data; public economic calendars. Euro and pound gold prices are calculated from XAUUSD and the closing EUR/USD and GBP/USD rates. All figures as of November 13–14, 2026.</span></li>
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
