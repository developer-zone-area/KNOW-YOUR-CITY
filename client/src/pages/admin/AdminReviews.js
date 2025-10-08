import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { MessageSquare, Search, Star, Trash2, Eye, ThumbsUp, ThumbsDown, Filter, Calendar, User } from 'lucide-react';

const AdminReviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const queryClient = useQueryClient();

  // Fetch reviews
  const { data: reviews, isLoading, error } = useQuery(
    'admin-reviews',
    async () => {
      const response = await axios.get('/api/admin/reviews');
      return response.data;
    }
  );

  // Update review status mutation
  const updateReviewStatusMutation = useMutation(
    async ({ reviewId, status }) => {
      const response = await axios.put(`/api/admin/reviews/${reviewId}/status`, {
        status
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('admin-reviews');
      }
    }
  );

  // Delete review mutation
  const deleteReviewMutation = useMutation(
    async (reviewId) => {
      const response = await axios.delete(`/api/admin/reviews/${reviewId}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('admin-reviews');
      }
    }
  );

  // Filter reviews
  const filteredReviews = reviews?.filter(review => {
    const matchesSearch = review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.place?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = selectedRating === '' || review.rating.toString() === selectedRating;
    const matchesStatus = selectedStatus === '' || review.status === selectedStatus;
    return matchesSearch && matchesRating && matchesStatus;
  }) || [];

  const handleStatusChange = (reviewId, newStatus) => {
    if (window.confirm(`Are you sure you want to ${newStatus} this review?`)) {
      updateReviewStatusMutation.mutate({ reviewId, status: newStatus });
    }
  };

  const handleDeleteReview = (reviewId, userName) => {
    if (window.confirm(`Are you sure you want to delete this review by "${userName}"? This action cannot be undone.`)) {
      deleteReviewMutation.mutate(reviewId);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
          <div className="text-red-500 text-xl mb-4">Error loading reviews</div>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Reviews</h1>
            <p className="text-gray-600 mt-2">Moderate, approve, and manage user reviews</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MessageSquare className="h-5 w-5" />
            <span>{filteredReviews.length} reviews</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search reviews, users, or places..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Rating Filter */}
            <div>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedRating('');
                setSelectedStatus('');
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div key={review._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* User Info */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex-shrink-0">
                      {review.user?.avatar ? (
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={review.user.avatar}
                          alt={review.user.name}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary-600" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{review.user?.name || 'Anonymous'}</p>
                      <p className="text-xs text-gray-500">{review.place?.name}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {getRatingStars(review.rating)}
                    </div>
                    <span className="text-sm text-gray-500">({review.rating}/5)</span>
                  </div>

                  {/* Review Content */}
                  <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

                  {/* Review Meta */}
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(review.createdAt)}
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(review.status)}`}>
                      {review.status}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => console.log('View review details:', review._id)}
                    className="text-primary-600 hover:text-primary-900 p-1"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>

                  {review.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(review._id, 'approved')}
                        className="text-green-600 hover:text-green-900 p-1"
                        title="Approve Review"
                        disabled={updateReviewStatusMutation.isLoading}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(review._id, 'rejected')}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Reject Review"
                        disabled={updateReviewStatusMutation.isLoading}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                    </>
                  )}

                  {review.status === 'approved' && (
                    <button
                      onClick={() => handleStatusChange(review._id, 'rejected')}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Reject Review"
                      disabled={updateReviewStatusMutation.isLoading}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </button>
                  )}

                  {review.status === 'rejected' && (
                    <button
                      onClick={() => handleStatusChange(review._id, 'approved')}
                      className="text-green-600 hover:text-green-900 p-1"
                      title="Approve Review"
                      disabled={updateReviewStatusMutation.isLoading}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteReview(review._id, review.user?.name)}
                    className="text-red-600 hover:text-red-900 p-1"
                    title="Delete Review"
                    disabled={deleteReviewMutation.isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedRating || selectedStatus ? 'Try adjusting your search or filter criteria.' : 'No reviews have been submitted yet.'}
            </p>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Reviews</p>
                <p className="text-2xl font-semibold text-gray-900">{reviews?.length || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ThumbsUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {reviews?.filter(r => r.status === 'approved').length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Filter className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {reviews?.filter(r => r.status === 'pending').length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ThumbsDown className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {reviews?.filter(r => r.status === 'rejected').length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;
