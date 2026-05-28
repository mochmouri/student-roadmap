import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PortableText } from "@portabletext/react";
import { getIslamicFinancePage } from "@/sanity/lib/queries";
import TipBox from "@/components/ui/TipBox";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "islamicFinance" });
  return { title: t("heading"), description: t("calloutShort") };
}

export default async function IslamicFinancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "islamicFinance" });

  const page = await getIslamicFinancePage().catch(() => null);

  const title = locale === "ar" && page?.titleAr ? page.titleAr : (page?.titleEn ?? t("heading"));
  const hasBody = locale === "ar" ? !!page?.bodyAr?.length : !!page?.bodyEn?.length;
  const body = locale === "ar" ? page?.bodyAr : page?.bodyEn;

  return (
    <div className="max-w-6xl mx-auto px-5 section-pad">
      <div className="max-w-2xl">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.12em" }}
        >
          A note
        </p>
        <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight text-balance mb-8" style={{ color: "var(--color-text-heading)" }}>
          {title}
        </h1>

        {hasBody && body ? (
          <div className="portable-text text-base leading-relaxed" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-inter)" }}>
            <PortableText value={body} />
          </div>
        ) : (
          <>
            <div className="portable-text text-base leading-relaxed" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-inter)" }}>
              <p>
                Student loans in the UK, US, and many other countries are interest-based. For students approaching this from an Islamic finance perspective, this is a serious consideration — not a small one.
              </p>
              <p>
                Interest (<em>riba</em>) is prohibited in Islamic finance, and taking on an interest-bearing loan is something many Muslim students and families think carefully about before deciding to study abroad or take state-funded loans.
              </p>
              <p>
                This page is a placeholder. Detailed guidance covering options like the UK&apos;s Graduate Contribution Model (proposed), Shariah-compliant alternatives, scholarships and bursaries, and how to have this conversation with your family is being written and will appear here.
              </p>
              <p>
                In the meantime, a few starting points worth knowing:
              </p>
              <ul>
                <li>The UK Government proposed a Shariah-compliant alternative finance product for English students. Check the current status before applying — the policy environment changes.</li>
                <li>Some universities have hardship funds or interest-free bursaries that do not require you to take a state loan.</li>
                <li>Islamic banks and finance institutions in some countries offer student support — this varies heavily by country.</li>
                <li>Many students choose to study in countries with no or low tuition fees (Germany, Norway, some Gulf states) specifically to avoid this issue.</li>
              </ul>
            </div>

            <TipBox label="This page is a placeholder">
              Full guidance on Islamic finance considerations for students is coming. If you have specific questions in the meantime, the best resources are specialists in Islamic finance — not generic student finance advice.
            </TipBox>
          </>
        )}
      </div>
    </div>
  );
}
