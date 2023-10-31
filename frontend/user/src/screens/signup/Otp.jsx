import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import Logo from "../../../assets/Logo.png";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { verify, auth, resetError } from "../../Redux/Features/Auth/authSlice";
import { CommonActions } from '@react-navigation/native';

const Otp = ({ navigation, route }) => {
  const { mobileNo } = route.params;
  const dispatch = useDispatch();
  const authState = useSelector(auth);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [count, setCount] = useState(0);
  const [password, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [loginWithPassword, setLoginWithPassword] = useState(true);
  const otpInputs = useRef([]);

  useEffect(() => {
    console.log(authState)
    if(authState.token){
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Home' },
        ],
      }));
    }
  }, [authState])

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleLoginWithPassword = () => {
    setLoginWithPassword(!loginWithPassword);
  };

  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === "Backspace" && count > 0) {
      const newOtp = [...otp];
      const lastIndex = count - 1;
      newOtp[lastIndex] = "";
      setOtp(newOtp);
      setCount(count - 1);
      if (lastIndex >= 0) {
        otpInputs.current[lastIndex].focus();
      }
    }
    if (nativeEvent.key !== "Backspace" && count < 4) {
      const newOtp = [...otp];
      newOtp[count] = nativeEvent.key;
      setOtp(newOtp);
      setCount(count + 1);
      if (count < 3) {
        otpInputs.current[count + 1].focus();
      }
    }
  };

  const handlePass = (text) => {
    dispatch(resetError());
    setPass(text);
  }

  const handleSubmit = () => {
    if (!loginWithPassword && password.length > 0) {
      dispatch(verify({ mobileNo, password }))
    }
  }

  return (
    <KeyboardAvoidingView style={styles.content} behavior="height" enabled>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[GlobalStyles.backgroundColor, styles.container]}>
          <Image source={Logo} style={[GlobalStyles.logo]}></Image>
          <View style={styles.form}>
            {loginWithPassword ? (
              <View style={styles.inputs}>
                {otp.map((value, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (otpInputs.current[index] = ref)}
                    style={[GlobalStyles.input, styles.otpInput]}
                    value={value}
                    maxLength={1}
                    keyboardType="numeric"
                    onKeyPress={handleKeyPress}
                  />
                ))}
              </View>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  placeholder="Set Password"
                  placeholderTextColor="#E9E5D7"
                  maxLength={20}
                  secureTextEntry={showPassword}
                  style={[GlobalStyles.input, styles.formInput]}
                  onChangeText={handlePass}
                />
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={toggleShowPassword}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={24}
                    color="#E9E5D7"
                  />
                </TouchableOpacity>
              </View>
            )}

            {
              authState.error &&
              <Text style={[GlobalStyles.boldText, GlobalStyles.pText, styles.error]}>
                {authState.error}
              </Text>
            }

            <TouchableOpacity
              style={[GlobalStyles.button]}
              onPress={handleSubmit}
            >
              <Text style={[GlobalStyles.boldText]}>LOGIN</Text>
            </TouchableOpacity>

            {loginWithPassword ? (
              <TouchableOpacity onPress={toggleLoginWithPassword}>
                <Text style={[GlobalStyles.boldText, GlobalStyles.pText]}>
                  Login with Password
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={toggleLoginWithPassword}>
                <Text style={[GlobalStyles.boldText, GlobalStyles.pText]}>
                  Login with OTP
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
  },

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
    marginVertical: 50,
  },

  inputs: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },

  otpInput: {
    width: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 0,
    textAlign: "center",
  },

  formInput: {
    width: "85%",
  },

  iconContainer: {
    borderLeftWidth: 1.5,
    borderLeftColor: "#E9E5D7",
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
  },

  error:{
    color:"#F55139"
  }
});

export default Otp;
