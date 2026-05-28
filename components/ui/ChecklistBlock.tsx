"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

interface ChecklistItem {
  _key: string;
  textEn: string;
  textAr?: string;
}

interface Props {
  id: string;
  titleEn: string;
  titleAr?: string;
  items: ChecklistItem[];
}

export default function ChecklistBlock({ id, titleEn, titleAr, items }: Props) {
  const locale = useLocale();
  const t = useTranslations("checklist");
  const storageKey = `checklist-${id}`;

  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setChecked(new Set(JSON.parse(stored)));
    } catch {
      // localStorage unavailable — proceed without persistence
    }
  }, [storageKey]);

  const toggle = (key: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) { next.delete(key); } else { next.add(key); }
      try {
        localStorage.setItem(storageKey, JSON.stringify([...next]));
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
      } catch {
        // ignore
      }
      return next;
    });
  };

  const reset = () => {
    setChecked(new Set());
    try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
  };

  const title = locale === "ar" && titleAr ? titleAr : titleEn;
  const completedCount = checked.size;

  return (
    <div
      className="rounded-sm p-6 my-6"
      style={{ border: "1px solid var(--color-border)", background: "var(--color-surface)" }}
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h3 className="text-lg font-display font-semibold" style={{ color: "var(--color-text-heading)" }}>
            {title}
          </h3>
          <p className="text-xs mt-1" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            {completedCount}/{items.length} {t("completed")}
            {saved && <span className="ms-2 text-green-600 dark:text-green-400">✓ {t("save")}</span>}
          </p>
        </div>
        <button
          onClick={reset}
          className="text-xs px-3 py-1 rounded-sm border transition-colors hover:bg-[var(--color-surface-hover)] shrink-0"
          style={{
            color: "var(--color-text-secondary)",
            borderColor: "var(--color-border)",
            fontFamily: "var(--font-inter)",
          }}
        >
          {t("reset")}
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full mb-5 overflow-hidden" style={{ background: "var(--color-border)" }}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${items.length ? (completedCount / items.length) * 100 : 0}%`,
            background: "var(--color-accent)",
          }}
        />
      </div>

      <ul className="flex flex-col gap-2">
        {items.map((item) => {
          const text = locale === "ar" && item.textAr ? item.textAr : item.textEn;
          const done = checked.has(item._key);
          return (
            <li key={item._key}>
              <label
                className="flex items-start gap-3 cursor-pointer group"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span
                  className="mt-0.5 w-5 h-5 shrink-0 rounded-sm border flex items-center justify-center transition-colors"
                  style={{
                    borderColor: done ? "var(--color-accent)" : "var(--color-border)",
                    background: done ? "var(--color-accent)" : "transparent",
                  }}
                >
                  {done && (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={done}
                  onChange={() => toggle(item._key)}
                />
                <span
                  className="text-sm leading-relaxed transition-opacity"
                  style={{
                    color: "var(--color-text-primary)",
                    opacity: done ? 0.5 : 1,
                    textDecoration: done ? "line-through" : "none",
                  }}
                >
                  {text}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
