import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, Zap, Star, TrendingUp, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { products, categories } from '../data/mockData';

const Home: React.FC = () => {
  const featuredProducts = products.filter(product => product.featured);
  const topCategories = categories.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Buy & Sell Used Electronics
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              The trusted marketplace for engineers and students to buy and sell Arduino, ESP modules, sensors, and electronic components
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/products"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Start Shopping</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/sell"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors inline-flex items-center justify-center"
              >
                Sell Your Items
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose UsedTech?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The safest and most trusted platform for buying and selling used electronics
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Sellers</h3>
              <p className="text-gray-600">All sellers are verified with ratings and reviews from real buyers</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
              <p className="text-gray-600">Join thousands of engineers and students in our community</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">Detailed condition reports and buyer protection on every purchase</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">10,000+</div>
              <div className="text-gray-600">Active Listings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">5,000+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">50,000+</div>
              <div className="text-gray-600">Items Sold</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Listings
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hand-picked quality components from trusted sellers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/products"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>View All Listings</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find exactly what you need for your next project
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/categories"
              className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center space-x-2"
            >
              <span>View All Categories</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to buy or sell your electronics safely
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Buying Process */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center">For Buyers</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold">Browse & Search</h4>
                    <p className="text-gray-600">Find the components you need using our advanced search and filters</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold">Contact Seller</h4>
                    <p className="text-gray-600">Ask questions and arrange payment and delivery details</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold">Complete Purchase</h4>
                    <p className="text-gray-600">Pay securely and receive your items with buyer protection</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Selling Process */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center">For Sellers</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold">Create Listing</h4>
                    <p className="text-gray-600">Upload photos, describe condition, and set your price</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold">Connect with Buyers</h4>
                    <p className="text-gray-600">Respond to questions and negotiate terms</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold">Complete Sale</h4>
                    <p className="text-gray-600">Receive payment and ship your item safely</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of engineers and students buying and selling electronics on UsedTech
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Sign Up Free
            </Link>
            <Link
              to="/products"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Start Browsing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;