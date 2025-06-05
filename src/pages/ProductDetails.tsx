import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../types/product";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addToFavorites,
  removeFromFavorites,
} from "../features/favorites/favoritesSlice";
import Loader from "../components/Loader";
import { Heart } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { fetchProductById } from "../api";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((p) => p.id === Number(id));

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id!);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const toggleFavorite = () => {
    if (product) {
      if (isFavorite) {
        dispatch(removeFromFavorites(product.id));
      } else {
        dispatch(addToFavorites(product));
      }
    }
  };

  if (loading) {
    return <Loader />;
  }
  if (!product) {
    return <p className="text-red-500">Product not found.</p>;
  }

  return (
    <PageWrapper>
      <div className="p-4 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-80 object-contain mx-auto md:w-1/2"
          />
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-semibold text-blue-600 mb-4">
              ${product.price}
            </p>
            <button
              onClick={toggleFavorite}
              className="text-red-500 text-sm flex items-center gap-2 cursor-pointer hover:text-red-700 transition-colors duration-200"
            >
              {isFavorite ? <Heart fill="red" /> : <Heart />}
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProductDetails;
