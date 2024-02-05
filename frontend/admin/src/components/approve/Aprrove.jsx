import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../GlobalStyles';

const Approve = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <CinemaCard />
        </View>
    )
}
export default Approve;



const CinemaCard = () => {
    
    return (
        <View style={styles.card}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <View>
                    <Text style={[GlobalStyles.boldText, { fontSize: 16 }]}>Cinema Name</Text>
                    <Text numberOfLines={2} style={GlobalStyles.normalText}>Address: 1026 Verona Mahagun</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={GlobalStyles.normalText}>Total Seats: </Text>
                        <Text style={[GlobalStyles.semiBoldText, { paddingHorizontal: 5, fontSize: 18 }]}> 190</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={GlobalStyles.normalText}>Total Screens: </Text>
                        <Text style={[GlobalStyles.semiBoldText, { paddingHorizontal: 5, fontSize: 18 }]}> 8</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={GlobalStyles.normalText}>Type</Text>
                        <Text style={[GlobalStyles.semiBoldText, { paddingHorizontal: 5, fontSize: 15 }]}>Recliner, IMAX 3D</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity style={[GlobalStyles.buttonOutlined, { borderColor: '#101010', height: 35, width: '50%', maxWidth: 150 }]}>
                    <Text style={GlobalStyles.boldText}>Discard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[GlobalStyles.button, { height: 37, width: '50%', maxWidth: 150 }]}>
                    <Text style={[GlobalStyles.boldText, { color: '#fff', fontSize: 16 }]}>Approve</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        width: '100%',
        alignItems: 'center'
    },
    card: {
        gap: 15,
        width: '100%',
        maxWidth: 350,
        padding: 10,
        borderRadius: 7,
        elevation: 10,
        backgroundColor: '#e0e0e0'
    }
})