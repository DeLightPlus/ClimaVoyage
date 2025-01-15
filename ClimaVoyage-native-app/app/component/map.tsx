import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { MapView, Marker } from 'expo-maps';
import * as Location from 'expo-location';

const Map = () => {
  const [location, setLocation] = React.useState(null);

  React.useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    };

    getLocation();
  }, []);

  if (!location) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={Platform.OS === 'ios' ? 'apple' : 'google'} // Dynamically choose Apple or Google based on platform
      >
        <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Map;
