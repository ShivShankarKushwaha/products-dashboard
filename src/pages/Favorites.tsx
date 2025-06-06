import React from "react";
import { useAppSelector } from "../app/hooks";
import ProductCard from "../components/ProductCard";
import PageWrapper from "../components/PageWrapper";

const Favorites: React.FC = () => {
  const favorites = useAppSelector((state) => state.favorites.items);

  return (
    <PageWrapper>
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-xl font-bold mb-4" tabIndex={-1}>
          Your Favorites
        </h1>

        {favorites.length === 0 ? (
          <p className="text-gray-500" aria-live="polite">
            No favorite products yet.
          </p>
        ) : (
          <section
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            aria-label="Favorite products"
          >
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        )}
      </div>
      <meta name="title" content="Your Favorite Products" />
      <meta
        name="description"
        content="View your favorite products. Easily browse and manage your favorite items."
      />
    </PageWrapper>
  );
};

export default Favorites;
