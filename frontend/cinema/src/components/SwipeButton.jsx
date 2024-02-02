import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import GlobalStyles from "../GlobalStyles";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useCallback, useState } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolate } from 'react-native-reanimated';

const SwipeButton = ({ style }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback((e) => {
    if (X.value > 100) {
      X.value = withSpring(style.width);
      console.log("hi");
      setLoading(true)
    } else {
      X.value = withSpring(0)
    }
  },[X])
  

  const X = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (X.value >= 0) {
        X.value = e.translationX;
      }
    })
    .onEnd(handleSubmit)


  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: X.value }],
  }));

  const textAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(X.value, [0, style.width - style.width / 3], [1, 0], Extrapolate.CLAMP),
    transform: [{ translateX: X.value }]
  }))



  return (
    <>
      {loading ?
        <ActivityIndicator size={"large"} color="#F55139" /> :
        <>
          <View
            style={[GlobalStyles.button, styles.button, { width: style.width }]}>
            <GestureDetector gesture={panGesture}>
              <Animated.View
                style={[{ width: style.width + 80, position: 'absolute', zIndex: 10, height: '100%', left: -style.width - 40 }, animatedStyle]}>
                <LinearGradient
                  colors={['#fdd4ce', '#faaa9e', '#F55139', '#F55139']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={{ flex: 1, height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                  <Feather name="chevrons-right" size={28} color="black" style={{ position: 'absolute', right: 5 }} />
                </LinearGradient>
              </Animated.View>
            </GestureDetector>
            <Animated.Text style={[GlobalStyles.semiBoldText, { fontSize: 17 }, textAnimation]}>Swipe to Submit</Animated.Text>
          </View>
        </>
      }
    </>
  )
}
export default SwipeButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
    height: 45,
    borderRadius: 8
  },
  swiper: {

  }
})


{/* <LinearGradient
  colors={['#fdd4ce', '#fdd4ce', '#faaa9e', '#F55139', '#F55139']}
  start={{ x: 0, y: 0.5 }}
  end={{ x: 1, y: 0.5 }}
  style={[styles.button, { width: style.width }]}
>
  <GestureDetector gesture={panGesture}>
    <Animated.View
      style={[{ width: 2 * style.width, position: 'absolute', zIndex: 10, height: '100%', right: 0 }, animatedStyle]}
    >
      <LinearGradient
          colors={['#fdd4ce', '#faaa9e', '#F55139', '#F55139']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ flex: 1, height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: style.width / 2 - 35 }}
      >
        <Feather name="chevrons-right" size={24} color="black" />
        <Text style={[GlobalStyles.semiBoldText, { fontSize: 17 }]}>Swipe</Text>
      </LinearGradient>
    </Animated.View>
  </GestureDetector>
</LinearGradient> */}