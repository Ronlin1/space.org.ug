import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import type { SessionUser } from "@/lib/auth/session";
import { loginSchema } from "@/lib/auth/validation";

export type AdminUserRecord = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: "ADMIN" | "EDITOR";
  active: boolean;
};

export type AuthDeps = {
  findUserByEmail?: (email: string) => Promise<AdminUserRecord | null>;
  verifyPassword?: (password: string, passwordHash: string) => Promise<boolean>;
};

export type AuthResult =
  | {
      ok: true;
      user: SessionUser;
    }
  | {
      ok: false;
      error: string;
    };

const invalidLogin: AuthResult = { ok: false, error: "Invalid email or password." };

async function findUserByEmail(email: string): Promise<AdminUserRecord | null> {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      passwordHash: true,
      role: true,
      active: true
    }
  });
}

export async function authenticateAdminCredentials(
  input: unknown,
  deps: AuthDeps = {}
): Promise<AuthResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return invalidLogin;
  }

  const lookup = deps.findUserByEmail ?? findUserByEmail;
  const compare = deps.verifyPassword ?? bcrypt.compare;
  const user = await lookup(parsed.data.email);

  if (!user?.active) {
    return invalidLogin;
  }

  const passwordMatches = await compare(parsed.data.password, user.passwordHash);
  if (!passwordMatches) {
    return invalidLogin;
  }

  return {
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  };
}
