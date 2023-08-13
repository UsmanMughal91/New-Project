//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, TouchableOpacity, Pressable, FlatList } from 'react-native';
import BtnComp from '../../Components/BtnComp';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import Heading from '../../Components/Heading';
import Header from '../../Components/Header';
import BaseUrl from '../../baseUrl/BaseUrl';
import Colors from '../../Styles/Colors';
import { moderateScale, scale } from 'react-native-size-matters';
import SubHeading from '../../Components/SubHeading';
import Font from '../../Styles/Font';
import DropDownPicker from 'react-native-dropdown-picker';


// create a component
const Booking = ({ navigation, route }) => {
    const item = route.params.item
    const profile = route.params.profile

    const [time, settime] = useState()
    const [Data, setData] = useState()
    const [selected, setselected] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Cash', value: 'Cash' },
        { label: 'PayPal', value: 'PayPal' },

    ]);

    const [state, setState] = useState({
        data: [
            { id: 1, time: "8:00 am", isSelected: false },
            { id: 2, time: "9:00 am", isSelected: false },
            { id: 3, time: "10:00 am", isSelected: false },
            { id: 4, time: "11:00 am", isSelected: false },
            { id: 5, time: "12:00 pm", isSelected: false },
            { id: 6, time: "1:00 pm", isSelected: false },
            { id: 7, time: "2:00 pm", isSelected: false },
            { id: 8, time: "3:00 pm", isSelected: false },
            { id: 9, time: "4:00 pm", isSelected: false },
            { id: 10, time: "5:00 pm", isSelected: false },
            { id: 11, time: "6:00 pm", isSelected: false },
            { id: 12, time: "7:00 pm", isSelected: false },
            { id: 13, time: "8:00 pm", isSelected: false },
            { id: 14, time: "9:00 pm", isSelected: false },
            { id: 15, time: "10:00 pm", isSelected: false },
        ]
    });

    useEffect(() => {
        console.log(state)
    })

    const [date, setDate] = useState(new Date());
    // const [time, setTime] = useState(new Date());

    const onChange = (event, selectedDate) => {
        console.log("date:", selectedDate)
        setDate(selectedDate);
    };

    const onChange2 = (event, selectedTime) => {
        console.log("time:", selectedTime)

        setTime(selectedTime);

    };
    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: false,
           
        })
    };

    const showMode2 = (currentMode) => {
        DateTimePickerAndroid.open({
            value: time,
            onChange: onChange2,
            mode: currentMode,
            is24Hour: false,
        })
    };

    const showDatepicker = () => {
        showMode('date');
    
    };

    const showTimepicker = () => {
        showMode2('time');
    };

    handleTime = (id, type) => {
        const { data } = state
        let newArray = data.map((val, i) => {
            if (val.id === id) {
                console.log(val.time)
                settime(val.time)
                return { ...val, isSelected: type }
            } else {
                return val
            }
        })
        console.log("this is new array", newArray)
        setState({ data: newArray })
    }

    const { data } = state
    return (

        <View style={{ flex: 1 }}>
            <Header onPress={() => navigation.goBack()} />
            <View style={{ margin: moderateScale(20), justifyContent: 'space-between', flex: 1 }}>
                <View>
                    <Heading text={"Salon Appointment"} />
                    <SubHeading text={"Select Date"} />
                    <View style={[styles.LoginDesign, { justifyContent: 'space-between' }]}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ paddingLeft: moderateScale(10), textAlign: 'center' }}>{date.toString().slice(4, 15)}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={showDatepicker}>
                            <Ionicons name="ios-calendar-outline" size={20} style={{ marginRight: moderateScale(10) }}
                            />
                        </TouchableOpacity>
                    </View>

                    <SubHeading text={"Select Time"} viewStyle={{ marginTop: moderateScale(20) }} />


                    <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: 'space-between', marginTop: moderateScale(20) }}>
                        {
                            data.map((val, index) =>

                                <TouchableOpacity style={{ ...styles.status, backgroundColor: val.isSelected ? Colors.purple : '#ddd' }}
                                    onPress={() => handleTime(val.id, !val.isSelected)}
                                >

                                    <Text style={{ ...styles.statusT, color: val.isSelected ? Colors.white : 'grey' }}>{val.time}</Text>
                                </TouchableOpacity>)
                        }

                    </View>


                    <SubHeading text={"Payment"} viewStyle={{ marginTop: moderateScale(20) }} />
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        showTickIcon
                        listItemLabelStyle={{ fontSize: Font.body, color: "grey" }}
                        dropDownContainerStyle={styles.dropdown}
                        selectedItemContainerStyle={{ backgroundColor: "#eee" }}
                        placeholder={"Payment Method"}
                        textStyle={{ fontSize: Font.body, color: Colors.grey }}
                        style={{ borderColor: Colors.white, marginTop: moderateScale(20), elevation: moderateScale(10) }}
                    />
                </View>

                <View>


                    <BtnComp btnStyle={{ marginBottom: moderateScale(20) }}
                        btnText="Done"
                        onPress={() => navigation.navigate("ConfirmBooking", { item, time, date, value, profile })}
                    />

                </View>

            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        margin: moderateScale(20)
    },
    LoginDesign: {
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: moderateScale(12),
        paddingLeft: moderateScale(10),
        marginTop: moderateScale(20),
        padding: moderateScale(10),
        elevation: moderateScale(10)
    },
    dropdown: {
        borderColor: Colors.white,
        marginTop: moderateScale(20),
        borderBottomLeftRadius: moderateScale(20),
        borderBottomRightRadius: moderateScale(20)
    },
    status: {
        backgroundColor: Colors.purple,
        borderRadius: moderateScale(30),
        width: moderateScale(60),
        height: moderateScale(25),
        alignSelf: "center",
        marginTop: moderateScale(10),
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: 'row'
    },
    statusT: {
        textAlign: 'center',
        fontSize: scale(10),
        color: Colors.white
    }

});

//make this component available to the app
export default Booking;







{/* <View style={[styles.LoginDesign, { justifyContent: 'space-between' }]}>
                        <View style={{ flexDirection: 'row' }}><MaterialCommunityIcons name="clock-time-four-outline" size={20} />
                            <Text style={{ paddingLeft: moderateScale(10), }}>{time.toString().slice(16, 21)}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={showTimepicker}>
                            <Ionicons name="ios-calendar-outline" size={20} style={{ marginRight: moderateScale(10) }}
                            />
                        </TouchableOpacity>
                    </View> */}