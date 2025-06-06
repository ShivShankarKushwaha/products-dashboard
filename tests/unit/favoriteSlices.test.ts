import { describe, it, expect, beforeEach } from "vitest";
import type { Product } from "../../src/types/product";
import favoritesReducer, {
  addToFavorites,
  removeFromFavorites,
} from "../../src/features/favorites/favoritesSlice";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

describe("favoritesSlice", () => {
  const product1: Product = {
    id: 1,
    title: "Product 1",
    price: 100,
    description: "Test product 1",
    category: "electronics",
    image: "image1.jpg",
    rating: { rate: 4.5, count: 10 },
  };

  const product2: Product = {
    id: 2,
    title: "Product 2",
    price: 200,
    description: "Test product 2",
    category: "jewelery",
    image: "image2.jpg",
    rating: { rate: 4.7, count: 5 },
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it("should return the initial state", () => {
    expect(favoritesReducer(undefined, { type: undefined as any })).toEqual({
      items: [],
    });
  });

  it("should handle addToFavorites", () => {
    const nextState = favoritesReducer({ items: [] }, addToFavorites(product1));
    expect(nextState.items).toContainEqual(product1);
  });

  it("should handle removeFromFavorites", () => {
    const state = { items: [product1, product2] };
    const nextState = favoritesReducer(state, removeFromFavorites(product1.id));
    expect(nextState.items).toEqual([product2]);
  });

  it("should not add duplicate favorites", () => {
    const state = { items: [product1] };
    const nextState = favoritesReducer(state, addToFavorites(product1));
    expect(nextState.items).toEqual([product1]);
  });

  it("should not remove non-existing favorites", () => {
    const state = { items: [product1, product2] };
    const nextState = favoritesReducer(state, removeFromFavorites(999));
    expect(nextState.items).toEqual([product1, product2]);
  });

  it("should handle multiple add and remove operations", () => {
    let state = favoritesReducer({ items: [] }, addToFavorites(product1));
    state = favoritesReducer(state, addToFavorites(product2));
    state = favoritesReducer(state, removeFromFavorites(product1.id));
    expect(state.items).toEqual([product2]);
  });
});
