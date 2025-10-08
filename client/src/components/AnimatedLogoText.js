import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedLogoText = ({ className = '', size = 'h-12 w-auto' }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  // Text that appears in your logo - adjust these to match your logo text
  const logoText = ["KNOW", "YOUR", "CITY"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % logoText.length);
    }, 1500); // Change word every 1.5 seconds
    
    return () => clearInterval(interval);
  }, [logoText.length]);

  const glowVariants = {
    hidden: { 
      opacity: 0.3,
      textShadow: '0 0 5px rgba(0, 255, 255, 0.3)'
    },
    visible: {
      opacity: 1,
      textShadow: [
        '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff',
        '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff',
        '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00',
        '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Your logo image as background */}
      <img
        src="/logo3.jpg"
        alt="Know Your City Logo"
        className={`${size} rounded-lg`}
        style={{
          filter: 'brightness(1.1) contrast(1.1)'
        }}
      />
      
      {/* Animated text overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          {logoText.map((word, index) => (
            <motion.div
              key={word}
              className="inline-block mx-1"
              variants={glowVariants}
              initial="hidden"
              animate={currentWordIndex === index ? "visible" : "hidden"}
              transition={{ duration: 0.3 }}
            >
              <span 
                className="font-bold text-white text-lg md:text-xl lg:text-2xl"
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: '900',
                  letterSpacing: '1px'
                }}
              >
                {word}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Additional glow effect overlay */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.05) 50%, transparent 70%)',
          mixBlendMode: 'screen'
        }}
        animate={{
          opacity: [0, 0.8, 0],
          background: [
            'linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.05) 50%, transparent 70%)',
            'linear-gradient(45deg, transparent 30%, rgba(255, 0, 255, 0.05) 50%, transparent 70%)',
            'linear-gradient(45deg, transparent 30%, rgba(0, 255, 0, 0.05) 50%, transparent 70%)',
            'linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.05) 50%, transparent 70%)'
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default AnimatedLogoText;
