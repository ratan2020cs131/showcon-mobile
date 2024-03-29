import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import GlobalStyles from "../../GlobalStyles";

const Description = ({data}) => {
    return (
        <View style={styles.container}>
            {/* <Text style={[GlobalStyles.boldText, styles.headline]}>DESCRIPTION</Text> */}
            <Text style={[GlobalStyles.normalText,styles.text]}>
            {data}
            </Text>
        </View>
    )
}

export default Description;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 20,
    },
    headline: {
        width: "100%",
        fontSize: 20,
        paddingHorizontal: 10,
        marginBottom: 10,
        marginTop: 30,
    },
    text:{
        paddingHorizontal:10,
        marginTop:5,
        textAlign:'justify'
    }
})
