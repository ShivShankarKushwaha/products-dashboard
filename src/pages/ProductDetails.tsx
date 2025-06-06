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

const useProductSEO = (product: Product | null) => {
  useEffect(() => {
    if (product) {
      document.title = `${product.title} | Product Details`;
      const metaDesc = document.querySelector("meta[name='description']");
      if (metaDesc) {
        metaDesc.setAttribute("content", product.description);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = product.description;
        document.head.appendChild(meta);
      }
    }
    return () => {
      document.title = "Product Details";
    };
  }, [product]);
};

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

  useProductSEO(product);

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
    return (
      <p className="text-red-500" role="alert">
        Product not found.
      </p>
    );
  }
  return (
    <PageWrapper>
      <main
        className="p-4 max-w-4xl mx-auto"
        aria-labelledby="product-title"
        data-testid="product-details-main"
      >
        <div
          className="flex flex-col md:flex-row gap-6"
          data-testid="product-details-container"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-80 object-contain mx-auto md:w-1/2"
            loading="lazy"
            width={320}
            height={320}
            data-testid="product-image"
          />
          <div className="md:w-1/2" data-testid="product-info">
            <h1
              id="product-title"
              className="text-2xl font-bold mb-2"
              data-testid="product-title"
            >
              {product.title}
            </h1>
            <p className="text-gray-600 mb-4" data-testid="product-description">
              {product.description}
            </p>
            <p
              className="text-lg font-semibold text-blue-600 mb-4"
              data-testid="product-price"
            >
              <span aria-label="Price">${product.price}</span>
            </p>
            <button
              onClick={toggleFavorite}
              className="text-red-500 text-sm flex items-center gap-2 cursor-pointer hover:text-red-700 transition-colors duration-200"
              aria-pressed={isFavorite}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              type="button"
              data-testid="favorite-toggle"
            >
              {isFavorite ? (
                <Heart
                  fill="red"
                  aria-hidden="true"
                  data-testid="heart-filled"
                />
              ) : (
                <Heart aria-hidden="true" data-testid="heart-outline" />
              )}
              <span>
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </span>
            </button>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
};

export default ProductDetails;
