import { StyleSheet, Text, View, ScrollView } from "react-native"
import Register from '../components/register-cinema/Register';
import ScreenWrapper from './ScreenWrapper';

const RegisterCinema = () => {
    return (
        <View style={styles.conatiner}>
            <ScreenWrapper title="Register cinema" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row', width: '100%', minHeight: '100%' }}
            >
                <Register />
            </ScrollView>
        </View>
    )
}
export default RegisterCinema;

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    }
})