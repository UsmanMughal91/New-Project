//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SubHeading from '../../Components/SubHeading';
import Header from '../../Components/Header'
import Heading from '../../Components/Heading';
import Colors from '../../Styles/Colors';
import Font from '../../Styles/Font';
import { moderateScale } from 'react-native-size-matters';

// create a component
const EarningHistory = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <Header onPress={() => navigation.goBack()} />
            <View style={{ margin: moderateScale(10) }}>
                <Heading text={"Earning History"} />
                <SubHeading text={"This Month"} viewStyle={{ marginTop: moderateScale(30) }} />
                <View style={styles.view}>
                    <Text style={styles.text}>20345 PKR</Text>
                </View>
                <SubHeading text={"Last Month"} viewStyle={{ marginTop: 30 }} />
                <View style={styles.view}>
                    <Text style={styles.text}>20345 PKR</Text>
                </View>
                <SubHeading text={"Last Six Months"} viewStyle={{ marginTop: 30 }} />
                <View style={styles.view}>
                    <Text style={styles.text}>20345 PKR</Text>
                </View>
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        marginTop:moderateScale(20),
        backgroundColor: Colors.white,
        borderRadius:moderateScale(12),
        padding:moderateScale(5),
        elevation:10
    },
    text:{
        fontSize: Font.subHeading,
         color: Colors.purple 
    }
});

//make this component available to the app
export default EarningHistory;
