import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for RahulEventsNight - Booking conditions and service agreement.',
  robots: { index: true, follow: true },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-foreground/50 mb-8">Last updated: August 2026</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/80">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using rahuleventsnight.online, you agree to be bound by these Terms of Service.
              If you do not agree with any part of these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">2. Services</h2>
            <p>RahulEventsNight provides the following event services:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Spiritual Events: Jagran, Mata Ki Chowki, Hanuman Aradhna, Sundarkand Path, Ram Katha, Bhajan Sandhya, Shiv Katha, Devi Jagran</li>
              <li>Singing Events: Track Singing, Live Singing, Bollywood Night, Sufi Night, Ghazal Night, Karaoke Night</li>
              <li>Wedding Events: Wedding Singing, Sangeet Night</li>
              <li>Family Events: Birthday Party, Anniversary, Baby Shower, Griha Pravesh</li>
              <li>Corporate Events: Company Functions, Cultural Programs</li>
              <li>Stage Shows: Live Band performances</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">3. Booking & Payment</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Bookings are confirmed only after advance payment as agreed.</li>
              <li>Advance payment is non-refundable if cancellation is made within 7 days of the event.</li>
              <li>Final payment must be made on or before the event day.</li>
              <li>Prices vary based on event type, duration, location, and requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">4. Cancellation Policy</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Cancellation 15+ days before event: 50% refund of advance.</li>
              <li>Cancellation 7-14 days before event: 25% refund of advance.</li>
              <li>Cancellation within 7 days: No refund.</li>
              <li>Rescheduling is allowed subject to availability.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">5. Client Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide accurate event details (date, time, venue, guest count).</li>
              <li>Ensure proper venue arrangements (stage, sound system, power supply).</li>
              <li>Provide parking and loading access for equipment.</li>
              <li>Inform any changes at least 48 hours in advance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">6. Our Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Arrive on time and set up before the scheduled start.</li>
              <li>Provide professional artists and quality equipment.</li>
              <li>Perform for the agreed duration.</li>
              <li>Maintain professional conduct throughout the event.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">7. Force Majeure</h2>
            <p>
              We are not liable for failure to perform due to circumstances beyond our control including natural disasters,
              government restrictions, pandemics, or other unforeseen events. In such cases, the event may be rescheduled.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">8. Intellectual Property</h2>
            <p>
              All content on this website including images, text, videos, and logos are property of RahulEventsNight.
              You may not reproduce or distribute without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">9. Limitation of Liability</h2>
            <p>
              RahulEventsNight is not liable for any indirect, incidental, or consequential damages arising from
              our services. Our total liability is limited to the amount paid for the specific event.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">10. Contact</h2>
            <div className="mt-2">
              <p>📧 Email: <a href="mailto:officialrohit0201@gmail.com" className="text-gold">officialrohit0201@gmail.com</a></p>
              <p>📞 Phone: <a href="tel:+919709954777" className="text-gold">+91 97099 54777</a></p>
              <p>💬 WhatsApp: <a href="https://wa.me/917979962408" className="text-gold">+91 79799 62408</a></p>
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
