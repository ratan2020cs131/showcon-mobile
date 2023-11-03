import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const Poster = ({ image, title }) => {
    const [like, setLike] = useState(false);
    handleLike = () => setLike(!like);

    return (
        <View style={styles.itemContainer}>
            <View style={styles.imgcontainer}>
                <Image source={image} style={styles.image}></Image>
            </View>
            <View style={styles.container}>
                <Text style={[GlobalStyles.semiBoldText, styles.title]}>{title}</Text>
                <TouchableOpacity onPress={handleLike}>
                    {like ?
                        <Ionicons name="heart" style={styles.icon} ></Ionicons> :
                        <Ionicons name="heart-outline" style={styles.icon}></Ionicons>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Poster;

const styles = StyleSheet.create({
    itemContainer:{
        width:"100%",
        alignItems:'center',
        marginBottom:30,
    },
    imgcontainer: {
        width: 320,
        height: 500,
        borderRadius: 10,
    },
    image: {
        borderRadius: 10,
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 320,
        paddingVertical: 10,
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    title: {
        fontSize: 20,
    },
    icon: {
        fontSize: 35,
        color: '#F55139'
    }
})

