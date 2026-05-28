import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

interface Props {
  // Allow overriding the default short message
  message?: string;
}

// A distinctively styled callout for Islamic finance considerations.
// Appears wherever student loans or financial topics are covered.
export default function IslamicFinanceCallout({ message }: Props) {
  const t = useTranslations("islamicFinance");
  const locale = useLocale();

  return (
    <aside
      className="my-6 flex gap-4 rounded-sm px-5 py-4 text-sm"
      style={{
        borderInlineStart: "3px solid var(--color-accent)",
        background: "var(--color-surface)",
        fontFamily: "var(--font-inter)",
      }}
      role="note"
      aria-label="Islamic finance consideration"
    >
      {/* Crescent icon */}
      <span className="shrink-0 mt-0.5" style={{ color: "var(--color-accent)" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
      <div>
        <p className="font-semibold mb-1" style={{ color: "var(--color-text-heading)" }}>
          {t("heading")}
        </p>
        <p style={{ color: "var(--color-text-secondary)" }}>
          {message ?? t("calloutShort")}{" "}
          <Link
            href={`/${locale}/islamic-finance`}
            style={{ color: "var(--color-accent)" }}
          >
            {t("calloutLink")}
          </Link>
        </p>
      </div>
    </aside>
  );
}
