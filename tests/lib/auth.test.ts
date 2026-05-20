import { describe, it, expect, beforeEach, vi } from "vitest";

describe("isAllowedEmail", () => {
  beforeEach(() => {
    vi.stubEnv("ALLOWED_EMAIL", "jamil@example.com");
  });

  it("returns true for the configured email (case-insensitive)", async () => {
    const { isAllowedEmail } = await import("@/lib/auth");
    expect(isAllowedEmail("jamil@example.com")).toBe(true);
    expect(isAllowedEmail("Jamil@Example.com")).toBe(true);
  });

  it("returns false for any other email", async () => {
    const { isAllowedEmail } = await import("@/lib/auth");
    expect(isAllowedEmail("attacker@example.com")).toBe(false);
    expect(isAllowedEmail("")).toBe(false);
  });

  it("returns false if ALLOWED_EMAIL env is missing", async () => {
    vi.unstubAllEnvs();
    const { isAllowedEmail } = await import("@/lib/auth");
    expect(isAllowedEmail("jamil@example.com")).toBe(false);
  });
});
