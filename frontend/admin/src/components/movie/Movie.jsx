import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import GlobalStyles from '../../GlobalStyles';

const Movie = () => {
  return (
    <View style={styles.container}>
      {/* <Text> Movie Page </Text> */}
      <TouchableOpacity style={GlobalStyles.button}>
        <Text style={GlobalStyles.boldText}>ADD MOVIE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[GlobalStyles.button, {backgroundColor:'#1E1F22'}]}>
        <Text style={[GlobalStyles.boldText, {color:'#E9E5D7'}]}>REMOVE MOVIE</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Movie;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        gap:30
    }
})
