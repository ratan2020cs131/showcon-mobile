import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import GlobalStyles from '../GlobalStyles';

const TicketScreen = () => {
    const moviename = "ABCD";
    const location = "NOIDA";
    const bookedSeats = ['A1', 'B1'];
    const date = "28 Oct";

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#fff', borderRadius: 20, width: '70%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={[styles.dot1, styles.dotup]} />
                <View style={[styles.dot2, styles.dotdown]} />
                <View style={styles.row1}>
                    <Image source={require('../../assets/images/qrcode.png')} style={styles.image} />
                </View>
                <View style={{
                    width: '80%',
                    justifyContent: 'center',
                    borderLeftWidth: 1,
                    alignItems:'center',
                    borderLeftColor: '#ccc',
                    transform: [{rotate:'90deg'}]
                }} />
                <View style={styles.row2}>
                    <Text style={[GlobalStyles.boldText]}>{moviename}</Text>
                    <Text style={[GlobalStyles.normalText]}>{location}</Text>
                    <Text style={[GlobalStyles.normalText]}>Seats: {bookedSeats.join(', ')}</Text>
                    <Text style={[GlobalStyles.normalText]}>{date}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row1: {
        height: '50%',
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row2: {
        height: '35%',
        width: '70%',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    dotdown: {
        height: 20,
        width: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "#EEEEEE",
        alignItems: 'center',
        justifyContent: 'center'
    },
    dotup: {
        height: 20,
        width: 20,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: "#EEEEEE",
        alignItems: 'center',
        justifyContent: 'center'
    },
    dot1: {
        position: 'absolute',
        bottom: 200,
        left: 0,
        transform: [{ rotate: '270deg' }]
    },
    dot2: {
        position: 'absolute',
        bottom: 200,
        right: 0,
        transform: [{ rotate: '270deg' }]
    }

});

export default TicketScreen;
