import { KeyboardAvoidingView, StyleSheet, View } from "react-native"
import ScreenWrapper from './ScreenWrapper';
import AddShow from "../components/show/AddShow";
import GlobalStyles from "../GlobalStyles";

const AddShowScreen = ({ navigation, route }) => {
    return (
        <KeyboardAvoidingView style={styles.conatiner}>
            <ScreenWrapper title="Add a Show" sub={route.params.movie.title} />
            <AddShow movie={route.params.movie} navigation={navigation} />
        </KeyboardAvoidingView >
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