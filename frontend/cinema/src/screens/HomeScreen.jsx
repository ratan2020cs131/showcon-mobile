import { StyleSheet, ScrollView, Text, View, RefreshControl } from "react-native"
import Home from '../components/home/Home';
import ScreenWrapper from './ScreenWrapper';
import { getCinema, register } from '../redux/features/Register/RegisterSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import GlobalStyles from "../GlobalStyles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Shimmer from '../components/Shimmer';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const registerState = useSelector(register);
    useEffect(() => { dispatch(getCinema()) }, [registerState.isRegistering])
    const refresh = () => dispatch(getCinema());

    return (
        <View style={styles.conatiner}>
            <ScreenWrapper title="Dashboard" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                style={{ width: '100%' }}
                contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row', minHeight: '100%' }}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={refresh}
                        colors={['#F55139']}
                    />
                }
            >
                {registerState.gettingstatus ?
                    <View style={{ width: '100%', padding: 20, gap: 20 }}>
                        <View style={{ flexDirection: 'row', gap: 20 }}>
                            <Shimmer style={{ width: "35%", height: 130, borderRadius: 7 }} />
                            <Shimmer style={{ width: "58%", height: 130, borderRadius: 7 }} />
                        </View>
                        <View style={{ flexDirection: 'row', gap: 20 }}>
                            <Shimmer style={{ width: "58%", height: 130, borderRadius: 7 }} />
                            <Shimmer style={{ width: "35%", height: 130, borderRadius: 7 }} />
                        </View>
                    </View> :
                    <>
                        {registerState?.status ?
                            <Home navigation={navigation} /> :
                            <View style={{ marginTop: 50, alignItems: 'center' }}>
                                <MaterialCommunityIcons name="movie-open-remove" size={84} color="black" />
                                <Text style={GlobalStyles.boldText}>You are not authorised</Text>
                                <Text style={GlobalStyles.semiBoldText}>Go to profile and register your cinema</Text>
                            </View>
                        }
                    </>
                }
            </ScrollView>
        </View>
    )
}
export default HomeScreen;

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start'
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