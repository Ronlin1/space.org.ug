import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/slug";

describe("slugify", () => {
  it("creates stable lowercase URL slugs", () => {
    expect(slugify("World Space Week Uganda 2026")).toBe("world-space-week-uganda-2026");
    expect(slugify("NOA's Quest / Rocket Revolution")).toBe("noas-quest-rocket-revolution");
    expect(slugify("  IEEE AESS SBC Makerere  ")).toBe("ieee-aess-sbc-makerere");
  });
});
