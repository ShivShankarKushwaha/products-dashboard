import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useDebounce from "../../src/utils/useDebounce";
import { act } from "react";
import { renderHook } from "@testing-library/react-hooks";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("test", 500));
    expect(result.current).toBe("test");
  });

  it("should update debounced value after delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 300 } },
    );

    rerender({ value: "b", delay: 300 });
    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("b");
  });

  it("should reset timer if value changes before delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "x", delay: 200 } },
    );

    rerender({ value: "y", delay: 200 });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    rerender({ value: "z", delay: 200 });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Not enough time has passed for debounce
    expect(result.current).toBe("x");

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe("z");
  });

  it("should work with numbers as value", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 1, delay: 100 } },
    );

    rerender({ value: 2, delay: 100 });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe(2);
  });

  it("should update delay dynamically", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "init", delay: 100 } },
    );

    rerender({ value: "changed", delay: 500 });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe("init");

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(result.current).toBe("changed");
  });
});
