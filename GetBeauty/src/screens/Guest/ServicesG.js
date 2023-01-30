//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Button, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import DropDown from '../../Components/DropDown';
import Heading from '../../Components/Heading';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputText from '../../Components/InputText';
import SubHeading from "../../Components/SubHeading"
import BtnComp from '../../Components/BtnComp';
import AntDesign from 'react-native-vector-icons/AntDesign'
let fruits = [
    { id: 1, name: 'mango' },
    { id: 2, name: 'apple' },
    { id: 3, name: 'orange' },
    { id: 3, name: 'orange' },
    { id: 3, name: 'orange' },
    { id: 3, name: 'orange' },
    { id: 3, name: 'orange' },
    { id: 3, name: 'orange' },



]
// create a component
const ServicesG = ({ navigation }) => {

    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());

    const [timePicker, setTimePicker] = useState(false);
    const [time, setTime] = useState(new Date(Date.now()));
    const [show, setshow] = useState(false)
    const [show1, setshow1] = useState(false)
    function showDatePicker() {
        setDatePicker(true);
    };

    function showTimePicker() {
        setTimePicker(true);
    };

    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
    };

    function onTimeSelected(event, value) {
        setTime(value);
        setTimePicker(false);
    };













    const [selectedItem, setselectedItem] = useState(null)
    const onSelect = (item) => {
        setselectedItem(item)
    }
    const Data = [
        {
            id: 1,
            service: 'Hair Cut',
            pic: require('../../assests/images/b.jpg'),
            Pr: '500 pkr'
        },
        {

            id: 2,
            service: 'Urgent faical',
            pic: require('../../assests/images/b.jpg'),
            Pr: '700 pkr'
        },
        {

            id: 3,
            service: 'Party makeup',
            pic: require('../../assests/images/b.jpg'),
            Pr: '800 pkr'
        },
        {

            id: 4,
            service: 'Bridel',
            pic: require('../../assests/images/b.jpg'),
            Pr: '4500 pkr'
        },
        {

            id: 5,
            service: 'Hair color',
            pic: require('../../assests/images/b.jpg'),
            Pr: '1000 pkr'
        }
    ]



    const onBtn = () => {

        <View>
            <InputText placeholder={"Monday to thursday"} />
            <InputText placeholder={"08:00 am to 10:00 pm"} />
        </View>

    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={{ width: 40 }}>
                    <Ionicons name='md-chevron-back-circle-outline' size={40} color={'black'} onPress={() => navigation.goBack()} />
                </View>
              
                <SubHeading text={"Time schedule"} />
                   
                  
            
                <View>
                    <InputText placeholder={"Monday to thursday"} />
                    <InputText placeholder={"08:00 am to 10:00 pm"}
                         />
                </View>

                
                <View style={{backgroundColor:'white',marginTop:20,alignSelf:'center',borderRadius:12}}>
                    <AntDesign name={show === false ? 'plus' : "minus"} size={30}  onPress={() => setshow(!show)} />
                </View>


                {show && <View>
                    <InputText placeholder={"Monday to thursday"} />
                    <InputText placeholder={"08:00 am to 10:00 pm"}/>


                    <View style={{ backgroundColor: 'white', marginTop: 20, alignSelf: 'center', borderRadius: 12 }}>
                        <AntDesign name={show1 === false ? 'plus' : "minus"} size={30} onPress={() => setshow1(!show1)} />
                    </View>

                </View>}
               
                {show1 && <View>
                    <InputText placeholder={"Monday to thursday"} />
                    <InputText placeholder={"08:00 am to 10:00 pm"}
                       
                    />
                </View>}



                <Heading text={"Services"} />








                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                    <Text style={{ fontSize: 16, marginBottom: 10, color: 'red' }}>Please Register to get full access</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("registerOption")}>
                        <Text style={{ fontSize: 16, marginBottom: 10, color: 'orange' }}> Click Here</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={Data}
                    keyExtractor={Data => Data.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', marginBottom: 20, justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, height: 80 }}>
                                <View>
                                    <Image source={item.pic} style={{ width: 50, height: 50, borderRadius: 50, marginLeft: 5 }} />
                                </View>
                                <View style={{ width: 230 }}>
                                    <Text style={{ fontSize: 18 }}>{item.service}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: "bold", fontSize: 15, marginRight: 10 }}>{item.Pr}</Text>
                                </View>
                            </View>


                        </View>)} />
            </View>





        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    btn: {
        marginTop: 20,
    },
    MainContainer: {
        flex: 1,
        padding: 6,
        alignItems: 'center',
        backgroundColor: 'white'
    },

    text: {
        fontSize: 25,
        color: 'red',
        padding: 3,
        marginBottom: 10,
        textAlign: 'center'
    },

});

//make this component available to the app
export default ServicesG;
