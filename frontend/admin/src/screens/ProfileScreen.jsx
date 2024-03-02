import {View, Text, StyleSheet} from 'react-native';
import Profile from '../components/profile/Profile';

const ProfileScreen = ({navigation})=>{
    return(
        <View style={styles.container}>
            <Profile navigation={navigation}/>
        </View>
    )
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
})
