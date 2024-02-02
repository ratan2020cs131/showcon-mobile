import { StyleSheet, TouchableOpacity, Text, View, TextInput } from "react-native";
import { MaterialIcons, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import GlobalStyles from "../../GlobalStyles";
import { useEffect, useRef } from "react";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { register, getAddress } from '../../redux/features/Register/RegisterSlice';
import { useDispatch, useSelector } from 'react-redux';
import SwipeButton from "../SwipeButton";
import FeatureDropdown from '../Dropdown';

const Register = ({navigation}) => {
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


    return (
        <View style={styles.conatiner}>
            <View style={styles.form}>

                <View style={styles.fullWidth}>
                    <View style={styles.inputFull}>
                        <MaterialIcons name="drive-file-rename-outline" size={25} color="black" />
                        <TextInput placeholder={'Cinema title'}
                            style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, flex: 1 }]} />
                    </View>
                    <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#E0E0E0', borderRadius: 7, width: '100%', minHeight: 80, maxHeight: 140 }} onPress={() => addressRef.current.focus()}>
                        <View style={styles.inputFull}>
                            <Feather name="map" size={20} color="black" />
                            <TextInput
                                ref={addressRef}
                                placeholder={'Address'}
                                maxLength={50}
                                multiline={true}
                                numberOfLines={2}
                                style={{ alignItems: 'flex-start', minHeight: 45, paddingLeft: 10, fontFamily: "Montserrat-Regular", width: '90%', fontSize: 16 }}
                                value={registerState?.address ? (registerState?.address?.city + ", " + registerState?.address?.state) : ""}
                            />
                        </View>
                    </TouchableOpacity>

                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '50%', gap: 10 }}>
                            <View style={styles.inputHalf}>
                                <Ionicons name="location-outline" size={23} color="black" />
                                <TextInput placeholder={'Pincode'}
                                    style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, flex: 1 }]}
                                    value={registerState?.address ? registerState?.address?.zipcode : ''}
                                />
                            </View>
                            <View style={styles.inputHalf}>
                                <FeatureDropdown title={"Type"} list={typeArray} set={() => { }} get={[]} />
                            </View>
                        </View>

                        <TouchableOpacity activeOpacity={0.5}
                            onPress={()=>navigation.navigate("SeatingScreen")}
                            style={{ width: '47%', height: 100, backgroundColor: '#e0e0e0', borderRadius: 8, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -7 }}>
                                <Text style={[GlobalStyles.semiBoldText, { fontSize: 25 }]}>+</Text>
                                <MaterialCommunityIcons name="sofa-single-outline" size={30} color="black" />
                            </View>
                            <Text style={[GlobalStyles.normalText, { textAlign: 'center' }]}>Add Screen</Text>
                        </TouchableOpacity>
                    </View>

                    {/* only provide numeric value to width */}
                    {/* <SwipeButton style={{width:330}} 
                    success={false} loading={false} 
                    submit
                    successTitle="Request Submitted for registration"
                    />  */}
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