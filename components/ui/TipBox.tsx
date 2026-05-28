interface Props {
  children: React.ReactNode;
  label?: string;
}

// General-purpose styled callout for tips and notes.
// Visually distinct from IslamicFinanceCallout (uses cream/dark palette, no icon).
export default function TipBox({ children, label = "Worth knowing" }: Props) {
  return (
    <aside
      className="my-6 rounded-sm px-5 py-4 text-sm"
      style={{
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        fontFamily: "var(--font-inter)",
      }}
      role="note"
    >
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-2"
        style={{ color: "var(--color-accent)", letterSpacing: "0.1em" }}
      >
        {label}
      </p>
      <div style={{ color: "var(--color-text-primary)" }}>{children}</div>
    </aside>
  );
}
