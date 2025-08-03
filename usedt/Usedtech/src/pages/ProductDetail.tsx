import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Shield, 
  Eye, 
  Heart, 
  Share2, 
  MessageCircle,
  Phone,
  Mail,
  ShoppingCart,
  User
} from 'lucide-react';
import { products } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CommentSection from '../components/CommentSection';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <Link to="/products" className="text-primary-600 hover:text-primary-700">
            ← Back to products
          </Link>
        </div>
      </div>
    );
  }

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

  const handleAddToCart = () => {
    addItem(product);
  };

  const handleAddComment = (content: string) => {
    // In a real app, this would make an API call
    console.log('Adding comment:', content);
  };

  const handleAddReply = (commentId: string, content: string) => {
    // In a real app, this would make an API call
    console.log('Adding reply to comment', commentId, ':', content);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/products" 
            className="text-primary-600 hover:text-primary-700 flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to products</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{product.category}</span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getConditionColor(product.condition)}`}>
                  {formatCondition(product.condition)}
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">
                    {product.averageRating > 0 ? `${product.averageRating.toFixed(1)} (${product.ratings.length} reviews)` : 'No reviews yet'}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Eye className="h-4 w-4" />
                  <span>{product.views} views</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="text-3xl font-bold text-primary-600">
                  ${product.price.toFixed(2)}
                </div>
                {product.originalPrice && (
                  <div className="text-lg text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </div>
                )}
                {product.originalPrice && (
                  <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => setShowContactInfo(!showContactInfo)}
                  className="flex-1 border border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Contact Seller</span>
                </button>
              </div>

              {/* Contact Information */}
              {showContactInfo && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{product.contactInfo.email}</span>
                    </div>
                    {product.contactInfo.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{product.contactInfo.phone}</span>
                      </div>
                    )}
                    {product.contactInfo.meetupLocation && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{product.contactInfo.meetupLocation}</span>
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-2">
                      Preferred contact: {product.contactInfo.preferredContact}
                    </div>
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <div className="text-green-600 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Available ({product.stock} left)</span>
                  </div>
                ) : (
                  <div className="text-red-600 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span>Sold Out</span>
                  </div>
                )}
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-4">Seller Information</h3>
              <div className="flex items-center space-x-4">
                <img
                  src={product.seller.avatar}
                  alt={product.seller.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">{product.seller.name}</h4>
                    {product.seller.verified && (
                      <Shield className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{product.seller.rating.toFixed(1)}</span>
                    </div>
                    <span>{product.seller.totalSales} sales</span>
                    <span>Joined {product.seller.joinedDate.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{product.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button className="py-4 px-1 border-b-2 border-primary-500 text-primary-600 font-medium text-sm">
                Description
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm">
                Specifications
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm">
                Reviews ({product.ratings.length})
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {/* Description Tab */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Product Description</h3>
              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
              
              {/* Specifications */}
              <h4 className="font-semibold mb-3">Specifications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <CommentSection
          comments={product.comments}
          onAddComment={handleAddComment}
          onAddReply={handleAddReply}
        />
      </div>
    </div>
  );
};

export default ProductDetail;