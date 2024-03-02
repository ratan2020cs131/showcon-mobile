import { Modal, View, Text, TouchableOpacity } from 'react-native';
import GlobalStyles from '../GlobalStyles';
import { AntDesign } from '@expo/vector-icons';

const ModalAlert = ({ close, visible, alert }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={close}
        >
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', alignItems:'center', justifyContent:'center'}}>
                <View style={{position:'relative', backgroundColor: '#fff', padding: 20,  borderRadius:7, paddingHorizontal:20, paddingTop:25}}>
                    <TouchableOpacity 
                    style={{position:'absolute', right:4,top:2}}
                    onPress={close}
                    >
                    <AntDesign name="close" size={18} color="black" />
                    </TouchableOpacity>
                    <Text style={[GlobalStyles.semiBoldText,{fontSize:17}]}>{alert ? alert : "ALERT"}</Text>
                </View>
            </View>
        </Modal>
    )
}
export default ModalAlert