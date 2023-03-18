
//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/SalonBooking/Login';
import SignUp from '../screens/SalonBooking/SignUp';
import SplashScreen from '../screens/SplashScreen';
import SalonAppStack from './SalonAppStack';
import ForgotPass from '../screens/SalonBooking/ForgotPass';
import OtpChangePass from '../screens/SalonBooking/OtpChangePassword';
import OTP from '../screens/SalonBooking/Otp';


const Stack = createNativeStackNavigator();




// create a component
const SalonAuthStack = () => {

const [splash,setsplash] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setsplash(false)
        }, 1000);
    }, [])



    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>
         { splash ? <Stack.Screen name="SplashScreen" component={SplashScreen} /> : null  }  
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SalonAppStack" component={SalonAppStack} />
            <Stack.Screen name="ForgotPass" component={ForgotPass} />
            <Stack.Screen name="OTP" component={OTP} />
            <Stack.Screen name="OtpChangePass" component={OtpChangePass} />

        </Stack.Navigator>
    );
}; 

// define your styles
const styles = StyleSheet.create({

});

//make this component available to the app
export default SalonAuthStack;

