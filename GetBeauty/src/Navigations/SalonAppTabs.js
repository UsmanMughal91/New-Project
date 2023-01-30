//import liraries
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../screens/SalonBooking/Search';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ParlorList from '../screens/SalonBooking/ParlorList';
import Appointment from '../screens/SalonBooking/Appointment';
import UserProfile from "../screens/SalonBooking/UserProfile"
import Colors from '../Styles/Colors';
import { moderateScale } from 'react-native-size-matters';

const BottomTab = createBottomTabNavigator();

// create a component
const SalonAppTabs = () => {
    return (
     
        <BottomTab.Navigator initialRouteName='ParlorList' screenOptions={{
            headerShown: false,
            tabBarLabelStyle: { fontSize:moderateScale(10), color:Colors.white, paddingBottom: 3 },
            // tabBarInactiveBackgroundColor: "#9932cc",
            tabBarBackgroundRadius:moderateScale(20),
            tabBarActiveBackgroundColor: "#7a28a3",
            tabBarIconStyle: { marginTop: 4 },
            tabBarStyle: {
                borderTopLeftRadius:moderateScale(20),
                borderTopRightRadius:moderateScale(20),
                height:moderateScale(45),
                backgroundColor: Colors.purple
            }
        }}>
                <BottomTab.Screen name='ParlorList' component={ParlorList}
                    options={{   
                    tabBarLabel: "Home",
                    tabBarIcon:({color,size,focused})=>(
                        <MaterialIcons name="home" size={25}  color={"white"}/>
                    ),
                          }} />

                <BottomTab.Screen name='Search' component={Search}
                options={{
                    tabBarLabel: "Search",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="search" size={25} color={"white"} />
                    ),
                }}
                />
            <BottomTab.Screen name='Appointment' component={Appointment}
                options={{
                    tabBarLabel: "Appointment",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="event-note" size={25} color={"white"} />
                    ),
                }}
               />
                   

                <BottomTab.Screen name='UserProfile' component={UserProfile}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="person" size={25} color={"white"} />
                    ),
                }}
               />   
            </BottomTab.Navigator>
      
    );
};

// define your styles

//make this component available to the app
export default SalonAppTabs;
