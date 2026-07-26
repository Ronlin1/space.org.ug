// @vitest-environment node

import { describe, expect, it } from "vitest";
import { parseResourceFormData } from "@/lib/admin/form-parser";
import type { AdminResourceConfig } from "@/lib/admin/resources";

const config: AdminResourceConfig = {
  slug: "test",
  label: "Test",
  singularLabel: "Test",
  model: "community",
  description: "Test resource",
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "count", label: "Count", type: "number" },
    { name: "featured", label: "Featured", type: "checkbox" },
    { name: "publishedAt", label: "Published At", type: "datetime" },
    { name: "metadata", label: "Metadata", type: "json" }
  ],
  listFields: ["title", "count", "featured"]
};

describe("parseResourceFormData", () => {
  it("coerces admin form values for Prisma writes", () => {
    const formData = new FormData();
    formData.set("title", "  Rocket Revolution  ");
    formData.set("count", "42");
    formData.set("featured", "on");
    formData.set("publishedAt", "2026-10-04T09:30");
    formData.set("metadata", '{"track":"Aerospace"}');

    const parsed = parseResourceFormData(config, formData);

    expect(parsed).toEqual({
      ok: true,
      data: {
        title: "Rocket Revolution",
        count: 42,
        featured: true,
        publishedAt: new Date("2026-10-04T09:30"),
        metadata: { track: "Aerospace" }
      }
    });
  });

  it("returns field errors for missing required values and invalid json", () => {
    const formData = new FormData();
    formData.set("metadata", "{bad json");

    const parsed = parseResourceFormData(config, formData);

    expect(parsed).toEqual({
      ok: false,
      errors: {
        title: "Title is required.",
        metadata: "Metadata must be valid JSON."
      }
    });
  });
});
