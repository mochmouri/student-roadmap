"use client";

import { useState } from "react";

interface Props {
  variantId: string;
  label: string;
  disabled?: boolean;
  disabledLabel?: string;
  redirectTo?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function CheckoutButton({ variantId, label, disabled, disabledLabel, redirectTo, className, style }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (disabled) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId, redirectTo }),
      });
      const { checkoutUrl, error } = await res.json() as { checkoutUrl?: string; error?: string };
      if (error || !checkoutUrl) throw new Error(error ?? "No URL");
      window.location.href = checkoutUrl;
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={className}
      style={style}
    >
      {loading ? "Loading…" : disabled ? (disabledLabel ?? label) : label}
    </button>
  );
}
