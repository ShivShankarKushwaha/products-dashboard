import React, { useState, useRef, useEffect } from "react";
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const handleSelect = (value: string) => {
    dispatch(setSort(value as "asc" | "desc"));
    setOpen(false);
    buttonRef.current?.focus();
  };

  const selectedLabel =
    options.find((opt) => opt.value === sortOrder)?.label || "Default";

  return (
    <div className="relative w-full md:w-64 mb-4">
      <label
        id="sort-label"
        htmlFor="sort-dropdown"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Sort by Price
      </label>

      <button
        id="sort-dropdown"
        ref={buttonRef}
        type="button"
        className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow cursor-pointer flex justify-between items-center hover:border-gray-400 transition w-full"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby="sort-label sort-dropdown"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={`h-4 w-4 transform transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            transition={{ duration: 0.2 }}
            role="listbox"
            aria-labelledby="sort-label"
            tabIndex={-1}
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={sortOrder === opt.value}
                tabIndex={0}
                onClick={() => handleSelect(opt.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSelect(opt.value);
                  }
                }}
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
      {/* SEO: Add a visually hidden description for screen readers */}
      <span id="sort-description" className="sr-only">
        Choose how to sort products by price.
      </span>
    </div>
  );
};

export default SortDropdown;
