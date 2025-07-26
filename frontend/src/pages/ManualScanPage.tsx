import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const ManualScanPage: React.FC = () => {
  const [barcode, setBarcode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const sanitizedBarcode = barcode.trim();
    
    if (!sanitizedBarcode) {
      setError('Please enter a barcode');
      return;
    }
    
    if (!/^\d{13}$/.test(sanitizedBarcode)) {
      setError('Barcode must be 13 digits');
      return;
    }

    // Clear any previous errors
    setError('');

    // Navigate to product dashboard
    console.log('Navigating to product with barcode:', sanitizedBarcode);
    
    // Add additional logging to help diagnose navigation
    console.group('Manual Scan Navigation');
    console.log('Barcode:', sanitizedBarcode);
    console.log('Navigation target:', `/product/${sanitizedBarcode}`);
    console.log('Current URL:', window.location.href);
    console.groupEnd();

    // Use window.location as a fallback
    try {
      navigate(`/product/${sanitizedBarcode}`);
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = `/product/${sanitizedBarcode}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-brand-primary">
          Manual Barcode Entry
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="barcode" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter 13-Digit Barcode
            </label>
            <div className="relative">
              <input 
                type="text" 
                id="barcode"
                value={barcode}
                onChange={(e) => {
                  // Only allow numeric input
                  const numericValue = e.target.value.replace(/\D/g, '');
                  setBarcode(numericValue);
                }}
                maxLength={13}
                placeholder="e.g., 4001724819906"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <MagnifyingGlassIcon 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" 
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-brand-primary text-white py-3 rounded-lg hover:bg-brand-secondary transition duration-300"
          >
            Find Product
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Tip: Look for the barcode on the product packaging
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ManualScanPage; 