"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import {
  parseSubmissionFormData,
  submissionFormDataToValues
} from "@/lib/submissions/validation";

export type PublicSubmissionState = {
  errors?: Record<string, string>;
  success?: boolean;
  values?: Record<string, string>;
};

export async function createPublicSubmissionAction(
  _previousState: PublicSubmissionState,
  formData: FormData
): Promise<PublicSubmissionState> {
  if (String(formData.get("website") ?? "").trim()) {
    return { success: true };
  }

  const parsed = parseSubmissionFormData(formData);

  if (!parsed.ok) {
    return {
      errors: parsed.errors,
      values: submissionFormDataToValues(formData)
    };
  }

  try {
    await prisma.submission.create({
      data: parsed.data
    });
    revalidatePath("/admin/submissions");
    return { success: true };
  } catch {
    return {
      errors: {
        root: "We could not save this submission right now. Please try again soon."
      },
      values: submissionFormDataToValues(formData)
    };
  }
}
