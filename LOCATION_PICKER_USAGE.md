# LocationPicker Component Usage Guide

## Overview
The `LocationPicker` component provides an interactive way for users to select coordinates for places. It includes three methods for location selection:
1. Click on the map
2. Search for an address (using OpenStreetMap Nominatim)
3. Manual coordinate entry

## Basic Usage

### Import the Component
```javascript
import LocationPicker from '../components/LocationPicker';
```

### Simple Example
```javascript
import React, { useState } from 'react';
import LocationPicker from '../components/LocationPicker';

function PlaceForm() {
  const [coordinates, setCoordinates] = useState({
    latitude: 28.6139,
    longitude: 77.2090
  });

  const handleLocationSelect = (coords) => {
    setCoordinates(coords);
    console.log('Selected coordinates:', coords);
  };

  return (
    <div>
      <LocationPicker
        initialLat={coordinates.latitude}
        initialLng={coordinates.longitude}
        onLocationSelect={handleLocationSelect}
        height="500px"
      />
      
      <button onClick={() => console.log('Submit:', coordinates)}>
        Submit Place
      </button>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialLat` | Number | `28.6139` | Initial latitude (Delhi, India) |
| `initialLng` | Number | `77.2090` | Initial longitude (Delhi, India) |
| `onLocationSelect` | Function | - | Callback when location is selected. Receives `{ latitude, longitude }` |
| `height` | String | `'400px'` | Height of the map container |

## Complete Form Example

```javascript
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import LocationPicker from '../components/LocationPicker';
import api from '../config/api';

function AddPlaceForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    if (!coordinates.latitude || !coordinates.longitude) {
      alert('Please select a location on the map');
      return;
    }

    setIsSubmitting(true);
    try {
      const placeData = {
        ...data,
        coordinates: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        }
      };

      await api.post('/api/places', placeData);
      alert('Place submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit place');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Place Name */}
      <div>
        <label className="label">Place Name</label>
        <input
          {...register('name', { required: true, minLength: 2 })}
          className="input-field"
          placeholder="Enter place name"
        />
        {errors.name && (
          <span className="text-red-600 text-sm">Name is required (min 2 characters)</span>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="label">Description</label>
        <textarea
          {...register('description', { required: true, minLength: 10 })}
          className="input-field"
          rows="4"
          placeholder="Describe this place"
        />
        {errors.description && (
          <span className="text-red-600 text-sm">Description is required (min 10 characters)</span>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="label">Category</label>
        <select {...register('category', { required: true })} className="input-field">
          <option value="">Select a category</option>
          <option value="restaurant">Restaurant</option>
          <option value="attraction">Attraction</option>
          <option value="hotel">Hotel</option>
          <option value="shopping">Shopping</option>
        </select>
        {errors.category && (
          <span className="text-red-600 text-sm">Category is required</span>
        )}
      </div>

      {/* City */}
      <div>
        <label className="label">City</label>
        <select {...register('city', { required: true })} className="input-field">
          <option value="">Select a city</option>
          {/* Add city options from your database */}
        </select>
        {errors.city && (
          <span className="text-red-600 text-sm">City is required</span>
        )}
      </div>

      {/* Location Picker */}
      <div>
        <label className="label">Location (Required)</label>
        <LocationPicker
          initialLat={28.6139}
          initialLng={77.2090}
          onLocationSelect={setCoordinates}
          height="450px"
        />
        {!coordinates.latitude && (
          <p className="text-sm text-gray-500 mt-2">
            Click on the map, search for an address, or enter coordinates manually
          </p>
        )}
      </div>

      {/* Address (Optional) */}
      <div>
        <label className="label">Full Address (Optional)</label>
        <input
          {...register('address.fullAddress')}
          className="input-field"
          placeholder="Street address, area, pincode"
        />
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Phone</label>
          <input
            {...register('contactInfo.phone')}
            className="input-field"
            placeholder="+91 1234567890"
          />
        </div>
        <div>
          <label className="label">Website</label>
          <input
            {...register('contactInfo.website')}
            className="input-field"
            type="url"
            placeholder="https://example.com"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Place'}
      </button>
    </form>
  );
}

export default AddPlaceForm;
```

## Features

### 1. Map Click Selection
Users can click anywhere on the map to set the marker at that location.

### 2. Address Search
- Uses OpenStreetMap Nominatim API (free, no API key required)
- Searches for places, addresses, and landmarks
- Press Enter or click Search button to search

### 3. Manual Coordinate Entry
- Direct input of latitude and longitude
- Validates coordinate ranges
- Useful for precise location setting

### 4. Visual Feedback
- Blue info box shows selected coordinates
- Marker updates in real-time
- Clear visual indicators for selected location

## Important Notes

### Rate Limiting
The Nominatim geocoding service has usage limits:
- 1 request per second
- Include a descriptive User-Agent in production
- Consider using a paid geocoding service for high-volume apps

### Coordinate Validation
The component validates:
- Latitude: -90 to 90
- Longitude: -180 to 180

### Default Location
Default center is Delhi, India (28.6139, 77.2090). Change this in the props:
```javascript
<LocationPicker
  initialLat={40.7128}  // New York City
  initialLng={-74.0060}
/>
```

## Integration with Backend

The backend expects coordinates in this format:
```javascript
{
  coordinates: {
    latitude: Number,
    longitude: Number
  }
}
```

The LocationPicker's `onLocationSelect` callback returns exactly this format, making integration seamless.

## Styling

The component uses Tailwind CSS classes. Customize by:

1. **Modifying the component directly**
2. **Wrapping in a custom container**
   ```javascript
   <div className="my-custom-wrapper">
     <LocationPicker ... />
   </div>
   ```

## Browser Compatibility
- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

## Performance Tips

1. **Debounce Search**: Add debouncing for search input
2. **Lazy Load**: Only render when needed
3. **Memoization**: Use React.memo for performance
4. **Reduce Height**: Smaller maps load faster on mobile

## Troubleshooting

### Search Not Working
- Check internet connection
- Verify Nominatim API is accessible
- Check browser console for errors
- Try more specific search terms

### Map Not Displaying
- Ensure Leaflet CSS is imported
- Check for conflicting CSS
- Verify coordinates are valid numbers

### Coordinates Not Updating
- Ensure `onLocationSelect` prop is provided
- Check callback function is working
- Verify state management in parent component

## Advanced Usage

### With Form Libraries

#### React Hook Form
```javascript
const { setValue } = useForm();

<LocationPicker
  onLocationSelect={(coords) => {
    setValue('coordinates.latitude', coords.latitude);
    setValue('coordinates.longitude', coords.longitude);
  }}
/>
```

#### Formik
```javascript
const { setFieldValue } = useFormikContext();

<LocationPicker
  onLocationSelect={(coords) => {
    setFieldValue('coordinates', coords);
  }}
/>
```

### Validation

```javascript
const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
const [error, setError] = useState('');

const validateLocation = () => {
  if (!coordinates.latitude || !coordinates.longitude) {
    setError('Please select a location');
    return false;
  }
  setError('');
  return true;
};

<LocationPicker onLocationSelect={setCoordinates} />
{error && <p className="text-red-600">{error}</p>}
```

## Example: Update Existing Place

```javascript
function EditPlaceForm({ placeId, existingPlace }) {
  const [coordinates, setCoordinates] = useState({
    latitude: existingPlace.coordinates.latitude,
    longitude: existingPlace.coordinates.longitude
  });

  return (
    <LocationPicker
      initialLat={coordinates.latitude}
      initialLng={coordinates.longitude}
      onLocationSelect={setCoordinates}
    />
  );
}
```

## Future Enhancements

Potential improvements:
- Current location detection (using browser geolocation API)
- Saved locations/favorites
- Multiple marker support
- Drawing tools for areas/regions
- Route planning
- Place suggestions based on current location

