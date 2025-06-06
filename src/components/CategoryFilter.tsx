import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCategory } from "../features/filters/filtersSlice";
import { ChevronDown } from "lucide-react";
import { fetchCategories } from "../api";

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const CategoryFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector((state) => state.filters.category);

  const [categories, setCategories] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      });
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!open) {
        return;
      }
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSelect = (category: string) => {
    dispatch(setCategory(category));
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div className="relative w-full md:w-80 mb-4">
      <label
        id="category-filter-label"
        htmlFor="category-filter-button"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Filter by Category
      </label>

      <button
        id="category-filter-button"
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby="category-filter-label category-filter-button"
        className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow cursor-pointer flex justify-between items-center hover:border-gray-400 transition w-full"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="capitalize text-slate-800">
          {selectedCategory || "All"}
        </span>
        <ChevronDown
          className={`h-4 w-4 transform transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id="category-filter-list"
            className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            transition={{ duration: 0.2 }}
            role="listbox"
            aria-labelledby="category-filter-label"
            data-testid="category-list"
            tabIndex={-1}
          >
            <li
              role="option"
              aria-selected={selectedCategory === ""}
              tabIndex={0}
              onClick={() => handleSelect("")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSelect("");
                }
              }}
              className={`px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer ${
                selectedCategory === ""
                  ? "bg-blue-500 font-semibold text-white"
                  : ""
              }`}
            >
              All
            </li>
            {categories.map((cat) => (
              <li
                key={cat}
                role="option"
                aria-selected={selectedCategory === cat}
                tabIndex={0}
                onClick={() => handleSelect(cat)}
                data-testid={"category-" + cat.toLowerCase()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSelect(cat);
                  }
                }}
                className={`px-4 py-2 hover:bg-blue-600 cursor-pointer capitalize hover:text-white ${
                  selectedCategory === cat
                    ? "bg-blue-500 font-semibold text-white"
                    : ""
                }`}
              >
                {cat}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryFilter;
