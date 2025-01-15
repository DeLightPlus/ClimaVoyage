import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput, Pressable, Image } from 'react-native';
import { router, useRouter } from 'expo-router';
import Icons from '@/utils/Icons'; // Assuming you have Icons component

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
  const [activeTab, setActiveTab] = useState('activities'); // Default tab is 'activities'
  const router = useRouter(); // Initialize router

  const handleActivityClick = (id) => {
    router.push(`/activities/${id}`); // Navigate to the dynamic route with the activity id
  };

  const handleAccommodationClick = (id) => {
    router.push(`/accommodations/${id}`); // Navigate to the dynamic route with the accommodation id
  };

  const handleRestaurantClick = (id) => {
    router.push(`/restaurants/${id}`); // Navigate to the dynamic route with the restaurant id
  };

  const handlePlaceClick = (id) => {
    // Navigate to the dynamic route with the place id
    router.push(`/places/${id}`);
  };

  return (
    <View style={styles.container}>
      {/* Tabs for "Things to Do" */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
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

      {/* Display Content Based on Active Tab */}
      <View style={styles.tabContent}>
        {activeTab === 'activities' && (
          <ScrollView>
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
    backgroundColor: '#edf2fb',
    fontFamily: 'Poppins',
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
    marginRight: 20,
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
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
