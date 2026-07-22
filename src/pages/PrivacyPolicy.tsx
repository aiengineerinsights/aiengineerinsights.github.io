import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const UPDATED = "July 22, 2026";
const CONTACT = "aiengineerinsights@gmail.com";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {UPDATED}</p>

          <article className="prose prose-sm sm:prose-base max-w-none space-y-6">
            <section>
              <p className="text-muted-foreground leading-relaxed">
                This Privacy Policy explains how AI Engineer Insights ("we", "us", or "the site") collects, uses, and
                protects information when you visit{" "}
                <span className="font-medium">aiengineerinsights.com</span>. By using the site, you agree to the practices
                described here.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not require you to create an account or provide personal information to read our content. We collect
                two kinds of data:
              </p>
              <ul className="text-muted-foreground leading-relaxed list-disc list-inside space-y-1 mt-2">
                <li>
                  <strong>Usage and analytics data</strong> — pages visited, referring site, approximate location (country),
                  device and browser type, and interactions, collected through analytics tools to help us improve the site.
                </li>
                <li>
                  <strong>Information you volunteer</strong> — such as your email address if you contact us or subscribe to a
                  newsletter.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Cookies and Similar Technologies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar technologies for analytics and, in the future, to serve advertising. Cookies are
                small files stored on your device. You can control non-essential cookies through the consent banner shown on
                your first visit, and you can change or withdraw your choice at any time using the "Cookie settings" link in
                the footer. Essential cookies required for the site to function do not require consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Analytics</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use Microsoft Clarity to understand how visitors use the site (for example, which articles are read and
                where people click). Clarity may capture usage data and behavioral metrics. Analytics are loaded only after
                you accept non-essential cookies. See Microsoft's privacy documentation for details on their processing.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Advertising</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may in the future display advertising, including through Google AdSense. When enabled, third-party vendors
                including Google may use cookies to serve ads based on your prior visits to this and other websites. Where
                required by law, personalized advertising will only be shown after you consent through our cookie banner. You
                can opt out of personalized Google advertising via Google's Ads Settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">How We Use Information</h2>
              <ul className="text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
                <li>To operate, maintain, and improve the site and its content.</li>
                <li>To understand which topics and articles are most useful to readers.</li>
                <li>To respond to messages you send us.</li>
                <li>To serve and measure advertising, where enabled and consented to.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                Depending on where you live, you may have rights under laws such as the GDPR (EU/UK) or CCPA (California),
                including the right to access, correct, or delete your personal data, and to withdraw consent. To exercise
                any of these rights, contact us at{" "}
                <a href={`mailto:${CONTACT}`} className="text-primary hover:underline">{CONTACT}</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Data Retention and Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain analytics data only as long as needed for the purposes described above and rely on our service
                providers' security measures to protect it. No method of transmission over the internet is completely secure,
                and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our articles link to external sites we do not control. This policy does not apply to those sites; please
                review their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                The site is intended for a general, professional audience and is not directed at children under 13. We do not
                knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this policy from time to time. Material changes will be reflected by updating the "Last updated"
                date above.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Questions about this policy? Email{" "}
                <a href={`mailto:${CONTACT}`} className="text-primary hover:underline">{CONTACT}</a>.
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
