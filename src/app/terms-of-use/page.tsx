import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { FadeSection, StickyTelegramButton } from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Terms of Use | Forex Wizard",
  description:
    "Terms of Use for Forex Wizard. Understand the terms governing your use of our educational forex and gold trading website and Telegram community.",
  alternates: {
    canonical: "https://forexwizard.online/terms-of-use/",
  },
  openGraph: {
    title: "Terms of Use | Forex Wizard",
    description:
      "Terms of Use for Forex Wizard. Understand the terms governing your use of our educational trading website.",
    type: "article",
    url: "https://forexwizard.online/terms-of-use/",
    siteName: "Forex Wizard",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Forex Wizard - Terms of Use",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use | Forex Wizard",
    description:
      "Terms of Use for Forex Wizard. Understand the terms governing your use of our educational trading website.",
    images: ["/og-image.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

export default function TermsOfUsePage() {
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

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-20">
          {/* Title */}
          <FadeSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-trading-green/10 mb-6">
                <FileText className="w-7 h-7 text-trading-green" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Terms of Use
              </h1>
              <p className="text-sm text-muted-foreground">
                Last updated: September 5, 2026
              </p>
            </div>
          </FadeSection>

          {/* 1. Acceptance of Terms */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                By accessing and using the Forex Wizard website at{" "}
                <a
                  className="text-trading-green hover:text-trading-gold transition-colors no-underline"
                  href="https://forexwizard.online"
                >
                  https://forexwizard.online
                </a>
                , you agree to be bound by these Terms of Use. If you do not
                agree with any part of these terms, you should not use the
                website. These terms apply to all visitors and users of the
                website and its content, regardless of how you access the site or
                which pages you view.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Your continued use of the website following the posting of any
                changes to these Terms of Use constitutes acceptance of those
                changes. It is your responsibility to review these terms
                periodically to stay informed of any updates. If you do not
                agree to the modified terms, you should discontinue your use of
                the website immediately.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                These Terms of Use take effect upon your first access of the
                website and remain in effect for the duration of your use. By
                using any feature, tool, or content available on the website,
                you acknowledge that you have read, understood, and agreed to be
                bound by all the terms and conditions set forth herein.
              </p>
            </div>
          </FadeSection>

          {/* 2. Educational Purpose */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                2. Educational Purpose
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Forex Wizard provides educational and informational content
                related to forex trading, gold (XAUUSD) trading, market
                analysis, and trading strategies. All content on this website is
                intended for educational purposes only. The information provided
                should not be interpreted as an invitation, solicitation, or
                recommendation to enter into any trading transaction or
                investment.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The educational materials, analysis, and commentary shared on
                this website are designed to help you understand market concepts,
                technical analysis principles, and general trading strategies.
                They are not tailored to your individual financial situation,
                investment goals, or risk tolerance. You should always exercise
                your own judgment and seek independent professional advice
                before acting on any information found on this website.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Any references to specific currency pairs, price levels, or
                market conditions are made solely for illustrative and
                educational purposes. They do not represent current market
                recommendations and should not be treated as actionable trading
                signals. The educational content on this website may become
                outdated as market conditions change, and we make no commitment
                to update previously published materials.
              </p>
            </div>
          </FadeSection>

          {/* 3. No Financial Advice */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                3. No Financial Advice
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The content on Forex Wizard does not constitute financial
                advice, investment advice, trading advice, or any other form of
                professional advice. You should not treat any information on
                this website as a substitute for professional financial advice
                from a qualified and licensed financial adviser. Always consult
                with a qualified professional before making any financial or
                trading decisions.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Nothing on this website should be construed as a
                recommendation to buy, sell, or hold any financial instrument.
                The analysis, opinions, and commentary expressed on this
                website are those of the content creators and are shared for
                educational discussion only. They do not take into account your
                personal circumstances, financial position, or investment
                objectives.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Trading decisions should always be based on your own independent
                research, due diligence, and consultation with qualified
                financial professionals who understand your individual
                circumstances. Reliance on any information provided on this
                website is solely at your own risk. Forex Wizard expressly
                disclaims any responsibility for losses or damages arising from
                decisions made based on content found on this website.
              </p>
            </div>
          </FadeSection>

          {/* 4. No Brokerage Relationship */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                4. No Brokerage Relationship
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Use of this website does not create a brokerage relationship,
                dealer relationship, or any other principal-agent relationship
                between you and Forex Wizard. Forex Wizard is not a broker,
                dealer, market maker, or intermediary of any kind. We do not
                execute trades, hold funds, or manage accounts on behalf of
                users.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Forex Wizard does not accept deposits, process withdrawals, or
                handle any financial transactions whatsoever. We are not
                connected to any trading platform, brokerage firm, or financial
                institution in a capacity that would allow us to execute or
                manage trades on your behalf. Any references to trading concepts
                on this website are purely educational in nature.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                If you wish to engage in forex or gold trading, you must open
                an account with a licensed and regulated broker independently.
                Forex Wizard does not recommend, endorse, or partner with any
                specific brokerage. The choice of broker and all aspects of
                your trading account are entirely your own responsibility. You
                should conduct thorough research and seek professional guidance
                when selecting a brokerage firm.
              </p>
            </div>
          </FadeSection>

          {/* 5. No Investment Adviser Relationship */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                5. No Investment Adviser Relationship
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Forex Wizard is not a registered investment adviser, financial
                planner, or portfolio manager. No content on this website should
                be construed as personalized investment advice. Any mentions of
                trading signals, market analysis, or trade ideas are
                informational in nature and do not constitute personalized
                recommendations tailored to your specific financial situation,
                risk tolerance, or investment objectives.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The relationship between you and Forex Wizard is solely that of
                a website user and a content provider. No fiduciary duty,
                advisory duty, or any other duty is created by your use of this
                website. Forex Wizard does not monitor your financial
                situation, assess your suitability for any particular
                investment, or provide ongoing management of any trading
                activity.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Any signals, analysis, or trade ideas shared on the website or
                in our Telegram community are general in nature and are not
                directed at any specific individual or tailored to any
                particular financial circumstance. They are provided as
                educational examples to illustrate market analysis techniques
                and should never be treated as personal investment
                recommendations.
              </p>
            </div>
          </FadeSection>

          {/* 6. Trading Risk */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                6. Trading Risk
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Trading in forex, gold, and other financial instruments involves
                substantial risk of loss and is not suitable for all investors.
                You could lose some or all of your invested capital. The high
                degree of leverage available in forex trading can work against
                you as well as for you. Before deciding to trade, you should
                carefully consider your investment objectives, level of
                experience, and risk appetite.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The leveraged nature of forex trading means that relatively
                small market movements can lead to proportionally larger losses.
                A market moving against your position can result in a total
                loss of your margin and may require you to deposit additional
                funds to maintain your position. You should never trade with
                money that you cannot afford to lose, and you should always be
                aware of the maximum potential loss on any trade you enter.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                There are additional risks associated with trading in
                over-the-counter markets, including but not limited to
                liquidity risk, counterparty risk, and technology risk. Market
                conditions, such as during major news events or periods of low
                liquidity, can result in rapid price movements, increased
                spreads, and slippage that may significantly impact your
                trading outcomes. You must fully understand these risks before
                engaging in any trading activity.
              </p>
            </div>
          </FadeSection>

          {/* 7. No Guarantee of Results */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                7. No Guarantee of Results
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Forex Wizard does not guarantee any specific trading outcome,
                profit, or rate of return. Past performance, whether discussed
                on this website or shared in our Telegram community, does not
                guarantee or predict future results. Any examples of trades,
                signals, or analysis are provided for educational purposes only
                and may not be representative of actual trading conditions.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Financial markets are inherently unpredictable, and no
                individual, system, or methodology can consistently predict
                market movements with certainty. Any discussion of historical
                trade results, win rates, or performance metrics on this
                website is presented solely to illustrate educational concepts
                and should not be interpreted as an indication of future
                performance.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                You should be particularly wary of any trading education that
                implies guaranteed profits or minimal risk. All trading involves
                risk, and successful trading requires discipline, ongoing
                education, risk management, and realistic expectations. Forex
                Wizard aims to provide quality educational content, but we make
                no promises regarding the results you may achieve from applying
                any information found on this website.
              </p>
            </div>
          </FadeSection>

          {/* 8. User Responsibility */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                8. User Responsibility
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                You are solely responsible for your own trading decisions and
                the outcomes of those decisions. You acknowledge that all
                trading activity you undertake is done at your own risk and
                discretion. You should not enter any trade solely based on
                information obtained from this website or our Telegram
                community without conducting your own independent analysis and
                assessment.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                It is your responsibility to ensure that any trading activity
                you engage in complies with all applicable laws and regulations
                in your jurisdiction. Forex Wizard does not verify the legal
                status of trading in your country or region, and you should
                independently confirm that your trading activities are legally
                permissible where you reside.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                You are also responsible for maintaining the security of any
                accounts, devices, or credentials you use to access this
                website or any linked services. If you become aware of any
                unauthorized use of your information or any security breach
                related to your interaction with this website, you should take
                immediate steps to protect yourself and notify the relevant
                parties. Forex Wizard accepts no liability for losses arising
                from your failure to maintain adequate security.
              </p>
            </div>
          </FadeSection>

          {/* 9. Market Information */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                9. Market Information
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Market information, prices, analysis, and commentary provided on
                Forex Wizard may be delayed, inaccurate, or incomplete.
                Financial markets are inherently unpredictable, and no source
                of market information should be considered definitive. Forex
                Wizard does not warrant the accuracy, completeness, or
                timeliness of any market data or analysis presented on the
                website.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Prices and market data displayed on this website may differ
                from actual real-time prices available through your broker or
                other data providers. Such discrepancies can arise due to
                delays in data feeds, differences in data sources, or
                variations in how different platforms calculate and display
                prices. You should never rely solely on information from this
                website for real-time trading decisions.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Market conditions can change rapidly and without warning.
                Analysis and commentary on this website reflect the views of
                the content creators at the time of writing and may not account
                for subsequent market developments. Economic events, geopolitical
                developments, and other factors can cause sudden and
                significant market movements that render previous analysis
                obsolete. Always verify current market conditions through
                reliable, real-time sources before making any trading
                decisions.
              </p>
            </div>
          </FadeSection>

          {/* 10. Third-Party Links */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                10. Third-Party Links
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The website contains links to external services, including
                Telegram. These links are provided for convenience and
                informational purposes only. Forex Wizard does not control,
                endorse, or assume responsibility for the content, privacy
                policies, or practices of any third-party website or service.
                Accessing third-party links is done at your own risk.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                When you click on a third-party link, you will be directed to
                a website or service that is not operated by Forex Wizard. We
                have no control over the content, nature, or availability of
                those external sites. The inclusion of any link on our website
                does not imply a recommendation or endorsement of the views
                expressed within that third-party site or service.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                We strongly advise you to review the terms of service and
                privacy policy of any third-party website or service you visit
                through links on our website. Forex Wizard is not responsible
                for any damage, loss, or harm that may result from your
                interaction with third-party websites or services. Any
                transactions or communications you have with third parties are
                solely between you and that third party.
              </p>
            </div>
          </FadeSection>

          {/* 11. Telegram Community */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                11. Telegram Community
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Forex Wizard operates a free Telegram community at{" "}
                <a
                  className="text-trading-green hover:text-trading-gold transition-colors no-underline"
                  href="https://t.me/ForexWizzz"
                >
                  https://t.me/ForexWizzz
                </a>
                . Content shared in the Telegram community, including signals,
                analysis, and discussions, is informational and educational.
                Forex Wizard does not guarantee the accuracy, completeness, or
                timeliness of information shared in the community.
                Participation in the community is voluntary and at your own
                risk. The community is subject to Telegram&apos;s own terms of
                service.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The Telegram community may include content and opinions shared
                by other community members, which do not represent the views of
                Forex Wizard. We do not moderate every message in real-time,
                and we are not responsible for the accuracy or reliability of
                information shared by other community participants. You should
                exercise caution and critical thinking when evaluating any
                content shared by fellow community members.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                By joining and participating in the Telegram community, you
                agree to abide by Telegram&apos;s terms of service and community
                guidelines. Forex Wizard reserves the right to remove any
                participant from the community at its discretion. We may modify
                the community structure, posting rules, or availability at any
                time without prior notice. The Telegram community is a
                supplementary resource and does not form part of any paid
                service or contractual obligation.
              </p>
            </div>
          </FadeSection>

          {/* 12. Intellectual Property */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                12. Intellectual Property
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                All content on the Forex Wizard website, including text,
                graphics, design, and code, is the property of Forex Wizard and
                is protected by applicable intellectual property laws. You may
                not reproduce, distribute, modify, or create derivative works
                from the content on this website without explicit written
                permission. You may share links to the website for
                non-commercial purposes.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The Forex Wizard name, logo, and any distinctive branding
                elements are protected and may not be used without prior written
                consent. Unauthorized use of our intellectual property may
                result in legal action. This includes using our branding in
                connection with any commercial product, service, or website
                that could cause confusion or suggest an affiliation with Forex
                Wizard.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                You may reference or quote limited portions of our content for
                educational, review, or commentary purposes, provided that you
                give proper attribution to Forex Wizard and include a link to
                the original source. Any such use must not imply endorsement by
                Forex Wizard and must be consistent with fair use principles
                under applicable law. For any other use of our content, please
                contact us to request permission.
              </p>
            </div>
          </FadeSection>

          {/* 13. Acceptable Use */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                13. Acceptable Use
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                You agree to use the website only for lawful purposes and in
                accordance with these Terms of Use. You agree not to use the
                website in any way that could damage, disable, or impair the
                website or interfere with any other party&apos;s use. You agree not
                to attempt to gain unauthorized access to any part of the
                website or its systems.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Specifically, you agree not to: use automated scripts, bots, or
                scraping tools to extract data from the website; attempt to
                circumvent any security measures or access restrictions;
                introduce malicious code, viruses, or other harmful elements;
                overload the website&apos;s infrastructure through excessive requests
                or traffic; use the website to send unsolicited communications
                or spam; or misrepresent your identity or affiliation when
                interacting with the website.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Forex Wizard reserves the right to restrict or terminate access
                to any user who violates these acceptable use provisions, at
                our sole discretion and without prior notice. We may also take
                any technical or legal measures we deem appropriate to prevent
                or stop violations of these terms, including cooperating with
                law enforcement authorities when required to do so.
              </p>
            </div>
          </FadeSection>

          {/* 14. Availability of the Website */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                14. Availability of the Website
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Forex Wizard makes the website available on an &quot;as is&quot; and &quot;as
                available&quot; basis. We do not guarantee that the website will be
                available at all times, uninterrupted, or error-free. We
                reserve the right to modify, suspend, or discontinue the
                website or any part of it at any time without notice.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The website may experience periods of downtime due to scheduled
                maintenance, server upgrades, or unforeseen technical issues.
                Forex Wizard will make reasonable efforts to minimize
                disruptions, but we cannot guarantee uninterrupted access.
                During periods of maintenance or technical difficulties, some
                or all features of the website may be temporarily unavailable.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Forex Wizard shall not be liable for any damages or losses
                arising from the unavailability of the website, whether
                temporary or permanent. You are encouraged to avoid reliance on
                the website for time-sensitive trading decisions, as the
                information you need may not always be accessible when you need
                it. Always have alternative sources of information available
                for your trading activities.
              </p>
            </div>
          </FadeSection>

          {/* 15. Disclaimer of Warranties */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                15. Disclaimer of Warranties
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                To the fullest extent permitted by applicable law, Forex Wizard
                disclaims all warranties, express or implied, including but not
                limited to implied warranties of merchantability, fitness for a
                particular purpose, and non-infringement. We do not warrant
                that the website will be error-free, that defects will be
                corrected, or that the website or its servers will be free of
                viruses or other harmful components.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The website and all its content are provided on an &quot;as is&quot;
                basis without warranties of any kind. Forex Wizard makes no
                representations or warranties regarding the accuracy,
                reliability, completeness, or timeliness of any content,
                information, or analysis provided on the website. Any reliance
                you place on such information is strictly at your own risk.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                No advice or information, whether oral or written, obtained by
                you from Forex Wizard or through the website shall create any
                warranty not expressly stated in these Terms of Use. This
                disclaimer of warranties applies to the fullest extent
                permitted by the laws of your jurisdiction. If applicable law
                does not allow the exclusion of certain implied warranties, the
                above exclusions may not apply to you, and in such cases,
                Forex Wizard disclaims such warranties only to the extent
                permitted by law.
              </p>
            </div>
          </FadeSection>

          {/* 16. Limitation of Liability */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                16. Limitation of Liability
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                To the fullest extent permitted by applicable law, Forex Wizard
                shall not be liable for any direct, indirect, incidental,
                special, consequential, or punitive damages arising out of or
                related to your use of or inability to use the website, even if
                Forex Wizard has been advised of the possibility of such
                damages. This limitation applies to all causes of action,
                whether based on contract, tort, or any other legal theory.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                This limitation of liability encompasses, but is not limited to,
                damages for loss of profits, loss of data, loss of trading
                capital, business interruption, or any other commercial or
                pecuniary loss. In no event shall Forex Wizard&apos;s total
                liability to you for all damages arising from your use of the
                website exceed the amount of zero dollars, as the website is
                provided free of charge.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                If applicable law does not allow the exclusion or limitation of
                liability for consequential or incidental damages, the above
                limitation may not apply to you to the extent prohibited by
                law. In jurisdictions that do not allow the exclusion or
                limitation of liability, Forex Wizard&apos;s liability shall be
                limited to the fullest extent permitted by applicable law. This
                section shall survive the termination of your use of the
                website.
              </p>
            </div>
          </FadeSection>

          {/* 17. Changes to These Terms */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                17. Changes to These Terms
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Forex Wizard reserves the right to modify these Terms of Use at
                any time. Changes will be posted on this page with an updated
                &quot;Last updated&quot; date. Your continued use of the website after
                changes are posted constitutes acceptance of the revised terms.
                We encourage you to review these terms periodically.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                While we make reasonable efforts to notify users of significant
                changes, Forex Wizard is not obligated to provide individual
                notifications of modifications to these terms. It is your sole
                responsibility to check this page regularly for updates. The
                most current version of the Terms of Use will always be
                available on this page and supersedes all prior versions.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                If you do not agree with any changes made to these Terms of
                Use, your only recourse is to discontinue your use of the
                website. Continued use following the posting of modified terms
                indicates your binding acceptance of those modifications. We
                recommend bookmarking this page and reviewing it periodically,
                especially before making any significant decisions based on
                information obtained from the website.
              </p>
            </div>
          </FadeSection>

          {/* 18. Contact */}
          <FadeSection>
            <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                18. Contact
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                If you have questions about these Terms of Use, you may contact
                us using the following methods. We will make reasonable efforts
                to respond to your inquiries in a timely manner, though
                response times may vary depending on the nature and volume of
                requests received.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Email:{" "}
                <a
                  className="text-trading-green hover:text-trading-gold transition-colors no-underline"
                  href="mailto:forexwizardy@gmail.com"
                >
                  forexwizardy@gmail.com
                </a>
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Telegram:{" "}
                <a
                  className="text-trading-green hover:text-trading-gold transition-colors no-underline"
                  href="https://t.me/ForexWizzz"
                >
                  https://t.me/ForexWizzz
                </a>
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                When contacting us about these Terms of Use, please include a
                clear description of your question or concern so that we can
                address it effectively. We value your feedback and are
                committed to maintaining transparency about the terms that
                govern the use of our website and services.
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
