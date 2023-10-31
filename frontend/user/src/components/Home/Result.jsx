import { View, Text, StyleSheet, FlatList } from "react-native";
import Card from "../CardA/Card";
import PosterImg from '../../../assets/images/poster.png';
import GlobalStyles from "../../GlobalStyles";

const Result = ({navigation}) => {
    return (
        <View>
            <Text style={[GlobalStyles.boldText, { fontSize: 24, textAlign: "left", marginTop: 5 }]}>Recent</Text>
            <FlatList
                data={resultArray}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <Card image={item.image} title={item.title} navigation={navigation}/>}
                keyExtractor={item => item.id}
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

const resultArray = [
    {
        image: PosterImg,
        title: 'John Wick: Chapter 1'
    },
    {
        image: PosterImg,
        title: 'John Wick: Chapter 1'
    },
    {
        image: PosterImg,
        title: 'John Wick: Chapter 1'
    },
    {
        image: PosterImg,
        title: 'John Wick: Chapter 1'
    },
    {
        image: PosterImg,
        title: 'John Wick: Chapter 1'
    },
    {
        image: PosterImg,
        title: 'John Wick: Chapter 1'
    },
]