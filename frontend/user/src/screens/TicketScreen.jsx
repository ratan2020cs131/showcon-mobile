import React, { useEffect, useRef } from 'react';
import { PermissionsAndroid, View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalStyles from '../GlobalStyles';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch } from 'react-redux';
import { resetTicket } from '../Redux/Features/Tickets/ticketSlice';

const TicketScreen = ({ route }) => {
    const dispatch = useDispatch();
    const { total, venue, seats, movie, time } = route.params.data;

    useEffect(() => {
        dispatch(resetTicket());
    }, [])


    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ height: '100%', width: '100%', paddingHorizontal: 10, paddingTop: 30, }}
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between', gap: 60 }}
            >
                <View style={styles.ticketContainer}>
                    <View style={styles.qrContainer}>
                        <View style={[styles.dot1, styles.dotup]} />
                        <View style={[styles.dot2, styles.dotdown]} />
                        <View style={styles.qrCode}>
                            {/* <Image source={require('../../assets/images/qrcode.png')} style={styles.image} /> */}
                            <QRCode value={JSON.stringify({ total, venue, seats, movie, time })} size={150} />
                        </View>
                    </View>

                    <View style={styles.row2}>
                        <Text style={[GlobalStyles.boldText, { textAlign: 'center' }, { fontSize: 20 }]}>{movie}</Text>
                        <Text style={[GlobalStyles.normalText, { fontSize: 16, textAlign: 'center' }]}>Seats : {" "}
                            {
                                seats.map((item, index) => (
                                    <Text key={index} style={[GlobalStyles.semiBoldText, { fontSize: 16, }]}>
                                        {index === seats.length - 1 ? item : item + ','}
                                    </Text>
                                ))
                            }
                        </Text>
                        <Text style={[GlobalStyles.semiBoldText, { textAlign: 'center' }]}>{time}</Text>
                        <Text style={[GlobalStyles.normalText, { textAlign: 'center' }]}>{venue}</Text>
                        <Text style={[GlobalStyles.boldText, { fontSize: 30, marginTop: 30, marginBottom: 10 }]}>{total}</Text>
                    </View>
                </View>
                {/* <View style={{ width: '60%' }}>
                    <Text style={[GlobalStyles.normalText, { textAlign: 'center', fontSize: 20 }]}>Tickets for
                        <Text style={[GlobalStyles.boldText]}>{" " + movie + " "}</Text>
                        has been Booked
                    </Text>
                </View> */}
            </ScrollView>
            <TouchableOpacity activeOpacity={0.5} style={[GlobalStyles.button, { width: '90%', marginVertical: 20 }]}>
                <Text style={[GlobalStyles.boldText]}>DOWNLOAD TIKCET</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    qrCode: {
        height: 200,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row2: {
        height: '50%',
        width: '100%',
        paddingHorizontal: 37,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    dotdown: {
        height: 20,
        width: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "#E0E0E0",
        alignItems: 'center',
        justifyContent: 'center'
    },
    dotup: {
        height: 20,
        width: 20,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: "#E0E0E0",
        alignItems: 'center',
        justifyContent: 'center'
    },
    dot1: {
        position: 'absolute',
        bottom: -11,
        left: 0,
        transform: [{ rotate: '270deg' }]
    },
    dot2: {
        position: 'absolute',
        bottom: -11,
        right: 0,
        transform: [{ rotate: '270deg' }]
    },
    qrContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        borderBottomColor: '#a1a1a1',
        position: 'relative',
        padding: 30,
        height: '50%'
    },
    ticketContainer: {
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderRadius: 20,
        width: 250,
        height: 500,
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 5,
        marginVertical: 50,
    }

});

export default TicketScreen;
