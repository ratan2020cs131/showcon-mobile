import { View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from './ScreenWrapper';

const BookedShowScreen = ({ navigation }) => {
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text>Booked Shows</Text>
            </View>
        </ScreenWrapper>
    )
}

export default BookedShowScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})