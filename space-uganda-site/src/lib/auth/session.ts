import { jwtVerify, SignJWT } from "jose";
import { z } from "zod";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "EDITOR";
};

export const sessionCookieName = "space_uganda_session";
export const sessionMaxAgeSeconds = 60 * 60 * 8;

const sessionSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(["ADMIN", "EDITOR"])
});

function getAuthSecret() {
  const secret =
    process.env.AUTH_SECRET ?? "space-uganda-local-development-secret-change-before-launch";

  if (process.env.NODE_ENV === "production" && !process.env.AUTH_SECRET) {
    throw new Error("AUTH_SECRET must be configured in production.");
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${sessionMaxAgeSeconds}s`)
    .sign(getAuthSecret());
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getAuthSecret());
    return sessionSchema.parse(payload);
  } catch {
    return null;
  }
}
