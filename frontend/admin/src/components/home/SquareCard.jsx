import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import GloabalStyles from '../../GlobalStyles';

const SquareCard = ({ navigation, route, count, title, color }) => {
    return (
        <TouchableOpacity activeOpacity={navigation ? 0.2 : 1} style={[styles.container]}
            onPress={() => {
                navigation && navigation.navigate(route)
            }}
        >
            <Text style={[GloabalStyles.boldText, { fontSize: 30, color: color }]}>{count}</Text>
            <Text style={[GloabalStyles.normalText, { fontSize: 13 }]} numberOfLines={2}>{title}</Text>
        </TouchableOpacity>
    )
}
export default SquareCard;

const styles = StyleSheet.create({
    container: {
        width: 130,
        height: 130,
        padding: 10,
        elevation: 10,
        shadowColor: '#000',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})