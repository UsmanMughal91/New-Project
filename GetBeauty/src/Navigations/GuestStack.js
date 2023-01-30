import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ParlourListG from '../screens/Guest/ParlourListG';
import ServicesG from '../screens/Guest/ServicesG';

const Stack = createNativeStackNavigator();

const GuestStack = () => {
    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ParlourListG" component={ParlourListG} />
            <Stack.Screen name="ServicesG" component={ServicesG} />
        </Stack.Navigator>
    )

};
export default GuestStack;