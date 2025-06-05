import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts } from "../features/products/productsThunks";
import { selectFilteredProducts } from "../features/products/productsSelectors";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown from "../components/SortDropdown";
import PageWrapper from "../components/PageWrapper";
import AutoScroll from "../components/AutoScroll";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectFilteredProducts);
  const status = useAppSelector((state) => state.products.status);
  const error = useAppSelector((state) => state.products.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <Loader />;
  }
  if (status === "failed") {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <PageWrapper>
      <div className="p-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:gap-4 mb-6">
          <SearchBar />
          <CategoryFilter />
          <SortDropdown />
        </div>

        {products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <div>
            <AutoScroll />
            <p className="text-xl font-bold my-5">Products</p>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Home;
