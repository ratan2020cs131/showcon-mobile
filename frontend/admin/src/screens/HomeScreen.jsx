import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Home from '../components/home/Home';
import ScreenWrapper from './ScreenWrapper'

const HomeScreem = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScreenWrapper title="Dashboard" />
            <ScrollView 
            showsVerticalScrollIndicator={false} nestedScrollEnabled={true} 
            contentContainerStyle={{ justifyContent: 'center' }}>
                <Home navigation={navigation} />
            </ScrollView>
        </View>
    )
}
export default HomeScreem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
