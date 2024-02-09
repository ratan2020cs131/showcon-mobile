import { StyleSheet, TouchableOpacity, Text, View, TextInput, KeyboardAvoidingView, useWindowDimensions } from "react-native";
import { MaterialIcons, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import GlobalStyles from "../../GlobalStyles";
import { useEffect, useRef, useState } from "react";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { register, getAddress, setCinema, registerCinema, resetNewCinema } from '../../redux/features/Register/RegisterSlice';
import { useDispatch, useSelector } from 'react-redux';
import Shimmer from '../Shimmer';
import SwipeButton from "../SwipeButton";
import FeatureDropdown from '../Dropdown';
import Screens from "../seating/Screens";
import ModalAlert from '../ModalAlert';

const Register = ({ navigation }) => {
    const windowHeight = useWindowDimensions().height;
    const addressRef = useRef(null);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [alert, setAlert] = useState(null);
    const onClose = () => { setModal(false); setAlert(null) }
    const registerState = useSelector(register);
    const [type, setType] = useState()
    const getLocation = async () => {
        try {
            const { status } = await requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                throw new Error("Location permission denied")
                return;
            }
            // Get current location
            const location = await getCurrentPositionAsync({});
            console.log(`Location: ${registerState}`);
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

    const handleCinemaData = (key, value) => {
        dispatch(setCinema({ key: key, value: value }));
        console.log(registerState);
    }
    useEffect(() => {
        console.log(registerState.cinema);
        dispatch(setCinema({ key: 'type', value: type }));
    }, [type])

    const onSubmit = () => {
        if (registerState.cinema.title === '') { setAlert('Provide a title to your cinema'); setModal(true) }
        else if (!registerState.cinema.address) { setAlert('Please wait for your location to get detected'); setModal(true) }
        else if (registerState.cinema.screen.length === 0) { setAlert('Please add atleast one screen'); setModal(true) }
        else { dispatch(registerCinema(registerState.cinema)) }
    }

    useEffect(() => {
        registerState.isRegistered && (navigation.navigate('ProfileScreen'),dispatch(resetNewCinema()))
    }, [registerState.isRegistered])


    return (
        <KeyboardAvoidingView style={[styles.conatiner,{minHeight:0.62*windowHeight}]}>
            <View style={styles.form}>
                <View style={styles.fullWidth}>
                    <View style={styles.inputFull}>
                        <MaterialIcons name="drive-file-rename-outline" size={25} color="black" />
                        <TextInput placeholder={'Cinema title'}
                            style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, flex: 1 }]}
                            value={registerState.cinema.title}
                            onChangeText={(value) => { handleCinemaData('title', value) }}
                        />
                    </View>
                    {registerState?.isGettingAdd ?
                        <Shimmer style={{ borderRadius: 7, width: '100%', height: 80 }} /> :
                        <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#E0E0E0', borderRadius: 7, width: '100%', minHeight: 80, maxHeight: 140 }}
                        // onPress={() => addressRef.current.focus()}
                        >
                            <View style={styles.inputFull}>
                                <Feather name="map" size={20} color="black" />
                                <TextInput
                                    ref={addressRef}
                                    placeholder={'Address'}
                                    maxLength={50}
                                    multiline={true}
                                    numberOfLines={2}
                                    style={{ alignItems: 'flex-start', minHeight: 45, paddingLeft: 10, fontFamily: "Montserrat-Regular", width: '90%', fontSize: 16, color: '#000' }}
                                    value={registerState?.cinema?.address ? (registerState?.cinema?.address?.city + ", " + registerState?.cinema?.address?.state) : ""}
                                    editable={false}
                                />
                            </View>
                        </TouchableOpacity>
                    }

                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '50%', gap: 10 }}>
                            {registerState?.isGettingAdd ?
                                <Shimmer style={{ borderRadius: 7, width: '100%', height: 45 }} /> :
                                <View style={styles.inputHalf}>
                                    <Ionicons name="location-outline" size={23} color="black" />
                                    <TextInput placeholder={'Pincode'}
                                        editable={false}
                                        style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, flex: 1 }]}
                                        value={registerState.cinema?.address ? registerState?.cinema?.address?.zipcode : ''}
                                    />
                                </View>
                            }
                            <View style={styles.inputHalf}>
                                <FeatureDropdown title={"Type"} list={typeArray} set={setType} get={type} />
                            </View>
                        </View>

                        <TouchableOpacity activeOpacity={0.5}
                            onPress={() => navigation.navigate("SeatingScreen")}
                            style={{ width: '47%', height: 100, backgroundColor: '#e0e0e0', borderRadius: 8, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -7 }}>
                                <Text style={[GlobalStyles.semiBoldText, { fontSize: 25 }]}>+</Text>
                                <MaterialCommunityIcons name="sofa-single-outline" size={30} color="black" />
                            </View>
                            <Text style={[GlobalStyles.normalText, { textAlign: 'center' }]}>Add Screen</Text>
                        </TouchableOpacity>
                    </View>

                    <Screens />

                </View>
            </View>
            
            {/* only provide numeric value to width */}
            <SwipeButton style={{ width: 330 }}
                        error={alert === null}
                        success={registerState.isRegistered} loading={registerState.isRegistering}
                        submit={onSubmit}
                        successTitle="Request Submitted for registration"
                    />
            {modal && <ModalAlert close={onClose} visible={modal} alert={alert} />}
        </KeyboardAvoidingView>
    )
}
export default Register;

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent:'space-between'
    },
    form: {
        position: 'relative',
        width: 390,
        padding: 30,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    halfWidth: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        height: 45,
    },
    fullWidth: {
        width: '100%',
        alignItems: 'center',
        gap: 10
    },
    inputHalf: {
        backgroundColor: '#E0E0E0',
        borderRadius: 7,
        minWidth: 160,
        maxWidth: 200,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        height: 45,
        width: '50%',
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

const typeArray = [
    "Recliner",
    "IMAX 3D",
    "Eminence",
]