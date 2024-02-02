import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';


const ModalLoading = ({ close, visible }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={close}
        >
            <View style={styles.container}>
                <ActivityIndicator size={"large"} color="#F55139" />
            </View>
        </Modal>
    )
}
export default ModalLoading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)'
    }
})