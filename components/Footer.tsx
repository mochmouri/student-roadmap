import Link from "next/link";
import { useTranslations } from "next-intl";

interface Props {
  locale: string;
}

export default function Footer({ locale }: Props) {
  const t = useTranslations("footer");
  const m = useTranslations("meta");

  const href = (path: string) => `/${locale}${path}`;

  return (
    <footer
      className="border-t mt-auto"
      style={{ borderColor: "var(--color-border)", background: "var(--color-bg-secondary)" }}
    >
      <div className="max-w-6xl mx-auto px-5 py-10 grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <p className="font-display text-base font-semibold mb-2" style={{ color: "var(--color-text-heading)" }}>
            {m("siteName")}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            {t("tagline")}
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-2">
          <FooterLink href={href("/roadmap")}>Roadmap</FooterLink>
          <FooterLink href={href("/blog")}>Blog</FooterLink>
          <FooterLink href={href("/resources")}>Resources</FooterLink>
          <FooterLink href={href("/islamic-finance")}>Islamic Finance</FooterLink>
        </nav>

        {/* Stages */}
        <nav className="flex flex-col gap-2">
          {[1,2,3,4,5].map((n) => (
            <FooterLink key={n} href={href(`/stages/${["before-sixth-form","sixth-form","applications","university-life","building-your-future"][n-1]}`)}>
              Stage {n}
            </FooterLink>
          ))}
        </nav>
      </div>

      <div
        className="border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="max-w-6xl mx-auto px-5 py-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            © {new Date().getFullYear()} {m("siteName")}. {t("rights")}
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm transition-colors hover:opacity-80 no-underline"
      style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}
    >
      {children}
    </Link>
  );
}
