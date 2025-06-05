import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";

interface FavoritesState {
  items: Product[];
}

const initialState: FavoritesState = {
  items: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<Product>) {
      if (!state.items.find((p) => p.id === action.payload.id)) {
        state.items.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.items));
      }
    },
    removeFromFavorites(state, action: PayloadAction<number>) {
      state.items = state.items.filter((p) => p.id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
