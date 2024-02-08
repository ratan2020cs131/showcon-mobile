import { StyleSheet, Text, View, ScrollView } from "react-native"
import ScreenWrapper from './ScreenWrapper';
import AddShow from "../components/show/AddShow";

const AddShowScreen = ({ navigation, route}) => {
    return (
        <View style={styles.conatiner}>
            <ScreenWrapper title="Add a Show" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row', width: '100%', minHeight: '100%' }}
            >
                <AddShow route={route}/>
            </ScrollView>
        </View>
    )
}
export default AddShowScreen;


const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        width: "100%",
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
})