import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import { categories } from '../data/mockData';

const Categories: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Categories
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect electronic components for your next project. From microcontrollers to sensors, we have everything you need.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Popular Searches */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Searches</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Arduino Uno', 'ESP32', 'Raspberry Pi', 'Servo Motors', 'DHT22', 
              'Ultrasonic Sensor', 'LED Strip', 'Breadboard', 'Jumper Wires', 
              'Stepper Motor', 'OLED Display', 'Power Supply'
            ].map((search) => (
              <Link
                key={search}
                to={`/products?search=${encodeURIComponent(search)}`}
                className="bg-white text-gray-700 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-primary-300"
              >
                {search}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;