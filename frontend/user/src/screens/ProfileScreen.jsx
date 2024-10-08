import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import ScreenWrapper from './ScreenWrapper';
import GlobalStyles from '../GlobalStyles';
import { CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { auth, logout, resetStates, resetUpdate, getProfile } from '../Redux/Features/Auth/authSlice';

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const authState = useSelector(auth);

    const logoutHandler = async () => {
        dispatch(resetStates());
        dispatch(logout());
        navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [
                { name: 'Login' },
            ],
        }));
    }

    useEffect(() => {
        if (authState.isUpdated) {
            dispatch(getProfile())
            dispatch(resetUpdate())
        }
    }, [authState.isUpdated])

    return (
        <ScreenWrapper title={"Profile"}>
            {
                authState.isLoading ?
                    <View style={{ width: '100%', flexDirection: "row", justifyContent: 'center', marginVertical:100 }}>
                        <ActivityIndicator size="large" color="#F55139" />
                    </View>
                    :

                    <View style={styles.container}>

                        <View style={{ width: '100%', alignItems: 'center' }}>

                            {/* Name */}
                            <View style={styles.section}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, paddingRight: 10 }}>
                                    <FontAwesome name='user-o' size={15} color={"black"} />
                                    <Text style={[GlobalStyles.semiBoldText, styles.input2]}>Name</Text>
                                </View>
                                <Text style={[GlobalStyles.normalText]}>{authState.user.fname + " " + authState.user.lname}</Text>
                            </View>

                            {/* Email */}
                            <View style={styles.section}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, paddingRight: 10 }}>
                                    <MaterialIcons name='alternate-email' size={15} color={"black"} />
                                    <Text style={[GlobalStyles.semiBoldText, styles.input2]}>Email</Text>
                                </View>
                                <Text style={[GlobalStyles.normalText]}>{authState.user.email}</Text>
                            </View>

                            {/* Phone Number */}
                            <View style={styles.section}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, paddingRight: 10 }}>
                                    <Feather name='phone' size={15} color={"black"} />
                                    <Text style={[GlobalStyles.semiBoldText, styles.input2]}>Phone</Text>
                                </View>
                                <Text style={[GlobalStyles.normalText]}>{authState.user.phone}</Text>
                            </View>

                            <TouchableOpacity style={[GlobalStyles.button, { flexDirection: 'row', alignItems: 'center', gap: 15, backgroundColor: '#1E1F22' }]}
                                onPress={() => navigation.navigate("ProfileUpdate", { userData: authState.user })}>
                                <Text style={[GlobalStyles.semiBoldText, { color: '#E9E5D7' }]}>UPDATE PROFILE</Text>
                                {/* <FontAwesome name='pencil' size={20} color={"#E9E5D7"} /> */}
                            </TouchableOpacity>
                        </View>

                        {/* LOGOUT BUTTON */}
                        <TouchableOpacity style={[GlobalStyles.button, { flexDirection: 'row', alignItems: 'center', gap: 5 }]} onPress={logoutHandler}>
                            <Text style={[GlobalStyles.boldText, { paddingLeft: 10 }]}>LOGOUT</Text>
                            <Ionicons name="log-out-outline" style={{ fontSize: 23 }}></Ionicons>
                        </TouchableOpacity>
                    </View>
            }
        </ScreenWrapper>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 30,
        paddingTop: 60,
        alignItems: 'center',
    },
    section: {
        width: '85%',
        backgroundColor: '#E0E0E0',
        marginBottom: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderRadius: 7,
        padding: 10
    },
    input2: {
        color: 'black',
        borderWidth: 0,
        flex: 1,
        paddingHorizontal: 8,
        fontSize: 15,

    }
})

const UserData = [
    {
        id: "1",
        fname: "ABCD",
        lname: "WXYZ",
        phone: 7854129630,
        email: "abcd.wxyz@gmail.com",
        password: "abcd@23"
    }
]
