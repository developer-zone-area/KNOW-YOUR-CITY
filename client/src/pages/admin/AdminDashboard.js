import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { 
  MapPin, 
  Building2, 
  Users, 
  MessageSquare, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Eye
} from 'lucide-react';

const AdminDashboard = () => {
  const { data: stats, isLoading, error } = useQuery(
    'admin-stats',
    async () => {
      const response = await axios.get('/api/admin/dashboard');
      return response.data.stats;
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Cities',
      value: stats?.totalCities || 0,
      icon: MapPin,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Places',
      value: stats?.totalPlaces || 0,
      icon: Building2,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-purple-500',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Total Reviews',
      value: stats?.totalReviews || 0,
      icon: MessageSquare,
      color: 'bg-orange-500',
      change: '+23%',
      changeType: 'positive'
    }
  ];

  const alertCards = [
    {
      title: 'Pending Places',
      value: stats?.pendingPlaces || 0,
      icon: Clock,
      color: 'bg-yellow-500',
      description: 'Places waiting for approval'
    },
    {
      title: 'Reported Reviews',
      value: stats?.pendingReviews || 0,
      icon: AlertTriangle,
      color: 'bg-red-500',
      description: 'Reviews that need attention'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your platform.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value.toLocaleString()}</p>
                    <span className={`ml-2 text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {alertCards.map((alert, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${alert.color}`}>
                  <alert.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">{alert.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{alert.value}</p>
                  <p className="text-sm text-gray-500">{alert.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/admin/cities"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MapPin className="h-5 w-5 text-primary-600 mr-3" />
              <span className="text-sm font-medium text-gray-900">Manage Cities</span>
            </a>
            
            <a
              href="/admin/places"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Building2 className="h-5 w-5 text-primary-600 mr-3" />
              <span className="text-sm font-medium text-gray-900">Manage Places</span>
            </a>
            
            <a
              href="/admin/users"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Users className="h-5 w-5 text-primary-600 mr-3" />
              <span className="text-sm font-medium text-gray-900">Manage Users</span>
            </a>
            
            <a
              href="/admin/reviews"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MessageSquare className="h-5 w-5 text-primary-600 mr-3" />
              <span className="text-sm font-medium text-gray-900">Manage Reviews</span>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-full">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">New city added</p>
                <p className="text-xs text-gray-500">San Francisco was added to the platform</p>
              </div>
              <div className="ml-auto text-xs text-gray-500">2 hours ago</div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-full">
                <Eye className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Place approved</p>
                <p className="text-xs text-gray-500">Golden Gate Restaurant was approved</p>
              </div>
              <div className="ml-auto text-xs text-gray-500">4 hours ago</div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="p-2 bg-yellow-100 rounded-full">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Review reported</p>
                <p className="text-xs text-gray-500">A review for Central Park was reported</p>
              </div>
              <div className="ml-auto text-xs text-gray-500">6 hours ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
