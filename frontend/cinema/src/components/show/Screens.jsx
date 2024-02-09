import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from "react-native"
import GlobalStyles from "../../GlobalStyles";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { register, setCinema } from '../../redux/features/Register/RegisterSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import Check from '../../../assets/images/check.png'

const Screens = () => {
    const [selectScreen, setSelectScreen] = useState(null);
    const handleScreen = (item) => setSelectScreen(item)
    const [slot, setSlot] = useState([]);
    const registerState = useSelector(register);
    useEffect(() => console.log("hi: ", registerState.registered.screen), [])


    return (
        <View style={styles.conatiner}>
            <View style={{ flexDirection: 'row', width: '100%', paddingVertical: 20, gap: 2, justifyContent: 'space-around' }}>
                <View style={{ alignItems: 'center', paddingTop: 10, width: '50%', borderRightColor: '#c0c0c0', borderRightWidth: 1 }}>
                    {registerState.registered?.screen.length > 0 &&
                        <Text style={[GlobalStyles.boldText, { zIndex: -1, fontSize: 13 }]}>SCREENS</Text>
                    }
                    {registerState.registered?.screen.map((item, i) => (
                        <ListItem key={i} screen={item} set={handleScreen} get={selectScreen} />
                    ))}
                </View>

                <View style={{ marginTop: 2, width: '50%', paddingTop: 10, alignItems: 'center', gap: 10 }}>
                    {registerState.registered?.screen.length > 0 &&
                        <Text style={[GlobalStyles.boldText, { fontSize: 13 }]}>SLOTS</Text>
                    }
                    {selectScreen ?
                        selectScreen?.slots.map((i, index) => <Slots time={i} key={index} set={setSlot} get={slot} />) :
                        Array(4).fill().map((i, index) => <Slots key={index} />)
                    }
                </View>
            </View>
        </View>
    )
}
export default Screens;

const ListItem = ({ screen, set, get }) => {
    const selected = screen.screen === get?.screen;
    const registerState = useSelector(register);
    const [seatCount, setSeatCount] = useState(0)
    const [showCount, setShowCount] = useState(0)
    useEffect(() => {
        let seat = 0;
        screen?.seatmap?.forEach(item => {
            seat += item.seats.length;
        });
        setSeatCount(seat);
        setShowCount(screen.slots.length);
    }, [registerState.cinema.screen])

    const handleSet = () => {
        if (selected) set(null);
        else set(screen)
    }

    return (
        <TouchableOpacity activeOpacity={0.5} style={[styles.screen, {marginVertical:4, backgroundColor: selected ? '#a0a0a0' : '#e0e0e0', borderWidth: 1, borderColor: '#1E1F22' }]} onPress={handleSet}>
            {selected &&
                <Image source={Check} style={{ position: 'absolute', zIndex: 1, height: 50, width: 70 }} />
            }
            <Text style={[GlobalStyles.boldText, { fontSize: 18, marginBottom: -5 }]}>{screen.screen}</Text>
            <Text style={[GlobalStyles.semiBoldText]}>{seatCount} Seats</Text>
            <Text style={[GlobalStyles.semiBoldText]}>{showCount} shows/day</Text>
        </TouchableOpacity>
    )
}


const Slots = ({ time, set, get }) => {
    const selected = get?.includes(time);
    const handleSet = () => {
        let slots = [...get];
        if (slots?.includes(time)) slots = slots.filter((i) => i !== time);
        else slots.push(time)
        set(slots)
    }

    return (
        <TouchableOpacity activeOpacity={time ? 0.3 : 1}
            style={[styles.slot, { borderColor: time ? '#1E90FF' : '#c0c0c0', backgroundColor: time ? selected ? '#1E90FF' : '#1E90FF30' : '#e0e0e0' }]}
            onPress={time && handleSet}
        >
            <Text style={[GlobalStyles.normalText, { color: time ? '#000' : '#a0a0a0', fontSize: 16 }]}>
                {time ? (() => {
                    let [hour, min] = time.split(' ')[0].split(':')
                    hour = hour.padStart(2, '0');
                    return `${hour}:${min}`
                })() : '00:00'}
            </Text>
            <Text style={[GlobalStyles.normalText, { color: time ? '#000' : '#a0a0a0', fontSize: 16 }]}>{time ? time.split(' ')[1] : 'XX'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        width: "100%",
        justifyContent: 'flex-start',
        alignContent: 'center',
        marginTop: 5,
        flexDirection: 'row',
        gap: 40
    },
    screen: {
        paddingHorizontal: 15,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        position: 'relative',
        overflow: 'visible',
        marginVertical: 5,
        marginRight: 10
    },
    slot: {
        width: 100,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 2,
        padding: 7,
        borderRadius: 5,
    }
})