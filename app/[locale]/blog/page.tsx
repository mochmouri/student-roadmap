import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getBlogEntries } from "@/sanity/lib/queries";
import { placeholderBlogEntries } from "@/lib/placeholder-data";
import BlogCard from "@/components/ui/BlogCard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: "Blog — Day in the Life", description: t("subheading") };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  let entries = await getBlogEntries().catch(() => []);
  if (!entries.length) entries = placeholderBlogEntries;

  return (
    <div className="max-w-6xl mx-auto px-5 section-pad">
      <div className="max-w-2xl mb-14">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.12em" }}
        >
          First-person
        </p>
        <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight text-balance mb-4" style={{ color: "var(--color-text-heading)" }}>
          {t("heading")}
        </h1>
        <p className="text-base leading-relaxed" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {t("subheading")}
        </p>
      </div>

      <div className="max-w-3xl">
        {entries.map((e: typeof entries[0]) => (
          <BlogCard key={e._id} entry={e} />
        ))}
      </div>
    </div>
  );
}
