import { View, SafeAreaView, StyleSheet } from "react-native";

const TopBar = () => {
  return (
    <SafeAreaView>
      <View
        style={styles.container}
      >
        
      </View>
    </SafeAreaView>
  );
};

export default TopBar;

const styles = StyleSheet.create({
    container:{
        height:50,
        backgroundColor:'#1E1F22',
        width:'100%',
        marginTop:25,
    }
})
