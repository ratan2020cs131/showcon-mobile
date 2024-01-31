import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons, MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import GenreDropdown from '../Dropdown';
import CastCard from './CastCard';
import GlobalStyles from '../../GlobalStyles';
import AddCastModal from './AddCastModal';
import { useEffect, useRef, useState } from "react";
import { movie, setNewMovie, addNewMovie } from "../../redux/features/movie/MovieSlice";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';

const NewMovieForm = () => {
    const descriptionRef = useRef(null)
    const movieState = useSelector(movie);
    const dispatch = useDispatch();
    const [genre, setGenre] = useState();
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [castModal, SetCastModal] = useState(false);
    const onClose = () => SetCastModal(false);
    const onOpen = () => SetCastModal(true);

    const showDatepicker = () => {
        handleData("release", null);
        setShowDatePicker(true);
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
        const inputDate = new Date(currentDate);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate = inputDate.toLocaleDateString('en-GB', options);
        handleData("release", formattedDate);
    };

    const handleData = (key, value) => {
        dispatch(setNewMovie({ key: key, value: value }));
        console.log(movieState.newMovie);
    }

    useEffect(() => {
        dispatch(setNewMovie({ key: 'genre', value: genre }));
        console.log(movieState.newMovie);
    }, [genre])


    return (
        <>
            <View style={styles.inputContainer}>
                <View style={{ flexDirection: 'row', backgroundColor: '#E0E0E0', borderRadius: 7, paddingHorizontal: 10, alignItems: 'center' }}>
                    <MaterialCommunityIcons name="movie-edit-outline" size={20} color="black" />
                    <TextInput
                        placeholder={'Movie title'}
                        style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, flex: 1 }]}
                        onChangeText={(value) => handleData("title", value)}
                        value={movieState.newMovie.title}
                    />
                </View>

                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '43%', flexDirection: 'row', backgroundColor: '#E0E0E0', borderRadius: 7, paddingLeft: 10, alignItems: 'center' }}>
                        <MaterialIcons name="access-time" size={21} color="black" />
                        <View style={{ flex: 1, flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                            <TextInput maxLength={2}
                                keyboardType='numeric' placeholder={'HH'}
                                style={[GlobalStyles.input, GlobalStyles.normalText, { textAlign: 'center', width: '33%', color: 'black', borderWidth: 0, paddingHorizontal: 0, flex: 1, fontSize: 15 }]}
                                onChangeText={(value) => handleData("duration[0]", value)}
                                value={movieState.newMovie.duration[0] ? movieState.newMovie.duration[0] : ''}
                            />
                            <Text style={{ fontSize: 18, fontWeight: 700 }}>:</Text>
                            <TextInput maxLength={2}
                                keyboardType='numeric' placeholder={'MM'}
                                style={[GlobalStyles.input, GlobalStyles.normalText, { textAlign: 'center', width: '33%', color: 'black', borderWidth: 0, paddingHorizontal: 0, flex: 1, fontSize: 15 }]}
                                onChangeText={(value) => handleData("duration[1]", value)}
                                value={movieState.newMovie.duration[1] ? movieState.newMovie.duration[1] : ''}
                            />
                        </View>
                    </View>

                    <View style={{ width: '54%' }}>
                        <GenreDropdown list={genreList} title={'Genre'} set={setGenre} get={movieState.newMovie.genre} />
                    </View>
                </View>

                <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#E0E0E0', borderRadius: 7, minHeight: 120, maxHeight: 140 }} onPress={() => descriptionRef.current.focus()}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                        <Feather name="file-text" size={20} color="black" style={{ paddingTop: 12 }} />
                        <TextInput
                            ref={descriptionRef}
                            style={{ alignItems: 'flex-start', minHeight: 45, paddingLeft: 10, fontFamily: "Montserrat-Regular", width: '90%', fontSize: 16 }}
                            multiline
                            maxLength={500}
                            placeholder="Description"
                            onChangeText={(value) => handleData("description", value)}
                            value={movieState.newMovie.description}
                        />
                    </View>
                </TouchableOpacity>


                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', gap: 20 }}>
                    <View style={{ height: '100%', width: 70, justifyContent: 'flex-start', alignItems: 'center', marginTop: 2 }}>
                        <TouchableOpacity
                            style={styles.releaseDate} 
                            onPress={showDatepicker}
                        >
                            {movieState.newMovie.release!==null ?
                                <>{
                                    (() => {
                                        const inputDate = new Date(date);
                                        const options = { day: 'numeric', month: 'long', year: 'numeric' };
                                        const formattedDate = inputDate.toLocaleDateString('en-US', options);
                                        const dateArray = formattedDate.split(' ');
                                        return (
                                            <>
                                                <Text style={[GlobalStyles.semiBoldText, { color: '#F55139', fontSize: 12 }]}>{dateArray[1].split(',')[0] + " " + dateArray[0].substring(0, 3)}</Text>
                                                <Text style={[GlobalStyles.boldText, { color: '#F55139' }]}>{dateArray[2]}</Text>
                                            </>
                                        )
                                    })()
                                }
                                </> :
                                <>
                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={date}
                                            mode="date"
                                            is24Hour={true}
                                            display="default"
                                            onChange={onDateChange}
                                        />
                                    )}
                                    <Ionicons name="calendar-outline" size={30} color={"#404040"}></Ionicons>
                                </>
                            }
                        </TouchableOpacity>
                        <Text style={[GlobalStyles.semiBoldText, { textAlign: 'center' }]}>Release Date</Text>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{}}
                    >
                        {movieState.newMovie.casts.map((item, index) => (
                            <CastCard title={item.name} key={index} image={item.image} />
                        ))}

                        <TouchableOpacity style={styles.castaddContainer} onPress={onOpen}>
                            <View style={styles.addCast}>
                                <Ionicons name="person-add-outline" size={25} color="black" />
                            </View>
                            <Text style={[GlobalStyles.semiBoldText, { textAlign: 'center' }]}>Add Cast</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

            </View>
            {castModal && <AddCastModal visible={castModal} onClose={onClose} />}
        </>
    )
}
export default NewMovieForm;

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        gap: 10
    },
    castaddContainer: {
        justifyContent: 'flex-start',
        width: 70,
        marginRight: 10
    },
    addCast: {
        width: 70,
        height: 70,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        paddingRight: 3
    },
    releaseDate: {
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
        width: 62,
        height: 62,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:3
    }
})


const genreList = [
    'Thriller',
    'Science Fiction',
    'Horror',
    'Romance',
    'Action',
    'Drama',
    'Adventure',
    'Mystery',
    'Comedy',
    'Fantasy',
    'Biography'
]

const data = [
    { tite: 'Ratan' }
]