//import liraries
import React, { useEffect, useState,useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import Heading from '../../Components/Heading';
import { getToken } from '../../../services/AsyncStorage';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';
import Colors from '../../Styles/Colors';
import Font from '../../Styles/Font';
import BaseUrl from '../../baseUrl/BaseUrl';
import { moderateScale } from 'react-native-size-matters';
import { RefreshControl } from 'react-native';
// create a component
const Appointment = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [refresh, setrefresh] = useState(false)
    const [data, setdata] = useState()
    const [loading, setloading] = useState(true)


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        (async () => {
            const token = await getToken()
            loadRequests(token);
        })();
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

            await fetch(`${BaseUrl.ExpertBaseurl}/loadRequests`, option)
                .then((res) => res.json())
                .then((d) => {
                    setdata(d.data), setloading(false)
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
        <View style={{flex:1}}>
            {loading ? (<Loader/>):(<View style={{flex:1}}>
                <Header text="no" onPress={() => navigation.goBack()} />

                <View style={styles.container}>
                    <Heading text={"Appointment History"} />


                    <View style={{flex:1}}>


                        {data && <FlatList
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                                    progressViewOffset={50}
                                    titleColor="#00ff00"
                                    colors={['purple', 'black', 'black']}
                                />
                            }

                            data={data.filter((item) => { if (item.status !== "Requested") return item })}
                            keyExtractor={data => data._id}
                            renderItem={({ item }) => (
                                <View style={{ flex: 1, }}>

                                    <View style={styles.view}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View>
                                                <Image source={{ uri: item.user.pic }}
                                                    style={styles.img}
                                                />
                                            </View>
                                            <TouchableOpacity style={{ marginLeft: moderateScale(10), width: moderateScale(210) }}
                                                onPress={() => { if (item.status === "Pending") { navigation.navigate('CompleteOrder', { item, setrefresh }) } }}>
                                                <Text style={{ color: Colors.black, fontSize: Font.body }}>{item.user.name}</Text>
                                                <Text>{item.date}</Text>
                                                <Text>{item.service.servicePrice}</Text>
                                            </TouchableOpacity>

                                        </View>

                                        <View style={styles.view2}>
                                            <Text style={{ color: Colors.purple }}>{item.status}</Text>
                                        </View>
                                    </View>

                                </View>

                            )} />}
                    </View>
                </View>
            </View>)}
            

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex:1,
        margin: moderateScale(10)
    },
    view: {
        flexDirection: 'row',
        marginTop: moderateScale(10),
        marginBottom: moderateScale(10),
        justifyContent:'space-between'
    },
    img: {
        borderRadius: moderateScale(40),
        width: moderateScale(40),
        height: moderateScale(40)
    },
    view2: {

        alignSelf: "center",
        backgroundColor:"#ccc",
        padding: moderateScale(2),
        borderRadius: moderateScale(12),
    }
});

//make this component available to the app
export default Appointment;
