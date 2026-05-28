import { useTranslations } from "next-intl";

interface Resource {
  _id: string;
  title: string;
  type: string;
  url?: string;
  description?: string;
  stage?: number;
  category?: string;
  author?: string;
}

interface Props {
  resource: Resource;
}

const TYPE_ICONS: Record<string, string> = {
  book: "📖",
  article: "📄",
  video: "▶",
  podcast: "🎧",
  other: "→",
};

export default function ResourceCard({ resource }: Props) {
  const t = useTranslations("resources");

  return (
    <div
      className="flex gap-4 py-5 border-b"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Type icon */}
      <div
        className="shrink-0 w-10 h-10 flex items-center justify-center rounded-sm text-sm"
        style={{ background: "var(--color-surface)", color: "var(--color-accent)" }}
        aria-hidden
      >
        {TYPE_ICONS[resource.type] ?? "→"}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2 mb-1">
          <h3
            className="text-base font-display font-semibold leading-snug"
            style={{ color: "var(--color-text-heading)" }}
          >
            {resource.title}
          </h3>
          {resource.author && (
            <span className="text-sm" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
              — {resource.author}
            </span>
          )}
        </div>

        {resource.category && (
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)" }}
          >
            {resource.category}
          </span>
        )}

        {resource.description && (
          <p
            className="text-sm leading-relaxed mt-1"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}
          >
            {resource.description}
          </p>
        )}

        {resource.url && resource.url !== "#" && (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm font-medium no-underline hover:underline"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)" }}
          >
            {t("visit")}
          </a>
        )}
      </div>
    </div>
  );
}
