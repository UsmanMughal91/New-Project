//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainStack from '../Navigations/MainStack';
import SalonAppStack from '../Navigations/SalonAppStack';

// create a component
const Home = () => {
    return (
        <View style={styles.container}>
            <MainStack/>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//make this component available to the app
export default Home;
