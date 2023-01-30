//import liraries
import React, { Children, Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, Image, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../Styles/Colors';
import Font from '../Styles/Font';
import BtnComp from './BtnComp';

const ModalPoup = ({ visible, children }) => {
    const [showModal, setshowModal] = useState(visible);
    useEffect(() => {
        toggleModal()
    }, [visible])
    const toggleModal = () => {
        if (visible) {
            setshowModal(true)
        } else {
            setshowModal(false)
        }
    }
    return (
        <Modal
            // animationType="slide"
            transparent visible={showModal}>
            <View style={styles.modalbackground}>
                <View style={[styles.modalContainer]}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}

// create a component
const CustomModal = ({ modalvisible, setmodalvisible, onPress, text }) => {
    console.log(modalvisible)
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ModalPoup visible={modalvisible}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={require("../assests/images/ok2.jpg")} style={styles.img} />
                </View>
                <Text style={styles.text}>{text}</Text>
                <View>
                    <BtnComp btnText={"OK"} onPress={onPress} />
                </View>
            </ModalPoup>

        </View>
    )
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalbackground: {
        flex: 1,
        backgroundColor: " rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: 'center'
    },
    modalContainer: {
        width: '80%',
        backgroundColor: Colors.white,
        paddingHorizontal: moderateScale(30),
        paddingVertical: moderateScale(30),
        borderRadius: moderateScale(20),
        elevation: 300,
    },
    header: {
        width: "100%",
        height: moderateScale(40),
        alignItems: 'flex-end'
    },
    img: {
        height: moderateScale(100),
        width: moderateScale(100),
        marginVertical: moderateScale(10)
    },
    text: {
        marginVertical: moderateScale(40),
        fontSize: Font.subHeading,
        textAlign: 'center',
        color: Colors.black
    }
});

//make this component available to the app
export default CustomModal;

