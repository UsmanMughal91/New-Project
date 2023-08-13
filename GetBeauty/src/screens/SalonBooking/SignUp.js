
//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BtnComp from '../../Components/BtnComp';
import Heading from '../../Components/Heading';
import InputText from '../../Components/InputText';
import Toast from 'react-native-toast-message';
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Font from '../../Styles/Font';
import Colors from '../../Styles/Colors';
import BaseUrl from '../../baseUrl/BaseUrl';
import CustomModal from '../../Components/CustomModal';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { toastConfig } from '../../Styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
// create a component
const SignUp = ({ navigation }) => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [address, setaddress] = useState("")
    const [password, setpassword] = useState("")
    const [password_confirmation, setpassword_confirmation] = useState("")
    const [pic, setpic] = useState(null)
    const [modalvisible, setmodalvisible] = useState(false)
    const [data, setdata] = useState("")
    const [show, setshow] = useState(false)
    const [visible, setvisible] = useState(false)
    const [show1, setshow1] = useState(false)
    const [visible1, setvisible1] = useState(false)
    const [fcmToken, setFcmToken] = useState()

  

  

    // useEffect(async()=>{
    //     console.log("USEEFFECT")
    //     let fcmToken = await AsyncStorage.getItem('fcmToken')
    //     console.log(fcmToken, "The old ")
       
    // },[])


    useEffect(() => {
        (async () => {
            console.log("USEEFFECT")
         let Token = await AsyncStorage.getItem('fcmToken')
            console.log(Token, "The old ")
         setFcmToken(Token)
        })();
    }, [])
    const pickImage = () => {
        launchImageLibrary({ quality: 0.5 }, (fileobj) => {
            const uploadTask = storage().ref().child(`/profile/${Math.floor((Math.random() * 1000000000) + 1)}`).putFile(fileobj.assets[0].uri)
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (progress === 100) {
                        console.log('image uploaded')
                    }
                },
                (error) => {
                    alert("error uploading image")
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setpic(downloadURL)
                    });
                }
            );
        })
    }
    const clearTextInput = () => {
        setname('')
        setemail('')
        setpassword('')
        setpassword_confirmation('')
    }
    const handleform = async () => {
        try {
            const option = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        name: `${name}`,
                        email: `${email}`,
                        password: `${password}`,
                        password_confirmation: `${password_confirmation}`,
                        phone: `${phone}`,
                        address: `${address}`,
                        pic: `${pic}`,
                        fcm_token: fcmToken
                    }
                )
            }
            await fetch(`${BaseUrl.SalonBaseurl}/register`, option)
                .then(res => res.json())
                .then(d => {
                    setdata(d)
                    if (d.status === "success") {
                        setmodalvisible(true)
                        clearTextInput()
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
    }
    return (
        <View style={{flex:1}}>
            <Heading text={"Signup"} />
            <Toast config={toastConfig} />
           
            <ScrollView style={{ margin:moderateScale(20)}}>
               
               
                <View>
                    <InputText
                        lable={"Name"}
                        Icon={<Ionicons name="person" size={25} />}
                        placeholder={"Enter Name"}
                        onChangeText={(val) => { setname(val) }}
                    />
                    <InputText
                        lable={"Phone"}
                        Icon={<MaterialCommunityIcons name="phone" size={25} />}
                        placeholder={"Enter Contact Number"}
                        onChangeText={(val) => { setphone(val) }}
                        keyboardType="phone-pad" />
                    <InputText
                        lable={"Address"}
                        Icon={<MaterialCommunityIcons name="home" size={25} />}
                        placeholder={"Enter Address"}
                        onChangeText={(val) => { setaddress(val) }}
                    />
                    <InputText
                        lable={"Email"}
                        Icon={<MaterialCommunityIcons name="email" size={25} />}
                        placeholder={"Enter Email"}
                        onChangeText={(val) => { setemail(val) }}
                        keyboardType="email-address" />

                    <InputText
                        lable={"Password"}
                        Icon={<MaterialCommunityIcons name="lock" size={25} />}
                        placeholder={"Enter Password"}
                        onChangeText={(val) => { setpassword(val) }}
                        secureTextEntry={visible}
                        Icons={<MaterialCommunityIcons name={show === false ? "eye-outline" : "eye-off-outline"} size={25} />}
                        onPress={
                            () => {
                                setvisible(!visible)
                                setshow(!show)

                            }}
                    />
                    <InputText
                        lable={"Confirm Password"}
                        Icon={<MaterialCommunityIcons name="lock" size={25} />}
                        placeholder={"Confirm Password"}
                        onChangeText={(val) => { setpassword_confirmation(val) }}
                        secureTextEntry={visible1}
                        Icons={<MaterialCommunityIcons name={show1 === false ? "eye-outline" : "eye-off-outline"} size={25} />}
                        onPress={
                            () => {
                                setvisible1(!visible1)
                                setshow1(!show1)
                            }}
                    />
                </View>

                <View style={{ alignItems: "center", marginTop: 30 }}>
                    <TouchableOpacity onPress={pickImage}>

                        <Image source={pic ? { uri: pic } :
                            require('../../assests/images/upload1.png')}
                            resizeMode="center" style={{ height: 140, width: 140, borderRadius: 50, backgroundColor: "white" }} />
                    </TouchableOpacity>
                    <Text style={{ paddingTop:moderateScale(10), fontWeight: 'bold', fontSize:Font.body }}>Add Pic</Text>
                </View>

                <BtnComp btnStyle={{marginTop:moderateVerticalScale(10)}}
                    btnText={'Create New Account'}
                    onPress={handleform}
                />
                <View style={styles.bottom}>
                    <Text style={{ color: Colors.black, fontSize: Font.body }}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                        <Text style={{ color: Colors.purple, fontSize: Font.body }}> Log In</Text>
                    </TouchableOpacity>
                </View>
                <CustomModal modalvisible={modalvisible} setmodalvisible={setmodalvisible} onPress={() => {
                    setmodalvisible(false);
                    navigation.navigate("Login")
                }} text={"You have Registerd successfully"} />
            </ScrollView>
        </View>

    );
};

// define your styles
const styles = StyleSheet.create({
 
    bottom: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:moderateVerticalScale(20),
        marginBottom:moderateVerticalScale(20)
    }
});

//make this component available to the app
export default SignUp;
