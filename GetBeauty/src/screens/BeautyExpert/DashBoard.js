//import liraries
import React, { Component, useEffect, useState,useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground, TextInput, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { getToken } from '../../../services/AsyncStorage';
import Loader from '../../Components/Loader'
import Colors from '../../Styles/Colors';
import { BarChart } from "react-native-chart-kit";
import BaseUrl from '../../baseUrl/BaseUrl';
import Font from '../../Styles/Font';
import { moderateScale, scale, moderateVerticalScale } from 'react-native-size-matters';
import { RefreshControl } from 'react-native';
const DashBoard = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [data, setdata] = useState()
    const [TotalServices, setTotalServices] = useState(0)
    const [PendingOrders, setPendingOrders] = useState()
    const [CompletedOrders, setCompletedOrders] = useState()
    const [loading, setloading] = useState(true)


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        (async () => {
            const token = await getToken() // getting token from storage
            setCompletedOrders(0)
            setPendingOrders(0)
            loadservices(token);
            loadRequests(token);
        })();
        setRefreshing(false);
    }, []);
    // create a component
    const loadservices = async (token) => {
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
            await fetch(`${BaseUrl.ExpertBaseurl}/loadservices`, option)
                .then((res) => res.json())
                .then((d) => {
                    setTotalServices(d.data.length)
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        (async () => {
            const token = await getToken() // getting token from storage
            setCompletedOrders(0)
            setPendingOrders(0)
            loadservices(token);
            loadRequests(token);
        })();
    }, [])

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
            await fetch(`${BaseUrl.ExpertBaseurl}/loadRequests`, option)
                .then((res) => res.json())
                .then((d) => {
                    d.data.map((item) => {
                        console.log(item.status)
                        if (item.status === "Pending") { setPendingOrders((prev) => prev + 1) }
                        else if (item.status === "Completed") { setCompletedOrders((prev) => prev + 1) }
                    })
                    setdata(d.data), setloading(false)
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }
    return (

        <View style={{ flex: 1 }}>
{loading ? (<Loader/>):(
    <View style={{flex:1}}>
                    <ImageBackground source={require('../../assests/images/beauti.jpg')}
                        style={{ width: "100%", height: moderateScale(220) }}>
                        <View style={styles.picView}>
                            <View style={styles.nav}>
                                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                                    <FontAwesome name='navicon' size={20} color={Colors.black} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.viewblack}>
                                <Text style={styles.imgT}>Beauty Parlour</Text>
                                <Text style={{ fontSize: scale(12), color: Colors.white }}>Beauty Parlour Booking App</Text>
                                <View>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>

                    {data && <ScrollView 
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                                progressViewOffset={50}
                                titleColor="#00ff00"
                                colors={['purple', 'black', 'black']}
                            />
                        }
                    style={{ flex: 1, margin: moderateScale(10) }}>

                            <View style={styles.view4}>
                                <Text style={styles.text}>Total  Services</Text>
                                <Text style={styles.number}>{TotalServices}</Text>
                            </View>
                            <View style={styles.view4}>
                                <Text style={styles.text}>Pending  Orders</Text>
                                <Text style={styles.number}>{PendingOrders}</Text>
                            </View>
                            <View style={styles.view4}>
                                <Text style={styles.text}>Completed Orders</Text>
                                <Text style={styles.number}>{CompletedOrders}</Text>
                            </View>

                        <View style={styles.view4}>
                            <Text style={styles.text}>TOTAL EARNING</Text>
                            <Text style={styles.number}>{data.earning}</Text>
                        </View>
                       
                      
                    </ScrollView >}
    </View>
)}
          
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    nav: {
        backgroundColor: Colors.white,
        alignSelf: 'flex-start',
        marginTop: moderateScale(20),
        marginLeft: moderateScale(10),
        borderRadius: moderateScale(12),
        padding: moderateScale(5)
    },
    picView: {
        height: moderateVerticalScale(210),
        borderColor: 'white',
        justifyContent: 'space-between'
    },
    viewblack: {
        marginLeft: moderateScale(10),
        width: "60%",
        marginBottom: moderateScale(10),
        justifyContent: "center"
    },
    erng: {
        fontSize: Font.body,
        fontWeight: 'bold',
        color: 'gray'
    },
    imgT: {
        fontSize: scale(27),
        color: Colors.white,
        fontWeight: 'bold'
    },
    chartView: {
        flexWrap: "wrap",
        alignSelf: "center",
        marginTop: moderateScale(5)
    },
    view1: {
        backgroundColor: Colors.white,
        borderRadius: moderateScale(12),
        height: moderateScale(260),
        elevation:10,
        marginHorizontal: moderateScale(10),
        marginTop:moderateScale(10)
    },
    view2: {
        flexDirection: 'row',
        justifyContent: "space-between",
        margin: moderateScale(10)
    },
    view3: {
        flexDirection: 'row',
        height: moderateScale(150),
        marginTop: moderateScale(30),
        marginHorizontal:moderateScale(10)
        
    },
    view4: {
        backgroundColor: Colors.white,
        flex: 1,
        borderRadius: moderateScale(12),
        elevation:10,
        marginHorizontal:moderateScale(20),
        marginBottom:moderateScale(20),
        marginTop:moderateScale(20)
    },
    text: {
        textAlign: 'center',
        margin: moderateScale(10),
        color: 'gray',
        fontSize: Font.body,
        fontWeight:"bold"
    },
    number: {
        fontSize: Font.Heading,
        marginTop: moderateScale(10),
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.purple
    },
    view5: {
        backgroundColor:Colors.white,
        marginTop:moderateScale(30),
        borderRadius:moderateScale(12),
        height:moderateScale(100),
        marginBottom:moderateScale(30),
        elevation:10,
        marginHorizontal: moderateScale(10)
    }
});

//make this component available to the app
export default DashBoard;
