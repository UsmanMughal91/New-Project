//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import SubHeading from '../../Components/SubHeading';
import Header from '../../Components/Header';
import Heading from '../../Components/Heading';
import Colors from '../../Styles/Colors';
import Font from '../../Styles/Font';
import { moderateScale } from 'react-native-size-matters';
// create a component
const ServiceSummary = ({ navigation, route }) => {
    const data = route.params.item

    return (
        <View style={{ flex: 1 }}>
            <Header onPress={() => navigation.goBack()} />
            <ScrollView style={{ margin: moderateScale(10) }}>
                {data && <View style={styles.container}>

                    <Heading text={"Service Summary"} />
                    <View style={{ alignItems: 'center', marginTop: moderateScale(20) }}>
                        <Image source={{ uri: data.user.pic }}
                            style={styles.img} />
                    </View>
                    <SubHeading text={data.user.name} viewStyle={{ alignSelf: 'center' }} />
                    <SubHeading text={"Date & Time"} />
                    <View style={styles.view}>
                        <Text style={styles.text}>Date</Text>
                        <Text style={styles.text}>{data.date}</Text>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>Time</Text>
                        <Text style={styles.text}>{data.time}</Text>
                    </View>
                    <SubHeading text={"Payment"} viewStyle={styles.h11} />
                    <View style={styles.view}>
                        <Text style={styles.text}>Payment type</Text>
                        <Text style={styles.text}>{data.method}</Text>
                    </View>
                    <SubHeading text={"Amount"} viewStyle={styles.h11} />
                    <View style={styles.view}>
                        <Text style={{...styles.text, color: Colors.black, }}>Service</Text>
                        <Text style={{ ...styles.text, color: Colors.black }}>Price</Text>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>{data.service.serviceName}</Text>
                        <Text style={styles.text}>{data.service.servicePrice} PKR</Text>
                    </View>
                    <View style={styles.view}>
                        <SubHeading text={"Total"}  />
                        <SubHeading text={data.service.servicePrice} PKR={" PKR"}  />
                    </View>
                </View>}
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
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
        fontSize:Font.text
    }
});

//make this component available to the app
export default ServiceSummary;
