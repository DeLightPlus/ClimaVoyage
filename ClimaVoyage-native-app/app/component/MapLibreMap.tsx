import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const MapScreen = ({ currentLat, currentLon }) => {
  const mapUrl = `http://10.196.0.143:3000/map?lat=${currentLat}&lon=${currentLon}`;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ uri: mapUrl }} 
        style={styles.map}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 300,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
