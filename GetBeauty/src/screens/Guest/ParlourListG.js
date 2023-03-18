//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, ImageBackground, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Heading from '../../Components/Heading';
import Colors from '../../Styles/Colors';
import Font from '../../Styles/Font';
import BaseUrl from '../../baseUrl/BaseUrl';
import Loader from '../../Components/Loader';
import { getToken } from '../../../services/AsyncStorage';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
// create a component
const ParlorListG = ({ navigation }) => {
    const [data, setdata] = useState()
    const [loading, setloading] = useState(true)
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
    useEffect(() => {
        getlist()
        console.log(data)
    }, [])

    return (

        <View style={styles.container}>
            {loading ? (<Loader/>) : (
                <View> 
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

            <ScrollView nestedScrollEnabled>
                <Heading text={"Choose Parlour"} viewStyle={{ alignItems: 'center' }} />
                <View style={{ margin: moderateScale(10) }}>

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
                                            <TouchableOpacity onPress={() => navigation.navigate('ServicesG', { item })}
                                                style={{ marginLeft: moderateScale(10), width: "80%" }}>
                                                <Text style={{ color: Colors.black, fontSize: Font.list,fontWeight:'600'}}>{item.parlourName}</Text>
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

                </View>
            ) }


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
export default ParlorListG;
