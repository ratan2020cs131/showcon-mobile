import React, { useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, auth } from '../Redux/Features/Auth/authSlice';

const Loader = ({ setIsLogged }) => {
    const dispatch = useDispatch();
    const authState = useSelector(auth);

    const removeToken = async()=>{
        await AsyncStorage.removeItem('token');
    }



    useEffect(() => {
        if (authState.isAuth) {
            setIsLogged(true);
        } else if (authState.isAuth === undefined) {
            dispatch(getProfile());
        }else{
            removeToken();
            setIsLogged(false);
        }

    }, [authState])


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
