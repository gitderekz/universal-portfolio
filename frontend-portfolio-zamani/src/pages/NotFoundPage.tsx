import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { ThreeBackground } from '../components/ThreeBackground';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ThreeBackground variant="particles" />
      <div className="relative z-10 text-center px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 100 }}>
          <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">404</h1>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          The page you're looking for doesn't exist
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex gap-4 justify-center">
          <Link to="/" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow flex items-center">
            <Home className="w-5 h-5 mr-2" />Go Home
          </Link>
          <button onClick={() => window.history.back()} className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:border-purple-600 transition-colors flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2" />Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
};
