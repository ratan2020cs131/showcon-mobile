import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../../screens/ScreenWrapper';
import GlobalStyles from '../../GlobalStyles';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { update, auth } from '../../Redux/Features/Auth/authSlice';

const ProfileUpdate = ({ navigation, route }) => {
    const userData = route.params.userData;
    const { fname, lname, email, phone, password, id } = userData;
    const [user, setUser] = useState({
        fname, lname, email, phone
    })
    const [updated, setUpdated] = useState(false);
    const dispatch = useDispatch();
    const authState = useSelector(auth);

    const handleChange = (field, value) => {
        setUser({ ...user, [field]: value });
        console.log(user);
    }

    const handleUpdate = () => {
        dispatch(update(user))
    }

    useEffect(() => {
        if (authState.isUpdated) {
            setUpdated(true);
            setTimeout(() => {navigation.navigate("ProfileScreen")}, 1000)
        }
    }, [authState.isUpdated])

    return (
        <ScreenWrapper title={"Update Profile"}>
            <View style={styles.container}>

                {/*UserName */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '85%', marginHorizontal: 10, marginBottom: 10 }}>
                    <View style={{ backgroundColor: '#E0E0E0', borderRadius: 7, marginRight: 10, width: '51%', flexDirection: 'row', flex: 1, alignItems: 'center', paddingLeft: 10 }}>
                        <FontAwesome name="user-o" size={20} color="black" />
                        <TextInput placeholder={fname} style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, flex: 1 }]} value={user.fname}
                            onChangeText={(value) => handleChange('fname', value)} />
                    </View>
                    <View style={{ backgroundColor: '#E0E0E0', borderRadius: 7, width: '48%' }}>
                        <TextInput placeholder={lname} style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8 }]} value={user.lname}
                            onChangeText={(value) => handleChange('lname', value)} />
                    </View>
                </View>

                {/*Email */}
                <View style={styles.section}>
                    <MaterialIcons name='alternate-email' size={20} color={"black"} />
                    <TextInput placeholder={email} keyboardType='email-address' style={[GlobalStyles.input, styles.input2, GlobalStyles.normalText]} value={user.email}
                        onChangeText={(value) => handleChange('email', value)} />
                </View>

                {/*Phone Number */}
                <View style={styles.section}>
                    <Feather name='phone' size={20} color={"black"} />
                    <TextInput placeholder={phone.toString()} keyboardType='number-pad' style={[GlobalStyles.input, styles.input2, GlobalStyles.normalText]} value={user.phone.toString()}
                        onChangeText={(value) => handleChange('phone', value)} />
                </View>

                {/*Password */}
                {/* <View style={[styles.section, { marginBottom: 25 }]}>
                    <Feather name='lock' size={20} color={"black"} />
                    <TextInput placeholder={password?password:'Change Password'} style={[GlobalStyles.input, styles.input2, GlobalStyles.normalText]} keyboardType='visible-password' />
                </View> */}

                {authState.isLoading ?
                    <View style={{ width: '100%', flexDirection: "row", justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#F55139" />
                    </View>
                    :
                    <>
                        {updated ?
                            <View style={{ width: '100%', flexDirection: "row", justifyContent: 'center' }}>
                                <Ionicons
                                    name="checkmark-circle"
                                    size={35}
                                    color="#00a877"
                                />
                            </View>
                            :
                            <TouchableOpacity style={[GlobalStyles.button, { flexDirection: 'row', alignItems: 'center', gap: 5 }]}
                                onPress={handleUpdate}>
                                <Ionicons name='save' size={18} color={"black"} />
                                <Text style={[GlobalStyles.boldText, { paddingRight: 5 }]}>SAVE</Text>
                            </TouchableOpacity>
                        }
                    </>
                }

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
