import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Loader from './src/components/Loader';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import StackRoute from './src/navigator/StackRoute';
import * as SplashScreen from "expo-splash-screen";
import { Provider } from 'react-redux';
import store from './src/Redux/Store';

export default function App({ }) {
  const [isLogged, setIsLogged] = useState(undefined);

  const [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
  });

  useEffect(() => {
    const initializeApp = async () => {
      await SplashScreen.preventAutoHideAsync();
    };
    initializeApp();
    setTimeout(() => {
      getToken();
    }, 2000);
  }, []);


  const getToken = async () => {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      setIsLogged(true);
    }
    else {
      console.log("No token found");
      setIsLogged(false);
    }
  };


  if (!fontsLoaded) {
    return null;
  } else {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }


  return (
    <Provider store={store}>
      <NavigationContainer>
        {
          isLogged === undefined ?
            <Loader />
            :
            <>
              {
                isLogged === true ?
                  <StackRoute isLogged={isLogged} />
                  :
                  <StackRoute />
              }
            </>

        }
      </NavigationContainer>
    </Provider>
  );
}
