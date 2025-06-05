import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../components/Navbar";
import AppRoutes from "./routes";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="p-4">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
};

export default App;
