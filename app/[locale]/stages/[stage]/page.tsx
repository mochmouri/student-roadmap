import type { Metadata } from "next";
import Link from "next/link";
import { getArticlesByStage, getChecklistsByStage } from "@/sanity/lib/queries";
import { placeholderArticles, placeholderChecklists, STAGES } from "@/lib/placeholder-data";
import { SLUG_TO_STAGE } from "@/lib/utils";
import ArticleCard from "@/components/ui/ArticleCard";
import ChecklistBlock from "@/components/ui/ChecklistBlock";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ locale: string; stage: string }>;
}

const STAGE_TITLES: Record<number, { en: string; ar: string; subtitle: { en: string; ar: string } }> = {
  1: { en: "Before Sixth Form", ar: "قبل السنة السادسة", subtitle: { en: "Grades 9–11", ar: "الصفوف 9–11" } },
  2: { en: "Sixth Form & Pre-University", ar: "السنة السادسة وما قبل الجامعة", subtitle: { en: "Grades 11–13", ar: "الصفوف 11–13" } },
  3: { en: "University Applications", ar: "التقديم الجامعي", subtitle: { en: "The application process", ar: "مرحلة التقديم" } },
  4: { en: "University Life", ar: "الحياة الجامعية", subtitle: { en: "Years 1–3 and beyond", ar: "السنوات الأولى وما بعدها" } },
  5: { en: "Building Your Future", ar: "بناء مستقبلك", subtitle: { en: "Internships, CVs, and beyond", ar: "التدريب والسيرة الذاتية وما بعدها" } },
};

const STAGE_INTROS: Record<number, string> = {
  1: "The years where habits form and options stay open. What you do now quietly shapes everything that follows — more than you probably realise.",
  2: "This is where choices start to matter. Exam systems, university research, clubs, mental health. There's a lot happening at once, and most of it can be handled if you start early.",
  3: "Probably the most stressful stage on paper — but it's manageable. The students who struggle most are the ones who leave it all too late. Here's what to do and when.",
  4: "Nobody tells you how different university is from everything before it. The freedom is real, so are the pitfalls. Here's what actually helps.",
  5: "You don't need to have everything figured out. But there are a few things worth thinking about before graduation day arrives.",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, stage } = await params;
  const stageNum = SLUG_TO_STAGE[stage];
  if (!stageNum) return {};
  const info = STAGE_TITLES[stageNum];
  const title = locale === "ar" ? info.ar : info.en;
  return { title, description: STAGE_INTROS[stageNum] };
}

export function generateStaticParams() {
  return STAGES.flatMap(({ slug }) =>
    ["en", "ar"].map((locale) => ({ locale, stage: slug }))
  );
}

export default async function StagePage({ params }: Props) {
  const { locale, stage } = await params;
  const stageNum = SLUG_TO_STAGE[stage];

  if (!stageNum) notFound();

  const info = STAGE_TITLES[stageNum];
  const title = locale === "ar" ? info.ar : info.en;
  const subtitle = locale === "ar" ? info.subtitle.ar : info.subtitle.en;

  let articles = await getArticlesByStage(stageNum).catch(() => []);
  if (!articles.length) articles = placeholderArticles.filter((a) => a.stage === stageNum);

  let checklists = await getChecklistsByStage(stageNum).catch(() => []);
  if (!checklists.length) checklists = placeholderChecklists.filter((c) => c.stage === stageNum);

  return (
    <div className="max-w-6xl mx-auto px-5 section-pad">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
        <Link href={`/${locale}`} className="no-underline hover:underline" style={{ color: "var(--color-text-secondary)" }}>Home</Link>
        <span className="mx-2">›</span>
        <span>Stage {stageNum}</span>
      </nav>

      {/* Header */}
      <div className="mb-14 max-w-2xl">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.12em" }}
        >
          Stage {stageNum} · {subtitle}
        </p>
        <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight text-balance mb-4" style={{ color: "var(--color-text-heading)" }}>
          {title}
        </h1>
        <p className="text-base leading-relaxed" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {STAGE_INTROS[stageNum]}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main: Articles */}
        <div className="lg:col-span-2">
          {articles.length > 0 ? (
            articles.map((a: typeof articles[0]) => <ArticleCard key={a._id} article={a} />)
          ) : (
            <p style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
              Content for this stage is coming soon.
            </p>
          )}
        </div>

        {/* Sidebar: Checklists */}
        {checklists.length > 0 && (
          <aside className="lg:col-span-1">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
            >
              Checklists for this stage
            </p>
            {checklists.map((cl: typeof checklists[0]) => (
              <ChecklistBlock
                key={cl._id}
                id={cl._id}
                titleEn={cl.titleEn}
                titleAr={cl.titleAr}
                items={cl.items ?? []}
              />
            ))}
          </aside>
        )}
      </div>
    </div>
  );
}
