import { View,Text, StyleSheet } from "react-native";
import Card from "../CardA/Card";
import PosterImg from '../../../assets/images/poster.png';
import GlobalStyles from "../../GlobalStyles";

const Popular = ({navigation}) => {
    return (
        <View style={{width:'100%'}}>
        <Text style={[GlobalStyles.boldText, { fontSize: 24, textAlign: "left", marginVertical: 10 }]}>Popular</Text>
        <View style={styles.container}>
            {
                popularArray.map((item,index)=>(
                    <Card key={index} image={item.image} title={item.title} navigation={navigation} />
                ))
            }
        </View>
        </View>
    )
}

export default Popular;

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        height:'auto',
        width:'100%',
        paddingHorizontal:0,
        flexWrap:'wrap',
        flexDirection:'row',
        paddingBottom:40
    }
})

const popularArray=[
    {
        image:PosterImg,
        title:'John Wick: Chapter 1'
    },
    {
        image:PosterImg,
        title:'John Wick: Chapter 1'
    },
    {
        image:PosterImg,
        title:'John Wick: Chapter 1'
    },
    {
        image:PosterImg,
        title:'John Wick: Chapter 1'
    },
    {
        image:PosterImg,
        title:'John Wick: Chapter 1'
    },
    {
        image:PosterImg,
        title:'John Wick: Chapter 1'
    },
]