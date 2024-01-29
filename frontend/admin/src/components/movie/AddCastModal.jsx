import { Modal, Text, View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
                    <View style={{ alignItems: 'center', gap: 10, flexDirection: 'row', justifyContent:'space-between' }}>
                            {false ?
                        <View style={styles.castImage}>
                                <Image source={Avtar} style={GlobalStyles.image}></Image>
                        </View>:
                                <TouchableOpacity style={styles.castImage}>
                                <Ionicons name="person-add-outline" size={24} color="black" style={{ marginRight: 4 }} />
                                </TouchableOpacity>
                            }
                        <View style={{width:210, gap:10}}>
                            <View style={{ flexDirection: 'row', backgroundColor: '#E0E0E0', borderRadius: 7, paddingHorizontal: 10, alignItems: 'center', width: '100%' }}>
                                <FontAwesome name="user-o" size={20} color="black" />
                                <TextInput placeholder={'Actor name'} style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, paddingLeft:10, flex: 1 }]} />
                            </View>
                            <TouchableOpacity style={[GlobalStyles.button, {width:'100%'}]}>
                                <Text style={[GlobalStyles.boldText]}>ADD</Text>
                            </TouchableOpacity>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        paddingVertical:40,
        borderRadius: 10,
        elevation: 5,
        position: 'relative',
        top:330
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
    }
})