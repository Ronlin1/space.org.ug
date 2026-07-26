"use client";

import Link from "next/link";
import { Save } from "lucide-react";
import { useActionState } from "react";
import type { AdminActionState } from "@/lib/admin/action-state";
import type { SerializedAdminRecord } from "@/lib/admin/records";
import type { AdminResourceConfig, AdminResourceField } from "@/lib/admin/resources";

type ResourceFormAction = (
  state: AdminActionState,
  formData: FormData
) => Promise<AdminActionState>;

type AdminResourceFormProps = {
  action: ResourceFormAction;
  cancelHref: string;
  config: AdminResourceConfig;
  record?: SerializedAdminRecord;
};

const initialState: AdminActionState = {};

function valueToInputString(value: unknown, field: AdminResourceField) {
  if (value === null || value === undefined) {
    return "";
  }

  if (field.type === "datetime") {
    const date = value instanceof Date ? value : new Date(String(value));
    return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 16);
  }

  if (field.type === "json") {
    return typeof value === "string" ? value : JSON.stringify(value, null, 2);
  }

  return String(value);
}

function fieldValue(
  field: AdminResourceField,
  state: AdminActionState,
  record?: SerializedAdminRecord
) {
  if (state.values && field.name in state.values) {
    return state.values[field.name];
  }

  return valueToInputString(record?.[field.name], field);
}

function fieldChecked(
  field: AdminResourceField,
  state: AdminActionState,
  record?: SerializedAdminRecord
) {
  if (state.values && field.name in state.values) {
    return state.values[field.name] === "on";
  }

  return record?.[field.name] === true;
}

const inputClass =
  "mt-2 w-full rounded-md border border-white/15 bg-white px-3 py-2 text-sm text-ink outline-none ring-ugandaGold/40 transition focus:border-ugandaGold focus:ring-4";
const labelClass = "text-sm font-bold text-white";

function FieldControl({
  field,
  record,
  state
}: {
  field: AdminResourceField;
  record?: SerializedAdminRecord;
  state: AdminActionState;
}) {
  const error = state.errors?.[field.name];
  const value = fieldValue(field, state, record);

  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.06] p-3 text-sm font-bold text-white">
        <input
          className="size-4 accent-ugandaGold"
          defaultChecked={fieldChecked(field, state, record)}
          name={field.name}
          type="checkbox"
        />
        {field.label}
      </label>
    );
  }

  return (
    <div>
      <label className={labelClass} htmlFor={field.name}>
        {field.label}
      </label>
      {field.type === "textarea" || field.type === "json" ? (
        <textarea
          className={`${inputClass} min-h-32`}
          defaultValue={value}
          id={field.name}
          name={field.name}
          required={field.required}
          rows={field.type === "json" ? 8 : 5}
        />
      ) : field.type === "select" ? (
        <select
          className={inputClass}
          defaultValue={value}
          id={field.name}
          name={field.name}
          required={field.required}
        >
          <option value="">Select {field.label.toLowerCase()}</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={inputClass}
          defaultValue={value}
          id={field.name}
          name={field.name}
          required={field.required}
          type={
            field.type === "datetime"
              ? "datetime-local"
              : field.type === "number"
                ? "number"
                : field.type
          }
        />
      )}
      {field.helpText ? <p className="mt-2 text-xs leading-5 text-white/50">{field.helpText}</p> : null}
      {error ? <p className="mt-2 text-sm font-bold text-red-200">{error}</p> : null}
    </div>
  );
}

export function AdminResourceForm({
  action,
  cancelHref,
  config,
  record
}: AdminResourceFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="rounded-lg border border-white/10 bg-white/[0.08] p-5">
      <div className="grid gap-5 md:grid-cols-2">
        {config.fields.map((field) => (
          <div
            className={field.type === "textarea" || field.type === "json" ? "md:col-span-2" : ""}
            key={field.name}
          >
            <FieldControl field={field} record={record} state={state} />
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          className="inline-flex items-center gap-2 rounded-md bg-ugandaGold px-5 py-3 text-sm font-black text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={pending}
          type="submit"
        >
          <Save aria-hidden="true" size={18} />
          {pending ? "Saving..." : "Save changes"}
        </button>
        <Link
          className="rounded-md border border-white/15 px-5 py-3 text-sm font-black text-white transition hover:border-ugandaGold hover:text-ugandaGold"
          href={cancelHref}
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
