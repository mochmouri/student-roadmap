import { getTranslations, setRequestLocale } from "next-intl/server";
import { auth, signOut } from "@/auth";
import Link from "next/link";
import CheckoutButton from "@/components/ui/CheckoutButton";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ success?: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return { title: t("heading") };
}

const FREE_FEATURES = ["freeF1", "freeF2", "freeF3", "freeF4", "freeF5"] as const;
const PREMIUM_FEATURES = ["premiumF1", "premiumF2", "premiumF3", "premiumF4", "premiumF5"] as const;

export default async function PricingPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { success } = await searchParams;
  setRequestLocale(locale);

  const [t, session] = await Promise.all([
    getTranslations({ locale, namespace: "pricing" }),
    auth(),
  ]);

  const isPremium = session?.user?.isPremium ?? false;
  const hasBundle = session?.user?.hasBundle ?? false;
  const isLoggedIn = !!session?.user;

  const SUBSCRIPTION_VARIANT_ID = process.env.LEMON_SQUEEZY_SUBSCRIPTION_VARIANT_ID ?? "";
  const BUNDLE_VARIANT_ID = process.env.LEMON_SQUEEZY_BUNDLE_VARIANT_ID ?? "";

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: `/${locale}/pricing` });
  }

  return (
    <div className="max-w-6xl mx-auto px-5 section-pad">
      {/* Success banner */}
      {success && (
        <div
          className="mb-10 px-5 py-4 rounded-sm text-sm"
          style={{ background: "rgba(213,62,15,0.08)", border: "1px solid var(--color-accent)", color: "var(--color-accent)", fontFamily: "var(--font-inter)" }}
        >
          {t("successBanner")}
        </div>
      )}

      {/* Header */}
      <div className="mb-14 max-w-xl">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
        >
          Pricing
        </p>
        <h1
          className="text-5xl md:text-6xl font-display font-bold leading-tight mb-5"
          style={{ color: "var(--color-text-heading)" }}
        >
          {t("heading")}
        </h1>
        <p className="text-base" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {t("subheading")}
        </p>
      </div>

      {/* Auth status */}
      {isLoggedIn && (
        <div
          className="mb-10 flex items-center justify-between px-5 py-3 rounded-sm"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <span className="text-sm" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            {t("signedInAs")} <span style={{ color: "var(--color-text-primary)" }}>{session?.user?.email}</span>
            {isPremium && (
              <span
                className="ms-3 px-2 py-0.5 text-xs font-semibold rounded-sm"
                style={{ background: "var(--color-accent)", color: "#fff" }}
              >
                Premium
              </span>
            )}
            {hasBundle && !isPremium && (
              <span
                className="ms-3 px-2 py-0.5 text-xs font-semibold rounded-sm"
                style={{ background: "var(--color-darkest)", color: "var(--color-cream)" }}
              >
                Bundle
              </span>
            )}
          </span>
          <form action={handleSignOut}>
            <button
              type="submit"
              className="text-xs hover:underline"
              style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}
            >
              {t("signOut")}
            </button>
          </form>
        </div>
      )}

      {/* Tier cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Free tier */}
        <div
          className="rounded-sm p-8 flex flex-col"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}>
            {t("freeTierName")}
          </p>
          <div className="mb-6">
            <span className="text-5xl font-display font-bold" style={{ color: "var(--color-text-heading)" }}>
              {t("freePrice")}
            </span>
          </div>
          <p className="text-sm mb-8" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            {t("freeDescription")}
          </p>
          <ul className="flex flex-col gap-3 mb-10 flex-1">
            {FREE_FEATURES.map((key) => (
              <li key={key} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-inter)" }}>
                <span style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "0.1em" }}>✓</span>
                {t(key)}
              </li>
            ))}
          </ul>
          <Link
            href={`/${locale}`}
            className="block text-center py-3 text-sm font-semibold no-underline rounded-sm transition-colors"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-inter)",
            }}
          >
            {t("freeCta")}
          </Link>
        </div>

        {/* Premium tier */}
        <div
          className="rounded-sm p-8 flex flex-col"
          style={{ background: "var(--color-darkest)", color: "var(--color-cream)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "rgba(238,217,185,0.6)", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}>
            {t("premiumTierName")}
          </p>
          <div className="mb-1 flex items-end gap-1">
            <span className="text-5xl font-display font-bold" style={{ color: "var(--color-cream)" }}>
              {t("premiumPrice")}
            </span>
            <span className="text-sm mb-2" style={{ color: "rgba(238,217,185,0.6)", fontFamily: "var(--font-inter)" }}>
              {t("premiumPeriod")}
            </span>
          </div>
          <p className="text-sm mb-8" style={{ color: "rgba(238,217,185,0.7)", fontFamily: "var(--font-inter)" }}>
            {t("premiumDescription")}
          </p>
          <ul className="flex flex-col gap-3 mb-10 flex-1">
            {PREMIUM_FEATURES.map((key) => (
              <li key={key} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-cream)", fontFamily: "var(--font-inter)" }}>
                <span style={{ color: "#D53E0F", flexShrink: 0, marginTop: "0.1em" }}>✓</span>
                {t(key)}
              </li>
            ))}
          </ul>

          {isPremium ? (
            <div
              className="text-center py-3 text-sm font-semibold rounded-sm"
              style={{ background: "rgba(238,217,185,0.1)", color: "var(--color-cream)", fontFamily: "var(--font-inter)" }}
            >
              {t("alreadyPremium")}
            </div>
          ) : isLoggedIn ? (
            <CheckoutButton
              variantId={SUBSCRIPTION_VARIANT_ID}
              label={t("premiumCta")}
              disabled={!SUBSCRIPTION_VARIANT_ID}
              disabledLabel="Coming soon"
              className="w-full py-3 text-sm font-semibold rounded-sm transition-opacity hover:opacity-90 cursor-pointer"
              style={{ background: "var(--color-accent)", color: "#fff", fontFamily: "var(--font-inter)", border: "none" }}
            />
          ) : (
            <Link
              href={`/${locale}/sign-in?callbackUrl=/${locale}/pricing`}
              className="block text-center py-3 text-sm font-semibold no-underline rounded-sm transition-opacity hover:opacity-90"
              style={{ background: "var(--color-accent)", color: "#fff", fontFamily: "var(--font-inter)" }}
            >
              {t("premiumCtaLoggedOut")}
            </Link>
          )}
        </div>
      </div>

      {/* Bundle */}
      <div
        className="rounded-sm p-8"
        style={{ border: "2px solid var(--color-accent)", background: "var(--color-surface)" }}
      >
        <div className="md:flex md:items-center md:justify-between gap-8">
          <div className="mb-6 md:mb-0">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}>
              {t("bundleName")}
            </p>
            <h3 className="text-2xl font-display font-bold mb-2" style={{ color: "var(--color-text-heading)" }}>
              {t("bundleTagline")}
            </h3>
            <p className="text-sm" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
              {t("bundleDescription")}
            </p>
          </div>
          <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
            <span className="text-sm font-semibold" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
              {t("bundlePrice")}
            </span>
            {hasBundle ? (
              <div
                className="px-6 py-2.5 text-sm font-semibold rounded-sm"
                style={{ background: "var(--color-surface)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)", fontFamily: "var(--font-inter)" }}
              >
                {t("bundleOwned")}
              </div>
            ) : (
              <CheckoutButton
                variantId={BUNDLE_VARIANT_ID}
                label={t("bundleCta")}
                disabled={!BUNDLE_VARIANT_ID}
                disabledLabel="Coming soon"
                className="px-6 py-2.5 text-sm font-semibold rounded-sm transition-opacity hover:opacity-90 cursor-pointer"
                style={{ background: "var(--color-accent)", color: "#fff", fontFamily: "var(--font-inter)", border: "none" }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-8 text-xs text-center" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
        {t("vatNote")}
      </p>
    </div>
  );
}
