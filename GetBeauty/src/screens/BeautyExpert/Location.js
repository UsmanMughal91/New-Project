//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Header from '../../Components/Header';

// create a component
const Location = () => {

    const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

   
   
    const handleMapPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setCoordinates({ latitude, longitude });
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    };

   
    return (
        <View style={styles.container}>
            <View>
                <Header/>
                <View></View>
            </View>
            <View style={{height:"70%"}}>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 32.1597,
                        longitude: 74.1793,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onPress={handleMapPress}
                >
                    <Marker
                    
                        coordinate={{ latitude: 32.1597, longitude: 74.1793 }}
                        title="I am Here"

                    />
                </MapView>
            </View>
           
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"space-between"
    },
});

//make this component available to the app
export default Location;
