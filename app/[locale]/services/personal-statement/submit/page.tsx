import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import SubmissionForm from "@/components/services/SubmissionForm";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}

export const dynamic = "force-dynamic";

export default async function SubmitPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { session_id } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "services" });

  if (!session_id) {
    redirect(`/${locale}/services/personal-statement`);
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  let paid = false;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    paid = session.payment_status === "paid";
  } catch {
    redirect(`/${locale}/services/personal-statement`);
  }

  if (!paid) {
    return (
      <div className="max-w-6xl mx-auto px-5 section-pad">
        <div className="max-w-lg">
          <h1 className="text-4xl font-display font-bold mb-5" style={{ color: "var(--color-text-heading)" }}>
            {t("processingHeading")}
          </h1>
          <p className="text-base mb-8" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            {t("processingBody")}
          </p>
          <Link
            href={`/${locale}/services/personal-statement/submit?session_id=${session_id}`}
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-sm no-underline transition-opacity hover:opacity-90"
            style={{ background: "var(--color-accent)", color: "#fff", fontFamily: "var(--font-inter)" }}
          >
            {t("refreshCta")}
          </Link>
        </div>
      </div>
    );
  }

  const formStrings = {
    heading: t("psEditFormHeading"),
    subheading: t("psEditFormSubheading"),
    fieldLabel: t("fieldLabel"),
    fieldPlaceholder: t("fieldPlaceholder"),
    countryLabel: t("countryLabel"),
    countryOptions: [
      { value: "ucas", label: t("countryUcas") },
      { value: "common-app", label: t("countryCommonApp") },
      { value: "other", label: t("countryOther") },
    ],
    worryLabel: t("worryLabel"),
    worryPlaceholder: t("worryPlaceholder"),
    turnaroundLabel: t("turnaroundLabel"),
    turnaroundOptions: [
      { value: "72h", label: t("turnaround72") },
      { value: "5d", label: t("turnaround5d") },
    ],
    cvLabel: t("cvLabel"),
    cvHint: t("cvHint"),
    statementLabel: t("statementLabel"),
    statementPlaceholder: t("statementPlaceholder"),
    submitBtn: t("submitBtn"),
    submitBtnLoading: t("submitBtnLoading"),
  };

  return (
    <div className="max-w-6xl mx-auto px-5 section-pad">
      <SubmissionForm
        sessionId={session_id}
        locale={locale}
        strings={formStrings}
      />
    </div>
  );
}
