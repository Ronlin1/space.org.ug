"use client";

import { LogIn } from "lucide-react";
import { useActionState } from "react";
import { loginAction, type LoginActionState } from "./actions";

type LoginFormProps = {
  nextPath: string;
};

const initialState: LoginActionState = {};

export function LoginForm({ nextPath }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={nextPath} />
      <div>
        <label className="text-sm font-semibold text-space-100" htmlFor="email">
          Email address
        </label>
        <input
          autoComplete="email"
          className="mt-2 w-full rounded-md border border-white/15 bg-white px-4 py-3 text-space-950 outline-none ring-ugandaGold/40 transition focus:border-ugandaGold focus:ring-4"
          defaultValue={state.email}
          id="email"
          name="email"
          placeholder="Admin email"
          type="email"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-space-100" htmlFor="password">
          Password
        </label>
        <input
          autoComplete="current-password"
          className="mt-2 w-full rounded-md border border-white/15 bg-white px-4 py-3 text-space-950 outline-none ring-ugandaGold/40 transition focus:border-ugandaGold focus:ring-4"
          id="password"
          name="password"
          type="password"
        />
      </div>
      {state.error ? (
        <p className="rounded-md border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
          {state.error}
        </p>
      ) : null}
      <button
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-ugandaGold px-5 py-3 font-bold text-space-950 transition hover:bg-ugandaGold/90 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
        type="submit"
      >
        <LogIn aria-hidden="true" size={18} />
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
