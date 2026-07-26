import type { SubmissionType } from "@prisma/client";

export type PublicSubmissionData = {
  type: SubmissionType;
  submitterName: string;
  submitterEmail: string;
  phone: string | null;
  organisation: string | null;
  title: string;
  category: string | null;
  abstract: string;
  supportNeeds: string | null;
  safetyNotes: string | null;
  linkUrl: string | null;
};

export type ParsedSubmission =
  | {
      ok: true;
      data: PublicSubmissionData;
    }
  | {
      ok: false;
      errors: Record<string, string>;
    };

const validSubmissionTypes = new Set(["JOIN", "PARTNER", "INNOVATION", "CONTACT"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function optionalText(formData: FormData, key: string) {
  const value = text(formData, key);
  return value || null;
}

export function parseSubmissionFormData(formData: FormData): ParsedSubmission {
  const type = text(formData, "type");
  const submitterName = text(formData, "submitterName");
  const submitterEmail = text(formData, "submitterEmail").toLowerCase();
  const title = text(formData, "title");
  const abstract = text(formData, "abstract");
  const linkUrl = optionalText(formData, "linkUrl");
  const errors: Record<string, string> = {};

  if (!validSubmissionTypes.has(type)) {
    errors.type = "Choose a submission type.";
  }

  if (!submitterName) {
    errors.submitterName = "Name is required.";
  }

  if (!emailPattern.test(submitterEmail)) {
    errors.submitterEmail = "Enter a valid email address.";
  }

  if (!title) {
    errors.title = "Title is required.";
  }

  if (!abstract) {
    errors.abstract = "Tell us a little more.";
  }

  if (linkUrl) {
    try {
      new URL(linkUrl);
    } catch {
      errors.linkUrl = "Enter a valid URL.";
    }
  }

  if (Object.keys(errors).length) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      type: type as SubmissionType,
      submitterName,
      submitterEmail,
      phone: optionalText(formData, "phone"),
      organisation: optionalText(formData, "organisation"),
      title,
      category: optionalText(formData, "category"),
      abstract,
      supportNeeds: optionalText(formData, "supportNeeds"),
      safetyNotes: optionalText(formData, "safetyNotes"),
      linkUrl
    }
  };
}

export function submissionFormDataToValues(formData: FormData) {
  return Object.fromEntries(
    [
      "type",
      "submitterName",
      "submitterEmail",
      "phone",
      "organisation",
      "title",
      "category",
      "abstract",
      "supportNeeds",
      "safetyNotes",
      "linkUrl"
    ].map((field) => [field, String(formData.get(field) ?? "")])
  );
}
