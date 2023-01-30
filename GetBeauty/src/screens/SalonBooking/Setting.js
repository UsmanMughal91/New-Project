//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Heading from '../../Components/Heading';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { removeToken } from '../../../services/AsyncStorage';
import Header from '../../Components/Header';

// create a component
const Setting = ({navigation}) => {

    const logout =async()=>{
         await removeToken()
         navigation.navigate('RegisterOption')
    }
    return (
        <View>
            <Header onPress={() => navigation.goBack()} />
            <ScrollView> 
        <View style={styles.container}>
            <Heading text={"Settings"}/>
              <TouchableOpacity style={{marginBottom:20,marginTop:20}} onPress={()=>navigation.navigate('UserProfile')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "white", borderRadius: 12, height: 50 }}>
                    <View style={{ marginLeft: 10 }}>
                        <FontAwesome name='user' size={25} />
                    </View>
                    <View >
                        <Text style={{ fontSize: 20, marginLeft: 20 }}>Profile</Text>
                    </View>
                </View>
              </TouchableOpacity>

            <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => navigation.navigate('EditUserProfileC')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "white", borderRadius: 12, height: 50 }}>
                    <View style={{ marginLeft: 10 }}>
                        <FontAwesome name='edit' size={25} />
                    </View>
                    <View >
                        <Text style={{ fontSize: 20, marginLeft: 20 }}>Edit Profile</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => navigation.navigate('ChangePass')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "white", borderRadius: 12, height: 50 }}>
                    <View style={{ marginLeft: 10 }}>
                        <FontAwesome5 name='lock' size={25} />
                    </View>
                    <View >
                        <Text style={{ fontSize: 20, marginLeft: 20 }}>Change Password</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={logout}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "white", borderRadius: 12, height: 50 }}>
                    <View style={{ marginLeft: 10 }}>
                        <MaterialCommunityIcons name='logout' size={25} />
                    </View>
                    <View >
                        <Text style={{ fontSize: 20, marginLeft: 20 }}>Log out</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
});

//make this component available to the app
export default Setting;
