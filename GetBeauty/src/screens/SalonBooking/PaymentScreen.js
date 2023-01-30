//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Modal, } from 'react-native';
import BtnComp from '../../Components/BtnComp';
import PayPalApi from '../../../services/PayPalApi';
import WebView from "react-native-webview"
import queryString from 'query-string'
// create a component
const PaymentScreen = () => {

    const [paypalUrl, setpaypalUrl] = useState(null)
    const [accessToken, setaccessToken] = useState(null)

    const onUrlChange = (webviewstate) => {
        console.log("webviewstate", webviewstate)
        if (webviewstate.url.includes('https://example.com/cancel')){
            clearPayPalState()
            alert("Closed webview")
            return;
        }
        if (webviewstate.url.includes('https://example.com/return')){
            const urlValues = queryString.parseUrl(webviewstate.url)
            console.log("my urlValue",urlValues)
            const {token} = urlValues.query
            if(!!token){
                paymentSuccess(token)
            }
        }
    }
    const paymentSuccess = async(id) =>{
        try {
            const res = await PayPalApi.capturePayment(id,accessToken)
            console.log(" capture payment response " , res)
            alert("payment successfully")
            clearPayPalState()
        } catch (error) {
            console.log('error raised in payment capture',error)
        }
    }

    const clearPayPalState = () => {
        setpaypalUrl(null)
        setaccessToken(null)
    }
  
    const paypal = async () => {
        try {
            const token = await PayPalApi.generateToken()
            const res = await PayPalApi.createOrder(token)
            setaccessToken(token)
            console.log("response ",res)
            if (!!res?.links) {
                const findUrl = res.links.find(data => data?.rel == 'approve')
                console.log("findUrl",findUrl)
                setpaypalUrl(findUrl.href)
            }
        } catch (error) {
            console.log("error raised", error)
        }
    }

    console.log('paypalurl', paypalUrl)

    return (
        <View style={styles.container}>
          

            <BtnComp btnText={"PayPal"} onPress={paypal} btnStyle={{marginTop:30}} />
            <Modal
                visible={!!paypalUrl} >

                <View style={{ flex: 1 }}>
                    <WebView
                        source={{ uri: paypalUrl }}
                        onNavigationStateChange={onUrlChange} />

                </View>


            </Modal>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
       
    },
});

//make this component available to the app
export default PaymentScreen;
