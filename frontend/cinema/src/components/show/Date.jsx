import { Image, View, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import Check from '../../../assets/images/check.png'
import { useSelector, useDispatch } from "react-redux";
import { setNewShow, show } from "../../redux/features/Show/ShowSlice";

const ShowDates = ({ date }) => {
    const dispatch = useDispatch();
    const showState = useSelector(show);
    const [selected, setSelected] = useState([]);

    const datesArray = useMemo(() => {
        let dateString = date.release;
        let [dd, mm, yyyy] = dateString.split('/').map(Number)
        let releaseDate = new Date(yyyy, mm - 1, dd);
        let presentDate = new Date();
        let dateToBeTaken = releaseDate > presentDate ? releaseDate : presentDate;
        const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
        let formattedDate = dateToBeTaken.toLocaleDateString('en-GB', dateOptions);
        console.log(formattedDate);
        // return []
        let dateArray = [];
        dateArray.push(formattedDate.toString());

        for (let i = 0; i < 6; i++) {
            // Increase the date by one day
            dateToBeTaken.setDate(dateToBeTaken.getDate() + 1);
            let newDate = new Date(dateToBeTaken.getFullYear(), dateToBeTaken.getMonth(), dateToBeTaken.getDate());
            const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
            formattedDate = newDate.toLocaleDateString('en-GB', dateOptions);
            dateArray.push(formattedDate.toString());
        }
        return dateArray;
    }, [date.release])


    useEffect(() => {
        console.log(showState.newShow);
        dispatch(setNewShow({ key: 'dates', value: selected }))
    }, [selected])

    return (
        <View>
            <FlatList
                data={datesArray}
                renderItem={(item, index) => <DateCard data={item.item} get={selected} set={setSelected} />}
                keyExtractor={(item) => item}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}
export default ShowDates;

const DateCard = ({ set, get, data }) => {
    const [selected, setSelected] = useState(false);
    const [formatted, setFormatted] = useState('')
    useEffect(() => {
        setFormatted(formatDate(data))
    }, [])

    const formatDate = (dateString) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const parts = dateString.split('/');
        const day = parts[0];
        const monthIndex = parseInt(parts[1]) - 1;
        const month = months[monthIndex];
        const year = parts[2];
        return `${day} ${month} ${year}`;
    }

    const handleSelect = () => {
        let updatedSelectedArray = [...get];
        if (selected) { updatedSelectedArray = updatedSelectedArray.filter((item) => item !== data); setSelected(false) }
        else { updatedSelectedArray.push(data); setSelected(true) }
        set(updatedSelectedArray);
    }

    return (
        <TouchableOpacity style={[styles.date, { backgroundColor: selected ? '#a0a0a0' : '#e0e0e0', }]}
            activeOpacity={0.5}
            onPress={handleSelect}
        >
            {selected && <Image source={Check} style={[GlobalStyles.image, { position: 'absolute', zIndex: 1 }]} />}
            <Text style={[GlobalStyles.semiBoldText, { fontSize: 12, color: selected ? '#363636' : '#000' }]}>{formatted.split(' ')[0] + " " + formatted.split(' ')[1]}</Text>
            <Text style={[GlobalStyles.boldText, { color: selected ? '#363636' : '#000' }]}>{formatted.split(' ')[2]}</Text>
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