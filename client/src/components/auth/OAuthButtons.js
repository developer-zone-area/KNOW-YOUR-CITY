import React from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const OAuthButtons = ({ onSuccess, onError }) => {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/facebook`;
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleGoogleLogin}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
        >
          <FaGoogle className="h-5 w-5 text-red-500" />
          <span className="ml-2">Google</span>
        </button>

        <button
          onClick={handleFacebookLogin}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
        >
          <FaFacebook className="h-5 w-5 text-blue-600" />
          <span className="ml-2">Facebook</span>
        </button>
      </div>
    </div>
  );
};

export default OAuthButtons;
