import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyles from "../../GlobalStyles";
const TextIcon = (props) => {
  return (
    <View style={styles.container}>
      <Ionicons name={props.correct ? "checkmark-circle-outline" : "close-circle-outline"} size={18} color={props.correct ? "#1BCFB4" :"#F55139"} />
      <Text style={[GlobalStyles.normalText, styles.text]}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection:"row"
    },
    text: {
        color:"#FFFFFF"
    }
})

export default TextIcon;
