import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}

export const dynamic = "force-dynamic";

export default async function BookedPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { session_id } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "services" });

  if (!session_id) {
    redirect(`/${locale}/services/consultation`);
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  let customerEmail = "";
  let paid = false;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    paid = session.payment_status === "paid";
    customerEmail = session.customer_details?.email ?? session.customer_email ?? "";
  } catch {
    redirect(`/${locale}/services/consultation`);
  }

  if (!paid) {
    redirect(`/${locale}/services/consultation`);
  }

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";
  const calendlyHref = customerEmail
    ? `${calendlyUrl}?email=${encodeURIComponent(customerEmail)}`
    : calendlyUrl;

  return (
    <div className="max-w-6xl mx-auto px-5 section-pad">
      <div className="max-w-lg">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center mb-8"
          style={{ background: "rgba(213,62,15,0.1)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1
          className="text-4xl md:text-5xl font-display font-bold leading-tight mb-5"
          style={{ color: "var(--color-text-heading)" }}
        >
          {t("bookedHeading")}
        </h1>
        <p className="text-base mb-10" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {t("bookedBody")}
        </p>
        {calendlyUrl ? (
          <a
            href={calendlyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-sm no-underline transition-opacity hover:opacity-90"
            style={{ background: "var(--color-accent)", color: "#fff", fontFamily: "var(--font-inter)" }}
          >
            {t("bookedCalendlyCta")}
          </a>
        ) : (
          <p className="text-sm" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            Calendly link not configured — contact me directly.
          </p>
        )}
        <div className="mt-10">
          <Link
            href={`/${locale}`}
            className="text-sm no-underline hover:underline"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}
          >
            ← {t("submittedBackHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
