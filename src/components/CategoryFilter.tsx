import React, { useEffect, useState } from "react";
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

  const handleSelect = (category: string) => {
    dispatch(setCategory(category));
    setOpen(false);
  };

  return (
    <div className="relative w-full md:w-80 mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Filter by Category
      </label>

      <div
        className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow cursor-pointer flex justify-between items-center hover:border-gray-400 transition"
        onClick={() => setOpen(!open)}
      >
        <span className="capitalize text-slate-800">
          {selectedCategory || "All"}
        </span>
        <ChevronDown
          className={`h-4 w-4 transform transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            transition={{ duration: 0.2 }}
          >
            <li
              onClick={() => handleSelect("")}
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
                onClick={() => handleSelect(cat)}
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
