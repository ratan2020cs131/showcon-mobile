import { StyleSheet,ScrollView, Text, View } from "react-native"
import Home from '../components/home/Home';
import ScreenWrapper from './ScreenWrapper';

const HomeScreen = ({navigation})=>{
    return(
        <View style={styles.conatiner}>
            <ScreenWrapper title="Dashboard"/>
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{ alignItems: 'flex-start', justifyContent:'center', flexDirection: 'row', width: '100%', minHeight:'100%' }}
            >
            <Home navigation={navigation}/>
            </ScrollView>
        </View>
    )
}
export default HomeScreen;

const styles = StyleSheet.create({
    conatiner:{
        flex:1,
        width:"100%",
        alignItems:'center',
        justifyContent:'flex-start'
    }
})




// import { StyleSheet, Text, View } from "react-native"

// const HomeScreen = ()=>{
//     return(
//         <View style={styles.conatiner}>
//             <Text>Home</Text>
//         </View>
//     )
// }
// export default HomeScreen;

// const styles = StyleSheet.create({
//     conatiner:{
//         flex:1,
//         width:"100%",
//         alignItems:'center',
//         justifyContent:'center'
//     }
// })