import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { FadeSection, StickyTelegramButton } from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

export const metadata: Metadata = {
  title: "Privacy Policy | Forex Wizard",
  description:
    "Privacy Policy for Forex Wizard. Learn how we handle information, Google AdSense advertising cookies, third-party advertising, the Google CMP consent system, and your privacy choices.",
  alternates: { canonical: "https://forexwizard.online/privacy-policy/" },
  openGraph: {
    title: "Privacy Policy | Forex Wizard",
    description:
      "Privacy Policy for Forex Wizard. Learn how we handle Google AdSense advertising cookies, third-party advertising, the Google CMP consent system, and your privacy choices.",
    type: "article",
    url: "https://forexwizard.online/privacy-policy/",
    siteName: "Forex Wizard",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Forex Wizard - Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Forex Wizard",
    description:
      "Privacy Policy for Forex Wizard. Learn how we handle Google AdSense advertising cookies, third-party advertising, the Google CMP consent system, and your privacy choices.",
    images: ["/og-image.jpg"],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-trading-dark text-foreground">
      {/* Header */}
      <header className="relative z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold text-foreground tracking-tight no-underline hover:text-trading-green transition-colors"
          >
            <img
              src="/brand/forexwizard-logo.webp"
              alt="ForexWizard logo"
              width={44}
              height={44}
              loading="eager"
              decoding="async"
              className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-lg object-cover"
            />
            Forex Wizard
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/forex-signals/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block"
            >
              Forex Signals
            </Link>
            <Link
              href="/gold-signals/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block"
            >
              Gold Signals
            </Link>
            <Link
              href="/xauusd-analysis/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block"
            >
              XAUUSD Analysis
            </Link>
            <Link
              href="/about/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block"
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        <CandlestickBackground />

        <div className="relative z-10 max-w-3xl mx-auto px-4 py-16">
          {/* Page Title */}
          <FadeSection className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShieldCheck className="w-8 h-8 text-trading-green" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Privacy Policy
            </h1>
            <p className="text-xs text-muted-foreground/80">
              Last updated: October 2, 2026
            </p>
          </FadeSection>

          {/* 1. Introduction */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                1. Introduction
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Forex Wizard operates the website at{" "}
                <a
                  className="text-trading-green hover:text-trading-gold transition-colors no-underline"
                  href="https://forexwizard.online"
                >
                  https://forexwizard.online
                </a>
                . This Privacy Policy describes how we handle information when
                you visit our website. Our website is a static, informational
                resource that provides educational content about forex and gold
                trading. We are committed to being transparent about our data
                practices, and we want you to understand exactly what happens
                when you browse our site.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Unlike many websites that collect visitor data through forms,
                analytics, or tracking technologies, Forex Wizard is designed as
                a fully static website. This means that every page is
                pre-rendered and served as plain HTML, CSS, and JavaScript
                without any server-side processing or dynamic data collection.
                We do not directly collect personal information through user
                accounts, forms, analytics tools, newsletter signups, or similar
                first-party features on this website. We do, however, display
                advertising through Google AdSense, which is a third-party
                service that may set advertising cookies and process limited data
                as described in Sections 4 and 7 below. This policy reflects
                that reality honestly and completely. In addition, basic technical
                information may still be processed automatically by hosting, network,
                or security infrastructure when you access the website, as described
                in Section 2.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                By using our website, you agree to the practices described in
                this Privacy Policy. If you do not agree with any part of this
                policy, you should discontinue use of the website. We encourage
                you to read this policy in its entirety so that you fully
                understand how your information is &mdash; and is not &mdash;
                handled when you visit Forex Wizard.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                When this policy states that Forex Wizard does not directly
                collect personal information, it means that Forex Wizard does not
                actively or directly collect personal information through
                first-party website features such as user accounts, forms,
                analytics tools, newsletter signups, or similar mechanisms. This
                does not mean that no data is ever processed in connection with
                your visit. Third-party advertising services we use, in particular
                Google AdSense, may process advertising cookies and limited device
                or usage data to display and measure advertisements, subject to
                the consent collected through Google&apos;s Consent Management
                Platform (CMP), as described in Sections 4 and 7. In addition,
                basic technical information such as IP addresses, browser
                information, requested pages, timestamps, and referring URLs may
                be processed automatically by the hosting, network, or security
                infrastructure that delivers the website to your browser, as
                described in Section 2.
              </p>
            </div>
          </FadeSection>

          {/* 2. Information We May Receive */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                2. Information We May Receive
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Forex Wizard does not directly collect personal information from
                its visitors through website features. Our website has no user
                registration, no login system, no forms, no newsletter sign-ups, no
                email collection, and no account creation of any kind. You can
                browse every page of our website without providing any personal data
                through any website feature. Basic technical information may still be
                processed automatically by hosting, network, or security
                infrastructure, as described below.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                We want to be fully transparent: our hosting provider may record
                standard server access logs as part of normal website operation.
                These logs typically include information such as your IP address,
                browser type and version, the pages you visited, the date and
                time of your visit, and the referring URL. This is standard
                behavior for any web server and is not unique to Forex Wizard.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We do not access, analyze, or use these server logs for tracking
                purposes, user profiling, or any form of visitor identification.
                These logs exist solely as part of the infrastructure that
                delivers our website to your browser. We have no analytics
                dashboard, no visitor tracking system, and no mechanism to
                associate server log entries with individual people.
              </p>
            </div>
          </FadeSection>

          {/* 3. Website Technical Data */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                3. Website Technical Data
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The Forex Wizard website is fully static, meaning all pages are
                pre-rendered HTML files generated at build time. No server-side
                processing occurs when you visit any page. There are no API
                endpoints, no database queries, and no dynamic content generation
                happening in real time. The website you see is simply a
                collection of static files served directly to your browser.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Because the site is entirely static, no data is actively
                transmitted to our servers by the website itself. Your browser
                downloads the pre-built HTML, CSS, JavaScript, images, and font
                files, and renders the page locally. There is no communication back
                to our servers after the initial page load. No user behavior,
                scroll events, click events, or any other interaction data is sent
                from your browser to any server. However, basic technical
                information may still be processed automatically by hosting,
                network, or security infrastructure when you access the website.
                This can include information such as IP address, browser
                information, requested pages, timestamps, and referring URLs.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This architectural decision was intentional. By making Forex
                Wizard a fully static website, we ensure that visitor privacy is
                protected by design. There is simply no mechanism within the
                website to collect, process, or transmit personal data. This
                approach eliminates entire categories of privacy concerns that
                exist on dynamic, data-collecting websites.
              </p>
            </div>
          </FadeSection>

          {/* 4. Cookies and Similar Technologies */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                4. Cookies and Similar Technologies
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Forex Wizard itself does not set first-party cookies, session
                cookies, preference cookies, or analytics cookies for its own
                purposes. We do not operate our own analytics, do not maintain
                user accounts, and do not use first-party tracking on this
                website.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                However, we display advertising through Google AdSense, and
                Google and its advertising partners may set and read
                <strong className="text-foreground"> advertising cookies</strong>{" "}
                when advertisements are shown on this website. These advertising
                cookies allow Google to serve, measure, and (where you have
                consented) personalize advertisements based on your visits to
                this site and other websites. Advertising cookies may include a
                unique identifier and may persist on your device after you leave
                this site, in accordance with Google&apos;s cookie and
                advertising policies. For example, the DoubleClick cookie
                (&ldquo;IDE&rdquo;) and related Google advertising cookies may be
                used to serve and measure ads. Google may also use web storage
                (such as local storage) and similar technologies for ad delivery
                and measurement purposes.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Consent for these advertising cookies is collected and managed
                through <strong className="text-foreground">Google&apos;s
                Consent Management Platform (CMP)</strong>, which presents
                visitors with a consent choice regarding advertising cookies and
                related ad personalization. Where the Google CMP is shown, you
                may accept advertising cookies, reject them, or customize your
                advertising preferences. Your consent choice is stored by Google
                and governs whether personalized advertising is served. If you
                reject advertising cookies, Google may still serve
                non-personalized ads, which are not based on your interests and
                are subject to more limited data use.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Forex Wizard does not control and does not have access to the
                cookies that Google and its advertising partners set on your
                device. Those cookies are governed by Google&apos;s own privacy
                and cookie policies. You can learn more about how Google uses
                cookies for advertising and how to manage them at{" "}
                <a
                  className="text-trading-green hover:text-trading-gold transition-colors no-underline"
                  href="https://policies.google.com/technologies/cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  policies.google.com/technologies/cookies
                </a>{" "}
                and{" "}
                <a
                  className="text-trading-green hover:text-trading-gold transition-colors no-underline"
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  policies.google.com/technologies/ads
                </a>
                .
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In addition to advertising cookies set by Google, basic technical
                information may still be processed automatically by hosting,
                network, or security infrastructure when you access the website,
                as described in Sections 2 and 3. Outside of the advertising
                cookies governed by Google&apos;s CMP, Forex Wizard itself does
                not use localStorage, sessionStorage, IndexedDB, Web SQL, or any
                other browser storage mechanism for its own purposes.
              </p>
            </div>
          </FadeSection>

          {/* 5. Third-Party Links */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                5. Third-Party Links
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Our website contains links to our Telegram community at{" "}
                <a
                  className="text-trading-green hover:text-trading-gold transition-colors no-underline"
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://t.me/ForexWizzz
                </a>
                . These links are provided so that visitors can easily join our
                free Telegram group for forex and gold trading discussions and
                community updates.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                When you click a link to Telegram, you are leaving the Forex
                Wizard website and navigating to Telegram&apos;s platform. At
                that point, you are subject to Telegram&apos;s own privacy
                policy and data practices, which are entirely independent from
                ours. We do not share any visitor data with Telegram, and no
                data passes from our website to Telegram except the standard HTTP
                referrer header that your browser may send when following a link.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We encourage you to review Telegram&apos;s privacy policy at{" "}
                <a
                  className="text-trading-green hover:text-trading-gold transition-colors no-underline"
                  href="https://telegram.org/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://telegram.org/privacy
                </a>{" "}
                before using their services, so that you understand how Telegram
                handles your information. Forex Wizard is not responsible for the
                privacy practices of any third-party website or service that you
                visit through links on our site.
              </p>
            </div>
          </FadeSection>

          {/* 6. Telegram */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                6. Telegram
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Links to our Telegram community are provided throughout the
                Forex Wizard website for your convenience. Our Telegram group is
                where we share free forex and gold trading signals, market
                analysis, and community discussions. The Telegram link is the
                only external link present on our website.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                When you click a Telegram link, you leave the Forex Wizard
                website and are directed to Telegram&apos;s platform. Once on
                Telegram, you are subject to Telegram&apos;s data collection and
                usage practices. Telegram may collect information about you
                including your phone number, account details, and usage data
                according to their own privacy policy. Forex Wizard does not
                control, influence, or have access to Telegram&apos;s collection,
                use, or storage of your information.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We are not responsible for the privacy practices of Telegram or
                any other third-party service. The inclusion of a link to
                Telegram on our website does not imply endorsement of
                Telegram&apos;s privacy practices. You should always review the
                privacy policy of any third-party service before providing them
                with personal information or creating an account.
              </p>
            </div>
          </FadeSection>

          {/* 7. External Services */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                7. External Services &amp; Google AdSense
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Forex Wizard uses{" "}
                <strong className="text-foreground">Google AdSense</strong>, a
                third-party advertising service provided by Google LLC, to
                display advertisements on this website. Google AdSense is the
                only third-party advertising or tracking service used on this
                site. Through Google AdSense, Google and its advertising partners
                may serve, measure, and (where you have consented) personalize
                advertisements. When ads are displayed, Google may set
                advertising cookies, use web storage, and process limited device
                or usage data, including your IP address, cookie identifiers,
                and information about the pages you visit, in order to display
                and measure advertisements and report on ad performance.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                We have published an{" "}
                <strong className="text-foreground">ads.txt</strong>{" "}
                (Authorized Digital Sellers) file at{" "}
                <a
                  className="text-trading-green hover:text-trading-gold transition-colors no-underline"
                  href="https://forexwizard.online/ads.txt"
                >
                  https://forexwizard.online/ads.txt
                </a>
                . This file authorizes Google to sell advertising inventory on
                this website and identifies our Google AdSense publisher ID
                (<code className="text-foreground">pub-6688769451659099</code>)
                as a direct seller. The ads.txt file is a plain-text industry
                standard that helps prevent unauthorized sellers from
                representing our inventory; it does not itself collect personal
                data.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Consent for advertising cookies and ad personalization is
                collected and managed through{" "}
                <strong className="text-foreground">Google&apos;s Consent
                Management Platform (CMP)</strong>, which is provided by Google
                as part of its advertising services. The Google CMP presents
                visitors with a consent choice and stores that choice so that
                Google can determine whether to serve personalized advertising.
                Forex Wizard does not operate a separate consent banner of its
                own; advertising consent is handled by Google&apos;s CMP. Your
                consent decisions apply to the advertising cookies and ad
                personalization described in Section 4.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                When Google AdSense is active, your browser may communicate with
                Google&apos;s advertising servers (for example
                doubleclick.net, google.com, and googlesyndication.com domains)
                to load and display advertisements. These requests are governed
                by Google&apos;s privacy and advertising policies. You can review
                Google&apos;s privacy policy at{" "}
                <a
                  className="text-trading-green hover:text-trading-gold transition-colors no-underline"
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  policies.google.com/privacy
                </a>{" "}
                and Google&apos;s advertising technologies page at{" "}
                <a
                  className="text-trading-green hover:text-trading-gold transition-colors no-underline"
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  policies.google.com/technologies/ads
                </a>
                .
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Outside of Google AdSense, Forex Wizard does not use Google
                Analytics, Google Tag Manager, Meta Pixel, remarketing pixels, or
                any other external analytics or tracking service. We do not embed
                social media widgets, YouTube embeds, or Google Maps embeds. All
                images used on the website are self-hosted (served from our own
                domain and not loaded from any external CDN or image hosting
                service). All fonts (Geist and Geist Mono) are self-hosted via
                Next.js at build time and are served from our domain rather than
                being loaded from Google Fonts or any other external font
                service. The only other structured data on our site is JSON-LD
                markup for search engine optimization purposes, which is static
                metadata embedded in the HTML and does not involve any tracking
                or data collection.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In summary, the only external service that may process data in
                connection with your visit is Google AdSense (including
                Google&apos;s CMP for consent). Forex Wizard does not control and
                does not have access to the data that Google processes through
                AdSense. For any questions about Google&apos;s advertising data
                practices, please consult Google&apos;s policies referenced
                above.
              </p>
            </div>
          </FadeSection>

          {/* 8. How Information Is Used */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                8. How Information Is Used
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Since Forex Wizard does not directly collect personal information
                from visitors through first-party website features, there is no
                personal data collected by the website itself to use, analyze,
                share, sell, or distribute. We do not build user profiles, track
                browsing patterns, create audience segments, or engage in any
                form of data-driven decision making based on visitor information
                on our own behalf.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The exception is Google AdSense. As described in Section 7,
                Google may use advertising cookies and limited device or usage
                data (such as cookie identifiers and information about the pages
                you visit) to display, measure, and &mdash; only where you have
                consented through Google&apos;s CMP &mdash; personalize
                advertisements. Any such processing is carried out by Google
                under Google&apos;s privacy and advertising policies and is
                subject to the consent you provide via Google&apos;s CMP. Forex
                Wizard does not have access to the data Google processes through
                AdSense and does not use it to build profiles of our visitors.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The website exists solely to provide free educational content
                about forex and gold trading. Every page is publicly accessible
                and does not require any personal information to view. We do not
                gate content behind registration walls, email captures, or
                account creation. All of our educational resources, trading
                signal information, and market analysis content are freely
                available to everyone.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We believe that educational content about financial markets
                should be accessible to everyone without requiring visitors to
                trade their personal data for access. This philosophy is
                reflected in every aspect of our website&apos;s design, from its
                static architecture to its absence of direct data collection
                mechanisms. Your privacy is not a feature we added &mdash; it is
                the default state of our website.
              </p>
            </div>
          </FadeSection>

          {/* 9. Data Security */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                9. Data Security
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Because the Forex Wizard website does not directly collect or
                store personal information through website features, the risk of a
                data breach involving visitor data through the website itself is
                minimal. There are no
                databases to compromise, no user accounts to hack, no personal
                data to leak, and no server-side processing that could be
                exploited to extract visitor information.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The site is delivered as static HTML with no server-side data
                processing. This means there are no API endpoints that could be
                attacked, no database connections that could be compromised, and
                no server-side sessions that could be hijacked. The attack
                surface for visitor data collected by the website is minimal because
                the website itself does not collect visitor data to attack.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                While no system connected to the internet can be considered
                completely immune to all security threats, the static nature of
                our website significantly reduces the security risks compared to
                dynamic websites that collect and process user data. Our hosting
                infrastructure uses HTTPS encryption for all connections,
                ensuring that the content delivered to your browser cannot be
                intercepted or modified in transit.
              </p>
            </div>
          </FadeSection>

          {/* 10. Data Retention */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                10. Data Retention
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Forex Wizard does not directly collect or store personal
                information through website features, so there is no data retention
                of directly collected information to describe. We have no databases
                storing visitor details, no logs that we access or retain for
                analysis, and no records of individual visits that we maintain.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                There are no retention periods, data deletion policies, or data
                subject access procedures for data collected by the website because
                the website does not directly collect personal data to retain,
                delete, or provide access to. You cannot request a copy of your
                data from the website, request data deletion, or exercise data
                subject rights regarding website-collected data because the website
                simply does not collect personal data about you through its
                features.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This is a fundamental advantage of our privacy-by-design
                approach. Rather than collecting data through website features and
                then managing its retention, access, and deletion, we avoid
                collecting data through the website entirely. This eliminates the
                data lifecycle management problem for website-collected data and
                ensures that visitor privacy is maintained with respect to
                information the website directly gathers.
              </p>
            </div>
          </FadeSection>

          {/* 11. Children's Privacy */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                11. Children&apos;s Privacy
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Our website is not directed at children under the age of 18. The
                educational content about forex and gold trading is intended for
                adults who have an interest in financial markets and trading.
                Forex and gold trading involve significant financial risk and
                are not appropriate activities for minors.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                We do not knowingly collect information from children under 18
                through website features. Since no personal information is directly
                collected from any visitor regardless of age through the website, no
                special protections for children&apos;s data are needed on our end.
                There are no age gates, parental consent mechanisms, or
                children&apos;s privacy features because the website does not
                directly collect personal data from anyone through its features.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Parents and guardians should be aware that our website is freely
                accessible without age verification, as it does not directly
                collect any personal information through its features. However, the content discusses financial
                markets and trading strategies that are intended for an adult
                audience. If you are a parent or guardian and have concerns about
                your child accessing financial market content, we recommend using
                parental control tools to manage their internet access.
              </p>
            </div>
          </FadeSection>

          {/* 12. Your Choices */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                12. Your Choices
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Because Forex Wizard does not directly collect personal
                information through first-party website features, there are no
                first-party cookies to manage, no first-party tracking
                preferences to set, and no account-related privacy settings to
                configure. You may freely browse the website without providing
                any personal data, and there are no login walls, email gates, or
                account requirements.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                However, because we display advertising through Google AdSense,
                you do have choices regarding advertising cookies and ad
                personalization. Advertising consent is handled by
                <strong className="text-foreground"> Google&apos;s Consent
                Management Platform (CMP)</strong>. When the Google CMP consent
                choice is presented, you can accept advertising cookies, reject
                them, or customize your advertising preferences. Your selection
                is stored by Google and controls whether personalized
                advertising is served on this website.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                You can also manage Google advertising and ad personalization
                directly through Google&apos;s tools at any time:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li>
                  Google Ads Settings:{" "}
                  <a
                    className="text-trading-green hover:text-trading-gold transition-colors no-underline"
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    adssettings.google.com
                  </a>{" "}
                  &mdash; manage whether ads are personalized using your Google
                  activity.
                </li>
                <li>
                  Google Ad Settings opt-out page:{" "}
                  <a
                    className="text-trading-green hover:text-trading-gold transition-colors no-underline"
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    google.com/settings/ads
                  </a>{" "}
                  &mdash; opt out of personalized advertising from Google.
                </li>
                <li>
                  Digital Advertising Alliance opt-out:{" "}
                  <a
                    className="text-trading-green hover:text-trading-gold transition-colors no-underline"
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    aboutads.info/choices
                  </a>{" "}
                  &mdash; opt out of interest-based advertising from
                  participating companies.
                </li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                In addition, standard browser controls let you block or delete
                advertising cookies set by Google and other advertising
                partners. Most browsers allow you to refuse third-party cookies
                or to clear cookies already stored on your device. Note that
                blocking advertising cookies does not remove advertisements
                entirely; Google may still serve non-personalized ads that are
                not based on your interests.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If you choose to visit our Telegram community by clicking the
                Telegram links on our website, that is your choice and is
                entirely optional. The website functions fully without any need
                to visit external links. All educational content, trading
                information, and market analysis is available directly on the
                Forex Wizard website without joining Telegram or any other
                external service.
              </p>
            </div>
          </FadeSection>

          {/* 13. Changes to This Policy */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                13. Changes to This Privacy Policy
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                We may update this Privacy Policy from time to time to reflect
                changes in our website, our practices, or applicable legal
                requirements. Any changes will be posted on this page with an
                updated &ldquo;Last updated&rdquo; date at the top. We encourage
                you to review this page periodically to stay informed about how
                we handle information related to your visit.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                If we make material changes to this Privacy Policy, we will
                update the &ldquo;Last updated&rdquo; date prominently so that
                you can easily see when the policy was last revised. Your
                continued use of the website after any changes to this policy
                constitutes your acceptance of the revised Privacy Policy.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Given that our website is static and does not directly collect
                personal information through website features, significant changes
                to this policy are unlikely.
                However, if we ever add features that involve data collection,
                we will update this policy before or at the time those features
                are implemented, and we will clearly describe any new data
                practices. We are committed to maintaining transparency about
                our data handling at all times.
              </p>
            </div>
          </FadeSection>

          {/* 14. Contact */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                14. Contact
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or our data practices, you are welcome to contact
                us. We value transparency and are happy to clarify any aspect of
                this policy or address any concerns you may have about your
                privacy when using our website.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                You can reach us through the following channels:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li>
                  Email:{" "}
                  <a
                    className="text-trading-green hover:text-trading-gold transition-colors no-underline"
                    href="mailto:forexwizardy@gmail.com"
                  >
                    forexwizardy@gmail.com
                  </a>
                </li>
                <li>
                  Telegram:{" "}
                  <a
                    className="text-trading-green hover:text-trading-gold transition-colors no-underline"
                    href={TELEGRAM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://t.me/ForexWizzz
                  </a>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                If you choose to contact us by email at
                forexwizardy@gmail.com, please be aware that your email message
                is transmitted using email infrastructure operated by Google/Gmail
                and may be subject to Google&apos;s privacy practices. Forex Wizard
                does not control Google&apos;s handling of email data. We encourage
                you to review Google&apos;s privacy policy if you have concerns about
                how your email communication may be processed by their services.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We will make every effort to respond to your inquiry in a
                timely manner. Please note that while we are happy to answer
                questions about our privacy practices, the simplest assurance we
                can provide is that our website does not directly collect personal
                information through user accounts, forms, analytics tools,
                newsletter signups, or similar first-party features. The only
                third-party data processing on this website is performed by
                Google AdSense (and Google&apos;s CMP for consent), as described
                in Sections 4 and 7. If you have questions about a specific
                aspect of this policy, we encourage you to reach out and we will
                provide a clear and honest response.
              </p>
            </div>
          </FadeSection>
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />

      {/* Sticky Telegram Button */}
      <StickyTelegramButton
        href={TELEGRAM_LINK}
        label="Join Forex Wizard on Telegram"
      />
    </div>
  );
}
