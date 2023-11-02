import React, { useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from 'react-redux';
import { getProfile } from '../Redux/Features/Auth/authSlice';

const Loader = () => {
    const dispatch = useDispatch();

    

    useEffect(() => {
        dispatch(getProfile());
    }, [])


    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#F55139" />
        </View>
    )
}

export default Loader;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1E1F22',
    },
  });
