//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import SubHeading from '../../Components/SubHeading';
import Header from '../../Components/Header';
import Heading from '../../Components/Heading';
import Colors from '../../Styles/Colors';
import Font from '../../Styles/Font';
import BtnComp from '../../Components/BtnComp';
import { moderateScale } from 'react-native-size-matters';
import BaseUrl from '../../baseUrl/BaseUrl';
// create a component

const CompleteOrder = ({ navigation, route }) => {
    const data = route.params.item
    const setrefresh = route.params.setrefresh
    console.log(data)
    const complete = async (item) => {
        const option = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    item: item,
                    newStatus: "Completed",
                }
            )
        }
        try {

            await fetch(`${BaseUrl.ExpertBaseurl}/booking`, option)
                .then((res) => res.json())
                .then((d) => {
                    setrefresh(true)
                    navigation.goBack()
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <Header onPress={() => navigation.goBack()} />
            {data && <View style={styles.container}>
                <Heading text={"Status"} />
                <View style={{ alignItems: 'center', marginTop: moderateScale(20) }}>
                    <Image source={{ uri: data.user.pic }}
                        style={styles.img} />
                </View>
                <SubHeading text={data.user.name} 
                viewStyle={{ alignItems: 'center',marginBottom:moderateScale(30) }} />
                <SubHeading text={"Date & Time"} />
                <View style={styles.view}>
                    <Text style={styles.text}>Date</Text>
                    <Text style={styles.text}>{data.date}</Text>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Time</Text>
                    <Text style={styles.text}>{data.time}</Text>
                </View>
                <SubHeading text={"Amount"}  />
                <View style={styles.view}>
                    <Text style={{...styles.text, color: Colors.black, }}>Service</Text>
                    <Text style={{ ...styles.text, color: Colors.black }}>Price</Text>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>{data.service.serviceName}</Text>
                    <Text style={styles.text}>{data.service.servicePrice} PKR</Text>
                </View>
                <View style={styles.view}>
                    <SubHeading text={"Total"} />
                    <SubHeading text={data.service.servicePrice} PKR={" PKR"} />
                </View>
               
                    <BtnComp btnText={"Complete"} btnStyle={{alignSelf:'center',marginTop:moderateScale(50)}} onPress={() => complete(data)} />
               
            </View>}
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
    view: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: moderateScale(10)
    },
    text:{
        fontSize: Font.text
    }
});

//make this component available to the app
export default CompleteOrder;
