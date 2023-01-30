//import liraries
import React, { Component,useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Home from './src/screens/Home'
import { store } from './store';
import {requestUserPermission,notificationListener} from "./services/Notification"
import ForegroundHandler from './services/ForegroundHandler';



// create a component
const App = () => {



  useEffect(() => {
    requestUserPermission()
    notificationListener()
  }, [])
  return (

    
    <View style={styles.container}>
      <ForegroundHandler/>
     <Home/>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,




  },
});

//make this component available to the app
export default App;
