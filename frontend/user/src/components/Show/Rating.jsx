import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import { Ionicons } from "@expo/vector-icons";

const Rating = () => {
    return (
        <View style={styles.container}>
            <Text style={[GlobalStyles.boldText, styles.headline]}>RATING</Text>
            <Text style={[GlobalStyles.semiBoldText, styles.text]}>
            <Ionicons name="star" size={21} color="#1BCFB4"></Ionicons>
            4.6
            </Text>
        </View>
    )
}

export default Rating;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    headline: {
        width: "100%",
        fontSize: 20,
        paddingHorizontal: 10,
        width:'auto',
    },
    text:{
        paddingHorizontal:10,
        color:'#1BCFB4',
        fontSize:20
    }
})
