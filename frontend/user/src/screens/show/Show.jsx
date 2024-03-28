import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import Poster from "../../components/Show/Poster";
import Cast from "../../components/Show/Cast";
import Places from "../../components/Show/Places";
import Description from "../../components/Show/Description";
import Rating from "../../components/Show/Rating";

const Show = ({ navigation, route }) => {
    const { data } = route.params
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Poster title={data.title} image={data.primaryPoster}/>
                {/* <Places title={data.title} cinema={data.cinema} navigation={navigation} /> */}
                <Description data={data.description} />
                <Cast data={data.casts}/>
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
        backgroundColor: "#EEEEEE",
    },
});

