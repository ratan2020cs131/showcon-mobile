import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TotalCinemas from './SquareCard';

const Home = () => {
  return (
    <View style={styles.container}>
        <TotalCinemas count={500} title="Total Cinemas"/>
        <TotalCinemas count={"₹5.3M"} title="Total Revenue" color='#1bac90'/>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:40,
        // alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-around'
    }
})

