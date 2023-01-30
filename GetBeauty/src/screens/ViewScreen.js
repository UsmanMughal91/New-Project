//import liraries
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import BtnComp from '../Components/BtnComp';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Colors from '../Styles/Colors';

// create a component
const ViewScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../assests/images/front.jpg')}
                style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={styles.imgStyle}>
                    <View style={{ margin: moderateScale(10) }}>
                        <Text style={{ color:Colors.white, fontSize: scale(30), }}>Welcome to</Text>
                        <Text style={{ color: Colors.white, fontSize: scale(32), fontWeight: "bold" }}>GetBeauty App</Text>
                        <Text style={{ color: Colors.white, fontSize: scale(14), marginTop: 10 ,textAlign:'justify'}}>The smart and handy App to manage all the deals of Salons with their customers AnyTime,AnyWhere!</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-around",marginTop:moderateScale(10) }}>
                            <View style={{ width: "40%" }}>
                                <BtnComp btnText={"Guest"} onPress={() => navigation.navigate("GuestStack")} />
                            </View>
                            <View style={{ width: "40%" }} >
                                <BtnComp btnText={"Register"} onPress={() => navigation.navigate("RegisterOption")} />
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};
//make this component available to the app
const styles = StyleSheet.create({
    imgStyle: {
        margin: moderateScale(15),
        backgroundColor: Colors.black,
        borderRadius: moderateScale(20),
        opacity: 0.8 
    }
})
export default ViewScreen;
