import { View, Modal, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalStyles from '../GlobalStyles';
import { Ionicons } from '@expo/vector-icons';

const ModalView = ({ visible, onClose, title, button }) => {
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
                    {button&&
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={[GlobalStyles.buttonOutlined, styles.btn]}>
                                <Text style={[GlobalStyles.semiBoldText, {color:'#F55139'}]}>YES</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[GlobalStyles.button, styles.btn2]} onPress={onClose}>
                                <Text style={[GlobalStyles.semiBoldText]}>NO</Text>
                            </TouchableOpacity>
                        </View>
                    }
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
    title: {
        marginVertical: 10,
        textAlign: 'center'
    },
    btnContainer: {
        paddingTop: 20,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 70
    },
    btn: {
        paddingHorizontal:20,
    },
    btn2:{
        width:70,
        paddingHorizontal:20,
    }
});

export default ModalView;