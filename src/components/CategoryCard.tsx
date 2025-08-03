import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const IconComponent = LucideIcons[category.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;

  return (
    <Link
      to={`/category/${category.slug}`}
      className="group block"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-105">
        {/* Category Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white bg-opacity-90 rounded-full p-4 group-hover:bg-opacity-100 transition-all duration-300">
              <IconComponent className="h-8 w-8 text-primary-600" />
            </div>
          </div>
        </div>
        
        {/* Category Info */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {category.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {category.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-primary-600 font-medium">
              {category.productCount} items available
            </span>
            <span className="text-sm text-gray-500">
              {category.subcategories.length} subcategories
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;