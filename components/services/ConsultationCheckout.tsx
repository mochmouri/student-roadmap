"use client";

import { useState } from "react";

interface SessionType {
  key: string;
  label: string;
  desc: string;
}

interface Props {
  locale: string;
  sessionTypes: SessionType[];
  typeLabel: string;
  typePlaceholder: string;
  payBtn: string;
  payBtnLoading: string;
}

export default function ConsultationCheckout({ locale, sessionTypes, typeLabel, payBtn, payBtnLoading }: Props) {
  const [selected, setSelected] = useState<SessionType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePay() {
    if (!selected) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "consultation", sessionType: selected.label, locale }),
      });
      const { checkoutUrl, error: apiError } = await res.json() as { checkoutUrl?: string; error?: string };
      if (apiError || !checkoutUrl) throw new Error(apiError ?? "No URL");
      window.location.href = checkoutUrl;
    } catch {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-3"
        style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}
      >
        {typeLabel}
      </p>

      <div className="flex flex-col gap-2 mb-6">
        {sessionTypes.map((type) => {
          const isActive = selected?.key === type.key;
          return (
            <button
              key={type.key}
              onClick={() => setSelected(type)}
              className="text-start rounded-sm px-4 py-3 transition-colors"
              style={{
                border: `1px solid ${isActive ? "var(--color-accent)" : "var(--color-border)"}`,
                background: isActive ? "rgba(213,62,15,0.06)" : "transparent",
                fontFamily: "var(--font-inter)",
                cursor: "pointer",
              }}
            >
              <p className="text-sm font-semibold" style={{ color: "var(--color-text-heading)" }}>
                {type.label}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
                {type.desc}
              </p>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-sm mb-4" style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)" }}>
          {error}
        </p>
      )}

      <button
        onClick={handlePay}
        disabled={!selected || loading}
        className="w-full py-3 text-sm font-semibold rounded-sm transition-opacity cursor-pointer"
        style={{
          background: selected ? "var(--color-accent)" : "var(--color-border)",
          color: selected ? "#fff" : "var(--color-text-secondary)",
          fontFamily: "var(--font-inter)",
          border: "none",
          opacity: loading ? 0.7 : 1,
          cursor: !selected || loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? payBtnLoading : payBtn}
      </button>
    </div>
  );
}
