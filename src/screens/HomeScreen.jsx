import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import ScreenWrapper from './ScreenWrapper';

const HomeScreen = ({ navigation }) => {
    return (
            <View style={styles.container}>
                <Text>Welcome Home</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("ShowScreen")}>
                <Text>POSTER</Text>
                </TouchableOpacity>
            </View>
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