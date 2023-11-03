import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import ScreenWrapper from './ScreenWrapper';
import Card from '../components/CardC/Card';
import PaytmLogo from '../../assets/images/paytm-logo.png';
import RazorLogo from '../../assets/images/razorpay-logo.png';
import UpiLogo from '../../assets/images/upi-logo.png';
import PaymentSummary from '../components/PaymentSummary';
import GlobalStyles from '../GlobalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { createTicket, ticket } from '../Redux/Features/Tickets/ticketSlice';

const PaymentScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const ticketState = useSelector(ticket);

    const { cinema, choose, title, schedule } = route.params;
    const [select, setSelect] = useState(0);

    useEffect(() => {
        if (ticketState.ticket) {
            let data = ticketState.ticket;
            navigation.navigate("TicketScreen", { data });
        }
    }, [ticketState.ticket])

    const handlePay = () => {
        let seats = [];
        choose.forEach((item) => {
            seats.push(item.row + "" + item.no);
        })

        dispatch(createTicket({
            movie: title,
            time: schedule,
            venue: cinema,
            total: choose.length,
            seats: seats,
            price: 459
        }))
    }

    return (
        <ScreenWrapper title={title}>
            <View style={styles.container}>
                <View style={{ width: '100%' }}>
                    {
                        cardArray.map((item, index) => (
                            <Card key={item.title} data={item} select={select === index} setSelect={setSelect} index={index} />
                        ))
                    }
                    <PaymentSummary data={{ title, totalticket: choose.length, cinema, schedule, choose }} />
                </View>
                {
                    ticketState.isLoading ?
                        <View
                            style={{
                                marginTop: 100,
                                width: "auto",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <ActivityIndicator size="large" color="#F55139" />
                        </View>
                        :
                        <TouchableOpacity activeOpacity={0.5} style={[GlobalStyles.button, { width: '95%' }]} onPress={handlePay}>
                            <Text style={[GlobalStyles.boldText]}>PAY NOW</Text>
                        </TouchableOpacity>
                }
            </View>
        </ScreenWrapper>
    )
}

export default PaymentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

const cardArray = [
    {
        image: RazorLogo,
        title: "RazorPay",
        subtitle: "Pay seamlessly with RazorPay"
    },
    {
        image: UpiLogo,
        title: "UPI",
        subtitle: "Scan any QR-code"
    },
    {
        image: PaytmLogo,
        title: "Paytm",
        subtitle: "Paytm Postpaid to any Wallet"
    }
]
