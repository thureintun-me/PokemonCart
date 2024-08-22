import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import toastConfig from './src/utils/toastConfig';
import { getRequest } from './src/api/apiClient';
import { useEffect } from 'react';

export default function App() {
  const [loaded, error] = useFonts({
    'Matemasie-Regular': require('./assets/fonts/Matemasie-Regular.ttf'),
    'RobotoMono-Regular': require('./assets/fonts/RobotoMono-Regular.ttf'),
  });



  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'RobotoMono-Regular' }}>Open up App.js to start working on your app!</Text>
    
      <StatusBar style="auto" />
      <Toast visibilityTime={1000} config={toastConfig} />
    </View>
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
