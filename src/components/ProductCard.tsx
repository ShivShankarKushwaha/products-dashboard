import React from "react";
import type { Product } from "../types/product";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addToFavorites,
  removeFromFavorites,
} from "../features/favorites/favoritesSlice";
import { Heart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((fav) => fav.id === product.id);
  const stars = React.useMemo(() => Math.floor(Math.random() * 5) + 1, []);
  const noOfReviews = React.useMemo(
    () => Math.floor(Math.random() * 100) + 1,
    [],
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  return (
    <div className="shadow-inner shadow-slate-400/70  rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition duration-200 relative">
      <Link to={`/product/${product.id}`}>
        <span className="absolute right-2 bottom-4 flex gap-1">
          <span>{`(${noOfReviews})`}</span>
          {Array.from({ length: Math.floor(stars) }, (_, index) => (
            <Star
              key={index}
              className={`w-5 h-5 text-yellow-600`}
              fill="yellow"
            />
          ))}
        </span>
        <img
          src={product.image}
          alt={product.title}
          className="h-40 mx-auto object-contain mb-4"
        />
        <h2 className="text-sm font-semibold mb-1 truncate">{product.title}</h2>
        <p className="text-blue-600 font-bold text-md">
          ${product.price.toFixed(2)}
        </p>
      </Link>
      <button
        onClick={toggleFavorite}
        className="mt-2 text-red-500 hover:text-red-700 cursor-pointer transition-colors duration-200"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? (
          <Heart className="w-5 h-5 inline" fill="red" />
        ) : (
          <Heart className="w-5 h-5 inline" />
        )}
      </button>
    </div>
  );
};

export default ProductCard;
