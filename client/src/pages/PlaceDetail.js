import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../config/api';
import { useAuth } from '../contexts/AuthContext';
import { Star, MapPin, Phone, Globe } from 'lucide-react';
import MapView from '../components/MapView';

const PlaceDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const { data: place, isLoading, error } = useQuery(
    ['place', id],
    async () => {
      const response = await api.get(`/api/places/${id}`);
      return response.data;
    }
  );

  const { data: reviews, isLoading: reviewsLoading } = useQuery(
    ['place-reviews', id],
    async () => {
      const response = await api.get(`/api/places/${id}/reviews`);
      return response.data;
    },
    { enabled: !!place }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Place Not Found</h2>
          <p className="text-gray-600">The place you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        {place.images && place.images.length > 0 ? (
          <img
            src={place.images[0].url}
            alt={place.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary-600 to-primary-800"></div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-2">
              <span className="bg-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                {place.category}
              </span>
              {place.featured && (
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium ml-2 flex items-center">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{place.name}</h1>
            <p className="text-xl md:text-2xl text-primary-100">
              {place.city?.name}, {place.city?.state}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{place.description}</p>
            </div>

            {/* Map Location */}
            {place.coordinates?.latitude && place.coordinates?.longitude && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
                <MapView
                  latitude={place.coordinates.latitude}
                  longitude={place.coordinates.longitude}
                  placeName={place.name}
                  address={place.address?.fullAddress}
                  height="450px"
                />
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-sm">
                      Coordinates: {place.coordinates.latitude.toFixed(6)}, {place.coordinates.longitude.toFixed(6)}
                    </span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${place.coordinates.latitude},${place.coordinates.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
                <div className="flex items-center">
                  <Star className="h-6 w-6 text-yellow-400 mr-1" />
                  <span className="text-xl font-semibold">{place.rating?.average || 0}</span>
                  <span className="text-gray-500 ml-1">({place.rating?.count || 0} reviews)</span>
                </div>
              </div>

              {reviewsLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : reviews && reviews.reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.reviews.map((review) => (
                    <div key={review._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-semibold text-primary-600">
                              {review.user?.name?.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{review.user?.name}</p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, index) => (
                                <Star
                                  key={index}
                                  className={`h-4 w-4 ${
                                    index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{review.title}</h3>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Star className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-500">Be the first to review this place!</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                {place.contactInfo?.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-600">{place.contactInfo.phone}</span>
                  </div>
                )}
                {place.contactInfo?.website && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-400 mr-3" />
                    <a
                      href={place.contactInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
                {place.address?.fullAddress && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-600">{place.address.fullAddress}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-semibold capitalize">{place.category}</span>
                </div>
                {place.priceRange && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Price Range</span>
                    <span className="font-semibold">{place.priceRange}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-semibold capitalize ${
                    place.status === 'active' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {place.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                {isAuthenticated ? (
                  <button className="btn-primary w-full">
                    Write a Review
                  </button>
                ) : (
                  <button className="btn-outline w-full">
                    Login to Review
                  </button>
                )}
                <button className="btn-secondary w-full">
                  Add to Favorites
                </button>
                <button className="btn-outline w-full">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
