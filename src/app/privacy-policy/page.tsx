import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for RahulEventsNight - How we collect, use, and protect your data.',
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-foreground/50 mb-8">Last updated: August 2026</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/80">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">1. Introduction</h2>
            <p>
              RahulEventsNight ("we", "our", or "us") respects your privacy and is committed to protecting your personal data.
              This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website
              rahuleventsnight.online or book our event services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Contact Information:</strong> Name, phone number, email address when you submit a booking inquiry.</li>
              <li><strong>Event Details:</strong> Event type, date, venue, and message you provide.</li>
              <li><strong>Usage Data:</strong> IP address, browser type, pages visited (for analytics).</li>
              <li><strong>Cookies:</strong> We use essential cookies for theme preferences and admin authentication.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To process and respond to your booking inquiries.</li>
              <li>To communicate with you about your event requirements.</li>
              <li>To improve our website and services.</li>
              <li>To send promotional messages (only with your consent).</li>
              <li>For legal and administrative purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">4. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Event team members (artists, musicians) for booking coordination.</li>
              <li>Service providers (e.g., analytics tools like Google Analytics).</li>
              <li>Legal authorities if required by law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data from unauthorized
              access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">6. Your Rights</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Right to access your personal data.</li>
              <li>Right to request correction of inaccurate data.</li>
              <li>Right to request deletion of your data.</li>
              <li>Right to opt-out of marketing communications.</li>
            </ul>
            <p className="mt-2">To exercise these rights, contact us at officialrohit0201@gmail.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">7. Cookies</h2>
            <p>
              We use minimal cookies for website functionality (theme preference) and admin authentication.
              We do not use tracking cookies for advertising without your consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">8. Contact Us</h2>
            <div className="mt-2">
              <p>📧 Email: <a href="mailto:officialrohit0201@gmail.com" className="text-gold">officialrohit0201@gmail.com</a></p>
              <p>📞 Phone: <a href="tel:+919709954777" className="text-gold">+91 97099 54777</a></p>
              <p>📍 Address: Attardah Pokhariyapith near Ujjwal Vidyapith School, 842002</p>
            </div>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <a href="/" className="text-gold font-semibold hover:underline">← Back to Homepage</a>
        </div>
      </div>
    </div>
  );
}
