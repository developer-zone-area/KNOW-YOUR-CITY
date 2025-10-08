import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ children, className = '', onClick, ...props }) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 10
      }}
      className={className}
      onClick={onClick}
      {...props}
    >
      <motion.span
        initial={{ opacity: 1 }}
        whileHover={{ opacity: 0.9 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

export default AnimatedButton;

