import { useMemo } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";

const AutoScroll = () => {
  const allProducts = useAppSelector((state) => state.products.items);
  const products = useMemo(() => allProducts.slice(0, 10), [allProducts]);

  const loopProducts = [...products, ...products];

  return (
    <section
      className="overflow-hidden relative bg-gray-50 py-8"
      aria-label="Trending products"
    >
      <h2 className="text-xl font-bold text-slate-800 my-5">Trending</h2>
      <motion.div
        className="flex gap-4 w-max"
        aria-live="polite"
        aria-roledescription="carousel"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {loopProducts.map((product, idx) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id + "-" + idx}
            className="min-w-[200px] max-w-[200px] bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center hover:shadow-inner transition-shadow duration-300 hover:cursor-pointer hover:shadow-slate-400"
            aria-label={`View details for ${product.title}`}
            tabIndex={0}
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-32 object-contain mb-2"
              loading="lazy"
              width={128}
              height={128}
            />
            <p className="text-sm font-medium text-center truncate w-full">
              {product.title}
            </p>
          </Link>
        ))}
      </motion.div>
    </section>
  );
};

export default AutoScroll;
