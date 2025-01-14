import Icons from '@/utils/Icons';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Map View (Placeholder for now) */}
      <View style={styles.mapContainer}>
        <Text style={styles.mapText}>
          <Icons name="search" color="black" size={20}/> Map Here (Placeholder)
        </Text>
      </View>

      {/* Search Bar with Icon */}
      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <Icons name="search" color="black" size={20} style={styles.icon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter Location"
            placeholderTextColor="#B0B0B0"
          />
        </View>
      </View>

      {/* Weather & Activities Screen */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherTitle}>Weather Info</Text>
          <Text style={styles.weatherText}>Current Temperature: 22°C</Text>
          <Text style={styles.weatherText}>Conditions: Sunny</Text>
        </View>

        {/* Activities Cards */}
        <View style={styles.activitiesContainer}>
          <Text style={styles.activitiesTitle}>Things to Do</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Activity 1</Text>
            <Text style={styles.cardDescription}>Explore the park and enjoy nature.</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Activity 2</Text>
            <Text style={styles.cardDescription}>Visit the museum and learn about history.</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Activity 3</Text>
            <Text style={styles.cardDescription}>Go for a bike ride around the city.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    height: 300,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#B0B0B0',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  scrollContainer: {
    flex: 1,
    padding: 15,
  },
  weatherContainer: {
    marginBottom: 20,
  },
  weatherTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  weatherText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  activitiesContainer: {
    marginTop: 20,
  },
  activitiesTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
