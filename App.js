import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import toastConfig from './src/utils/toastConfig';
import { getRequest } from './src/api/apiClient';
import { useEffect } from 'react';
import SplashScreen from './src/screen/splash/SplashScreen';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  const [loaded, error] = useFonts({
    'Matemasie-Regular': require('./assets/fonts/Matemasie-Regular.ttf'),
    'RobotoMono-Regular': require('./assets/fonts/RobotoMono-Regular.ttf'),
  });



  return (
    <>
      <RootNavigator />
      <StatusBar style="auto" />
      <Toast visibilityTime={1000} config={toastConfig} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
