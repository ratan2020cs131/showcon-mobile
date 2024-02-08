import { StyleSheet, Text, View, ScrollView } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import Screens from './Screens';

const AddShow = ({ navigation, route }) => {
    return (
        <View style={styles.conatiner}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row', width: '100%', minHeight: '100%' }}
            >
                <View style={{flex:1, padding:20}}>
                    <Text style={[GlobalStyles.boldText,{fontSize:18}]}>{route.params.movie.title}</Text>
                    <Screens/>
                </View>
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