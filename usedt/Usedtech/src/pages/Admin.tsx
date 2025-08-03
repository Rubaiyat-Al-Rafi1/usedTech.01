import React, { useState } from 'react';
import { BarChart3, Users, Package, ShoppingCart, TrendingUp, Eye, Edit, Trash2, MessageSquare } from 'lucide-react';
import { products } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const stats = [
    { name: 'Total Listings', value: '1,234', icon: Package, color: 'bg-blue-500', change: '+12%' },
    { name: 'Active Users', value: '5,678', icon: Users, color: 'bg-green-500', change: '+8%' },
    { name: 'Transactions', value: '890', icon: ShoppingCart, color: 'bg-purple-500', change: '+15%' },
    { name: 'Revenue', value: '$45,678', icon: TrendingUp, color: 'bg-yellow-500', change: '+23%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your UsedTech marketplace</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
                { id: 'listings', name: 'Listings', icon: Package },
                { id: 'users', name: 'Users', icon: Users },
                { id: 'transactions', name: 'Transactions', icon: ShoppingCart },
                { id: 'reports', name: 'Reports', icon: MessageSquare },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change} from last month</p>
                    </div>
                    <div className={`${stat.color} rounded-lg p-3`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Listings</h2>
                <div className="space-y-4">
                  {products.slice(0, 5).map((product) => (
                    <div key={product.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">${product.price.toFixed(2)} • {product.seller.name}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.condition === 'new' ? 'bg-green-100 text-green-800' :
                        product.condition === 'like-new' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.condition}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Platform Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-green-100 rounded-full p-2">
                      <Package className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New listing: Arduino Uno R3</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 rounded-full p-2">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New user registered</p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-purple-100 rounded-full p-2">
                      <ShoppingCart className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Transaction completed</p>
                      <p className="text-xs text-gray-500">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Listings Management */}
        {activeTab === 'listings' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Listings Management</h2>
                <div className="flex space-x-2">
                  <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                    <option>All Categories</option>
                    <option>Microcontrollers</option>
                    <option>Sensors</option>
                    <option>Motors</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Sold</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Product</th>
                      <th className="text-left py-3 px-4">Seller</th>
                      <th className="text-left py-3 px-4">Category</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Condition</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 10).map((product) => (
                      <tr key={product.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-500">ID: {product.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <img
                              src={product.seller.avatar}
                              alt={product.seller.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-sm">{product.seller.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{product.category}</td>
                        <td className="py-3 px-4 font-semibold">${product.price.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            product.condition === 'new' ? 'bg-green-100 text-green-800' :
                            product.condition === 'like-new' ? 'bg-blue-100 text-blue-800' :
                            product.condition === 'good' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {product.condition}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            product.sold ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {product.sold ? 'Sold' : 'Active'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-700">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs would be implemented similarly */}
        {activeTab !== 'dashboard' && activeTab !== 'listings' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h2>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h3>
                <p className="text-gray-600">This section is under development.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;