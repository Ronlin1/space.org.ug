import { cookies } from "next/headers";
import {
  sessionCookieName,
  type SessionUser,
  verifySessionToken
} from "@/lib/auth/session";

export async function getCurrentSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  return verifySessionToken(token ?? "");
}
