import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import { useState } from "react";
import ModalView from "../Modal";

const Place = ({ data,navigation }) => {
    const { cinema, date } = data;
    const [box, setBox] = useState();
    const [modal, setModal]=useState(false);

    onClose=()=>setModal(false)

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={[GlobalStyles.semiBoldText, styles.heading]}>{cinema}</Text>
                <View style={styles.boxcontainer}>
                    {
                        date.map((item, index) => (
                            <TouchableOpacity style={[styles.box, index===box?styles.seletedBox:'']} key={index}
                            onPress={()=>{
                                if(box===index){
                                    setBox(undefined)    
                                }else{
                                setBox(index)
                            }
                            }}
                            >
                                <Text style={[GlobalStyles.semiBoldText, styles.date]}>{item.title}</Text>
                                <Text style={[styles.month, index===box?styles.selectedDate:'']}>{item.month}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>

            <TouchableOpacity style={[GlobalStyles.buttonOutlined, styles.button]}
            activeOpacity={0.2}
            onPress={()=>{
                box>=0?navigation.navigate("SeatScreen"):setModal(true);
            }}
            >
                <Text style={[GlobalStyles.boldText, styles.btntext]}>BOOK</Text>
            </TouchableOpacity>

            <ModalView visible={modal} onClose={onClose} title="Select a Date to book Ticket"/>
        </View>
    )
}

export default Place;

const styles = StyleSheet.create({
    container: {
        maxWidth: 350,
        width: "97%",
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
        elevation: 2,
        flexDirection: "row",
        alignItems: "center",
        marginVertical:5,
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
        gap:10
    },
    selectedDate:{
        color:'#000'
    },
    box: {
        height: 35,
        width: 35,
        borderColor: '#1E1F22',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    seletedBox:{
        backgroundColor:'#F55139',
        height: 35,
        width: 35,
        borderColor: '#F55139',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    date: {
        fontSize: 12,
        lineHeight: 12,
    },
    month: {
        lineHeight: 10,
        fontSize: 10,
        color: '#707070',
    }
})