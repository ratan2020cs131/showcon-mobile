import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Keyboard } from 'react-native';
import GlobalStyles from '../GlobalStyles';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import Shimmer from '../components/Shimmer'
import { searchMovie, movie } from '../Redux/Features/Movie/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import formatDate from '../utils/formatDate';

const Search = ({ navigation }) => {
    const searchRef = useRef(null)
    const dispatch = useDispatch();
    const movieState = useSelector(movie);
    const [param, setParam] = useState('');

    const searchHandler = () => {
        if (param !== '') dispatch(searchMovie(param))
    }
    useEffect(searchHandler, [param]);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', position: 'relative', }}>
                <TextInput
                    ref={searchRef}
                    style={[GlobalStyles.input, { color: '#1E1F22', paddingLeft: 40, width: '100%', borderColor: '#1E1F22', borderWidth: 2 }]}
                    placeholder='Search Movie'
                    maxLength={10}
                    onChangeText={(value) => setParam(value)}
                    value={param}
                />
                <AntDesign name="search1" size={24} color="black" style={{ position: 'absolute', left: 10 }} />
                <TouchableOpacity style={{ position: 'absolute', right: 10 }} onPress={() => {
                    setParam('');
                    searchRef.current.focus();
                }}>
                    <MaterialCommunityIcons name="window-close" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={{ width: '100%' }}>
                {param === '' ?
                    <View style={{ alignItems: 'center' }}>
                        <MaterialCommunityIcons name="movie-search" size={104} color="#c0c0c0" />
                        <Text style={[GlobalStyles.boldText, { fontSize: 16, color: '#c0c0c0' }]}>Search the movie</Text>
                    </View>
                    :
                    <View style={{ gap: 15 }}>
                        {movieState.searchingMovie ?
                            <View style={{ gap: 15 }}>
                                {
                                    Array(3).fill().map((i, index) => (
                                        <View key={index} style={{ gap: 15, elevation: 10, width: '100%', padding: 8, flexDirection: 'row', backgroundColor: '#fff', borderRadius: 7, alignItems: 'flex-start' }}>
                                            <Shimmer style={{ width: 70, height: 100, borderRadius: 5 }} />
                                            <View style={{ paddingVertical: 2, gap: 6 }}>
                                                <Shimmer style={{ width: 160, height: 15, borderRadius: 3 }} />
                                                <Shimmer style={{ width: 190, height: 15, borderRadius: 3 }} />
                                                <Shimmer style={{ width: 140, height: 52, borderRadius: 3 }} />
                                            </View>
                                        </View>
                                    ))}
                            </View>
                            // <Shimmer style={{width:'100%', height:110}}/>
                            :
                            <>{movieState.searchResult?.length > 0 ?
                                <>
                                    {movieState.searchResult?.map((item, index) => (
                                        <MovieCard data={item} key={index} navigation={navigation} />
                                    ))}
                                </> :
                                <View style={{ alignItems: 'center' }}>
                                    <MaterialCommunityIcons name="movie-open-remove" size={104} color="#c0c0c0" />
                                    <Text style={[GlobalStyles.boldText, { fontSize: 16, color: '#c0c0c0' }]}>No results found!</Text>
                                </View>
                            }
                            </>
                        }
                    </View>
                }
            </View>
        </View>
    )
}
export default Search;


const MovieCard = ({ data, navigation }) => {

    return (
        <TouchableOpacity activeOpacity={0.4} style={{ gap: 15, elevation: 10, width: '100%', padding: 8, flexDirection: 'row', backgroundColor: '#fff', borderRadius: 7, alignItems: 'flex-start' }}
            onPress={() => navigation.navigate("ShowScreen", { data: data })}
        >
            <View style={{ width: 75, height: 110, borderRadius: 5, overflow: 'hidden' }}>
                <Image alt={"poster"} source={{ uri: data.primaryPoster }} style={GlobalStyles.image} />
            </View>
            <View style={{ width: '70%', marginTop: 10 }}>
                <Text style={[GlobalStyles.boldText, { fontSize: 18 }]}>{data.title}</Text>
                <Text style={[GlobalStyles.semiBoldText, { fontSize: 15 }]}>Release date: {formatDate(data.release)}</Text>
                {/* <Text style={GlobalStyles.semiBoldText} numberOfLines={3}>Description: {data.description}</Text> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 3 }}>
                    <Fontisto name="star" size={24} color="#1bac90" />
                    <Text style={GlobalStyles.semiBoldText}>4.3</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 10,
        gap: 30
    }
})