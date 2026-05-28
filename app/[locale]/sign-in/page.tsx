import { signIn } from "@/auth";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth" });
  return { title: t("signInTitle") };
}

export default async function SignInPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { callbackUrl, error } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "auth" });

  async function handleSignIn(formData: FormData) {
    "use server";
    try {
      await signIn("resend", {
        email: formData.get("email") as string,
        redirectTo: callbackUrl ?? `/${locale}`,
      });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect(`/${locale}/sign-in?error=${err.type}`);
      }
      throw err;
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <Link
          href={`/${locale}`}
          className="inline-block mb-10 font-display text-xl font-bold no-underline"
          style={{ color: "var(--color-text-heading)" }}
        >
          TSR
        </Link>

        <h1
          className="text-3xl font-display font-bold mb-2"
          style={{ color: "var(--color-text-heading)" }}
        >
          {t("signInTitle")}
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {t("signInSubtext")}
        </p>

        {error && (
          <p
            className="text-sm mb-6 px-4 py-3 rounded-sm"
            style={{ background: "rgba(213,62,15,0.08)", color: "var(--color-accent)", fontFamily: "var(--font-inter)" }}
          >
            {t("signInError")}
          </p>
        )}

        <form action={handleSignIn} className="flex flex-col gap-4">
          <input
            name="email"
            type="email"
            required
            placeholder={t("emailPlaceholder")}
            className="w-full px-4 py-3 text-sm rounded-sm outline-none"
            style={{
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-inter)",
            }}
          />
          <button
            type="submit"
            className="w-full py-3 text-sm font-semibold rounded-sm transition-opacity hover:opacity-90"
            style={{ background: "var(--color-accent)", color: "#fff", fontFamily: "var(--font-inter)" }}
          >
            {t("sendLink")}
          </button>
        </form>

        <p className="mt-6 text-xs text-center" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {t("signInDisclaimer")}
        </p>
      </div>
    </div>
  );
}
