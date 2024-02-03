import { StyleSheet, View, Text, ActivityIndicator, LogBox } from "react-native";
import GlobalStyles from "../GlobalStyles";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useCallback, useEffect, useState } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolate } from 'react-native-reanimated';
import ModalLoading from "./ModalLoading";
import SuccessAnimation from './SuccessAnimation';

const SwipeButton = ({ style, submit, success, loading, successTitle, error }) => {
  LogBox.ignoreAllLogs(true)
  const X = useSharedValue(0);

  const handleSubmit = () => {
    console.log("submit function");
    submit(); // Call the submit function
  }
  useEffect(() => { X.value = withSpring(0) }, [error])

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (X.value >= 0) {
        X.value = e.translationX;
      }
    })
    .onEnd((e) => {
      try {
        if (X.value > 100) {
          X.value = withSpring(style.width);
        } else {
          X.value = withSpring(0);
        }
      } catch (err) {
        console.log('Error in swipable submit: ', err.message);
      }
    });

  panGesture.onFinalize(() => {
    try {
      console.log("hi");
      handleSubmit();
    }
    catch (err) {
      console.log("swipable finalize err: ", err.message);
    }
  })


  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: X.value }],
  }));

  const textAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(X.value, [0, style.width - style.width / 3], [1, 0], Extrapolate.CLAMP),
    transform: [{ translateX: X.value }]
  }))



  return (
    <>
      {success ?
        <SuccessAnimation modal={true} title={successTitle} /> :
        <>
          {loading ?
            <ModalLoading visible={loading} /> :
            <>
              <View
                style={[GlobalStyles.button, styles.button, { width: style.width }]}>
                <GestureDetector gesture={panGesture}>
                  <Animated.View style={[{ justifyContent: 'center', width: style.width + 80, position: 'absolute', zIndex: 10, height: '100%', left: -style.width+20 }, animatedStyle]}>
                    {/* <LinearGradient
                      colors={['#fdd4ce', '#faaa9e', '#F55139', '#F55139']}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      style={{ flex: 1, height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                    > */}
                      <Feather name="chevrons-right" size={28} color="#000" style={{ position: 'absolute', right: 5 }} />
                    {/* </LinearGradient> */}
                  </Animated.View>
                </GestureDetector>
                <GestureDetector gesture={panGesture}>
                <Animated.Text style={[GlobalStyles.semiBoldText, { fontSize: 17, marginRight:-30}, textAnimation]}>Swipe to Submit</Animated.Text>
                </GestureDetector>
              </View>
            </>
          }
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
})



// <View style={ [GlobalStyles.button, styles.button, { width: style.width }]} >
//               <GestureDetector gesture={panGesture}>
//                 <Animated.View
//                   style={[{ width: style.width + 80, position: 'absolute', zIndex: 10, height: '100%', left: -style.width - 40 }, animatedStyle]}>
//                   <LinearGradient colors={['#fdd4ce', '#faaa9e', '#F55139', '#F55139']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={{ flex: 1, height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
//                     <Feather name="chevrons-right" size={28} color="black" style={{ position: 'absolute', right: 5 }} />
//                   </LinearGradient>
//                 </Animated.View>
//               </GestureDetector>
//               <Animated.Text style={[GlobalStyles.semiBoldText, { fontSize: 17 }, textAnimation]}>Swipe to Submit</Animated.Text>
//             </View >