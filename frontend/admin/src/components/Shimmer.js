import React, { useRef, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, Animated, Easing, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App({ style }) {
  // let windowWidth;
  // if (typeof style.width === 'string') {
  //   windowWidth = Math.ceil(useWindowDimensions().width * (parseFloat(style.width) - 2) / 100);
  //   // windowWidth = useWindowDimensions().width * (48 - 5) / 100;

  //   console.log(parseFloat(style.width));
  //   console.log(windowWidth);
  // }
  windowWidth = useWindowDimensions().width * (48 - 5) / 100;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(animatedValue, {
      toValue: 1,
      duration: 900, // Adjust the duration as needed
      easing: Easing.linear,
      useNativeDriver: false, // To enable layout animation on Android
    });

    Animated.loop(animation).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-windowWidth, windowWidth],
  });

  return (
    <View style={[styles.gradientContainer, { width: style.width, height:style.height }]}>
      <Animated.View
        style={[
          styles.gradient,
          { transform: [{ translateX }], flexShrink: 0, right: windowWidth },
        ]}
      >
        <LinearGradient
          colors={['#ddd', '#ccc', '#999999', '#ccc', '#ddd']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.gradient,
          { transform: [{ translateX }], flexShrink: 0, right: windowWidth },
        ]}
      >
        <LinearGradient
          colors={['#ddd', '#ccc', '#999999', '#ccc', '#ddd']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  gradientContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: 'yellowgreen'
  },
  gradient: {
    width: '200%',
    flexDirection: 'row',
    position: 'relative',
  },
});
