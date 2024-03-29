import { StyleSheet, View, Text } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import SeatIcon from "./SeatIcon";


const Seats = ({ data, setChoose, choose }) => {
    const { row, seats } = data;
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={[styles.rowtext, GlobalStyles.semiBoldText]}>{row}</Text>
                <View style={styles.seating}>
                    {
                        seats.map((item, index) => {
                            return item >= 0 ? <SeatIcon key={index} data={item} row={row} choose={choose} setChoose={setChoose} />
                                : <View style={styles.space} key={index}/>
                        })
                    }
                </View>
            </View>
        </View>
    )
}

export default Seats;

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    row: {
        flexDirection: "row",
        alignItems: 'center',
    },
    rowtext: {
        width: 26,
        paddingRight: 10,
        fontSize: 15,
        lineHeight: 25
    },
    space: {
        width: 18,
        height: 18,
        opacity: 0,
        borderRadius: 2,
    },
    seating: {
        flexDirection: 'row',
        gap: 8
    }
})