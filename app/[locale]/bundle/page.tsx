import { getTranslations, setRequestLocale } from "next-intl/server";
import { auth } from "@/auth";
import Link from "next/link";
import CheckoutButton from "@/components/ui/CheckoutButton";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "bundle" });
  return { title: t("heading") };
}

const BUNDLE_ITEMS = [
  "item1", "item2", "item3", "item4", "item5", "item6",
] as const;

export default async function BundlePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, session] = await Promise.all([
    getTranslations({ locale, namespace: "bundle" }),
    auth(),
  ]);

  const hasBundle = session?.user?.hasBundle ?? false;
  const BUNDLE_VARIANT_ID = process.env.LEMON_SQUEEZY_BUNDLE_VARIANT_ID ?? "";

  return (
    <div className="max-w-6xl mx-auto px-5 section-pad">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left: copy */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
          >
            {t("label")}
          </p>
          <h1
            className="text-5xl md:text-6xl font-display font-bold leading-tight mb-5"
            style={{ color: "var(--color-text-heading)" }}
          >
            {t("heading")}
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            {t("subheading")}
          </p>

          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}
          >
            {t("includes")}
          </p>
          <ul className="flex flex-col gap-3 mb-10">
            {BUNDLE_ITEMS.map((key) => (
              <li key={key} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-inter)" }}>
                <span style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "0.1em" }}>✓</span>
                {t(key)}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: purchase card */}
        <div
          className="rounded-sm p-8 sticky top-20"
          style={{ border: "2px solid var(--color-accent)", background: "var(--color-surface)" }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}
          >
            {t("label")}
          </p>
          <div className="mb-2">
            <span className="text-5xl font-display font-bold" style={{ color: "var(--color-text-heading)" }}>
              {t("price")}
            </span>
          </div>
          <p className="text-sm mb-8" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            {t("priceNote")}
          </p>

          {hasBundle ? (
            <div className="mb-4">
              <div
                className="text-center py-3 text-sm font-semibold rounded-sm mb-3"
                style={{ background: "rgba(213,62,15,0.08)", color: "var(--color-accent)", fontFamily: "var(--font-inter)", border: "1px solid var(--color-accent)" }}
              >
                {t("alreadyOwned")}
              </div>
              <Link
                href={`/${locale}/bundle/download`}
                className="block text-center py-3 text-sm font-semibold no-underline rounded-sm transition-opacity hover:opacity-90"
                style={{ background: "var(--color-accent)", color: "#fff", fontFamily: "var(--font-inter)" }}
              >
                {t("downloadCta")}
              </Link>
            </div>
          ) : (
            <CheckoutButton
              variantId={BUNDLE_VARIANT_ID}
              label={t("cta")}
              disabled={!BUNDLE_VARIANT_ID}
              disabledLabel="Coming soon"
              redirectTo={`/${locale}/bundle/download?success=true`}
              className="w-full py-3 text-sm font-semibold rounded-sm transition-opacity hover:opacity-90 cursor-pointer mb-4"
              style={{ background: "var(--color-accent)", color: "#fff", fontFamily: "var(--font-inter)", border: "none" }}
            />
          )}

          <p className="text-xs text-center" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            {t("vatNote")}
          </p>
        </div>
      </div>
    </div>
  );
}
