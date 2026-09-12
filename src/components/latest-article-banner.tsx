import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";

/**
 * Slim, contextual "latest article" banner.
 *
 * Renders a single, unobtrusive pill linking to the newest blog post.
 * Intended to be dropped just below a page hero on topically-relevant pages
 * (e.g. gold-signals, xauusd-analysis) so the latest weekly outlook is
 * discoverable without editing evergreen article prose.
 *
 * Server component — no client JS, no impact on Core Web Vitals.
 */
export function LatestArticleBanner() {
  const latest = blogPosts[0];
  if (!latest) return null;

  return (
    <div className="px-4 -mt-6 md:-mt-10 pb-2">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/blog/${latest.slug}/`}
          className="group glass-strong rounded-2xl gradient-border p-4 md:p-5 flex items-center gap-4 no-underline hover:scale-[1.01] transition-transform duration-300"
        >
          <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-trading-gold/15 to-trading-green/10 flex items-center justify-center">
            <Newspaper className="w-5 h-5 text-trading-gold" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-trading-green/80">
              Latest Analysis · {latest.displayDate}
            </p>
            <p className="text-sm md:text-base font-bold text-foreground leading-snug truncate">
              {latest.title}
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-trading-green shrink-0 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
