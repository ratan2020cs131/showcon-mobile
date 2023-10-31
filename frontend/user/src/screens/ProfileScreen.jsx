import { View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from './ScreenWrapper';

const ProfileScreen = ({ navigation }) => {
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text>Profile</Text>
            </View>
        </ScreenWrapper>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})