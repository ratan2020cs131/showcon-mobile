import { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import Logo from "../../../assets/Logo.png";

const Otp = ({ navigation }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [count, setCount] = useState(0);
  const otpInputs = useRef([]);

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

  return (
    <View style={[GlobalStyles.backgroundColor, styles.container]}>
      <Image source={Logo} style={[GlobalStyles.logo]}></Image>
      <View style={styles.form}>
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
        <TouchableOpacity style={[GlobalStyles.button]} onPress={() =>{navigation.navigate("Home")}}>
          <Text style={[GlobalStyles.btnText]}>LOGIN</Text>
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

  inputs: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },

  otpInput: {
    width:45,
    borderWidth:0,
    borderBottomWidth:1,
    borderRadius:0,
    paddingHorizontal:0,
    textAlign:"center",
  },
});

export default Otp;
