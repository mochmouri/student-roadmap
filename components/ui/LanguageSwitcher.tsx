"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const next = locale === "en" ? "ar" : "en";
    // Replace the leading locale segment in the path
    const stripped = pathname.replace(/^\/(en|ar)/, "");
    router.push(`/${next}${stripped || "/"}`);
  };

  return (
    <button
      onClick={toggleLocale}
      aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
      className="text-sm font-body tracking-wide px-2 py-1 rounded-sm transition-colors hover:bg-[var(--color-surface)]"
      style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}
    >
      {locale === "en" ? "عربي" : "EN"}
    </button>
  );
}
