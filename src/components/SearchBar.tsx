import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { setSearchQuery } from "../features/filters/filtersSlice";
import useDebounce from "../utils/useDebounce";

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");
  const debouncedSearch = useDebounce(input, 500);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  return (
    <div className="mb-4">
      <label
        htmlFor="search"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Search by Title
      </label>
      <input
        id="search"
        type="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. Monitor, shirt, Drive"
        className="w-full md:w-80 px-4 py-2 rounded-lg border border-gray-300 focus:border-transparent focus:ring-2 focus:ring-blue-600 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 shadow focus:shadow-lg bg-white"
        aria-label="Search products by title"
        autoComplete="off"
        role="searchbox"
        inputMode="search"
        data-testid="search-input"
      />
    </div>
  );
};

export default SearchBar;
