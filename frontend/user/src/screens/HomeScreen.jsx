import React, { useState } from 'react';
import { Dimensions, Modal, Pressable, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker"
import ScreenWrapper from './ScreenWrapper';
import GlobalStyles from '../GlobalStyles';
import Popular from '../components/Home/Poupular';
import Result from '../components/Home/Result';


const HomeScreen = ({ navigation }) => {

    const windowWidth = Dimensions.get('window').width;

    const [date, setDate] = useState('Date');
    const [time, setTime] = useState('Time');
    const [placeholder, setPlaceholder] = useState('Pickup Show Time')
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        if (selectedDate) {
            console.log(selectedDate.toDateString())
            setDate(selectedDate.toDateString());
        }
        setShowDatePicker(false);
    };

    const onChangeTime = (event, selectedTime) => {
        if (selectedTime) {
            console.log(selectedTime.toTimeString().split(' ')[0]);
            setTime(selectedTime.toTimeString().split(' ')[0]);
        }
        setShowTimePicker(false);
    };

    return (
        <ScreenWrapper title="Home">
            {modalVisible ? (
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.iconAndTextContainer}>
                                    <View style={styles.calendarContainer}>
                                        <Pressable
                                            onPress={() => setShowDatePicker(true)}
                                            style={styles.iconTextWrapper}>
                                            <Feather name="calendar" size={55} color="#F55139" />
                                            <Text
                                                style={[
                                                    GlobalStyles.normalText, { marginTop: 10, textAlign: 'center' },
                                                    date == 'Date'
                                                        ? { color: '#8b8981' }
                                                        : { color: 'black' },
                                                ]}>
                                                {date}
                                            </Text>
                                        </Pressable>
                                        {showDatePicker && (
                                            <DateTimePicker
                                                mode="date"
                                                display="default"
                                                value={new Date()}
                                                onChange={onChangeDate}
                                            />
                                        )}
                                    </View>
                                    <View style={styles.line} />
                                    <View style={styles.clockContainer}>
                                        <Pressable
                                            onPress={() => setShowTimePicker(true)}
                                            style={styles.iconTextWrapper}>
                                            <Feather name="clock" size={55} color="#F55139" />
                                            <Text
                                                style={[
                                                    GlobalStyles.normalText, { marginTop: 10, textAlign: 'center' },
                                                    time == 'Time'
                                                        ? { color: '#8b8981' }
                                                        : { color: 'black', textAlign: 'center' },
                                                ]}>
                                                {time}
                                            </Text>
                                            {showTimePicker && (
                                                <DateTimePicker
                                                    mode="time"
                                                    display="default"
                                                    value={new Date()}
                                                    onChange={onChangeTime}
                                                />
                                            )}
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={styles.confirmContainer}>
                                    <TouchableOpacity
                                        style={[GlobalStyles.button, styles.confirmButton]}
                                        onPress={() => {
                                            setModalVisible(!modalVisible);
                                            console.log(!modalVisible);
                                            setPlaceholder(`${date} at ${time}`)// Use this for confirmation
                                        }}
                                    >
                                        <Text style={[GlobalStyles.boldText, {color:"#E9E5D7"}]}>CONFIRM</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            ) :
                (

                    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} nestedScrollEnabled={true} >
                        {/* time */}
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity style={[GlobalStyles.picker, { width: windowWidth - 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5, marginVertical: 10, }]} onPress={() => setModalVisible(!modalVisible)}>
                                <View style={{ flex: 1 }}>
                                    <Text style={[GlobalStyles.boldText, (placeholder === 'Pickup Show Time') ? { color: '#8b8981' } : { color: '#F55139' }]}>{placeholder}</Text>
                                </View>
                                <View style={{ position: 'relative', justifyContent: 'center', borderLeftWidth: 2, borderColor: '#1E1F22', height: '100%', paddingHorizontal: 5 }}>
                                    <Ionicons name="calendar" style={{ fontSize: 26, color: '#1E1F22' }}></Ionicons>
                                </View>

                            </TouchableOpacity>
                        </View>
                        {
                            placeholder !== 'Pickup Show Time' ?
                                <Result navigation={navigation} /> : null
                        }
                        <Popular navigation={navigation} />
                    </ScrollView>
                )}
        </ScreenWrapper>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    item: {
        width: 150,
        height: 150,
        margin: 10,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    titleContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 5,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    titleText: {
        color: 'white',
        textAlign: 'center',

    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    iconAndTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Add this to distribute space evenly
        alignItems: 'center', // Center items vertically
    },
    calendarContainer: {
        width: '45%', // Adjust width
        padding: 10, // Add padding for spacing
        textAlign: 'center',
        justifyContent: "center"
    },
    line: {
        height: '100%',
        width: 3,
        backgroundColor: '#E9E5D7',
    },
    clockContainer: {
        width: '45%', // Adjust 
        padding: 10, // Add padding for spacing
        textAlign: 'center',
        justifyContent: "center"
    },

    iconTextWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    confirmButton: {
        backgroundColor: '#1E1F22',
        width:100
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
});