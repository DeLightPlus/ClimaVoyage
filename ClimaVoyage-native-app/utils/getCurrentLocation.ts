// utils/getCurrentLocation.ts
import { Platform } from 'react-native';
import Geolocation, { GeoError } from 'react-native-geolocation-service';

interface Coordinates {
  latitude: number;
  longitude: number;
}

// Define the getCurrentLocation function returning a Promise
const getCurrentLocation = (): Promise<Coordinates | GeoError> => {
  return new Promise((resolve, reject) => {
    // if (Platform.OS === 'ios') {
    //   // Request permission for iOS
    //   Geolocation.requestAuthorization();
    // }

    // Get current position
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude }); // Resolve with coordinates
      },
      (error: GeoError) => {
        console.error('Error fetching location: ', error);
        reject(error); // Reject with GeoError
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 } // Options for location fetch
    );
  });
};

export default getCurrentLocation;
