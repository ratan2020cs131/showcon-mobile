import {View, Text, StyleSheet} from 'react-native';
import Home from '../components/home/Home';

const HomeScreem = ()=>{
    return(
        <View style={styles.container}>
            <Home/>
        </View>
    )
}
export default HomeScreem;

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})
