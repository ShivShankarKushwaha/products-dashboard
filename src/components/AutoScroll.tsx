import { useMemo } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";

const AutoScroll = () => {
  const allProducts = useAppSelector((state) => state.products.items);
  const products = useMemo(() => allProducts.slice(0, 10), [allProducts]);

  const loopProducts = [...products];

  return (
    <div className="overflow-hidden relative bg-gray-50 py-8">
      <p className="text-xl font-bold textslate-800 my-5">Trending</p>
      <motion.div
        className="flex gap-4 w-max"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
      >
        {loopProducts.map((product, idx) => (
          <Link
            to={`/product/${product.id}`}
            key={idx}
            className="min-w-[200px] max-w-[200px] bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center hover:shadow-inner transition-shadow duration-300 hover:cursor-pointer hover:shadow-slate-400"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-32 object-contain mb-2"
            />
            <p className="text-sm font-medium text-center">{product.title}</p>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default AutoScroll;
