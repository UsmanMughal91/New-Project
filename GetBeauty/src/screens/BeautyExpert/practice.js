import * as React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground, Alert } from 'react-native';
import {  launchImageLibrary } from 'react-native-image-picker';
import { ReactNativeFirebase } from '@react-native-firebase/app';

const Practice = () => {
    const [pic,setpic] = React.useState()
    const pickImage = () =>{
        launchImageLibrary({quality:0.5},(fileobj)=>{
            const uploadTask =storage().ref().child(`/profile/${Math.floor((Math.random() * 1000000000) + 1)}`).putFile(fileobj.assets[0].uri)
            uploadTask.on('state_changed',
                (snapshot) => {
                  
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(progress===100){
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
        <>
        <View style={{ alignItems: "center", marginTop: 30 }}>
                <TouchableOpacity onPress={pickImage}>
                    <Image source={pic ? {uri:pic} :
                    require('../../assests/images/upload.png')}
                        resizeMode="cover" style={{ height: 140, width: 140, borderRadius: 50, backgroundColor: "white" }} />
                </TouchableOpacity>
                <Text style={{ paddingTop: 10, fontWeight: 'bold', fontSize: 20 }}>Add Pic</Text>
            </View>
        </>

     );
}
 
export default Practice;




