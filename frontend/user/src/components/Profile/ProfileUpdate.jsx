import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FontAwesome, MaterialIcons, Entypo, Feather, Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../../screens/ScreenWrapper';
import GlobalStyles from '../../GlobalStyles';
import { TextInput } from 'react-native-gesture-handler';

const ProfileUpdate = ({ navigation, route }) => {
    const userData = route.params.userData ;
    const {fname, lname , email, phone, password, id} = userData ;
    return (
        <ScreenWrapper title={"Update Profile"}>
            <View style={styles.container}>
                {/*UserName */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '85%', marginHorizontal: 10, marginBottom: 10 }}>
                    <View style={{ backgroundColor: '#E0E0E0', borderRadius: 7, marginRight: 10, width: '51%', flexDirection: 'row', flex: 1, alignItems: 'center', paddingLeft: 10 }}>
                        <FontAwesome name="user-o" size={20} color="black" />
                        <TextInput placeholder={fname} style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, flex: 1 }]} value={fname}/>
                    </View>
                    <View style={{ backgroundColor: '#E0E0E0', borderRadius: 7, width: '48%' }}>
                        <TextInput placeholder={lname} style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8 }]} value={lname} />
                    </View>
                </View>

                {/*Email */}
                <View style={styles.section}>
                    <MaterialIcons name='alternate-email' size={20} color={"black"} />
                    <TextInput placeholder={email} keyboardType='email-address' style={[GlobalStyles.input, styles.input2, GlobalStyles.normalText]} value={email} />
                </View>

                {/*Phone Number */}
                <View style={styles.section}>
                    <Feather name='phone' size={20} color={"black"} />
                    <TextInput placeholder={phone.toString()} keyboardType='number-pad' style={[GlobalStyles.input, styles.input2, GlobalStyles.normalText]} value={phone.toString()}/>
                </View>

                {/*Password */}
                <View style={[styles.section, { marginBottom: 25 }]}>
                    <Feather name='lock' size={20} color={"black"} />
                    <TextInput placeholder={password} style={[GlobalStyles.input, styles.input2, GlobalStyles.normalText]} value={password} keyboardType='visible-password' />
                </View>

                <Pressable style={[GlobalStyles.button, { flexDirection: 'row', alignItems: 'center', marginBottom: 10 }]} onPress={() => navigation.navigate("Profile")}>
                    <Entypo name='save' size={20} color={"black"} />
                    <Text style={[GlobalStyles.normalText, { fontSize: 20 }]}>{" "}Save</Text>
                </Pressable>
               
            </View>
        </ScreenWrapper>
    )
}

export default ProfileUpdate;

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
        alignItems: 'center',
        paddingHorizontal: 10
    },
    input2: {
        color: 'black',
        borderWidth: 0,
        flex: 1,
        paddingHorizontal: 8
    }
})


const UserData = [
    {
        id: "1",
        image: 'https://i.pravatar.cc/112',
        fname: "ABCD",
        lname: "WXYZ",
        phone: 7854129630,
        email: "abcd.wxyz@gmail.com",
        password: "abcd@23"
    }
]
