import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, Pressable, View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker"
import ScreenWrapper from './ScreenWrapper';
import GlobalStyles from '../GlobalStyles';
import Popular from '../components/Home/Poupular';
import Result from '../components/Home/Result';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieByCity } from '../Redux/Features/Movie/movieSlice';
import { getAddress } from '../Redux/Features/Auth/authSlice'
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import Shimmer from '../components/Shimmer';
import MovieCard from '../components/CardA/Card';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FormatDate from '../utils/formatDate';

const HomeScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const movie = useSelector(state => state.movie)
    const windowWidth = Dimensions.get('window').width;

    const [movieByTime, setMovieByTime] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showInitTimePicker, setInitTimePicker] = useState(false);
    const [showEndTimePicker, setEndTimePicker] = useState(false);
    const [pincode, setPincode] = useState('');
    const [dateSetted, setDateSetted] = useState(null);
    const [initialTime, setInitialTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())

    const onDateChange = (event, selectedDate) => {
        if (selectedDate) {
            const currentDate = selectedDate;
            const inputDate = new Date(currentDate);
            setDate(currentDate);
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const formattedDate = inputDate.toLocaleDateString('en-GB', options);
            setDateSetted(formattedDate);
        }
        setShowDatePicker(false)
        setInitTimePicker(true);
    };

    const onChangeInitTime = (event, selectedTime) => {
        if (selectedTime) {
            setInitialTime(selectedTime)
        }
        setInitTimePicker(false);
        setEndTimePicker(true);
    };

    const onChangeEndTime = (event, selectedTime) => {
        if (selectedTime) {
            setEndTime(selectedTime)
        }
        setEndTimePicker(false);
        setMovieByTime(true);
    };

    const formatTime = (time) => {
        const formattedTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        const [hours, minutes] = formattedTime.split(':');
        const formattedTimeString = `${hours.padStart(2, '0')} ${minutes.split(' ')[1]}`;
        return formattedTimeString;
    }

    const getLocation = async () => {
        try {
            const { status } = await requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                throw new Error("Location permission denied")
                return;
            }
            const location = await getCurrentPositionAsync({});
            dispatch(getAddress({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }))
        } catch (error) {
            console.log(`Error getting location: ${error.message}`);
        }
    }
    useEffect(() => {
        if (auth.address === null)
            getLocation();
    }, [auth.address])

    useEffect(() => {
        if (auth.address !== null) {
            dispatch(getMovieByCity(pincode.length === 6 ? pincode : auth.address?.zipcode))
        }
    }, [auth.address, pincode])

    useEffect(() => {
        if (movieByTime) {
            console.log({
                date,
                from: initialTime,
                to: endTime,
                zipcode: pincode.length === 6 ? pincode : auth.address?.zipcode
            });
        }
    }, [movieByTime])


    // return (
    //     <ScreenWrapper title="Home">
    //         {modalVisible ? (
    //             <View style={styles.centeredView}>
    //                 <Modal
    //                     animationType="slide"
    //                     transparent={true}
    //                     visible={modalVisible}
    //                     onRequestClose={() => {
    //                         setModalVisible(!modalVisible);
    //                     }}>
    //                     <View style={styles.centeredView}>
    //                         <View style={styles.modalView}>
    //                             <View style={styles.iconAndTextContainer}>
    //                                 <View style={styles.calendarContainer}>
    //                                     <Pressable
    //                                         onPress={() => setShowDatePicker(true)}
    //                                         style={styles.iconTextWrapper}>
    //                                         <Feather name="calendar" size={55} color="#F55139" />
    //                                         <Text
    //                                             style={[
    //                                                 GlobalStyles.normalText, { marginTop: 10, textAlign: 'center' },
    //                                                 date == 'Date'
    //                                                     ? { color: '#8b8981' }
    //                                                     : { color: 'black' },
    //                                             ]}>
    //                                             {date}
    //                                         </Text>
    //                                     </Pressable>
    //                                     {showDatePicker && (
    //                                         <DateTimePicker
    //                                             mode="date"
    //                                             display="default"
    //                                             value={new Date()}
    //                                             onChange={onChangeDate}
    //                                         />
    //                                     )}
    //                                 </View>
    //                                 <View style={styles.line} />
    //                                 <View style={styles.clockContainer}>
    //                                     <Pressable
    //                                         onPress={() => setInitTimePicker(true)}
    //                                         style={styles.iconTextWrapper}>
    //                                         <Feather name="clock" size={55} color="#F55139" />
    //                                         <Text
    //                                             style={[
    //                                                 GlobalStyles.normalText, { marginTop: 10, textAlign: 'center' },
    //                                                 time == 'Time'
    //                                                     ? { color: '#8b8981' }
    //                                                     : { color: 'black', textAlign: 'center' },
    //                                             ]}>
    //                                             {time}
    //                                         </Text>
    //                                         {showInitTimePicker && (
    //                                             <DateTimePicker
    //                                                 mode="time"
    //                                                 display="default"
    //                                                 value={new Date()}
    //                                                 onChange={onChangeInitTime}
    //                                             />
    //                                         )}
    //                                     </Pressable>
    //                                 </View>
    //                             </View>
    //                             <View style={styles.confirmContainer}>
    //                                 <TouchableOpacity
    //                                     style={[GlobalStyles.button, styles.confirmButton]}
    //                                     onPress={() => {
    //                                         setModalVisible(!modalVisible);
    //                                         console.log(!modalVisible);
    //                                         setPlaceholder(`${date} at ${time}`)// Use this for confirmation
    //                                     }}
    //                                 >
    //                                     <Text style={[GlobalStyles.boldText, {color:"#E9E5D7"}]}>CONFIRM</Text>
    //                                 </TouchableOpacity>

    //                             </View>
    //                         </View>
    //                     </View>
    //                 </Modal>
    //             </View>
    //         ) :
    //             (

    //                 <ScrollView style={styles.container} showsVerticalScrollIndicator={false} nestedScrollEnabled={true} >
    //                     {/* time */}
    //                     <View style={{ alignItems: 'center' }}>
    //                         <TouchableOpacity style={[GlobalStyles.picker, { width: windowWidth - 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5, marginVertical: 10, }]} onPress={() => setModalVisible(!modalVisible)}>
    //                             <View style={{ flex: 1 }}>
    //                                 <Text style={[GlobalStyles.boldText, (placeholder === 'Pickup Show Time') ? { color: '#8b8981' } : { color: '#F55139' }]}>{placeholder}</Text>
    //                             </View>
    //                             <View style={{ position: 'relative', justifyContent: 'center', borderLeftWidth: 2, borderColor: '#1E1F22', height: '100%', paddingHorizontal: 5 }}>
    //                                 <Ionicons name="calendar" style={{ fontSize: 26, color: '#1E1F22' }}></Ionicons>
    //                             </View>
    //                         </TouchableOpacity>
    //                     </View>
    //                     {
    //                         placeholder !== 'Pickup Show Time' ?
    //                             <Result navigation={navigation} /> : null
    //                     }
    //                     <Popular navigation={navigation} />
    //                 </ScrollView>
    //             )}
    //     </ScreenWrapper>
    // )
    return (
        <View style={styles.container}>
            <ScreenWrapper title="Home">
                <ScrollView
                    nestedScrollEnabled={true}
                    style={{
                        padding: 10,
                    }}
                    contentContainerStyle={{ gap: 10 }}
                >
                    <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")} style={{ position: 'relative', justifyContent: 'center' }}>
                        <Text style={[GlobalStyles.semiBoldText, { borderColor: '#a0a0a0', color: '#a0a0a0', borderWidth: 2, lineHeight: 38, borderRadius: 7, paddingHorizontal: 15 }]}>Search Movies</Text>
                        <AntDesign name="search1" size={25} color="#a0a0a0" style={{ position: 'absolute', right: 20 }} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                        <TouchableOpacity
                            style={{ height: 45, borderColor: '#A0A0A0', borderWidth: 2, borderRadius: 7, width: '48%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}
                            onPress={() => {
                                setShowDatePicker(true)
                                setMovieByTime(false);
                            }}
                        >
                            {dateSetted !== null ?
                                <>
                                    <Text style={[GlobalStyles.semiBoldText, { lineHeight: 35, fontSize: 13, color: GlobalStyles.orange }]}>{
                                        (() => {
                                            let date = FormatDate(dateSetted).split('-')
                                            date.pop();
                                            return date.join(' ');
                                        })()
                                    }</Text>
                                    <Text style={[GlobalStyles.semiBoldText, { lineHeight: 35, fontSize: 13, color: GlobalStyles.orange }]}>{formatTime(initialTime)}</Text>
                                    <Text style={[GlobalStyles.semiBoldText, { lineHeight: 35, fontSize: 13, color: GlobalStyles.orange }]}>-</Text>
                                    <Text style={[GlobalStyles.semiBoldText, { lineHeight: 35, fontSize: 13, color: GlobalStyles.orange }]}>{formatTime(endTime)}</Text>
                                </> :
                                <Text style={[GlobalStyles.semiBoldText, { color: '#a0a0a0' }]}>Pick a date & time</Text>
                            }
                        </TouchableOpacity>
                        {showDatePicker &&
                            <DateTimePicker
                                value={date}
                                mode="date"
                                is24Hour={true}
                                title="Select Date"
                                display="default"
                                onChange={onDateChange}
                            />
                        }
                        {showInitTimePicker &&
                            <DateTimePicker
                                value={initialTime}
                                mode="time"
                                is24Hour={false}
                                display="default"
                                onChange={onChangeInitTime}
                            />
                        }
                        {showEndTimePicker &&
                            <DateTimePicker
                                value={endTime}
                                mode="time"
                                is24Hour={false}
                                display="default"
                                onChange={onChangeEndTime}
                            />
                        }
                        <TextInput
                            value={pincode}
                            onChangeText={(text) => setPincode(text)}
                            placeholderTextColor="#a0a0a0"
                            maxLength={6}
                            placeholder='Pincode'
                            color={GlobalStyles.orange}
                            style={[GlobalStyles.semiBoldText, { height: 45, borderColor: '#A0A0A0', borderWidth: 2, borderRadius: 7, width: '48%', paddingHorizontal: 15 }]}
                        />
                    </View>
                    {auth.address === null || movie.gettingCityMovie ?
                        <Shimmer style={{ width: '100%', height: 60, borderRadius: 7 }} />
                        :
                        <>
                            {movie.cityMovies?.length > 0 ?
                                <View>
                                    <Text style={[GlobalStyles.boldText, { fontSize: 15 }]}>Shows in your city</Text>
                                    <FlatList
                                        data={movie.cityMovies}
                                        renderItem={({ item }) => <MovieCard data={item} wd={100} ht={140} pincode={pincode.length === 6 && pincode} />}
                                        keyExtractor={item => item._id}
                                        horizontal={true}
                                    />
                                </View>
                                :
                                <View style={{ alignItems: 'center' }}>
                                    <MaterialCommunityIcons name="movie-open-off" size={54} color="#d0d0d0" />
                                    <Text style={[GlobalStyles.semiBoldText, { color: '#d0d0d0' }]}>No shows found in your area</Text>
                                </View>
                            }
                        </>
                    }
                </ScrollView>
            </ScreenWrapper>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: 100
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
});