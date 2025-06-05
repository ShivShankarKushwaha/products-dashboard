import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetails";
import Favorites from "../pages/Favorites";

const NotFound = () => (
  <div className="text-center mt-10 text-lg font-semibold text-red-600">
    404 - Page Not Found
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
