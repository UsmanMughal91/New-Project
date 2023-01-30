//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Heading from '../../Components/Heading'
import Header from '../../Components/Header';
import { moderateScale } from 'react-native-size-matters';
import SubHeading from '../../Components/SubHeading'
import Font from '../../Styles/Font';

// create a component
const ServiceDetail = ({ navigation, route }) => {
    useEffect(() => {
        console.log(route.params.item)
    }, [])
    return (
        <View>
            <Header onPress={() => navigation.goBack()} />

            <View style={{ margin: moderateScale(10) }}>
                <Heading text={"About Service"} />
                <Image source={{ uri: route.params.item.pic }}
                    style={styles.img} />
                <SubHeading text={"Discription"} />
                <Text style={styles.text}>
                    {route.params.item.serviceDetails}
                </Text>
                <SubHeading text={"Price/Charges"} />
                <Text style={styles.text}>
                    {route.params.item.servicePrice} PKR
                </Text>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    img: {
        height: moderateScale(200),
        width: "100%",
        borderRadius: moderateScale(12),
        marginTop: moderateScale(20)
    },
    text: {
        fontSize: Font.text,
        textAlign: 'justify',
        marginTop: moderateScale(10)
    }
});

//make this component available to the app
export default ServiceDetail;
