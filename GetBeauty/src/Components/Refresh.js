//import liraries
import React, { Component,useCallback,useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';
// create a component
const Refresh = () => {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        console.log(
            'this page is refresh'
        )
        // Perform your refresh logic here
        // Once the refresh is complete, set refreshing to false
        setRefreshing(false);
    }, []);
    return (
        <ScrollView refreshControl={
            < RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                progressViewOffset={50}
                titleColor="#00ff00"
                colors={['purple', 'black', 'black']}
            />
        }
        >



        </ScrollView>
      
           
     
       
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
      
    },
});

//make this component available to the app
export default Refresh;
