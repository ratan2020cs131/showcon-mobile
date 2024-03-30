import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import { useState } from "react";
import ModalView from "../Modal";
import { useDispatch } from "react-redux";
import { resetCinema } from "../../Redux/Features/Movie/movieSlice";

const Place = ({ id, data, navigation, title }) => {
    const dispatch = useDispatch();

    const formatDate = (dateString) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const parts = dateString.split('/');
        const day = parts[0];
        const monthIndex = parseInt(parts[1]) - 1;
        const month = months[monthIndex];
        const year = parts[2];

        return `${day} ${month}`;
    }
    const [box, setBox] = useState();
    const [modal, setModal] = useState(false);
    const [schedule, setSchedule] = useState();
    const [seatmap, setSeatmap] = useState()

    onClose = () => setModal(false)

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={[GlobalStyles.semiBoldText, styles.heading]}>{title}</Text>
                <View style={styles.boxcontainer}>
                    {
                        data.screen.map((item, index) => (
                            <TouchableOpacity style={[styles.box, index === box ? styles.seletedBox : '']} key={index}
                                onPress={() => {
                                    if (box === index) {
                                        setBox(undefined)
                                    } else {
                                        setBox(index)
                                        setSchedule(item?.slots?.time + " " + item?.slots?.booking?.dates[0]);
                                        setSeatmap(item.seatmap);
                                    }
                                }}
                            >
                                <Text style={[GlobalStyles.semiBoldText, styles.month, index === box ? styles.selectedDate : '']}>{item?.slots?.time}</Text>
                                <Text style={[GlobalStyles.semiBoldText, styles.date]}>{formatDate(item?.slots?.booking?.dates[0])}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>

            <TouchableOpacity style={[GlobalStyles.buttonOutlined, styles.button]}
                activeOpacity={0.2}
                onPress={() => {
                    dispatch(resetCinema());
                    box >= 0 ? navigation.navigate("SeatScreen", { seatmap, screen: data.screen, schedule, id, title }) : setModal(true);
                }}
            >
                <Text style={[GlobalStyles.boldText, styles.btntext]}>BOOK</Text>
            </TouchableOpacity>

            <ModalView visible={modal} onClose={onClose} title="Select a Date to book Ticket" />
        </View>
    )
}

export default Place;

const styles = StyleSheet.create({
    container: {
        maxWidth: 350,
        width: "97%",
        padding: 10,
        borderRadius: 7,
        backgroundColor: "#fff",
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
        elevation: 2,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    title: {
        flex: 8
    },
    heading: {
        width: "100%",
    },
    button: {
        flex: 2,
        height: 35,
    },
    btntext: {
        fontSize: 12,
        color: "#F55139",
    },
    boxcontainer: {
        flexDirection: "row",
        paddingVertical: 10,
        gap: 10,
        flexWrap: 'wrap'
    },
    selectedDate: {
        color: '#000'
    },
    box: {
        height: 40,
        width: 75,
        borderColor: '#1E1F22',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    seletedBox: {
        backgroundColor: '#F55139',
        height: 40,
        width: 75,
        borderColor: '#F55139',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    date: {
        fontSize: 10,
        lineHeight: 12,
    },
    month: {
        lineHeight: 10,
        fontSize: 10,
        color: '#707070',
    }
})