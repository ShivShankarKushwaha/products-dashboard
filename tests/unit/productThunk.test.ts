import { fetchProducts } from "../../src/features/products/productsThunks";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { Product } from "../../src/types/product";

describe("fetchProducts thunk", () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Test Product",
      price: 100,
      description: "Sample product",
      category: "electronics",
      image: "product.jpg",
      rating: { rate: 4.5, count: 10 },
    },
  ];

  beforeEach(() => {
    global.fetch = vi.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should fetch products successfully", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const thunk = fetchProducts();
    const dispatch = vi.fn();
    const getState = vi.fn();

    const result = await thunk(dispatch, getState, undefined);

    expect(fetch).toHaveBeenCalledWith("https://fakestoreapi.com/products");
    expect(result.type).toBe("products/fetchProducts/fulfilled");
    expect(result.payload).toEqual(mockProducts);
  });

  it("should handle fetch failure", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
    });

    const thunk = fetchProducts();
    const dispatch = vi.fn();
    const getState = vi.fn();

    const result = await thunk(dispatch, getState, undefined);

    expect(result.type).toBe("products/fetchProducts/rejected");
    expect(result?.error?.message).toBe("Failed to fetch products");
  });
});
