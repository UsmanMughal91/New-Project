//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Colors from '../Styles/Colors';
import Font from '../Styles/Font';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// create a component
const BtnComp = ({
    btnText,
    btnStyle,
    onPress,
    btnTextS,
    isDisable = false,
    disabled = false 
}) => {
    return (
        <View>
            <TouchableOpacity style={{...styles.btnStyle,
            backgroundColor: disabled? "grey" : Colors.purple ,...btnStyle}}
            // disabled={isDisable} 
            onPress={onPress}
            activeOpacity={0.6}
            disabled={disabled}
            >
                <Text style={{...styles.btnTextS,...btnTextS}}>{btnText}</Text>
            </TouchableOpacity>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    btnStyle: { 
        borderRadius: moderateScale(12),
      padding:moderateScale(5),
      alignItems:'center'
        
    },
    btnTextS:{
        color:Colors.white,
        fontSize:Font.subHeading,
        fontWeight: 'bold',    
    },
  
});

//make this component available to the app
export default BtnComp;
