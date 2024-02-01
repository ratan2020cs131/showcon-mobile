import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import GlobalStyles from '../../GlobalStyles';
import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { logout, resetStates, auth } from '../../redux/features/Auth/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

const Profile = ({ navigation }) => {
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

    return (
        <View style={styles.container}>
            {authState.isLoading ?
                <ActivityIndicator size={"large"} color="#F55139" /> :
                <>
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
                    </View>

                    {/* LOGOUT BUTTON */}
                    <TouchableOpacity style={[GlobalStyles.button, { flexDirection: 'row', alignItems: 'center', gap: 5 }]} onPress={logoutHandler}>
                        <Text style={[GlobalStyles.boldText, { paddingLeft: 10 }]}>LOGOUT</Text>
                        <Ionicons name="log-out-outline" style={{ fontSize: 23 }}></Ionicons>
                    </TouchableOpacity>
                </>
            }
        </View>
    )
}
export default Profile;

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