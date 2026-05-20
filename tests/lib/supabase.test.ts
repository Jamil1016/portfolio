import { describe, it, expect, beforeEach, vi } from "vitest";

describe("createBrowserClient", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "anon-key");
  });

  it("returns a client when env vars are present", async () => {
    const { createBrowserClient } = await import("@/lib/supabase/client");
    const client = createBrowserClient();
    expect(client).toBeDefined();
    expect(client.auth).toBeDefined();
  });
});
