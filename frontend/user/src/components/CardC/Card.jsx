import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../GlobalStyles';
import {Ionicons} from '@expo/vector-icons';

const Card = ({ navigation, route, data, select, index, setSelect }) => {
    const{image, title, subtitle}=data;
    
    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.container} onPress={()=>{
            setSelect(index)
        }}>
            <View style={styles.imagecontainer}>
                <Image source={image} style={styles.image}></Image>
            </View>
            <View style={styles.text}>
                <Text style={[GlobalStyles.semiBoldText,styles.title]}>{title}</Text>
                <Text style={[GlobalStyles.normalText, {fontSize:13}]}>{subtitle}</Text>
            </View>
            <View style={styles.radio}>
                {select?
                    <Ionicons name="radio-button-on-outline" style={styles.icon}></Ionicons>:
                    <Ionicons name="radio-button-off-outline" style={styles.icon}></Ionicons>
                }
            </View>
        </TouchableOpacity>
    )
}

export default Card;

const styles = StyleSheet.create({
    container: {
        marginVertical:5,
        width: '100%',
        height:70,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#fff',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
        shadowRadius: 4,
        flexDirection:'row',
        alignItems:'center',
        gap:25,
        position:'relative'
    },
    imagecontainer: {
        height: 40,
        width: 50,
    },
    image: {
        resizeMode: 'contain',
        height: '100%',
        width: '100%'
    },
    text:{
        paddingVertical:2,
    },
    title:{
        fontSize:17
    },
    radio:{
        position:'absolute',
        right:20,
        top:'45%'
    },
    icon:{
        fontSize:22,
        color:'#F55139',
    }
})
