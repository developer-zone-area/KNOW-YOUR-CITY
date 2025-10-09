import React from 'react';
import { X } from 'lucide-react';
import MapView from './MapView';

const MapModal = ({ isOpen, onClose, place }) => {
  if (!isOpen || !place) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Center modal */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {place.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {place.city?.name}, {place.city?.state}
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Map */}
            {place.coordinates?.latitude && place.coordinates?.longitude ? (
              <div>
                <MapView
                  latitude={place.coordinates.latitude}
                  longitude={place.coordinates.longitude}
                  placeName={place.name}
                  address={place.address?.fullAddress}
                  height="500px"
                  zoom={16}
                />
                
                {/* Details */}
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Latitude:</span>
                      <span className="ml-2 text-gray-900">{place.coordinates.latitude.toFixed(6)}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Longitude:</span>
                      <span className="ml-2 text-gray-900">{place.coordinates.longitude.toFixed(6)}</span>
                    </div>
                    {place.address?.fullAddress && (
                      <div className="col-span-2">
                        <span className="font-medium text-gray-700">Address:</span>
                        <span className="ml-2 text-gray-900">{place.address.fullAddress}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No location data available for this place.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${place.coordinates?.latitude},${place.coordinates?.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Open in Google Maps
            </a>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;

