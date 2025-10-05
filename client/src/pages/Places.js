import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Search, Filter, Star, MapPin, Building2, Navigation } from 'lucide-react';

const Places = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [minRating, setMinRating] = useState('');

  const { data, isLoading, error } = useQuery(
    ['places', searchTerm, selectedCategory, selectedCity, pincode, minRating],
    async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedCity) params.append('city', selectedCity);
      if (pincode) params.append('pincode', pincode);
      if (minRating) params.append('minRating', minRating);

      const response = await axios.get(`/api/places?${params}`);
      return response.data;
    }
  );

  // Fetch categories from database
  const { data: categories = [] } = useQuery(
    'categories',
    async () => {
      const response = await axios.get('/api/places/categories');
      return response.data;
    }
  );

  // Fetch cities from database
  const { data: cities = [] } = useQuery(
    'cities',
    async () => {
      const response = await axios.get('/api/places/cities');
      return response.data;
    }
  );

  const openInMaps = (place) => {
    const { latitude, longitude } = place.coordinates;
    const address = place.address?.fullAddress || `${place.name}, ${place.city?.name}`;
    
    // Try to open in Google Maps
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Places</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Places
          </h1>
          <p className="text-xl text-gray-600">
            Find the best restaurants, attractions, and more
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search places, areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Pincode Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by pincode..."
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            {/* City Filter */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="input-field"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}, {city.state}
                </option>
              ))}
            </select>

            {/* Rating Filter */}
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="input-field"
            >
              <option value="">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="1">1+ Stars</option>
            </select>
          </div>
        </div>

        {/* Places Grid */}
        {data && data.places.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.places.map((place) => (
                <Link
                  key={place._id}
                  to={`/places/${place._id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
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
                    {place.featured && (
                      <div className="absolute top-4 left-4">
                        <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{place.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{place.description}</p>
                    <div className="flex items-center mb-3">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">{place.city?.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{place.rating?.average || 0}</span>
                        <span className="text-sm text-gray-500 ml-1">({place.rating?.count || 0})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{place.priceRange || 'N/A'}</span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openInMaps(place);
                          }}
                          className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                          title="Open in Maps"
                        >
                          <Navigation className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {data.pagination && data.pagination.pages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  {[...Array(data.pagination.pages)].map((_, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        data.pagination.current === index + 1
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No places found</h3>
            <p className="text-gray-500">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Places;
