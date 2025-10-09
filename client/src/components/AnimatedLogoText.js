import React from 'react';

const AnimatedLogoText = ({ className = '', size = 'h-12 w-auto' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <img
        src="/logo3.png"
        alt="Know Your City Logo"
        className={`${size} object-cover`}
      />
    </div>
  );
};

export default AnimatedLogoText;
