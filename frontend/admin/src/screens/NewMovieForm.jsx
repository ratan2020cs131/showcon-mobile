import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import ScreenWrapper from './ScreenWrapper';
import GlobalStyles from '../GlobalStyles';
import PosterUpload from '../../assets/images/poster-upload.png';
import PosterUpload2 from '../../assets/images/poster-upload2.png';
import CastCard from '../components/movie/CastCard';
import AddCastModal from '../components/movie/AddCastModal';
import { singleImageHandler } from '../utils/ImagePicker';
import Shimmer from '../components/Shimmer';


const NewMovie = () => {
    const [image, setImage] = useState()
    const [castModal, SetCastModal] = useState(false);
    const onClose = () => SetCastModal(false);
    const onOpen = () => SetCastModal(true);

    const handleImage = async () => {
        const image = await singleImageHandler();
        console.log(image);
        setImage(image);
    }


    return (
        <View style={styles.container}>
            <ScreenWrapper title="Add new movie" />
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} >

                <View style={styles.form}>
                    <View style={{ height: 250, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        {false ?
                            <Shimmer style={{ width: '48%', borderRadius: 10 }} /> :
                            <View style={{ width: '48%' }}>
                                <TouchableOpacity style={styles.posterImage} onPress={handleImage}>
                                    <Image source={image ? { uri: image } : PosterUpload} alt="upload poster" style={{ width: '100%', height: '100%', resizeMode: 'cover' }}></Image>
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={{ width: '48%', justifyContent: 'space-between' }}>
                            {false ?
                                <Shimmer style={{ width: '100%', height: 118, borderRadius: 10 }} /> :
                                <TouchableOpacity style={styles.posterImage2}>
                                    <Image source={PosterUpload2} alt="upload poster" style={{ width: '100%', height: '100%', resizeMode: 'cover' }}></Image>
                                </TouchableOpacity>
                            }
                            {false?
                            <Shimmer style={{ width: '100%', height: 118, borderRadius: 10 }} />:
                            <TouchableOpacity style={styles.posterImage2}>
                                <Image source={PosterUpload2} alt="upload poster" style={{ width: '100%', height: '100%', resizeMode: 'cover' }}></Image>
                            </TouchableOpacity>
}
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#E0E0E0', borderRadius: 7, paddingHorizontal: 10, alignItems: 'center' }}>
                            <MaterialCommunityIcons name="movie-edit-outline" size={20} color="black" />
                            <TextInput placeholder={'Movie title'} style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, flex: 1 }]} />
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
    },
    form: {
        marginTop: 30,
        height: 'fit-content',
        paddingHorizontal: 20,
        alignItems: 'center',
        gap: 20,
        marginBottom: 30
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
        overflow: 'hidden'
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

// const data = []