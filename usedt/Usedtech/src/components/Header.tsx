import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Cpu, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors">
            <Cpu className="h-8 w-8" />
            <span className="text-2xl font-bold">UsedTech</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for Arduino, ESP, sensors..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
              Browse
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-primary-600 transition-colors">
              Categories
            </Link>
            
            {user && (
              <Link 
                to="/sell" 
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Sell</span>
              </Link>
            )}
            
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors">
                  <User className="h-6 w-6" />
                  <span>{user.name}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Profile
                    </Link>
                    <Link to="/my-listings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      My Listings
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Orders
                    </Link>
                    <Link to="/messages" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Messages
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="mb-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </form>
            </div>
            <div className="space-y-2">
              <Link to="/products" className="block py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Browse
              </Link>
              <Link to="/categories" className="block py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Categories
              </Link>
              {user && (
                <Link to="/sell" className="block py-2 text-green-600 hover:text-green-700 transition-colors">
                  Sell Item
                </Link>
              )}
              <Link to="/cart" className="block py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Cart ({itemCount})
              </Link>
              {user ? (
                <div className="pt-2 border-t border-gray-200">
                  <div className="text-sm text-gray-500 mb-2">Welcome, {user.name}</div>
                  <Link to="/profile" className="block py-2 text-gray-700 hover:text-primary-600 transition-colors">
                    Profile
                  </Link>
                  <Link to="/my-listings" className="block py-2 text-gray-700 hover:text-primary-600 transition-colors">
                    My Listings
                  </Link>
                  <Link to="/orders" className="block py-2 text-gray-700 hover:text-primary-600 transition-colors">
                    Orders
                  </Link>
                  <Link to="/messages" className="block py-2 text-gray-700 hover:text-primary-600 transition-colors">
                    Messages
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block py-2 text-gray-700 hover:text-primary-600 transition-colors">
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-gray-200 space-y-2">
                  <Link to="/login" className="block py-2 text-gray-700 hover:text-primary-600 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="block py-2 bg-primary-600 text-white rounded-lg text-center hover:bg-primary-700 transition-colors">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;