//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native'
import { getToken } from '../../services/AsyncStorage'
import BaseUrl from '../baseUrl/BaseUrl';
// create a component

const Splash = ({navigation}) => {

    const [user,setUser] = useState()
    
        const loaduser = async (token)=> {

        const option = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    token: token
                }
            )
        }
        try {
          
            await fetch(`${BaseUrl.SalonBaseurl}/loaduser`, option)
                .then((res) => res.json())
                .then((d) => {  
                    console.log(d.data)
                    if(d.data === 'user'){
                        navigation.navigate("SalonAppStack")
                      
                    } else if (d.data === 'expert'){
                        navigation.navigate("BeautyExpertStack")

                    }
                 })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( ()=>{

        (async () => {    
        const token = await getToken(token) // getting token from storage
        console.log("this is token",token)
       if(token){
       await loaduser(token)
       }else{
console.log("token nai mil ra ")
        navigation.navigate("ViewScreen")
       }
        loaduser(token);
        })();
      
    },[])
   return (
        <View style={styles.container}>
            <Image source={require("../assests/images/logo1.png")} 
             resizeMode={"center"}
             style={{alignItems:"center"}}/>
        </View>
    );
};
// define your styles
const styles = StyleSheet.create({
    container: {
        flex:1,
    alignItems:'center',
        alignSelf:"center",
        justifyContent:"center"
    },
});
//make this component available to the app
export default Splash;
