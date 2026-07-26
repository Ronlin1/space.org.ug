"use client";

import { Send } from "lucide-react";
import { useActionState } from "react";
import {
  createPublicSubmissionAction,
  type PublicSubmissionState
} from "@/lib/submissions/actions";

const initialState: PublicSubmissionState = {};

function value(state: PublicSubmissionState, key: string) {
  return state.values?.[key] ?? "";
}

const inputClass =
  "mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-3 text-sm text-ink outline-none ring-ugandaGold/40 transition focus:border-ugandaGold focus:ring-4";
const labelClass = "text-sm font-black text-ink";

function ErrorText({ error }: { error?: string }) {
  return error ? <p className="mt-2 text-sm font-bold text-ugandaRed">{error}</p> : null;
}

export function SubmissionForm() {
  const [state, formAction, pending] = useActionState(
    createPublicSubmissionAction,
    initialState
  );

  if (state.success) {
    return (
      <div className="rounded-lg border border-ugandaGreen/30 bg-ugandaGreen/10 p-6">
        <p className="text-sm font-black uppercase tracking-normal text-ugandaGreen">
          Submission received
        </p>
        <h2 className="mt-3 text-2xl font-black text-ink">Thank you for building with us.</h2>
        <p className="mt-3 text-sm leading-6 text-ink/65">
          Your message is now with the Space Uganda organising team for review.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-lg border border-black/10 bg-paper p-5">
      <input aria-hidden="true" className="hidden" name="website" tabIndex={-1} />
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="type">
            Submission Type
          </label>
          <select
            className={inputClass}
            defaultValue={value(state, "type")}
            id="type"
            name="type"
          >
            <option value="">Choose one</option>
            <option value="JOIN">Join the community</option>
            <option value="PARTNER">Partner with Space Uganda</option>
            <option value="INNOVATION">Submit WSW innovation idea</option>
            <option value="CONTACT">General contact</option>
          </select>
          <ErrorText error={state.errors?.type} />
        </div>
        <div>
          <label className={labelClass} htmlFor="submitterName">
            Name
          </label>
          <input
            className={inputClass}
            defaultValue={value(state, "submitterName")}
            id="submitterName"
            name="submitterName"
            type="text"
          />
          <ErrorText error={state.errors?.submitterName} />
        </div>
        <div>
          <label className={labelClass} htmlFor="submitterEmail">
            Email
          </label>
          <input
            className={inputClass}
            defaultValue={value(state, "submitterEmail")}
            id="submitterEmail"
            name="submitterEmail"
            type="email"
          />
          <ErrorText error={state.errors?.submitterEmail} />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone
          </label>
          <input
            className={inputClass}
            defaultValue={value(state, "phone")}
            id="phone"
            name="phone"
            type="text"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="organisation">
            Organisation
          </label>
          <input
            className={inputClass}
            defaultValue={value(state, "organisation")}
            id="organisation"
            name="organisation"
            type="text"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="category">
            Category
          </label>
          <input
            className={inputClass}
            defaultValue={value(state, "category")}
            id="category"
            name="category"
            placeholder="Astronomy, rockets, EO, policy, school outreach..."
            type="text"
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="title">
            Title
          </label>
          <input
            className={inputClass}
            defaultValue={value(state, "title")}
            id="title"
            name="title"
            type="text"
          />
          <ErrorText error={state.errors?.title} />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="abstract">
            Tell us more
          </label>
          <textarea
            className={`${inputClass} min-h-32`}
            defaultValue={value(state, "abstract")}
            id="abstract"
            name="abstract"
            rows={5}
          />
          <ErrorText error={state.errors?.abstract} />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="supportNeeds">
            Support needed
          </label>
          <textarea
            className={`${inputClass} min-h-24`}
            defaultValue={value(state, "supportNeeds")}
            id="supportNeeds"
            name="supportNeeds"
            rows={3}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="safetyNotes">
            Safety notes
          </label>
          <textarea
            className={`${inputClass} min-h-24`}
            defaultValue={value(state, "safetyNotes")}
            id="safetyNotes"
            name="safetyNotes"
            rows={3}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="linkUrl">
            Link
          </label>
          <input
            className={inputClass}
            defaultValue={value(state, "linkUrl")}
            id="linkUrl"
            name="linkUrl"
            placeholder="https://"
            type="url"
          />
          <ErrorText error={state.errors?.linkUrl} />
        </div>
      </div>
      {state.errors?.root ? (
        <p className="mt-5 rounded-md border border-ugandaRed/20 bg-ugandaRed/10 px-4 py-3 text-sm font-bold text-ugandaRed">
          {state.errors.root}
        </p>
      ) : null}
      <button
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-black text-white transition hover:bg-ugandaRed disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
        type="submit"
      >
        <Send aria-hidden="true" size={18} />
        {pending ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
