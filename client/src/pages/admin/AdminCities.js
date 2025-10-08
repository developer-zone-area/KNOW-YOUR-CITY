import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

const AdminCities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [isAddingCity, setIsAddingCity] = useState(false); // Available for future use

  const { data: cities, isLoading, refetch } = useQuery(
    'admin-cities',
    async () => {
      const response = await axios.get('/api/admin/cities');
      return response.data;
    }
  );

  const handleDeleteCity = async (cityId) => {
    if (window.confirm('Are you sure you want to delete this city?')) {
      try {
        await axios.delete(`/api/admin/cities/${cityId}`);
        refetch();
      } catch (error) {
        console.error('Error deleting city:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const filteredCities = cities?.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Cities</h1>
            <p className="text-gray-600 mt-2">Add, edit, and manage cities in your platform</p>
          </div>
          <button
            onClick={() => console.log('Add city functionality coming soon')}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add City</span>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
        </div>

        {/* Cities Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Population
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCities.map((city) => (
                  <tr key={city._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{city.name}</div>
                      <div className="text-sm text-gray-500">{city.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{city.state}</div>
                      <div className="text-sm text-gray-500">{city.country}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {city.population?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        city.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {city.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        city.featured 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {city.featured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCity(city._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredCities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No cities found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCities;
