import { Image, View, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import { useEffect, useMemo, useState } from "react";
import Check from '../../../assets/images/check.png'

const ShowDates = ({ date }) => {
    const [selected, setSelected] = useState([]);
    const datesArray = useMemo(() => {
        let dateString = date.release;
        let [dd, mm, yyyy] = dateString.split('/').map(Number)
        let currentdate = new Date(yyyy, mm - 1, dd);
        let formattedDate = currentdate.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
        let dateArray = [];
        dateArray.push(formattedDate);

        for (let i = 0; i < 6; i++) {
            // Increase the date by one day
            currentdate.setDate(currentdate.getDate() + 1);
            let newDate = new Date(currentdate.getFullYear(), currentdate.getMonth(), currentdate.getDate());
            formattedDate = newDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
            dateArray.push(formattedDate);
        }
        return dateArray;
    }, [date.release])

    return (
        <FlatList
            data={datesArray}
            renderItem={(item, index) => <DateCard data={item.item} get={selected} set={setSelected} />}
            keyExtractor={(item) => item}
            horizontal={true}
        />
    )
}
export default ShowDates;

const DateCard = ({ set, get, data }) => {
    const selected = get?.includes(data);
    const handleSelect = () => {
        let updatedSelectedArray = [...get];
        if (selected) updatedSelectedArray = updatedSelectedArray.filter((item) => item !== data);
        else updatedSelectedArray.push(data);
        set(updatedSelectedArray);
    }

    return (
        <TouchableOpacity style={[styles.date, { backgroundColor: selected ? '#a0a0a0' : '#e0e0e0', }]}
            activeOpacity={0.5}
            onPress={handleSelect}
        >
            {selected && <Image source={Check} style={[GlobalStyles.image, { position: 'absolute', zIndex: 1 }]} />}
            <Text style={[GlobalStyles.semiBoldText, { fontSize: 12, color: selected ? '#363636' : '#000' }]}>{data.split(',')[0].split(' ')[1] + " " + data.split(',')[0].split(' ')[0]}</Text>
            <Text style={[GlobalStyles.boldText, { color: selected ? '#363636' : '#000' }]}>{data.split(',')[1]}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    date: {
        borderRadius: 10,
        width: 62,
        height: 62,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3,
        marginRight: 8
    }
})