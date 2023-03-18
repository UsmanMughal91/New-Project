//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import Heading from '../../Components/Heading';
import { getToken } from '../../../services/AsyncStorage';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader'
import Font from '../../Styles/Font';
import SubHeading from '../../Components/SubHeading'
import BaseUrl from '../../baseUrl/BaseUrl';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
// create a component
const UserProfile = ({ navigation }) => {
    const [data, setdata] = useState();
    const [loading, setloading] = useState(true);
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
                .then((d) => { setdata(d.data); setloading(false) })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        (async () => {
            const token = await getToken() // getting token from storage
            loadprofile(token);
        })();
    }, [])
    return (
        <View style={{ flex: 1 }}>
            {loading ? (<Loader/>):(<View style={{flex:1}}>
                <Header text={"no"} onPress={() => navigation.goBack()} />
                <View style={styles.container}>
                    <ScrollView>
                        {loading && <Loader viewStyle={{ marginTop: 320 }} />}
                        {data && <View>
                            <Heading text={"My Profile"} />
                            <View style={{ alignItems: 'center', marginTop: moderateScale(10) }}>
                                <Image source={{ uri: data.pic }}
                                    style={styles.img} />
                                <Heading text={data.name} />
                                <SubHeading text={data.parlourName} viewStyle={{ alignItems: 'center' }} />
                            </View>
                            <SubHeading text={"About"} />
                            <Text style={styles.text}>{data.about ? data.about : "Please add more details in Edit Profile."}</Text>
                            <SubHeading text={"Address"} />
                            <Text style={styles.text}>{data.address}</Text>
                            <SubHeading text={"Contact"} />
                            <Text style={styles.text}>{data.phone}</Text>
                            <Text style={styles.text}>{data.email}</Text>

                        </View>}
                    </ScrollView>
                </View>
            </View>)}
           
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        margin:moderateScale(10)
    },
    viewStyle: {
        alignItems: 'flex-start'
    },
    img: {
        width: moderateScale(100),
        height: moderateScale(100),
        borderRadius: moderateScale(50),
        marginTop: moderateScale(10)
    },
    text:{
        fontSize: Font.text,
         marginTop: moderateScale(10),
        textAlign:'justify'
    }
    
});

//make this component available to the app
export default UserProfile;
