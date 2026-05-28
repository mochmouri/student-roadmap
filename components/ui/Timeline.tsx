"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

interface LinkedArticle {
  _id: string;
  titleEn: string;
  titleAr?: string;
  slug: { current: string };
  stage: number;
}

interface Milestone {
  _id: string;
  order: number;
  gradeLabel: string;
  titleEn: string;
  titleAr?: string;
  summaryEn?: string;
  summaryAr?: string;
  linkedArticles?: LinkedArticle[];
}

interface Props {
  milestones: Milestone[];
}

const STAGE_SLUGS = ["before-sixth-form", "sixth-form", "applications", "university-life", "building-your-future"];

export default function Timeline({ milestones }: Props) {
  const locale = useLocale();
  const t = useTranslations("roadmap");
  const [active, setActive] = useState<string | null>(milestones[0]?._id ?? null);

  return (
    <div className="relative">
      {/* Vertical spine — hidden on mobile, shown on md+ */}
      <div
        className="hidden md:block absolute start-[calc(13rem-1px)] top-0 bottom-0 w-px"
        style={{ background: "var(--color-border)" }}
        aria-hidden
      />

      <ol className="flex flex-col gap-0">
        {milestones.map((m, idx) => {
          const isActive = active === m._id;
          const title = locale === "ar" && m.titleAr ? m.titleAr : m.titleEn;
          const summary = locale === "ar" && m.summaryAr ? m.summaryAr : m.summaryEn;

          return (
            <li key={m._id} className="relative">
              {/* Mobile: simple stacked item */}
              <div className="md:hidden py-4 border-b" style={{ borderColor: "var(--color-border)" }}>
                <button
                  onClick={() => setActive(isActive ? null : m._id)}
                  className="w-full text-start"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-body shrink-0"
                      style={{
                        background: isActive ? "var(--color-accent)" : "var(--color-surface)",
                        color: isActive ? "white" : "var(--color-text-secondary)",
                      }}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-xs" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>{m.gradeLabel}</p>
                      <p className="font-display font-semibold" style={{ color: "var(--color-text-heading)" }}>{title}</p>
                    </div>
                  </div>
                </button>
                {isActive && summary && (
                  <div className="mt-3 ms-11 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
                    <p>{summary}</p>
                    <MilestoneLinks articles={m.linkedArticles} locale={locale} />
                  </div>
                )}
              </div>

              {/* Desktop: two-column layout */}
              <div className="hidden md:flex items-start gap-0 group">
                {/* Left: grade label */}
                <div className="w-52 shrink-0 pt-5 pe-6 text-end">
                  <span className="text-xs font-semibold" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
                    {m.gradeLabel}
                  </span>
                </div>

                {/* Node on the spine */}
                <button
                  onClick={() => setActive(isActive ? null : m._id)}
                  className="relative z-10 shrink-0 w-[2px] flex justify-center mt-5 focus:outline-none"
                  aria-expanded={isActive}
                  aria-label={`${m.gradeLabel}: ${title}`}
                >
                  <span
                    className="w-3 h-3 rounded-full border-2 transition-all duration-200 -translate-x-[calc(50%-1px)]"
                    style={{
                      borderColor: isActive ? "var(--color-accent)" : "var(--color-border)",
                      background: isActive ? "var(--color-accent)" : "var(--color-bg)",
                    }}
                  />
                </button>

                {/* Right: content */}
                <div
                  className="flex-1 ps-8 pb-8 pt-4 cursor-pointer"
                  onClick={() => setActive(isActive ? null : m._id)}
                >
                  <h3
                    className="text-lg font-display font-semibold mb-1 transition-colors"
                    style={{ color: isActive ? "var(--color-accent)" : "var(--color-text-heading)" }}
                  >
                    {title}
                  </h3>
                  {isActive && summary && (
                    <div className="mt-2">
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
                        {summary}
                      </p>
                      <MilestoneLinks articles={m.linkedArticles} locale={locale} />
                    </div>
                  )}
                  {!isActive && (
                    <p className="text-xs mt-1" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)", opacity: 0.6 }}>
                      {t("clickPrompt")}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function MilestoneLinks({ articles, locale }: { articles?: LinkedArticle[]; locale: string }) {
  if (!articles?.length) return null;
  return (
    <ul className="mt-3 flex flex-col gap-1">
      {articles.map((a) => {
        const title = locale === "ar" && a.titleAr ? a.titleAr : a.titleEn;
        const stageSlug = STAGE_SLUGS[(a.stage ?? 1) - 1];
        return (
          <li key={a._id}>
            <Link
              href={`/${locale}/stages/${stageSlug}/${a.slug.current}`}
              className="text-sm no-underline hover:underline"
              style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)" }}
              onClick={(e) => e.stopPropagation()}
            >
              → {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
