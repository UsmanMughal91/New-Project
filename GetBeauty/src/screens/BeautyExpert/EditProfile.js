//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BtnComp from '../../Components/BtnComp';
import Heading from '../../Components/Heading';
import InputText from '../../Components/InputText';
import Toast from 'react-native-toast-message';
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getToken } from '../../../services/AsyncStorage';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';
import SubHeading from '../../Components/SubHeading';
import AntDesign from 'react-native-vector-icons/AntDesign'
import BaseUrl from '../../baseUrl/BaseUrl';
import CustomModal from '../../Components/CustomModal';
import { moderateScale } from 'react-native-size-matters';
import Font from '../../Styles/Font';

// create a component
const EditProfile = ({ navigation }) => {
    const [name, setname] = useState("")
    const [phone, setphone] = useState("")
    const [address, setaddress] = useState("")
    const [parlourName, setparlourName] = useState("")
    const [pic, setpic] = useState(null)
    const [about, setabout] = useState("")
    const [localToken, setlocalToken] = useState("")
    const [loading, setloading] = useState(true)
    const [show, setshow] = useState(false)
    const [show1, setshow1] = useState(false)
    const [daysX, setDaysX] = useState("")
    const [daysY, setDaysY] = useState("")
    const [daysZ, setDaysZ] = useState("")
    const [timeX, setTimeX] = useState("")
    const [timeY, setTimeY] = useState("")
    const [timeZ, setTimeZ] = useState("")
    const [modalvisible, setmodalvisible] = useState(false)
    
    const pickImage = () => {
        launchImageLibrary({ quality: 0.5 }, (fileobj) => {
            const uploadTask = storage().ref().child(`/expertprofile/${Date.now()}`).putFile(fileobj.assets[0].uri)
            uploadTask.on('state_changed',
                (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (progress === 100) {
                        Toast.show({
                            type: 'Done',
                            position: 'top',
                            topOffset: 0,
                            text1: "Image uploaded successfully"
                        })
                    }

                },
                (error) => {
                    alert("error uploading image")
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setpic(downloadURL)
                    });
                }
            );

        })
    }
   
    const [data, setdata] = useState()
    const clearTextInput = () => {
        setname('')
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
                        token: `${localToken}`,
                        name: `${name}`,
                        phone: `${phone}`,
                        address: `${address}`,
                        parlourName: `${parlourName}`,
                        pic: `${pic}`,
                        about: `${about}`,
                        daysX: `${daysX}`,
                        daysY: `${daysY}`,
                        daysZ: `${daysZ}`,
                        timeX: `${timeX}`,
                        timeY: `${timeY}`,
                        timeZ: `${timeZ}`,
                    }
                )
            }         
            await fetch(`${BaseUrl.ExpertBaseurl}/updateProfile`, option)
                .then(res => res.json())
                .then((d) => {
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
                .then((d) => {
                    setname(d.data.name)
                    setparlourName(d.data.parlourName)
                    setaddress(d.data.address)
                    setpic(d.data.pic)
                    setabout(d.data.about)
                    setphone(d.data.phone)
                    setDaysX(d.data.daysX)
                    setDaysY(d.data.daysY)
                    setDaysZ(d.data.daysZ)
                    setTimeX(d.data.timeX)
                    setTimeY(d.data.timeY)
                    setTimeZ(d.data.timeZ)
                    setdata(d.data)
                        ; setloading(false)
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        (async () => {
            const token = await getToken() // getting token from storage
            setlocalToken(token);
            loadprofile(token);
        })();
    }, [])
    return (
        <View style={{ flex: 1 }}>
    
            <Header onPress={() => navigation.goBack()} />
            <ScrollView>
                {loading && <Loader viewStyle={{ marginTop: 320 }} />}
                {data && <View style={{ flex: 1, margin: 20 }}>
                   
                    <Heading text={"Edit Profile"} />

                    <View style={{ marginTop:moderateScale(10)}}>
                        <InputText
                        lable={"Name"}
                         Icon={<Ionicons name="person" size={25} />}
                            placeholder={"Enter Name"}
                            value={name}
                            onChangeText={(val) =>{ setname(val)}}
                            Icons={<FontAwesome5 name="pencil-alt" size={20} />}
                        />

                        <InputText 
                            lable={"Parlour Name"}
                        Icon={<FontAwesome5 name="store" size={20} />}
                            placeholder={"Parlour Name"}
                            onChangeText={(val) => setparlourName(val)}
                            keyboardType="email-address"
                            value={parlourName}
                            Icons={<FontAwesome5 name="pencil-alt" size={20} />}
                        />

                        <InputText
                            lable={"Contact Number"} 
                        Icon={<MaterialCommunityIcons name="phone" size={25} />}
                            placeholder={"Phone"}
                            onChangeText={(val) => setphone(val)}
                            keyboardType="phone-pad"
                            value={phone}
                            Icons={<FontAwesome5 name="pencil-alt" size={20} />}
                        />


                        <InputText 
                            lable={"Address"}
                        Icon={<MaterialCommunityIcons name="home" size={25} />}
                            placeholder={"Address"}
                            onChangeText={(val) => setaddress(val)}
                            value={address}
                            Icons={<FontAwesome5 name="pencil-alt" size={20} />}
                        />
                        <InputText 
                            lable={"About"}
                        Icon={<MaterialCommunityIcons name="note" size={25} />}
                            placeholder={"about"}
                            onChangeText={(val) => setabout(val)}
                             value={about}
                            Icons={<FontAwesome5 name="pencil-alt" size={20} />}
                            multiline={true}
                            viewstyle={{ alignItems: 'flex-start', paddingTop: moderateScale(10) }}
                            inputStyle={{ paddingTop: moderateScale(-10) }}
                        />
                        <SubHeading text={"Time schedule"} />
                        <View>
                            <InputText 
                                lable={"Days"}
                                placeholder={"Monday to thursday"}
                                Icons={<FontAwesome5 name="pencil-alt" size={20} />} 
                                onChangeText={(val)=>{setDaysX(val)}}
                                value = {daysX}
                                />
                            <InputText
                                lable={"Timing"}
                            placeholder={"08:00 am to 10:00 pm"}
                                Icons={<FontAwesome5 name="pencil-alt" size={20} />}
                                onChangeText={(val)=>{setTimeX(val)}}
                                value = {timeX}
                            />
                        </View>
                        <View style={{ backgroundColor: 'white', marginTop: 20, alignSelf: 'center', borderRadius: 12 }}>
                            <AntDesign name={show === false ? 'plus' : "minus"} size={30} onPress={() => setshow(!show)} />
                        </View>
                        {show && <View>
                            <InputText
                                lable={"Days"}
                             placeholder={"Monday to thursday"}
                                Icons={<FontAwesome5 name="pencil-alt" size={20} />} 
                                onChangeText={(val)=>{setDaysY(val)}}
                                value = {daysY}
                                />
                            <InputText
                                lable={"Timing"}
                            placeholder={"08:00 am to 10:00 pm"}
                                Icons={<FontAwesome5 name="pencil-alt" size={20} />} 
                                onChangeText={(val)=>{setTimeY(val)}}
                                value = {timeY}/>
                            <View style={{ backgroundColor: 'white', marginTop: 20, alignSelf: 'center', borderRadius: 12 }}>
                                <AntDesign name={show1 === false ? 'plus' : "minus"} size={30} onPress={() => setshow1(!show1)} />
                            </View>
                        </View>}

                        {show1 && <View>
                            <InputText 
                                lable={"Days"}
                            placeholder={"Monday to thursday"}
                                Icons={<FontAwesome5 name="pencil-alt" size={20} />} 
                                onChangeText={(val)=>{setDaysZ(val)}}
                                value = {daysZ}
                                />
                            <InputText
                                lable={"Timing"}
                             placeholder={"08:00 am to 10:00 pm"}
                                Icons={<FontAwesome5 name="pencil-alt" size={20} />} 
                                onChangeText={(val)=>{setTimeZ(val)}}
                                value = {timeZ}/>
                        </View>}


                    </View>

                    <View style={{ alignItems: "center", marginTop:moderateScale(20) }}>
                        <TouchableOpacity onPress={pickImage}>
                            <Image source={{ uri: pic }}
                                resizeMode="cover" style={styles.img} />
                        </TouchableOpacity>
                        <Text style={{ paddingTop:moderateScale(10), fontWeight: 'bold', fontSize:Font.body }}>Add Pic</Text>
                    </View>
                    <BtnComp btnStyle={{marginTop:moderateScale(30)}}
                        btnText={'Update Profile'}
                        onPress={handleform}
                    />
                    <View>         
                    </View>
                </View>
                }
                <CustomModal modalvisible={modalvisible} setmodalvisible={setmodalvisible} onPress={() => {
                    setmodalvisible(false);
                    navigation.navigate("Profile")
                }} text={"Profile update Successfully"} />
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
img:{
    height:moderateScale(100),
    width:moderateScale(100),
    borderRadius:moderateScale(50)
}
});

//make this component available to the app
export default EditProfile;
