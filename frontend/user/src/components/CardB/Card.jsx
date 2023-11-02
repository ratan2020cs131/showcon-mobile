import { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import GlobalStyles from '../../GlobalStyles';
import ModalView from "./QRModal";

const Card = ({ item }) => {
    const { thumbnail, moviename, location, bookedSeats, qrcode, date } = item;

    const [modal, setModal]=useState(false);
    onClose=()=>setModal(false)

    return (
        <TouchableOpacity style={styles.item} onPress={()=>setModal(true)}>
            <View style={styles.column1}>
                <Image style={styles.thumbnail} source={thumbnail} />
            </View>
            <View style={styles.column2}>
                <View style={styles.row1}>
                    <Text style={[styles.movieName, GlobalStyles.boldText]}>{moviename}</Text>
                    <Text style={[styles.location, GlobalStyles.normalText]}>{location}</Text>
                    <View style={styles.bookedSeatsColumn}>
                        <Text style={[GlobalStyles.normalText, styles.bookedSeatsText]}>Seats : </Text>
                        <View style={styles.bookedSeatsContainer}>
                            {
                                bookedSeats.map((seat, index) => (
                                    <Text key={index} style={[styles.bookedSeat, GlobalStyles.normalText]}>
                                        {seat},
                                    </Text>
                                )
                                )}
                        </View>
                    </View>
                    <Text style={[styles.location, GlobalStyles.normalText]}>Date: {date}</Text>
                </View>
            </View>
            <View style={styles.column3}>
                <View style={styles.qrcontainer}>
                <Image style={styles.barcode} source={qrcode} />
                </View>
            </View>
            <ModalView visible={modal} onClose={onClose} qr={qrcode}/>
        </TouchableOpacity>
    );
}

export default Card;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 10,
        marginBottom:0,
        padding: 10,
        borderRadius: 5,
        height: 130,
        backgroundColor: '#fff',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
        elevation: 3,
        justifyContent:'space-between'
    },
    column1: {
        width: 85,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        resizeMode: 'cover'
    },
    column2: {
        width: '52%',
        height: '100%',
        paddingLeft: 5,
        paddingTop:10,
    },
    row1: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 5,
        paddingTop:0,
    },
    movieName: {
        fontSize: 14,
    },
    location: {
        fontSize: 13,
        color: '#777',
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bookedSeatsColumn: {
        width: '100%',
        flexDirection: 'row',
    },
    bookedSeatsText: {
        fontSize: 13,
        fontWeight: '600',
    },
    bookedSeatsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    bookedSeat: {
        padding: 2,
        fontSize: 11
    },
    column3:{
        height:'100%',
        width:'25%',
        padding:10,
        justifyContent:'center',
        borderLeftWidth:1,
        borderLeftColor:'#ccc'
    },
    qrcontainer:{
        height:70,
        width:70
    },
    barcode: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        resizeMode:'cover'
    },
})