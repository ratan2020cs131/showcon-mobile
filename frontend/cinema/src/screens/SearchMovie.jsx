import { StyleSheet, Text, View, ScrollView } from "react-native";
import ScreenWrapper from './ScreenWrapper';
import Search from "../components/show/Search";

const SearchMovie = ({ navigation }) => {
    return (
        <View style={styles.conatiner}>
            <ScreenWrapper title="Search Movie" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row', width: '100%', minHeight: '100%' }}
            >
                <Search navigation={navigation}/>
            </ScrollView>
        </View>
    )
}
export default SearchMovie;


const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        width: "100%",
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
})