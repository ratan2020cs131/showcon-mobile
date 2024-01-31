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
        if (image[type] !== null) {
            imageDelete(image[type]);
        }
        setImage({ ...image, [type]: '0' });
        setLoading(true);
        const imageUrl = await singleImageHandler();
        console.log(imageUrl);
        setImage({ ...image, [type]: imageUrl });
        if(type==='prim') dispatch(setNewMovie({key:"primaryPoster", value: imageUrl}))
        else dispatch(setNewMovie({key:"secondaryPoster", value: [...movieState.newMovie.secondaryPoster, imageUrl]}))
    }

    const handleDelete = (type) => {
        imageDelete(image[type]);
        setImage({ ...image, [type]: null });
        if(type==='prim') dispatch(setNewMovie({key:"primaryPoster", value: null}))
        else dispatch(setNewMovie({key:"secondaryPoster", value: []}))
    }

    return (
        <View style={styles.constainer}>
            {loading && image.prim === '0' ?
                <Shimmer style={{ width: '48%', borderRadius: 10 }} /> :
                <View style={{ width: '48%', position: 'relative' }}>
                    <TouchableOpacity style={styles.posterImage} onPress={() => handleImage("prim")}>
                        <Image source={image.prim ? { uri: image.prim } : PosterUpload} alt="upload poster" style={{ width: '100%', height: '100%', resizeMode: 'cover' }}></Image>
                    </TouchableOpacity>
                    {image.prim &&
                        <TouchableOpacity style={styles.closeIcon}
                            onPress={()=>handleDelete('prim')}
                        >
                            <AntDesign name="closecircle" size={20} color="#808080" />
                        </TouchableOpacity>}
                </View>
            }
            <View style={{ width: '48%', justifyContent: 'space-between' }}>
                {loading && image.sec1 === '0' ?
                    <Shimmer style={{ width: '100%', height: 118, borderRadius: 10 }} /> :
                    <TouchableOpacity style={styles.posterImage2} onPress={() => handleImage("sec1")}>
                        <Image source={image.sec1 ? { uri: image.sec1 } : PosterUpload2} alt="upload poster" style={{ width: '100%', height: '100%', resizeMode: 'cover' }}></Image>
                        {image.sec1 &&
                            <TouchableOpacity style={styles.closeIcon}
                                onPress={()=>handleDelete('sec1')}
                            >
                                <AntDesign name="closecircle" size={20} color="#808080" />
                            </TouchableOpacity>}
                    </TouchableOpacity>
                }
                {loading && image.sec2 === '0' ?
                    <Shimmer style={{ width: '100%', height: 118, borderRadius: 10 }} /> :
                    <TouchableOpacity style={styles.posterImage2} onPress={() => handleImage("sec2")}>
                        <Image source={image.sec2 ? { uri: image.sec2 } : PosterUpload2} alt="upload poster" style={{ width: '100%', height: '100%', resizeMode: 'cover' }}></Image>
                        {image.sec2 &&
                            <TouchableOpacity style={styles.closeIcon}
                                onPress={()=>handleDelete('sec2')}
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