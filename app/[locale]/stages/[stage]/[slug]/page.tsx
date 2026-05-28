import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getArticleBySlug } from "@/sanity/lib/queries";
import { placeholderArticles } from "@/lib/placeholder-data";
import { SLUG_TO_STAGE, STAGE_SLUGS } from "@/lib/utils";
import IslamicFinanceCallout from "@/components/ui/IslamicFinanceCallout";
import ArticleCard from "@/components/ui/ArticleCard";
import { routing } from "@/lib/i18n-routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    placeholderArticles.map((a) => ({
      locale,
      stage: STAGE_SLUGS[a.stage] ?? "before-sixth-form",
      slug: a.slug.current,
    }))
  );
}

interface Props {
  params: Promise<{ locale: string; stage: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug).catch(() => null);
  if (!article) {
    const ph = placeholderArticles.find((a) => a.slug.current === slug);
    if (!ph) return {};
    return { title: locale === "ar" && ph.titleAr ? ph.titleAr : ph.titleEn };
  }
  return { title: locale === "ar" && article.titleAr ? article.titleAr : article.titleEn };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, stage, slug } = await params;

  let article = await getArticleBySlug(slug).catch(() => null);

  // Fall back to placeholder if Sanity isn't connected
  let isPlaceholder = false;
  if (!article) {
    const ph = placeholderArticles.find((a) => a.slug.current === slug);
    if (ph) {
      article = ph;
      isPlaceholder = true;
    } else {
      notFound();
    }
  }

  const title = locale === "ar" && article.titleAr ? article.titleAr : article.titleEn;
  const stageNum = article.stage ?? SLUG_TO_STAGE[stage] ?? 1;
  const stageSlug = STAGE_SLUGS[stageNum] ?? stage;

  return (
    <div className="max-w-6xl mx-auto px-5 section-pad">
      {/* Breadcrumb */}
      <nav className="mb-10 text-sm flex flex-wrap gap-1 items-center" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
        <Link href={`/${locale}`} className="no-underline hover:underline" style={{ color: "var(--color-text-secondary)" }}>Home</Link>
        <span className="mx-1">›</span>
        <Link href={`/${locale}/stages/${stageSlug}`} className="no-underline hover:underline" style={{ color: "var(--color-text-secondary)" }}>
          Stage {stageNum}
        </Link>
        <span className="mx-1">›</span>
        <span>{title}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-14">
        {/* Article body */}
        <article className="lg:col-span-2">
          {article.category && (
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
            >
              {article.category}
            </p>
          )}

          <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight text-balance mb-6" style={{ color: "var(--color-text-heading)" }}>
            {title}
          </h1>

          {article.authorName && (
            <p className="text-sm mb-8" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
              By {article.authorName}
            </p>
          )}

          {/* Islamic finance callout before body if flagged */}
          {article.islamicFinanceCallout && <IslamicFinanceCallout />}

          {/* Body */}
          <div className="portable-text text-base leading-relaxed" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-inter)" }}>
            {isPlaceholder ? (
              <p style={{ color: "var(--color-text-secondary)" }}>
                This is a placeholder article. Add the full content in Sanity Studio at{" "}
                <code>/studio</code>.
              </p>
            ) : (
              <PortableText
                value={locale === "ar" && article.bodyAr ? article.bodyAr : article.bodyEn ?? []}
              />
            )}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {/* Related articles */}
          {article.relatedArticles?.length > 0 && (
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
              >
                Related reading
              </p>
              {article.relatedArticles.map((r: { _id: string }) => (
                <ArticleCard key={r._id} article={r as Parameters<typeof ArticleCard>[0]["article"]} />
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
