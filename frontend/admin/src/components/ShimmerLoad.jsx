import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, LayoutChangeEvent, StyleProp, View, ViewStyle, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const Shimmering = ({ colors, gradientStyle, wrapperStyle }) => {
  const [viewWidth, setViewWidth] = useState(-1);

  const shimmeringAnimatedValue = new Animated.Value(0);

  const ShimmringAnimation = Animated.loop(
    Animated.timing(shimmeringAnimatedValue, {
      useNativeDriver: false,
      delay: 1200,
      duration: 750,
      toValue: 1,
    })
  );

  useEffect(() => {
    ShimmringAnimation.start();
  }, []);

  const startAnimation = () => {
    ShimmringAnimation.start();
  };

  const _onLayoutChange = (event) => {
    setViewWidth(event.nativeEvent.layout.width);
    startAnimation();
  };

  const _getLeftValue = () => {
    return shimmeringAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-viewWidth, viewWidth],
    });
  };

  const width = Dimensions.get('screen').width;
  const loadingStyle = { backgroundColor: '#6B6B6B' };
  const left = _getLeftValue();

  return (
    <View
      style={{
        width: wrapperStyle?.width ?? width,
        height: wrapperStyle?.height ?? 80,
      }}
    >
      <View style={[styles.container, loadingStyle, wrapperStyle]} onLayout={_onLayoutChange}>
        <Animated.View style={[{ flex: 1, left }, gradientStyle]}>
          <LinearGradient
            colors={colors || ['#6B6B6B', '#fff', '#6B6B6B']}
            start={{ x: 0.3, y: 0.2 }}
            end={{ x: 0.8, y: 0.5 }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default Shimmering;
