import React from 'react';
import { Link } from 'react-router-dom';
import { CameraIcon, ChartBarIcon, LightBulbIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  const topProducts = [
    { id: 1, name: 'Organic Quinoa', grade: 'A', descriptor: 'High Protein' },
    { id: 2, name: 'Green Smoothie', grade: 'B', descriptor: 'Low Sugar' },
    { id: 3, name: 'Whole Wheat Bread', grade: 'A', descriptor: 'Fiber Rich' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-4 text-brand-primary"
        >
          Scan. Grade. Eat Smarter.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl text-gray-600 mb-8"
        >
          Instant food insights at your fingertips
        </motion.p>

        {/* CTA Buttons */}
        <div className="flex justify-center space-x-4 mb-12">
          <Link 
            to="/scan" 
            className="bg-brand-primary text-white px-6 py-3 rounded-full hover:bg-green-600 transition"
          >
            Scan a Product
          </Link>
          <Link 
            to="/categories" 
            className="bg-brand-secondary text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
          >
            Explore Top-Rated Foods
          </Link>
        </div>

        {/* Live Scanner Widget (Placeholder) */}
        <div className="max-w-md mx-auto mb-12 relative">
          <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 border-4 border-brand-primary rounded-lg viewfinder-pulse pointer-events-none"></div>
            <button className="bg-white text-brand-primary px-4 py-2 rounded-full shadow-md hover:bg-gray-100">
              Enable Camera
            </button>
          </div>
        </div>

        {/* Top Graded Products Carousel */}
        <div className="flex justify-center space-x-4">
          {topProducts.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-4 rounded-lg shadow-md w-48"
            >
              <div className="h-32 bg-gray-100 mb-4 rounded"></div>
              <h3 className="font-bold">{product.name}</h3>
              <div className={`badge bg-${product.grade === 'A' ? 'grade-a' : 'grade-b'} text-white px-2 py-1 rounded`}>
                {product.grade}
              </div>
              <p className="text-sm text-gray-600">{product.descriptor}</p>
            </motion.div>
          ))}
        </div>

        {/* How-It-Works Infographic */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <CameraIcon className="mx-auto h-16 w-16 text-brand-primary mb-4" />
            <h4 className="font-bold mb-2">Scan</h4>
            <p className="text-gray-600">Point at barcode</p>
          </div>
          <div className="text-center">
            <ChartBarIcon className="mx-auto h-16 w-16 text-brand-secondary mb-4" />
            <h4 className="font-bold mb-2">Analyze</h4>
            <p className="text-gray-600">Get instant insights</p>
          </div>
          <div className="text-center">
            <LightBulbIcon className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
            <h4 className="font-bold mb-2">Discover</h4>
            <p className="text-gray-600">Find better options</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 