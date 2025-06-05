import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  searchQuery: string;
  category: string;
  sort: "asc" | "desc" | "";
}

const initialState: FiltersState = {
  searchQuery: "",
  category: "",
  sort: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setSort(state, action: PayloadAction<"asc" | "desc" | "">) {
      state.sort = action.payload;
    },
    clearFilters(state) {
      state.searchQuery = "";
      state.category = "";
      state.sort = "";
    },
  },
});

export const { setSearchQuery, setCategory, setSort, clearFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
