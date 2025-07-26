import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const ProductNotFoundPage: React.FC = () => {
  const location = useLocation();
  
  // Default error message if no state is passed
  const defaultMessage = 'We couldn\'t find the product you\'re looking for. It might have been removed or the barcode might be incorrect.';
  const defaultSuggestedAction = 'Try scanning another product or browsing categories';

  // Extract error details from navigation state
  const errorMessage = location.state?.message || defaultMessage;
  const suggestedAction = location.state?.suggestedAction || defaultSuggestedAction;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8 flex justify-center">
          <MagnifyingGlassIcon className="h-24 w-24 text-blue-500 opacity-70" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Product Not Found</h1>
        
        <p className="text-gray-600 mb-6">
          {errorMessage}
        </p>

        <p className="text-gray-600 italic mb-8">
          {suggestedAction}
        </p>

        <div className="flex flex-col space-y-4">
          <Link 
            to="/scan" 
            className="bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 text-center"
          >
            Scan Another Product
          </Link>
          
          <Link 
            to="/categories" 
            className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 text-center"
          >
            Browse Categories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductNotFoundPage; 