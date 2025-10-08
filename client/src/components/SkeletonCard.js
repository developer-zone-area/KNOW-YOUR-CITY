import React from 'react';
import { motion } from 'framer-motion';

const SkeletonCard = ({ type = 'city' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative h-48 bg-gray-200 animate-pulse">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'linear'
          }}
          style={{ opacity: 0.3 }}
        />
      </div>
      <div className="p-6 space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
      </div>
    </motion.div>
  );
};

export default SkeletonCard;

