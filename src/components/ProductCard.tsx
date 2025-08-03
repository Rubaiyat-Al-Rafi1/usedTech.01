import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Eye, MapPin, Clock, Shield } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'like-new': return 'bg-blue-100 text-blue-800';
      case 'good': return 'bg-yellow-100 text-yellow-800';
      case 'fair': return 'bg-orange-100 text-orange-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCondition = (condition: string) => {
    return condition.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Condition Badge */}
          <div className={`absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-semibold ${getConditionColor(product.condition)}`}>
            {formatCondition(product.condition)}
          </div>
          
          {/* Original Price Discount */}
          {product.originalPrice && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
          
          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-10 right-2 bg-purple-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              Featured
            </div>
          )}
          
          {/* View Count */}
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs flex items-center space-x-1">
            <Eye className="h-3 w-3" />
            <span>{product.views}</span>
          </div>
        </div>
        
        <div className="p-4">
          {/* Category and Rating */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">{product.category}</span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">
                {product.averageRating > 0 ? product.averageRating.toFixed(1) : 'No reviews'}
              </span>
            </div>
          </div>
          
          {/* Product Name */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          {/* Seller Info */}
          <div className="flex items-center space-x-2 mb-3">
            <img
              src={product.seller.avatar}
              alt={product.seller.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-600">{product.seller.name}</span>
            {product.seller.verified && (
              <Shield className="h-4 w-4 text-green-500" />
            )}
          </div>
          
          {/* Location and Time */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{product.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{new Date(product.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-600">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            <button
              onClick={handleAddToCart}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </div>
          
          {/* Stock Status */}
          <div className="mt-3 text-sm">
            {product.stock > 0 ? (
              <span className="text-green-600">✓ Available ({product.stock} left)</span>
            ) : (
              <span className="text-red-600">✗ Sold Out</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;