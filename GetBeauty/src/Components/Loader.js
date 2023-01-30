//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native';
import Colors from '../Styles/Colors';

// create a component
const Loader = ({viewStyle}) => {
    return (
        <View style={{...styles.container,...viewStyle}}>
            <ActivityIndicator size={"large"} color={Colors.purple} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
     flex:1,
    alignSelf:'center'
    },
});

//make this component available to the app
export default Loader;
