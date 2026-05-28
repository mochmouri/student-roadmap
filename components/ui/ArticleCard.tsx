import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

interface Article {
  _id: string;
  titleEn: string;
  titleAr?: string;
  excerptEn?: string;
  excerptAr?: string;
  slug: { current: string };
  stage: number;
  category?: string;
  authorName?: string;
}

interface Props {
  article: Article;
}

const STAGE_SLUGS = ["before-sixth-form", "sixth-form", "applications", "university-life", "building-your-future"];

export default function ArticleCard({ article }: Props) {
  const locale = useLocale();
  const t = useTranslations("common");

  const title = locale === "ar" && article.titleAr ? article.titleAr : article.titleEn;
  const excerpt = locale === "ar" && article.excerptAr ? article.excerptAr : article.excerptEn;
  const stageSlug = STAGE_SLUGS[(article.stage ?? 1) - 1];
  const href = `/${locale}/stages/${stageSlug}/${article.slug.current}`;

  return (
    <article
      className="group flex flex-col gap-2 py-6 border-b"
      style={{ borderColor: "var(--color-border)" }}
    >
      {article.category && (
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.09em" }}
        >
          {article.category}
        </span>
      )}
      <h3 className="text-xl font-display leading-snug">
        <Link
          href={href}
          className="no-underline transition-opacity group-hover:opacity-70"
          style={{ color: "var(--color-text-heading)" }}
        >
          {title}
        </Link>
      </h3>
      {excerpt && (
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {excerpt}
        </p>
      )}
      <Link
        href={href}
        className="text-sm font-medium mt-1 no-underline"
        style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)" }}
      >
        {t("readMore")} →
      </Link>
    </article>
  );
}
