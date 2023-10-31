import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import Logo from "../../../assets/Logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { signin, auth } from "../../Redux/Features/Auth/authSlice";

const Login = ({ navigation }) => {
  const dispatch=useDispatch();
  const authState = useSelector(auth)
  const[mobileNo,setMobileNo] = useState('');
  const[phoneError, setPhoneError]=useState(false);

  useEffect(()=>{
    let registered = authState.isRegistered;
    if(registered===undefined){}
    else if(registered===true){
      navigation.navigate("Otp",{mobileNo})
    }else if(registered===false){
      navigation.navigate("Register")
    }
  },[authState.isRegistered])

  const handleChange=(text)=>{
    if(phoneError){setPhoneError(false)}
    setMobileNo(text);
  }

  const handleSubmit = ()=>{
    if(mobileNo.length<10){
      setPhoneError(true)
    }
    else{
      dispatch(signin({mobileNo}));
    }
  }

  return (
    <View style={[GlobalStyles.backgroundColor, styles.container]}>
      <Image source={Logo} style={[GlobalStyles.logo]}></Image>
      <View style={styles.form}>
        <TextInput
          placeholder="Enter Mobile Number"
          placeholderTextColor="#E9E5D7"
          maxLength={10}
          keyboardType="numeric"
          style={[ GlobalStyles.input, styles.formInput ]}
          onChangeText={handleChange}
        />
        {
          phoneError&&
          <Text style={[GlobalStyles.boldText, GlobalStyles.pText, styles.error]}>
                  Enter Phone Number
          </Text>
        }
        <TouchableOpacity style={[GlobalStyles.button]} onPress={handleSubmit}>
          <Text style={[GlobalStyles.boldText]}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  form: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    marginVertical: 170,
  },
  
  formInput: {
    width:"85%",
  },

  error:{
    color:"#F55139"
  }
});

export default Login;
