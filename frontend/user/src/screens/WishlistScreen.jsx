import { View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from './ScreenWrapper';

const WishlistScreen = ({ navigation }) => {
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text>Wishlist</Text>
            </View>
        </ScreenWrapper>
    )
}

export default WishlistScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})