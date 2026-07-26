import type { AdminResourceConfig, AdminResourceField } from "@/lib/admin/resources";

export type ParsedResourceForm =
  | {
      ok: true;
      data: Record<string, unknown>;
    }
  | {
      ok: false;
      errors: Record<string, string>;
    };

function readTextValue(formData: FormData, field: AdminResourceField) {
  const rawValue = formData.get(field.name);
  return typeof rawValue === "string" ? rawValue.trim() : "";
}

function isMissingRequired(field: AdminResourceField, value: string) {
  return field.required && field.type !== "checkbox" && value.length === 0;
}

export function parseResourceFormData(
  config: AdminResourceConfig,
  formData: FormData
): ParsedResourceForm {
  const data: Record<string, unknown> = {};
  const errors: Record<string, string> = {};

  for (const field of config.fields) {
    if (field.type === "checkbox") {
      data[field.name] = formData.get(field.name) === "on";
      continue;
    }

    const value = readTextValue(formData, field);

    if (isMissingRequired(field, value)) {
      errors[field.name] = `${field.label} is required.`;
      continue;
    }

    if (!value) {
      data[field.name] = null;
      continue;
    }

    if (field.type === "number") {
      const parsed = Number(value);
      if (Number.isNaN(parsed)) {
        errors[field.name] = `${field.label} must be a number.`;
      } else {
        data[field.name] = parsed;
      }
      continue;
    }

    if (field.type === "datetime") {
      const parsed = new Date(value);
      if (Number.isNaN(parsed.getTime())) {
        errors[field.name] = `${field.label} must be a valid date and time.`;
      } else {
        data[field.name] = parsed;
      }
      continue;
    }

    if (field.type === "json") {
      try {
        data[field.name] = JSON.parse(value);
      } catch {
        errors[field.name] = `${field.label} must be valid JSON.`;
      }
      continue;
    }

    data[field.name] = value;
  }

  if (Object.keys(errors).length) {
    return { ok: false, errors };
  }

  return { ok: true, data };
}

export function formDataToValues(config: AdminResourceConfig, formData: FormData) {
  return Object.fromEntries(
    config.fields.map((field) => [field.name, String(formData.get(field.name) ?? "")])
  );
}
