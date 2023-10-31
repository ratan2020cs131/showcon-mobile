import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import Poster from "../../components/Show/Poster";
import Cast from "../../components/Show/Cast";
import Places from "../../components/Show/Places";
import Description from "../../components/Show/Description";
import Rating from "../../components/Show/Rating";

const Show = ({ navigation }) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Poster />
                <Places navigation={navigation} />
                <Cast />
                <Description />
                <Rating />
            </View>
        </ScrollView>
    )
}

export default Show;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#EEEEEE"
    },
});

