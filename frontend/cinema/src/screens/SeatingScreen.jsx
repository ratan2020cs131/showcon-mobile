import { StyleSheet,ScrollView, Text, View } from "react-native"
import Seating from "../components/seating/Seating";
import ScreenWrapper from "./ScreenWrapper";

const SeatingScreen = ()=>{
    return(
        <View style={styles.conatiner}>
            <ScreenWrapper title="Add screen"/>
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{ alignItems: 'flex-start', justifyContent:'center', flexDirection: 'row', width: '100%', minHeight:'100%' }}
            >
            <Seating/>
            </ScrollView>
        </View>
    )
}
export default SeatingScreen;

const styles = StyleSheet.create({
    conatiner:{
        flex:1,
        width:"100%",
        alignItems:'center',
        justifyContent:'center'
    }
})