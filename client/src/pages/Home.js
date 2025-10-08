import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../config/api';
import { MapPin, Star, Users, TrendingUp, ArrowRight } from 'lucide-react';
import Carousel from '../components/Carousel';
import Navbar from '../components/layout/Navbar';

const Home = () => {
  // Fetch cities from database (show regular cities if no featured ones)
  const { data: featuredCities = [], isLoading: citiesLoading } = useQuery(
    'featured-cities',
    async () => {
      try {
        // First try to get featured cities
        const featuredResponse = await api.get('/api/cities?featured=true&limit=3');
        if (featuredResponse.data && Array.isArray(featuredResponse.data) && featuredResponse.data.length > 0) {
          return featuredResponse.data;
        }
        // If no featured cities, get regular cities
        const regularResponse = await api.get('/api/cities?limit=3');
        return Array.isArray(regularResponse.data) ? regularResponse.data : [];
      } catch (error) {
        console.error('Error fetching cities:', error);
        return [];
      }
    }
  );

  // Fetch statistics from database
  const { data: stats = [], isLoading: statsLoading } = useQuery(
    'home-stats',
    async () => {
      try {
        const response = await api.get('/api/stats');
        const data = response.data;
        
        return [
          { icon: MapPin, label: 'Cities', value: `${data.cities || 0}+` },
          { icon: Star, label: 'Places', value: `${data.places || 0}+` },
          { icon: Users, label: 'Users', value: `${data.users || 0}+` },
          { icon: TrendingUp, label: 'Reviews', value: `${data.reviews || 0}+` }
        ];
      } catch (error) {
        console.error('Error fetching stats:', error);
        return [
          { icon: MapPin, label: 'Cities', value: '0+' },
          { icon: Star, label: 'Places', value: '0+' },
          { icon: Users, label: 'Users', value: '0+' },
          { icon: TrendingUp, label: 'Reviews', value: '0+' }
        ];
      }
    }
  );

  return (
    <div className="min-h-screen">
      {/* Carousel Hero Section with Overlay Navbar */}
      <div className="relative">
        <Carousel />
        {/* Navbar Overlay */}
        <div className="absolute top-0 left-0 right-0 z-50">
          <Navbar isTransparent={true} />
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="text-center animate-pulse">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-8 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
                </div>
              ))
            ) : (
              Array.isArray(stats) ? stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <stat.icon className="h-12 w-12 text-primary-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">Statistics unavailable</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Cities
            </h2>
            <p className="text-xl text-gray-600">
              Explore these amazing cities and discover what makes them special
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {citiesLoading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              Array.isArray(featuredCities) ? featuredCities.map((city) => (
                <div key={city._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{city.name}</h3>
                      <p className="text-sm opacity-90">{city.state}, {city.country}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-3">{city.description}</p>
                    <Link
                      to={`/cities/${city._id}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Explore {city.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No cities available at the moment.</p>
                </div>
              )
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/cities"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>View All Cities</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Discover your city in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your City</h3>
              <p className="text-gray-600">
                Select from our extensive list of cities worldwide
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Explore Places</h3>
              <p className="text-gray-600">
                Browse restaurants, attractions, and local favorites
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share & Review</h3>
              <p className="text-gray-600">
                Leave reviews and share your experiences with others
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
