import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  BarChart3,
  AlertTriangle,
  ArrowRight,
  MessageCircle,
  Target,
  Crosshair,
  Layers,
  Activity,
  BookOpen,
  LineChart,
  ArrowDownRight,
  ArrowUpRight,
  Globe,
  Zap,
  TrendingDown,
  Eye,
  AlertOctagon,
  ShieldCheck,
  Clock,
  Gauge,
  RotateCcw,
} from "lucide-react";
import {
  FadeSection,
  FadeIn,
  HeroAnimation,
  StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";

export const metadata: Metadata = {
  title: "XAUUSD Support and Resistance | How to Identify Key Levels",
  description:
    "Learn how to identify XAUUSD support and resistance using swing points, price reactions, psychological levels, multiple timeframes and price action.",
  alternates: {
    canonical: "https://forexwizard.online/xauusd-support-resistance/",
  },
  openGraph: {
    title: "XAUUSD Support and Resistance | How to Identify Key Levels",
    description:
      "Learn how traders analyze support and resistance on XAUUSD using market structure, price reactions, key levels and multiple timeframes.",
    type: "article",
    url: "https://forexwizard.online/xauusd-support-resistance/",
    siteName: "ForexWizzz",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ForexWizzz - Free Forex & Gold Trading Telegram Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XAUUSD Support and Resistance | How to Identify Key Levels",
    description:
      "Learn how traders analyze support and resistance on XAUUSD using market structure, price reactions, key levels and multiple timeframes.",
    images: ["/og-image.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

/* ------------------------------------------------------------------ */
/*  CTA BUTTON                                                        */
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

const findSteps = [
  {
    step: 1,
    title: "Start with a Higher Timeframe",
    desc: "Open your XAUUSD chart on a higher timeframe, such as the daily or 4-hour chart. Higher timeframes filter out short-term noise and show the most significant price levels. A level that is visible on the daily chart has been tested by the market over a longer period and tends to carry more weight than a level that only appears on a 15-minute chart. This first step establishes the playing field before you zoom in for detail.",
  },
  {
    step: 2,
    title: "Find Significant Swing Highs and Swing Lows",
    desc: "Look across the visible chart history and identify the most prominent peaks and valleys. A significant swing high is a price point where gold rallied and then reversed. A significant swing low is where it declined and then bounced. Not every minor peak or trough matters. Focus on the swings that stand out: the ones where price clearly turned with momentum. These are the areas where buyers or sellers demonstrated meaningful conviction.",
  },
  {
    step: 3,
    title: "Look for Areas Where Price Reacted Multiple Times",
    desc: 