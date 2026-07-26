"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formDataToValues, parseResourceFormData } from "@/lib/admin/form-parser";
import {
  createResourceRecord,
  deleteResourceRecord,
  updateResourceRecord
} from "@/lib/admin/records";
import { getResourceConfig } from "@/lib/admin/resources";
import type { AdminActionState } from "@/lib/admin/action-state";

function requireResource(resourceSlug: string) {
  const config = getResourceConfig(resourceSlug);

  if (!config) {
    throw new Error(`Unknown admin resource: ${resourceSlug}`);
  }

  return config;
}

export async function createResourceAction(
  resourceSlug: string,
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  const config = requireResource(resourceSlug);
  const parsed = parseResourceFormData(config, formData);

  if (!parsed.ok) {
    return {
      errors: parsed.errors,
      values: formDataToValues(config, formData)
    };
  }

  await createResourceRecord(config, parsed.data);
  revalidatePath("/");
  revalidatePath(`/admin/${resourceSlug}`);
  redirect(`/admin/${resourceSlug}`);
}

export async function updateResourceAction(
  resourceSlug: string,
  id: string,
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  const config = requireResource(resourceSlug);
  const parsed = parseResourceFormData(config, formData);

  if (!parsed.ok) {
    return {
      errors: parsed.errors,
      values: formDataToValues(config, formData)
    };
  }

  await updateResourceRecord(config, id, parsed.data);
  revalidatePath("/");
  revalidatePath(`/admin/${resourceSlug}`);
  redirect(`/admin/${resourceSlug}`);
}

export async function deleteResourceAction(resourceSlug: string, id: string) {
  const config = requireResource(resourceSlug);

  if (config.allowDelete === false) {
    redirect(`/admin/${resourceSlug}`);
  }

  await deleteResourceRecord(config, id);
  revalidatePath("/");
  revalidatePath(`/admin/${resourceSlug}`);
  redirect(`/admin/${resourceSlug}`);
}
