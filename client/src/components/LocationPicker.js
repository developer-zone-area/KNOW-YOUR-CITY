import React, { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Search } from 'lucide-react';

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Component to handle map clicks
function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} /> : null;
}

const LocationPicker = ({ initialLat = 28.6139, initialLng = 77.2090, onLocationSelect, height = '400px' }) => {
  const [position, setPosition] = useState(
    initialLat && initialLng ? [initialLat, initialLng] : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Handle manual coordinate input
  const handleManualInput = useCallback(() => {
    const lat = parseFloat(document.getElementById('latitude-input').value);
    const lng = parseFloat(document.getElementById('longitude-input').value);
    
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      setPosition([lat, lng]);
      if (onLocationSelect) {
        onLocationSelect({ latitude: lat, longitude: lng });
      }
    } else {
      alert('Please enter valid coordinates (Latitude: -90 to 90, Longitude: -180 to 180)');
    }
  }, [onLocationSelect]);

  // Simple geocoding using Nominatim (OpenStreetMap)
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        setPosition([lat, lng]);
        if (onLocationSelect) {
          onLocationSelect({ latitude: lat, longitude: lng });
        }
      } else {
        alert('Location not found. Please try a different search term.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Error searching for location. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Update parent component when position changes
  const handlePositionChange = useCallback((newPosition) => {
    setPosition(newPosition);
    if (onLocationSelect && newPosition) {
      onLocationSelect({
        latitude: newPosition[0],
        longitude: newPosition[1]
      });
    }
  }, [onLocationSelect]);

  return (
    <div className="space-y-4">
      {/* Search Box */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MapPin className="inline h-4 w-4 mr-1" />
          Search Location or Click on Map
        </label>
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for a place or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="input-field pl-10"
              disabled={isSearching}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="btn-primary"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {/* Manual Coordinate Input */}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
          <input
            id="latitude-input"
            type="number"
            step="0.000001"
            placeholder="Latitude"
            defaultValue={position ? position[0].toFixed(6) : ''}
            className="input-field text-sm"
          />
          <input
            id="longitude-input"
            type="number"
            step="0.000001"
            placeholder="Longitude"
            defaultValue={position ? position[1].toFixed(6) : ''}
            className="input-field text-sm"
          />
          <button
            onClick={handleManualInput}
            className="btn-outline text-sm"
          >
            Set Coordinates
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="rounded-lg overflow-hidden shadow-md border border-gray-200">
        <MapContainer
          center={position || [initialLat, initialLng]}
          zoom={13}
          style={{ height: height, width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={handlePositionChange} />
        </MapContainer>
      </div>

      {/* Selected Coordinates Display */}
      {position && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <p className="text-sm font-medium text-primary-900 mb-1">Selected Location:</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">Latitude:</span>
              <span className="ml-2 font-mono text-primary-700">{position[0].toFixed(6)}</span>
            </div>
            <div>
              <span className="text-gray-600">Longitude:</span>
              <span className="ml-2 font-mono text-primary-700">{position[1].toFixed(6)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Click anywhere on the map to set the location, search for an address, 
          or enter coordinates manually.
        </p>
      </div>
    </div>
  );
};

export default LocationPicker;

