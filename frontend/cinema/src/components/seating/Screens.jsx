import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native"
import GlobalStyles from "../../GlobalStyles";
import { AntDesign } from '@expo/vector-icons';
import { register, setCinema } from '../../redux/features/Register/RegisterSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";

const Screens = () => {
    const registerState = useSelector(register);
    useEffect(() => console.log(registerState.cinema.screen), [])


    return (
        <View style={styles.conatiner}>
            {registerState.cinema?.screen?.length > 0 &&
                <Text style={[{ marginLeft: 5, marginRight: -46, transform: [{ rotate: '-90deg' }] }, GlobalStyles.boldText]}>SCREENS</Text>
            }
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ justifyContent: 'center' }}
                style={{ width: '100%', flexDirection: 'row', zIndex: -1 }}
            >
                {registerState.cinema.screen.map((item, i) => (
                        <ListItem key={i} screen={item} />
                    ))}
                {/* {[1, 2, 3, 4, 5].map((i) => (
                    <ListItem key={i} />
                ))} */}
            </ScrollView>
        </View>
    )
}
export default Screens;

const ListItem = ({ screen }) => {
    const registerState = useSelector(register);
    const dispatch = useDispatch();
    const [seatCount, setSeatCount] = useState(0)
    const [showCount, setShowCount] = useState(0)

    const handleRemove = () => {
        let updatedScreens = [...registerState.cinema.screen];
        updatedScreens = updatedScreens.filter((item) => item.screen !== screen.screen)
        updatedScreens = updatedScreens.map((item, index) => { return { ...item, screen: String.fromCharCode(65 + index) } })
        console.log('updatedScreens: ', updatedScreens);
        dispatch(setCinema({ key: 'screen', value: updatedScreens }));
    }

    useEffect(() => {
        let seat = 0;
        screen?.seatmap?.forEach(item => {
            seat += item.seats.length;
        });
        setSeatCount(seat);
        setShowCount(screen.slots.length);
    }, [registerState.cinema.screen])

    return (
        <View style={styles.screen}>
            <TouchableOpacity
                onPress={handleRemove}
                style={{ position: 'absolute', top: -5, right: -5 }}
            >
                <AntDesign name="closecircle" size={18} color="#505050" />
            </TouchableOpacity>
            <Text style={[GlobalStyles.boldText, { fontSize: 18, marginBottom: -5 }]}>{screen.screen}</Text>
            <Text style={[GlobalStyles.normalText]}>{seatCount} Seats</Text>
            <Text style={[GlobalStyles.normalText]}>{showCount} shows/day</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        width: "100%",
        justifyContent: 'flex-start',
        alignContent: 'center',
        marginTop: 5,
        flexDirection: 'row',
        zIndex:-1
    },
    screen: {
        paddingHorizontal: 15,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 7,
        position: 'relative',
        overflow: 'visible',
        marginVertical: 5,
        marginRight: 10
    }
})