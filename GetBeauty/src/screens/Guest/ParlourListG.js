
// //import liraries
// import React, { Component } from 'react';
// import { View, Text, StyleSheet,FlatList,TouchableOpacity,Image } from 'react-native';

// // create a component
// class ParlourListG extends Component {
//     state={
//         data:[
//             {
//                 id: 1,
//                 PName: "New Beauty Parlour",
//                 name: 'Ayesha',
//                 images: require('../../assests/images/a.jpg'),
//             },
//             {
//                 id: 2,
//                 PName: "Shine Beauty Salon",
//                 name: 'Zoya',
//                 images: require('../../assests/images/b.jpg'),
//             },
//             {
//                 id: 3,
//                 PName: "Star Salon",
//                 name: 'Sana',
//                 images: require('../../assests/images/c.jpg'),
//             },
//             {
//                 id: 4,
//                 PName: "Child Beauty Parlour",
//                 name: 'Mehak ',
//                 images: require('../../assests/images/d.jpg'),
//             },
//             {
//                 id: 5,
//                 PName: "New Beauty Parlour",
//                 name: 'Ayesha',
//                 images: require('../../assests/images/a.jpg'),
//             },
//             {
//                 id: 6,
//                 PName: "Shine Beauty Salon",
//                 name: 'Zoya',
//                 images: require('../../assests/images/b.jpg'),
//             },
//             {
//                 id: 7,
//                 PName: "Star Salon",
//                 name: 'Sana',
//                 images: require('../../assests/images/c.jpg'),
//             },
//             {
//                 id: 8,
//                 PName: "Child Beauty Parlour",
//                 name: 'Mehak ',
//                 images: require('../../assests/images/d.jpg'),
//             }
//         ]
//     }
//     onDelete = (id)=>{
//         const { data } = this.state
//         const filterArray=data.filter((item,i)=>{
// if(item.id !== id ){
//    return item
// }
//         })
//         console.log(filterArray)
//         this.setState({data:filterArray})

//     }
//     renderItem = ({item}) =>{
// return(
//     <View style={{ flex: 1, }}>
//         <TouchableOpacity onPress={() => navigation.navigate('ServicesG')}>
//             <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 15 }}>
//                 <View>
//                     <Image source={item.images}
//                         style={{ borderRadius: 40, width: 50, height: 50 }}
//                     />
//                 </View>

//                 <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
//                     <View style={{ marginLeft: 10, width: "69%" }}>
//                         <Text style={{ color: 'black', fontSize: 20 }}>{item.PName}</Text>
//                         <Text>{item.name}</Text>
//                     </View>

//                 </View>

//                 <View>
//                     <TouchableOpacity onPress={()=>this.onDelete(item.id)}
//                      style={{backgroundColor:'lightpink',padding:5,borderRadius:20}}>
//                         <Text >Delete</Text>
//                     </TouchableOpacity>

//                 </View>
//             </View>
//         </TouchableOpacity>
//     </View>
// )
//     }




//     render() {
//         const {data} = this.state
//         return (
//             <View style={styles.container}>
//                 <FlatList 
//                 data={data}
//                 renderItem={this.renderItem}
//                 keyExtractor={(item)=>item.id}
//                 />
//             </View>
//         );
//     }
// }

// // define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         margin:20
//     },
// });

// //make this component available to the app
// export default ParlourListG;


//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

// create a component
const ParlourListG = () => {
//   const [state,setState] = useState({data:[]})
    const [state, setState] = useState({
        data: [{
            id: 1,
            PName: "New Beauty Parlour",
            name: 'Ayesha',
            images: require('../../assests/images/a.jpg'),
        },
            {
                id: 2,
                PName: "Shine Beauty Salon",
                name: 'Zoya',
                images: require('../../assests/images/b.jpg'),
            },
            {
                id: 3,
                PName: "Star Salon",
                name: 'Sana',
                images: require('../../assests/images/c.jpg'),
            },
            {
                id: 4,
                PName: "Child Beauty Parlour",
                name: 'Mehak ',
                images: require('../../assests/images/d.jpg'),
            },] });

    let onDelete = (id) => {
        const { data } = state
        const newArray = data.filter((item, i) => {
            if (item.id !== id) {
                return item
            }
        })
        console.log(newArray)
        setState({ data: newArray })

    }

    // state = {
    //     data: [
    //         {
    //             id: 1,
    //             PName: "New Beauty Parlour",
    //             name: 'Ayesha',
    //             images: require('../../assests/images/a.jpg'),
    //         },
    //         {
    //             id: 2,
    //             PName: "Shine Beauty Salon",
    //             name: 'Zoya',
    //             images: require('../../assests/images/b.jpg'),
    //         },
    //         {
    //             id: 3,
    //             PName: "Star Salon",
    //             name: 'Sana',
    //             images: require('../../assests/images/c.jpg'),
    //         },
    //         {
    //             id: 4,
    //             PName: "Child Beauty Parlour",
    //             name: 'Mehak ',
    //             images: require('../../assests/images/d.jpg'),
    //         },
    //     ]
    // }

    renderItem = ({ item }) => {
       
        return (
            <View style={{ flex: 1, }}>
                <TouchableOpacity onPress={() => navigation.navigate('ServicesG')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 15 }}>
                        <View>
                            <Image source={item.images}
                                style={{ borderRadius: 40, width: 50, height: 50 }}
                            />
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ marginLeft: 10, width: "69%" }}>
                                <Text style={{ color: 'black', fontSize: 20 }}>{item.PName}</Text>
                                <Text>{item.name}</Text>
                            </View>

                        </View>

                        <View>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 20 }} onPress={() => onDelete(item.id)}>
                                    Delete
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        )
    }

  
const {data} = state
    return (

        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}

            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
});

//make this component available to the app
export default ParlourListG;
