import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native"
import ScreenWrapper from './ScreenWrapper';
import AddShow from "../components/show/AddShow";
import GlobalStyles from "../GlobalStyles";

const AddShowScreen = ({ navigation, route }) => {
    return (
        <View style={styles.conatiner}>
            <ScreenWrapper title="Add a Show" sub={route.params.movie.title} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row', width: '100%', minHeight: '100%' }}
            >
                <AddShow />
            </ScrollView>
            <TouchableOpacity style={[GlobalStyles.button, { marginBottom: 20 }]}>
                <Text style={GlobalStyles.boldText}>ADD SHOW</Text>
            </TouchableOpacity>
        </View>
    )
}
export default AddShowScreen;


const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        width: "100%",
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
    }
})