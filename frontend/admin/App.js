import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from '@react-navigation/native';
import BottomRoutes from './src/navigator/BottomRoutes';
import AuthRoutes from './src/navigator/AuthRoutes';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import TokenVerification from './src/components/TokenVerification';

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
      // getToken();
    }, 2000);
  }, []);


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
        {isLogged === undefined ?
          <TokenVerification setLog={setIsLogged} /> :
          <>
            {isLogged === true ?
              <BottomRoutes /> :
              <AuthRoutes />
            }
          </>
        }
      </NavigationContainer>
    </Provider>
  );
}
