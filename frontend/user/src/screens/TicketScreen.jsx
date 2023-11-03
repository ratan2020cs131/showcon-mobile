import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import GlobalStyles from '../GlobalStyles';

const TicketScreen = ({ route }) => {
    const bookedSeats = ['A1', 'B1'];
    const date = "28 Oct";
    const { cinema, choose, title, schedule } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.ticketContainer}>
                <View style={styles.qrContainer}>
                    <View style={[styles.dot1, styles.dotup]} />
                    <View style={[styles.dot2, styles.dotdown]} />
                    <View style={styles.qrCode}>
                        <Image source={require('../../assets/images/qrcode.png')} style={styles.image} />
                    </View>
                </View>

                <View style={styles.row2}>
                    <Text style={[GlobalStyles.boldText, { fontSize: 20 }]}>{title}</Text>
                    <Text style={[GlobalStyles.normalText, { fontSize: 16, textAlign:'center' }]}>Seats : {" "}
                        {
                            choose.map((item, index) => (
                                <Text key={index} style={[GlobalStyles.semiBoldText, { fontSize: 16, }]}>
                                    {item.row + "" + item.no + ", "}
                                </Text>
                            ))
                        }
                    </Text>
                    <Text style={[GlobalStyles.semiBoldText]}>{schedule}</Text>
                    <Text style={[GlobalStyles.normalText, { textAlign: 'center' }]}>{cinema}</Text>
                    <Text style={[GlobalStyles.boldText,{fontSize:30, marginTop:30,marginBottom:10 }]}>{choose.length}</Text>
                </View>
            </View>
            <View style={{width:'60%'}}>
                    <Text style={[GlobalStyles.normalText, {textAlign:'center', fontSize:20}]}>Tickets for 
                    <Text style={[GlobalStyles.boldText]}>{" "+title+" "}</Text>
                    has been Booked</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop:80,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    qrCode: {
        backgroundColor:'red',
        height: 200,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row2: {
        height: '50%',
        width: '100%',
        paddingHorizontal:37,
        alignItems: 'center',
        justifyContent: 'center',
        gap:1
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
        position:'relative',
        padding:30,
        height:'50%'
    },
    ticketContainer:{ 
        overflow:'hidden',
        backgroundColor: '#fff', 
        borderRadius: 20, 
        width: 250,
        height:500,
        justifyContent: 'space-between', 
        alignItems: 'center', 
        elevation:5
    }

});

export default TicketScreen;
