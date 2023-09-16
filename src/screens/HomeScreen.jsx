import { View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from './ScreenWrapper';

const HomeScreen = ({ navigation }) => {
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text>Welcome Home</Text>
            </View>
        </ScreenWrapper>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})