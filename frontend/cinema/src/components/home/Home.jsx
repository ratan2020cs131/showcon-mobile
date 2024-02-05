import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GlobalStyles from '../../GlobalStyles';
import Shimmer from '../Shimmer';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.conatiner}>
            <View style={{ width: '100%', flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity style={{ paddingVertical: 15, gap: 10, alignItems: 'center', justifyContent: 'center', width: 110, height: 110, backgroundColor: "#e0e0e0", borderRadius: 7 }}
                    activeOpacity={0.4}
                    onPress={() => navigation.navigate("Scanner")}
                >
                    <MaterialCommunityIcons name="qrcode-scan" size={35} color="black" />
                    <Text style={GlobalStyles.semiBoldText}>Scan Ticket</Text>
                </TouchableOpacity>

                {false ?
                    <Shimmer style={{ width: '65%', height: 110, borderRadius: 7 }} /> :
                    <View style={{ width: '65%', height: 110, backgroundColor: '#e0e0e0', borderRadius: 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <ValueCard count={13} title="Today's Shows" />
                        <ValueCard count={10} title="Today's Shows" />
                    </View>
                }
            </View>

            <View style={{ width: '100%', flexDirection: 'row', gap: 10 }}>
                {false ?
                    <Shimmer style={{ width: '65%', height: 110, borderRadius: 7 }} /> :
                    <View style={{ width: '65%', height: 110, backgroundColor: '#e0e0e0', borderRadius: 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <ValueCard count={"237"} title="Today's Booking" />
                        <ValueCard count={"43"} title="Today's Booking" />
                    </View>
                }
                <TouchableOpacity activeOpacity={0.4} 
                style={{ paddingVertical: 15, gap: 10, alignItems: 'center', justifyContent: 'center', width: 110, height: 110, backgroundColor: "#e0e0e0", borderRadius: 7 }}
                onPress={()=>{navigation.navigate("AddShow")}}
                >
                    <MaterialCommunityIcons name="movie-open-plus" size={34} color="black" />
                    <Text style={GlobalStyles.semiBoldText}>Add Show</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}
export default HomeScreen;

const ValueCard = ({ count, title }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={[GlobalStyles.boldText, { fontSize: 30 }]}>{count}</Text>
            <Text numberOfLines={2} style={[GlobalStyles.normalText, { fontSize: 13, width: 90, textAlign: 'center' }]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        gap: 10
    }
})