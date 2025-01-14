// utils/getCurrentLocation.ts
import Geolocation, { GeoError } from 'react-native-geolocation-service';

interface Coordinates {
  latitude: number;
  longitude: number;
}

// Define the getCurrentLocation function returning a Promise
const getCurrentLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    // Get current position
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Fetched coordinates:', latitude, longitude);
        resolve({ latitude, longitude }); // Resolve with coordinates
      },
      (error: GeoError) => {
        console.error('Error fetching location:', error);
        reject(error); // Reject with error
      },
      {
        enableHighAccuracy: true, // Enable high accuracy
        timeout: 15000,            // Timeout after 15 seconds
        maximumAge: 10000         // Maximum age for cached location (10 seconds)
      }
    );
  });
};

export default getCurrentLocation;
