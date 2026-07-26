// @vitest-environment node

import bcrypt from "bcryptjs";
import { describe, expect, it } from "vitest";
import { authenticateAdminCredentials } from "@/lib/auth/credentials";
import { getSafeAdminRedirectPath, isProtectedAdminPath } from "@/lib/auth/guard";
import { createSessionToken, verifySessionToken } from "@/lib/auth/session";
import { loginSchema } from "@/lib/auth/validation";

describe("loginSchema", () => {
  it("normalizes credentials before authentication", () => {
    const parsed = loginSchema.parse({
      email: "  ADMIN@SPACE.ORG.UG ",
      password: "  ChangeThisBeforeLaunch123! "
    });

    expect(parsed).toEqual({
      email: "admin@space.org.ug",
      password: "ChangeThisBeforeLaunch123!"
    });
  });
});

describe("authenticateAdminCredentials", () => {
  it("authenticates an active admin with normalized email", async () => {
    const passwordHash = await bcrypt.hash("correct-password", 10);
    const result = await authenticateAdminCredentials(
      { email: " ADMIN@SPACE.ORG.UG ", password: " correct-password " },
      {
        findUserByEmail: async (email) =>
          email === "admin@space.org.ug"
            ? {
                id: "user-1",
                email,
                name: "Admin",
                passwordHash,
                role: "ADMIN",
                active: true
              }
            : null
      }
    );

    expect(result).toMatchObject({
      ok: true,
      user: { id: "user-1", email: "admin@space.org.ug", role: "ADMIN" }
    });
  });

  it("rejects inactive users without issuing a session", async () => {
    const passwordHash = await bcrypt.hash("correct-password", 10);
    const result = await authenticateAdminCredentials(
      { email: "admin@space.org.ug", password: "correct-password" },
      {
        findUserByEmail: async () => ({
          id: "user-1",
          email: "admin@space.org.ug",
          name: "Admin",
          passwordHash,
          role: "ADMIN",
          active: false
        })
      }
    );

    expect(result).toEqual({ ok: false, error: "Invalid email or password." });
  });
});

describe("admin guard", () => {
  it("protects admin pages except login and static assets", () => {
    expect(isProtectedAdminPath("/admin")).toBe(true);
    expect(isProtectedAdminPath("/admin/team")).toBe(true);
    expect(isProtectedAdminPath("/api/admin/communities")).toBe(true);
    expect(isProtectedAdminPath("/admin/login")).toBe(false);
    expect(isProtectedAdminPath("/admin/login/reset")).toBe(false);
    expect(isProtectedAdminPath("/_next/static/chunk.js")).toBe(false);
  });

  it("allows redirects only back into protected admin pages", () => {
    expect(getSafeAdminRedirectPath("/admin/team")).toBe("/admin/team");
    expect(getSafeAdminRedirectPath("/api/admin/communities")).toBe("/admin");
    expect(getSafeAdminRedirectPath("/community")).toBe("/admin");
    expect(getSafeAdminRedirectPath("https://example.com/admin")).toBe("/admin");
    expect(getSafeAdminRedirectPath("/admin/login")).toBe("/admin");
  });
});

describe("session tokens", () => {
  it("round-trips a signed admin session", async () => {
    const token = await createSessionToken({
      id: "user-1",
      email: "admin@space.org.ug",
      name: "Admin",
      role: "ADMIN"
    });

    const session = await verifySessionToken(token);

    expect(session).toEqual({
      id: "user-1",
      email: "admin@space.org.ug",
      name: "Admin",
      role: "ADMIN"
    });
  });
});
