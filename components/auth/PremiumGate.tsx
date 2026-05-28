import { auth } from "@/auth";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  locale: string;
}

export async function PremiumGate({ children, locale }: Props) {
  const session = await auth();

  if (session?.user?.isPremium || session?.user?.hasBundle) {
    return <>{children}</>;
  }

  return (
    <div
      className="rounded-sm px-8 py-10 my-8 text-center"
      style={{ border: "1px solid var(--color-border)", background: "var(--color-surface)" }}
    >
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-3"
        style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
      >
        Premium
      </p>
      <h3
        className="text-2xl font-display font-bold mb-3"
        style={{ color: "var(--color-text-heading)" }}
      >
        This content is for Premium members
      </h3>
      <p
        className="text-sm mb-6 max-w-sm mx-auto"
        style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}
      >
        Unlock templates, frameworks, and deeper guides for $12/month — or grab the bundle once.
      </p>
      <Link
        href={`/${locale}/pricing`}
        className="inline-block px-6 py-2.5 text-sm font-semibold no-underline rounded-sm transition-opacity hover:opacity-90"
        style={{
          background: "var(--color-accent)",
          color: "#fff",
          fontFamily: "var(--font-inter)",
        }}
      >
        See pricing
      </Link>
    </div>
  );
}
