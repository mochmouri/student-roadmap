import { setRequestLocale } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata = { title: "Refund Policy — The Student Roadmap" };

export default async function RefundsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <h1 className="text-3xl font-display font-bold mb-2" style={{ color: "var(--color-text-heading)" }}>
        Refund Policy
      </h1>
      <p className="text-sm mb-10" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
        Last updated: June 2026
      </p>

      <Section title="1:1 Consultation (£75)">
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li><strong>More than 24 hours before your scheduled slot</strong> — full refund, no questions asked.</li>
          <li><strong>Within 24 hours of your scheduled slot</strong> — no refund. You are welcome to reschedule via Calendly if you give notice at least 24 hours in advance.</li>
          <li><strong>No-show</strong> — no refund.</li>
        </ul>
        <p className="mt-3">To request a refund, email <a href="mailto:studentsroadmap@gmail.com" style={{ color: "var(--color-accent)" }}>studentsroadmap@gmail.com</a> with your booking reference.</p>
      </Section>

      <Section title="Personal Statement Editing (£149)">
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li><strong>Before you submit your draft</strong> — full refund on request.</li>
          <li><strong>After you submit your draft and editing has begun</strong> — no refund.</li>
          <li><strong>If your edited statement is not delivered within the agreed timeframe</strong> — full refund.</li>
        </ul>
        <p className="mt-3">To request a refund before submission, email <a href="mailto:studentsroadmap@gmail.com" style={{ color: "var(--color-accent)" }}>studentsroadmap@gmail.com</a>.</p>
      </Section>

      <Section title="The Bundle — digital download ($47)">
        <p>As a digital product made available for immediate download, the bundle is non-refundable once the download has been accessed. This is in accordance with the Consumer Contracts Regulations 2013, which exempt digital content from the standard 14-day right to cancel when the consumer has acknowledged that the right to cancel is lost upon download.</p>
        <p className="mt-2">If you have a technical issue accessing your files, contact us and we will resolve it.</p>
      </Section>

      <Section title="Premium Subscription ($12/month)">
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>You can cancel your subscription at any time from your account or by emailing us.</li>
          <li>Cancellation takes effect at the end of the current billing period. No further charges will be made.</li>
          <li>We do not offer partial refunds for unused time in the current billing period.</li>
        </ul>
      </Section>

      <Section title="Contact">
        <p>All refund requests should be sent to <a href="mailto:studentsroadmap@gmail.com" style={{ color: "var(--color-accent)" }}>studentsroadmap@gmail.com</a>. We aim to respond within 2 business days.</p>
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
