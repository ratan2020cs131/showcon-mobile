import { ImageBackground, Pressable, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from './ScreenWrapper';
import GlobalStyles from '../GlobalStyles';

const WishlistScreen = ({ navigation }) => {

    return (
        <ScreenWrapper title="Whishlist">
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} nestedScrollEnabled={true} >
                <View style={{ width: '100%' }}>
                    <View style={styles.likedcontainer}>
                        {
                            likedArray.map((item, index) => (
                                <Pressable style={styles.item} onPress={() => navigation.navigate("ShowScreen")}>
                                    <View style={styles.imageContainer}>
                                        <ImageBackground style={styles.image} source={{ uri: item.thumbnail }} resizeMode='cover'>
                                            <View style={{alignItems:'flex-end', padding:7}}>
                                            <Ionicons name="heart" size={20} color="#F55139" />
                                            </View>                                    
                                            <View style={styles.titleContainer}>
                                                <Text style={[GlobalStyles.semiBoldText, styles.titleText]}>{item.movieName}</Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                </Pressable>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
        </ScreenWrapper>
    )
}

export default WishlistScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    likedcontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto',
        width: '100%',
        paddingHorizontal: 0,
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingBottom: 40
    },
    item: {
        width: 150,
        height: 180,
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
});


const likedArray = [
    {
        id: 1,
        thumbnail: 'https://i.pravatar.cc/112',
        movieName: 'Movie-A',
    },
    {
        id: 2,
        thumbnail: 'https://i.pravatar.cc/112',
        movieName: 'Movie-A',
    },
    {
        id: 3,
        thumbnail: 'https://i.pravatar.cc/112',
        movieName: 'Movie-A',
    },
    {
        id: 4,
        thumbnail: 'https://i.pravatar.cc/112',
        movieName: 'Movie-A',
    },
    {
        id: 5,
        thumbnail: 'https://i.pravatar.cc/112',
        movieName: 'Movie-A',
    },
    {
        id: 6,
        thumbnail: 'https://i.pravatar.cc/112',
        movieName: 'Movie-A',
    },
    {
        id: 7,
        thumbnail: 'https://i.pravatar.cc/112',
        movieName: 'Movie-A',
    },
    {
        id: 8,
        thumbnail: 'https://i.pravatar.cc/112',
        movieName: 'Movie-A',
    },
    {
        id: 9,
        thumbnail: 'https://i.pravatar.cc/112',
        movieName: 'Movie-A',
    },
    {
        id: 10,
        thumbnail: 'https://i.pravatar.cc/112',
        movieName: 'Movie-A',
    },
    {
        id: 11,
        thumbnail: 'https://i.pravatar.cc/112',
        movieName: 'Movie-A',
    },
    {
        id: 12,
        thumbnail: 'https://i.pravatar.cc/112',
        movieName: 'Movie-A',
    }
];