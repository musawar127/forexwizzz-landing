import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, MessageCircle, TrendingUp, TrendingDown, Clock,
  Calendar, AlertTriangle, Target, CheckCircle2, BookOpen,
  LineChart, Layers, Activity, Minus, Globe, ListChecks, Coins,
} from "lucide-react";
import {
  FadeSection, FadeIn, HeroAnimation, PulsingGlow, StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";
import { getBlogPost } from "@/data/blog-posts";

const post = getBlogPost("xauusd-weekly-forecast-november-23-27-2026")!;
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
    "gold price crash",
    "why is gold falling",
    "Fed rate hike gold",
    "XAUUSD support and resistance",
    "gold forecast November 2026",
    "US PCE time UK",
    "US PCE release time GMT",
    "US PCE time Pakistan",
    "gold forecast Thanksgiving week",
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
  headline: "XAUUSD Weekly Forecast Nov 23–27, 2026: Gold Near $3,500 Before US PCE",
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
    { "@type": "ListItem", position: 3, name: "XAUUSD Weekly Forecast Nov 23–27, 2026", item: CANONICAL },
  ],
};

const faqPageStructuredData = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question", name: "What is the XAUUSD forecast for November 23–27, 2026?",
      acceptedAnswer: { "@type": "Answer", text: "Gold closed last week near $3,548, just above its low of $3,513, the lowest since September 2025. Support is $3,520–$3,500, then $3,450–$3,475. Resistance is $3,575–$3,590 and $3,625–$3,650. US PCE inflation on Wednesday is the key event. This is educational analysis, not a prediction." },
    },
    {
      "@type": "Question", name: "What time is US PCE in the UK, Europe, UAE, India and Pakistan?",
      acceptedAnswer: { "@type": "Answer", text: "October PCE inflation is released on Wednesday, November 25 at 8:30 AM ET. That is 13:30 GMT in the UK, 14:30 CET in Europe, 17:30 in the UAE, 18:30 PKT in Pakistan and 19:00 IST in India. The second estimate of Q3 GDP and weekly jobless claims are released at the same time." },
    },
    {
      "@type": "Question", name: "Why did gold fall so much last week?",
      acceptedAnswer: { "@type": "Answer", text: "Gold fell about 8.6% as the Fed's minutes showed nearly all officials expect more rate hikes, the dollar rose for a fourth straight week and a global stock rout forced investors to sell assets to raise cash. Gold broke key levels at $3,852, $3,800 and $3,700 and touched about $3,513 on Friday." },
    },
    {
      "@type": "Question", name: "What is the gold price in euros and pounds this week?",
      acceptedAnswer: { "@type": "Answer", text: "At Friday's rates, gold was worth about €3,228 per ounce (EUR/USD near 1.0990) and about £2,713 per ounce (GBP/USD near 1.3080). These figures are calculated from XAUUSD and move with both gold and the exchange rates." },
    },
    {
      "@type": "Question", name: "Is the US market open on Thanksgiving, and does gold trade?",
      acceptedAnswer: { "@type": "Answer", text: "US stock and bond markets are closed on Thursday, November 26 and close early on Friday, November 27, at 1:00 PM ET for stocks. Gold still trades in global markets, but liquidity is thin and prices can move erratically." },
    },
    {
      "@type": "Question", name: "Why did gold fall when stocks crashed? Isn't it a safe haven?",
      acceptedAnswer: { "@type": "Answer", text: "Gold often rises in crises, but not always. In a fast stock rout, investors sell assets that are liquid and profitable to cover losses or margin calls, and a strong dollar and high interest rates add pressure. Last week gold fell alongside stocks, even as Treasury yields dropped." },
    },
    {
      "@type": "Question", name: "Will gold go up or down after PCE?",
      acceptedAnswer: { "@type": "Answer", text: "It depends on the data. A hotter-than-expected PCE could strengthen December hike bets and push gold toward $3,500 and lower. A softer reading could ease the pressure and support a relief bounce toward $3,575–$3,650. Gold is very volatile, so expect sharp moves in both directions." },
    },
  ],
};

function TelegramCTA({ text, variant = "primary", className = "" }: { text: string; variant?: "primary" | "secondary" | "gold"; className?: string }) {
  const base = "inline-flex items-center justify-center gap-2 font-bold text-base md:text-lg rounded-xl px-6 py-3.5 md:px-8 md:py-4 transition-all duration-250 cursor-pointer no-underline select-none";
  const variants: Record<string, string> = {
    primary: "bg-trading-green text-trading-dark glow-green hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(0,217,128,0.5)] active:scale-95",
    gold: "bg-trading-gold text-trading-dark glow-gold hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(255,212,59,0.5)] active:scale-95",
    secondary: "glass-strong text-trading-green border border-trading-green/30 hover:bg-trading-green/10 hover:scale-[1.03] active:scale-95",
  };
  return <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className={`${base} ${variants[variant]} ${className}`}><MessageCircle className="w-5 h-5" />{text}<ArrowRight className="w-4 h-4" /></a>;
}

const supportResistanceTable = [
  { type: "Resistance 4", zone: "$3,800–$3,850", why: "Round number and the area gold lost on Wednesday after the minutes", tone: "green" as const },
  { type: "Resistance 3", zone: "$3,685–$3,725", why: "Wednesday's close area and the zone broken on Thursday", tone: "green" as const },
  { type: "Resistance 2", zone: "$3,625–$3,650", why: "Friday's high and a common rebound ceiling", tone: "green" as const },
  { type: "Resistance 1", zone: "$3,575–$3,590", why: "First recovery test and Friday's early consolidation area", tone: "green" as const },
  { type: "Current price", zone: "~$3,548", why: "Spot gold near Friday's close", tone: "muted" as const },
  { type: "Support 1", zone: "$3,520–$3,513", why: "Friday's low and the lowest price since September 2025", tone: "gold" as const },
  { type: "Support 2", zone: "~$3,500", why: "Psychological level and the next focus named by analysts", tone: "gold" as const },
  { type: "Support 3", zone: "$3,450–$3,475", why: "Analyst downside target zone", tone: "gold" as const },
  { type: "Support 4", zone: "~$3,400", why: "Next round-number reference", tone: "gold" as const },
];

const goldEurGbpTable = [
  { xauusd: "$3,650", eur: "~€3,321", gbp: "~£2,791" },
  { xauusd: "$3,575", eur: "~€3,253", gbp: "~£2,733" },
  { xauusd: "$3,548 (Friday close)", eur: "~€3,228", gbp: "~£2,713" },
  { xauusd: "$3,520", eur: "~€3,203", gbp: "~£2,691" },
  { xauusd: "$3,500", eur: "~€3,185", gbp: "~£2,676" },
  { xauusd: "$3,450", eur: "~€3,139", gbp: "~£2,638" },
];

const economicCalendar = [
  { day: "Mon, Nov 23", event: "Eurozone flash PMI (Nov) (Germany 30 minutes earlier, France 45 minutes earlier)", et: "04:00", gmt: "09:00", cet: "10:00", gst: "13:00", pkt: "14:00", ist: "14:30" },
  { day: "Mon, Nov 23", event: "UK flash PMI (Nov)", et: "04:30", gmt: "09:30", cet: "10:30", gst: "13:30", pkt: "14:30", ist: "15:00" },
  { day: "Mon, Nov 23", event: "US flash PMI (Nov)", et: "09:45", gmt: "14:45", cet: "15:45", gst: "18:45", pkt: "19:45", ist: "20:15" },
  { day: "Mon, Nov 23", event: "Fed's Williams speaks", et: "16:00", gmt: "21:00", cet: "22:00", gst: "01:00 (Tue)", pkt: "02:00 (Tue)", ist: "02:30 (Tue)" },
  { day: "Tue, Nov 24", event: "US Conference Board consumer confidence (Nov)", et: "10:00", gmt: "15:00", cet: "16:00", gst: "19:00", pkt: "20:00", ist: "20:30" },
  { day: "Wed, Nov 25", event: "Germany final GDP (Q3)", et: "02:00", gmt: "07:00", cet: "08:00", gst: "11:00", pkt: "12:00", ist: "12:30" },
  { day: "Wed, Nov 25", event: "US PCE inflation (Oct), Q3 GDP second estimate, durable goods and jobless claims (moved up a day)", et: "08:30", gmt: "13:30", cet: "14:30", gst: "17:30", pkt: "18:30", ist: "19:00" },
  { day: "Wed, Nov 25", event: "Fed Beige Book", et: "14:00", gmt: "19:00", cet: "20:00", gst: "23:00", pkt: "00:00 (Thu)", ist: "00:30 (Thu)" },
  { day: "Thu, Nov 26", event: "US Thanksgiving: US stock and bond markets closed. ECB minutes (Oct) and BoE Financial Stability Report (times TBC)", et: "n/a", gmt: "n/a", cet: "n/a", gst: "n/a", pkt: "n/a", ist: "n/a" },
  { day: "Fri, Nov 27", event: "US stock market early close (bond market closes at 14:00 ET)", et: "13:00", gmt: "18:00", cet: "19:00", gst: "22:00", pkt: "23:00", ist: "23:30" },
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
  { href: "#why-gold-fell", label: "Why gold fell" },
  { href: "#support-resistance", label: "Support and resistance levels" },
  { href: "#gold-in-eur-gbp", label: "Gold price in euros and pounds" },
  { href: "#economic-calendar", label: "Economic calendar (GMT, CET, PKT)" },
  { href: "#time-by-country", label: "Release times by country" },
  { href: "#scenarios", label: "Bullish, bearish and range scenarios" },
  { href: "#risk-plan", label: "Risk plan for a volatile holiday week" },
  { href: "#faq", label: "FAQ" },
];

const continueLearning = [
  { href: "/xauusd-support-resistance/", title: "XAUUSD Support and Resistance", desc: "How to identify important gold support and resistance zones for clearer trade planning.", icon: <Layers className="w-7 h-7 text-trading-gold" />, accent: "from-trading-gold/10 to-transparent" },
  { href: "/blog/xauusd-weekly-forecast-november-16-20-2026/", title: "Previous Weekly Forecast (Nov 16–20)", desc: "Last week's forecast covering the one-year low, the Fed minutes and key support levels.", icon: <LineChart className="w-7 h-7 text-trading-gold" />, accent: "from-trading-gold/10 to-transparent" },
  { href: "/blog/xauusd-fundamental-analysis/", title: "XAUUSD Fundamental Analysis", desc: "How the Fed, real yields and the dollar drive gold prices over time.", icon: <Activity className="w-7 h-7 text-trading-green" />, accent: "from-trading-green/10 to-transparent" },
  { href: "/tools/xauusd-margin-calculator/", title: "XAUUSD Margin & Leverage Calculator", desc: "Check required margin and free margin at your leverage before trading volatile gold.", icon: <Coins className="w-7 h-7 text-trading-green" />, accent: "from-trading-green/10 to-transparent" },
];

export default function WeeklyForecastNov23Nov27Page() {
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
              <span className="text-foreground/80">XAUUSD Weekly Forecast Nov 23–27</span>
            </nav>
            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-gold">
                <Calendar className="w-4 h-4" />XAUUSD Weekly Forecast · Nov 23–27, 2026
              </span>
            </FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">XAUUSD Weekly Forecast Nov 23–27, 2026: Gold Near $3,500 Before US PCE</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground/80 mb-8">
              By the Forex Wizard Team · Published November 22, 2026 · Data through Friday&apos;s close (Nov 20) · 12 min read
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
              This article is educational market analysis, not financial advice or a trading signal. Prices are spot XAUUSD unless stated, and levels may differ by $10–$20 between brokers. Gold is moving unusually fast, so treat every level with extra caution.
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
                <strong>Gold (XAUUSD) closed Friday near $3,548, just above its low of $3,513, the lowest since September 2025. It fell about 8.6% last week, its worst week in roughly eight months, as hawkish Fed minutes, a strong dollar and a global stock rout drove heavy selling. For Nov 23–27, support is $3,520–$3,500, then $3,450–$3,475. Resistance is $3,575–$3,590 and $3,625–$3,650. US PCE inflation on Wednesday (13:30 GMT / 14:30 CET / 18:30 PKT) is the key event.</strong>
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
              This XAUUSD weekly forecast covers the November 23–27, 2026 trading week. Gold fell every day last week and lost more than 8%, as the Fed&apos;s October minutes confirmed that nearly all officials expect further rate hikes while the dollar rose for a fourth straight week. Gold did not act as a safe haven when stocks crashed. This week&apos;s gold price forecast centers on Wednesday&apos;s US PCE inflation report and second GDP estimate, in a short US holiday week with thin liquidity on Thursday and Friday. UK and European readers will also find the flash PMIs, the ECB minutes and gold priced in euros and pounds below.
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
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Price:</strong> Spot gold closed Friday near $3,548 after a range of roughly $3,517–$3,627. The low of about $3,513 was the lowest since September 2025.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Performance:</strong> Gold fell about 8.6% last week from $3,881 and finished lower every day. It is down more than 8% in November, about 18% in 2026 and more than a third below its January record near $5,595.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Fed:</strong> Rates are at 3.75%–4.00%. The October minutes showed nearly all officials judged further rate hikes likely appropriate, and a couple were open to a move larger than 25 bp if inflation data disappoint. Markets see a 25 bp hike on December 9 as near-certain (roughly 96–98%), with about an 8% chance of 50 bp.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Stocks and volatility:</strong> The S&amp;P 500 and Dow entered correction territory, the Nasdaq erased its 2026 gain, and the VIX closed near 36, its highest since March. Treasury yields fell on Friday as investors bought bonds, but gold did not benefit.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Dollar:</strong> The US dollar index is near 103.85, close to its highest in 19 months, after a fourth straight weekly gain.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Currencies and gold in EUR/GBP:</strong> EUR/USD is near 1.0990 and GBP/USD near 1.3080, a one-year low. Gold was about €3,228 and £2,713 per ounce.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Key levels:</strong> Support is $3,520–$3,500, then $3,450–$3,475 and about $3,400. Resistance is $3,575–$3,590, $3,625–$3,650 and $3,685–$3,725.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">This week&apos;s events:</strong> Flash PMIs (Mon), US PCE, GDP and jobless claims (Wed, 13:30 GMT), US Thanksgiving (Thu, US markets closed) and an early US close (Fri).</span></li>
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
                  <Link href="/blog/xauusd-weekly-forecast-november-16-20-2026/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">Nov 16–20 weekly forecast</Link>{" "}
                  named a bearish scenario in which hawkish FOMC minutes, firm US data and a strong dollar would push gold below its one-year low of $3,852 and open the way to $3,800 and then $3,700.
                </p>
                <p>
                  That scenario played out, and the move went further than our lowest listed level. Gold broke $3,852 and $3,800 on Wednesday after the minutes, fell below $3,700 on Thursday for the first time since September 2025, and reached about $3,513 on Friday. We did not list levels below $3,700, so last week&apos;s selloff was larger than our framework allowed for. Levels are reference zones, not guarantees, and markets do not always follow a plan this closely.
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
                <span className="text-foreground">What Happened to Gold Last Week (Nov 16–20)?</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground/90">Monday and Tuesday:</strong> Gold started the week near $3,881 and slipped about 0.6% on Monday and 0.2% on Tuesday, closing near $3,850 as the market waited for US retail sales and the Fed minutes. US retail sales rose 0.2% in October, in line with forecasts.
                </p>
                <p>
                  <strong className="text-foreground/90">Wednesday, Nov 18:</strong> The Fed&apos;s minutes showed that almost all officials judged further rate increases likely appropriate to bring inflation back to 2%, and a couple were open to more than 25 bp if inflation data disappointed. Gold fell about 3.3% to near $3,724 and broke below $3,852 and $3,800.
                </p>
                <p>
                  <strong className="text-foreground/90">Thursday, Nov 19:</strong> Gold dropped another 2.7% to near $3,623 and traded below $3,700 for the first time since September 2025. The euro hit a 19-month low near 1.0950 and sterling fell to new lows for the year.
                </p>
                <p>
                  <strong className="text-foreground/90">Friday, Nov 20:</strong> A global stock rout intensified. The S&amp;P 500 and Dow entered correction territory, the Nasdaq erased its 2026 gain, and the VIX closed near 36. Nvidia fell about 14% after a report that US regulators were examining its accounting. Treasury yields fell sharply, with the 10-year yield dropping to about 4.92%. Gold still fell about 2.1% to close near $3,548 after touching about $3,513. For the earlier part of this move, see our{" "}
                  <Link href="/blog/xauusd-weekly-forecast-november-9-13-2026/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">Nov 9–13 weekly forecast</Link>{" "}
                  and our{" "}
                  <Link href="/blog/xauusd-weekly-forecast-november-2-6-2026/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">Nov 2–6 weekly forecast</Link>.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* WHY GOLD FELL */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 id="why-gold-fell" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Why Is Gold Falling? The Main Drivers</span>
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">1. The Fed minutes confirmed more hikes</h3>
                  <p>The minutes showed broad agreement that more rate rises are likely needed, and Fed Governor Christopher Waller had already said on November 10 that a 50 bp hike in December should be considered. Governor Lisa Cook also urged prompt increases. A 25 bp hike on December 9 is now almost fully priced. Higher expected rates raise the opportunity cost of holding gold, which pays no interest.</p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">2. The dollar kept climbing</h3>
                  <p>The dollar index is near 103.85, close to its highest level in about 19 months, and rose for a fourth straight week. A stronger dollar makes gold more expensive for buyers using other currencies.</p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">3. A stock rout led to forced selling</h3>
                  <p>When markets crash quickly, investors often sell assets that have been liquid and profitable to cover losses or margin calls, and gold can fall along with stocks. That is what happened last week. Yields fell and the VIX surged on Friday, but gold still dropped. This kind of selling can overshoot and then reverse sharply, but it does not by itself confirm a bottom.</p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">4. Technical breakdown below $3,800</h3>
                  <p>Once gold broke $3,800, analysts pointed to $3,500 as the next focus, and gold came within about 0.4% of that level on Friday. Round-number levels and stop orders can speed up a fall once they break.</p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">5. Oil and US–Iran headlines</h3>
                  <p>Concerns about US–Iran relations remain a source of oil and inflation risk. Higher energy prices add to the case for a more hawkish Fed. Read our guide to{" "}
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
              <span className="text-trading-gold text-glow-gold">Nov 23–27</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              Levels come from recent price action and may differ by $10–$20 between brokers. Treat them as zones, not exact lines. Gold is trading at its lowest level in 14 months, so there is little recent chart history below the current price, and the lower levels are mostly round numbers and analyst targets. For how to mark these zones yourself, see our guide to{" "}
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
                <strong className="text-foreground/90">Technical read:</strong> Gold is in a steep downtrend, having broken $3,852, $3,800 and $3,700 in three sessions, and it trades below its key short-term averages. On the 1-hour chart the RSI fell below 20, which is deeply oversold. That raises the chance of a sharp relief bounce, but oversold markets can stay oversold. The first sign of stabilization would be a hold above $3,513 followed by a recovery of $3,575–$3,590. A close above $3,725 would suggest a larger bounce.
              </p>
              <p>
                <strong className="text-foreground/90">Weekend gap risk:</strong> News over the weekend on the Fed, AI stocks or the Middle East can cause a gap at the Sunday market open. Check spreads and prices before placing any order in the first hour of the week.
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
                Gold is priced in US dollars, so its price in euros and pounds depends on XAUUSD and the exchange rate. At Friday&apos;s rates (EUR/USD near 1.0990 and GBP/USD near 1.3080), gold was worth about €3,228 and £2,713 per ounce. These are calculated figures, not broker quotes.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                Gold fell about 8.2% in euros and about 7.7% in pounds last week, slightly less than the roughly 8.6% fall in dollars, because both currencies also weakened. The euro touched a 19-month low near 1.0950 on Wednesday, and GBP/USD fell about 1% on the week to a one-year low near 1.3075 on Friday.
              </p>
              <div className="hidden md:block glass rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-white/10">
                    <th className="text-left p-4 font-bold text-foreground">XAUUSD level</th>
                    <th className="text-left p-4 font-bold text-foreground">In euros (EUR/USD 1.0990)</th>
                    <th className="text-left p-4 font-bold text-foreground">In pounds (GBP/USD 1.3080)</th>
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
                The euro and pound values shift whenever EUR/USD or GBP/USD move, so recalculate before you trade. European traders should also watch Monday&apos;s flash PMIs and Thursday&apos;s ECB minutes, which can move the currency side of the calculation.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ECONOMIC CALENDAR */}
        <FadeSection className="py-12 md:py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 id="economic-calendar" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
              <span className="text-foreground">Economic Calendar This Week: </span>
              <span className="text-trading-gold text-glow-gold">Nov 23–27, 2026 (ET, GMT, CET and PKT)</span>
            </h2>
            <p className="text-sm text-muted-foreground/80 mb-6 leading-relaxed">
              <strong className="text-foreground/90">Time zones this week:</strong> There are no clock changes. New York is on EST, the UK is on GMT and Central Europe is on CET. New York is 5 hours behind London, 6 hours behind Central Europe and 10 hours behind Pakistan. So 8:30 AM ET = 13:30 GMT = 14:30 CET = 18:30 PKT. <strong className="text-foreground/90">US Thanksgiving is on Thursday, so US stock and bond markets are closed on November 26 and close early on Friday, November 27. Liquidity will be thin.</strong>
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
                      <tr key={i} className={`border-b border-white/5 last:border-0 ${(row.event.includes("US PCE") || row.event.includes("flash PMI") || row.event.includes("Beige Book")) ? "bg-trading-gold/5" : ""}`}>
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
                <div key={i} className={`glass-strong rounded-2xl p-5 gradient-border ${(row.event.includes("US PCE") || row.event.includes("flash PMI") || row.event.includes("Beige Book")) ? "border-l-4 border-l-trading-gold/50" : ""}`}>
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
                Use this table for US PCE, GDP and jobless claims (Wednesday, 8:30 AM New York time) and the Fed Beige Book (Wednesday, 2:00 PM New York time).
              </p>
              <div className="hidden md:block glass-strong rounded-2xl overflow-hidden gradient-border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[700px]">
                    <thead><tr className="border-b border-white/10">
                      <th className="text-left p-4 font-bold text-foreground">City / region</th>
                      <th className="text-left p-4 font-bold text-foreground whitespace-nowrap">Time zone</th>
                      <th className="text-left p-4 font-bold text-foreground whitespace-nowrap">Local time of the 8:30 AM ET release</th>
                      <th className="text-left p-4 font-bold text-foreground whitespace-nowrap">Local time of the 2:00 PM ET release (Beige Book)</th>
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
                      <div><span className="text-muted-foreground/70 block">2:00 PM ET (Beige Book)</span><span className="text-trading-gold font-bold">{row.t200}</span></div>
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
                <strong className="text-foreground/90">US PCE inflation (Wed, 13:30 GMT / 14:30 CET / 18:30 PKT).</strong> This is the key event. October PCE is the last major inflation reading before the Fed&apos;s December 8–9 meeting. Forecasts point to core PCE of about 0.3% month-on-month and about 3.2% year-on-year, against 3.1% in September. A reading above forecasts would reinforce hike bets and could push gold toward $3,500 and below. A softer reading could ease the pressure. The second estimate of Q3 GDP, expected near 3.5%, and durable goods arrive at the same time.
              </p>
              <p>
                <strong className="text-foreground/90">Flash PMIs (Mon).</strong> The Eurozone, UK and US flash PMIs give the first look at November business activity. Strong readings would support the Fed&apos;s hawkish stance. Weak readings, especially in Europe, could weigh on the euro and pound.
              </p>
              <p>
                <strong className="text-foreground/90">Fed speakers.</strong> The New York Fed&apos;s Williams speaks on Monday evening. After last week&apos;s minutes, any comment on the size of the December hike can move yields, the dollar and gold.
              </p>
              <p>
                <strong className="text-foreground/90">Thanksgiving liquidity (Thu–Fri).</strong> With US markets closed on Thursday and closing early on Friday, trading volumes fall and price moves can be erratic or exaggerated.
              </p>
              <p>
                <strong className="text-foreground/90">ECB minutes and European events (Thu).</strong> The ECB minutes and the BoE&apos;s Financial Stability Report arrive on Thursday, and EU leaders meet for a special European Council on November 26–27. These can move the euro and pound, which affects gold priced in those currencies.
              </p>
              <p>
                <strong className="text-foreground/90">Just beyond this week:</strong> The November jobs report is due on December 4, the Fed decision on December 9 and November CPI on December 10.
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
                  <h3 className="text-xl md:text-2xl font-extrabold text-trading-green">Bullish scenario: an oversold relief bounce</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground/90">Conditions:</strong> PCE comes in below forecasts, Q3 GDP is revised down, the dollar eases from its 19-month high, stocks stabilize and Fed speakers sound less urgent about a larger hike.</p>
                  <p><strong className="text-foreground/90">What to watch:</strong> A hold above $3,513 followed by a reclaim of $3,575–$3,590 would be the first sign of a bounce. The next tests are $3,625–$3,650, then $3,685–$3,725. A close above $3,725 would put $3,800 in play.</p>
                  <p><strong className="text-foreground/90">Reality check:</strong> Bounces have failed repeatedly in recent weeks. Friday&apos;s rebound reached only about $3,627, so rallies may meet sellers at $3,625–$3,725.</p>
                </div>
              </div>
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-gold/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-trading-gold/10 flex items-center justify-center"><TrendingDown className="w-6 h-6 text-trading-gold" /></div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-trading-gold">Bearish scenario: the selloff extends</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground/90">Conditions:</strong> PCE or GDP comes in above forecasts, Fed speakers back a larger December hike, the dollar index holds above 103.8 and further stock-market selling forces more liquidation.</p>
                  <p><strong className="text-foreground/90">What to watch:</strong> A break and close below $3,513–$3,500 would open $3,450–$3,475, then about $3,400.</p>
                  <p><strong className="text-foreground/90">Weakens this scenario:</strong> A quick recovery above $3,650.</p>
                </div>
              </div>
              <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-muted-foreground/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-muted-foreground/10 flex items-center justify-center"><Minus className="w-6 h-6 text-muted-foreground" /></div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-foreground">Range scenario: a thin holiday week</h3>
                </div>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground/90">Conditions:</strong> Mixed data and quiet US trading around Thanksgiving.</p>
                  <p><strong className="text-foreground/90">What to watch:</strong> Price rotating between roughly $3,500 and $3,650, with sharp spikes around PCE and the flash PMIs that fade.</p>
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
                <span className="text-trading-gold text-glow-gold">Volatile Holiday Week</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
                Gold fell more than 2% a day for three sessions in a row last week, and Friday&apos;s range was roughly $110. Risk control matters more than usual.
              </p>
              <ul className="space-y-3 text-base md:text-lg text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Expect wide spreads and fast moves</strong> around the flash PMIs (09:00 GMT for the Eurozone, 14:45 GMT for the US) and PCE (13:30 GMT).</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Avoid trading the first minutes after a release</strong> unless you have a clear plan. Let the first reaction settle.</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Size positions for the stop-loss distance.</strong> Bigger volatility means a smaller lot size. Use our <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">XAUUSD lot size calculator</Link> and read our guide to <Link href="/blog/forex-risk-management-for-beginners/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">forex risk management for beginners</Link>.</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Check your margin.</strong> Large daily swings with high leverage can trigger margin calls quickly. See your free margin with the <Link href="/tools/xauusd-margin-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">XAUUSD Margin &amp; Leverage Calculator</Link>.</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Respect thin liquidity.</strong> US markets are closed on Thursday and close early on Friday, so spreads can widen and moves can be erratic.</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Know your sessions.</strong> Read <Link href="/blog/xauusd-volatility-trading-sessions/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">why XAUUSD volatility changes by trading session</Link> and our <Link href="/blog/best-time-to-trade-forex/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">best time to trade forex</Link> guide.</span></li>
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
                <span className="text-trading-gold text-glow-gold">XAUUSD Forecast Nov 23–27, 2026</span>
              </h2>
            </div>
            <div className="space-y-4">
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">What is the XAUUSD forecast for November 23–27, 2026?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">Gold closed last week near $3,548, just above its low of $3,513, the lowest since September 2025. Support is $3,520–$3,500, then $3,450–$3,475. Resistance is $3,575–$3,590 and $3,625–$3,650. US PCE inflation on Wednesday is the key event. This is educational analysis, not a prediction.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">What time is US PCE in the UK, Europe, UAE, India and Pakistan?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">October PCE inflation is released on Wednesday, November 25 at 8:30 AM ET. That is 13:30 GMT in the UK, 14:30 CET in Europe, 17:30 in the UAE, 18:30 PKT in Pakistan and 19:00 IST in India. The second estimate of Q3 GDP and weekly jobless claims are released at the same time.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">Why did gold fall so much last week?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">Gold fell about 8.6% as the Fed&apos;s minutes showed nearly all officials expect more rate hikes, the dollar rose for a fourth straight week and a global stock rout forced investors to sell assets to raise cash. Gold broke key levels at $3,852, $3,800 and $3,700 and touched about $3,513 on Friday.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">What is the gold price in euros and pounds this week?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">At Friday&apos;s rates, gold was worth about €3,228 per ounce (EUR/USD near 1.0990) and about £2,713 per ounce (GBP/USD near 1.3080). These figures are calculated from XAUUSD and move with both gold and the exchange rates.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">Is the US market open on Thanksgiving, and does gold trade?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">US stock and bond markets are closed on Thursday, November 26 and close early on Friday, November 27, at 1:00 PM ET for stocks. Gold still trades in global markets, but liquidity is thin and prices can move erratically.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">Why did gold fall when stocks crashed? Isn&apos;t it a safe haven?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">Gold often rises in crises, but not always. In a fast stock rout, investors sell assets that are liquid and profitable to cover losses or margin calls, and a strong dollar and high interest rates add pressure. Last week gold fell alongside stocks, even as Treasury yields dropped.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">Will gold go up or down after PCE?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">It depends on the data. A hotter-than-expected PCE could strengthen December hike bets and push gold toward $3,500 and lower. A softer reading could ease the pressure and support a relief bounce toward $3,575–$3,650. Gold is very volatile, so expect sharp moves in both directions.</p></div>
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
                Gold enters the week at its lowest level since September 2025, after the sharpest weekly drop in eight months. A hawkish Fed, a strong dollar and forced selling have overwhelmed its usual safe-haven appeal, and Wednesday&apos;s PCE report is the next big test before the December 9 Fed decision. Respect the key levels, plan around the calendar in your local time (GMT, CET or PKT), keep position sizes small, and let price confirm a scenario before acting.
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
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.federalreserve.gov/newsevents/pressreleases/monetary20261028a.htm" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">Federal Reserve FOMC statement, Oct 28, 2026</a> and the October meeting minutes (Nov 18, 2026)</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.bea.gov/data/gdp/gross-domestic-product" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">U.S. Bureau of Economic Analysis</a> release schedule</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>Reuters, CNBC, Kitco and Investing.com spot data; CME FedWatch (as reported by Reuters); FXStreet and Yahoo Finance currency data; public economic calendars. Euro and pound gold prices are calculated from XAUUSD and the EUR/USD and GBP/USD rates near Friday&apos;s close. All figures as of November 20–22, 2026.</span></li>
              </ul>
            </div>
          </div>
        </FadeSection>

        {/* TELEGRAM CTA */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-gold/5 via-transparent to-trading-green/5 rounded-3xl blur-sm" />
            <div className="relative glass-strong rounded-3xl p-6 md:p-10 text-center gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6"><span className="text-foreground">Follow XAU/USD on </span><span className="text-trading-green text-glow-green">Telegram</span></h2>
              <p className="text-sm md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto">Join the Forex Wizard Telegram community for educational XAU/USD market structure, key levels and trading-related education.</p>
              <PulsingGlow className="inline-block rounded-xl"><TelegramCTA text="Join Forex Wizard Telegram" variant="primary" className="text-lg md:text-xl px-10 py-5" /></PulsingGlow>
              <p className="mt-6 text-xs text-muted-foreground/80">Free to join &middot; Trading involves risk &middot; Not financial advice</p>
            </div>
          </div>
        </FadeSection>

        {/* CONTINUE LEARNING */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3"><span className="text-foreground">Continue </span><span className="text-trading-gold text-glow-gold">Learning</span></h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">Explore related ForexWizard guides and tools to deepen your gold trading knowledge.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {continueLearning.map((item, i) => (
                <FadeIn key={item.href} delay={i * 0.07}>
                  <Link href={item.href} className="block h-full no-underline">
                    <div className="glass-strong rounded-2xl p-5 md:p-6 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-250 h-full">
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
