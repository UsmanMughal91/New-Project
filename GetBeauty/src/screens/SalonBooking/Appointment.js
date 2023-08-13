//import liraries
import React, { Component, useEffect, useState,useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import Heading from '../../Components/Heading';
import { getToken } from '../../../services/AsyncStorage';
import Header from '../../Components/Header';
import Colors from '../../Styles/Colors';
import Font from '../../Styles/Font';
import BaseUrl from '../../baseUrl/BaseUrl';
import Loader from '../../Components/Loader'
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { RefreshControl } from 'react-native';
import Refresh from '../../Components/Refresh';

// create a component
const Appointment = ({ navigation }) => {

    const [data, setdata] = useState('')
    const [loading, setloading] = useState(true)
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        
                // const token = await getToken()
        (async () => {
            const token = await getToken()
            console.log("this is token", token)
            loadRequests(token);
        })();
            
        // Perform your refresh logic here
        // Once the refresh is complete, set refreshing to false
        setRefreshing(false);
    }, []);


    const loadRequests = async (token) => {
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

            await fetch(`${BaseUrl.SalonBaseurl}/loadRequests`, option)
                .then((res) => res.json())
                .then((d) => {
                   
                    setdata(d.data)
                    setloading(false)
                })
                .catch(err => console.log(err))
        } catch (error) {
           

            console.log(error)
        }
    }
    useEffect(() => {
        (async () => {
            const token = await getToken()
            console.log("this is token",token)
            loadRequests(token);
        })();
    }, [])


    return (
        <View style={{ flex: 1 }}>
            {loading ? (<Loader/>):(<View style={{flex:1}}>
                <Header text={"no"} onPress={() => navigation.goBack()} />
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}     
                            progressViewOffset={50}
                            titleColor="#00ff00"
                            colors={['purple', 'black', 'black']}
                         />
                    }
           
                >
               
                    <View style={{ margin: moderateScale(10) }}>
                        <Heading text={"Appointment History"} />
                        <View style={styles.barView}>
                            <Text style={styles.barText}>Beauty Experts</Text>
                            <Text style={styles.barText}>Description</Text>
                            <Text style={styles.barText}>Status</Text>
                        </View>
                        {loading && <Loader />}
                        {data ? (<View><FlatList
                            data={data}
                            keyExtractor={data => data._id}
                            // refreshControl={
                            //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            // }
                            renderItem={({ item }) => (
                                <View style={styles.flatView}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View>
                                            <Image source={{ uri: item.expert.pic }} style={styles.img} />
                                        </View>
                                        <View style={{ width: moderateScale(140) }}>
                                            <Text style={styles.flatlist}>{item.expert.parlourName}</Text>
                                            <Text style={{ marginLeft: moderateScale(10), fontSize: Font.text }}>{item.expert.name}</Text>
                                        </View>
                                        <View style={{ width: moderateScale(100) }}>
                                            <Text style={{ fontSize: Font.text }}>{item.date}</Text>
                                            <Text style={{ fontSize: Font.text }}>{item.service.servicePrice} PKR</Text>
                                        </View>
                                    </View>
                                    <View style={{ alignSelf: 'center' }} >
                                        <View style={styles.status}>
                                            <Text style={styles.statusT}>{item.status}</Text>
                                        </View>
                                        {item.status === "Accepted" ? <TouchableOpacity style={{ ...styles.status, marginTop: moderateScale(7) }}
                                            onPress={() => navigation.navigate('Payment', { item })}>
                                            <Text style={styles.statusT}>Payment</Text>
                                        </TouchableOpacity> : null}
                                    </View>

                                </View>)
                            } /></View>) : (<Text>Empty</Text>)}
                    </View>
                </ScrollView>
            </View>)}
            
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    flatView: {
        flexDirection: 'row',
        flex: 1,
        marginTop: moderateScale(30),
        justifyContent: 'space-between'
    },
    barView: {
        backgroundColor: Colors.purple,
        marginTop: moderateScale(10),
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: moderateScale(12)
    },
    barText: {
        fontSize: Font.text,
        color: Colors.white,
        paddingHorizontal: moderateScale(10)
    },
    img: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(40)
    },
    flatlist: {
        fontSize: Font.list,
        color: Colors.black,
        marginLeft: moderateScale(10),
        fontWeight:'500'
    },
    status: {
        backgroundColor: "#ccc",
        borderRadius: moderateScale(12),
        width: moderateScale(70),
        alignItems: 'center',
        justifyContent: 'center',
        height: moderateScale(20),
        alignSelf: "center",
        
    },
    statusT:{
        textAlign: 'center',
         fontSize: scale(10),
          color: Colors.purple 
    }


});

//make this component available to the app
export default Appointment;
