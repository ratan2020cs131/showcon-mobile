import { Modal, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyles from "../../GlobalStyles";

const SubmitModal = ({ visible, onClose, onSubmit }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <Submit onClose={onClose} onSubmit={onSubmit}/>
                </View>
            </View>
        </Modal>

    )
}
export default SubmitModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10
    },
    submitContainer: {
        position: 'relative',
        alignItems: 'center',
        gap: 20,
        width: 300,
        paddingVertical: 10
    },
    closeicon: {
        position: 'absolute',
        top: 0,
        right: 5
    }
})

const Submit = ({ onClose, onSubmit }) => {
    return (
        <View style={styles.submitContainer}>
            <TouchableOpacity style={styles.closeicon} onPress={onClose}>
                <Ionicons name="close-outline" size={25} ></Ionicons>
            </TouchableOpacity>
            <Text style={[GlobalStyles.normalText, { fontSize: 17 }]}>Add new movie?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: 10 }}>
                <TouchableOpacity style={[GlobalStyles.button, { width: '45%' }]} onPress={onSubmit}>
                    <Text style={[GlobalStyles.semiBoldText, { fontSize: 16, color:'#fff' }]}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[GlobalStyles.buttonOutlined, { width: '45%' }]} onPress={onClose}>
                    <Text style={[GlobalStyles.semiBoldText, { fontSize: 16 }]}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}