import { View, Modal, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import GlobalStyles from '../../GlobalStyles';
import { Ionicons } from '@expo/vector-icons';

const ModalView = ({ visible, onClose, qr }) => {
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
                    <View style={styles.qrContainer}>
                    <Image source={qr} style={styles.qrImage}></Image>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: "80%",
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
    qrContainer:{
        marginVertical:70,
        height:200,
        width:200,
    },
    qrImage:{
        width:'100%',
        height:'100%',
        resizeMode:'cover'
    }

});

export default ModalView;