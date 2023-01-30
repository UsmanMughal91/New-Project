//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import Heading from '../../Components/Heading';
import { getToken } from '../../../services/AsyncStorage';
import Header from '../../Components/Header'
import Loader from '../../Components/Loader';
import Colors from '../../Styles/Colors';
import Font from '../../Styles/Font';
import BaseUrl from '../../baseUrl/BaseUrl';
import { moderateScale } from 'react-native-size-matters';
// create a component
const Request = ({ navigation }) => {
    const [data, setdata] = useState("")
    const [refresh, setrefresh] = useState(false)
    const [loading, setloading] = useState(true);

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
                    setdata(d.data); setloading(false)
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }
    const accept = async (item) => {
        const option = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    item: item,
                    newStatus: "Pending",
                }
            )
        }
        try {

            await fetch(`${BaseUrl.ExpertBaseurl}/booking`, option)
                .then((res) => res.json())
                .then((d) => {
                    setrefresh(true)
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }

    const cancle = async (item) => {

        const option = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    item: item,
                    newStatus: "Cancelled",
                }
            )
        }
        try {
            await fetch(`${BaseUrl.ExpertBaseurl}/booking`, option)
                .then((res) => res.json())
                .then((d) => {
                    setdata(d);
                    setloading(false)
                    setrefresh(true)
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        (async () => {
            const token = await getToken()
            loadRequests(token);
        })();
    }, [refresh])
    return (
        <View style={{ flex: 1 }}>
            <Header text="no" onPress={() => navigation.goBack()} />
            <View style={styles.container}>
                <Heading text={"Customer Request"} />
                {loading && <Loader />}
                {data && <FlatList
                    data={data.filter((item) => { if (item.status === "Requested") return item })}
                    keyExtractor={data => data._id}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flex: 1 }}>
                                <View style={styles.View}>
                                    <View style={{ width: moderateScale(60) }}>
                                        <Image source={{ uri: item.user.pic }}
                                            style={styles.img}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('ServiceSummary', { item })}>
                                            <Text style={{ color: Colors.black, fontSize: Font.body }}>{item.user.name}</Text>
                                            <Text>{item.date}</Text>
                                            <Text>{item.service.servicePrice} Rs</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.view2}>
                                        <TouchableOpacity style={styles.click} onPress={() => accept(item)}>
                                            <Text style={styles.text}>Accept</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.click} onPress={() => cancle(item)}>
                                            <Text style={styles.text} >Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>

                        )
                    }} />}
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        margin: moderateScale(10),
    },
    View: {
        flexDirection: 'row',
        marginTop: moderateScale(10),
        marginBottom: moderateScale(10),
        justifyContent: 'space-between'
    },
    img: {
        borderRadius: moderateScale(40),
        width: moderateScale(40),
        height: moderateScale(40)
    },
    view2: {
        flexDirection: 'row',
        alignSelf: "center",
        width: moderateScale(120),
        flexWrap: "wrap",
        justifyContent: 'space-around'
    },
    click: {
        backgroundColor: "#ccc",
        borderRadius: moderateScale(12),
        justifyContent: 'center',
        padding: moderateScale(4)
    },
    text:{
        fontSize:moderateScale(12),
         textAlign: 'center', 
         color: Colors.purple
    }
});

//make this component available to the app
export default Request;