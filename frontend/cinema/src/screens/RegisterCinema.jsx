import { StyleSheet, Text, View, ScrollView } from "react-native"
import Register from '../components/register-cinema/Register';
import ScreenWrapper from './ScreenWrapper';

const RegisterCinema = ({navigation}) => {
    return (
        <View style={styles.conatiner}>
            <ScreenWrapper title="Register cinema" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                style={{height:'auto'}}
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column', width: '100%'}}
            >
                <Register navigation={navigation}/>
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