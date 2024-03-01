import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView } from "react-native"
import GlobalStyles from "../GlobalStyles";
import { useState } from "react";
import { Entypo, MaterialIcons } from '@expo/vector-icons';

const TicketModal = ({data, visible, close }) => {
    const SEATS = 3;
    const [count, setCount] = useState(SEATS);
    const inc = () => count < 3 && setCount(count + 1)
    const dec = () => count > 1 && setCount(count - 1)


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={close}
        >
            <View style={styles.conatiner}>
                <ScrollView
                    contentContainerStyle={{ alignItems: 'center', gap: 10, }}
                >
                    <View style={styles.ticket}>
                        <TouchableOpacity style={{ position: 'absolute', right: 0 }}
                            onPress={close}
                        >
                            <MaterialIcons name="close" size={20} color="#000" />
                        </TouchableOpacity>
                        <View style={{ width: 120, height: 120, backgroundColor: 'grey', marginVertical: 20, }}></View>
                        <View style={{ width: '100%', borderBottomWidth: 1, borderStyle: 'dashed', marginBottom: 10, }}></View>
                        <Text style={[GlobalStyles.boldText, { textAlign: 'center', fontSize: 25, color: '#00A550' }]}>VALID</Text>
                        <Text style={[GlobalStyles.boldText, { textAlign: 'center', fontSize: 25, color: '#fd5c63' }]}>EXPIRED</Text>
                        <View style={{ marginTop: 20, width: '100%', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={[GlobalStyles.semiBoldText, { fontSize: 17 }]} numberOfLines={2}>Harry Potter and the Philospher Stone</Text>
                            <Text style={GlobalStyles.normalText}>22 Jan, 2024 10:25 PM</Text>
                            <View>
                                <Text>Seats: A1, A3, A3</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 10 }}>
                                <TouchableOpacity
                                    style={styles.addRemBtn}
                                    onPress={dec}>
                                    <Entypo name="minus" size={24} color="black" />
                                </TouchableOpacity>
                                <Text style={[GlobalStyles.boldText, { fontSize: 27, width: 20, textAlign: 'center' }]}>{count}</Text>
                                <TouchableOpacity
                                    style={styles.addRemBtn}
                                    onPress={inc}>
                                    <Entypo name="plus" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <Text style={GlobalStyles.normalText}>Total Seats: 3</Text>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.4} style={[GlobalStyles.button, { width: 130 }]}>
                        <Text style={GlobalStyles.boldText}>Validate</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </Modal>
    )
}
export default TicketModal;

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ticket: {
        overflow: 'visible',
        backgroundColor: '#fff',
        borderRadius: 7,
        alignItems: 'center',
        width: 220,
        marginTop: 80,
        position: 'relative'
    },
    addRemBtn: {
        borderRadius: 3,
        backgroundColor: '#e0e0e0'
    }
})