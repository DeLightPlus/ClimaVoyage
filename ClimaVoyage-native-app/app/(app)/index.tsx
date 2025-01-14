import Icons from '@/utils/Icons';

import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { PermissionsAndroid, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';

import * as Location from 'expo-location';


const Index = () => {
  const [activeTab, setActiveTab] = useState('activities'); 

  const [location, setLocation] = useState<any>(null);
  const [lat, setLatitude] = useState<number | string>("");
  const [lon, setLongitude] = useState<number | string>("");

  const getCurrentLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();

    if(status !== "granted")
    {
      Alert.alert("Permission required to suggest for your current location!!")
      return;
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if(coords)
    {
      const {latitude, longitude} = coords;
      console.log("coords: ", latitude, longitude);
      setLatitude(latitude);
      setLongitude(longitude);

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      })

      setLocation(response);
    }    
  }

  useEffect(()=>{
    getCurrentLocation();
  }, [])
  

  console.log(location, ", lt", lat, " , lo", lon);
  
  return (
    <View style={styles.container}>
      {/* Map View (Placeholder for now) */}
      <View style={styles.mapContainer}>
        {/* <Text style={styles.mapText}>Map({`${lat}`})</Text> */}
        <View style={styles.mapContainer}>
        {lat && lon ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: Number(lat), // Set latitude
              longitude: Number(lon), // Set longitude
              latitudeDelta: 0.0922, // Adjust zoom level
              longitudeDelta: 0.0421, // Adjust zoom level
            }}
          >
            <Marker coordinate={{ latitude: Number(lat), longitude: Number(lon) }} />
          </MapView>
        ) : (
          <Text style={styles.loadingText}>Loading your location...</Text>
        )}
        </View>

        {location && (
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>Location: {location[0]?.city}</Text>
            <Text style={styles.locationText}>Country: {location[0]?.country}</Text>
          </View>
        )}

      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter Location"
            placeholderTextColor="#B0B0B0"
          />
          <Icons name="search" color="black" size={20} />

        </View>
      </View>

      {/* Weather Info */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherTitle}>Weather Info</Text>
          <Text style={styles.weatherText}>Current Temperature: 22°C</Text>
          <Text style={styles.weatherText}>Conditions: Sunny</Text>
        </View>

        {/* Tabs for "Things to Do" - Now Scrollable Horizontally */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer} // Ensure that tabs are arranged horizontally
        >
          <TouchableOpacity
            style={[styles.tab, activeTab === 'activities' && styles.activeTab]}
            onPress={() => setActiveTab('activities')}
          >
            <Text style={[styles.tabText, activeTab === 'activities' && styles.activeTabText]}>
              Activities
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'places' && styles.activeTab]}
            onPress={() => setActiveTab('places')}
          >
            <Text style={[styles.tabText, activeTab === 'places' && styles.activeTabText]}>
              Destinations
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'restaurants' && styles.activeTab]}
            onPress={() => setActiveTab('restaurants')}
          >
            <Text style={[styles.tabText, activeTab === 'restaurants' && styles.activeTabText]}>
              Restaurants
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'accommodations' && styles.activeTab]}
            onPress={() => setActiveTab('accommodations')}
          >
            <Text style={[styles.tabText, activeTab === 'accommodations' && styles.activeTabText]}>
              Accommodations
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Display Content Based on Active Tab */}
        <View style={styles.tabContent}>
          {activeTab === 'activities' && (
            <Text style={styles.tabContentText}>Explore activities in this location.</Text>
          )}
          {activeTab === 'places' && (
            <Text style={styles.tabContentText}>Check out places to go and explore.</Text>
          )}
          {activeTab === 'restaurants' && (
            <Text style={styles.tabContentText}>Find the best restaurants around you.</Text>
          )}
          {activeTab === 'accommodations' && (
            <Text style={styles.tabContentText}>Explore available accommodations nearby.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2fb',
    fontFamily: 'Poppins',
  },
  mapContainer: {
    height: 300,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'serif',
    padding: 20,
  },
  mapText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#B0B0B0',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 8,
    paddingVertical: 0,
  },
  icon: {
    marginRight: 100,

  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'OpenSans',
  },
  scrollContainer: {
    flex: 1,
    padding: 15,
  },
  weatherContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
  },
  weatherTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#020202',
    marginBottom: 10,
  },
  weatherText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20, // Ensure spacing between tabs
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#333',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#333',
    fontWeight: 'bold',
  },
  tabContent: {
    padding: 15,
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    marginTop: 10,
  },
  tabContentText: {
    fontSize: 16,
    color: '#666',
  },
});