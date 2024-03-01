import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native"
import GlobalStyles from "../../GlobalStyles";
import { Ionicons, Entypo } from '@expo/vector-icons'
import { useEffect, useState } from "react";

const Seating = ({ set }) => {
    const [rows, setRows] = useState(0);
    const [cols, setCols] = useState(0);
    const [finalMap, setFinalMap] = useState([]);
    useEffect(() => set('seatmap', finalMap), [finalMap])

    return (
        <View style={styles.conatiner}>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <Text style={[GlobalStyles.semiBoldText, { fontSize: 15 }]}>Set seating map</Text>

                <View style={{ marginVertical: 5 }}>
                    <View style={styles.adder}>
                        <TouchableOpacity
                            style={styles.addRemBtn}
                            onPress={() => { rows > 0 && setRows(rows - 1) }}>
                            <Entypo name="minus" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center', height: '100%', justifyContent: 'center', gap: -4 }}>
                            <Text style={[GlobalStyles.semiBoldText, { fontSize: 16, color: '#F55139' }]}>{rows}</Text>
                            <Text style={[GlobalStyles.normalText, { fontSize: 10 }]}>Row</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.addRemBtn}
                            onPress={() => { rows < 16 && setRows(rows + 1) }}>
                            <Entypo name="plus" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.adder}>
                        <TouchableOpacity
                            style={styles.addRemBtn}
                            onPress={() => { cols > 0 && setCols(cols - 1) }}>
                            <Entypo name="minus" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center', height: '100%', justifyContent: 'center', gap: -4 }}>
                            <Text style={[GlobalStyles.semiBoldText, { fontSize: 16, color: '#F55139' }]}>{cols}</Text>
                            <Text style={[GlobalStyles.normalText, { fontSize: 10 }]}>Column</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.addRemBtn}
                            onPress={() => { cols < 20 && setCols(cols + 1) }}>
                            <Entypo name="plus" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.screen}></View>
                <Text style={[GlobalStyles.normalText, { fontSize: 12, marginTop: 8 }]}>Screen this way</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    nestedScrollEnabled={true}
                    style={{ maxWidth: '100%', marginTop: 15, minHeight: 100 }}
                    contentContainerStyle={{ alignItems: 'center', flexDirection: 'column' }}
                >
                    {rows * cols === 0 ?
                        <Text
                            style={[GlobalStyles.semiBoldText, { color: '#d0d0d0', width: 150, textAlign: 'center' }]}
                            numberOfLines={2}
                        >Add columns & rows to start mapping</Text> :
                        <EmptyMapping row={rows} col={cols} set={setFinalMap} get={finalMap} />
                    }
                </ScrollView>
            </View>
        </View>
    )
}
export default Seating;



const EmptyMapping = ({ row, col, set, get }) => {
    const [seatMap, setSeatMap] = useState([]);
    const handleMap = () => {
        setSeatMap([])
        for (let i = 0; i < row; i++) {
            let rows = { row: '', seats: [] }
            rows.row = String.fromCharCode(65 + i);
            for (let j = 1; j <= col; j++) {
                rows.seats.push(j);
            }
            setSeatMap((prev) => [...prev, rows])
        }
    }
    useEffect(() => { handleMap() }, [row, col])


    return (
        <View style={{ alignItems: 'center', gap: 7, paddingBottom: 17, paddingRight: 15 }}>
            {seatMap.map((item, index) => (
                <View key={index} style={styles.seatRow}>
                    <Text style={[GlobalStyles.semiBoldText, { width: 20 }]}>{item.row}</Text>
                    {item.seats.map((seat) =>
                        <Seat key={`${row}${seat}`} row={item.row} seat={seat} set={set} get={get} />
                    )}
                </View>
            ))
            }
        </View>
    )
}


const Seat = ({ row, seat, set, get }) => {
    const [select, setSelect] = useState(false);
    const handleSeatClick = (rowNumber, seatNumber) => {
        const updatedSeats = [...get];
        // Check if the seat is already selected
        const isSelected = updatedSeats.some(seat => seat?.row === rowNumber && seat?.seats.includes(seatNumber));
        if (isSelected) {
            // If seat is already selected, remove it
            const updatedRow = updatedSeats.find(seat => seat.row === rowNumber);
            updatedRow.seats = updatedRow.seats.filter(seat => seat !== seatNumber);
            // If there are no more seats selected in the row, remove the row from selectedSeats
            if (updatedRow.seats.length === 0) {
                set(updatedSeats.filter(seat => seat.row !== row));
            } else {
                set(updatedSeats);
            }
        } else {
            // If seat is not selected, add it
            const updatedRow = updatedSeats.find(seat => seat.row === row) || { row, seats: [] };
            updatedRow.seats = [...updatedRow.seats, seatNumber];
            // If the row is not in selectedSeats, add it
            if (!updatedSeats.some(seat => seat.row === row)) {
                updatedSeats.push(updatedRow);
            }
            set(updatedSeats);
        }
    };



    return (
        <TouchableOpacity style={select ? styles.seatCheck : styles.seatUncheck}
            activeOpacity={0.3}
            onPress={() => {
                setSelect(!select)
                handleSeatClick(row, seat);
            }}
        ></TouchableOpacity>
    )
}




const styles = StyleSheet.create({
    conatiner: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        paddingTop: 25,
    },
    screen: {
        width: 200,
        height: 6,
        backgroundColor: "#1E90FF",
    },
    adder: {
        flexDirection: 'row',
        width: 120,
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5
    },
    seatUncheck: {
        height: 18,
        width: 18,
        borderWidth: 1,
        borderColor: '#F55139',
        borderRadius: 3,
    },
    seatCheck: {
        height: 18,
        width: 18,
        borderWidth: 1,
        borderColor: '#F55139',
        backgroundColor: '#F55139',
        borderRadius: 3,
    },
    seatRow: {
        flexDirection: 'row',
        gap: 7,
    },
    addRemBtn: {
        borderRadius: 3,
        backgroundColor: '#e0e0e0'
    }
})