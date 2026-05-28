import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { withPremium } from "@/components/auth/withPremium";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools" });
  return { title: t("heading") };
}

const TOOLS = [
  {
    key: "statementReviewer",
    href: "/tools/personal-statement-reviewer",
    status: "live" as const,
    descKey: "statementReviewerDesc",
  },
  {
    key: "cvReviewer",
    href: "/tools/cv-reviewer",
    status: "live" as const,
    descKey: "cvReviewerDesc",
  },
  {
    key: "interviewPrep",
    href: null,
    status: "soon" as const,
    descKey: "interviewPrepDesc",
  },
  {
    key: "universityMatch",
    href: null,
    status: "soon" as const,
    descKey: "universityMatchDesc",
  },
];

async function ToolsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "tools" });

  return (
    <div className="max-w-6xl mx-auto px-5 section-pad">
      <div className="mb-14 max-w-xl">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
        >
          Premium
        </p>
        <h1
          className="text-5xl md:text-6xl font-display font-bold leading-tight mb-5"
          style={{ color: "var(--color-text-heading)" }}
        >
          {t("heading")}
        </h1>
        <p className="text-base" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {t("subheading")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {TOOLS.map((tool) => {
          const isLive = tool.status === "live";
          const card = (
            <div
              className="rounded-sm p-7 flex flex-col gap-3 h-full"
              style={{
                border: `1px solid ${isLive ? "var(--color-border)" : "var(--color-border)"}`,
                background: isLive ? "var(--color-surface)" : "transparent",
                opacity: isLive ? 1 : 0.5,
              }}
            >
              <div className="flex items-center justify-between">
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: isLive ? "var(--color-accent)" : "var(--color-text-secondary)", fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}
                >
                  {isLive ? "Available" : t("comingSoonLabel")}
                </p>
              </div>
              <h2
                className="text-xl font-display font-bold"
                style={{ color: "var(--color-text-heading)" }}
              >
                {t(tool.key as Parameters<typeof t>[0])}
              </h2>
              <p className="text-sm flex-1" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
                {t(tool.descKey as Parameters<typeof t>[0])}
              </p>
              {isLive && (
                <span
                  className="self-start text-xs font-semibold mt-1"
                  style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)" }}
                >
                  Open →
                </span>
              )}
            </div>
          );

          return isLive && tool.href ? (
            <Link key={tool.key} href={`/${locale}${tool.href}`} className="no-underline block">
              {card}
            </Link>
          ) : (
            <div key={tool.key}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}

export default withPremium(ToolsPage);
