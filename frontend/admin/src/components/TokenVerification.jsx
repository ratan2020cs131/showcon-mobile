import { View, ActivityIndicator, StyleSheet } from "react-native";
import GlobalStyles from "../GlobalStyles";
import { useEffect } from "react";
import { auth, getProfile } from "../redux/features/Auth/AuthSlice";
import { UseDispatch, useDispatch, useSelector } from "react-redux";

const TokenVerification = ({ setLog }) => {
    const authState = useSelector(auth);
    const dispatch = useDispatch();
    useEffect(() => {
        if (authState.isAuth===undefined) {
            dispatch(getProfile())
        }else if(authState.isAuth===false){
            setLog(false)
        }else{
            setLog(true)
        }
    }, [authState.isAuth])

    return (
        <View style={[GlobalStyles.backgroundColor, styles.constainer]}>
            <ActivityIndicator size="large" color="#F55139" />
        </View>
    )
}
export default TokenVerification;

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})