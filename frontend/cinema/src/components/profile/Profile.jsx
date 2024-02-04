import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import GlobalStyles from "../../GlobalStyles";
import { useDispatch, useSelector } from 'react-redux';
import { auth, resetStates, logout } from "../../redux/features/Auth/AuthSlice";
import { register, resetCinema, getCinema } from '../../redux/features/Register/RegisterSlice';
import { CommonActions } from '@react-navigation/native';
import Shimmer from '../Shimmer';
import { useEffect } from "react";

const Profile = ({ navigation }) => {
    const dispatch = useDispatch();
    const authState = useSelector(auth);
    const registerState = useSelector(register);
    const logoutHandler = async () => {
        navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [
                { name: 'Login' },
            ],
        }));
        dispatch(resetStates());
        dispatch(resetCinema());
        dispatch(logout());
    }

    useEffect(()=>{dispatch(getCinema())},[registerState.isRegistering])

    return (
        <View style={styles.conatiner}>
            <View style={{ width: '100%', gap: 20, alignItems: 'center' }}>
                {registerState.gettingstatus ?
                    <Shimmer style={{ width: '100%', height: 55, borderRadius: 7 }} /> :
                    <>
                        {registerState.status === false &&
                            <View style={[styles.section, { backgroundColor: '#f8d568' }]}>
                                <View style={styles.item}>
                                    <AntDesign name="warning" size={22} color="#000" style={{ alignSelf: 'flex-start', marginTop: 5 }} />
                                    <View>
                                        <Text style={[GlobalStyles.boldText, { fontSize: 17, color: '#000' }]}>Approval Pending</Text>
                                        <Text style={[GlobalStyles.normalText, { fontSize: 13, color: '#000' }]}>Request Submitted</Text>
                                        <Text style={[GlobalStyles.normalText, { fontSize: 13, color: '#000' }]}>{registerState.registered?.title}</Text>
                                        <Text style={[GlobalStyles.normalText, { fontSize: 13, color: '#000' }]} numberOfLines={2}>
                                            {registerState.registered?.address?.city + ", " + registerState.registered?.address?.state}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        }
                        {!registerState.registered?._id &&
                            <TouchableOpacity
                                activeOpacity={0.4}
                                style={[styles.section, { backgroundColor: '#F55139' }]}
                                onPress={() => navigation.navigate("RegisterCinema")}
                            >
                                <View style={styles.item}>
                                    <AntDesign name="warning" size={22} color="#fff" />
                                    <Text style={[GlobalStyles.boldText, { fontSize: 17, color: '#fff' }]}>Register your cinema</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </>
                }


                {registerState.registered?._id &&registerState.registered?.isApproved&&
                    <View style={styles.section}>
                        <Text style={[GlobalStyles.boldText, { fontSize: 20, marginLeft: 7 }]}>Cinema Info</Text>
                        <View style={styles.item}>
                            <MaterialCommunityIcons name="movie" size={24} color="black" />
                            <Text style={[GlobalStyles.normalText, { fontSize: 16 }]}>{authState.user.fname + " " + authState.user.lname}</Text>
                        </View>
                        <View style={styles.item}>
                            <FontAwesome name="map" size={20} color="black" />
                            <Text style={[GlobalStyles.normalText, { fontSize: 16 }]}>
                            {registerState.registered?.address?.city + ", " + registerState.registered?.address?.state}
                            </Text>
                        </View>
                    </View>
                }

                <View style={styles.section}>
                    <View style={styles.item}>
                        <FontAwesome name="user-o" size={20} color="black" />
                        <Text style={[GlobalStyles.normalText, { fontSize: 16 }]}>{authState.user.fname + " " + authState.user.lname}</Text>
                    </View>
                    <View style={styles.item}>
                        <MaterialIcons name='alternate-email' size={18} color={"black"} />
                        <Text style={[GlobalStyles.normalText, { fontSize: 16 }]}>{authState.user.email}</Text>
                    </View>
                    <View style={styles.item}>
                        <Feather name='phone' size={20} color={"black"} />
                        <Text style={[GlobalStyles.normalText, { fontSize: 16 }]}>{authState.user.phone}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[GlobalStyles.buttonOutlined, { width: '60%', borderWidth: 2, flexDirection: 'row', gap: 10 }]}
                    onPress={logoutHandler}
                >
                    <Text style={[GlobalStyles.boldText, { color: '#F55139' }]}>LOGOUT</Text>
                    <MaterialIcons name="logout" size={20} color="#f55139" />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Profile;

const styles = StyleSheet.create({
    conatiner: {
        // flex: 1,
        minHeight: '80%',
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 30,
    },
    section: {
        width: '100%',
        borderRadius: 8,
        backgroundColor: '#e0e0e0',
        padding: 15,
        gap: 5,
        elevation: 15,
    },
    item: {
        gap: 15,
        flexDirection: 'row',
        // borderBottomWidth: 1,
        // borderBottomColor: '#c0c0c0',
        alignItems: 'center',
        padding: 5,
    }
})
