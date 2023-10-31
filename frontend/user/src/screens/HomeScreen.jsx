import React, { useState } from 'react';
import { Alert, Dimensions, FlatList, ImageBackground, Modal, Pressable, View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker"
import ScreenWrapper from './ScreenWrapper';
import GlobalStyles from '../GlobalStyles';

const HomeScreen = ({ navigation }) => {

    const windowWidth = Dimensions.get('window').width;

    const [date, setDate] = useState('Date');
    const [time, setTime] = useState('Time');
    const [placeholder, setPlaceholder] = useState('Pickup Show')
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const DATA = [
        {
            id: '6',
            title: 'First Item',
            image: "https://i.pravatar.cc/112",
            title: "ABCD"
        },
        {
            id: '5',
            title: 'Second Item',
            image: "https://i.pravatar.cc/109",
            title: "ABCD"
        },
        {
            id: '4',
            title: 'Third Item',
            image: "https://i.pravatar.cc/110",
            title: "ABCD"
        },
        {
            id: '3',
            title: 'First Item',
            image: "https://i.pravatar.cc/113",
            title: "ABCD"
        },
        {
            id: '2',
            title: 'Second Item',
            image: "https://i.pravatar.cc/115",
            title: "ABCD"
        },
        {
            id: '1',
            title: 'Third Item',
            image: "https://i.pravatar.cc/118",
            title: "ABCD"

        },
    ];

    const Item = ({ image, title }) => (
        <Pressable style={styles.item}>
            <View style={styles.imageContainer}>
                <ImageBackground style={styles.image} source={{ uri: image }} resizeMode='cover'>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>
                </ImageBackground>
            </View>
        </Pressable>
    );

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
        <ScreenWrapper>
            {modalVisible ? (
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
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
                                    <Pressable
                                        style={styles.confirmButton}
                                        onPress={() => {
                                            setModalVisible(!modalVisible);
                                            console.log(!modalVisible); 
                                            setPlaceholder(`${date} at ${time}`)// Use this for confirmation
                                        }}
                                    >
                                        <Text style={styles.confirmButtonText}>Confirm</Text>
                                    </Pressable>

                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            ) :
                (

                    <ScrollView style={styles.container} showsVerticalScrollIndicator nestedScrollEnabled={true} >
                        {/* time */}
                        <View style={{ alignItems: 'center' }}>
                            <Pressable style={[GlobalStyles.picker, { width: windowWidth - 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 }]} onPress={() => setModalVisible(!modalVisible)}>
                                <View style={{flex:1}}>
                                    <Text style={(placeholder == 'Pickup Show') ? { color: '#8b8981' } : { color: 'black' }}>{placeholder}</Text>
                                </View>
                                <View style={{  position:'relative', justifyContent:'center' }}>
                                    <View style={[styles.line, { width: 1 }]} />
                                    <FontAwesome5 name="calendar-alt" size={25} color="#F55139" />
                                </View>
                               
                            </Pressable>
                        </View>



                        {/* FlastList */}
                        <Text style={[GlobalStyles.boldText, { fontSize: 32, textAlign: "left", marginTop: 5 }]}>FlatList</Text>
                        <FlatList
                            data={DATA}
                            horizontal
                            renderItem={({ item }) => <Item image={item.image} title={item.title} />}
                            keyExtractor={item => item.id}
                        />

                        {/* Popular */}
                        <Text style={[GlobalStyles.boldText, { fontSize: 32, textAlign: "left", marginVertical: 10 }]}>Popular</Text>
                        <View style={{ alignItems: 'center' }}>
                            <FlatList
                                data={DATA}
                                numColumns={2}
                                renderItem={({ item }) => <Item image={item.image} title={item.title} />}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    </ScrollView>
                )}
        </ScreenWrapper>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
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
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 15,
        elevation: 5,
        marginTop: 10,
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
});