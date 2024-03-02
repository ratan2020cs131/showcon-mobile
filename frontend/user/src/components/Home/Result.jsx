import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect } from "react";
import Card from "../CardA/Card";
import GlobalStyles from "../../GlobalStyles";
import { useSelector } from 'react-redux';
import { movie } from '../../Redux/Features/Movie/movieSlice';

const Result = ({navigation}) => {

    const movieState = useSelector(movie);


    useEffect(() => {

    }, [movieState.movies])

    return (
        <View>
            <Text style={[GlobalStyles.boldText, {paddingLeft:10, fontSize: 24, textAlign: "left", marginTop: 5, marginBottom:10 }]}>Search Result</Text>
            <FlatList
                data={movieState.movies}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <Card m={5} wd={80} ht={100} key={item._id} data={item} navigation={navigation}/>}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

export default Result;

const styles = StyleSheet.create({
    constainer: {
        width: '100%',
    }
})
