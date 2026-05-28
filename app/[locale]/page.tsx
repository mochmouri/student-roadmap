import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getFeaturedArticles } from "@/sanity/lib/queries";
import { placeholderArticles } from "@/lib/placeholder-data";
import ArticleCard from "@/components/ui/ArticleCard";
import StageCard from "@/components/ui/StageCard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return { title: "Home", description: t("heroParagraph") };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  // Try Sanity first, fall back to placeholder data
  let articles = await getFeaturedArticles(4).catch(() => []);
  if (!articles.length) articles = placeholderArticles.slice(0, 4);

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section
        className="border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="max-w-6xl mx-auto px-5 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            {/* Eyebrow */}
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.12em" }}
            >
              Grade 9 → MSc Graduation
            </p>

            <h1
              className="text-5xl md:text-6xl font-display font-bold leading-tight text-balance mb-6"
              style={{ color: "var(--color-text-heading)" }}
            >
              {t("heroTagline")}
            </h1>

            <p
              className="text-lg leading-relaxed mb-8 max-w-prose"
              style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}
            >
              {t("heroParagraph")}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/stages/before-sixth-form`}
                className="px-5 py-2.5 text-sm font-medium rounded-sm no-underline transition-opacity hover:opacity-85"
                style={{ background: "var(--color-accent)", color: "white", fontFamily: "var(--font-inter)" }}
              >
                {t("heroCtaPrimary")}
              </Link>
              <Link
                href={`/${locale}/roadmap`}
                className="px-5 py-2.5 text-sm font-medium rounded-sm no-underline border transition-colors hover:bg-[var(--color-surface)]"
                style={{
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {t("heroCtaSecondary")}
              </Link>
            </div>
          </div>

          {/* Right side: typographic decoration */}
          <div className="hidden md:block" aria-hidden>
            <div
              className="text-[11rem] font-display font-bold leading-none select-none opacity-[0.06]"
              style={{ color: "var(--color-darkest)" }}
            >
              A→
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stage selector ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 section-pad">
        <div className="mb-10">
          <h2 className="text-3xl font-display font-bold mb-2" style={{ color: "var(--color-text-heading)" }}>
            {t("stagesHeading")}
          </h2>
          <p className="text-base" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            {t("stagesSubheading")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <StageCard key={n} stageNumber={n} />
          ))}
        </div>
      </section>

      {/* ─── Featured articles ─────────────────────────────────── */}
      <section
        className="border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="max-w-6xl mx-auto px-5 section-pad">
          <h2
            className="text-2xl font-display font-bold mb-1"
            style={{ color: "var(--color-text-heading)" }}
          >
            {t("featuredArticles")}
          </h2>
          <p className="text-sm mb-8" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            Start anywhere. Everything is written to stand alone.
          </p>
          <div className="max-w-2xl">
            {articles.map((a: typeof articles[0]) => (
              <ArticleCard key={a._id} article={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
