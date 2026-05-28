import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getTimelineMilestones } from "@/sanity/lib/queries";
import { placeholderMilestones } from "@/lib/placeholder-data";
import Timeline from "@/components/ui/Timeline";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "roadmap" });
  return { title: "Roadmap", description: t("subheading") };
}

export default async function RoadmapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "roadmap" });

  let milestones = await getTimelineMilestones().catch(() => []);
  if (!milestones.length) milestones = placeholderMilestones;

  return (
    <div className="max-w-6xl mx-auto px-5 section-pad">
      {/* Header */}
      <div className="max-w-2xl mb-14">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.12em" }}
        >
          The full picture
        </p>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 leading-tight text-balance" style={{ color: "var(--color-text-heading)" }}>
          {t("heading")}
        </h1>
        <p className="text-base leading-relaxed" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {t("subheading")}
        </p>
      </div>

      <Timeline milestones={milestones} />
    </div>
  );
}
