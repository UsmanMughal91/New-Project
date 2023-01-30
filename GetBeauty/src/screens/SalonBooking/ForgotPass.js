//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import BtnComp from '../../Components/BtnComp';
import Heading from '../../Components/Heading';
import InputText from '../../Components/InputText';
import { toastConfig } from '../../Styles/styles';
import Toast from 'react-native-toast-message';
import Header from '../../Components/Header';
import BaseUrl from '../../baseUrl/BaseUrl';
// create a component
const ForgotPass = ({ navigation }) => {

    const [email, setemail] = useState(" ")
    const [data, setdata] = useState("")

    const clearTextInput = async () => {
        setemail('')
    }

    const handleform = async () => {
        if (email) {
            try {
                const option = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            email: `${email}`,

                        }
                    )
                }
              
                await fetch(`${BaseUrl.SalonBaseurl}/send-user-password-reset-email`,option)
                    .then(res => res.json())
                    .then(d =>{ setdata(d)
                        if (d.status === "success") {
                            // await storeToken(data.token)  // store token in storage 
                            // await clearTextInput()
                           
                            Toast.show({
                                type: 'Done',
                                position: 'top',
                                topOffset: 0,
                                text1:d.message
                            })
                            navigation.navigate("ResetPass")
                        } else {

                            Toast.show({
                                type: 'warning',
                                position: 'top',
                                topOffset: 0,
                                text1: d.message
                            })
                        }
                    })
                    .catch(err => console.log(err))
            } catch (error) {
                console.log(error)
            }
           
        } else {
            Toast.show({
                type: 'warning',
                position: 'top',
                topOffset: 0,
                text1: "Email is required"
            })
        }


    }


    return (
        <View >
            <Header onPress={()=>navigation.goBack()} />
            <Toast config={toastConfig} />
            <View style={styles.container}>
              
                <Heading text={"Forgot Password"} />
                <View style={{ marginTop: 30 }}>
                    <InputText placeholder={"Enter Email"}
                        onChangeText={setemail} />
                    <View style={{ marginTop: 30 }}>

                        <BtnComp btnText={"Send Code"} onPress={handleform} />
                    </View>

                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
});

//make this component available to the app
export default ForgotPass;
