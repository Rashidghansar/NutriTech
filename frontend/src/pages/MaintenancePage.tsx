import React from 'react';
import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const MaintenancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <ExclamationTriangleIcon className="mx-auto h-24 w-24 text-amber-500 mb-6" />
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Under Maintenance</h1>
        <p className="text-gray-600 mb-6">
          We're currently performing some system upgrades to improve your experience. 
          Please check back soon.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            to="/" 
            className="bg-brand-primary text-white px-6 py-3 rounded-full hover:bg-green-600 transition"
          >
            Return to Home
          </Link>
          <a 
            href="mailto:support@foodgrade.com" 
            className="bg-brand-secondary text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage; 