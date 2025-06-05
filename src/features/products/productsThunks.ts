import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  },
);
