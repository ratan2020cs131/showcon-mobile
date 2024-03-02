import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import PosterUpload from '../../../assets/images/poster-upload.png';
import PosterUpload2 from '../../../assets/images/poster-upload2.png';
import Shimmer from '../Shimmer';
import { useDebugValue, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { imageDelete } from '../../utils/ImageApi';
import { singleImageHandler } from '../../utils/ImagePicker';
import { movie } from '../../redux/features/movie/MovieSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setNewMovie } from "../../redux/features/movie/MovieSlice";

const PosterImages = () => {
    const movieState = useSelector(movie);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState({ prim: null, sec1: null, sec2: null });

    const handleImage = async (type) => {
        const [property, index] = type.split('[');
        if (index) {
            const numericIndex = parseInt(index.replace(']', ''), 10);
            if (movieState.newMovie[property][numericIndex] !== null) {
                imageDelete(movieState.newMovie[property][numericIndex]);
            }
        } else {
            imageDelete(movieState.newMovie[property]);
        }
        // if (movieState.newMovie.type !== null) {
        //     imageDelete(image[type]);
        // }
        // setImage({ ...image, [type]: '0' });
        dispatch(setNewMovie({key:type, value: '0'}))
        setLoading(true);
        const imageUrl = await singleImageHandler();
        console.log(imageUrl);
        dispatch(setNewMovie({key:type, value: imageUrl}))
        console.log(movieState.newMovie);
        // setImage({ ...image, [type]: imageUrl });
        // if(type==='prim') dispatch(setNewMovie({key:"primaryPoster", value: imageUrl}))
        // else if(type==='prim') dispatch(setNewMovie({key:"secondaryPoster", value: [...movieState.newMovie.secondaryPoster, imageUrl]}))
    }

    const handleDelete = (type) => {
        const [property, index] = type.split('[');
        if (index) {
            const numericIndex = parseInt(index.replace(']', ''), 10);
                imageDelete(movieState.newMovie[property][numericIndex]);
                dispatch(setNewMovie({key:type, value: undefined}))
        } else {
            imageDelete(movieState.newMovie[property]);
            dispatch(setNewMovie({key:type, value: null}))
        }

        // imageDelete(image[type]);
        // setImage({ ...image, [type]: null });
        // if (type === 'prim') dispatch(setNewMovie({ key: "primaryPoster", value: null }))
        // else dispatch(setNewMovie({ key: "secondaryPoster", value: [] }))
    }

    return (
        <View style={styles.constainer}>
            {loading && movieState.newMovie.primaryPoster === '0' ?
                <Shimmer style={{ width: '48%', borderRadius: 10 }} /> :
                <View style={{ width: '48%', position: 'relative' }}>
                    <TouchableOpacity style={styles.posterImage} onPress={() => handleImage("primaryPoster")}>
                        <Image source={movieState.newMovie.primaryPoster ? { uri: movieState.newMovie.primaryPoster } : PosterUpload} alt="upload poster" style={{ width: '100%', height: '100%', resizeMode: 'cover' }}></Image>
                    </TouchableOpacity>
                    {movieState.newMovie.primaryPoster &&
                        <TouchableOpacity style={styles.closeIcon}
                            onPress={() => handleDelete('primaryPoster')}
                        >
                            <AntDesign name="closecircle" size={20} color="#808080" />
                        </TouchableOpacity>}
                </View>
            }
            <View style={{ width: '48%', justifyContent: 'space-between' }}>
                {loading && movieState.newMovie.secondaryPoster[0] === '0' ?
                    <Shimmer style={{ width: '100%', height: 118, borderRadius: 10 }} /> :
                    <TouchableOpacity style={styles.posterImage2} onPress={() => handleImage("secondaryPoster[0]")}>
                        <Image source={movieState.newMovie.secondaryPoster[0] ? { uri: movieState.newMovie.secondaryPoster[0] } : PosterUpload2} alt="upload poster" style={{ width: '100%', height: '100%', resizeMode: 'cover' }}></Image>
                        {movieState.newMovie.secondaryPoster[0] &&
                            <TouchableOpacity style={styles.closeIcon}
                                onPress={() => handleDelete('secondaryPoster[0]')}
                            >
                                <AntDesign name="closecircle" size={20} color="#808080" />
                            </TouchableOpacity>}
                    </TouchableOpacity>
                }
                {loading && movieState.newMovie.secondaryPoster[1] === '0' ?
                    <Shimmer style={{ width: '100%', height: 118, borderRadius: 10 }} /> :
                    <TouchableOpacity style={styles.posterImage2} onPress={() => handleImage("secondaryPoster[1]")}>
                        <Image source={movieState.newMovie.secondaryPoster[1] ? { uri: movieState.newMovie.secondaryPoster[1] } : PosterUpload2} alt="upload poster" style={{ width: '100%', height: '100%', resizeMode: 'cover' }}></Image>
                        {movieState.newMovie.secondaryPoster[1] &&
                            <TouchableOpacity style={styles.closeIcon}
                                onPress={() => handleDelete('secondaryPoster[1]')}
                            >
                                <AntDesign name="closecircle" size={20} color="#808080" />
                            </TouchableOpacity>}
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}
export default PosterImages;

const styles = StyleSheet.create({
    constainer: {
        height: 250,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    posterImage: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    posterImage2: {
        height: 118,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative'
    },
    closeIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 10
    },

})