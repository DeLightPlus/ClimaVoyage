
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