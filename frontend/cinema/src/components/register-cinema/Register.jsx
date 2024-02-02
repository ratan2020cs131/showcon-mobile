import { StyleSheet, TouchableOpacity, View, TextInput } from "react-native";
import { FontAwesome, Ionicons, Feather } from '@expo/vector-icons'
import GlobalStyles from "../../GlobalStyles";
import { useEffect, useRef } from "react";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { register, getAddress } from '../../redux/features/Register/RegisterSlice';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
    const addressRef = useRef(null);
    const dispatch = useDispatch();
    const registerState = useSelector(register);

    const getLocation = async () => {
        try {
            const { status } = await requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                throw new Error("Location permission denied")
                return;
            }
            // Get current location
            const location = await getCurrentPositionAsync({});
            console.log(`Location: ${JSON.stringify(location)}`);
            dispatch(getAddress({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }))
        } catch (error) {
            console.log(`Error getting location: ${error.message}`);
        }
    }
    useEffect(() => {
        getLocation();
    }, [])


    return (
        <View style={styles.conatiner}>
            <View style={styles.form}>
                <View style={styles.halfWidth}>
                    <View style={styles.inputHalf}>
                        <FontAwesome name="user-o" size={20} color="black" />
                        <TextInput placeholder={'Cinema title'}
                            style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, flex: 1 }]} />
                    </View>
                    <View style={styles.inputHalf}>
                        <Ionicons name="location-outline" size={23} color="black" />
                        <TextInput placeholder={'Pincode'}
                            style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, flex: 1 }]} />
                    </View>
                </View>
                <View style={styles.fullWidth}>
                    <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#E0E0E0', borderRadius: 7, minHeight: 80, maxHeight: 140 }} onPress={() => addressRef.current.focus()}>
                        <View style={styles.inputFull}>
                            <Feather name="map" size={20} color="black" />
                            <TextInput
                                ref={addressRef}
                                placeholder={'Address'}
                                maxLength={50}
                                multiline={true}
                                numberOfLines={2}
                                style={{ alignItems: 'flex-start', minHeight: 45, paddingLeft: 10, fontFamily: "Montserrat-Regular", width: '90%', fontSize: 16 }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default Register;

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        width: 390,
        padding: 30,
        gap: 10
    },
    halfWidth: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    fullWidth: {
        width: '100%',
        gao: 10
    },
    inputHalf: {
        backgroundColor: '#E0E0E0',
        borderRadius: 7,
        minWidth: 160,
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    inputFull: {
        backgroundColor: '#E0E0E0',
        borderRadius: 7,
        minWidth: 160,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    }
})