import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import StackRoute from './src/navigator/StackRoute';
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Bold':require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Regular':require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold':require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'OpenSans-Bold':require('./assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-Regular':require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold':require('./assets/fonts/OpenSans-SemiBold.ttf'),
  });

  useEffect(() => {
    const initializeApp = async () => {
      await SplashScreen.preventAutoHideAsync();
    };
    initializeApp();
  }, []);

  if (!fontsLoaded) {
    return null;
  }else{
    SplashScreen.hideAsync();
  }



  return (
    <NavigationContainer>
      <StackRoute/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
