import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav
      className="fixed top-0 left-0 w-full h-16 bg-cover bg-center p-4 text-white flex items-center shadow-lg z-10"
      style={{ backgroundImage: "url('/images/foodimage.png')" }}
    >
      {/* Logo */}
      <div className="text-3xl font-bold flex items-center space-x-2">
        <span className="text-4xl tracking-wider text-yellow-300">Food</span>
        <span className="text-4xl tracking-wider text-blue-300">Link</span>
      </div>

      {/* Right-aligned menu items */}
      <ul className="flex space-x-8 ml-auto">
        <li>
          <Link
            to="/"
            className="text-lg font-semibold hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>
        </li>
        {user && (
          <li>
            <Link
              to="/donate"
              className="text-lg font-semibold hover:text-yellow-300 transition duration-300"
            >
              Donate
            </Link>
          </li>
        )}
        <li>
          <Link
            to="/request"
            className="text-lg font-semibold hover:text-yellow-300 transition duration-300"
          >
            Request
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="text-lg font-semibold hover:text-yellow-300 transition duration-300"
          >
            Contact
          </Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link
                to="/login"
                className="text-lg font-semibold hover:text-yellow-300 transition duration-300"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="text-lg font-semibold hover:text-yellow-300 transition duration-300"
              >
                Sign Up
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={onLogout}
              className="text-lg font-semibold hover:text-yellow-300 transition duration-300"
            >
              Logout
            </button>
          </li>
        )}
      </ul>

      {/* Right-aligned copyright */}
      <div className="ml-4 text-sm">
        &copy; 2024 FoodLink
      </div>
    </nav>
  );
};

export default Navbar;
