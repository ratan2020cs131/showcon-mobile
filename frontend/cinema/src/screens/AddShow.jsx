import { StyleSheet, Text, View, ScrollView } from "react-native"
import Profile from "../components/profile/Profile";
import ScreenWrapper from './ScreenWrapper';

const AddShow = ({navigation}) => {
    return (
        <View style={styles.conatiner}>
            <ScreenWrapper title="Profile" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{ alignItems: 'flex-start', justifyContent:'center', flexDirection: 'row', width: '100%', minHeight:'100%' }}
            >
                <Text>Add Show</Text>
            </ScrollView>
        </View>
    )
}
export default AddShow;


const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        width: "100%",
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
})