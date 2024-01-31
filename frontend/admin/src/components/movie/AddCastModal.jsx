import { Modal, Text, View, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import GlobalStyles from '../../GlobalStyles';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import SuccessCheck from '../Success';
import { Checkbox, } from 'react-native-paper';
import Avtar from '../../../assets/images/avtar2.png';
import WhiteCheck from '../../../assets/images/check.png';
import { singleImageHandler } from '../../utils/ImagePicker';
import { actor, addActor, resestAddNewActor, getActors } from '../../redux/features/actor/ActorSlice';
import { movie, setNewMovie } from '../../redux/features/movie/MovieSlice';
import { useDispatch, useSelector } from 'react-redux';
import { imageDelete } from '../../utils/ImageApi';
import Shimmer from '../Shimmer';

const AddCastModal = ({ visible, onClose }) => {
    const actorState = useSelector(actor);
    const dispatch = useDispatch();
    const [castForm, setCastForm] = useState();
    const [success, setSucess] = useState(false);
    const openForm = () => setCastForm(true);
    const closeForm = () => setCastForm(false);

    useEffect(() => {
        if (actorState.isAdded) {
            setTimeout(() => {
                dispatch(resestAddNewActor());
                setCastForm(false);
            }, 3000);
        }
    }, [actorState.isAdded])


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                {actorState.isAdded ?
                    <SuccessCheck modal={false} title={"Cast Added"} /> :
                    <>
                        {castForm ?
                            <AddCast closeForm={closeForm} /> :
                            <CastDropDown openForm={openForm} onClose={onClose} refresh={castForm} />
                        }
                    </>
                }
            </View>
        </Modal>
    )
}
export default AddCastModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        paddingTop: 40,
        paddingBottom: 20,
        borderRadius: 10,
        elevation: 5,
        position: 'relative'
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 5
    },
    castImage: {
        width: 90,
        height: 90,
        borderRadius: 100,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    castListcontainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 90,
        flexShrink: 0,
    },
    castListImage: {
        width: 65,
        height: 65,
        borderRadius: 100,
        overflow: 'hidden'
    }
})


const AddCast = ({ closeForm }) => {
    const actorState = useSelector(actor);
    const dispatch = useDispatch();
    const [actorData, setActorData] = useState({
        name: '',
        image: null
    })

    const handleImage = async () => {
        if (actorData.image !== null) {
            imageDelete(actorData.image);
        }
        setActorData({ ...actorData, ['image']: '0' });
        const imageUrl = await singleImageHandler();
        if (!imageUrl) {
            setActorData({ ...actorData, ['image']: null });
        } else {
            console.log(imageUrl);
            setActorData({ ...actorData, ['image']: imageUrl });
        }
    }

    const handleClose = () => {
        imageDelete(actorData.image);
        closeForm();
    }

    const handleAddActor = () => {
        if (actorData.name !== '') {
            dispatch(addActor(actorData))
        }
    }

    useEffect(() => {
        console.log(actorState);
    }, [actorState])


    return (
        <View style={styles.modalContent}>
            <TouchableOpacity style={styles.icon} onPress={handleClose}>
                <Ionicons name="close-outline" size={25} ></Ionicons>
            </TouchableOpacity>
            <View style={{ alignItems: 'center', gap: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                {actorData.image ?
                    <>
                        <View style={styles.castImage}>
                            {actorData.image === '0' ? <Shimmer style={{ width: 90, height: 90, borderRadius: 100 }} /> :
                                <Image source={actorData.image ? { uri: actorData.image } : Avtar} style={[GlobalStyles.image]}></Image>}
                        </View>
                    </>
                    :
                    <TouchableOpacity style={styles.castImage} onPress={handleImage}>
                        <Ionicons name="person-add-outline" size={24} color="black" style={{ marginRight: 4 }} />
                    </TouchableOpacity>
                }
                <View style={{ width: 210, gap: 10 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#E0E0E0', borderRadius: 7, paddingHorizontal: 10, alignItems: 'center', width: '100%' }}>
                        <FontAwesome name="user-o" size={20} color="black" />
                        <TextInput placeholder={'Actor name'} style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, paddingLeft: 10, flex: 1 }]} onChangeText={(value) => setActorData({ ...actorData, ['name']: value })} />
                    </View>
                    {actorState.isLoading ?
                        <View style={{ height: 45, width: '100%', flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color="#F55139" />
                        </View> :
                        <TouchableOpacity style={[GlobalStyles.button, { width: '100%' }]} onPress={handleAddActor}>
                            <Text style={[GlobalStyles.boldText]}>ADD</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )
}




const CastDropDown = ({ openForm, onClose, refresh }) => {
    const actorState = useSelector(actor);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState()

    useEffect(() => {
        dispatch(getActors());
    }, [refresh]);

    useEffect(() => {
        setSearchResult(actorState.actors)
    }, [actorState.actors])


    useEffect(() => {
        const regexPattern = new RegExp(`^${search}`, 'i');
        const filteredArray = actorState.actors?.filter(item => regexPattern.test(item.name));
        setSearchResult(filteredArray)
    }, [search])



    return (
        <View style={styles.modalContent}>
            <TouchableOpacity style={styles.icon} onPress={onClose}>
                <Ionicons name="close-outline" size={25} ></Ionicons>
            </TouchableOpacity>
            <View style={{ width: '100%', height: 45, flexDirection: 'row', backgroundColor: '#E0E0E0', paddingHorizontal: 10, borderRadius: 7, alignItems: 'center', gap: 3 }}>
                <TextInput placeholder={'Search'} style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, flex: 1, fontSize: 17 }]} onChangeText={(value) => setSearch(value)} />
                <AntDesign name="search1" size={24} color="#707070" />
            </View>
            {actorState.isLoading ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 15 }}>
                    {
                        [1, 2, 3].map((item, index) => (
                            <View key={index} style={{ alignItems: 'center', marginVertical: 10, gap: 4 }}>
                                <Shimmer style={{ width: 60, height: 60, borderRadius: 100 }} />
                                <Shimmer style={{ width: 80, height: 15, borderRadius: 3 }} />
                                <Shimmer style={{ width: 90, height: 15, borderRadius: 3 }} />
                            </View>
                        ))
                    }
                </View>
                :
                <>
                    {searchResult?.length > 0 ?
                        <View style={{ width: '100%', justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap', gap: 15, paddingTop: 10 }}>
                            {searchResult?.map((item, index) => (
                                <ListCast key={index} item={item} />
                            ))}
                            <TouchableOpacity style={[styles.castImage, { width: 65, height: 65 }]} onPress={openForm}>
                                <Ionicons name="person-add-outline" size={24} color="black" style={{ marginRight: 4 }} />
                            </TouchableOpacity>
                        </View> :
                        <TouchableOpacity activeOpacity={0.3} style={{ alignItems: 'center', justifyContent: 'center', padding: 10, gap: 10 }} onPress={openForm}>
                            <Text style={[GlobalStyles.normalText, { color: '#303030', fontSize: 18, borderWidth: 0, paddingHorizontal: 8 }]}>No result found!</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <AntDesign name="adduser" size={24} color="black" />
                                <Text style={[GlobalStyles.normalText, { color: '#303030', fontSize: 18, borderWidth: 0, paddingHorizontal: 8 }]}>Add New</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </>
            }
        </View>
    )
}

const ListCast = ({ item }) => {
    const dispatch = useDispatch();
    const movieState = useSelector(movie);
    const handleSelect = (value) => {
        if (!movieState.newMovie.casts?.some(obj => obj._id === value._id)) {
            dispatch(setNewMovie({ key: 'casts', value: [...movieState.newMovie.casts, value] }));
        } else {
            dispatch(setNewMovie({ key: 'casts', value: movieState.newMovie.casts.filter((item) => item._id !== value._id) }));
        }
        console.log(movieState.newMovie);
    }




    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.castListcontainer}
            onPress={() => handleSelect(item)}
        >
            <View style={styles.castListImage}>
                {movieState.newMovie.casts?.some(obj => obj._id === item._id) &&
                    <View style={[GlobalStyles.image, { position: 'absolute', top: 0, left: 0, zIndex: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000090', borderRadius: 100 }]}>
                        <Image source={WhiteCheck} style={{ width: 50, height: 50 }}></Image>
                    </View>
                }
                <Image source={item.image ? { uri: item.image } : Avtar} style={[GlobalStyles.image]}></Image>
            </View>
            <Text style={[GlobalStyles.semiBoldText, { textAlign: 'center' }]} numberOfLines={2}>{item.name}</Text>
        </TouchableOpacity>
    )
}
