import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slug";
import type { AdminResourceConfig } from "@/lib/admin/resources";

export type AdminRecord = Record<string, unknown> & { id: string };
export type SerializedAdminRecord = Record<string, unknown> & { id: string };

type ResourceDelegate = {
  findMany: (args?: unknown) => Promise<AdminRecord[]>;
  findUnique: (args: unknown) => Promise<AdminRecord | null>;
  create: (args: unknown) => Promise<AdminRecord>;
  update: (args: unknown) => Promise<AdminRecord>;
  delete: (args: unknown) => Promise<AdminRecord>;
};

function getDelegate(config: AdminResourceConfig): ResourceDelegate {
  return prisma[config.model] as unknown as ResourceDelegate;
}

function defaultOrderBy(config: AdminResourceConfig) {
  if (config.fields.some((field) => field.name === "sortOrder")) {
    return [{ sortOrder: "asc" }, { updatedAt: "desc" }];
  }

  if (config.fields.some((field) => field.name === "name")) {
    return { name: "asc" };
  }

  if (config.fields.some((field) => field.name === "title")) {
    return { title: "asc" };
  }

  return { createdAt: "desc" };
}

function applyDerivedFields(config: AdminResourceConfig, data: Record<string, unknown>) {
  const hasSlugField = config.fields.some((field) => field.name === "slug");

  if (hasSlugField && !data.slug) {
    const source = data.name ?? data.title;
    if (typeof source === "string" && source.trim()) {
      data.slug = slugify(source);
    }
  }

  return data;
}

function removeInvalidBlankValues(config: AdminResourceConfig, data: Record<string, unknown>) {
  const cleaned = { ...data };

  for (const field of config.fields) {
    if (cleaned[field.name] !== null) {
      continue;
    }

    if (field.type === "number") {
      delete cleaned[field.name];
    }
  }

  return cleaned;
}

export async function listResourceRecords(config: AdminResourceConfig) {
  const delegate = getDelegate(config);
  return delegate.findMany({
    orderBy: defaultOrderBy(config),
    take: 200
  });
}

export async function getResourceRecord(config: AdminResourceConfig, id: string) {
  const delegate = getDelegate(config);
  return delegate.findUnique({ where: { id } });
}

export async function createResourceRecord(
  config: AdminResourceConfig,
  data: Record<string, unknown>
) {
  const delegate = getDelegate(config);
  return delegate.create({
    data: removeInvalidBlankValues(config, applyDerivedFields(config, data))
  });
}

export async function updateResourceRecord(
  config: AdminResourceConfig,
  id: string,
  data: Record<string, unknown>
) {
  const delegate = getDelegate(config);
  return delegate.update({
    where: { id },
    data: removeInvalidBlankValues(config, applyDerivedFields(config, data))
  });
}

export async function deleteResourceRecord(config: AdminResourceConfig, id: string) {
  const delegate = getDelegate(config);
  return delegate.delete({ where: { id } });
}

export function serializeAdminRecord(record: AdminRecord): SerializedAdminRecord {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [
      key,
      value instanceof Date ? value.toISOString() : value
    ])
  ) as SerializedAdminRecord;
}

export function formatAdminValue(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return "Not set";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "object") {
    if (value instanceof Date) {
      return value.toLocaleString("en-UG", { dateStyle: "medium", timeStyle: "short" });
    }

    return JSON.stringify(value);
  }

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleString("en-UG", { dateStyle: "medium", timeStyle: "short" });
    }
  }

  return String(value);
}
