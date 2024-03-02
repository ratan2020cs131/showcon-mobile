import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from "react-native"
import Seating from "../components/seating/Seating";
import ScreenWrapper from "./ScreenWrapper";
import TimeSlots from "../components/seating/TimeSlots";
import GlobalStyles from "../GlobalStyles";
import { register, setCinema } from '../redux/features/Register/RegisterSlice';
import { useDispatch, useSelector } from 'react-redux'
import ModalAlert from "../components/ModalAlert";

const SeatingScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const registerState = useSelector(register);
    const [modal, setModal] = useState(false);
    const [alert, setAlert] = useState('');
    const onCloseAlertModal = () => setModal(false);
    const [screen, setScreen] = useState({ screen: '', seatmap: '', slots: [] });
    const handleScreen = (key, value) => {
        setScreen({ ...screen, [key]: value });
    }
    // useEffect(() =>{if(screen.screen!=='')console.log(screen)}, [screen]);
    useEffect(() => setScreen({ ...screen, ['screen']: String.fromCharCode(registerState.cinema.screen.length + 65) }), [])

    const handleAddScreen = () => {
        if (screen.seatmap?.length === 0) {
            setAlert("Please create seats mapping")
            setModal(true)
        }
        else if (screen.slots.length === 0) {
            setAlert("Please add time slots for this screen")
            setModal(true)
        } else {
            console.log("seating screen: ",screen);
            dispatch(setCinema({ key: 'screen', value: [...registerState.cinema.screen, screen] }))
            navigation.goBack();
        }
    }


    return (
        <View style={styles.conatiner}>
            <ScreenWrapper title="Add a new screen" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                style={{width:'100%'}}
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column'}}
            >
                <View style={{ width: '100%' }}>
                    <Seating set={handleScreen} />
                    <TimeSlots set={handleScreen} />
                </View>
                <TouchableOpacity style={[GlobalStyles.button,{width:'100%',marginBottom:20, alignSelf:'flex-end'}]} onPress={handleAddScreen}>
                    <Text style={[GlobalStyles.boldText, { color: '#1E1F22' }]}>ADD SCREEN</Text>
                </TouchableOpacity>
            </ScrollView>

            {modal && <ModalAlert close={onCloseAlertModal} visible={modal} alert={alert} />}
        </View>
    )
}
export default SeatingScreen;

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal:20
    }
})