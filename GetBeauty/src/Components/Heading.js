//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Font from '../Styles/Font';
import Colors from '../Styles/Colors';
import { moderateScale } from 'react-native-size-matters';
// create a component
const Heading = ({text,textStyle,ViewStyle}) => {
    return (
        <View style={{...styles.ViewStyle,...ViewStyle}}>
            <Text style={{...styles.container,...textStyle}}>{text}</Text>
        </View>
    );
};
// define your styles
const styles = StyleSheet.create({
    container: {
        fontSize: Font.Heading,
        fontWeight:'600',
        color: Colors.black,
      marginTop:moderateScale(10),
      
    },
    ViewStyle:{
        alignItems: "center"
    }
});

//make this component available to the app
export default Heading;
