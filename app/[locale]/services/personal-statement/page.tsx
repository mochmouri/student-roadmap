import { getTranslations, setRequestLocale } from "next-intl/server";
import PSEditCheckout from "@/components/services/PSEditCheckout";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("psEditTitle") };
}

export default async function PSEditPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });

  const included = [
    "Tracked-changes edited version of your full draft",
    "Written commentary explaining every significant change",
    "One round of revisions after you've reviewed the edits",
    "Turnaround: 72 hours or 5 days (your choice, same price)",
  ];

  return (
    <div className="max-w-6xl mx-auto px-5 section-pad">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left: copy */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
          >
            {t("psEditLabel")}
          </p>
          <h1
            className="text-5xl md:text-6xl font-display font-bold leading-tight mb-5"
            style={{ color: "var(--color-text-heading)" }}
          >
            {t("psEditTitle")}
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            {t("psEditDesc")}
          </p>

          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}
          >
            What&apos;s included
          </p>
          <ul className="flex flex-col gap-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-inter)" }}>
                <span style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "0.1em" }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: purchase card */}
        <div
          className="rounded-sm p-8 sticky top-20"
          style={{ border: "2px solid var(--color-accent)", background: "var(--color-surface)" }}
        >
          <div className="mb-6">
            <span className="text-5xl font-display font-bold" style={{ color: "var(--color-text-heading)" }}>
              {t("psEditPrice")}
            </span>
            <span className="text-sm ms-2" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
              {t("psEditPeriod")}
            </span>
          </div>
          <PSEditCheckout
            locale={locale}
            payBtn={t("psEditCta")}
            payBtnLoading={t("payBtnLoading")}
          />
        </div>
      </div>
    </div>
  );
}
