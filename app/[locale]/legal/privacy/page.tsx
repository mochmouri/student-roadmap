import { setRequestLocale } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata = { title: "Privacy Policy — The Student Roadmap" };

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <h1 className="text-3xl font-display font-bold mb-2" style={{ color: "var(--color-text-heading)" }}>
        Privacy Policy
      </h1>
      <p className="text-sm mb-10" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
        Last updated: June 2026
      </p>

      <Section title="1. Who we are">
        <p>The Student Roadmap is operated as a personal project. You can reach us at <a href="mailto:studentsroadmap@gmail.com" style={{ color: "var(--color-accent)" }}>studentsroadmap@gmail.com</a>.</p>
      </Section>

      <Section title="2. What we collect">
        <p className="mb-3">We collect the minimum needed to operate the site:</p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li><strong>Email address</strong> — when you sign in or make a purchase, to manage your account and send you relevant emails.</li>
          <li><strong>Name</strong> — optionally, if provided during sign-in.</li>
          <li><strong>Payment information</strong> — handled entirely by Stripe or Lemon Squeezy. We never see or store your card details.</li>
          <li><strong>Form submissions</strong> — if you submit a personal statement for editing, it is emailed to us and stored only as long as needed to complete the service.</li>
          <li><strong>Usage data</strong> — basic, anonymised analytics from Vercel (page views, errors). No tracking cookies.</li>
        </ul>
      </Section>

      <Section title="3. How we use it">
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>To authenticate you and maintain your account</li>
          <li>To send magic-link sign-in emails</li>
          <li>To fulfil purchases (grant premium access, deliver edited documents)</li>
          <li>To contact you about your order if needed</li>
        </ul>
        <p className="mt-3">We do not sell your data. We do not send marketing emails without your consent.</p>
      </Section>

      <Section title="4. Third-party services">
        <p className="mb-3">We share data with the following services only to the extent necessary:</p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li><strong>Supabase</strong> — database hosting (email, account status)</li>
          <li><strong>Stripe</strong> — payment processing for consultations and PS editing</li>
          <li><strong>Lemon Squeezy</strong> — payment processing for subscriptions and the bundle</li>
          <li><strong>Resend</strong> — transactional email delivery (sign-in links, order confirmation)</li>
          <li><strong>Sanity</strong> — content management (no personal data stored)</li>
          <li><strong>Vercel</strong> — site hosting and infrastructure</li>
          <li><strong>Calendly</strong> — consultation booking (your email is passed to pre-fill the booking form)</li>
        </ul>
      </Section>

      <Section title="5. Your rights (UK GDPR)">
        <p className="mb-3">If you are based in the UK or EU, you have the right to:</p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Object to or restrict how we process your data</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p className="mt-3">To exercise any of these rights, email <a href="mailto:studentsroadmap@gmail.com" style={{ color: "var(--color-accent)" }}>studentsroadmap@gmail.com</a>.</p>
      </Section>

      <Section title="6. Data retention">
        <p>We retain your account data for as long as your account is active. Personal statement submissions are deleted within 30 days of delivery. You can request deletion at any time.</p>
      </Section>

      <Section title="7. Cookies">
        <p>We use a single session cookie to keep you signed in. We do not use advertising or tracking cookies.</p>
      </Section>

      <Section title="8. Contact">
        <p>For any privacy-related questions or requests, contact <a href="mailto:studentsroadmap@gmail.com" style={{ color: "var(--color-accent)" }}>studentsroadmap@gmail.com</a>.</p>
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
