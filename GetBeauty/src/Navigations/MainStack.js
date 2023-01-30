//import liraries
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RegisterOption from '../screens/RegisterOption';
import ViewScreen from '../screens/ViewScreen';
import SalonAppStack from './SalonAppStack';
import BeautyExpertStack from './BeautyExpertStack';
import GuestStack from './GuestStack';
import Splash from '../screens/Splash';
import SalonAuthStack from "./SalonAuthStack"
import ExpertAuthStack from "./ExpertAuthStack"


const Stack = createNativeStackNavigator();


// create a component
const MainStack = () => {
    const [splash, setsplash] = useState(true)
    
    useEffect(() => {
        setTimeout(() => {
            setsplash(false)
        }, 2000);
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {splash?  <Stack.Screen name="Splash" component={Splash} /> : null}
                <Stack.Screen name="ViewScreen" component={ViewScreen} />
                <Stack.Screen name="RegisterOption" component={RegisterOption} />
                <Stack.Screen name="SalonAppStack" component={SalonAppStack} />
                <Stack.Screen name="BeautyExpertStack" component={BeautyExpertStack} />
                <Stack.Screen name="GuestStack" component={GuestStack} />
                <Stack.Screen name="SalonAuthStack" component={SalonAuthStack} />
                <Stack.Screen name="ExpertAuthStack" component={ExpertAuthStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default MainStack;
