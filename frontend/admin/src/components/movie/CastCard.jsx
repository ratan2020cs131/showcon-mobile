import { View, Text, Image, StyleSheet } from 'react-native';
import Avtar from '../../../assets/images/avtar2.png';
import GlobalStyles from '../../GlobalStyles';

const CastCard = ({title}) => {
    return (
        <View style={styles.container}>
            <View style={styles.castImage}>
                <Image source={Avtar} style={GlobalStyles.image}></Image>
            </View>
            <Text style={[GlobalStyles.semiBoldText, { textAlign: 'center' }]}>{title?title:'Actor Name'}</Text>
        </View>
    )
}
export default CastCard;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems:'center',
        width: 100,
        marginRight:10
    },
    castImage: {
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: 'red'
    }
})