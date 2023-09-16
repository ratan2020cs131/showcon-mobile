import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import GlobalStyles from "../../GlobalStyles";
import Logo from "../../../assets/Logo.png";
import { Ionicons } from "@expo/vector-icons";
import TextIcon from "./TextIcon";

const Register = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleInputChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView style={styles.content} behavior="height" enabled>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[GlobalStyles.backgroundColor, styles.container]}>
          <Image source={Logo} style={[GlobalStyles.logo]}></Image>
          <View style={styles.form}>
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#E9E5D7"
              maxLength={20}
              onChangeText={(value) => handleInputChange("fname", value)}
              style={[GlobalStyles.input, styles.formInput]}
            />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#E9E5D7"
              maxLength={20}
              onChangeText={(value) => handleInputChange("lname", value)}
              style={[GlobalStyles.input, styles.formInput]}
            />
            <TextInput
              placeholder="Enter your Email"
              placeholderTextColor="#E9E5D7"
              keyboardType="email-address"
              autoCapitalize="none"
              maxLength={20}
              onChangeText={(value) => handleInputChange("email", value)}
              style={[GlobalStyles.input, styles.formInput]}
            />
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="Set Password"
                placeholderTextColor="#E9E5D7"
                maxLength={20}
                secureTextEntry={showPassword}
                onChangeText={(value) => handleInputChange("password", value)}
                style={[GlobalStyles.input, styles.formInput]}
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
            <View style={styles.validate}>
              <View>
                <TextIcon
                  correct={user.password.length >= 8 ? true : false}
                  text="Minimum 8 characters"
                />
                <TextIcon
                  correct={user.password.length <= 15 ? true : false}
                  text="Maximum 15 characters"
                />
                <TextIcon
                  correct={/[a-z]/.test(user.password) ? true : false}
                  text="1 lower case"
                />
                <TextIcon
                  correct={/[A-Z]/.test(user.password) ? true : false}
                  text="1 upper case"
                />
                <TextIcon
                  correct={/[0-9]/.test(user.password) ? true : false}
                  text="1 digit"
                />
                <TextIcon
                  correct={
                    /[+×÷=/_<>!@#$₹%&*(),?]/.test(user.password) ? true : false
                  }
                  text="1 special character (!@#$%^&*)"
                />
              </View>
            </View>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#E9E5D7"
              maxLength={20}
              secureTextEntry={true}
              onChangeText={(value) => handleInputChange("cpassword", value)}
              style={[
                GlobalStyles.input,
                styles.formInput,
              ]}
            />
            <View style={[styles.validate, { marginBottom: 25 },]}>
              <View>
                <TextIcon
                  correct={(user.password === user.cpassword) && user.password.length>=8 ? true : false}
                  text="Password Match"
                />
              </View>
            </View>
            <TouchableOpacity
              style={[GlobalStyles.button]}
              onPress={() => {navigation.navigate("Home");}}
            >
              <Text style={[GlobalStyles.boldText]}>SAVE</Text>
            </TouchableOpacity>
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
    gap: 15,
    marginVertical: 30,
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

  validate: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "85%",
    gap: 10,
    marginLeft: "10%",
  },
});

export default Register;
