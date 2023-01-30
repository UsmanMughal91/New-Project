//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Heading from '../../Components/Heading';
import InputText from '../../Components/InputText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import BtnComp from '../../Components/BtnComp';
import { toastConfig } from '../../Styles/styles';
import Toast from 'react-native-toast-message';
import Header from '../../Components/Header';

// create a component
const OtpChangePass = ({ navigation,route }) => {
    const token =route.params.d.token
    const [password, setpassword] = useState('')
    const [password_confirmation, setpassword_confirmation] = useState('')
    const [data, setdata] = useState('')
    const [show, setshow] = useState(false)
    const [visible, setvisible] = useState(true)
    const [show1, setshow1] = useState(false)
    const [visible1, setvisible1] = useState(true)


    const handleform = async () => {
        if (password && password_confirmation) {

            try {
                const option = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify(
                        {
                            password: `${password}`,
                            password_confirmation: `${password_confirmation}`,
                            token: token


                        }
                    )
                }
               
                await fetch(`${BaseUrl.ExpertBaseurl}/changUserPassword`, option)
                    .then(res => res.json())
                    .then(d => {
                        if (d.status === "success") {
                        Toast.show({
                            type: 'done',
                            position: 'top',
                            topOffset: 0,
                            text1: d.message

                        })
                        navigation.navigate('LoginExpert')
                        // await storeToken(data.token)  // store token in storage 
                        // navigation.navigate("SalonAppTabs")
                    } else {

                        Toast.show({
                            type: 'warning',
                            position: 'top',
                            topOffset: 0,
                            text1: d.message
                        })
                    }}
                        )
                    .catch(err => console.log(err))


            } catch (error) {
                console.log(error)
            }


        } else {
            Toast.show({
                type: 'warning',
                position: 'top',
                topOffset: 0,
                text1: "All fields are required"
            })
        }


    }
    return (
        <View>
            <Toast config={toastConfig} />
            <Header onPress={() => navigation.goBack()} />
            <View style={styles.container}>

                <Heading text={"Change Password"} />
                <View style={{ marginTop: 50, marginBottom: 50 }}>


                    <InputText Icon={<MaterialCommunityIcons name="lock" size={25} />}
                        placeholder={'New Password'}
                        secureTextEntry={visible}
                        onChangeText={setpassword}
                        Icons={<MaterialCommunityIcons name={show === false ? "eye-off-outline" : "eye-outline"} size={25}
                            onPress={
                                () => {
                                    setvisible(!visible)
                                    setshow(!show)

                                }} />} />

                    <InputText Icon={<MaterialCommunityIcons name="lock" size={25} />}
                        placeholder={'Confirm Password'}
                        secureTextEntry={visible1}
                        onChangeText={setpassword_confirmation}
                        Icons={<MaterialCommunityIcons name={show1 === false ? "eye-off-outline" : "eye-outline"} size={25}
                            onPress={
                                () => {
                                    setvisible1(!visible1)
                                    setshow1(!show1)

                                }} />} />
                </View>
                <BtnComp btnText={"Change Password"} onPress={handleform} />
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {

        margin: 20
    },

});

//make this component available to the app
export default OtpChangePass;
