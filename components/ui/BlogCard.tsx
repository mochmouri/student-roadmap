import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/lib/utils";

interface BlogEntry {
  _id: string;
  title: string;
  slug: { current: string };
  authorName: string;
  career: string;
  countryOfStudy?: string;
  bio?: string;
  publishedAt?: string;
}

interface Props {
  entry: BlogEntry;
}

export default function BlogCard({ entry }: Props) {
  const locale = useLocale();
  const t = useTranslations("blog");

  const href = `/${locale}/blog/${entry.slug.current}`;

  return (
    <article
      className="group py-8 border-b"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
        <span className="font-display text-base font-semibold" style={{ color: "var(--color-text-heading)" }}>
          {entry.authorName}
        </span>
        <span className="text-sm" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {entry.career}
          {entry.countryOfStudy && ` · ${entry.countryOfStudy}`}
        </span>
      </div>

      <h3 className="text-2xl font-display leading-snug mb-3">
        <Link
          href={href}
          className="no-underline transition-opacity group-hover:opacity-70"
          style={{ color: "var(--color-text-heading)" }}
        >
          {entry.title}
        </Link>
      </h3>

      {entry.bio && (
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {entry.bio}
        </p>
      )}

      <div className="flex items-center gap-4">
        <Link
          href={href}
          className="text-sm font-medium no-underline"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)" }}
        >
          {t("readMore")} →
        </Link>
        {entry.publishedAt && (
          <span className="text-xs" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            {formatDate(entry.publishedAt, locale)}
          </span>
        )}
      </div>
    </article>
  );
}
