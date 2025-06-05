import { Link } from "react-router-dom";

const Navbar = () => (
  <header className="bg-white shadow p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold text-blue-600">
      <Link className="flex gap-2" to="/">
        <span className="hidden sm:block">🛒</span>FakeStore
      </Link>
    </h1>
    <nav className="space-x-4">
      <Link to="/" className="text-gray-700 hover:text-blue-500">
        Home
      </Link>
      <Link to="/favorites" className="text-gray-700 hover:text-blue-500">
        Favorites
      </Link>
    </nav>
  </header>
);

export default Navbar;
