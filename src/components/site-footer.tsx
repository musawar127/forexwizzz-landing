import Link from "next/link";

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/forex-signals/", label: "Forex Signals" },
  { href: "/gold-signals/", label: "Gold Signals" },
  { href: "/xauusd-analysis/", label: "XAUUSD Analysis" },
  { href: "/about/", label: "About" },
  { href: "/privacy-policy/", label: "Privacy Policy" },
  { href: "/terms-of-use/", label: "Terms of Use" },
  { href: "/risk-disclosure/", label: "Risk Disclosure" },
  { href: "/contact/", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="py-10 px-4 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Forex Wizard &mdash; Free Forex &amp; Gold Trading Signals Community
        </p>
        <p className="text-xs text-muted-foreground/50 max-w-lg mx-auto leading-relaxed">
          Risk Disclaimer: Forex and other financial markets involve
          significant risk of loss and are not suitable for all investors.
          Past performance does not guarantee future results. The content
          shared in our community is for educational and informational
          purposes only and should not be considered financial advice.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-muted-foreground/40 hover:text-trading-green transition-colors no-underline"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground/40 hover:text-trading-green transition-colors no-underline"
          >
            t.me/ForexWizzz
          </a>
        </div>
      </div>
    </footer>
  );
}
