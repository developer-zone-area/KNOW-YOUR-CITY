import React from 'react';
import { motion } from 'framer-motion';

const NeonLogo = ({ className = '', size = 'h-12 w-auto' }) => {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0.7 }}
      animate={{
        opacity: [0.7, 1, 0.7],
        filter: [
          'drop-shadow(0 0 5px #00ff00) drop-shadow(0 0 10px #00ff00) drop-shadow(0 0 15px #00ff00)',
          'drop-shadow(0 0 10px #00ffff) drop-shadow(0 0 20px #00ffff) drop-shadow(0 0 30px #00ffff) drop-shadow(0 0 40px #00ffff)',
          'drop-shadow(0 0 10px #ff00ff) drop-shadow(0 0 20px #ff00ff) drop-shadow(0 0 30px #ff00ff) drop-shadow(0 0 40px #ff00ff)',
          'drop-shadow(0 0 10px #ff6600) drop-shadow(0 0 20px #ff6600) drop-shadow(0 0 30px #ff6600) drop-shadow(0 0 40px #ff6600)',
          'drop-shadow(0 0 5px #00ff00) drop-shadow(0 0 10px #00ff00) drop-shadow(0 0 15px #00ff00)'
        ]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Multiple glow layers for enhanced neon effect */}
      <motion.img
        src="/logo3.jpg"
        alt="Know Your City Logo"
        className={`${size} rounded-lg`}
        style={{
          filter: 'brightness(1.1) contrast(1.2)',
          animation: 'pulse-glow 2s ease-in-out infinite alternate'
        }}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Additional glow overlay */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.1) 50%, transparent 70%)',
          mixBlendMode: 'screen'
        }}
        animate={{
          opacity: [0, 0.8, 0],
          background: [
            'linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.1) 50%, transparent 70%)',
            'linear-gradient(45deg, transparent 30%, rgba(255, 0, 255, 0.1) 50%, transparent 70%)',
            'linear-gradient(45deg, transparent 30%, rgba(255, 102, 0, 0.1) 50%, transparent 70%)',
            'linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.1) 50%, transparent 70%)'
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default NeonLogo;