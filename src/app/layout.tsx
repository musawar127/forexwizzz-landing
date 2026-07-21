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
    "Join our free Telegram trading community for daily Forex & Gold signals, market analysis, trading setups, and educational content. 100% free to join.",
  keywords: [
    "forex signals",
    "gold signals",
    "XAUUSD",
    "forex trading",
    "trading community",
    "telegram signals",
    "free forex signals",
    "market analysis",
  ],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📈</text></svg>",
  },
  openGraph: {
    title: "ForexWizzz - Free Forex & Gold Trading Signals",
    description:
      "Join our free Telegram community for daily trading signals, market analysis, and trading ideas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}