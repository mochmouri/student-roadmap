"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import SearchBar from "@/components/ui/SearchBar";

interface Props {
  locale: string;
}

const STAGES = [1, 2, 3, 4, 5];
const STAGE_SLUGS = ["before-sixth-form", "sixth-form", "applications", "university-life", "building-your-future"];

export default function Navbar({ locale }: Props) {
  const t = useTranslations("nav");
  const [stagesOpen, setStagesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const href = (path: string) => `/${locale}${path}`;

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{
        background: "var(--color-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center gap-6">
        {/* Wordmark */}
        <Link
          href={href("/")}
          className="font-display text-lg font-bold tracking-tight shrink-0 no-underline"
          style={{ color: "var(--color-text-heading)", textDecoration: "none" }}
        >
          TSR
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          <NavLink href={href("/roadmap")}>{t("roadmap")}</NavLink>

          {/* Stages dropdown */}
          <div className="relative">
            <button
              onClick={() => setStagesOpen((o) => !o)}
              onBlur={() => setTimeout(() => setStagesOpen(false), 150)}
              className="nav-link flex items-center gap-1 px-3 py-1.5 text-sm rounded-sm transition-colors hover:bg-[var(--color-surface)]"
              style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}
            >
              {t("stages")}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {stagesOpen && (
              <div
                className="absolute top-full mt-1 start-0 w-56 rounded-sm shadow-lg py-1 z-50"
                style={{
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {STAGES.map((n, i) => (
                  <Link
                    key={n}
                    href={href(`/stages/${STAGE_SLUGS[i]}`)}
                    className="block px-4 py-2 text-sm transition-colors hover:bg-[var(--color-surface)] no-underline"
                    style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-inter)" }}
                    onClick={() => setStagesOpen(false)}
                  >
                    <span style={{ color: "var(--color-accent)", marginInlineEnd: "0.5rem" }}>{n}</span>
                    {t(`stageTitles.${n}`)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink href={href("/blog")}>{t("blog")}</NavLink>
          <NavLink href={href("/resources")}>{t("resources")}</NavLink>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 ms-auto">
          {searchOpen ? (
            <div className="w-64">
              <SearchBar onClose={() => setSearchOpen(false)} autoFocus />
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              aria-label={t("search")}
              className="w-8 h-8 flex items-center justify-center rounded-sm transition-colors hover:bg-[var(--color-surface)]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          )}
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-8 h-8 flex items-center justify-center"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t px-5 py-4 flex flex-col gap-1" style={{ borderColor: "var(--color-border)", background: "var(--color-bg)" }}>
          <MobileLink href={href("/roadmap")} onClick={() => setMobileOpen(false)}>{t("roadmap")}</MobileLink>
          {STAGES.map((n, i) => (
            <MobileLink key={n} href={href(`/stages/${STAGE_SLUGS[i]}`)} onClick={() => setMobileOpen(false)}>
              <span style={{ color: "var(--color-accent)", marginInlineEnd: "0.5rem" }}>{n}.</span>{t(`stageTitles.${n}`)}
            </MobileLink>
          ))}
          <MobileLink href={href("/blog")} onClick={() => setMobileOpen(false)}>{t("blog")}</MobileLink>
          <MobileLink href={href("/resources")} onClick={() => setMobileOpen(false)}>{t("resources")}</MobileLink>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 text-sm rounded-sm transition-colors hover:bg-[var(--color-surface)] no-underline"
      style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}
    >
      {children}
    </Link>
  );
}

function MobileLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-2 py-2 text-sm rounded-sm transition-colors hover:bg-[var(--color-surface)] no-underline"
      style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-inter)" }}
    >
      {children}
    </Link>
  );
}
