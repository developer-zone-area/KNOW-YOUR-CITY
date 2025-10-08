import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../config/api';
import { MapPin, Star, Users, Building2 } from 'lucide-react';

const CityDetail = () => {
  const { id } = useParams();

  const { data: city, isLoading, error } = useQuery(
    ['city', id],
    async () => {
      const response = await api.get(`/api/cities/${id}`);
      return response.data;
    }
  );

  const { data: places, isLoading: placesLoading } = useQuery(
    ['city-places', id],
    async () => {
      const response = await api.get(`/api/cities/${id}/places?limit=6`);
      return response.data;
    },
    { enabled: !!city }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">City Not Found</h2>
          <p className="text-gray-600">The city you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-primary-600 to-primary-800">
        {city.images && city.images.length > 0 ? (
          <img
            src={city.images[0].url}
            alt={city.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary-600 to-primary-800 flex items-center justify-center">
            <MapPin className="h-32 w-32 text-white opacity-50" />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{city.name}</h1>
            <p className="text-xl md:text-2xl text-primary-100">
              {city.state}, {city.country}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* City Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {city.name}</h2>
              <p className="text-gray-600 leading-relaxed">{city.description}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">City Facts</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">Population: </span>
                  <span className="font-semibold ml-2">{city.population?.toLocaleString() || 'N/A'}</span>
                </div>
                {city.foundedYear && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-600">Founded: </span>
                    <span className="font-semibold ml-2">{city.foundedYear}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">Status: </span>
                  <span className={`font-semibold ml-2 capitalize ${
                    city.status === 'active' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {city.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Places */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Places</h2>
            <a
              href={`/places?city=${city._id}`}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View All Places
            </a>
          </div>

          {placesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : places && places.places.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.places.map((place) => (
                <div key={place._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    {place.images && place.images.length > 0 ? (
                      <img
                        src={place.images[0].url}
                        alt={place.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                        <Building2 className="h-16 w-16 text-white" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <div className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm font-semibold">
                        {place.category}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{place.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{place.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{place.rating?.average || 0}</span>
                        <span className="text-sm text-gray-500 ml-1">({place.rating?.count || 0})</span>
                      </div>
                      <span className="text-sm text-gray-500">{place.priceRange || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No places found</h3>
              <p className="text-gray-500">Be the first to add a place in {city.name}!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityDetail;
