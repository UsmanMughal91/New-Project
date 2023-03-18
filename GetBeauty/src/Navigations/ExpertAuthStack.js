//import liraries
import React, { Component,useEffect,useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoginExpert from '../screens/BeautyExpert/LoginExpert';
import SignUp from '../screens/BeautyExpert/SignUp';
import ExpertSplash from '../screens/ExpertSplash';
import BeautyExpertStack from './BeautyExpertStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPass from '../screens/BeautyExpert/ForgotPass';
import OTP from '../screens/BeautyExpert/Otp';
import OtpChangePass from '../screens/BeautyExpert/OtpChangePassword';

const Stack = createNativeStackNavigator();

// create a component
const ExpertAuthStack = () => {
    const [splash, setsplash] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setsplash(false)
        }, 1000);
    }, [])
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {splash ? <Stack.Screen name="ExpertSplash" component={ExpertSplash} /> : null } 
            <Stack.Screen name="LoginExpert" component={LoginExpert} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPass" component={ForgotPass} />
            <Stack.Screen name="OTP" component={OTP} />
            <Stack.Screen name="OtpChangePass" component={OtpChangePass} />
            <Stack.Screen name="BeautyExpertStack" component={BeautyExpertStack} />     
        </Stack.Navigator>
    );
};
 
// define your styles
const styles = StyleSheet.create({
    container: {
       
    },
});

//make this component available to the app
export default ExpertAuthStack;
