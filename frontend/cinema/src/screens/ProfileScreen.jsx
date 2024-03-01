import { StyleSheet, Text, View, ScrollView } from "react-native"
import Profile from "../components/profile/Profile";
import ScreenWrapper from './ScreenWrapper';

const ProfileScreen = ({navigation}) => {
    return (
        <View style={styles.conatiner}>
            <ScreenWrapper title="Profile" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{ alignItems: 'flex-start', justifyContent:'center', flexDirection: 'row', width: '100%', minHeight:'100%' }}
            >
                <Profile navigation={navigation}/>
            </ScrollView>
        </View>
    )
}
export default ProfileScreen;

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    }
})