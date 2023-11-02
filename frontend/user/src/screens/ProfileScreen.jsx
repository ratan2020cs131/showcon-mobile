import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FontAwesome, MaterialIcons, Entypo, Feather, Ionicons } from '@expo/vector-icons';
import ScreenWrapper from './ScreenWrapper';
import GlobalStyles from '../GlobalStyles';

const ProfileScreen = ({ navigation }) => {

    return (
        <ScreenWrapper title={"Profile"}>
            <View style={styles.container}>
                {/*UserName */}
                {/* Name */}
                {/* Name */}
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, paddingRight: 10 }}>
                        <FontAwesome name='user-o' size={15} color={"black"} />
                        <Text style={[GlobalStyles.normalText, styles.input2]}>Name</Text>
                    </View>
                    <Text>{UserData[0].fname + " " + UserData[0].lname}</Text>
                </View>

                {/* Email */}
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, paddingRight: 10 }}>
                    <MaterialIcons name='alternate-email' size={15} color={"black"} />
                        <Text style={[GlobalStyles.normalText, styles.input2]}>Email</Text>
                    </View>
                    <Text>{UserData[0].email}</Text>
                </View>

                {/* Phone Number */}
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, paddingRight: 10 }}>
                        <Feather name='phone' size={15} color={"black"} />
                        <Text style={[GlobalStyles.normalText, styles.input2]}>Phone Number</Text>
                    </View>
                    <Text>{UserData[0].phone}</Text>
                </View>

                {/* Password */}
                <View style={[styles.section, {marginBottom: 25}]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, paddingRight: 10 }}>
                        <Feather name='lock' size={15} color={"black"} />
                        <Text style={[GlobalStyles.normalText, styles.input2]}>Password</Text>
                    </View>
                    <Text>{UserData[0].password}</Text>
                </View>

                <Pressable style={[GlobalStyles.button, { flexDirection: 'row', alignItems: 'center', marginBottom: 10 }]} onPress={() => navigation.navigate("ProfileUpdate", {userData:UserData[0]})}>
                    <FontAwesome name='pencil' size={20} color={"black"} />
                    <Text style={[GlobalStyles.normalText, { fontSize: 20 }]}>{" "}Update</Text>
                </Pressable>
                <Pressable style={[GlobalStyles.button, { flexDirection: 'row', alignItems: 'center' }]}>
                    <MaterialIcons name='logout' size={20} color={"black"} />
                    <Text style={[GlobalStyles.normalText, { fontSize: 20 }]}>{" "}Logout</Text>
                </Pressable>
            </View>
        </ScreenWrapper>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
