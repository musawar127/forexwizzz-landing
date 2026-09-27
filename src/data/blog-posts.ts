/**
 * Reusable blog post metadata.
 *
 * This is the single source of truth for blog article metadata on ForexWizard.
 * To add a future article:
 *   1. Create the article page at src/app/blog/<slug>/page.tsx (full JSX content).
 *   2. Add a matching metadata entry to the `blogPosts` array below.
 *
 * The blog index (src/app/blog/page.tsx) reads this array to render article
 * cards, and each article page imports its own entry to drive Next.js metadata
 * + BlogPosting structured data, so titles/dates/canonicals stay consistent.
 */

export interface BlogPostAuthor {
  name: string;
  url: string;
}

export interface BlogPost {
  /** URL segment after /blog/. Must match the article folder name. */
  slug: string;
  /** SEO title (used in <title>, OG, Twitter, BlogPosting headline). */
  title: string;
  /** Meta description (used in meta, OG, Twitter, BlogPosting description). */
  description: string;
  /** Short summary shown on the blog index card. */
  cardDescription: string;
  /** Human-friendly publication date, e.g. "September 13, 2026". */
  displayDate: string;
  /** ISO 8601 publication timestamp (used in OG publishedTime + BlogPosting). */
  publishedAt: string;
  /** ISO 8601 last-modified timestamp (used in OG modifiedTime + BlogPosting). */
  modifiedAt: string;
  /** Author details (visible + structured data). */
  author: BlogPostAuthor;
  /** Site-relative OG/hero image path, e.g. "/blog/....jpg". */
  image: string;
  /** Descriptive alt text for the hero/OG image. */
  imageAlt: string;
  /** Topic tags shown on the card (also useful for future filtering). */
  tags: string[];
  /** Approximate reading time label, e.g. "8 min read". */
  readingTime: string;
  /**
   * When true, this post is consolidated into another authoritative page and
   * should be hidden from the blog index/listing. The page itself stays live
   * (static export) but its canonical points to the authoritative URL.
   */
  hidden?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-follow-forex-signals",
    title: "How to Follow Forex Signals: Entry Timing & Risk Guide",
    description:
      "Learn how to follow forex signals correctly, including entry ranges, late entries, stop loss, take profit, signal updates and when to skip a trade.",
    cardDescription:
      "Learn when to enter, when to skip and how to manage entry ranges, late forex signals, Stop Loss, Take Profit and signal updates.",
    displayDate: "September 27, 2026",
    publishedAt: "2026-09-27T10:30:00+05:00",
    modifiedAt: "2026-09-27T10:30:00+05:00",
    author: {
      name: "ForexWizard Editorial Team",
      url: "https://forexwizard.online/about/",
    },
    image: "/blog/how-to-follow-forex-signals.jpg",
    imageAlt:
      "How to follow forex signals showing an entry range stop loss target and late-entry example",
    tags: ["Forex Signals", "Execution", "Risk Management", "Education"],
    readingTime: "11 min read",
  },
  {
    slug: "how-to-read-forex-signals",
    title: "How to Read Forex Signals: Entry, SL, TP & BE Explained",
    description:
      "Learn how to read forex signals step by step, including Buy/Sell, entry ranges, stop loss, TP1–TP4, break-even, late entries and common signal abbreviations.",
    cardDescription:
      "Learn how to read a forex signal step by step, including entry ranges, Stop Loss, TP1–TP4, break-even, late entries and common trading abbreviations.",
    displayDate: "September 27, 2026",
    publishedAt: "2026-09-27T10:00:00+05:00",
    modifiedAt: "2026-09-27T10:00:00+05:00",
    author: {
      name: "ForexWizard Editorial Team",
      url: "https://forexwizard.online/about/",
    },
    image: "/blog/how-to-read-forex-signals.jpg",
    imageAlt:
      "How to read forex signals showing entry stop loss take profit and break-even terminology",
    tags: ["Forex Signals", "Beginner", "Education", "Risk Management"],
    readingTime: "12 min read",
  },
  {
    slug: "xauusd-weekly-forecast-september-28-october-2-2026",
    title: "XAUUSD Weekly Forecast Sep 28–Oct 2: Gold Key Levels",
    description:
      "XAUUSD weekly forecast for Sep 28–Oct 2, 2026 with gold key levels, support and resistance, PCE, ISM and Nonfarm Payrolls scenarios.",
    cardDescription:
      "Gold enters a major US data week below $4,300. See XAUUSD support and resistance plus PCE, ISM and Nonfarm Payrolls scenarios.",
    displayDate: "September 27, 2026",
    publishedAt: "2026-09-27T09:00:00+05:00",
    modifiedAt: "2026-09-27T09:00:00+05:00",
    author: {
      name: "ForexWizard Editorial Team",
      url: "https://forexwizard.online/about/",
    },
    image: "/blog/xauusd-weekly-forecast-sep-28-oct-2-2026.jpg",
    imageAlt:
      "XAUUSD weekly forecast September 28 to October 2 2026 showing gold key support resistance and US economic events",
    tags: ["XAUUSD", "Gold", "Weekly Forecast", "Nonfarm Payrolls"],
    readingTime: "10 min read",
  },
  {
    slug: "xauusd-fundamental-analysis",
    title: "XAUUSD Fundamental Analysis: What Moves Gold Prices?",
    description:
      "Learn XAUUSD fundamental analysis and how Fed policy, Treasury yields, the US dollar, inflation, jobs data and risk sentiment can influence gold prices.",
    cardDescription:
      "A deep evergreen guide to the macroeconomic forces behind gold — Federal Reserve policy, real yields, the US dollar, inflation, jobs data, geopolitics and how to combine fundamentals with technical analysis.",
    displayDate: "September 22, 2026",
    publishedAt: "2026-09-22T09:00:00+05:00",
    modifiedAt: "2026-09-22T09:00:00+05:00",
    author: {
      name: "ForexWizard Editorial Team",
      url: "https://forexwizard.online/about/",
    },
    image: "/blog/xauusd-fundamental-analysis.jpg",
    imageAlt:
      "XAUUSD fundamental analysis showing Federal Reserve, US dollar and Treasury yield factors affecting gold",
    tags: ["XAUUSD", "Gold", "Fundamental Analysis", "Macroeconomics"],
    readingTime: "14 min read",
  },
  {
    slug: "xauusd-weekly-outlook-september-21-25-2026",
    title: "XAUUSD Weekly Outlook: Gold Trading Plan Sep 21–25",
    description:
      "XAUUSD weekly outlook for September 21–25, 2026. Key gold support and resistance levels, market structure, economic events and trading scenarios.",
    cardDescription:
      "Key gold support and resistance zones, post-Fed market structure, PMI, new home sales and durable goods, plus bullish and bearish scenarios for the September 21–25 trading week.",
    displayDate: "September 20, 2026",
    publishedAt: "2026-09-20T09:00:00+05:00",
    modifiedAt: "2026-09-20T09:00:00+05:00",
    author: {
      name: "ForexWizard Editorial Team",
      url: "https://forexwizard.online/about/",
    },
    image: "/blog/xauusd-weekly-outlook-sep-21-25-2026.jpg",
    imageAlt:
      "XAUUSD weekly outlook September 21–25 2026 showing key gold support and resistance levels",
    tags: ["XAUUSD", "Gold", "Weekly Outlook", "Federal Reserve"],
    readingTime: "9 min read",
  },
  {
    slug: "xauusd-volatility-trading-sessions",
    title: "Why XAUUSD Volatility Changes by Trading Session",
    description:
      "Learn why XAUUSD volatility changes across Asian, London and New York sessions, and how liquidity, overlap and US data shape gold price action.",
    cardDescription:
      "Gold does not behave the same way throughout the day. Learn how liquidity, market participation and economic events change XAUUSD volatility across major trading sessions.",
    displayDate: "September 18, 2026",
    publishedAt: "2026-09-18T09:00:00+05:00",
    modifiedAt: "2026-09-18T09:00:00+05:00",
    author: {
      name: "ForexWizard Editorial Team",
      url: "https://forexwizard.online/about/",
    },
    image: "/blog/xauusd-volatility-trading-sessions.jpg",
    imageAlt:
      "XAUUSD volatility across Asian, London and New York trading sessions",
    tags: ["XAUUSD", "Gold", "Trading Sessions", "Volatility"],
    readingTime: "11 min read",
  },
  {
    slug: "xauusd-support-and-resistance",
    title: "XAUUSD Support and Resistance: How to Mark Key Levels",
    description:
      "Learn how to identify XAUUSD support and resistance, mark key gold levels, avoid false breakouts, and use market structure for better trade planning.",
    cardDescription:
      "Learn how to identify important support and resistance zones on XAUUSD and combine them with market structure, breakouts and retests.",
    displayDate: "September 15, 2026",
    publishedAt: "2026-09-15T09:00:00+05:00",
    modifiedAt: "2026-09-15T09:00:00+05:00",
    author: {
      name: "ForexWizard Editorial Team",
      url: "https://forexwizard.online/about/",
    },
    image: "/blog/xauusd-support-and-resistance.jpg",
    imageAlt:
      "XAUUSD support and resistance educational chart showing key gold trading zones",
    tags: ["XAUUSD", "Gold", "Support & Resistance", "Technical Analysis"],
    readingTime: "9 min read",
    // Consolidated into the authoritative /xauusd-support-resistance/ page.
    // Hidden from the blog index; canonical on the page points to the primary URL.
    hidden: true,
  },
  {
    slug: "xauusd-weekly-outlook-september-14-18-2026",
    title: "XAUUSD Weekly Outlook: Gold Trading Plan Sep 14–18",
    description:
      "XAUUSD weekly outlook for Sep 14–18, 2026, covering key gold levels, the Fed decision, US retail sales, and bullish and bearish scenarios.",
    cardDescription:
      "Key gold support and resistance levels, the September 16 Federal Reserve decision, US retail sales, and bullish/bearish scenarios for the September 14–18 trading week.",
    displayDate: "September 13, 2026",
    publishedAt: "2026-09-13T09:00:00+05:00",
    modifiedAt: "2026-09-13T09:00:00+05:00",
    author: {
      name: "ForexWizard Editorial Team",
      url: "https://forexwizard.online/about/",
    },
    image: "/blog/xauusd-weekly-outlook-sep-14-18-2026.jpg",
    imageAlt:
      "XAUUSD weekly outlook September 14–18 2026 showing key gold support and resistance levels",
    tags: ["XAUUSD", "Gold", "Weekly Outlook", "Federal Reserve"],
    readingTime: "8 min read",
  },
];

/** Look up a single blog post by slug. */
export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/** All posts, newest first (array is already authored newest-first; kept explicit). */
export function getNewestBlogPosts(): BlogPost[] {
  return [...blogPosts];
}
