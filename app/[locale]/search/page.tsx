"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { searchContent } from "@/sanity/lib/queries";
import { placeholderArticles, placeholderBlogEntries } from "@/lib/placeholder-data";
import SearchBar from "@/components/ui/SearchBar";

interface Result {
  _id: string;
  _type: string;
  titleEn: string;
  excerptEn?: string;
  description?: string;
  slug?: { current: string };
  stage?: number;
}

const STAGE_SLUGS = ["before-sixth-form", "sixth-form", "applications", "university-life", "building-your-future"];

export default function SearchPage() {
  const t = useTranslations("search");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) { setResults([]); return; }
    setLoading(true);

    // Try Sanity search, fall back to client-side filter of placeholder data
    searchContent(query)
      .then((data) => {
        if (data.length) { setResults(data as Result[]); return; }
        // Local fallback
        const q = query.toLowerCase();
        const local: Result[] = [
          ...placeholderArticles
            .filter((a) => a.titleEn.toLowerCase().includes(q) || a.excerptEn?.toLowerCase().includes(q))
            .map((a) => ({ _id: a._id, _type: "article", titleEn: a.titleEn, excerptEn: a.excerptEn, slug: a.slug, stage: a.stage })),
          ...placeholderBlogEntries
            .filter((b) => b.title.toLowerCase().includes(q) || b.bio?.toLowerCase().includes(q))
            .map((b) => ({ _id: b._id, _type: "blogEntry", titleEn: b.title, excerptEn: b.bio, slug: b.slug })),
        ];
        setResults(local);
      })
      .catch(() => {
        const q = query.toLowerCase();
        const local: Result[] = [
          ...placeholderArticles
            .filter((a) => a.titleEn.toLowerCase().includes(q))
            .map((a) => ({ _id: a._id, _type: "article", titleEn: a.titleEn, excerptEn: a.excerptEn, slug: a.slug, stage: a.stage })),
        ];
        setResults(local);
      })
      .finally(() => setLoading(false));
  }, [query]);

  const getHref = (r: Result) => {
    if (r._type === "blogEntry") return `/${locale}/blog/${r.slug?.current ?? ""}`;
    if (r._type === "article" && r.stage) return `/${locale}/stages/${STAGE_SLUGS[r.stage - 1]}/${r.slug?.current ?? ""}`;
    return `/${locale}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-5 section-pad">
      <h1 className="text-4xl font-display font-bold mb-8" style={{ color: "var(--color-text-heading)" }}>
        {t("heading")}
      </h1>

      <div className="max-w-xl mb-12">
        <SearchBar autoFocus={!query} />
      </div>

      {loading && (
        <p style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>{t("searching")}</p>
      )}

      {!loading && query && results.length === 0 && (
        <p style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>{t("noResults")}</p>
      )}

      {!loading && results.length > 0 && (
        <div className="max-w-2xl flex flex-col">
          {results.map((r) => (
            <div key={r._id} className="py-5 border-b" style={{ borderColor: "var(--color-border)" }}>
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)" }}
              >
                {r._type === "blogEntry" ? "Blog" : "Article"}
              </span>
              <h2 className="text-lg font-display font-semibold mt-1 mb-1">
                <Link href={getHref(r)} className="no-underline hover:underline" style={{ color: "var(--color-text-heading)" }}>
                  {r.titleEn}
                </Link>
              </h2>
              {(r.excerptEn || r.description) && (
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
                  {r.excerptEn ?? r.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
