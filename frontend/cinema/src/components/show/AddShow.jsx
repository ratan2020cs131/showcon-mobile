import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import Screens from './Screens';
import { FontAwesome } from '@expo/vector-icons';
import LanguageDropdown from '../Dropdown';
import ShowDates from './Date';
import { useSelector, useDispatch } from "react-redux";
import { show, setNewShow, addShow, resetNewShow } from "../../redux/features/Show/ShowSlice";
import { useEffect, useState } from "react";
import ModalAlert from '../ModalAlert';
import Success from '../SuccessAnimation';
import { ActivityIndicator } from "react-native-paper";
import { CommonActions } from '@react-navigation/native';

const AddShow = ({ navigation, movie }) => {
    const dispatch = useDispatch();
    const showState = useSelector(show);
    const [modal, setModal] = useState(false);
    const [alert, setAlert] = useState('');
    const onCloseAlertModal = () => setModal(false);
    useEffect(() => {
        dispatch(setNewShow({ key: 'movie', value: movie._id }))
    }, [])

    const submitHandler = () => {
        if (showState.newShow.slots.length === 0) {
            setAlert("Select atleast one slot")
            setModal(true)
        }
        else if (showState.newShow.price === '') {
            setAlert("Please Enter Price")
            setModal(true)
        }
        else if (showState.newShow.dates.length === 0) {
            setAlert("Select alteast one date")
            setModal(true)
        }
        else {
            dispatch(addShow(showState.newShow))
        }
    }

    useEffect(() => {
        if (showState.showCreated) {
            const timeout = setTimeout(() => {
                dispatch(resetNewShow());
                navigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'Home' },
                    ],
                }));
            }, 2000)
            return () => clearTimeout(timeout)
        }
    }, [showState.showCreated])


    return (
        <View style={styles.conatiner}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{ minHeight: '100%', alignItems: 'center' }}
            >
                <View style={{ flex: 1, padding: 20, gap: 20 }}>
                    <Screens />

                    <View style={{ paddingHorizontal: 20, gap: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                            <View style={{ width: '40%', position: 'relative', justifyContent: 'center', alignSelf: 'flex-start' }}>
                                <FontAwesome name="rupee" size={24} color="black" style={{ position: 'absolute', zIndex: 1, left: 10 }} />
                                <TextInput
                                    style={[GlobalStyles.input, GlobalStyles.normalText, { color: '#1E1F22', fontSize: 17, backgroundColor: '#e0e0e0', borderWidth: 0, paddingHorizontal: 30 }]}
                                    placeholder="Price"
                                    keyboardType={"numeric"}
                                    onChangeText={(value) => dispatch(setNewShow({ key: 'price', value }))}
                                />
                            </View>

                            <View style={{ width: '55%', position: 'relative', justifyContent: 'center', alignSelf: 'flex-start' }}>
                                <LanguageDropdown title="Select Lang" list={langList} set={(value) => { dispatch(setNewShow({ key: 'lang', value })) }} get={showState.newShow.lang} />
                            </View>
                        </View>

                        <ShowDates date={movie} />
                    </View>
                </View>
                {showState.creatingshow ?
                    <ActivityIndicator size={"large"} color="#f55139" style={{ marginBottom: 20 }} /> :
                    <TouchableOpacity style={[GlobalStyles.button, { marginBottom: 20 }]} onPress={submitHandler}>
                        <Text style={GlobalStyles.boldText}>ADD SHOW</Text>
                    </TouchableOpacity>
                }
            </ScrollView>
            {showState.showCreated && <Success modal={true} title={"Show Created"} />}
            {modal && <ModalAlert close={onCloseAlertModal} visible={modal} alert={alert} />}
        </View>
    )
}
export default AddShow;


const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        width: "100%",
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
})

const langList = [
    'Hindi',
    'English',
    'Tamil',
    'Marathi'
]