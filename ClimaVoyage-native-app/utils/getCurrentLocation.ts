// utils/getCurrentLocation.ts
import { Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

interface Coordinates {
  latitude: number;
  longitude: number;
}

// Define the getCurrentLocation function returning a Promise
const getCurrentLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    // Uncomment this block if you need permission request on iOS
    // if (Platform.OS === 'ios') {
    //   // Request permission for iOS
    //   Geolocation.requestAuthorization();
    // }    
    // Get current position
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, " | ", longitude);
        resolve({ latitude, longitude }); // Resolve with coordinates
      },
      (error) => {
        console.error('Error fetching location: ', error);
        reject(error); // Reject with error
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 } // Options for location fetch
    );
  });
};

export default getCurrentLocation;
