import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../config/api';
import { MapPin, Search, Star, Navigation } from 'lucide-react';

const Cities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showFeatured, setShowFeatured] = useState(false);

  const openCityInMaps = (city) => {
    const { latitude, longitude } = city.coordinates;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  const { data: cities = [], isLoading, error } = useQuery(
    ['cities', searchTerm, selectedState, selectedCountry, showFeatured],
    async () => {
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (selectedState) params.append('state', selectedState);
        if (selectedCountry) params.append('country', selectedCountry);
        if (showFeatured) params.append('featured', 'true');

        const response = await api.get(`/api/cities?${params}`);
        return Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error('Error fetching cities:', error);
        return [];
      }
    }
  );

  // Fetch states from database
  const { data: states = [] } = useQuery(
    'states',
    async () => {
      try {
        const response = await api.get('/api/cities/states');
        return Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error('Error fetching states:', error);
        return [];
      }
    }
  );

  // Fetch countries from database
  const { data: countries = [] } = useQuery(
    'countries',
    async () => {
      try {
        const response = await api.get('/api/cities/countries');
        return Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
      }
    }
  );

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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Cities</h2>
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
            Explore Cities
          </h1>
          <p className="text-xl text-gray-600">
            Discover amazing cities and find the best places to visit
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* State Filter */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="input-field"
            >
              <option value="">All States</option>
              {Array.isArray(states) && states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            {/* Country Filter */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="input-field"
            >
              <option value="">All Countries</option>
              {Array.isArray(countries) && countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            {/* Featured Filter */}
            <div className="flex items-center">
              <input
                id="featured"
                type="checkbox"
                checked={showFeatured}
                onChange={(e) => setShowFeatured(e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                Featured only
              </label>
            </div>
          </div>
        </div>

        {/* Cities Grid */}
        {Array.isArray(cities) && cities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cities.map((city) => (
              <Link
                key={city._id}
                to={`/cities/${city._id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  {city.images && city.images.length > 0 ? (
                    <img
                      src={city.images[0].url}
                      alt={city.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                      <MapPin className="h-16 w-16 text-white" />
                    </div>
                  )}
                  {city.featured && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{city.name}</h3>
                    <p className="text-sm opacity-90">{city.state}, {city.country}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {city.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Population: {city.population?.toLocaleString() || 'N/A'}</span>
                    <div className="flex items-center space-x-2">
                      {city.foundedYear && (
                        <span>Founded: {city.foundedYear}</span>
                      )}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          openCityInMaps(city);
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
        ) : (
          <div className="text-center py-12">
            <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cities found</h3>
            <p className="text-gray-500">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cities;
