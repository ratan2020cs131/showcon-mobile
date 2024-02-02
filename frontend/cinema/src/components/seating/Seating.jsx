import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native"
import GlobalStyles from "../../GlobalStyles";
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from "react";

const Seating = () => {
    const [rows, setRows] = useState(0);
    const [cols, setCols] = useState(0);


    return (
        <View style={styles.conatiner}>

            <View style={{ width: '100%', alignItems: 'center' }}>
                <Text style={[GlobalStyles.semiBoldText, { fontSize: 15 }]}>Set seating map</Text>

                <View style={{ marginVertical: 5 }}>

                    <View style={styles.adder}>
                        <TouchableOpacity onPress={() => { rows > 0 && setRows(rows - 1) }}>
                            <Ionicons name="remove-circle-outline" size={30} color="black" />
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center', height: '100%', justifyContent: 'center', gap: -4 }}>
                            <Text style={[GlobalStyles.semiBoldText, { fontSize: 16, color: '#F55139' }]}>{rows}</Text>
                            <Text style={[GlobalStyles.normalText, { fontSize: 10 }]}>Row</Text>
                        </View>
                        <TouchableOpacity onPress={() => { rows < 16 && setRows(rows + 1) }}>
                            <Ionicons name="add-circle-outline" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.adder}>
                        <TouchableOpacity onPress={() => { cols > 0 && setCols(cols - 1) }}>
                            <Ionicons name="remove-circle-outline" size={30} color="black" />
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center', height: '100%', justifyContent: 'center', gap: -4 }}>
                            <Text style={[GlobalStyles.semiBoldText, { fontSize: 16, color: '#F55139' }]}>{cols}</Text>
                            <Text style={[GlobalStyles.normalText, { fontSize: 10 }]}>Column</Text>
                        </View>
                        <TouchableOpacity onPress={() => { cols < 20 && setCols(cols + 1) }}>
                            <Ionicons name="add-circle-outline" size={30} color="black" />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.screen}></View>
                <Text style={[GlobalStyles.normalText, { fontSize: 12, marginTop: 8 }]}>Screen this way</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    nestedScrollEnabled={true}
                    style={{ maxWidth: '100%', marginTop: 15 }}
                    contentContainerStyle={{ alignItems: 'center', flexDirection: 'column' }}
                >
                    <EmptyMapping row={rows} col={cols} />
                </ScrollView>
            </View>
        </View>
    )
}
export default Seating;



const EmptyMapping = ({ row, col }) => {
    const [finalMap, setFinalMap] = useState([]);
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
        <View style={{ alignItems: 'center', gap: 7, paddingBottom: 17 }}>
            {seatMap.map((item, index) => (
                <View key={index} style={styles.seatRow}>
                    <Text style={[GlobalStyles.semiBoldText, {width:20}]}>{item.row}</Text>
                    {item.seats.map((seat) =>
                        <Seat key={`${row}${seat}`} row={item.row} seat={seat} set={setFinalMap} get={finalMap} />
                    )}
                </View>
            ))
            }
        </View>
    )
}


const Seat = ({ row, seat, set, get }) => {
    const [select, setSelect] = useState(false);

    return (
        <TouchableOpacity style={select ? styles.seatCheck : styles.seatUncheck}
            activeOpacity={0.3}
            onPress={() => {
                console.log(`Seat: ${row}${seat}`)
                if (!select) setSelect(true);
                else setSelect(false)
            }}
        ></TouchableOpacity>
    )
}




const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        paddingTop: 25
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
    }
})