import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View, Animated, Easing } from "react-native";
import GlobalStyles from '../GlobalStyles';
import ScreenWrapper from './ScreenWrapper';
import TicketModal from "../components/TicketModal";


export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [data, setData]=useState();
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (scanned) {
      return;
    }

    Animated.loop(
      Animated.timing(translateY, {
        toValue: 250,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [scanned, translateY]);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={[{ textAlign: "center" }, GlobalStyles.normalText]}> We need your permission to show the camera </Text>
        <TouchableOpacity
          style={[GlobalStyles.button]}
          onPress={requestPermission}>
          <Text style={[GlobalStyles.semiBoldText]}>
            Grant Camera Permission
          </Text>
        </TouchableOpacity>
        {/* <Button onPress={requestPermission} title="grant permission" /> */}
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setData(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <View style={styles.container}>
      <ScreenWrapper title="Verify the ticket" />
      <View style={styles.camera}>
        <Camera
          style={[GlobalStyles.image]}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <Animated.View style={[styles.line, { transform: [{ translateY }] }]} />
        </Camera>
      </View>
      {scanned &&
        <TouchableOpacity
          style={[GlobalStyles.button, { width: 255 }]}
          onPress={() => setScanned(false)}
        >
          <Text style={[GlobalStyles.semiBoldText, { fontSize: 17 }]}>Scan Again</Text>
        </TouchableOpacity>
      }
      {scanned&&<TicketModal data={data} visible={scanned} close={()=>setScanned(false)}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 20,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  camera: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: 'hidden'
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  line: {
    position: "absolute",
    left: 0,
    top: -30,
    width: 250,
    height: 2,
    // backgroundColor: "#0FFF50",
    backgroundColor: '#F55139'
  },
});
