import { View, Text, StyleSheet } from 'react-native';
import GlobalStyles from '../../GlobalStyles';

const RectandleCard = ({ navigation, style, data1, data2, data3 }) => {
    return (
        <View style={[styles.container, { width: style?.width ? style.width : 200, height: style?.height ? style?.height : 'auto' }]}>
            {data1 &&
                <View style={styles.dataCard}>
                    <Text style={[GlobalStyles.boldText, { fontSize: 35 }]}>{data1.value}</Text>
                    <Text style={[GlobalStyles.normalText, { fontSize: 13 }]}>{data1.title}</Text>
                </View>
            }
            {data2 &&
                <View style={styles.dataCard}>
                    <Text style={[GlobalStyles.boldText, { fontSize: 35 }]}>{data2.value}</Text>
                    <Text style={[GlobalStyles.normalText, { fontSize: 13 }]}>{data2.title}</Text>
                </View>
            }
            {data3 &&
                <View style={styles.dataCard}>
                    <Text style={[GlobalStyles.boldText, { fontSize: 35 }]}>8</Text>
                    <Text style={[GlobalStyles.normalText, { fontSize: 13 }]}>Total Cinema</Text>
                </View>
            }
        </View>
    )
}
export default RectandleCard;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#e0e0e0',
        borderRadius: 7,
        elevation: 10,
        paddingHorizontal: 15,
        gap: 53,
    },
    dataCard: {
        alignItems: 'center'
    }
})
