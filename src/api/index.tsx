import type { Product } from "../types/product";

export const fetchCategories = async () => {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const data = await res.json();
  return data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  return res.json();
};
