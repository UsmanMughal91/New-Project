//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import Heading from '../../Components/Heading';
import Header from '../../Components/Header';
import SubHeading from '../../Components/SubHeading'
import Font from '../../Styles/Font';
import Colors from '../../Styles/Colors';
import PaymentScreen from '../../screens/SalonBooking/PaymentScreen';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';

// create a component
const Payment = ({ navigation, route }) => {
    const Data = route.params.item
    
    return (
        <View style={{ flex: 1 }}>
            <Header onPress={() => navigation.goBack()} />
            <ScrollView style={styles.container}>
                <Heading text={"Payment"} />
                <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: Data.expert.pic }}
                        style={styles.img} />
                </View>
                <SubHeading text={Data.expert.parlourName} viewStyle={{ alignItems: 'center' }} />
                <Text style={{ fontSize: Font.text, textAlign: "center" }}>{Data.expert.name}</Text>
                <SubHeading text={"Date & Time"}  />
                <View style={styles.view}>
                    <Text style={styles.text}>Date</Text>
                    <Text style={styles.text}>{Data.date}</Text>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Time</Text>
                    <Text style={styles.text}>{Data.time}</Text>
                </View>
                <SubHeading text={"Payment"} />
                <View style={styles.view}>
                    <Text style={styles.text}>Payment type</Text>
                    <Text style={styles.text}>{Data.method}</Text>
                </View>
                <SubHeading text={"Amount"} />
                <View style={styles.view}>
                    <Text style={{...styles.text,color:Colors.black}}>Service</Text>
                    <Text style={{ ...styles.text, color: Colors.black }}>Price</Text>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>{Data.service.serviceName}</Text>
                    <Text style={styles.text}>{Data.service.servicePrice}</Text>
                </View>
                <View style={styles.view}>
                    <SubHeading text={"Total"} />
                    <SubHeading text={Data.service.servicePrice} PKR={" PKR"} />
                </View>

                <PaymentScreen />


            </ScrollView>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        margin: moderateScale(10)
    },
    img: {
        width: moderateScale(100),
        height: moderateScale(100),
        borderRadius: moderateScale(50),
        marginTop: moderateScale(10)
    },
    view:{
        flexDirection: "row",
         justifyContent: "space-between",
          marginTop: moderateScale(10)
    },
    text:{
        fontSize:Font.text
    }

});

//make this component available to the app
export default Payment;
