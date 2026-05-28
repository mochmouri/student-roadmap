export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(dateString: string, locale: string = "en"): string {
  return new Date(dateString).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const STAGE_SLUGS: Record<number, string> = {
  1: "before-sixth-form",
  2: "sixth-form",
  3: "applications",
  4: "university-life",
  5: "building-your-future",
};

export const SLUG_TO_STAGE: Record<string, number> = {
  "before-sixth-form": 1,
  "sixth-form": 2,
  "applications": 3,
  "university-life": 4,
  "building-your-future": 5,
};
