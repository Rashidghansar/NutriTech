import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  { id: 1, name: 'Fruits & Vegetables', grade: 'A', count: 42 },
  { id: 2, name: 'Dairy & Eggs', grade: 'B', count: 35 },
  { id: 3, name: 'Grains & Cereals', grade: 'A', count: 28 },
  { id: 4, name: 'Protein & Meat', grade: 'C', count: 22 },
  { id: 5, name: 'Snacks & Beverages', grade: 'D', count: 50 },
];

const CategoriesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-brand-primary">
          Food Categories
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <motion.div 
              key={category.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">{category.name}</h2>
                <span 
                  className={`px-3 py-1 rounded-full text-white font-bold 
                    ${category.grade === 'A' ? 'bg-grade-a' : 
                      category.grade === 'B' ? 'bg-grade-b' : 
                      category.grade === 'C' ? 'bg-grade-c' : 
                      category.grade === 'D' ? 'bg-grade-d' : 'bg-grade-f'}`}
                >
                  {category.grade}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                {category.count} products analyzed
              </p>
              <Link 
                to={`/category/${category.id}`} 
                className="block text-center bg-brand-secondary text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Explore Products
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl text-gray-600 mb-6">
            Discover healthier choices across different food categories
          </p>
          <Link 
            to="/scan" 
            className="bg-brand-primary text-white px-6 py-3 rounded-full hover:bg-green-600 transition"
          >
            Scan a New Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage; 