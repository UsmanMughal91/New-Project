//import liraries
import React, { useEffect, useState,useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Heading from '../../Components/Heading';
import { getToken } from '../../../services/AsyncStorage';
import Loader from '../../Components/Loader';
import Header from '../../Components/Header';
import Colors from '../../Styles/Colors';
import BaseUrl from '../../baseUrl/BaseUrl';
import { moderateScale } from 'react-native-size-matters';
import Font from '../../Styles/Font';
import { RefreshControl } from 'react-native';
// create a component
const ProviderServices = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [data, setdata] = useState();
    const [serviceName, setserviceName] = useState();
    const [servicePrice, setservicePrice] = useState();
    const [pic, setpic] = useState();
    const [id, setid] = useState();
    const [search, setSearch] = useState("")
    const [loading, setloading] = useState(true)


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        (async () => {
            const token = await getToken() // getting token from storage
            loadservices(token);
        })();
        setRefreshing(false);
    }, []);


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
                    setdata(d.data); setloading(false)
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        (async () => {
            const token = await getToken() // getting token from storage
            loadservices(token);
        })();
    }, [])
    return (
        <View style={{ flex: 1 }}>
{loading ? (<Loader/>):(<View style={{flex:1}}>
                <Header onPress={() => navigation.goBack()} />
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                            progressViewOffset={50}
                            titleColor="#00ff00"
                            colors={['purple', 'black', 'black']}
                        />
                    }
                >

                    {data &&
                        <View style={{ margin: moderateScale(10) }}>
                            <View >
                                <Heading text={"Services"} />
                                <View style={styles.sView}>
                                    <View>
                                        <TextInput placeholder='Search Service'
                                            style={{ fontSize: Font.body }}
                                            onChangeText={(val) => { setSearch(val) }} />
                                    </View>
                                    <View>
                                        <TouchableOpacity style={styles.searchb}>
                                            <Text style={{ color: Colors.white, fontSize: Font.text }}>Search</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <FlatList
                                    data={data.filter((item) => { if (item.serviceName.includes(search)) { return item } })}
                                    keyExtractor={data => data._id.toString()}
                                    ListEmptyComponent={() => {
                                        return (
                                            <View>
                                                <Text style={{ color: Colors.purple }}>No data found</Text>
                                            </View>
                                        );
                                    }}
                                    renderItem={({ item }) => (

                                        <View style={styles.flatView}>

                                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                                <View>
                                                    <Image source={{ uri: item.pic }} style={styles.img} />
                                                </View>
                                                <View style={{ marginLeft: moderateScale(10) }}>
                                                    <TouchableOpacity onPress={() => navigation.navigate('ServiceDetail', { item })}>
                                                        <Text style={{ fontSize: 18, color: 'black' }}>{item.serviceName}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={{ paddingRight: moderateScale(10) }}>
                                                <Ionicons name='chevron-forward' size={20}
                                                    onPress={() => navigation.navigate('ServiceDetail', { item })} />
                                            </View>
                                        </View>

                                    )}
                                />
                            </View>
                        </View>
                    }
                </ScrollView>
</View>)}
            

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    search: {
        marginBottom:moderateScale(20),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor:Colors.white,
        borderRadius:moderateScale(12),
        marginTop:moderateScale(20)
    },
    sView: {
        marginBottom: moderateScale(20),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderRadius: moderateScale(12),
        paddingHorizontal: moderateScale(5),
        marginTop:moderateScale(10)
    },
    searchb: {
        backgroundColor: Colors.purple,
        padding: moderateScale(5),
        borderRadius: moderateScale(12),
    },
    flatView: {
        flexDirection: 'row',
        marginBottom: moderateScale(10),
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: moderateScale(12),
        height: moderateScale(60),
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'space-between'
    },
    img: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(50),
        marginLeft: moderateScale(5)
    }

});

//make this component available to the app
export default ProviderServices;
