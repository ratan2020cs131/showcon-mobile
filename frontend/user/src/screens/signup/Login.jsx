import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, } from "react-native";
import { Picker } from "@react-native-picker/picker";
import GlobalStyles from "../../GlobalStyles";
import Logo from "../../../assets/Logo.png";

const Login = ({ navigation }) => {
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
        />
        <TouchableOpacity style={[GlobalStyles.button]} onPress={() =>{navigation.navigate("Otp")}}>
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
  }
});

export default Login;
