<<<<<<< HEAD
import { Stack } from "expo-router";
import { Provider } from 'react-redux';

import store from '@/redux/store';
import { SessionProvider } from "@/context/AuthContext";

export default function RootLayout() 
{
  return (
    <Provider store={store}>
      <SessionProvider>
        <Stack 
          screenOptions={{
            headerStyle: { backgroundColor: "#6200ea" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
            headerShown: false,
          }}
        >
          <Stack.Screen name="(onboarding)/splash" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)/onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen name="(auth)/register" />
          <Stack.Screen name="(app)/home" />
          <Stack.Screen name="(app)/addShoppingItem" />
          <Stack.Screen name="(app)/shoppinglist" />
        </Stack>  
      </SessionProvider>    
    </Provider>
  
  )
=======
import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import MapView from 'react-native-maps';
import { Link } from 'expo-router';

export default function HomeScreen() {
    const [location, setLocation] = React.useState('');

    return (
        <View style={styles.container}>
            <MapView style={styles.map} />
            <TextInput
                style={styles.input}
                placeholder="Enter location"
                value={location}
                onChangeText={setLocation}
            />
            <Link href={`/details?location=${location}`}>
                <Button title="Search" />
            </Link>
        </View>
    );
>>>>>>> 0db8ea403947e740648fec16131b1a65f14c1a8e
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '50%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '90%',
    },
});