import {StyleSheet} from 'react-native';

const GlobalStyles = StyleSheet.create({
    boldText:{
        fontFamily:"Montserrat-Bold",
    },

    normalText:{
        fontFamily:"Montserrat-Regular",
    },

    logo: {
        marginTop:40,
        height:117,
        width:208,
    },

    backgroundColor:{
        backgroundColor:'#1E1F22',
    },

    pText: {
        color:'#E9E5D7',
    },

    button:{
        backgroundColor:'#F55139',
        height:45,
        width:"85%",
        borderRadius:7,
        justifyContent: 'center',
        alignItems: 'center',
    },

    input: {
        borderWidth:1,
        borderColor:'#E9E5D7',
        borderRadius:7,
        height:45,
        paddingHorizontal:20,
        fontSize:16,
        color:'#E9E5D7',
        fontFamily:"Montserrat-SemiBold",
    },

    picker: {
        height:40,
        width:50,
        borderWidth:1,
        borderColor:'#E9E5D7',
        borderRadius:10,
    }
});

export default GlobalStyles;
