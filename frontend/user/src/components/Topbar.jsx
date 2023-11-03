import { View, SafeAreaView, StyleSheet,Text } from "react-native";
import GlobalStyles from "../GlobalStyles";

const TopBar = ({title}) => {
  return (
    <SafeAreaView>
      <View
        style={styles.container}
      >
        {title&&<Text style={[GlobalStyles.boldText, styles.title]}>{title}</Text>}
      </View>
    </SafeAreaView>
  );
};

export default TopBar;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#1E1F22',
        width:'100%',
        paddingHorizontal:20,
        paddingVertical:15
    },
    title:{
      color:'#F55139',
      fontSize:20
    }
})
