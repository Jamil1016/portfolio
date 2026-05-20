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
    <main className="mx-auto max-w-sm px-4 py-24">
      <h1 className="text-2xl font-semibold text-slate-50">Sign in</h1>
      <p className="mt-2 text-sm text-slate-400">
        Private dashboard. Magic-link only.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100"
        />
        <button
          type="submit"
          disabled={state !== "idle"}
          className="w-full rounded-md bg-emerald-700 px-3 py-2 text-sm text-white hover:bg-emerald-600 disabled:opacity-60"
        >
          {state === "loading" ? "Sending..." : state === "sent" ? "Check your email" : "Send magic link"}
        </button>
      </form>
    </main>
  );
}
