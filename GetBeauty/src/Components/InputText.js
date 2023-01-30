//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Colors from '../Styles/Colors';
import Font from '../Styles/Font';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
// create a component
const InputText = ({
    onChangeText,
    Icon,
    placeholder,
    secureTextEntry,
    keyboardType,
    Icons,
    onPress,
    value,
    multiline,
    inputStyle,
    lable,
    viewstyle
}) => {

    return (

        <View>
            <Text style={styles.lable}>{lable}</Text>

            <View style={{...styles.view,...viewstyle}}>

                {Icon}

                <TextInput placeholder={placeholder} style={{...styles.inputStyle,...inputStyle}}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    onPress={onPress}
                    value={value}
                    multiline={multiline}
                />
                <TouchableOpacity onPress={onPress}  >
                    {Icons}
                </TouchableOpacity>
            </View>


        </View>

    );
};

// define your styles
const styles = StyleSheet.create({
    inputStyle: {
        fontSize: Font.body,
        width:"85%"
    },
    view: {
        alignItems:'center',
        flexDirection: "row",
        backgroundColor: Colors.white,
        borderRadius: moderateScale(12),
        paddingHorizontal: moderateScale(10),
        marginBottom: moderateVerticalScale(10),
        elevation: 10
    },
    lable: {
        fontSize: Font.body,
        color: Colors.grey,
        fontWeight: "bold",
        margin: moderateVerticalScale(5),
    },
    

});

//make this component available to the app
export default InputText;
