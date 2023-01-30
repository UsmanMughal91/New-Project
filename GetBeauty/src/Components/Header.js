//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../Styles/Colors';
import Font from '../Styles/Font';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../Styles/styles';
import { moderateScale } from 'react-native-size-matters';



// create a component 
const Header = ({ navigation, onPress, text }) => {

    return (
        <View style={styles.container}>
            {text === "no" ?

                <View style={{ alignSelf: 'center' }}>
                    <Text style={{ color: Colors.white, fontSize: Font.subHeading, fontWeight: 'bold' }}>GetBeauty</Text>
                </View>
                :
                <TouchableOpacity style={styles.btn}
                    onPress={onPress} >
                    <Ionicons name='chevron-back' size={20} color={Colors.white} onPress={onPress} />
                    <Text style={{ color: Colors.white, fontSize: Font.body }}>Back</Text>
                </TouchableOpacity>
            }
            <Toast config={toastConfig} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: moderateScale(50),
        backgroundColor: Colors.purple,
        justifyContent: 'center',
        borderBottomLeftRadius: moderateScale(20),
        borderBottomRightRadius: moderateScale(20)
    },
    btn: {
        flexDirection: 'row',
        alignItems: "center",
        marginLeft: moderateScale(10),
        width: moderateScale(40)
    }
});

//make this component available to the app
export default Header;
