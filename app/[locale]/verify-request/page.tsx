import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth" });
  return { title: t("checkEmailTitle") };
}

export default async function VerifyRequestPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "auth" });

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <div className="w-full max-w-sm text-center">
        <div
          className="w-12 h-12 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-accent)" }}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>

        <h1
          className="text-3xl font-display font-bold mb-3"
          style={{ color: "var(--color-text-heading)" }}
        >
          {t("checkEmailTitle")}
        </h1>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {t("checkEmailBody")}
        </p>

        <Link
          href={`/${locale}`}
          className="text-sm no-underline hover:underline"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)" }}
        >
          ← {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
