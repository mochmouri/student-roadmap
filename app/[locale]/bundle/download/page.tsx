import { getTranslations, setRequestLocale } from "next-intl/server";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ success?: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "bundle" });
  return { title: t("downloadHeading") };
}

export default async function BundleDownloadPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { success } = await searchParams;
  setRequestLocale(locale);

  const [t, session] = await Promise.all([
    getTranslations({ locale, namespace: "bundle" }),
    auth(),
  ]);

  const hasBundle = session?.user?.hasBundle ?? false;

  // User just paid but webhook hasn't fired yet
  if (!hasBundle && success) {
    return (
      <div className="max-w-6xl mx-auto px-5 section-pad">
        <div className="max-w-md mx-auto text-center py-20">
          <div className="text-4xl mb-6">⏳</div>
          <h1 className="text-2xl font-display font-bold mb-4" style={{ color: "var(--color-text-heading)" }}>
            {t("processingHeading")}
          </h1>
          <p className="text-sm mb-8" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            {t("processingBody")}
          </p>
          <Link
            href={`/${locale}/bundle/download`}
            className="inline-block px-6 py-2.5 text-sm font-semibold no-underline rounded-sm transition-opacity hover:opacity-90"
            style={{ background: "var(--color-accent)", color: "#fff", fontFamily: "var(--font-inter)" }}
          >
            {t("refreshCta")}
          </Link>
        </div>
      </div>
    );
  }

  if (!hasBundle) {
    redirect(`/${locale}/bundle`);
  }

  return (
    <div className="max-w-6xl mx-auto px-5 section-pad">
      <div className="max-w-xl">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-5"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
        >
          {t("label")}
        </p>
        <h1
          className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4"
          style={{ color: "var(--color-text-heading)" }}
        >
          {t("downloadHeading")}
        </h1>
        <p className="text-base mb-10" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {t("downloadSubheading")}
        </p>

        <a
          href="/downloads/bundle.zip"
          download
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold no-underline rounded-sm transition-opacity hover:opacity-90 mb-6"
          style={{ background: "var(--color-accent)", color: "#fff", fontFamily: "var(--font-inter)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {t("downloadCta")}
        </a>

        <p className="text-xs" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {t("downloadNote")}
        </p>
      </div>
    </div>
  );
}

/*
  Lemon Squeezy built-in file delivery setup:
  1. In your Lemon Squeezy dashboard, go to your bundle product → Files
  2. Upload the bundle.zip file there
  3. Lemon Squeezy will automatically email customers a download link after purchase
  4. The download link in this page (/downloads/bundle.zip) serves the file from /public/downloads/
     Add your bundle.zip to /public/downloads/ before going live
*/
