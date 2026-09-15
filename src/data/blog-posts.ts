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
}

export const blogPosts: BlogPost[] = [
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
