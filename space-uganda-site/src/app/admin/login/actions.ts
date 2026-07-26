"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authenticateAdminCredentials } from "@/lib/auth/credentials";
import { getSafeAdminRedirectPath } from "@/lib/auth/guard";
import {
  createSessionToken,
  sessionCookieName,
  sessionMaxAgeSeconds
} from "@/lib/auth/session";

export type LoginActionState = {
  error?: string;
  email?: string;
};

export async function loginAction(
  _previousState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = getSafeAdminRedirectPath(String(formData.get("next") ?? "/admin"));
  const result = await authenticateAdminCredentials({ email, password });

  if (!result.ok) {
    return { error: result.error, email: email.trim() };
  }

  const token = await createSessionToken(result.user);
  const cookieStore = await cookies();

  cookieStore.set(sessionCookieName, token, {
    httpOnly: true,
    maxAge: sessionMaxAgeSeconds,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });

  redirect(next);
}
