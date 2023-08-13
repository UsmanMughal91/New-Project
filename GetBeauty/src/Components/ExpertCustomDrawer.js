import React, { useEffect, useState,useCallback } from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import Colors from '../Styles/Colors';
import Font from '../Styles/Font';
import { View, Text, Image, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getToken } from '../../services/AsyncStorage';
import BaseUrl from '../baseUrl/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale } from 'react-native-size-matters';
import { RefreshControl } from 'react-native';
const ExpertCustomDrawer = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const [data, setdata] = useState();

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        (async () => {
            const token = await getToken() // getting token from storage
            loadprofile(token);
        })();
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
            await fetch(`${BaseUrl.ExpertBaseurl}/loadprofile`, option)
                .then((res) => res.json())
                .then((d) => { setdata(d.data); console.log(d.data) })
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
    const { navigation } = props
    return (
<View style={{flex:1,justifyContent:'space-between'}}> 

        <DrawerContentScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                        progressViewOffset={50}
                        titleColor="#00ff00"
                        colors={['purple', 'black', 'black']}
                    />
                }
        {...props} >
           
                <View style={styles.view1} >
                    {data && <>
                        <Image source={{ uri: data.pic }}
                            style={styles.img} />
                        <Text style={styles.text}>Welcome!</Text>
                        <Text style={{ fontSize: Font.subHeading, color: Colors.purple, fontWeight: 'bold' }}>{data.name}</Text>
                    </>}

                </View>

                <View style={{ marginTop: moderateScale(20) }}>
                    <DrawerItem
                        inactiveBackgroundColor='#dfd4f1'
                        pressColor={Colors.purple}
                        label="Edit Profile"
                        onPress={() => navigation.navigate("EditProfile")}
                        labelStyle={styles.lable}
                        icon={() => <FontAwesome name='edit' size={25} />}
                    />
                    <DrawerItem
                        pressColor={Colors.purple}
                        inactiveBackgroundColor='#dfd4f1'
                        label="My Services"
                        onPress={() => navigation.navigate("ProviderServices")}
                        labelStyle={styles.lable}
                        icon={() => <FontAwesome name='scissors' size={25} />}
                    />
                    <DrawerItem
                        pressColor={Colors.purple}
                        inactiveBackgroundColor='#dfd4f1'
                        label="Add Services"
                        onPress={() => navigation.navigate("AddServices")}
                        labelStyle={styles.lable}
                        icon={() => <FontAwesome name='edit' size={25} />}
                    />
                    <DrawerItem
                        pressColor={Colors.purple}
                        inactiveBackgroundColor='#dfd4f1'
                        label="Change Password"
                        onPress={() => navigation.navigate("ChangePass")}
                        labelStyle={styles.lable}
                        icon={() => <MaterialCommunityIcons name='lock-outline' size={25} />}
                    />
                   
                    <DrawerItem
                        pressColor={Colors.purple}
                        inactiveBackgroundColor='#dfd4f1'
                        activeBackgroundColor='#dfd4f1'
                        label="Log Out"
                        onPress={() => { AsyncStorage.removeItem("token"); navigation.navigate("ViewScreen") }}
                        labelStyle={styles.lable}
                        icon={() => <MaterialCommunityIcons name='logout' size={25} />}
                    />
                </View>
        </DrawerContentScrollView>
            <View style={styles.foter}>
                <Text style={{ fontSize: Font.subHeading, fontWeight: "bold" }}>GetBeauty</Text>
            </View>
        </View>



    );
}

const styles = StyleSheet.create({
    view: {     
        flex: 1,
        justifyContent: 'space-between',
    },
    img: {
        borderRadius: moderateScale(50),
        height: moderateScale(100),
        width: moderateScale(100)
    },
    text: {
        fontSize: Font.text,
        color: "grey",
        fontWeight: 'bold'
    },
    lable: {
        fontSize: Font.body,
        marginLeft: moderateScale(-20)
    },
    foter: {
        backgroundColor: "#dfd4f1",
        alignItems: "center",
        height: moderateScale(40),
        justifyContent: 'center'
    },
    view1: {
        backgroundColor: '#dfd4f1',
        height: moderateScale(200),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateScale(-4)
    }
})
export default ExpertCustomDrawer