//import liraries
import React, { Component, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../Styles/Colors';
import Font from '../Styles/Font';
import Lottie from 'lottie-react-native'
// create a component
const Loader = ({ viewStyle }) => {
    const animationRef = useRef()
    return (
        // <View style={{...styles.container,...viewStyle}}>
        //     <Text style={{fontSize:Font.subHeading,color:Colors.purple,fontWeight:'bold',marginBottom:moderateScale(10)}}>Loading...</Text>
        //     <ActivityIndicator size={"large"} color={Colors.purple} />
        // </View>
        <View style={{ flex: 1}}>
            <Lottie 
            ref={animationRef}
            source={require('../assests/dlf10_Ned1WY044V.json')}
            loop={true}
            autoPlay={true}
            // size={10}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        alignItems: "center",
        justifyContent: 'center'
    },
});

//make this component available to the app
export default Loader;
