import { Modal, Text, View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import GlobalStyles from '../../GlobalStyles';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import SuccessCheck from '../Success';
import { Checkbox, } from 'react-native-paper';
import Avtar from '../../../assets/images/avtar2.png';
import WhiteCheck from '../../../assets/images/check.png';

const AddCastModal = ({ visible, onClose }) => {
    const [castForm, setCastForm] = useState();
    const [success, setSucess] = useState(true);
    const openForm = () => setCastForm(true);
    const closeForm = () => setCastForm(false);

    useEffect(() => {
        console.log(success);
        if (success) {
            setTimeout(() => setSucess(false), 2000);
        }
    }, [])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                {success ?
                    <SuccessCheck modal={false} title={"Cast Added"} /> :
                    <>
                        {castForm ?
                            <AddCast closeForm={closeForm} /> :
                            <CastDropDown openForm={openForm} onClose={onClose} />
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
        paddingVertical: 40,
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
    },
    castListcontainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 80,
        flexShrink: 0,
    },
    castListImage: {
        width: 65,
        height: 65,
        borderRadius: 100,
        position: 'relative'
    }
})


const AddCast = ({ closeForm }) => {
    return (
        <View style={styles.modalContent}>
            <TouchableOpacity style={styles.icon} onPress={closeForm}>
                <Ionicons name="close-outline" size={25} ></Ionicons>
            </TouchableOpacity>
            <View style={{ alignItems: 'center', gap: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                {false ?
                    <View style={styles.castImage}>
                        <Image source={Avtar} style={GlobalStyles.image}></Image>
                    </View> :
                    <TouchableOpacity style={styles.castImage}>
                        <Ionicons name="person-add-outline" size={24} color="black" style={{ marginRight: 4 }} />
                    </TouchableOpacity>
                }
                <View style={{ width: 210, gap: 10 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#E0E0E0', borderRadius: 7, paddingHorizontal: 10, alignItems: 'center', width: '100%' }}>
                        <FontAwesome name="user-o" size={20} color="black" />
                        <TextInput placeholder={'Actor name'} style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, paddingLeft: 10, flex: 1 }]} />
                    </View>
                    <TouchableOpacity style={[GlobalStyles.button, { width: '100%' }]}>
                        <Text style={[GlobalStyles.boldText]}>ADD</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const CastDropDown = ({ openForm, onClose }) => {
    return (
        <View style={styles.modalContent}>
            <TouchableOpacity style={styles.icon} onPress={onClose}>
                <Ionicons name="close-outline" size={25} ></Ionicons>
            </TouchableOpacity>
            <View style={{ width: '100%', height: 45, flexDirection: 'row', backgroundColor: '#E0E0E0', paddingHorizontal: 10, borderRadius: 7, alignItems: 'center', gap: 3 }}>
                <TextInput placeholder={'Search'} style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, flex: 1, fontSize: 17 }]} />
                <AntDesign name="search1" size={24} color="#707070" />
            </View>
            {false ?
                <TouchableOpacity activeOpacity={0.3} style={{ alignItems: 'center', justifyContent: 'center', padding: 10, flexDirection: 'row' }} onPress={openForm}>
                    <AntDesign name="adduser" size={24} color="black" />
                    <Text style={[GlobalStyles.normalText, { color: '#303030', fontSize: 18, borderWidth: 0, paddingHorizontal: 8 }]}>Add New</Text>
                </TouchableOpacity> :
                <View style={{ width: '100%', justifyContent: 'space-around', flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingTop: 10 }}>
                    {castArray.map((item, index) => (
                        <ListCast key={index} item={item} />
                    ))}
                </View>
            }
        </View>
    )
}

const ListCast = ({ item }) => {
    const [check, setCheck] = useState(false);
    const handleSelect = () => {
        setCheck(!check)
    }
    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.castListcontainer}
            onPress={handleSelect}
        >
            <View style={styles.castListImage}>
                {check && 
                <View style={[GlobalStyles.image, { position: 'absolute', top: 0, left: 0, zIndex:10, alignItems:'center',justifyContent:'center', backgroundColor:'#00000090', borderRadius: 100 }]}>
                    <Image source={WhiteCheck} style={{width:50, height:50}}></Image>
                </View>}
                <Image source={Avtar} style={GlobalStyles.image}></Image>
            </View>
            <Text style={[GlobalStyles.semiBoldText, { textAlign: 'center' }]}>{item.name}</Text>
        </TouchableOpacity>
    )
}

const castArray = [
    {
        name: 'Salman Khan'
    },
    {
        name: 'Salman Khan'
    },
    {
        name: 'Shah Rukh Khan'
    },
    {
        name: 'Salman Khan'
    },
    {
        name: 'Salman Khan'
    },
    {
        name: 'Salman Khan'
    }
]
