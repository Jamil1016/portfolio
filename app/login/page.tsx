"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "sent">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    await fetch("/api/auth/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setState("sent");
  }

  return (
    <main className="cs-wrap" style={{ maxWidth: 440, paddingTop: 96, paddingBottom: 96 }}>
      <div className="eyebrow">Private</div>
      <h1
        style={{
          fontFamily: "var(--font-serif), serif",
          fontWeight: 400,
          fontSize: 44,
          lineHeight: 1.05,
          margin: "14px 0 8px",
          color: "var(--strong)",
        }}
      >
        Sign in
      </h1>
      <p style={{ color: "var(--dim)", fontSize: 15, margin: 0 }}>
        Private dashboard. Magic-link only.
      </p>
      <form onSubmit={onSubmit} style={{ marginTop: 24, display: "grid", gap: 12 }}>
        <input
          type="email"
          required
          aria-label="Email address"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            border: "1px solid var(--rule)",
            background: "var(--card)",
            color: "var(--text)",
            font: "inherit",
          }}
        />
        <button type="submit" className="btn" disabled={state !== "idle"}>
          {state === "loading" ? "Sending..." : state === "sent" ? "Check your email" : "Send magic link"}
        </button>
      </form>
    </main>
  );
}
