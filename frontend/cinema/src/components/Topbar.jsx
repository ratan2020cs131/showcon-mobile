import { View, SafeAreaView, StyleSheet, Text, useWindowDimensions } from "react-native";
import GlobalStyles from "../GlobalStyles";

const TopBar = ({ title, sub }) => {
  const windowWidth = useWindowDimensions().width;

  return (
    <SafeAreaView>
      <View
        style={[styles.container, { width: windowWidth }]}
      >
        {title && <Text style={[GlobalStyles.semiBoldText, styles.title]}>{title}</Text>}
        {sub && <Text style={[GlobalStyles.semiBoldText, styles.sub]}>{sub}</Text>}
      </View>
    </SafeAreaView>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1F22',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  title: {
    color: '#F55139',
    fontSize: 20
  },
  sub: {
    color: '#F55139',
    fontSize: 13
  }
})
