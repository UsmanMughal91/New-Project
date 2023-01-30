//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../Styles/Colors';

// create a component
const ExpertSplash = () => {
    return (

        <View style={styles.container}>
            <Image source={require("../assests/images/logo2.png")}
             resizeMode={"center"}  />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "center",
        justifyContent: "center"
    },
});

//make this component available to the app
export default ExpertSplash;
