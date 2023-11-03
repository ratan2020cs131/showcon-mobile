import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import GlobalStyles from '../GlobalStyles';

const PaymentSummary = ({ data }) => {
    const { title, totalticket, cinema, schedule, choose } = data;
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'column', paddingVertical: 15}}>
                <Text style={[GlobalStyles.boldText, { fontSize: 15 }]}>{title}</Text>
                <Text style={[GlobalStyles.normalText, { fontSize: 13 }]}>{cinema}</Text>
                <Text style={[GlobalStyles.semiBoldText, { fontSize: 13 }]}>{schedule}</Text>
                <Text style={[GlobalStyles.normalText, { fontSize: 13 }]}>Seats:{" "}
                {
                    choose.map((item,index)=>(
                        <Text key={index} style={[GlobalStyles.semiBoldText, { fontSize: 13 }]}>
                            {item.row+""+item.no+", "}
                        </Text>
                    ))
                }
                </Text>
                <Text style={[GlobalStyles.boldText, { fontSize: 23, marginTop:17, color:'#F55139', paddingLeft:5 }]}>₹459</Text>
            </View>
            <View style={styles.ticket}>
                <View style={[styles.dot, styles.dotUp]}></View>
                <Text style={[GlobalStyles.boldText, { fontSize: 15 }]}>{totalticket}</Text>
                <View style={[styles.dot, styles.dotBottom]}></View>
            </View>
        </View>
    )
}

export default PaymentSummary;

const styles = StyleSheet.create({
    container: {
        overflow:'hidden',
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 50,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
        shadowRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ticket: {
        position:'relative',
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#a1a1a1',
        borderStyle: 'dashed'
    },
    dot:{
        position:'absolute',
        height:18,
        width:18,
        backgroundColor:'#e1e1e1',
        borderRadius:100
    },
    dotUp:{
        top:-14,
        left:-10
    },
    dotBottom:{
        bottom:-14,
        left:-10
    }
})
