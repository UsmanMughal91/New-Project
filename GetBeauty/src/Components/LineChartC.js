//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Colors from '../Styles/Colors';
// create a component
const LineChartC = () => {
    return (
        <View>
          
            <LineChart
                data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                        }
                    ]
                }}
                width={Dimensions.get("window").width-40} // from react-native
                height={220}
                yAxisLabel="PKR"
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor:Colors.white,
                    backgroundGradientFrom: Colors.purple,
                    backgroundGradientTo: "skyblue",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `white`,
                    labelColor: (opacity = 1) => `white`,
                    style: {
                        borderRadius: 12
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: Colors.white
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 12
                }}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default LineChartC;
