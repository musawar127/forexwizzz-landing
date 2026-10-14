import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, MessageCircle, Calendar, AlertTriangle, BookOpen,
  TrendingDown, TrendingUp, CheckCircle2, Target,
} from "lucide-react";
import {
  FadeSection, FadeIn, HeroAnimation, PulsingGlow, StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";
import { getBlogPost } from "@/data/blog-posts";

const post = getBlogPost("us-cpi-october-14-2026-gold-xauusd")!;

const CANONICAL = `https://forexwizard.online/blog/${post.slug}/`;
const IMAGE_URL = `https://forexwizard.online${post.image}`;
const IMAGE_BASE = post.image.replace(/\.jpg$/, "");
const HERO_WEBP_SRCSET = `${IMAGE_BASE}-640.webp 640w, ${IMAGE_BASE}-960.webp 960w, ${IMAGE_BASE}-1200.webp 1200w`;
const HERO_SIZES = "(max-width: 768px) 100vw, 768px";
const TELEGRAM_LINK = "https://t.me/ForexWizzz";

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  authors: [{ name: post.author.name, url: post.author.url }],
  creator: "Forex Wizard",
  publisher: "Forex Wizard",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: post.title,
    description: post.description,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.modifiedAt,
    authors: [post.author.name],
    url: CANONICAL,
    siteName: "Forex Wizard",
    images: [{ url: post.image, width: 1200, height: 630, alt: post.imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.description,
    images: [post.image],
  },
};

const blogPostingStructuredData = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  image: [IMAGE_URL],
  datePublished: post.publishedAt,
  dateModified: post.modifiedAt,
  mainEntityOfPage: CANONICAL,
  author: { "@type": "Organization", name: post.author.name, url: post.author.url },
  publisher: {
    "@type": "Organization",
    name: "Forex Wizard",
    url: "https://forexwizard.online/",
    logo: { "@type": "ImageObject", url: "https://forexwizard.online/apple-touch-icon.png" },
  },
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://forexwizard.online/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://forexwizard.online/blog/" },
    { "@type": "ListItem", position: 3, name: "US CPI October 14, 2026 Gold XAUUSD", item: CANONICAL },
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

const cpiTable = [
  { indicator: "Headline CPI YoY", actual: "3.7%", forecast: "3.6%", previous: "3.4%", beat: true },
  { indicator: "Headline CPI MoM", actual: "0.6%", forecast: "0.6%", previous: "0.4%", beat: false },
  { indicator: "Core CPI YoY", actual: "2.6%", forecast: "2.5%", previous: "2.4%", beat: true },
  { indicator: "Core CPI MoM", actual: "0.3%", forecast: "0.2%", previous: "0.3%", beat: true },
];

const faqs = [
  { q: "What was the US CPI result on October 14, 2026?", a: "The BLS released September 2026 CPI data on October 14, 2026. Headline CPI rose 3.7% year-over-year, above the 3.6% consensus forecast. Core CPI was 2.6% YoY, also above the 2.5% forecast. Monthly headline CPI increased 0.6% and core CPI increased 0.3%." },
  { q: "Was US CPI higher than expected?", a: "Yes. Both headline CPI (3.7% vs 3.6% forecast) and core CPI (2.6% vs 2.5% forecast) came in above market expectations. The headline monthly increase of 0.6% was the same as forecast but above the previous month's 0.4%." },
  { q: "Why did gold fall after CPI?", a: "Hotter-than-expected inflation increased expectations of tighter Federal Reserve policy, which pushed Treasury yields higher and strengthened the US dollar. Higher yields increase the opportunity cost of holding non-yielding gold, and a stronger dollar makes gold more expensive for non-dollar buyers. Reuters reported spot gold fell approximately 1.7% to around $4,086 by 9:03 AM EDT." },
  { q: "Does higher inflation always push gold lower?", a: "No. The relationship is not mechanical. Inflation can support gold as a long-term store of value and hedge against currency debasement. However, when hotter inflation raises expectations of tighter monetary policy (higher rates), the resulting increase in real yields can reduce gold's attractiveness. The net effect depends on which force dominates." },
  { q: "What is the difference between headline CPI and core CPI?", a: "Headline CPI includes all items in the consumer price index, including volatile food and energy components. Core CPI excludes food and energy. The Federal Reserve typically focuses more on core CPI because it better reflects underlying inflation trends, but both measures matter for policy decisions." },
  { q: "How does the US dollar affect XAUUSD?", a: "Gold is priced in US dollars. When the dollar strengthens, gold becomes more expensive for buyers holding other currencies, which can reduce demand. A stronger dollar also reflects higher US real yields, which increase the opportunity cost of holding gold. However, gold and the dollar can occasionally strengthen simultaneously during risk-off episodes." },
];

export default function UsCpiOct142026Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />

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
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-trading-red/5 rounded-full blur-[120px] pointer-events-none" />
          <CandlestickBackground />
          <HeroAnimation className="relative z-10 max-w-3xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground/80 mb-6 flex-wrap">
              <Link href="/" className="hover:text-trading-green transition-colors no-underline">Home</Link>
              <span className="text-muted-foreground/40">/</span>
              <Link href="/blog/" className="hover:text-trading-green transition-colors no-underline">Blog</Link>
              <span className="text-muted-foreground/40">/</span>
              <span className="text-foreground/80">US CPI Oct 14 — Gold Reaction</span>
            </nav>
            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-red">
                <Calendar className="w-4 h-4" />
                US Inflation · XAUUSD Analysis · Oct 14, 2026
              </span>
            </FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">US CPI October 14, 2026: Why Gold (XAUUSD) Fell</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground/80 mb-8">
              Published {post.displayDate} · By{" "}
              <Link href="/about/" className="text-foreground/80 hover:text-trading-green no-underline">{post.author.name}</Link>{" "}
              · {post.readingTime}
            </p>
            <FadeIn delay={0.3} className="mb-8">
              <div className="glass-strong rounded-2xl overflow-hidden gradient-border">
                <picture>
                  <source type="image/webp" srcSet={HERO_WEBP_SRCSET} sizes={HERO_SIZES} />
                  <img src={post.image} alt={post.imageAlt} width={1200} height={630} className="w-full h-auto block" loading="eager" fetchPriority="high" />
                </picture>
              </div>
            </FadeIn>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The US Bureau of Labor Statistics released September 2026 CPI data on October 14, 2026 at 8:30 AM Eastern. Headline CPI rose{" "}
                <strong className="text-foreground/90">3.7% year-over-year</strong>, exceeding the 3.6% consensus forecast.
                Core CPI also surprised to the upside at <strong className="text-foreground/90">2.6% YoY</strong> versus 2.5% expected.
              </p>
              <p>
                Gold declined immediately after the release. Reuters reported spot gold at approximately{" "}
                <strong className="text-foreground/90">$4,086.06</strong> per ounce by 9:03 AM EDT — a decline of roughly{" "}
                <strong className="text-foreground/90">1.7%</strong>. The US dollar index strengthened approximately 0.4% and Treasury yields increased.
              </p>
              <p className="text-foreground/90 font-medium">
                These are intraday observations, not official end-of-day closing prices. Every market figure below is sourced and time-stamped.
              </p>
            </div>
          </HeroAnimation>
        </section>

        {/* CPI TABLE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">US CPI October 14, 2026: </span>
              <span className="text-trading-gold text-glow-gold">Actual vs Forecast</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              The table below shows September 2026 CPI data released on October 14, 2026. Actual figures are from the{" "}
              <a href="https://www.bls.gov/news.release/archives/cpi_10142026.htm" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">US Bureau of Labor Statistics</a>.
              Forecast figures are from market consensus surveys compiled before the release.
            </p>
            <div className="glass-strong rounded-2xl overflow-hidden gradient-border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 font-bold text-foreground">Indicator</th>
                      <th className="text-center p-4 font-bold text-foreground">Actual</th>
                      <th className="text-center p-4 font-bold text-muted-foreground">Forecast</th>
                      <th className="text-center p-4 font-bold text-muted-foreground">Previous</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cpiTable.map((row) => (
                      <tr key={row.indicator} className="border-b border-white/5 last:border-0">
                        <td className="p-4 text-foreground font-medium">{row.indicator}</td>
                        <td className="p-4 text-center">
                          <span className={`font-bold ${row.beat ? "text-trading-red" : "text-trading-gold"}`}>{row.actual}</span>
                        </td>
                        <td className="p-4 text-center text-muted-foreground">{row.forecast}</td>
                        <td className="p-4 text-center text-muted-foreground">{row.previous}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/70 mt-3">
              Source: Actual — BLS September 2026 CPI report. Forecast — pre-release market consensus surveys. Red indicates actual exceeded forecast.
            </p>
          </div>
        </FadeSection>

        {/* WHAT CAUSED INFLATION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">What Caused Inflation to </span>
                <span className="text-trading-gold text-glow-gold">Accelerate?</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  According to the BLS, the September 2026 monthly headline CPI increase of 0.6% was driven primarily by energy costs, but shelter and core services also contributed:
                </p>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-2"><TrendingUp className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Gasoline</strong> prices increased <strong className="text-trading-red">9.1% month-over-month</strong> — the largest single contributor to the monthly headline increase.</span></li>
                  <li className="flex items-start gap-2"><TrendingUp className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Energy</strong> overall increased <strong className="text-trading-red">5.2%</strong> over the month, reflecting higher crude oil prices and seasonal factors.</span></li>
                  <li className="flex items-start gap-2"><TrendingUp className="w-5 h-5 text-trading-gold shrink-0 mt-1" /><span><strong className="text-foreground/90">Shelter</strong> increased <strong className="text-trading-gold">0.4%</strong> over the month, continuing its persistent upward trend as a core inflation driver.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Core CPI</strong> (excluding food and energy) rose <strong className="text-trading-gold">0.3% monthly</strong> and <strong className="text-trading-gold">2.6% annually</strong>, confirming that inflation pressure extends beyond volatile energy components.</span></li>
                </ul>
                <p>
                  It would be misleading to attribute the inflation acceleration to gasoline alone. Shelter costs remain a significant structural contributor, and the core CPI reading above expectations suggests underlying inflation is more persistent than the market had priced.
                </p>
                <p className="text-sm text-muted-foreground/80 border-l-2 border-trading-gold/40 pl-4">
                  Source: <a href="https://www.bls.gov/news.release/cpi.t01.htm" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">BLS CPI Detailed Table 1</a>.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* GOLD REACTION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How Gold (XAUUSD) Reacted to the </span>
                <span className="text-trading-gold text-glow-gold">CPI Report</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Gold declined sharply after the CPI release. According to{" "}
                  <a href="https://www.reuters.com/world/india/gold-prices-hold-firm-ahead-us-inflation-data-2026-10-14/" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">Reuters</a>,
                  the following intraday snapshot was observed at approximately <strong className="text-foreground/90">9:03 AM EDT on October 14, 2026</strong>:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">Spot Gold (XAU/USD)</p>
                    <p className="text-2xl font-bold text-trading-red">~$4,086.06/oz</p>
                    <p className="text-xs text-trading-red mt-1">↓ approximately 1.7%</p>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">US Dec Gold Futures</p>
                    <p className="text-2xl font-bold text-trading-red">~$4,108.60/oz</p>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">US Dollar Index (DXY)</p>
                    <p className="text-2xl font-bold text-trading-green">↑ approximately 0.4%</p>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">US Treasury Yields</p>
                    <p className="text-2xl font-bold text-trading-red">Increased</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground/80 border-l-2 border-trading-gold/40 pl-4">
                  These are intraday observations at approximately 9:03 AM EDT, not official end-of-day closing prices. Spot gold and futures prices are different instruments and should not be treated as interchangeable. Source: Reuters, October 14, 2026.
                </p>
                <p>
                  The initial market response was bearish for gold: hotter inflation raised expectations that the Federal Reserve may need to maintain a tighter policy stance, which pushed Treasury yields higher and the dollar stronger — both headwinds for non-yielding gold.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* WHY HOT CPI PUSHES GOLD LOWER */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Why a Hot CPI Reading Can </span>
                <span className="text-trading-gold text-glow-gold">Push Gold Lower</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>The mechanism is not as simple as "higher inflation = lower gold." The chain works through several steps:</p>
                <ol className="space-y-3 pl-2">
                  <li className="flex items-start gap-2"><span className="text-trading-gold font-bold shrink-0">1.</span><span><strong className="text-foreground/90">Hotter CPI</strong> increases market expectations of tighter Federal Reserve policy — meaning interest rates may stay higher for longer, or additional rate increases become more likely.</span></li>
                  <li className="flex items-start gap-2"><span className="text-trading-gold font-bold shrink-0">2.</span><span><strong className="text-foreground/90">Higher rate expectations</strong> push Treasury yields higher, as bond markets price in tighter monetary policy.</span></li>
                  <li className="flex items-start gap-2"><span className="text-trading-gold font-bold shrink-0">3.</span><span><strong className="text-foreground/90">Higher real yields</strong> (nominal yields minus inflation expectations) increase the opportunity cost of holding gold, which pays no income.</span></li>
                  <li className="flex items-start gap-2"><span className="text-trading-gold font-bold shrink-0">4.</span><span><strong className="text-foreground/90">A stronger US dollar</strong> makes gold more expensive for non-dollar buyers, potentially reducing demand.</span></li>
                </ol>
                <p>However, this is not an unavoidable causal chain. Competing forces exist:</p>
                <ul className="space-y-2 pl-2">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>Inflation can support gold as a long-term store of value and hedge against currency debasement.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>Safe-haven demand can outweigh yield pressure during risk-off episodes.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>Gold and the dollar can occasionally strengthen simultaneously.</span></li>
                </ul>
                <p>The net effect depends on which force dominates in the immediate aftermath of the data release. On October 14, the yield and dollar channels won.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* FED EXPECTATIONS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">What Happens to Federal Reserve </span>
                <span className="text-trading-gold text-glow-gold">Rate Expectations?</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The hotter-than-expected CPI report increased market expectations that the Federal Reserve may need to maintain a tighter policy stance. The Fed raised its target range to 3.75%–4.00% at the September 15–16 FOMC meeting.
                </p>
                <p>
                  Higher inflation data makes it more difficult for the Fed to justify pausing or cutting rates, because cutting rates prematurely could allow inflation to re-accelerate. However, the Fed has not announced a new rate increase as a result of this CPI report — the next FOMC decision is scheduled for October 27–28, 2026.
                </p>
                <p className="text-sm border-l-2 border-trading-gold/40 pl-4">
                  Market-implied rate probabilities (such as CME FedWatch) move continuously and reflect market expectations, not Federal Reserve decisions. They should not be treated as predictions of what the Fed will actually do.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* TECHNICAL OUTLOOK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Gold Technical Outlook </span>
              <span className="text-trading-gold text-glow-gold">After CPI</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="glass-strong rounded-2xl p-6 gradient-border border-l-4 border-l-trading-gold/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-trading-gold/10 flex items-center justify-center"><TrendingDown className="w-6 h-6 text-trading-gold" /></div>
                  <h3 className="text-lg font-bold text-trading-gold">Bearish Scenario</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Additional downside is possible if the dollar and Treasury yields continue strengthening while gold fails to recover important chart levels. The hotter CPI has shifted the short-term momentum against gold. Traders should watch whether the initial sell-off extends or finds support.
                </p>
                <p className="text-xs text-muted-foreground/70 mt-3">
                  For the key support and resistance zones identified before CPI, see the{" "}
                  <Link href="/blog/xauusd-weekly-forecast-october-12-16-2026/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">October 12–16 weekly forecast</Link>.
                </p>
              </div>
              <div className="glass-strong rounded-2xl p-6 gradient-border border-l-4 border-l-trading-green/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-trading-green/10 flex items-center justify-center"><TrendingUp className="w-6 h-6 text-trading-green" /></div>
                  <h3 className="text-lg font-bold text-trading-green">Bullish Scenario</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A recovery becomes more plausible if selling pressure fades, yields retreat from their CPI-induced spike, and gold reclaims technically significant levels. Gold has shown resilience after initial CPI sell-offs in the past. Safe-haven demand could return if broader risk sentiment deteriorates.
                </p>
                <p className="text-xs text-muted-foreground/70 mt-3">
                  These are conditional scenarios, not guaranteed outcomes. No specific price targets are published without a verifiable timestamped chart source.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* WHAT TO WATCH NEXT */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">What XAUUSD Traders Should </span>
                <span className="text-trading-gold text-glow-gold">Watch Next</span>
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span>Whether the initial CPI move continues or reverses — the first move after a data release is not always the final direction.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Treasury yield direction</strong> — if yields retreat from their post-CPI spike, some pressure on gold may ease.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Dollar-index strength</strong> — a sustained DXY breakout would add to gold headwinds.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Fed commentary</strong> — scheduled appearances by Fed officials could clarify whether the Committee views this CPI print as sufficient to change the policy trajectory.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Upcoming verified economic releases</strong> — see the{" "}<Link href="/blog/xauusd-weekly-forecast-october-12-16-2026/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">October 12–16 weekly forecast</Link>{" "}for the full calendar.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* MANAGING RISK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Managing Risk During </span>
                <span className="text-trading-gold text-glow-gold">CPI Volatility</span>
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>CPI releases can produce extreme short-term volatility. Key risk considerations:</p>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Wider spreads</strong> around important releases — brokers routinely widen spreads 3–5× during the first seconds after CPI.</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Slippage and execution risk</strong> — stop-loss orders may fill at worse prices than planned during the initial volatility spike.</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Position sizing</strong> — use the{" "}<Link href="/tools/forex-position-size-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Forex Position Size Calculator</Link>{" "}or the{" "}<Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">XAUUSD Lot Size Calculator</Link>{" "}to size positions before the release.</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Chasing the immediate candle</strong> can be risky — the first move after CPI often reverses before the true direction emerges.</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><span><strong className="text-foreground/90">Leverage matters</strong> — higher leverage amplifies both gains and losses. Use the{" "}<Link href="/tools/risk-reward-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Risk Reward Calculator</Link>{" "}to evaluate trade setups.</span></li>
                </ul>
                <p>For the broader risk-management framework, see our{" "}<Link href="/blog/forex-risk-management-for-beginners/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80">forex risk management for beginners guide</Link>.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* KEY TAKEAWAYS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Key </span>
                <span className="text-trading-gold text-glow-gold">Takeaways</span>
              </h2>
              <ol className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-trading-gold/20 flex items-center justify-center text-trading-gold font-bold text-sm shrink-0">1</span><span>September 2026 headline CPI was 3.7% YoY (above 3.6% forecast) and core CPI was 2.6% YoY (above 2.5% forecast) — both exceeded expectations.</span></li>
                <li className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-trading-gold/20 flex items-center justify-center text-trading-gold font-bold text-sm shrink-0">2</span><span>Gasoline (+9.1% MoM) and energy (+5.2% MoM) drove the monthly increase, but shelter (+0.4% MoM) and the above-expected core reading confirm broader inflation pressure.</span></li>
                <li className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-trading-gold/20 flex items-center justify-center text-trading-gold font-bold text-sm shrink-0">3</span><span>Gold fell approximately 1.7% to ~$4,086 by 9:03 AM EDT as Treasury yields rose and the dollar strengthened — the classic hot-CPI response for non-yielding gold.</span></li>
                <li className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-trading-gold/20 flex items-center justify-center text-trading-gold font-bold text-sm shrink-0">4</span><span>The Fed has not announced a new rate increase; the next FOMC decision is October 27–28. The CPI report increases the stakes for that meeting but does not determine its outcome.</span></li>
              </ol>
            </div>
          </div>
        </FadeSection>

        {/* FAQ */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">Frequently Asked </span>
                <span className="text-trading-gold text-glow-gold">Questions</span>
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map(faq => (
                <details key={faq.q} className="glass-strong rounded-2xl gradient-border group">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none">
                    <h3 className="text-base font-bold text-foreground pr-4">{faq.q}</h3>
                    <ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" />
                  </summary>
                  <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p></div>
                </details>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* RISK DISCLAIMER + SOURCES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="glass rounded-2xl border border-trading-red/20 p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-trading-red mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5" />Risk Disclaimer</h2>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>Trading forex, gold and CFDs involves significant risk and may not be suitable for everyone.</p>
                <p>This article is provided for educational and informational purposes only and should not be considered financial advice, investment advice or a recommendation to buy or sell any financial instrument.</p>
                <p>Market prices are intraday observations with explicit timestamps, not official closing prices. Always perform your own analysis and use appropriate risk management.</p>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-trading-gold" />Sources</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.bls.gov/news.release/archives/cpi_10142026.htm" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">BLS — September 2026 CPI Report (October 14, 2026)</a></span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.bls.gov/news.release/cpi.t01.htm" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">BLS — CPI Detailed Table 1</a></span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.reuters.com/world/india/gold-prices-hold-firm-ahead-us-inflation-data-2026-10-14/" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Reuters — Gold market report (October 14, 2026)</a></span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span><a href="https://www.reuters.com/world/asia-pacific/dollar-languishes-focus-turns-cpi-fed-speakers-2026-10-14/" target="_blank" rel="noopener noreferrer" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Reuters — Dollar market report (October 14, 2026)</a></span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-trading-green shrink-0 mt-1" /><span>For broader macro context: <Link href="/blog/xauusd-fundamental-analysis/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80">XAUUSD Fundamental Analysis Guide</Link></span></li>
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

        <SiteFooter />
      </main>
      <StickyTelegramButton href={TELEGRAM_LINK} label="Join Forex Wizard on Telegram" />
    </>
  );
}
