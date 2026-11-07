
import { Link, NavLink } from "react-router-dom";
import { CalendarDays, Menu } from "lucide-react";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore Organizers", path: "/explore" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600 p-2 text-white">
            <CalendarDays size={22} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            Event<span className="text-blue-600">Connect</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Authentication */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/login"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          className="text-gray-700 md:hidden"
        >
          <Menu size={25} />
        </button>

      </nav>
    </header>
  );
};

export default Navbar;
