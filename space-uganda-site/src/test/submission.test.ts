// @vitest-environment node

import { describe, expect, it } from "vitest";
import { parseSubmissionFormData } from "@/lib/submissions/validation";

describe("parseSubmissionFormData", () => {
  it("normalizes a public innovation submission", () => {
    const formData = new FormData();
    formData.set("type", "INNOVATION");
    formData.set("submitterName", "  Aisha  ");
    formData.set("submitterEmail", " AISHA@EXAMPLE.COM ");
    formData.set("title", "  Low-cost satellite data lab  ");
    formData.set("abstract", "  Build a training lab for students.  ");
    formData.set("linkUrl", " https://example.com/prototype ");

    const parsed = parseSubmissionFormData(formData);

    expect(parsed).toEqual({
      ok: true,
      data: {
        type: "INNOVATION",
        submitterName: "Aisha",
        submitterEmail: "aisha@example.com",
        phone: null,
        organisation: null,
        title: "Low-cost satellite data lab",
        category: null,
        abstract: "Build a training lab for students.",
        supportNeeds: null,
        safetyNotes: null,
        linkUrl: "https://example.com/prototype"
      }
    });
  });

  it("returns field errors for required public submission fields", () => {
    const parsed = parseSubmissionFormData(new FormData());

    expect(parsed).toEqual({
      ok: false,
      errors: {
        type: "Choose a submission type.",
        submitterName: "Name is required.",
        submitterEmail: "Enter a valid email address.",
        title: "Title is required.",
        abstract: "Tell us a little more."
      }
    });
  });
});
