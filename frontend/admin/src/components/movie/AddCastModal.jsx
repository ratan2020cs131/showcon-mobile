import { Modal, View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import GlobalStyles from '../../GlobalStyles';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';


const AddCastModal = ({ visible, onClose }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.icon} onPress={onClose}>
                        <Ionicons name="close-outline" size={25} ></Ionicons>
                    </TouchableOpacity>
                    <View style={{alignItems:'center', gap:10}}>
                        <View style={styles.castImage}>
                            {false ?
                                <Image source={Avtar} style={GlobalStyles.image}></Image> :
                                <Ionicons name="person-add-outline" size={24} color="black" style={{marginRight:6}}/>
                            }
                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#E0E0E0', borderRadius: 7, paddingHorizontal: 10, alignItems: 'center', width:'90%' }}>
                            {/* <MaterialCommunityIcons name="movie-edit-outline" size={20} color="black" /> */}
                            <FontAwesome name="user-o" size={20} color="black" />
                            <TextInput placeholder={'Actor name'} style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, flex: 1 }]} />
                        </View>
                    </View>
                </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        maxWidth: 350,
        minWidth:'90%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
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
        alignItems:'center',
        justifyContent:'center'
    }
})