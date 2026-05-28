import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getBlogEntryBySlug } from "@/sanity/lib/queries";
import { placeholderBlogEntries } from "@/lib/placeholder-data";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getBlogEntryBySlug(slug).catch(() => null) ??
    placeholderBlogEntries.find((e) => e.slug.current === slug);
  if (!entry) return {};
  return { title: entry.title, description: entry.bio };
}

export default async function BlogEntryPage({ params }: Props) {
  const { locale, slug } = await params;

  let entry = await getBlogEntryBySlug(slug).catch(() => null);
  let isPlaceholder = false;

  if (!entry) {
    const ph = placeholderBlogEntries.find((e) => e.slug.current === slug);
    if (ph) { entry = ph; isPlaceholder = true; }
    else notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-5 section-pad">
      {/* Breadcrumb */}
      <nav className="mb-10 text-sm" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
        <Link href={`/${locale}`} className="no-underline hover:underline" style={{ color: "var(--color-text-secondary)" }}>Home</Link>
        <span className="mx-2">›</span>
        <Link href={`/${locale}/blog`} className="no-underline hover:underline" style={{ color: "var(--color-text-secondary)" }}>Blog</Link>
        <span className="mx-2">›</span>
        <span>{entry.authorName}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-14">
        <article className="lg:col-span-2">
          {/* Author block */}
          <div className="mb-8 pb-8 border-b" style={{ borderColor: "var(--color-border)" }}>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
            >
              Day in the Life
            </p>
            <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight text-balance mb-4" style={{ color: "var(--color-text-heading)" }}>
              {entry.title}
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
              <span className="font-semibold" style={{ color: "var(--color-text-primary)" }}>{entry.authorName}</span>
              <span>{entry.career}</span>
              {entry.countryOfStudy && <span>{entry.countryOfStudy}</span>}
              {entry.publishedAt && <span>{formatDate(entry.publishedAt, locale)}</span>}
            </div>
            {entry.bio && (
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
                {entry.bio}
              </p>
            )}
          </div>

          {/* Body */}
          <div className="portable-text text-base leading-relaxed" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-inter)" }}>
            {isPlaceholder ? (
              <PortableText value={(entry as { body?: Parameters<typeof PortableText>[0]["value"] }).body ?? []} />
            ) : (
              <PortableText value={entry.body ?? []} />
            )}
            {isPlaceholder && (
              <p className="mt-6" style={{ color: "var(--color-text-secondary)" }}>
                [Full entry to be added in Sanity Studio at <code>/studio</code>.]
              </p>
            )}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div
            className="p-5 rounded-sm"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
            >
              About the author
            </p>
            <p className="font-display font-semibold mb-1" style={{ color: "var(--color-text-heading)" }}>
              {entry.authorName}
            </p>
            <p className="text-sm" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
              {entry.career}{entry.countryOfStudy && ` · ${entry.countryOfStudy}`}
            </p>
            {entry.bio && (
              <p className="text-sm mt-3 leading-relaxed" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
                {entry.bio}
              </p>
            )}
          </div>

          <div className="mt-6">
            <Link
              href={`/${locale}/blog`}
              className="text-sm font-medium no-underline hover:underline"
              style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)" }}
            >
              ← All entries
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
