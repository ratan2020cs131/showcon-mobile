import { TouchableOpacity, View, ImageBackground, StyleSheet, Text } from "react-native";
import GlobalStyles from "../../GlobalStyles";

const Card = ({ image, title, navigation, wd, ht }) => {
    return (
        <TouchableOpacity style={[styles.item, { width: wd ? wd : 150, height: ht ? ht : 200 }]} onPress={() => navigation.navigate("ShowScreen", { image, title })}>
            <View style={styles.imageContainer}>
                <ImageBackground style={styles.image} source={image} resizeMode='cover'>
                    {!wd &&
                        <View style={styles.titleContainer}>
                            <Text style={[GlobalStyles.semiBoldText, styles.titleText]}>{title}</Text>
                        </View>
                    }
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
}

export default Card;

const styles = StyleSheet.create({
    item: {
        margin: 10,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    titleContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 5,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    titleText: {
        color: 'white',
        textAlign: 'left',
        paddingLeft: 10,
    },
})