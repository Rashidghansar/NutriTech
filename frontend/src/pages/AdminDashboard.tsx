import React from 'react';
import { motion } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-4xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-brand-primary">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome to the admin dashboard. This page is currently under development.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminDashboard; 