import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

interface Props {
  stageNumber: number;
}

const STAGE_SLUGS = ["before-sixth-form", "sixth-form", "applications", "university-life", "building-your-future"];

// Roman numeral labels for visual interest
const ROMAN = ["I", "II", "III", "IV", "V"];

export default function StageCard({ stageNumber }: Props) {
  const locale = useLocale();
  const t = useTranslations("stages");
  const key = String(stageNumber) as "1" | "2" | "3" | "4" | "5";

  const href = `/${locale}/stages/${STAGE_SLUGS[stageNumber - 1]}`;

  return (
    <Link
      href={href}
      className="group block no-underline rounded-sm p-6 transition-colors"
      style={{
        border: "1px solid var(--color-border)",
        background: "var(--color-bg)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--color-surface-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--color-bg)";
      }}
    >
      <div
        className="text-5xl font-display font-bold mb-4 leading-none opacity-20"
        style={{ color: "var(--color-darkest)" }}
      >
        {ROMAN[stageNumber - 1]}
      </div>
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-1"
        style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
      >
        {t(`${key}.subtitle`)}
      </p>
      <h3
        className="text-xl font-display font-semibold mb-3 leading-snug"
        style={{ color: "var(--color-text-heading)" }}
      >
        {t(`${key}.title`)}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}
      >
        {t(`${key}.description`)}
      </p>
      <span
        className="inline-block mt-4 text-sm font-medium"
        style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)" }}
      >
        Explore →
      </span>
    </Link>
  );
}
