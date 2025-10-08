import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { MapPin, User, LogOut, Menu, X, Shield, Search } from 'lucide-react';
import NeonLogo from '../NeonLogo';
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
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      shouldBeTransparent 
        ? 'bg-transparent backdrop-blur-sm' 
        : 'bg-white shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <NeonLogo 
              size={shouldBeTransparent ? 'h-10 w-auto' : 'h-12 w-auto'} 
              className="transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? shouldBeTransparent 
                      ? 'text-white bg-white bg-opacity-20' 
                      : 'text-primary-600 bg-primary-50'
                    : shouldBeTransparent
                      ? 'text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Global Search */}
            <form onSubmit={handleGlobalSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-4 w-4 ${shouldBeTransparent ? 'text-gray-300' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                placeholder="Search places..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className={`pl-10 pr-4 py-2 w-64 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  shouldBeTransparent 
                    ? 'bg-white bg-opacity-20 border-white border-opacity-30 text-white placeholder-gray-300' 
                    : 'border border-gray-300'
                }`}
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
                    className={`flex items-center space-x-1 text-sm font-medium ${
                      shouldBeTransparent 
                        ? 'text-white hover:text-gray-200' 
                        : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <Link
                  to="/profile"
                  className={`flex items-center space-x-1 text-sm font-medium ${
                    shouldBeTransparent 
                      ? 'text-white hover:text-gray-200' 
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className={`flex items-center space-x-1 text-sm font-medium ${
                    shouldBeTransparent 
                      ? 'text-white hover:text-red-300' 
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`text-sm font-medium ${
                    shouldBeTransparent 
                      ? 'text-white hover:text-gray-200' 
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    shouldBeTransparent 
                      ? 'bg-white text-gray-900 hover:bg-gray-100' 
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
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
              className={`focus:outline-none ${
                shouldBeTransparent 
                  ? 'text-white hover:text-gray-200' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
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
          <div className="md:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${
              shouldBeTransparent 
                ? 'border-t border-white border-opacity-20' 
                : 'border-t border-gray-200'
            }`}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.path)
                      ? shouldBeTransparent 
                        ? 'text-white bg-white bg-opacity-20' 
                        : 'text-primary-600 bg-primary-50'
                      : shouldBeTransparent
                        ? 'text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div className={`pt-3 mt-3 ${
                  shouldBeTransparent 
                    ? 'border-t border-white border-opacity-20' 
                    : 'border-t border-gray-200'
                }`}>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                        shouldBeTransparent 
                          ? 'text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10' 
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Shield className="h-5 w-5" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      shouldBeTransparent 
                        ? 'text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10' 
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>{user?.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                      shouldBeTransparent 
                        ? 'text-white hover:text-red-300 hover:bg-white hover:bg-opacity-10' 
                        : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                    }`}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className={`pt-3 mt-3 space-y-1 ${
                  shouldBeTransparent 
                    ? 'border-t border-white border-opacity-20' 
                    : 'border-t border-gray-200'
                }`}>
                  <Link
                    to="/login"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      shouldBeTransparent 
                        ? 'text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10' 
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      shouldBeTransparent 
                        ? 'bg-white text-gray-900 hover:bg-gray-100' 
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
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
