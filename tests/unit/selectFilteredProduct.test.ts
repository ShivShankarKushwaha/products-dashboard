import { selectFilteredProducts } from "../../src/features/products/productsSelectors";
import type { RootState } from "../../src/app/store";
import type { Product } from "../../src/types/product";
import { describe, expect, it } from "vitest";

describe("selectFilteredProducts", () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Phone",
      price: 300,
      description: "",
      category: "electronics",
      image: "",
      rating: { rate: 4, count: 100 },
    },
    {
      id: 2,
      title: "Laptop",
      price: 1000,
      description: "",
      category: "electronics",
      image: "",
      rating: { rate: 4.5, count: 80 },
    },
    {
      id: 3,
      title: "T-shirt",
      price: 20,
      description: "",
      category: "clothing",
      image: "",
      rating: { rate: 3.5, count: 200 },
    },
  ];

  const getState = (overrides: Partial<RootState>): RootState =>
    ({
      products: {
        items: mockProducts,
        status: "idle",
        error: null,
      },
      filters: {
        searchQuery: "",
        category: "",
        sort: "",
        ...overrides.filters,
      },
    }) as RootState;

  it("returns all products when no filters are applied", () => {
    const result = selectFilteredProducts(getState({}));
    expect(result).toHaveLength(3);
  });

  it("filters by search query", () => {
    const result = selectFilteredProducts(
      getState({ filters: { searchQuery: "lap" } }),
    );
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Laptop");
  });

  it("filters by category", () => {
    const result = selectFilteredProducts(
      getState({ filters: { category: "clothing" } }),
    );
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("T-shirt");
  });

  it("sorts by ascending price", () => {
    const result = selectFilteredProducts(
      getState({ filters: { sort: "asc" } }),
    );
    expect(result.map((p) => p.price)).toEqual([20, 300, 1000]);
  });

  it("sorts by descending price", () => {
    const result = selectFilteredProducts(
      getState({ filters: { sort: "desc" } }),
    );
    expect(result.map((p) => p.price)).toEqual([1000, 300, 20]);
  });

  it("filters by category and search together", () => {
    const result = selectFilteredProducts(
      getState({ filters: { category: "electronics", searchQuery: "ph" } }),
    );
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Phone");
  });
});
