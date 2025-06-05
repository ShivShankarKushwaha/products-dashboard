import { describe, expect, it } from "vitest";

describe("add", () => {
  it("should add two numbers", () => {
    const a = 1;
    const b = 2;
    const result = a + b;
    expect(result).toBe(3);
  });
});
