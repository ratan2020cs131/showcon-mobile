import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import GlobalStyles from "../../GlobalStyles";

const Description = () => {
    return (
        <View style={styles.container}>
            <Text style={[GlobalStyles.boldText, styles.headline]}>DESCRIPTION</Text>
            <Text style={[GlobalStyles.normalText,styles.text]}>
            With the untimely death of his beloved wife still bitter in his mouth, John Wick, the expert former assassin, receives one final gift from her--a precious keepsake to help John find a new meaning in life now that she is gone. But when the arrogant Russian mob prince, Iosef Tarasov, and his men pay Wick a rather unwelcome visit to rob him of his prized 1969 Mustang and his wife's present, the legendary hitman will be forced to unearth his meticulously concealed identity.{/*  */}
            </Text>
        </View>
    )
}

export default Description;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 20
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
