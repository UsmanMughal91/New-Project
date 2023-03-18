
//import liraries
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import BtnComp from '../../Components/BtnComp';
import Header from '../../Components/Header';
import SubHeading from '../../Components/SubHeading';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import Font from '../../Styles/Font';
import { toastConfig } from '../../Styles/styles';
import Toast from 'react-native-toast-message';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

// create a component
const ServicesG = ({ navigation, route }) => {
    const profile = route.params.item

    const id = profile._id

    const onclick=()=>{
        Toast.show({
            type: 'warning',
            position: 'top',
            topOffset: 0,
            text1:"Please Register for full access",
        })
    }
   
   

    return (
        <View style={{ flex: 1 }}>
            <Header onPress={() => navigation.goBack()} />
            <ScrollView>
                {profile &&
                    <View style={styles.container}>
                        <View style={{ alignItems: 'center', marginTop: moderateScale(10) }}>
                            <Image source={{ uri: profile.pic }}
                                style={styles.img} />
                            <SubHeading text={profile.parlourName} />
                            <Text style={{ fontSize: Font.text, marginBottom: moderateScale(10) }}>{profile.name}</Text>
                            <BtnComp btnText={"Services"} onPress={onclick} />

                        </View>
                        <SubHeading text={"About"} />
                        <Text style={styles.text}>{profile.about ? profile.about : "No more details"}</Text>
                        <SubHeading text={"Opening Hours"} />
                        {profile.daysX ? <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <Text style={styles.text}>{profile.daysX}</Text>
                            <Text style={styles.text}>{profile.timeX}</Text>
                        </View> : <Text>No time schedule found</Text>}
                        {profile.daysY ? <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <Text style={styles.text}>{profile.daysY}</Text>
                            <Text style={styles.text}>{profile.timeY}</Text>
                        </View> : null}
                        {profile.daysZ ? <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <Text style={styles.text}>{profile.daysZ}</Text>
                            <Text style={styles.text}>{profile.timeZ}</Text>
                        </View> : null}

                        <SubHeading text={"Address"} />
                        <Text style={styles.text}>{profile.address}</Text>
                        <SubHeading text={"Contact"} />
                        <Text style={styles.text}>{profile.phone}</Text>
                        <Text style={styles.text}>{profile.email}</Text>

                    </View>}
                <View style={styles.mapcontainer}>
              
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                        showUserLocation={true} >
                        <Marker coordinate={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                        }} />
                    </MapView>

                </View>
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        margin: moderateScale(20)
    },
    img: {
        width: moderateScale(100),
        height: moderateScale(100),
        borderRadius: moderateScale(50),
        marginTop: moderateScale(10)
    },
    text: {
        fontSize: Font.text,
        marginTop: moderateScale(10),
        textAlign: 'justify'
    },
    mapcontainer: {
    
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

//make this component available to the app
export default ServicesG;
