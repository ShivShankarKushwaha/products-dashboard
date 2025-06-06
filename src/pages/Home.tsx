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
// import { AdComponent } from "../components/Ads";

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
    return (
      <p className="text-red-500" role="alert" aria-live="assertive">
        {error}
      </p>
    );
  }

  return (
    <PageWrapper>
      {/* <AdComponent adType="banner" className="mb-4 w-20 h-20 border bg-red-600" ariaLabel="Advertisement banner" /> */}
      <main
        className="p-4 max-w-6xl mx-auto"
        tabIndex={-1}
        aria-label="Main content"
      >
        <header>
          <h1 className="text-3xl font-extrabold mb-4" tabIndex={0}>
            Products
          </h1>
        </header>
        <nav
          aria-label="Product filters"
          className="flex flex-col md:flex-row md:gap-4 mb-6"
        >
          <SearchBar aria-label="Search products" />
          <CategoryFilter aria-label="Filter by category" />
          <SortDropdown aria-label="Sort products" />
        </nav>

        {products.length === 0 ? (
          <p className="text-gray-600" role="status" aria-live="polite">
            No products found.
          </p>
        ) : (
          <section aria-labelledby="products-heading">
            <AutoScroll />
            <h2 id="products-heading" className="sr-only">
              Product List
            </h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </main>
    </PageWrapper>
  );
};

export default Home;
