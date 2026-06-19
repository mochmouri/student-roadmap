import { setRequestLocale } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata = { title: "Terms of Service — The Student Roadmap" };

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <h1 className="text-3xl font-display font-bold mb-2" style={{ color: "var(--color-text-heading)" }}>
        Terms of Service
      </h1>
      <p className="text-sm mb-10" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
        Last updated: June 2026
      </p>

      <Section title="1. About this site">
        <p>The Student Roadmap is a personal resource providing guidance, articles, templates, and tools for students navigating secondary school, university applications, and early career decisions. It is not affiliated with any school, university, or government body.</p>
      </Section>

      <Section title="2. What you&apos;re buying">
        <p className="mb-3">When you purchase through this site, you are buying one of the following:</p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li><strong>Premium subscription</strong> — recurring access to premium content and tools, billed monthly. Cancel any time.</li>
          <li><strong>The Bundle</strong> — a one-time purchase of a downloadable template and resource pack.</li>
          <li><strong>1:1 Consultation</strong> — a 30-minute video call, booked via Calendly after payment.</li>
          <li><strong>Personal Statement Editing</strong> — a done-for-you editing service with written commentary, delivered by email.</li>
        </ul>
      </Section>

      <Section title="3. Payments">
        <p>Payments are processed securely by Stripe (for consultations and PS editing) or Lemon Squeezy (for subscriptions and the bundle). We do not store your card details. All prices are shown before checkout. Applicable VAT is included for EU and GCC customers.</p>
      </Section>

      <Section title="4. Delivery">
        <p>Digital products are made available immediately upon confirmed payment. Consultation slots are scheduled by you via Calendly after payment. Personal statement edits are delivered within the turnaround time you selected at checkout.</p>
      </Section>

      <Section title="5. Acceptable use">
        <p>You may use content on this site for your personal, non-commercial use. You may not reproduce, resell, or distribute any paid content, templates, or tools without permission.</p>
      </Section>

      <Section title="6. Limitation of liability">
        <p>The content on this site reflects personal experience and is provided for informational purposes only. It does not constitute professional academic, legal, or financial advice. Results may vary. We are not liable for decisions made based on content found here.</p>
      </Section>

      <Section title="7. Governing law">
        <p>These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
      </Section>

      <Section title="8. Contact">
        <p>For any questions about these terms, contact us at <a href="mailto:studentsroadmap@gmail.com" style={{ color: "var(--color-accent)" }}>studentsroadmap@gmail.com</a>.</p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-base font-semibold mb-3" style={{ color: "var(--color-text-heading)", fontFamily: "var(--font-inter)" }}>
        {title}
      </h2>
      <div className="text-sm leading-relaxed flex flex-col gap-2" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-inter)" }}>
        {children}
      </div>
    </div>
  );
}
