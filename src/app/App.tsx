import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../components/Navbar";
import AppRoutes from "./routes";
import Footer from "../components/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="p-4 min-h-[85.8vh]">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
