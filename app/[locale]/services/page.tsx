import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("hubHeading") };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <div className="max-w-6xl mx-auto px-5 section-pad">
      <div className="mb-16 max-w-xl">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
        >
          {t("hubLabel")}
        </p>
        <h1
          className="text-5xl md:text-6xl font-display font-bold leading-tight mb-5"
          style={{ color: "var(--color-text-heading)" }}
        >
          {t("hubHeading")}
        </h1>
        <p className="text-base" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {t("hubSubheading")}
        </p>
      </div>

      {/* Human services */}
      <div className="mb-6">
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}
        >
          {t("hubHuman")}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-16">
        <ServiceCard
          label={t("consultLabel")}
          title={t("consultTitle")}
          price={t("consultPrice")}
          period={t("consultPeriod")}
          desc={t("consultDesc")}
          cta={t("consultCardCta")}
          href={`/${locale}/services/consultation`}
          accent
        />
        <ServiceCard
          label={t("psEditLabel")}
          title={t("psEditTitle")}
          price={t("psEditPrice")}
          period={t("psEditPeriod")}
          desc={t("psEditDesc")}
          cta={t("psEditCardCta")}
          href={`/${locale}/services/personal-statement`}
          accent
        />
      </div>

      {/* Automated / self-serve */}
      <div className="mb-6">
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}
        >
          {t("hubAutomated")}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <ServiceCard
          label={t("hubAiToolsLabel")}
          title={t("hubAiToolsTitle")}
          desc={t("hubAiToolsDesc")}
          cta={t("hubAiToolsCta")}
          href={`/${locale}/tools`}
        />
        <ServiceCard
          label={t("hubBundleLabel")}
          title={t("hubBundleTitle")}
          desc={t("hubBundleDesc")}
          cta={t("hubBundleCta")}
          href={`/${locale}/bundle`}
        />
      </div>
    </div>
  );
}

function ServiceCard({
  label,
  title,
  price,
  period,
  desc,
  cta,
  href,
  accent = false,
}: {
  label: string;
  title: string;
  price?: string;
  period?: string;
  desc: string;
  cta: string;
  href: string;
  accent?: boolean;
}) {
  return (
    <Link href={href} className="no-underline block group">
      <div
        className="rounded-sm p-7 flex flex-col gap-3 h-full transition-colors"
        style={{
          border: `1px solid ${accent ? "var(--color-accent)" : "var(--color-border)"}`,
          background: "var(--color-surface)",
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}
        >
          {label}
        </p>
        <h2
          className="text-xl font-display font-bold"
          style={{ color: "var(--color-text-heading)" }}
        >
          {title}
        </h2>
        {price && (
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold" style={{ color: "var(--color-text-heading)" }}>
              {price}
            </span>
            {period && (
              <span className="text-sm" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
                {period}
              </span>
            )}
          </div>
        )}
        <p className="text-sm flex-1" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {desc}
        </p>
        <span
          className="self-start text-xs font-semibold mt-1 group-hover:underline"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)" }}
        >
          {cta}
        </span>
      </div>
    </Link>
  );
}
