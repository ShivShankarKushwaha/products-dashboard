import productsReducer from "../../src/features/products/productsSlice";
import { fetchProducts } from "../../src/features/products/productsThunks";
import { describe, it, expect } from "vitest";
import type { Product } from "../../src/types/product";

describe("productsSlice", () => {
  const initialState = {
    items: [],
    status: "idle",
    error: null,
  };

  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Test Product",
      price: 99.99,
      description: "A sample product",
      category: "electronics",
      image: "test.jpg",
      rating: { rate: 4.2, count: 120 },
    },
  ];

  it("should return the initial state", () => {
    expect(productsReducer(undefined, { type: undefined as any })).toEqual(
      initialState,
    );
  });

  it("should handle fetchProducts.pending", () => {
    const nextState = productsReducer(
      initialState as any,
      fetchProducts.pending("", undefined),
    );
    expect(nextState.status).toBe("loading");
  });

  it("should handle fetchProducts.fulfilled", () => {
    const nextState = productsReducer(
      { ...initialState, status: "loading" },
      fetchProducts.fulfilled(mockProducts, "", undefined),
    );
    expect(nextState.status).toBe("succeeded");
    expect(nextState.items).toEqual(mockProducts);
  });

  it("should handle fetchProducts.rejected", () => {
    const action = {
      type: fetchProducts.rejected.type,
      error: { message: "Fetch failed" },
    };
    const nextState = productsReducer(initialState as any, action);
    expect(nextState.status).toBe("failed");
    expect(nextState.error).toBe("Fetch failed");
  });
});
