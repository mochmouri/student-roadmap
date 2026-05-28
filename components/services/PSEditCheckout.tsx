"use client";

import { useState } from "react";

interface Props {
  locale: string;
  payBtn: string;
  payBtnLoading: string;
}

export default function PSEditCheckout({ locale, payBtn, payBtnLoading }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePay() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "ps-edit", locale }),
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
      {error && (
        <p className="text-sm mb-4" style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)" }}>
          {error}
        </p>
      )}
      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full py-3 text-sm font-semibold rounded-sm transition-opacity"
        style={{
          background: "var(--color-accent)",
          color: "#fff",
          fontFamily: "var(--font-inter)",
          border: "none",
          opacity: loading ? 0.7 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? payBtnLoading : payBtn}
      </button>
      <p className="text-xs text-center mt-4" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
        Secure payment via Stripe. You&apos;ll submit your draft after checkout.
      </p>
    </div>
  );
}
