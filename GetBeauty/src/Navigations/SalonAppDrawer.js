import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import SalonAppTabs from "../Navigations/SalonAppTabs";
import Colors from "../Styles/Colors";
import CustomDrawer from "../Components/CustomDrawer"
const Drawer = createDrawerNavigator();

const SalonAppDrawer=()=> {
    return (
        <Drawer.Navigator screenOptions={{
          
            headerShown:false,
            drawerStyle: {
                width:"65%",
            },
        }}
            drawerContent={(props) => <CustomDrawer {...props} />}>
            <Drawer.Screen name="SalonAppTabs" component={SalonAppTabs} />
        </Drawer.Navigator>
    );
}

export default SalonAppDrawer