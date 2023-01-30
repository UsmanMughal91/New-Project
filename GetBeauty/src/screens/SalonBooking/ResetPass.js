//import liraries
import React, { Component ,useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../Components/Header';
import Heading from '../../Components/Heading';
import InputText from '../../Components/InputText';
import BtnComp from '../../Components/BtnComp';
import { toastConfig } from '../../Styles/styles';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// create a component
const ResetPass = ({ navigation }) => {

    const [password, setpassword] = useState('')
    const [password_confirmation, setpassword_confirmation] = useState('')
    const [data, setdata] = useState('')
    const [localToken, setlocalToken] = useState()
    const [show, setshow] = useState(false)
    const [visible, setvisible] = useState(true)
    const [show1, setshow1] = useState(false)
    const [visible1, setvisible1] = useState(true)

    return (
        <View >
            <Header onPress={() => navigation.goBack()} />
            <Toast config={toastConfig} />
            <View style={styles.container}>


                <Heading text={"Reset Password"} />
                <View style={{ marginTop: 50, marginBottom: 50 }}>


                    <InputText Icon={<MaterialCommunityIcons name="lock" size={25} />}
                        placeholder={'New Password'}
                        secureTextEntry={visible}
                        onChangeText={setpassword}
                        Icons={<MaterialCommunityIcons name={show === false ? "eye-off-outline" : "eye-outline"} size={25}
                            onPress={
                                () => {
                                    setvisible(!visible)
                                    setshow(!show)

                                }} />} />

                    <InputText Icon={<MaterialCommunityIcons name="lock" size={25} />}
                        placeholder={'Confirm Password'}
                        secureTextEntry={visible1}
                        onChangeText={setpassword_confirmation}
                        Icons={<MaterialCommunityIcons name={show1 === false ? "eye-off-outline" : "eye-outline"} size={25}
                            onPress={
                                () => {
                                    setvisible1(!visible1)
                                    setshow1(!show1)

                                }} />} />
                </View>
                <BtnComp btnText={"Reset"} />

            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
       margin:20
    },
});

//make this component available to the app
export default ResetPass;
