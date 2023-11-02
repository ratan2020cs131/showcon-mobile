import { ImageBackground, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from './ScreenWrapper';
import GlobalStyles from '../GlobalStyles';
import posterImg from '../../assets/images/poster.png';
import ModalView from "../components/Modal";
import { useState } from 'react';

const WishlistScreen = ({ navigation }) => {
    const [modal, setModal]=useState(false);
    onClose=()=>setModal(false)

    return (
        <ScreenWrapper title="Whishlist">
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} nestedScrollEnabled={true} >
                <View style={{ width: '100%' }}>
                    <View style={styles.likedcontainer}>
                        {
                            likedArray.map((item, index) => (
                                <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate("ShowScreen")}>
                                    <View style={styles.imageContainer}>
                                        <ImageBackground style={styles.image} source={item.thumbnail} resizeMode='cover'>
                                            <TouchableOpacity style={styles.iconContainer} onPress={() => setModal(true)}>
                                            <Ionicons name="trash" style={styles.icon}></Ionicons>
                                            </TouchableOpacity>
                                            <View style={styles.titleContainer}>
                                                <Text style={[GlobalStyles.semiBoldText, styles.titleText]}>{item.movieName}</Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
            <ModalView visible={modal} onClose={onClose} title="Are you sure to remove this show from your wishlist"/>
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
        position:'relative'
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
    iconContainer:{
        alignItems:'flex-end', 
        padding:7, 
        position:'absolute',
        bottom:0,
        right:3,
        borderRadius:50,
        zIndex:5
    },
    icon:{
        color:'white',
        fontSize:19,
    }
});


const likedArray = [
    {
        id: 1,
        thumbnail: posterImg,
        movieName: 'Movie-A',
    },
    {
        id: 2,
        thumbnail: posterImg,
        movieName: 'Movie-A',
    },
    {
        id: 3,
        thumbnail: posterImg,
        movieName: 'Movie-A',
    },
    {
        id: 4,
        thumbnail: posterImg,
        movieName: 'Movie-A',
    },
    
];