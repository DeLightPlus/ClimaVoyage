import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator, ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput, Pressable, Image, Modal } from 'react-native';
import { router, useRouter } from 'expo-router';
import Icons from '@/utils/Icons'; 

import MapView, { Marker } from 'react-native-maps';

import useLocation from '@/hooks/useLocation';
import useWeather from '@/hooks/useWeather';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import useForecast from '@/hooks/useForecast';

const activities = [
  {
    id: 1,
    name: 'Activity 1',
    description: 'Fun outdoor adventure.',
    image: 'https://example.com/activity1.jpg',
  },
  {
    id: 2,
    name: 'Activity 2',
    description: 'Explore the mountains.',
    image: 'https://example.com/activity2.jpg',
  },
  {
    id: 3,
    name: 'Activity 3',
    description: 'Cultural city tour.',
    image: 'https://example.com/activity3.jpg',
  },
];

const accommodations = [
  {
    id: 1,
    name: 'Grand Hotel',
    description: 'A luxurious hotel in the heart of the city.',
    image: 'https://example.com/grandhotel.jpg',
  },
  {
    id: 2,
    name: 'Mountain Resort',
    description: 'A peaceful retreat surrounded by mountains.',
    image: 'https://example.com/mountainresort.jpg',
  },
  {
    id: 3,
    name: 'Beachfront Villa',
    description: 'A stunning villa located on the beach.',
    image: 'https://example.com/beachfrontvilla.jpg',
  },
];

const restaurants = [
  {
    id: 1,
    name: 'Gourmet Bistro',
    description: 'A fine dining restaurant offering a unique culinary experience.',
    image: 'https://example.com/gourmetbistro.jpg',
  },
  {
    id: 2,
    name: 'Seafood Grill',
    description: 'Specializing in fresh seafood with a view of the ocean.',
    image: 'https://example.com/seafoodgrill.jpg',
  },
  {
    id: 3,
    name: 'Vegan Delight',
    description: 'A plant-based restaurant with delicious vegan options.',
    image: 'https://example.com/vegan.jpg',
  },
];

const places = [
  {
    id: 1,
    name: 'Eiffel Tower',
    description: 'Iconic landmark in Paris, France.',
    image: 'https://example.com/eiffel-tower.jpg',
  },
  {
    id: 2,
    name: 'Great Wall of China',
    description: 'Ancient series of walls in China.',
    image: 'https://example.com/great-wall.jpg',
  },
  {
    id: 3,
    name: 'Machu Picchu',
    description: 'Ancient Inca city in the Andes Mountains.',
    image: 'https://example.com/machu-picchu.jpg',
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('activities');
  const router = useRouter();

  const [query, setQuery] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { 
    lat: currentLat, 
    lon: currentLon, 
    curLocation,
    errMsg: currentLocationError, 
    loading: currentLocationLoading } = useCurrentLocation();

  const { 
    searchedLat, 
    searchedLon, 
    searchedLocation, 
    errMsg: searchedLocationError, 
    loading: searchedLocationLoading } = useLocation(searchQuery);

  const [useCoordinates, setUseCoordinates] = useState<boolean>(false);
  const [curLocationWeather, setCurLocationWeather] = useState<any>(null);
  
  const { weatherData, weatherLoading } = useWeather(query, useCoordinates);
  const { hourly, daily, forecastsLoading } = useForecast(query, useCoordinates);

  const formatDate = (dt_txt) => {
    const date = new Date(dt_txt);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  useEffect(() => {
    if (currentLat && currentLon) {
      setQuery(`${currentLat},${currentLon}`);
      setUseCoordinates(true);
    }
  }, [currentLat, currentLon]);

  useEffect(() => {
    if (weatherData && !searchQuery) {
      setCurLocationWeather(weatherData);
    }
  }, [weatherData]);

  const handleSearch = () => {   
    if (searchQuery.trim()) {
      setQuery(searchQuery);
      setUseCoordinates(false);
    } else if(searchedLat && searchedLon) {
      setQuery(`${searchedLat},${searchedLon}`);
      setUseCoordinates(true);
    } else {
      setQuery(`${currentLat},${currentLon}`);
      setUseCoordinates(true);
    }
  };

  const [selectedForecast, setSelectedForecast] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleCardPress = (forecast) => {
    setSelectedForecast(forecast);
    setModalVisible(true);
  };

  const handleActivityClick = (id) => {
    router.push(`/activities/${id}`);
  };

  const handleAccommodationClick = (id) => {
    router.push(`/accommodations/${id}`);
  };

  const handleRestaurantClick = (id) => {
    router.push(`/restaurants/${id}`);
  };

  const handlePlaceClick = (id) => {
    router.push(`/places/${id}`);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {(currentLat && currentLon) || (searchedLat && searchedLon) ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: Number(currentLat || searchedLat),
              longitude: Number(currentLon || searchedLon),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {currentLat && currentLon && curLocation && curLocationWeather && (
              <Marker coordinate={{ 
                latitude: Number(currentLat), 
                longitude: Number(currentLon) }} 
                title={`${curLocation.city} 🌡${curLocationWeather.main.temp}°C`} />
            )}
          </MapView>          
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>            
            <ActivityIndicator size="large" color="#0000ff" style={{position:"absolute"}}/>
            <Icons name="loc-dot" color="black" />
            <Text style={styles.mapText}>Loading your location...</Text>
          </View>          
        )}
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter Location"
            placeholderTextColor="#B0B0B0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Pressable onPress={handleSearch}>
            <Icons name="search" color="black" size={20} />
          </Pressable>
        </View>
      </View>

      <ScrollView horizontal style={{backgroundColor: "wheat", padding:10}}>
        {daily.map((forecast, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handleCardPress(forecast)}
          >
            <Text style={styles.cardText}>{formatDate(forecast.dt_txt)}</Text>
            <Text style={styles.cardText}>{forecast.main.temp}°C</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={isModalVisible} animationType="slide" onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          {selectedForecast && (
            <View>
              <Text style={styles.modalTitle}>{formatDate(selectedForecast.dt_txt)}</Text>
              <Text style={styles.modalText}>Temperature: {selectedForecast.main.temp}°C</Text>
              <Text style={styles.modalText}>Weather: {selectedForecast.weather[0].description}</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>

      <ScrollView 
        horizontal showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'activities' && styles.activeTab]}
          onPress={() => setActiveTab('activities')}
        >
          <Text style={[styles.tabText, activeTab === 'activities' && styles.activeTabText]}>Activities</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'places' && styles.activeTab]}
          onPress={() => setActiveTab('places')}
        >
          <Text style={[styles.tabText, activeTab === 'places' && styles.activeTabText]}>Destinations</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'restaurants' && styles.activeTab]}
          onPress={() => setActiveTab('restaurants')}
        >
          <Text style={[styles.tabText, activeTab === 'restaurants' && styles.activeTabText]}>Restaurants</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'accommodations' && styles.activeTab]}
          onPress={() => setActiveTab('accommodations')}
        >
          <Text style={[styles.tabText, activeTab === 'accommodations' && styles.activeTabText]}>Accommodations</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.tabContent}>
        {activeTab === 'activities' && (
          <ScrollView style={{height:250}}>
            {activities.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <Pressable onPress={() => handleActivityClick(activity.id)}>
                  <Text style={styles.tabContentText}>{activity.name}</Text>
                  <Text style={styles.tabContentText}>{activity.description}</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        )}

        {activeTab === 'places' && (
          <ScrollView>
            {places.map((place) => (
              <View key={place.id} style={styles.activityCard}>
                <Pressable onPress={() => handlePlaceClick(place.id)}>
                  <Text style={styles.tabContentText}>{place.name}</Text>
                  <Text style={styles.tabContentText}>{place.description}</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        )}

        {activeTab === 'restaurants' && (
          <ScrollView>
            {restaurants.map((restaurant) => (
              <View key={restaurant.id} style={styles.activityCard}>
                <Pressable onPress={() => handleRestaurantClick(restaurant.id)}>
                  <Text style={styles.tabContentText}>{restaurant.name}</Text>
                  <Text style={styles.tabContentText}>{restaurant.description}</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        )}

        {activeTab === 'accommodations' && (
          <ScrollView>
            {accommodations.map((accommodation) => (
              <View key={accommodation.id} style={styles.activityCard}>
                <Pressable onPress={() => handleAccommodationClick(accommodation.id)}>
                  <Text style={styles.tabContentText}>{accommodation.name}</Text>
                  <Text style={styles.tabContentText}>{accommodation.description}</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    backgroundColor: '#edf2fb',
    fontFamily: 'Poppins',
  },
  mapContainer: {
    height: 300,
    backgroundColor: '#E5E5E5',
    justifyContent: 'flex-start',
    fontFamily: 'serif',
    padding: 0,
  },
  mapText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 15,
    marginTop: 8,
    marginBottom: 8,
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'OpenSans',
  },
  card: {
    backgroundColor: 'lightblue',
    padding: 16,
    marginRight: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 112,
    height: 64,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    marginTop: 10,
    color: '#666',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height:32
  },
  tab: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
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
  activityCard: {
    backgroundColor: '#E8F9FF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
