import { Link } from "react-router-dom";

const Navbar = () => (
  <header className="bg-white shadow p-4">
    <div className="flex justify-between items-center" role="banner">
      <h1 className="text-xl font-bold text-blue-600">
        <Link
          to="/"
          className="flex gap-2 items-center"
          aria-label="Go to homepage"
          title="FakeStore Home"
        >
          <span className="hidden sm:block" aria-hidden="true">
            🛒
          </span>
          <span>FakeStore</span>
        </Link>
      </h1>

      <nav aria-label="Main navigation">
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-500"
              title="Home Page"
              aria-label="Home"
              data-testid="nav-home"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className="text-gray-700 hover:text-blue-500"
              title="Favorites Page"
              aria-label="Favorites"
              data-testid="nav-favorites"
            >
              Favorites
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Navbar;
