//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground } from 'react-native';
import BtnComp from '../Components/BtnComp';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Colors from '../Styles/Colors';

// create a component
const RegisterOption = ({navigation}) => {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../assests/images/bg2.jpg')}
                style={{ flex: 1, justifyContent: 'flex-end' }}>

                <View style={styles.imgStyle}>
                    <View style={{margin:moderateScale(10)}}> 
                        <Text style={{ color: Colors.white, fontSize: scale(32), fontWeight: "bold" }}>GetBeauty</Text>
                        <Text style={{ color: Colors.white, fontSize: scale(25),  }}>Salon Booking & </Text>
                        <Text style={{ color: Colors.white, fontSize: scale(25), }}>Beauty Expert </Text>
                        <Text style={{ color: Colors.white, fontSize: scale(25),   }}>Mobile App</Text>

                      <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:moderateScale(10)}}>
                        <View style={{ width: "46%" }}>
                                <BtnComp btnText={"Salon Booking"} onPress={() => navigation.navigate('SalonAuthStack')}  />
                        </View>
                        <View style={{ width: "46%" }} >
                                <BtnComp btnText={"Beauty Expert"} onPress={() => navigation.navigate("ExpertAuthStack")}  />
                        </View>
                      </View>       
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({

    imgStyle: {
        margin: moderateScale(15),
        backgroundColor: Colors.black,
        borderRadius: moderateScale(20),
        opacity: 0.8
    }
});

//make this component available to the app
export default RegisterOption;
