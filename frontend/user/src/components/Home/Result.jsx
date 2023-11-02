import { View, Text, StyleSheet, FlatList } from "react-native";
import Card from "../CardA/Card";
import PosterImg from '../../../assets/images/poster.png';
import GlobalStyles from "../../GlobalStyles";
import PosterImg1 from '../../../assets/images/poster.png';
import PosterImg2 from '../../../assets/images/poster2.png';
import PosterImg3 from '../../../assets/images/poster3.png';
import PosterImg4 from '../../../assets/images/poster4.png';
import PosterImg5 from '../../../assets/images/poster5.png';
import PosterImg6 from '../../../assets/images/poster6.png';

const Result = ({navigation}) => {
    return (
        <View>
            <Text style={[GlobalStyles.boldText, { fontSize: 24, textAlign: "left", marginTop: 5 }]}>Result</Text>
            <FlatList
                data={resultArray}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => <Card wd={80} ht={100} key={item.id} image={item.image} title={item.title} navigation={navigation}/>}
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
        id:4,
        image: PosterImg4,
        title: 'John Wick: Chapter 1'
    },
    {
        id:5,
        image: PosterImg5,
        title: 'John Wick: Chapter 1'
    },
    {
        id:6,
        image: PosterImg6,
        title: 'John Wick: Chapter 1'
    },
    {
        id:1,
        image: PosterImg1,
        title: 'John Wick: Chapter 1'
    },
    {
        id:2,
        image: PosterImg2,
        title: 'John Wick: Chapter 1'
    },
    {
        id:3,
        image: PosterImg3,
        title: 'John Wick: Chapter 1'
    },
]