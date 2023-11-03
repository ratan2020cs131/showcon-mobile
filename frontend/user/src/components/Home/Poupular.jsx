import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Card from "../CardA/Card";
import GlobalStyles from "../../GlobalStyles";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getMovie, movie } from '../../Redux/Features/Movie/movieSlice';

const Popular = ({ navigation }) => {
    const dispatch = useDispatch();
    const movieState = useSelector(movie);


    useEffect(() => {
        if (movieState.movies === undefined) {
            dispatch(getMovie());
        } else {

        }
    }, [movieState.movies])

    return (
        <View style={{ width: '100%' }}>
            <Text style={[GlobalStyles.boldText, { paddingLeft: 10, fontSize: 24, textAlign: "left", marginVertical: 10 }]}>Popular</Text>
            <View style={styles.container}>
                {movieState.isLoading ?
                    <View style={{ marginTop: 100, width: '100%', flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#F55139" />
                    </View>
                    :
                    movieState.movies.map((item, index) => (
                        <Card wd={150} key={item._id} navigation={navigation} data={item} title={item.title}/>
                    ))
                }
            </View>
        </View>
    )
}

export default Popular;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 'auto',
        width: '100%',
        paddingHorizontal: 0,
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingBottom: 25
    }
})

const popularArray = [
    // {
    //     image:PosterImg5,
    //     title:'John Wick: Chapter 1'
    // },
    // {
    //     image:PosterImg6,
    //     title:'The Dictator'
    // },
    // {
    //     image:PosterImg3,
    //     title:'John Wick: Chapter 1'
    // },
    // {
    //     image:PosterImg1,
    //     title:'John Wick: Chapter 1'
    // },
    // {
    //     image:PosterImg2,
    //     title:'John Wick: Chapter 1'
    // },
    // {
    //     image:PosterImg4,
    //     title:'John Wick: Chapter 1'
    // },
]