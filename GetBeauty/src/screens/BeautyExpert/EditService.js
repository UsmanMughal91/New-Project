//import liraries
import React, { Component,useState } from 'react';
import { View, Text, StyleSheet,ScrollView,Image,TouchableOpacity } from 'react-native';
import Header from '../../Components/Header';
import Heading from '../../Components/Heading'
import { moderateScale } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import InputText from '../../Components/InputText';
import BtnComp from '../../Components/BtnComp';
import Font from '../../Styles/Font';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
// create a component
const EditService = ({route,navigation}) => {
    const data = route.params.item
    console.log('this is data', data)

    const [pic, setpic] = useState(null)
    const [serviceName, setServiceName] = useState("")
    const [servicePrice, setServicePrice] = useState("")
    const [serviceDetails, setServiceDetails] = useState("")

    const pickImage = () => {
        launchImageLibrary({ quality: 0.5 }, (fileobj) => {
            const uploadTask = storage().ref().child(`/service/${Math.floor((Math.random() * 1000000000) + 1)}`).putFile(fileobj.assets[0].uri)
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
    return (
        <View style={styles.container}>
            <View style={{flex:1}}>
                <Header onPress={() => navigation.goBack()} />
                <Heading text={"Edit Service"} textStyle={{ textAlign: "center" }} />
                <ScrollView style={{ margin: moderateScale(15) }}>
                    <TouchableOpacity onPress={pickImage}
                        style={styles.view}>
                        <Image source={pic ? { uri: pic } :
                            require('../../assests/images/upload1.png')}
                            resizeMode="center" style={styles.img} />
                    </TouchableOpacity>

                   

                    <InputText
                        lable={"Name"}
                        Icon={<MaterialIcons name="design-services" size={25} />}
                        placeholder={'Service Name'}
                        value={serviceName}
                        onChangeText={(val) => setServiceName(val)} />

                    <InputText
                        lable={"Price"}
                        Icon={<MaterialCommunityIcons name="currency-rupee" size={25} />}
                        placeholder={'Service Price'}
                        value={servicePrice}
                        onChangeText={(val) => setServicePrice(val)} />

                    <InputText
                        lable={"Detail"}
                        Icon={<MaterialCommunityIcons name="note" size={25} />}
                        placeholder={'Description'}
                        value={serviceDetails}
                        onChangeText={(val) => setServiceDetails(val)}
                        multiline={true}
                        viewstyle={{ alignItems: 'flex-start', paddingTop: moderateScale(10) }}
                        inputStyle={{ paddingTop: moderateScale(-10) }}
                    />

                </ScrollView>
            </View>
           <View style={{marginHorizontal:moderateScale(15),marginBottom:moderateScale(20)}}>
                <BtnComp btnText={"Update Service"}  />
           </View>
           
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
       justifyContent:'space-between'
    },
    img: {
        height: moderateScale(200),
        width: "100%",
        borderRadius: moderateScale(12),
        marginTop: moderateScale(20)
    },
});

//make this component available to the app
export default EditService;
