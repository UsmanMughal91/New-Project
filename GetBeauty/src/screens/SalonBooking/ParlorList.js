//import liraries
import React, { useEffect, useState ,useCallback} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, ImageBackground, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SubHeading from '../../Components/SubHeading';
import Colors from '../../Styles/Colors';
import Font from '../../Styles/Font';
import BaseUrl from '../../baseUrl/BaseUrl';
import Loader from '../../Components/Loader';
import { getToken } from '../../../services/AsyncStorage';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { RefreshControl } from 'react-native';
// create a component
const ParlorList = ({ navigation,route }) => {
   
    
    const [refreshing, setRefreshing] = useState(false);
    const [data, setdata] = useState()
    const [loading, setloading] = useState(true)

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        // getUserData()
        getlist()
        setRefreshing(false);
    }, []);

    const loadprofile = async (token) => {
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

            await fetch(`${BaseUrl.SalonBaseurl}/loadprofile`, option)
                .then((res) => res.json())
                .then((d) => setdata(d))
        } catch (error) {
            console.log(error)
        }
    }

    const getlist = async () => {
        try {
            await fetch(`${BaseUrl.ExpertBaseurl}/getlist`)
                .then(res => res.json())
                .then(d => { setdata(d.data), setloading(false) })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }

    const getUserData = async () => {
        try {
            await fetch(`${BaseUrl.SalonBaseurl}/getlist`)
                .then(res => res.json())
                .then(d => { setdata(d.data), setloading(false) })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }

   
    useEffect(() => {
        (async () => {
            const token = await getToken() // getting token from storage
            setlocalToken(token);
            loadprofile(token);
        })();
        getlist()
        // getUserData()
     
        console.log('this is data',data)
    }, [])

    return (

        <View style={styles.container}>
        {loading ? (<Loader/>) : (<View style={{flex:1}}>
                <ImageBackground source={require('../../assests/images/beauty.jpg')}
                    style={{ width: "100%", height: moderateScale(220) }}>
                    <View style={styles.picView}>
                        <View style={styles.nav}>
                            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                                <FontAwesome name='navicon' size={20} color={Colors.black} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.viewblack}>
                            <Text style={{ fontSize: scale(27), color: Colors.white, fontWeight: 'bold', marginLeft: moderateScale(5) }}>Beauty Parlour</Text>
                            <Text style={{ fontSize: scale(12), color: Colors.white, marginBottom: moderateScale(10), marginLeft: moderateScale(5) }}>Beauty Parlour Booking App</Text>
                            <View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                <ScrollView nestedScrollEnabled
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                            progressViewOffset={50}
                            titleColor="#00ff00"
                            colors={['purple', 'black', 'black']}
                        />
                    }
                >
                    <SubHeading text={"Select Parlours"} viewStyle={{ marginLeft: moderateScale(20) }} textStyle={{ fontWeight: 'bold' }} />
                    <View style={{ margin: moderateScale(10) }}>
                        {loading && <Loader />}
                        {data && <FlatList
                            data={data}
                            keyExtractor={data => data._id}
                            renderItem={({ item }) => (
                                <View >
                                    <View >
                                        <View style={styles.flatlistview}>
                                            <TouchableOpacity >
                                                <Image source={{ uri: item.pic }}
                                                    style={styles.img}
                                                />
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <TouchableOpacity onPress={() => navigation.navigate('SeeProfile', { item })}
                                                    style={{ marginLeft: moderateScale(10), width: "80%" }}>
                                                    <Text style={{ color: Colors.black, fontSize: Font.list, fontWeight: '500' }}>{item.parlourName}</Text>
                                                    <Text style={{ fontSize: Font.text }}>{item.name}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )} />}
                    </View>
                </ScrollView>
        </View>)}
            
        </View>
    );
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
        borderRadius: moderateScale(12),
        backgroundColor: Colors.black,
        opacity: 0.8,
        marginBottom: moderateScale(10),
        justifyContent: "center"
    },
    flatlistview: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        margin: moderateScale(10)
    },
    img: {
        borderRadius: moderateScale(40),
        width: moderateScale(50),
        height: moderateScale(50)
    }
});

//make this component available to the app
export default ParlorList;