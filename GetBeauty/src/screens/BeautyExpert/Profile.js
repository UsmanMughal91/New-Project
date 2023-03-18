//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Heading from '../../Components/Heading';
import { getToken } from '../../../services/AsyncStorage';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';
import SubHeading from '../../Components/SubHeading';
import Font from '../../Styles/Font';
import BaseUrl from '../../baseUrl/BaseUrl';
import { moderateScale } from 'react-native-size-matters';
// create a component
const Profile = ({ navigation }) => {
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

            await fetch(`${BaseUrl.ExpertBaseurl}/loadprofile`, option)
                .then((res) => res.json())
                .then((d) => { setdata(d.data);
                    console.log("this is data",data)
                    setloading(false) })
                
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
            {loading? (<Loader/>):(<View style={{flex:1}}>
                <Header text="no" onPress={() => navigation.goBack()} />

                <ScrollView style={styles.container}>
                  
                    {data && <View>
                        <Heading text={"My Profile"} />
                        <View style={{ alignItems: 'center', marginTop: moderateScale(10) }}>
                            <Image source={{ uri: data.pic }}
                                style={styles.img} />
                            <SubHeading text={data.parlourName} />
                            <Text style={{ fontSize: Font.text, marginBottom: moderateScale(10) }}>{data.name}</Text>

                        </View>
                        <SubHeading text={"About"} />
                        <Text style={styles.text}>{data.about ? data.about : "Please add more details in Edit Profile."}</Text>
                        <SubHeading text={"Opening Hours"} />
                        {data.daysX ?
                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                <Text style={styles.text}>{data.daysX}</Text>
                                <Text style={styles.text}>{data.timeX}</Text>
                            </View> : <Text>No time schedule found</Text>}
                        {data.daysY ?
                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                <Text style={styles.text}>{data.daysY}</Text>
                                <Text style={styles.text}>{data.timeY}</Text>
                            </View> : null}
                        {data.daysZ ?
                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                <Text style={styles.text}>{data.daysZ}</Text>
                                <Text style={styles.text}>{data.timeZ}</Text>
                            </View> : null}

                        <SubHeading text={"Address"} />
                        <Text style={styles.text}>{data.address}</Text>

                        <SubHeading text={"Contact"} />
                        <Text style={styles.text}>{data.phone}</Text>
                        <Text style={styles.text}>{data.email}</Text>
                    </View>}
                </ScrollView>
            </View>)}
          
           
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        margin:moderateScale(10)
    },
    text: {
        fontSize: Font.text,
        marginTop:moderateScale(10),
        textAlign: 'justify',
       
    },
    img:{
        width:moderateScale(100),
        height:moderateScale(100),
        borderRadius:moderateScale(50)
    }
});

//make this component available to the app
export default Profile;

