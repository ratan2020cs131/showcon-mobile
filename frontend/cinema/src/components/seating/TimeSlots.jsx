import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import GlobalStyles from "../../GlobalStyles";

const TimeSlots = ({set}) => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showTime, setShowTime] = useState([])

    const showTimePicker = () => {
        setShowPicker(true);
    };

    const handleTimeChange = (event, selected) => {
        setShowPicker(Platform.OS === 'ios');
        if (selected) {
            setSelectedTime(selected);
        }
    };
    useEffect(() => {
        const formattedTime = selectedTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        if (!showTime.includes(formattedTime)) setShowTime((prev) => [...prev, formattedTime]);
    }, [selectedTime])
    useEffect(()=>{set('slots',showTime.slice(1))},[showTime])

    return (
        <View style={styles.conatiner}>
            <TouchableOpacity activeOpacity={0.4} style={styles.clockButton} onPress={showTimePicker}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                    <Text style={[GlobalStyles.boldText, { fontSize: 18 }]}>+</Text>
                    <Octicons name="clock" size={24} color="black" />
                </View>
                <Text
                    numberOfLines={2}
                    style={[GlobalStyles.semiBoldText, { width: 80, textAlign: 'center' }]}
                >Add show timing</Text>
            </TouchableOpacity>
            {showPicker &&
                <DateTimePicker
                    value={selectedTime}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={handleTimeChange}
                />
            }

            <View style={{ width: '100%', gap: 13, paddingHorizontal: 20, paddingVertical: 20, flexDirection: 'row', justifyContent: 'flex-start', flexWrap: "wrap" }}>
                {showTime.slice(1).map((item, index) => (
                    <Slots key={index} time={item} set={setShowTime} get={showTime} />
                ))}
            </View>
        </View>
    )
}
export default TimeSlots;


const Slots = ({ time, set, get }) => {
    const handleRemove = (item) => {
        let newArray = [...get];
        newArray = newArray.filter((prev) => prev !== item);
        set(newArray)
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 5, borderColor: '#1E90FF', backgroundColor:'#1E90FF30', borderWidth: 2, alignSelf: 'flex-start', padding: 7 }}>
            <Text style={[GlobalStyles.normalText, { fontSize: 16 }]}>{time}</Text>
            <TouchableOpacity onPress={() => handleRemove(time)}>
                <MaterialCommunityIcons name="window-close" size={18} color="black" />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    conatiner: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    clockButton: {
        height: 70,
        paddingVertical: 10,
        paddingHorizontal: 20,
        gap: 10,
        flexDirection: "row",
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0'
    }
})