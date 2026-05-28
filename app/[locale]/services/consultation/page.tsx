import { getTranslations, setRequestLocale } from "next-intl/server";
import ConsultationCheckout from "@/components/services/ConsultationCheckout";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("consultTitle") };
}

const SESSION_TYPES = [
  "sessionTypePsReview",
  "sessionTypeShortlist",
  "sessionTypeCareer",
] as const;

export default async function ConsultationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });

  const sessionTypes = SESSION_TYPES.map((key) => ({
    key,
    label: t(key),
    desc: t(`${key}Desc` as Parameters<typeof t>[0]),
  }));

  const faqItems = [
    { q: t("faqQ1"), a: t("faqA1") },
    { q: t("faqQ2"), a: t("faqA2") },
    { q: t("faqQ3"), a: t("faqA3") },
  ];

  return (
    <div className="max-w-6xl mx-auto px-5 section-pad">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left: copy + FAQ */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
          >
            {t("consultLabel")}
          </p>
          <h1
            className="text-5xl md:text-6xl font-display font-bold leading-tight mb-5"
            style={{ color: "var(--color-text-heading)" }}
          >
            {t("consultTitle")}
          </h1>
          <p className="text-base mb-12" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            {t("consultDesc")}
          </p>

          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}
            >
              {t("faqHeading")}
            </p>
            <div className="flex flex-col gap-6">
              {faqItems.map(({ q, a }) => (
                <div key={q}>
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-text-heading)", fontFamily: "var(--font-inter)" }}>
                    {q}
                  </p>
                  <p className="text-sm" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
                    {a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: booking card */}
        <div
          className="rounded-sm p-8 sticky top-20"
          style={{ border: "2px solid var(--color-accent)", background: "var(--color-surface)" }}
        >
          <div className="mb-6">
            <span className="text-5xl font-display font-bold" style={{ color: "var(--color-text-heading)" }}>
              {t("consultPrice")}
            </span>
            <span className="text-sm ms-2" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
              {t("consultPeriod")}
            </span>
          </div>
          <ConsultationCheckout
            locale={locale}
            sessionTypes={sessionTypes}
            typeLabel={t("sessionTypeLabel")}
            typePlaceholder={t("sessionTypePlaceholder")}
            payBtn={t("payBtn")}
            payBtnLoading={t("payBtnLoading")}
          />
        </div>
      </div>
    </div>
  );
}
