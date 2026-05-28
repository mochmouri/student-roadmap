"use client";

import { useState, FormEvent } from "react";

const MAX_CHARS = 4000;

const FIELDS = [
  { value: "Medicine", label: "Medicine" },
  { value: "Law", label: "Law" },
  { value: "Engineering", label: "Engineering" },
  { value: "Business", label: "Business" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Other", label: "Other" },
];

const SYSTEMS = [
  { value: "UCAS (UK)", label: "UCAS (UK)" },
  { value: "Common App (US)", label: "Common App (US)" },
  { value: "Other", label: "Other" },
];

type Line =
  | { type: "heading"; text: string }
  | { type: "bullet"; text: string }
  | { type: "bold"; text: string }
  | { type: "gap" }
  | { type: "text"; text: string };

function parseLine(line: string): Line {
  if (line.startsWith("## ")) return { type: "heading", text: line.slice(3) };
  if (line.startsWith("- ") || line.startsWith("• ")) return { type: "bullet", text: line.slice(2) };
  if (/^\*\*[^*]+\*\*$/.test(line.trim())) return { type: "bold", text: line.trim().slice(2, -2) };
  if (line.trim() === "") return { type: "gap" };
  return { type: "text", text: line };
}

function inlineBold(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}

function FeedbackPanel({ text }: { text: string }) {
  const lines = text.split("\n").map(parseLine);
  return (
    <div>
      {lines.map((line, i) => {
        if (line.type === "gap") return <div key={i} style={{ height: "0.5rem" }} />;
        if (line.type === "heading") return (
          <h3 key={i} className="font-display font-bold" style={{ fontSize: "1.05rem", color: "var(--color-text-heading)", marginTop: "1.5rem", marginBottom: "0.35rem" }}>
            {line.text.replace(/\*\*/g, "")}
          </h3>
        );
        if (line.type === "bold") return (
          <p key={i} className="font-semibold text-sm" style={{ color: "var(--color-text-heading)", fontFamily: "var(--font-inter)", marginTop: "0.75rem", marginBottom: "0.2rem" }}>
            {line.text}
          </p>
        );
        if (line.type === "bullet") return (
          <div key={i} className="flex items-start gap-2 mb-1">
            <span style={{ color: "var(--color-accent)", flexShrink: 0, fontSize: "0.8rem", lineHeight: "1.6rem" }}>—</span>
            <span className="text-sm" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-inter)", lineHeight: "1.6" }}>
              {inlineBold(line.text)}
            </span>
          </div>
        );
        return (
          <p key={i} className="text-sm" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-inter)", lineHeight: "1.6", marginBottom: "0.2rem" }}>
            {inlineBold(line.text)}
          </p>
        );
      })}
    </div>
  );
}

export default function StatementReviewer() {
  const [statement, setStatement] = useState("");
  const [field, setField] = useState("Medicine");
  const [targetSystem, setTargetSystem] = useState("UCAS (UK)");
  const [feedback, setFeedback] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const remaining = MAX_CHARS - statement.length;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFeedback("");
    setError("");
    setIsStreaming(true);

    try {
      const res = await fetch("/api/review-statement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statement, field, targetSystem }),
      });

      if (!res.ok || !res.body) {
        setError("Something went wrong. Please try again.");
        setIsStreaming(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setFeedback((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsStreaming(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(feedback);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const selectStyle: React.CSSProperties = {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text-primary)",
    fontFamily: "var(--font-inter)",
    fontSize: "0.875rem",
    borderRadius: "2px",
    padding: "0.5rem 0.75rem",
    outline: "none",
    width: "100%",
  };

  return (
    <div className="max-w-2xl">
      {!feedback && !isStreaming ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}>
              Your personal statement
            </label>
            <textarea
              value={statement}
              onChange={(e) => setStatement(e.target.value.slice(0, MAX_CHARS))}
              placeholder="Paste your personal statement here…"
              rows={14}
              className="w-full text-sm resize-none rounded-sm p-4"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-inter)",
                lineHeight: "1.6",
                outline: "none",
              }}
            />
            <p className="text-xs mt-1 text-right" style={{ color: remaining < 200 ? "var(--color-accent)" : "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
              {remaining.toLocaleString()} characters remaining
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}>
                Applying for
              </label>
              <select value={field} onChange={(e) => setField(e.target.value)} style={selectStyle}>
                {FIELDS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}>
                Target system
              </label>
              <select value={targetSystem} onChange={(e) => setTargetSystem(e.target.value)} style={selectStyle}>
                {SYSTEMS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={!statement.trim() || isStreaming}
            className="self-start px-6 py-2.5 text-sm font-semibold rounded-sm transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "var(--color-accent)", color: "#fff", fontFamily: "var(--font-inter)", border: "none", cursor: "pointer" }}
          >
            Get feedback
          </button>
        </form>
      ) : (
        <div>
          {isStreaming && !feedback && (
            <div className="flex items-center gap-2 mb-4" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}>
              <span className="animate-pulse">Reviewing…</span>
            </div>
          )}

          <div
            className="rounded-sm p-6 mb-6"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
          >
            <FeedbackPanel text={feedback} />
            {isStreaming && (
              <span className="inline-block w-1 h-4 ml-1 animate-pulse" style={{ background: "var(--color-accent)", verticalAlign: "middle" }} />
            )}
          </div>

          {!isStreaming && (
            <>
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 text-sm font-semibold rounded-sm transition-opacity hover:opacity-80"
                  style={{ border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontFamily: "var(--font-inter)", background: "transparent", cursor: "pointer" }}
                >
                  {copied ? "Copied" : "Copy feedback"}
                </button>
                <button
                  onClick={() => { setFeedback(""); setStatement(""); setError(""); }}
                  className="px-4 py-2 text-sm font-semibold rounded-sm transition-opacity hover:opacity-90"
                  style={{ background: "var(--color-accent)", color: "#fff", fontFamily: "var(--font-inter)", border: "none", cursor: "pointer" }}
                >
                  Review a new draft
                </button>
              </div>
              <p className="text-xs" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-inter)" }}>
                This is AI feedback — treat it as a smart first reader, not a final verdict.
              </p>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="mt-4 text-sm" style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)" }}>{error}</p>
      )}
    </div>
  );
}
