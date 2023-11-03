import { TouchableOpacity, View, ImageBackground, StyleSheet, Text } from "react-native";
import GlobalStyles from "../../GlobalStyles";

const Card = ({ data, title, navigation, wd, ht, m }) => {
    return (
        <TouchableOpacity style={[styles.item, {margin:m?m:10, width: wd ? wd : 150, height: ht ? ht : 200 }]} onPress={() => navigation.navigate("ShowScreen", { data })}>
            <View style={styles.imageContainer}>
                <ImageBackground style={styles.image} source={{uri:data.banner}} resizeMode='cover'>
                    {!wd &&
                        <View style={styles.titleContainer}>
                            <Text style={[GlobalStyles.semiBoldText, styles.titleText]}>{title}</Text>
                        </View>
                    }
                </ImageBackground>
            </View>
            {title&&<Text style={[GlobalStyles.normalText, {color:'#1E1F22', paddingLeft: 10, fontSize: 13, textAlign: "left", marginVertical: 5, width:'100%' }]}>{title}</Text>}
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