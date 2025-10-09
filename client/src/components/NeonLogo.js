import React from 'react';

const NeonLogo = ({ className = '', size = 'h-12 w-auto' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <img
        src="/logo3.jpg"
        alt="Know Your City Logo"
        className={`${size} rounded-lg`}
      />
    </div>
  );
};

export default NeonLogo;