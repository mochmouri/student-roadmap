"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { placeholderResources } from "@/lib/placeholder-data";
import ResourceCard from "@/components/ui/ResourceCard";

const TYPES = ["book", "article", "video", "podcast", "other"];
const STAGES = [1, 2, 3, 4, 5];

export default function ResourcesPage() {
  const t = useTranslations("resources");
  const [stageFilter, setStageFilter] = useState<number | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const filtered = placeholderResources.filter((r) => {
    if (stageFilter && r.stage !== stageFilter && r.stage !== 0) return false;
    if (typeFilter && r.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-5 section-pad">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.12em" }}
        >
          Curated
        </p>
        <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight text-balance mb-4" style={{ color: "var(--color-text-heading)" }}>
          {t("heading")}
        </h1>
        <p className="text-base leading-relaxed" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {t("subheading")}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-10">
        {/* Stage filter */}
        <div>
          <p className="text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            {t("filterBy")} stage
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip active={stageFilter === null} onClick={() => setStageFilter(null)}>
              {t("allStages")}
            </FilterChip>
            {STAGES.map((s) => (
              <FilterChip key={s} active={stageFilter === s} onClick={() => setStageFilter(s)}>
                Stage {s}
              </FilterChip>
            ))}
          </div>
        </div>

        {/* Type filter */}
        <div>
          <p className="text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            {t("filterBy")} type
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip active={typeFilter === null} onClick={() => setTypeFilter(null)}>
              {t("allTypes")}
            </FilterChip>
            {TYPES.map((tp) => (
              <FilterChip key={tp} active={typeFilter === tp} onClick={() => setTypeFilter(tp)}>
                {t(tp as "book" | "article" | "video" | "podcast" | "other")}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="max-w-3xl">
        {filtered.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            No resources match those filters.
          </p>
        ) : (
          filtered.map((r) => <ResourceCard key={r._id} resource={r} />)
        )}
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 text-sm rounded-sm border transition-colors"
      style={{
        background: active ? "var(--color-accent)" : "transparent",
        borderColor: active ? "var(--color-accent)" : "var(--color-border)",
        color: active ? "white" : "var(--color-text-secondary)",
        fontFamily: "var(--font-inter)",
      }}
    >
      {children}
    </button>
  );
}
