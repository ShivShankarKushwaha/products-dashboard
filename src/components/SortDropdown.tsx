import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSort } from "../features/filters/filtersSlice";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const options = [
  { label: "Default", value: "" },
  { label: "Price: Low → High", value: "asc" },
  { label: "Price: High → Low", value: "desc" },
];

const SortDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const sortOrder = useAppSelector((state) => state.filters.sort);
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    dispatch(setSort(value as "asc" | "desc"));
    setOpen(false);
  };

  const selectedLabel =
    options.find((opt) => opt.value === sortOrder)?.label || "Default";

  return (
    <div className="relative w-full md:w-64 mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Sort by Price
      </label>

      <div
        className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow cursor-pointer flex justify-between items-center hover:border-gray-400 transition"
        onClick={() => setOpen(!open)}
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={`h-4 w-4 transform transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            transition={{ duration: 0.2 }}
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer ${
                  sortOrder === opt.value
                    ? "bg-blue-500 text-white font-semibold"
                    : ""
                }`}
              >
                {opt.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDropdown;
