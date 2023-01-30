//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, } from 'react-native';
//  import TextInput from '../Components/Textinput';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Heading from '../../Components/Heading';
import InputText from '../../Components/InputText';
import BtnComp from '../../Components/BtnComp';
import { toastConfig } from '../../Styles/styles';
import Toast from 'react-native-toast-message';
import { storeToken } from '../../../services/AsyncStorage';
import Colors from '../../Styles/Colors';
import Font from '../../Styles/Font';
import BaseUrl from '../../baseUrl/BaseUrl';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
// create a component
const LoginExpert = ({ navigation }) => {

    const [email, setemail] = useState("Sameer@gmail.com")
    const [password, setpassword] = useState("123")
    const [data, setdata] = useState("")
    const [show, setshow] = useState(false)
    const [visible, setvisible] = useState(false)

    const clearTextInput = async () => {
        setemail('')
        setpassword('')
    }

    const handleform = async () => {

        if (email && password) {
            if (password.length >2 ) {
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
                                password: `${password}`,
                            }
                        )
                    }

                    await fetch(`${BaseUrl.ExpertBaseurl}/login`, option)
                        .then(res => res.json())
                        .then(d => {
                            setdata(d);

                            if (d.status === "success") {
                                navigation.navigate("BeautyExpertStack")
                                storeToken(d.token)
                                clearTextInput()
                            }
                            else {
                                Toast.show({
                                    type: 'warning',
                                    position: 'top',
                                    topOffset: 0,
                                    text1: d.message,
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
                    text1: "Password must be grater than 6 characters",
                    position: 'absolute'
                })
            }
           

        } else {
            Toast.show({
                type: 'warning',
                position: 'top',
                topOffset: 0,
                text1: "All fields are Required",
                position: 'absolute'
            })
        }

    }

    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <Toast config={toastConfig} />
            <View style={styles.container}>
                <View style={{ alignSelf: 'center', paddingTop: moderateScale(70) }}>
                    <Image source={require('../../assests/images/logo2.png')} resizeMode={"center"} style={{ height: moderateScale(200) }} />
                </View>
                <Heading text={"Login"} />

                <View>
                    <InputText
                        lable={"Email"}
                        Icon={<MaterialCommunityIcons name="email" size={25} />}
                        placeholder={'Enter Email'}
                        onChangeText={setemail}
                    />
                    <InputText
                        lable={"Password"}
                        Icon={<MaterialCommunityIcons name="lock" size={25} />}
                        placeholder={'Enter Password'}
                        secureTextEntry={visible}
                        onChangeText={setpassword}
                        Icons={<MaterialCommunityIcons name={show === false ? "eye-outline" : "eye-off-outline"} size={25}
                            onPress={
                                () => {
                                    setvisible(!visible)
                                    setshow(!show)

                                }} />}
                        inputstyle={{ marginBottom: moderateScale(5) }}
                    />
                    <View style={{ alignSelf: "flex-end" }}>
                        <TouchableOpacity onPress={() => navigation.navigate("ForgotPass")}>

                            <Text style={{ fontSize: Font.body, color: Colors.purple }}>Forgot Password ?</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <BtnComp onPress={handleform} btnStyle={{ marginTop: moderateScale(30), }} btnText={"LOGIN"} />
            </View>

            <View style={styles.bottom}>
                <Text style={{ color: Colors.black, fontSize: Font.body }}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={{ color: Colors.purple, fontSize: Font.body }}> Sign up</Text>
                </TouchableOpacity>
            </View>



        </View>

    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        margin: moderateScale(20),
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: moderateVerticalScale(20)

    }
})


//make this component available to the app
export default LoginExpert;
