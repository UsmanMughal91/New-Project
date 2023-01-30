import React from 'react';
import { View, Text, StyleSheet } from "react-native"
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Colors from './Colors';
import Font from './Font';


const toastConfig = {
    warning: ({ text1, props }) => (

        <View style={styles.warning}>
            <Text style={styles.text}>{text1}</Text>
        </View>

    ),
    Done: ({ text1, props }) => (
        <View style={styles.done}>
            <View style={styles.text}>
                <Text style={{ fontSize: 18, textAlign: 'center', color: "white", fontWeight: 'bold' }}>{text1}</Text>
            </View>
        </View>
    ),
}

const styles = StyleSheet.create({
    warning: {
        flex: 1,
        backgroundColor: "#ff4d4d",
        width: '100%',
        borderBottomLeftRadius: moderateScale(20),
        borderBottomRightRadius: moderateScale(20),
        padding:moderateScale(15),
    },
    text: {
        fontSize: Font.body,
        textAlign: 'center',
        color: Colors.white,
        fontWeight: 'bold'
    },
    done: {
        flex: 1,
        backgroundColor:Colors.green,
        width: '100%',
        borderBottomLeftRadius: moderateScale(20),
        borderBottomRightRadius: moderateScale(20),
        padding: moderateScale(15)
    }
})

export { toastConfig }