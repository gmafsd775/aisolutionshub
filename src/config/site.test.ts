import { describe, expect, it } from "vitest";
import { absoluteSiteUrl } from "./site";

describe("absoluteSiteUrl", () => {
  it("uses the new domain for the homepage", () => {
    expect(absoluteSiteUrl("/")).toBe("https://damha577.com/");
  });

  it("keeps nested page paths on the new domain", () => {
    expect(absoluteSiteUrl("/blog/example-post/")).toBe("https://damha577.com/blog/example-post/");
  });

  it("keeps dynamic purchase pages on the new domain", () => {
    expect(absoluteSiteUrl("/buy/workflow-123/")).toBe("https://damha577.com/buy/workflow-123/");
  });
});