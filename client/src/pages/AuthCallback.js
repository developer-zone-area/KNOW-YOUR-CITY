import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const token = searchParams.get('token');
        // const provider = searchParams.get('provider'); // Available for future use

        if (!token) {
          setError('No authentication token received');
          setLoading(false);
          return;
        }

        // Store token in localStorage
        localStorage.setItem('token', token);

        // Get user data
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to get user data');
        }

        const data = await response.json();
        
        // Update auth context
        login(data.user, token);

        // Redirect to home page
        navigate('/', { replace: true });
      } catch (error) {
        console.error('OAuth callback error:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate, login]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Completing sign in...
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please wait while we complete your authentication.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Authentication Error
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {error}
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/login')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthCallback;
