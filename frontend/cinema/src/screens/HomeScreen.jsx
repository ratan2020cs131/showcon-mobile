import { StyleSheet, Text, View } from "react-native"

const HomeScreen = ()=>{
    return(
        <View style={styles.conatiner}>
            <Text>Home</Text>
        </View>
    )
}
export default HomeScreen;

const styles = StyleSheet.create({
    conatiner:{
        flex:1,
        width:"100%",
        alignItems:'center',
        justifyContent:'center'
    }
})