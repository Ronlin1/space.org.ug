import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionCookieName } from "@/lib/auth/session";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName);
  redirect("/admin/login");
}
