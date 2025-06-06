import React from "react";
import type { Product } from "../types/product";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { motion } from "framer-motion";
import {
  addToFavorites,
  removeFromFavorites,
} from "../features/favorites/favoritesSlice";
import { Heart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}
const favoriteVariants = {
  rest: {
    x: -100,
    opacity: 0,
  },
  hover: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  focus: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((fav) => fav.id === product.id);
  const stars = React.useMemo(() => Math.floor(Math.random() * 5) + 1, []);
  const noOfReviews = React.useMemo(
    () => Math.floor(Math.random() * 100) + 1,
    [],
  );

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group shadow-inner shadow-slate-400/70 rounded-xl shadow-sm p-4 bg-white hover:shadow-inner transition duration-200 relative overflow-hidden"
      aria-label={`Product card for ${product.title}`}
    >
      <Link
        to={`/product/${product.id}`}
        aria-label={`View details for ${product.title}`}
        tabIndex={0}
      >
        <motion.span
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute bottom-4 right-2 group-hover:right-4 transition-all duration-300 flex gap-1 items-center bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow"
          aria-label={`${stars} stars, ${noOfReviews} reviews`}
        >
          <span>{`(${noOfReviews})`}</span>
          {Array.from({ length: Math.floor(stars) }, (_, index) => (
            <Star
              key={index}
              className="w-5 h-5 text-yellow-600"
              fill="yellow"
              aria-hidden="true"
              focusable="false"
            />
          ))}
        </motion.span>
        <img
          src={product.image}
          alt={product.title ? `Image of ${product.title}` : "Product image"}
          className="h-40 mx-auto object-contain mb-4"
          loading="lazy"
        />
        <h2 className="text-sm font-semibold mb-1 truncate">{product.title}</h2>
        <p className="text-blue-600 font-bold text-md">
          ${product.price.toFixed(2)}
        </p>
      </Link>
      <motion.button
        variants={favoriteVariants}
        onClick={toggleFavorite}
        className="mt-2 text-red-500 hover:text-red-700 cursor-pointer transition-colors duration-200"
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={isFavorite}
        type="button"
        tabIndex={0}
      >
        {isFavorite ? (
          <Heart
            className="w-5 h-5 inline"
            fill="red"
            aria-hidden="true"
            focusable="false"
          />
        ) : (
          <Heart
            className="w-5 h-5 inline"
            aria-hidden="true"
            focusable="false"
          />
        )}
      </motion.button>
    </motion.article>
  );
};

export default ProductCard;
