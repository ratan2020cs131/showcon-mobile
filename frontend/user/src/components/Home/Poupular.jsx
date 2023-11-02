import { View,Text, StyleSheet } from "react-native";
import Card from "../CardA/Card";
import PosterImg1 from '../../../assets/images/poster.png';
import PosterImg2 from '../../../assets/images/poster2.png';
import PosterImg3 from '../../../assets/images/poster3.png';
import PosterImg4 from '../../../assets/images/poster4.png';
import PosterImg5 from '../../../assets/images/poster5.png';
import PosterImg6 from '../../../assets/images/poster6.png';
import GlobalStyles from "../../GlobalStyles";

const Popular = ({navigation}) => {
    return (
        <View style={{width:'100%'}}>
        <Text style={[GlobalStyles.boldText, { fontSize: 24, textAlign: "left", marginVertical: 10 }]}>Popular</Text>
        <View style={styles.container}>
            {
                popularArray.map((item,index)=>(
                    <Card wd={150} key={index} image={item.image} title={item.title} navigation={navigation} />
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
        paddingBottom:25
    }
})

const popularArray=[
    {
        image:PosterImg5,
        title:'John Wick: Chapter 1'
    },
    {
        image:PosterImg6,
        title:'The Dictator'
    },
    {
        image:PosterImg3,
        title:'John Wick: Chapter 1'
    },
    {
        image:PosterImg1,
        title:'John Wick: Chapter 1'
    },
    {
        image:PosterImg2,
        title:'John Wick: Chapter 1'
    },
    {
        image:PosterImg4,
        title:'John Wick: Chapter 1'
    },
]