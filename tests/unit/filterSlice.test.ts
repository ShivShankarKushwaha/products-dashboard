import filtersReducer, {
  setSearchQuery,
  setCategory,
  setSort,
  clearFilters,
} from "../../src/features/filters/filtersSlice";
import { describe, it, expect } from "vitest";

describe("filtersSlice", () => {
  const initialState = {
    searchQuery: "",
    category: "",
    sort: "",
  };

  it("should return the initial state", () => {
    expect(filtersReducer(undefined, { type: undefined as any })).toEqual(
      initialState,
    );
  });

  it("should handle setSearchQuery", () => {
    const state = filtersReducer(initialState as any, setSearchQuery("laptop"));
    expect(state.searchQuery).toBe("laptop");
  });

  it("should handle setCategory", () => {
    const state = filtersReducer(
      initialState as any,
      setCategory("electronics"),
    );
    expect(state.category).toBe("electronics");
  });

  it("should handle setSort (asc)", () => {
    const state = filtersReducer(initialState as any, setSort("asc"));
    expect(state.sort).toBe("asc");
  });

  it("should handle setSort (desc)", () => {
    const state = filtersReducer(initialState as any, setSort("desc"));
    expect(state.sort).toBe("desc");
  });

  it("should handle clearFilters", () => {
    const modifiedState = {
      searchQuery: "shirt",
      category: "clothing",
      sort: "desc",
    };
    const clearedState = filtersReducer(modifiedState as any, clearFilters());
    expect(clearedState).toEqual(initialState);
  });
});
