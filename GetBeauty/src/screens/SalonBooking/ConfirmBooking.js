//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import BtnComp from '../../Components/BtnComp';
import SubHeading from '../../Components/SubHeading';
import Header from '../../Components/Header';
import Heading from '../../Components/Heading';
import Colors from '../../Styles/Colors';
import Font from '../../Styles/Font';
import { getToken } from '../../../services/AsyncStorage';
import BaseUrl from '../../baseUrl/BaseUrl';
import CustomModal from '../../Components/CustomModal';
import { moderateScale } from 'react-native-size-matters';
// create a component
const ConfirmBooking = ({ navigation, route }) => {
    const item = route.params.item
    const passData = route.params
    console.log("this is passData", passData)
    const id = route.params.item.id
    const profile = route.params.profile
    
    console.log("this is data",passData)

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [value, setValue] = useState(null);
    const [modalvisible, setmodalvisible] = useState(false)

    const [data, setdata] = useState('')

    const submitForm = async () => {
        const token = await getToken()
        const option = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    token: token,
                    service: item,
                    expertID: route.params.item.id,
                    date: date.toString().slice(4, 15),
                    time: passData.time,
                    method: passData.value,
                    status: "Requested",
                }
            )
        }
        try {

            await fetch(`${BaseUrl.SalonBaseurl}/booking`, option)
                .then((res) => res.json())
                .then((d) => {
                    console.log(d.message)
                    if (d.status === "success") {
                        setmodalvisible(true)

                    }
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {

    })
    return (
        <View style={{ flex: 1 }}>
            <Header onPress={() => navigation.goBack()} />
            <ScrollView>
                <View style={styles.container}>
                    <Heading text={"Service Summary"} />
                    <View style={{ alignItems: 'center', marginTop: moderateScale(10) }}>
                        <Image source={{ uri: profile.pic }}
                            style={styles.img} />
                    </View>
                    <SubHeading text={profile.parlourName} viewStyle={{ alignItems: 'center' }} />
                    <Text style={{ textAlign: 'center', fontSize: Font.text }}>{profile.name}</Text>
                    <SubHeading text={"Date & Time"} />
                    <View style={styles.view}>
                        <Text style={styles.text}>Date</Text>
                        <Text style={styles.text}>{passData.date.toString().slice(4, 15)}</Text>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>Time</Text>
                        <Text style={styles.text}>{passData.time}</Text>
                    </View>
                    <SubHeading text={"Payment"} />
                    <View style={styles.view}>
                        <Text style={styles.text}>Payment Type</Text>
                        <Text style={styles.text}>{passData.value}</Text>

                    </View>
                    <SubHeading text={"Amount"} />
                    <View style={styles.view}>
                        <Text style={{...styles.text,color:Colors.black}}>Service</Text>
                        <Text style={{ ...styles.text, color: Colors.black }}>Price</Text>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>{item.serviceName}</Text>
                        <Text style={styles.text}>{item.servicePrice}</Text>
                    </View>
                    <View style={styles.view}>
                        <SubHeading text={"Total"} />
                        <SubHeading text={item.servicePrice} PKR={" PKR"} />
                    </View>
                    <BtnComp btnText={"Send Request"} onPress={submitForm} btnStyle={{ marginTop:moderateScale(20) }} />
                </View>
                <CustomModal modalvisible={modalvisible} setmodalvisible={setmodalvisible} onPress={() => {
                    setmodalvisible(false);
                    navigation.navigate("Services", { item })
                }} text={"Your Request has submitted Successfully"} />
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        margin: moderateScale(20)
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
          marginTop:moderateScale(10) 
    },
    text:{
        fontSize:Font.text
    }
});

//make this component available to the app
export default ConfirmBooking;
