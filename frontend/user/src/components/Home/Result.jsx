import { View, Text, StyleSheet, FlatList } from "react-native";
import Card from "../CardA/Card";
import GlobalStyles from "../../GlobalStyles";


const Result = ({navigation}) => {
    return (
        <View>
            <Text style={[GlobalStyles.boldText, { fontSize: 24, textAlign: "left", marginTop: 5 }]}>Result</Text>
            <FlatList
                data={resultArray}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => <Card m={5} wd={80} ht={100} key={item.id} image={item.image} title={item.title} navigation={navigation}/>}
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
//     {
//         id:4,
//         image: PosterImg4,
//         title: 'John Wick: Chapter 1'
//     },
//     {
//         id:5,
//         image: PosterImg5,
//         title: 'John Wick: Chapter 1'
//     },
//     {
//         id:6,
//         image: PosterImg6,
//         title: 'John Wick: Chapter 1'
//     },
//     {
//         id:1,
//         image: PosterImg1,
//         title: 'John Wick: Chapter 1'
//     },
//     {
//         id:2,
//         image: PosterImg2,
//         title: 'John Wick: Chapter 1'
//     },
//     {
//         id:3,
//         image: PosterImg3,
//         title: 'John Wick: Chapter 1'
//     },
]
