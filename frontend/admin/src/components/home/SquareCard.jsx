import { View, Text, StyleSheet } from 'react-native';
import GloabalStyles from '../../GlobalStyles';

const SquareCard = ({ count, title, color }) => {
    return (
        <View style={[styles.container]}>
            <Text style={[GloabalStyles.boldText, { fontSize: 30, color:color }]}>{count}</Text>
            <Text style={[GloabalStyles.normalText, { fontSize: 13 }]} numberOfLines={2}>{title}</Text>
        </View>
    )
}
export default SquareCard;

const styles = StyleSheet.create({
    container: {
        width:130,
        height:130,
        padding:10,
        elevation: 10,
        shadowColor:'#000',
        backgroundColor: '#d0d0d0',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})