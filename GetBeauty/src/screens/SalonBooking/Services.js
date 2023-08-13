
//import liraries
import React, { useEffect, useState ,useCallback} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, TextInput } from 'react-native';
import Heading from '../../Components/Heading';
import { getToken } from '../../../services/AsyncStorage';
import Colors from '../../Styles/Colors';
import Header from '../../Components/Header'
import BaseUrl from "../../baseUrl/BaseUrl"
import Loader from '../../Components/Loader';
import { moderateScale } from 'react-native-size-matters';
import Font from '../../Styles/Font';
import Ionicons from "react-native-vector-icons/Ionicons"
import { RefreshControl } from 'react-native';
// create a component
const Services = ({ navigation, route }) => {
    const [refreshing, setRefreshing] = useState(false);
    const id = route.params.id
    const profile = route.params.profile

    const [data, setdata] = useState();
    const [search, setSearch] = useState("");
    const [loading, setloading] = useState("true");

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        loadservices(id)
        setRefreshing(false);
    }, []);

    const loadservices = async (id) => {
        const option = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id: id
                }
            )
        }
        try {

            await fetch(`${BaseUrl.SalonBaseurl}/loadservices`, option)
                .then((res) => res.json())
                .then((d) => {
                    setdata(d.data);
                    setloading(false)
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadservices(id)
    }, [])
    return (
        <View style={{ flex: 1 }}>
            {loading ? (<Loader/>):(<View style={{flex:1}}>
                <Header onPress={() => navigation.goBack()} />
                <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                        progressViewOffset={50}
                        titleColor="#00ff00"
                        colors={['purple', 'black', 'black']}
                    />
                }

                >
                    <Heading text={"Services"} />
                    <View style={styles.container}>
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

                        {data && <FlatList
                            data={data.filter((item) => { if (item.serviceName.includes(search)) { return item } })}
                            keyExtractor={data => data._id}
                            ListEmptyComponent={() => {
                                return (
                                    <View>
                                        <Text style={{ color: Colors.purple, textAlign: 'center' }}>No Service found</Text>
                                    </View>
                                );
                            }}
                            renderItem={({ item }) => (
                                <View style={{ flex: 1 }}>
                                    <View style={styles.flatView}>
                                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                            <View>
                                                <Image source={{ uri: item.pic }} style={styles.img} />
                                            </View>
                                            <View style={{ marginLeft: moderateScale(10) }}>
                                                <TouchableOpacity onPress={() => navigation.navigate('ServiceDetail', { item, profile })}>
                                                    <Text style={{ fontSize: Font.body, color: Colors.black }}>{item.serviceName}</Text>
                                                </TouchableOpacity>

                                            </View>
                                        </View>
                                        <View style={{ paddingRight: moderateScale(10) }}>
                                            <Ionicons name='chevron-forward' size={20}
                                                onPress={() => navigation.navigate('ServiceDetail', { item, profile })} />
                                        </View>

                                    </View>

                                </View>)} />}
                    </View>
                </ScrollView>
            </View>)}
           
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        margin: moderateScale(20)
    },
    sView: {
        marginBottom: moderateScale(20),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderRadius: moderateScale(12),
        paddingHorizontal: moderateScale(5),
        elevation:moderateScale(10)
    },
    searchb: {
        backgroundColor: Colors.purple,
        padding: moderateScale(5),
        borderRadius: moderateScale(12),
    },
    flatView: {
        flexDirection: 'row',
        marginBottom:moderateScale(10),
        alignItems: 'center',
        backgroundColor:Colors.white,
        borderRadius:moderateScale(12),
        height:moderateScale(60),
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent:'space-between'
    },
    img:{
        width: moderateScale(40), 
        height: moderateScale(40), 
        borderRadius: moderateScale(50), 
        marginLeft: moderateScale(5) 
    }

});

//make this component available to the app
export default Services;
