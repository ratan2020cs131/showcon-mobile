import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Profile from '../components/profile/Profile';
import ScreenWrapper from './ScreenWrapper';
import Approve from '../components/approve/Aprrove';

const ApproveCinema = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScreenWrapper title="Approve Cinema" />
            <ScrollView
                showsVerticalScrollIndicator={false} nestedScrollEnabled={true}
                style={{width:'100%',paddingHorizontal:20,}}
                contentContainerStyle={{ justifyContent: 'center' }}>
                <Approve />
            </ScrollView>
        </View>
    )
}
export default ApproveCinema;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width:'100%',
    },
})
