import { getTranslations, setRequestLocale } from "next-intl/server";
import { withPremium } from "@/components/auth/withPremium";
import StatementReviewer from "@/components/tools/StatementReviewer";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools" });
  return { title: t("statementReviewer") };
}

async function PersonalStatementReviewerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "tools" });

  return (
    <div className="max-w-6xl mx-auto px-5 section-pad">
      <div className="mb-10">
        <Link
          href={`/${locale}/tools`}
          className="text-xs font-semibold no-underline hover:underline"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}
        >
          ← {t("backToTools")}
        </Link>
      </div>

      <div className="mb-10 max-w-xl">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
        >
          Premium Tool
        </p>
        <h1
          className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4"
          style={{ color: "var(--color-text-heading)" }}
        >
          {t("statementReviewer")}
        </h1>
        <p className="text-base" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {t("statementReviewerSubheading")}
        </p>
      </div>

      <StatementReviewer />
    </div>
  );
}

export default withPremium(PersonalStatementReviewerPage);
