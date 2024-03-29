import { ImageBackground, View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from './ScreenWrapper';
import GlobalStyles from '../GlobalStyles';
import posterImg1 from '../../assets/images/poster6.png';
import posterImg2 from '../../assets/images/poster2.png';
import posterImg3 from '../../assets/images/poster4.png';
import posterImg4 from '../../assets/images/poster5.png';
import ModalView from "../components/Modal";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWishlist, removeWishlist } from '../Redux/Features/Wishlist/wishlistSlice';
import { AntDesign } from '@expo/vector-icons';

const WishlistScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist);
    const [modal, setModal] = useState(false);
    const [delId, setDelId] = useState('')
    onClose = () => setModal(false)

    useEffect(() => {
        dispatch(getWishlist())
    }, [wishlist.removed])

    const handleRemoveWish = () => {
        dispatch(removeWishlist({ "MovieID": delId }))
    }

    return (
        <ScreenWrapper title="Whishlist">
            {/* <ScrollView style={styles.container} showsVerticalScrollIndicator={false} nestedScrollEnabled={true} > */}
            <View style={{ width: '100%' }}>
                <View style={styles.likedcontainer}>
                    {wishlist.getting &&
                        <ActivityIndicator size={"large"} color={GlobalStyles.orange} style={{ marginTop: 100 }} />
                    }

                    {wishlist.wishlist?.length > 0 &&
                        <FlatList
                            data={wishlist.wishlist}
                            keyExtractor={(item) => item._id}
                            numColumns={2}
                            renderItem={({ item }) => (
                                <TouchableOpacity key={item?._id} style={styles.item} onPress={() => navigation.navigate("ShowScreen", { data: item })}>
                                    <View style={styles.imageContainer}>
                                        <ImageBackground style={styles.image} source={{ uri: item.primaryPoster }} resizeMode='cover'>
                                            <TouchableOpacity style={styles.iconContainer} onPress={() => {
                                                setModal(true)
                                                setDelId(item?._id)
                                            }}>
                                                <Ionicons name="trash" style={styles.icon}></Ionicons>
                                            </TouchableOpacity>
                                            <View style={styles.titleContainer}>
                                                <Text style={[GlobalStyles.semiBoldText, styles.titleText]}>{item?.title}</Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    }



                    {!wishlist.getting && wishlist.wishlist?.length === 0 &&
                        <View style={{ alignItems: 'center', marginTop: 50 }}>
                            <AntDesign name="heart" size={74} color="#d0d0d0" />
                            <Text style={[GlobalStyles.boldText, { fontSize: 18, color: '#d0d0d0' }]}>Wishlist is empty</Text>
                        </View>
                    }
                </View>
            </View>
            {/* </ScrollView> */}
            <ModalView onConfirm={handleRemoveWish} button={true} visible={modal} onClose={onClose} title="Are you sure to remove this movie from your wishlist" />
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
        position: 'relative'
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
    iconContainer: {
        alignItems: 'flex-end',
        padding: 7,
        position: 'absolute',
        bottom: 0,
        right: 3,
        borderRadius: 50,
        zIndex: 5
    },
    icon: {
        color: 'white',
        fontSize: 19,
    }
});


const likedArray = [
    {
        id: 1,
        thumbnail: posterImg1,
    },
    {
        id: 2,
        thumbnail: posterImg2,
    },
    {
        id: 3,
        thumbnail: posterImg3,
    },
    {
        id: 4,
        thumbnail: posterImg4,
    },

];


// {wishlist.wishlist?.length > 0 &&
//     wishlist.wishlist.map((item, index) => (
//         <TouchableOpacity key={item?._id} style={styles.item} onPress={() => navigation.navigate("ShowScreen", { data: item })}>
//             <View style={styles.imageContainer}>
//                 <ImageBackground style={styles.image} source={{ uri: item.primaryPoster }} resizeMode='cover'>
//                     <TouchableOpacity style={styles.iconContainer} onPress={() => {
//                         setModal(true)
//                         setDelId(item?._id)
//                     }}>
//                         <Ionicons name="trash" style={styles.icon}></Ionicons>
//                     </TouchableOpacity>
//                     {/* <View style={styles.titleContainer}>
//                             <Text style={[GlobalStyles.semiBoldText, styles.titleText]}>{item.movieName}</Text>
//                         </View> */}
//                 </ImageBackground>
//             </View>
//         </TouchableOpacity>
//     ))
// }