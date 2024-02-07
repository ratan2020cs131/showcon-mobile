import { StyleSheet, Text, View, ScrollView } from "react-native"
import ScreenWrapper from './ScreenWrapper';

const AddShow = ({ navigation }) => {
    return (
        <View style={styles.conatiner}>
            <ScreenWrapper title="Add a Show" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row', width: '100%', minHeight: '100%' }}
            >
                <Text>Hello</Text>
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