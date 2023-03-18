//import liraries
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BeautyExpertTabs from './BeautyExpertTabs';
import AddServices from '../screens/BeautyExpert/AddServices';
import ProviderServices from '../screens/BeautyExpert/ProviderServices';
import EditProfile from '../screens/BeautyExpert/EditProfile';
import SettingP from '../screens/BeautyExpert/SettingP';
import Profile from '../screens/BeautyExpert/Profile';
import Appointment from '../screens/BeautyExpert/Appointment';
import Request from '../screens/BeautyExpert/Request';
import SignUp from '../screens/BeautyExpert/SignUp';
import ChangePass from '../screens/BeautyExpert/ChangePass';
import ServiceDetail from '../screens/BeautyExpert/ServiceDetail'
import LoginExpert from '../screens/BeautyExpert/LoginExpert';
import ServiceSummary from '../screens/BeautyExpert/ServiceSummary';
import ExpertSplash from "../screens/ExpertSplash"
import CompleteOrder from '../screens/BeautyExpert/CompleteOrder';
import ForgotPass from '../screens/BeautyExpert/ForgotPass';
import ResetPass from '../screens/BeautyExpert/ResetPass';

import OtpChangePass from '../screens/BeautyExpert/OtpChangePassword';
import DashBoard from '../screens/BeautyExpert/DashBoard';
import EarningHistory from '../screens/BeautyExpert/EarningHistory';
import ExpertDrawer from '../Navigations/ExpertDrawer'
import { getToken } from '../../services/AsyncStorage';
import Location from '../screens/BeautyExpert/Location';


const Stack = createNativeStackNavigator();
// create a component
const BeautyExpertStack = () => {

  const [showsplashScreen, setshowsplashScreen] = useState(true);
  const [name, setname] = useState();

  useEffect(() => {
    (async () => {
      const token = await getToken() // getting token from storage

      if (token) {
        setname("BeautyExpertStack")
        //   setshowsplashScreen(false)
      } else {
        setname("ExpertAuthStack")
        //   setshowsplashScreen(false)
      }
    })();
  }, [])


  if (name) return (

    <Stack.Navigator initialRouteName={name} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExpertDrawer" component={ExpertDrawer} />
      <Stack.Screen name="ProviderServices" component={ProviderServices} />
      <Stack.Screen name="AddServices" component={AddServices} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="SettingP" component={SettingP} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Appointment" component={Appointment} />
      <Stack.Screen name="Request" component={Request} />
      <Stack.Screen name="ChangePass" component={ChangePass} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
      <Stack.Screen name="ServiceSummary" component={ServiceSummary} />
      <Stack.Screen name="CompleteOrder" component={CompleteOrder} />
      <Stack.Screen name="ResetPass" component={ResetPass} />
      <Stack.Screen name="EarningHistory" component={EarningHistory} />
      <Stack.Screen name="DashBoard" component={DashBoard} />
      <Stack.Screen name="Location" component={Location} />
    </Stack.Navigator>
  )
};

//make this component available to the app
export default BeautyExpertStack;
