//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../Styles/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Font from '../Styles/Font';

// create a component
const DropDown = ({
    dropDownData = [],
    value = {}, 
    onSelect = () => {}
}) => {
    const [showOption, setshowOption] = useState(false)
 
    const onSelectedItem = (val)=>{
        setshowOption(false)
        onSelect(val)
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            style={{ padding: 5, backgroundColor: Colors.white, borderRadius: 12,
                 justifyContent: "center", flexDirection: "row", justifyContent: "space-between"
                 }}
            onPress={()=> setshowOption(!showOption)}
            >

                <Text style={{ fontSize:Font.h1,color:Colors.black }}>{!value ? `Opening Days` : value.name}</Text>
                <MaterialIcons name='arrow-drop-down' size={30} style={{transform:[{rotate: showOption?"180deg":'0deg'}]}} />
            </TouchableOpacity>

                {showOption && <View style={{ borderRadius: 12, backgroundColor: Colors.grey, padding: 5, height: 150 }}>
                <ScrollView nestedScrollEnabled> 
                     {dropDownData.map((val, i) => {
                        return (
                            <TouchableOpacity key={String(i)} activeOpacity={0.6}
                                onPress={() => onSelectedItem(val)}
                                style={{
                                    padding: 5, backgroundColor: Colors.white,
                                    justifyContent: "center"
                                }}>
                                <Text style={{ fontSize: Font.h1 ,color:Colors.black}}>{val.name}</Text>
                            </TouchableOpacity>
                        )
                })}
                </ScrollView>
                </View>}

         
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
    },
});

//make this component available to the app
export default DropDown;
