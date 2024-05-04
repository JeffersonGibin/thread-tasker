/* eslint-disable @typescript-eslint/no-explicit-any */
import { isGreaterThanZero } from "./Number.utils";

describe("isGreaterThanZero", () => {
  test("should return true for numbers greater than zero", () => {
    expect(isGreaterThanZero(1)).toBe(true);
    expect(isGreaterThanZero(100)).toBe(true);
    expect(isGreaterThanZero(0.0001)).toBe(true);
  });

  test("should return false for numbers less than or equal to zero", () => {
    expect(isGreaterThanZero(0)).toBe(false);
    expect(isGreaterThanZero(-1)).toBe(false);
    expect(isGreaterThanZero(-100)).toBe(false);
    expect(isGreaterThanZero(-0.0001)).toBe(false);
  });

  test("should return false for NaN", () => {
    expect(isGreaterThanZero(NaN)).toBe(false);
  });

  test("should return false for Infinity", () => {
    expect(isGreaterThanZero(Infinity)).toBe(false);
  });

  test("should return false for -Infinity", () => {
    expect(isGreaterThanZero(-Infinity)).toBe(false);
  });

  test("should return false for null", () => {
    expect(isGreaterThanZero(null as any)).toBe(false);
  });

  test("should return false for undefined", () => {
    expect(isGreaterThanZero(undefined as any)).toBe(false);
  });

  test("should return false for non-numeric values", () => {
    expect(isGreaterThanZero("string" as any)).toBe(false);
    expect(isGreaterThanZero({} as any)).toBe(false);
    expect(isGreaterThanZero([] as any)).toBe(false);
    expect(isGreaterThanZero(true as any)).toBe(false);
    expect(isGreaterThanZero(false as any)).toBe(false);
  });
});
