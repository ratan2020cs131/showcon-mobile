import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { AntDesign, MaterialCommunityIcons, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import ScreenWrapper from './ScreenWrapper';
import GlobalStyles from '../GlobalStyles';
import PosterUpload from '../../assets/images/poster-upload.png';
import PosterUpload2 from '../../assets/images/poster-upload2.png';
import CastCard from '../components/movie/CastCard';
import AddCastModal from '../components/movie/AddCastModal';
import { singleImageHandler } from '../utils/ImagePicker';
import Shimmer from '../components/Shimmer';
import { imageDelete } from '../utils/ImageApi';
import GenreDropdown from '../components/Dropdown';


const NewMovie = () => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState({ prim: null, sec1: null, sec2: null });
    const [castModal, SetCastModal] = useState(false);
    const onClose = () => SetCastModal(false);
    const onOpen = () => SetCastModal(true);

    const handleImage = async (type) => {
        if (image[type] !== null) {
            imageDelete(image[type]);
        }
        setImage({ ...image, [type]: '0' });
        setLoading(true);
        const imageUrl = await singleImageHandler();
        console.log(imageUrl);
        setImage({ ...image, [type]: imageUrl });
    }


    return (
        <View style={styles.container}>
            <ScreenWrapper title="Add new movie" />
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} >

                <View style={styles.form}>
                    <View style={{ height: 250, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        {loading && image.prim === '0' ?
                            <Shimmer style={{ width: '48%', borderRadius: 10 }} /> :
                            <View style={{ width: '48%', position: 'relative' }}>
                                <TouchableOpacity style={styles.posterImage} onPress={() => handleImage("prim")}>
                                    <Image source={image.prim ? { uri: image.prim } : PosterUpload} alt="upload poster" style={{ width: '100%', height: '100%', resizeMode: 'cover' }}></Image>
                                </TouchableOpacity>
                                {image.prim && <TouchableOpacity style={{ position: 'absolute', top: 5, left: 5, zIndex: 10 }} onPress={() => { imageDelete(image['prim']); setImage({ ...image, ['prim']: null }); }}>
                                    <AntDesign name="closecircle" size={20} color="#808080" />
                                </TouchableOpacity>}
                            </View>
                        }
                        <View style={{ width: '48%', justifyContent: 'space-between' }}>
                            {loading && image.sec1 === '0' ?
                                <Shimmer style={{ width: '100%', height: 118, borderRadius: 10 }} /> :
                                <TouchableOpacity style={styles.posterImage2} onPress={() => handleImage("sec1")}>
                                    <Image source={image.sec1 ? { uri: image.sec1 } : PosterUpload2} alt="upload poster" style={{ width: '100%', height: '100%', resizeMode: 'cover' }}></Image>
                                    {image.sec1 && <TouchableOpacity style={{ position: 'absolute', top: 5, right: 5, zIndex: 10 }} onPress={() => { imageDelete(image['sec1']); setImage({ ...image, ['sec1']: null }); }}>
                                        <AntDesign name="closecircle" size={20} color="#808080" />
                                    </TouchableOpacity>}
                                </TouchableOpacity>
                            }
                            {loading && image.sec2 === '0' ?
                                <Shimmer style={{ width: '100%', height: 118, borderRadius: 10 }} /> :
                                <TouchableOpacity style={styles.posterImage2} onPress={() => handleImage("sec2")}>
                                    <Image source={image.sec2 ? { uri: image.sec2 } : PosterUpload2} alt="upload poster" style={{ width: '100%', height: '100%', resizeMode: 'cover' }}></Image>
                                    {image.sec2 && <TouchableOpacity style={{ position: 'absolute', top: 5, right: 5, zIndex: 10 }} onPress={() => { imageDelete(image['sec2']); setImage({ ...image, ['sec2']: null }); }}>
                                        <AntDesign name="closecircle" size={20} color="#808080" />
                                    </TouchableOpacity>}
                                </TouchableOpacity>
                            }
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#E0E0E0', borderRadius: 7, paddingHorizontal: 10, alignItems: 'center' }}>
                            <MaterialCommunityIcons name="movie-edit-outline" size={20} color="black" />
                            <TextInput placeholder={'Movie title'} style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, flex: 1 }]} />
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '43%', flexDirection: 'row', backgroundColor: '#E0E0E0', borderRadius: 7, paddingHorizontal: 10, alignItems: 'center' }}>
                                <MaterialIcons name="access-time" size={21} color="black" />
                                <TextInput placeholder={'Duration'} style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, flex: 1 }]} />
                            </View>
                            {/* <View style={{ width:'54%', flexDirection: 'row', backgroundColor: '#E0E0E0', borderRadius: 7, paddingHorizontal: 10, alignItems: 'center' }}>
                                <MaterialCommunityIcons name="movie-edit-outline" size={20} color="black" />
                                <TextInput placeholder={'Genre'} style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, flex: 1 }]} />
                            </View> */}
                            <View style={{ width: '54%' }}>
                                <GenreDropdown list={genreList} title={'Genre'} />
                            </View>
                        </View>

                        <View style={{ backgroundColor: '#E0E0E0', borderRadius: 7, minHeight: 120, maxHeight: 140 }}>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                                <Feather name="file-text" size={20} color="black" style={{ paddingTop: 12 }} />
                                <TextInput
                                    style={{ alignItems: 'flex-start', minHeight: 45, paddingLeft: 10, fontFamily: "Montserrat-Regular", width: '90%', fontSize: 16 }}
                                    multiline
                                    maxLength={500}
                                    placeholder="Description"
                                />
                            </View>
                        </View>


                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ minWidth: '100%' }}
                        >
                            {data.map((item, index) => (
                                <CastCard title={item.title} key={index} />
                            ))}

                            <TouchableOpacity style={styles.castaddContainer} onPress={onOpen}>
                                <View style={styles.addCast}>
                                    <Ionicons name="person-add-outline" size={25} color="black" />
                                </View>
                                <Text style={[GlobalStyles.semiBoldText, { textAlign: 'center' }]}>Add Cast</Text>
                            </TouchableOpacity>
                        </ScrollView>

                    </View>
                </View>
            </ScrollView>
            <AddCastModal visible={castModal} onClose={onClose} />
        </View>
    )
}
export default NewMovie;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    form: {
        marginTop: 30,
        height: 'fit-content',
        paddingHorizontal: 20,
        alignItems: 'center',
        gap: 20,
        marginBottom: 30,
        maxWidth: 380
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        // width: '85%',
        backgroundColor: '#E0E0E0',
        marginBottom: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderRadius: 7,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    input2: {
        color: 'black',
        borderWidth: 0,
        flex: 1,
        paddingHorizontal: 8
    },
    inputContainer: {
        width: '100%',
        gap: 10
    },
    posterImage2: {
        height: 118,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative'
    },
    posterImage: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    addCast: {
        width: 70,
        height: 70,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        paddingRight: 3
    },
    castaddContainer: {
        justifyContent: 'flex-start',
        width: 70,
        marginRight: 10
    },
})


const data = [
    { title: 'Ratan Deep Singh' },
    // { title: 'Himanshu Verma' },
    // { title: 'Ratan Deep Singh' },
    // { title: 'Himanshu Verma' }
]

const genreList = [
    'Thriller',
    'Science Fiction',
    'Horror',
    'Romance',
    'Action',
    'Drama',
    'Adventure',
    'Mystery',
    'Comedy',
    'Fantasy'
]