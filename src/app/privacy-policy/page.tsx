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
    "Privacy Policy for Forex Wizard. Learn about how Forex Wizard handles information, cookies, third-party links, and your privacy when using our website.",
  alternates: { canonical: "https://forexwizard.online/privacy-policy/" },
  openGraph: {
    title: "Privacy Policy | Forex Wizard",
    description:
      "Privacy Policy for Forex Wizard. Learn about how Forex Wizard handles your privacy when using our website.",
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
      "Privacy Policy for Forex Wizard. Learn about how Forex Wizard handles your privacy.",
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
            <p className="text-xs text-muted-foreground/60">
              Last updated: September 5, 2026
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
                accounts, forms, analytics tools, advertising trackers, newsletter
                signups, or similar features on this website. This policy reflects
                that reality honestly and completely. However, basic technical
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
                When this policy states that Forex Wizard does not collect
                personal information, it means that Forex Wizard does not actively
                or directly collect personal information through website features
                such as user accounts, forms, analytics tools, advertising
                trackers, newsletter signups, or similar mechanisms. This does not
                mean that no technical data is ever processed by the hosting,
                network, or security infrastructure that delivers the website to
                your browser. Basic technical information such as IP addresses,
                browser information, requested pages, timestamps, and referring
                URLs may be processed automatically by infrastructure as described
                in Section 2.
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
                The Forex Wizard website does not use cookies of any kind. We do
                not set first-party cookies, third-party cookies, session
                cookies, persistent cookies, or any other type of cookie. There
                are no tracking cookies, no analytics cookies, no preference
                cookies, and no advertising cookies on our website.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                In addition to cookies, we also do not use localStorage,
                sessionStorage, IndexedDB, Web SQL, or any other browser storage
                mechanism. Our website does not store any data on your device
                whatsoever. When you close your browser after visiting Forex
                Wizard, no trace of your visit remains in your browser&apos;s
                storage.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Because no cookies or similar technologies are used, no cookie
                consent banner or cookie management interface is required or
                present on our website. You do not need to accept or reject
                cookies because none are ever set. This is a direct result of our
                privacy-first, static website architecture that has no need for
                client-side data storage or tracking.
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
                7. External Services
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Forex Wizard does not embed any third-party content on its
                website. We do not use iframes, social media widgets, YouTube
                embeds, Google Maps embeds, or any other embedded external
                content. Every element you see on our website is hosted and
                served directly from our own infrastructure.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                All images used on the website are self-hosted, meaning they are
                served from the same domain as the website itself and are not
                loaded from any external CDN, image hosting service, or
                third-party server. Similarly, all fonts (Geist and Geist Mono)
                are self-hosted via Next.js at build time and are served from
                our domain rather than being loaded from Google Fonts or any
                other external font service.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                We do not use Google Analytics, Google Tag Manager, Meta Pixel,
                advertising networks, remarketing pixels, or any external
                tracking or analytics services. There are no third-party scripts
                running on our website that monitor your behavior, track your
                visits, or collect data about you. The only structured data on
                our site is JSON-LD markup for search engine optimization
                purposes, which is static metadata embedded in the HTML and does
                not involve any tracking or data collection.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This means that when you visit Forex Wizard, your browser only
                communicates with our domain to load the page content. No
                requests are made to external analytics, advertising, or
                tracking servers. This design keeps your browsing activity
                private and prevents third-party companies from monitoring your
                visit to our website.
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
                from visitors through website features, there is no personal data
                collected by the website to use, analyze, share, sell, or
                distribute. We do not build user profiles, track browsing patterns,
                create audience segments, or engage in any form of data-driven
                decision making based on visitor information.
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
                Because Forex Wizard does not directly collect personal information
                through website features or use tracking technologies, there are no
                cookies to manage, no
                tracking preferences to set, no opt-out mechanisms needed, and no
                privacy settings to configure. You do not need to take any action
                to protect your privacy when using our website because your
                privacy is already fully protected by our site&apos;s design.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                You may freely browse the website without providing any personal
                data. There are no login walls, no email gates, no cookie
                consent banners, and no account requirements. Every page of
                educational content is available to you without any conditions
                or data exchanges.
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
                advertising trackers, newsletter signups, or similar features. If
                you have questions about a specific aspect of this policy, we
                encourage you to reach out and we will provide a clear and honest
                response.
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
