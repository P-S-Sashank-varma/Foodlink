import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Heart, ShoppingBag, Mail, LogIn, UserPlus, LogOut } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md text-gray-100 shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-3xl font-bold flex items-center">
              <span className="text-3xl font-extrabold tracking-tight text-yellow-400">Food</span>
              <span className="text-3xl font-extrabold tracking-tight text-blue-300">Link</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="flex items-center px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200">
              <Home className="w-5 h-5 mr-1" />
              <span>Home</span>
            </Link>
            
            {user && (
              <Link to="/donate" className="flex items-center px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200">
                <Heart className="w-5 h-5 mr-1" />
                <span>Donate</span>
              </Link>
            )}
            
            <Link to="/request" className="flex items-center px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200">
              <ShoppingBag className="w-5 h-5 mr-1" />
              <span>Request</span>
            </Link>
            
            <Link to="/contact" className="flex items-center px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200">
              <Mail className="w-5 h-5 mr-1" />
              <span>Contact</span>
            </Link>
            
            {!user ? (
              <>
                <Link to="/login" className="ml-2 flex items-center px-4 py-2 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-300 transition-all duration-200">
                  <LogIn className="w-5 h-5 mr-1" />
                  <span>Login</span>
                </Link>
                <Link to="/signup" className="flex items-center px-4 py-2 border border-gray-400 rounded-lg hover:bg-white/10 transition-all duration-200">
                  <UserPlus className="w-5 h-5 mr-1" />
                  <span>Sign Up</span>
                </Link>
              </>
            ) : (
              <button
                onClick={onLogout}
                className="flex items-center px-4 py-2 border border-gray-400 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                <LogOut className="w-5 h-5 mr-1" />
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-white/10 transition-all"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-4 space-y-1 bg-black/90 backdrop-blur-md">
            <Link 
              to="/"
              className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="w-5 h-5 mr-3" />
              <span>Home</span>
            </Link>
            
            {user && (
              <Link 
                to="/donate" 
                className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="w-5 h-5 mr-3" />
                <span>Donate</span>
              </Link>
            )}
            
            <Link 
              to="/request" 
              className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingBag className="w-5 h-5 mr-3" />
              <span>Request</span>
            </Link>
            
            <Link 
              to="/contact" 
              className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <Mail className="w-5 h-5 mr-3" />
              <span>Contact</span>
            </Link>
            
            {!user ? (
              <>
                <Link 
                  to="/login" 
                  className="flex items-center px-4 py-3 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-300 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="w-5 h-5 mr-3" />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/signup" 
                  className="flex items-center px-4 py-3 border border-gray-400 rounded-lg hover:bg-white/10 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserPlus className="w-5 h-5 mr-3" />
                  <span>Sign Up</span>
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  onLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center w-full text-left px-4 py-3 border border-gray-400 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Copyright - Small screens only on footer */}
      <div className="container mx-auto px-4 pb-2 text-center md:hidden">
        <div className="text-xs text-gray-300">&copy; 2024 FoodLink</div>
      </div>
    </nav>
  );
};

export default Navbar;