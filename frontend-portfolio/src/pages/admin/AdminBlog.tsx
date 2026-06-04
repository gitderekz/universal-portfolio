import React from 'react';
import { motion } from 'framer-motion';

export const AdminBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Blog Management</h1>
        <p className="text-gray-600 dark:text-gray-400">CRUD interface for Blog coming soon...</p>
      </motion.div>
    </div>
  );
};
