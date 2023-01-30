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
// create a component
const OTP = ({ navigation,route }) => {
    
    const d = route.params.d
    console.log(d)
    const [otp, setotp] = useState(" ")
    const [data, setdata] = useState("")

    const clearTextInput = async () => {
        setemail('')
    }

    const handleform = async () => {
        if (otp == d.otp){
            navigation.navigate("OtpChangePass",{d})
        } else {
            Toast.show({
                type: 'warning',
                position: 'top',
                topOffset: 0,
                text1: "Wrong OTP"
            })
        
        } 
    }


    return (
        <View >
            <Header onPress={()=>navigation.goBack()} />
           
            <View style={styles.container}>
              
                <Heading text={"Forgot Password"} />
                <View style={{ marginTop: 30 }}>
                    <InputText placeholder={"Enter OTP"}
                        onChangeText={(val)=>{setotp(val)}} />
                    <View style={{ marginTop: 30 }}>

                        <BtnComp btnText={"Submit OTP"} onPress={handleform} />
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
export default OTP;
