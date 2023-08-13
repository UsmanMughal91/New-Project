
//import liraries
import React,{useCallback,useState} from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import BtnComp from '../../Components/BtnComp';
import Header from '../../Components/Header';
import SubHeading from '../../Components/SubHeading';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import Font from '../../Styles/Font';
import { RefreshControl } from 'react-native';
// create a component
const SeeProfile = ({ navigation, route }) => {

    const onRefresh = useCallback(async () => {
    
        setRefreshing(false);
    }, []);


    const [refreshing, setRefreshing] = useState(false);
    const profile = route.params.item
  
    const id = profile._id

    return (
        <View style={{ flex: 1 }}>
            <Header onPress={() => navigation.goBack()} />
            <ScrollView 

                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                        progressViewOffset={50}
                        titleColor="#00ff00"
                        colors={['purple', 'black', 'black']}
                    />
                }
            >
                {profile &&
                    <View style={styles.container}>
                        <View style={{ alignItems: 'center', marginTop: moderateScale(10) }}>
                            <Image source={{ uri: profile.pic }}
                                style={styles.img} />
                            <SubHeading text={profile.parlourName} />
                            <Text style={{ fontSize:Font.text, marginBottom:moderateScale(10)}}>{profile.name}</Text>
                            <BtnComp btnText={"Services"} onPress={() => navigation.navigate("Services", { id, profile })} />

                        </View>
                        <SubHeading text={"About"}/>
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
    text:{
        fontSize: Font.text,
         marginTop: moderateScale(10),
         textAlign:'justify'
    }
});

//make this component available to the app
export default SeeProfile;
