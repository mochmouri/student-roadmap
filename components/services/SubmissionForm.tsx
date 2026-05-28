"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface Option {
  value: string;
  label: string;
}

interface Strings {
  heading: string;
  subheading: string;
  fieldLabel: string;
  fieldPlaceholder: string;
  countryLabel: string;
  countryOptions: Option[];
  worryLabel: string;
  worryPlaceholder: string;
  turnaroundLabel: string;
  turnaroundOptions: Option[];
  cvLabel: string;
  cvHint: string;
  statementLabel: string;
  statementPlaceholder: string;
  submitBtn: string;
  submitBtnLoading: string;
}

interface Props {
  sessionId: string;
  locale: string;
  strings: Strings;
}

const MAX_CV_BYTES = 5 * 1024 * 1024;

export default function SubmissionForm({ sessionId, locale, strings: s }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [field, setField] = useState("");
  const [country, setCountry] = useState(s.countryOptions[0].value);
  const [worry, setWorry] = useState("");
  const [turnaround, setTurnaround] = useState(s.turnaroundOptions[0].value);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [statement, setStatement] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > MAX_CV_BYTES) {
      setError("CV file must be under 5 MB.");
      e.target.value = "";
      return;
    }
    setCvFile(file);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!field.trim() || !statement.trim()) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("sessionId", sessionId);
      formData.append("field", field.trim());
      formData.append("country", country);
      formData.append("turnaround", turnaround);
      formData.append("statement", statement.trim());
      if (worry.trim()) formData.append("worry", worry.trim());
      if (cvFile) formData.append("cv", cvFile);

      const res = await fetch("/api/submit-ps-edit", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const { error: apiErr } = await res.json() as { error?: string };
        throw new Error(apiErr ?? "Submission failed");
      }

      router.push(`/${locale}/services/personal-statement/submitted`);
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="mb-10">
        <h1
          className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4"
          style={{ color: "var(--color-text-heading)" }}
        >
          {s.heading}
        </h1>
        <p className="text-base" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
          {s.subheading}
        </p>
      </div>

      <div className="flex flex-col gap-7">
        {/* Field */}
        <Field label={s.fieldLabel}>
          <input
            type="text"
            value={field}
            onChange={(e) => setField(e.target.value)}
            placeholder={s.fieldPlaceholder}
            required
            className="w-full px-4 py-2.5 text-sm rounded-sm"
            style={inputStyle}
          />
        </Field>

        {/* Country */}
        <Field label={s.countryLabel}>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-2.5 text-sm rounded-sm"
            style={inputStyle}
          >
            {s.countryOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>

        {/* Turnaround */}
        <Field label={s.turnaroundLabel}>
          <div className="flex gap-3">
            {s.turnaroundOptions.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => setTurnaround(o.value)}
                className="flex-1 py-2.5 text-sm font-medium rounded-sm transition-colors"
                style={{
                  border: `1px solid ${turnaround === o.value ? "var(--color-accent)" : "var(--color-border)"}`,
                  background: turnaround === o.value ? "rgba(213,62,15,0.06)" : "transparent",
                  color: turnaround === o.value ? "var(--color-accent)" : "var(--color-text-secondary)",
                  fontFamily: "var(--font-inter)",
                  cursor: "pointer",
                }}
              >
                {o.label}
              </button>
            ))}
          </div>
        </Field>

        {/* Statement */}
        <Field label={s.statementLabel}>
          <textarea
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            placeholder={s.statementPlaceholder}
            required
            rows={12}
            className="w-full px-4 py-2.5 text-sm rounded-sm resize-y"
            style={inputStyle}
          />
        </Field>

        {/* Worry */}
        <Field label={s.worryLabel}>
          <textarea
            value={worry}
            onChange={(e) => setWorry(e.target.value)}
            placeholder={s.worryPlaceholder}
            rows={3}
            className="w-full px-4 py-2.5 text-sm rounded-sm resize-y"
            style={inputStyle}
          />
        </Field>

        {/* CV upload */}
        <Field label={s.cvLabel} hint={s.cvHint}>
          <div
            className="rounded-sm px-4 py-3 flex items-center gap-3 cursor-pointer"
            style={{ border: "1px solid var(--color-border)", background: "transparent" }}
            onClick={() => fileRef.current?.click()}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="text-sm" style={{ color: cvFile ? "var(--color-text-primary)" : "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
              {cvFile ? cvFile.name : "Choose file…"}
            </span>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </Field>
      </div>

      {error && (
        <p className="text-sm mt-6" style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !field.trim() || !statement.trim()}
        className="mt-8 px-8 py-3 text-sm font-semibold rounded-sm transition-opacity"
        style={{
          background: "var(--color-accent)",
          color: "#fff",
          fontFamily: "var(--font-inter)",
          border: "none",
          opacity: loading || !field.trim() || !statement.trim() ? 0.5 : 1,
          cursor: loading || !field.trim() || !statement.trim() ? "not-allowed" : "pointer",
        }}
      >
        {loading ? s.submitBtnLoading : s.submitBtn}
      </button>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  background: "transparent",
  border: "1px solid var(--color-border)",
  color: "var(--color-text-primary)",
  fontFamily: "var(--font-inter)",
  outline: "none",
};

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2" style={{ color: "var(--color-text-heading)", fontFamily: "var(--font-inter)" }}>
        {label}
        {hint && (
          <span className="font-normal ms-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
            {hint}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
