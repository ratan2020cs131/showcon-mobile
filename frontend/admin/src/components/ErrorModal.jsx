import { Modal, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyles from "../GlobalStyles";

const ErrorModal = ({ visible, onClose, error }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.conatiner}>
                <View style={styles.content}>
                <TouchableOpacity style={styles.closeicon} onPress={onClose}>
                    <Ionicons name="close-outline" size={25} ></Ionicons>
                </TouchableOpacity>
                    <Text style={[GlobalStyles.semiBoldText, {
                        color:'#d21f3c',
                        // color:'#ff5c5c',
                        }]}>Error! {error}</Text>
                </View>
            </View>
        </Modal>
    )
}
export default ErrorModal;

const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    content: {
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 10,
        position:'relative'
    },
    closeicon: {
        position: 'absolute',
        top: 0,
        right: 5
    }
})
