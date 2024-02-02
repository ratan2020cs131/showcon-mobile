import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import GlobalStyles from "../../GlobalStyles";
import { useDispatch, useSelector } from 'react-redux';
import { auth, resetStates, logout } from "../../redux/features/Auth/AuthSlice";
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
        <View style={styles.conatiner}>
            <View style={{ width: '100%', gap: 20 }}>
                {!authState.user.cinema &&
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

                <View style={styles.section}>
                    <View style={styles.item}>
                        <FontAwesome name="user-o" size={20} color="black" />
                        <Text style={[GlobalStyles.normalText, { fontSize: 16 }]}>{authState.user.fname+" "+authState.user.lname}</Text>
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
            </View>
            <TouchableOpacity
                style={[GlobalStyles.buttonOutlined, { width: '50%', flexDirection: 'row', gap: 10 }]}
                onPress={logoutHandler}
            >
                <Text style={[GlobalStyles.semiBoldText]}>LOGOUT</Text>
                <MaterialIcons name="logout" size={20} color="black" />
            </TouchableOpacity>
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