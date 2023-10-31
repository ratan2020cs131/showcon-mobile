import { View, Modal, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalStyles from '../GlobalStyles';
import { Ionicons } from '@expo/vector-icons';

const ModalView = ({ visible, onClose, title }) => {
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
                    <Text style={[GlobalStyles.semiBoldText, styles.title]}>{title}</Text>
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
    title:{
        marginVertical:10,
    }
});

export default ModalView;