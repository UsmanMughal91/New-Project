//import liraries
import React, { Component,useCallback,useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Heading from '../../Components/Heading'
import BtnComp from '../../Components/BtnComp';
import Header from '../../Components/Header';
import { moderateScale } from 'react-native-size-matters';
import SubHeading from '../../Components/SubHeading';
import Font from '../../Styles/Font';
import { RefreshControl } from 'react-native';
// create a component
const ServiceDetail = ({ navigation, route }) => {

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        
        setRefreshing(false);
    }, []);

    const [refreshing, setRefreshing] = useState(false);
    const item = route.params.item
    const profile = route.params.profile

    return (
        <View style={{ flex: 1 }}>
            <Header onPress={() => navigation.goBack()} />
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                    progressViewOffset={50}
                    titleColor="#00ff00"
                    colors={['purple', 'black', 'black']}
                />
            }>
                <Heading text={"About Service"} />
                <View style={styles.container}>
                    <Image source={{ uri: item.pic }}
                        style={styles.img} />
                   <SubHeading text={"Discription"}/>
                    <Text style={styles.text}>
                        {item.serviceDetails}
                    </Text>
                    <SubHeading text={"Price/Charges"} />
                    <Text style={styles.text}>
                        {item.servicePrice} PKR
                    </Text>
                    <BtnComp btnText={"Book Service"} btnStyle={{marginTop:moderateScale(20)}}
                     onPress={() => navigation.navigate('Booking', { item, profile })} />
                </View>
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        margin:moderateScale(20)
    },
    img: {
        height: moderateScale(200),
        width: "100%",
        borderRadius: moderateScale(12),
        marginTop: moderateScale(10)
    },
    text:{
        fontSize: Font.text, textAlign: 'justify', marginTop: moderateScale(10)
    }
});

//make this component available to the app
export default ServiceDetail;
