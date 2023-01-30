//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Heading from '../../Components/Heading';
import InputText from '../../Components/InputText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BtnComp from '../../Components/BtnComp';
import { toastConfig } from '../../Styles/styles';
import Toast from 'react-native-toast-message';
import { getToken } from '../../../services/AsyncStorage';
import Header from '../../Components/Header';
import BaseUrl from '../../baseUrl/BaseUrl';
import CustomModal from '../../Components/CustomModal';
import { moderateScale } from 'react-native-size-matters';
// create a component
const ChangePass = ({ navigation }) => {

    const [password, setpassword] = useState('')
    const [password_confirmation, setpassword_confirmation] = useState('')
    const [data, setdata] = useState('')
    const [localToken, setlocalToken] = useState()
    const [show, setshow] = useState(false)
    const [visible, setvisible] = useState(true)
    const [show1, setshow1] = useState(false)
    const [visible1, setvisible1] = useState(true)
    const [modalvisible, setmodalvisible] = useState(false)

    useEffect(() => {
        (   async () => {
                const token = await getToken() // getting token from storage

                setlocalToken(token) // store token in local state
            })();
    })
    const clearTextInput = async () => {
        setpassword('')
        setpassword_confirmation('')
    }
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
                            token: localToken


                        }
                    )
                }
           
                await fetch(`${BaseUrl.ExpertBaseurl}/changUserPassword`, option)
                    .then(res => res.json())
                    .then(data => setdata(data))
                    .catch(err => console.log(err))


                if (data.status === "success") {
                    setmodalvisible(true)
                    await clearTextInput()
                } else {

                    Toast.show({
                        type: 'warning',
                        position: 'top',
                        topOffset: 0,
                        text1: data.message
                    })
                }
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
            <View style={{ marginTop:moderateScale(50), marginBottom:moderateScale(50) }}>
                <InputText 
                lable={"New Password"}
                Icon={<MaterialCommunityIcons name="lock" size={25} />}
                    placeholder={'New Password'}
                    secureTextEntry={visible}
                    onChangeText={setpassword}
                    Icons={<MaterialCommunityIcons name={show === false ? "eye-outline" : "eye-off-outline"} size={25}
                        onPress={
                            () => {
                                setvisible(!visible)
                                setshow(!show)

                            }} />} />

                <InputText
                        lable={"Confirm Password"}
                 Icon={<MaterialCommunityIcons name="lock" size={25} />}
                    placeholder={'Confirm Password'}
                    secureTextEntry={visible1}
                    onChangeText={setpassword_confirmation}
                    Icons={<MaterialCommunityIcons name={show1 === false ? "eye-outline" : "eye-off-outline"} size={25}
                        onPress={
                            () => {
                                setvisible1(!visible1)
                                setshow1(!show1)

                            }} />} />
            </View>
            <BtnComp btnText={"Change Password"} onPress={handleform} />
            </View>
            <CustomModal modalvisible={modalvisible} setmodalvisible={setmodalvisible} onPress={() => {
                setmodalvisible(false);
                navigation.goBack()
            }} text={"Password changed Successfully"} />
       
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
export default ChangePass;
