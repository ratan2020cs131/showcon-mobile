import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ScreenWrapper from './ScreenWrapper';
import Card from '../components/CardC/Card';
import PaytmLogo from '../../assets/images/paytm-logo.png';
import RazorLogo from '../../assets/images/razorpay-logo.png';
import UpiLogo from '../../assets/images/upi-logo.png';
import PaymentSummary from '../components/PaymentSummary';
import GlobalStyles from '../GlobalStyles';

const PaymentScreen = ({ navigation, route }) => {
    const { cinema, choose, title, schedule } = route.params;
    const [select, setSelect] = useState(0);

    useEffect(() => {
        console.log(title);
    }, [])

    const handlePay=()=>{
        navigation.navigate("TicketScreen", { cinema, choose, title, schedule });
    }

    return (
        <ScreenWrapper title={title}>
            <View style={styles.container}>
                <View style={{ width: '100%'}}>
                    {
                        cardArray.map((item, index) => (
                            <Card key={item.title} data={item} select={select === index} setSelect={setSelect} index={index} />
                        ))
                    }
                    <PaymentSummary data={{ title, totalticket: choose.length, cinema, schedule, choose }} />
                </View>
                <TouchableOpacity activeOpacity={0.5} style={[GlobalStyles.button,{width:'95%'}]} onPress={handlePay}>
                    <Text style={[GlobalStyles.boldText]}>PAY NOW</Text>
                </TouchableOpacity>
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
        justifyContent:'space-between',
        alignItems:'center'
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
