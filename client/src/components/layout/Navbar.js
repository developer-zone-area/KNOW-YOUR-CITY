import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { MapPin, User, LogOut, Menu, X, Shield, Search } from 'lucide-react';
import AnimatedLogoText from '../AnimatedLogoText';
// ...existing code...

const Navbar = ({ isTransparent = false }) => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;
  const shouldBeTransparent = isTransparent;

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      navigate(`/places?search=${encodeURIComponent(globalSearch.trim())}`);
      setGlobalSearch('');
    }
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/cities', label: 'Cities' },
    { path: '/places', label: 'Places' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 relative">
          {/* Logo - Positioned to overlap header */}
          <Link to="/" className="absolute left-8 -top-10 z-60">
            <div className="transition-all hover:scale-105 drop-shadow-2xl">
              <AnimatedLogoText 
                size="h-40 w-40" 
                className="transition-all duration-300"
              />
            </div>
          </Link>
          
          {/* Spacer for logo */}
          <div className="w-48"></div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-base font-bold transition-all shadow-md ${
                  isActive(item.path)
                    ? 'text-white bg-primary-600 shadow-lg'
                    : 'text-gray-900 bg-white hover:bg-primary-600 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Global Search */}
            <form onSubmit={handleGlobalSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search places..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 text-sm rounded-lg border border-gray-300 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </form>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-bold bg-white text-gray-900 hover:bg-primary-600 hover:text-white shadow-md transition-all"
                  >
                    <Shield className="h-5 w-5" />
                    <span>Admin</span>
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-bold bg-white text-gray-900 hover:bg-primary-600 hover:text-white shadow-md transition-all"
                >
                  <User className="h-5 w-5" />
                  <span>{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-bold bg-white text-gray-900 hover:bg-red-600 hover:text-white shadow-md transition-all"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-base font-bold bg-white text-gray-900 hover:bg-gray-100 shadow-md transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 rounded-lg font-bold bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-white text-gray-900 hover:bg-primary-600 hover:text-white shadow-md transition-all focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-b-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-lg text-base font-bold shadow-sm ${
                    isActive(item.path)
                      ? 'text-white bg-primary-600'
                      : 'text-gray-900 bg-gray-50 hover:bg-primary-600 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div className="pt-3 mt-3 border-t border-gray-200">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-bold text-gray-900 bg-gray-50 hover:bg-primary-600 hover:text-white shadow-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Shield className="h-5 w-5" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-bold text-gray-900 bg-gray-50 hover:bg-primary-600 hover:text-white shadow-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>{user?.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-bold w-full text-left text-gray-900 bg-gray-50 hover:bg-red-600 hover:text-white shadow-sm"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="pt-3 mt-3 space-y-1 border-t border-gray-200">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-lg text-base font-bold text-gray-900 bg-gray-50 hover:bg-gray-100 shadow-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-lg text-base font-bold bg-primary-600 text-white hover:bg-primary-700 shadow-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
