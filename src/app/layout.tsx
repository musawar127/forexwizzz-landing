import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ForexWizzz - Free Forex & Gold Trading Signals | Telegram Community",
  description:
    "Join ForexWizzz, a free Telegram trading community for daily Forex and Gold signals, XAUUSD analysis, market breakdowns, trading setups, and educational content. Learn and follow market discussions — 100% free to join.",
  keywords: [
    "forex signals",
    "gold signals",
    "XAUUSD",
    "XAUUSD analysis",
    "forex trading",
    "forex analysis",
    "gold trading",
    "gold price analysis",
    "forex education",
    "forex market analysis",
    "trading community",
    "telegram signals",
    "free forex signals",
    "forex trading signals",
    "telegram forex community",
    "market analysis",
  ],
  metadataBase: new URL("https://forexwizard.online"),
  alternates: {
    canonical: "https://forexwizard.online",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "ForexWizzz - Free Forex & Gold Trading Signals",
    description:
      "Join ForexWizzz on Telegram for daily Forex and Gold trading signals, XAUUSD analysis, and market discussions. Free to join.",
    type: "website",
    url: "https://forexwizard.online",
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
    title: "ForexWizzz - Free Forex & Gold Trading Signals",
    description:
      "Join ForexWizzz on Telegram for daily Forex and Gold trading signals, XAUUSD analysis, and market discussions. Free to join.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "ForexWizzz",
      url: "https://forexwizard.online",
      description:
        "Free Forex and Gold trading signals and market analysis Telegram community",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "ForexWizzz",
      url: "https://forexwizard.online",
      sameAs: ["https://t.me/ForexWizzz"],
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {jsonLd.map((ld, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
          />
        ))}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
