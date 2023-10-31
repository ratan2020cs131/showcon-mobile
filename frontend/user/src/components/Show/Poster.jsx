import { StyleSheet, View, Text, Image } from "react-native";
import PosterImg from '../../../assets/images/poster.png';

const Poster = () => {
    return (
        <View style={styles.imgcontainer}>
            <Image source={PosterImg} style={styles.image}></Image>
        </View>
    )
}

export default Poster;

const styles = StyleSheet.create({
    image: {
        borderRadius:10,
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    imgcontainer: {
        width: 320,
        height: 500,
        marginBottom: 20,
        borderRadius:10,
    }
})

