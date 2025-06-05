import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { Product } from "../../types/product";

const selectAllProducts = (state: RootState) => state.products.items;
const selectSearchQuery = (state: RootState) =>
  state.filters.searchQuery.toLowerCase();
const selectCategory = (state: RootState) => state.filters.category;
const selectSortOrder = (state: RootState) => state.filters.sort;

export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectSearchQuery, selectCategory, selectSortOrder],
  (products, searchQuery, category, sortOrder) => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter((product: Product) =>
        product.title.toLowerCase().includes(searchQuery),
      );
    }

    if (category) {
      filtered = filtered.filter(
        (product: Product) => product.category === category,
      );
    }

    if (sortOrder === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  },
);
