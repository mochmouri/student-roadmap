import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function SubmittedPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });

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
          {t("submittedHeading")}
        </h1>
        <p className="text-base mb-10" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {t("submittedBody")}
        </p>
        <Link
          href={`/${locale}`}
          className="text-sm no-underline hover:underline"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}
        >
          ← {t("submittedBackHome")}
        </Link>
      </div>
    </div>
  );
}
