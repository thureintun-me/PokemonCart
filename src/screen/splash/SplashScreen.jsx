import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming, } from 'react-native-reanimated'
import { useAppStore } from '../../store/appStore';

const SplashScreen = () => {
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);
  const {isLoading,token,setToken,setIsLoading} = useAppStore((state) => state)


  
  useEffect(() => {
    const delay = 3000; // 150 seconds delay

    translateY.value = withDelay(
      delay,
      withTiming(-500, { duration: 1000 })
    );

    opacity.value = withDelay(
      delay,
      withTiming(0, { duration: 1000 }, (isFinished) => {
        if (isFinished) {
          runOnJS(handleAnimationEnd)();
        }
      })
    );

  }, []);

  const handleAnimationEnd =()=>setIsLoading(false)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
      width: 100, height: 100,

    };
  });



  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={require('../../../assets/pokemonSplash.png')}
          style={{ ...animatedStyle }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Pokémon TCG Market</Text>
        <Text style={styles.text}>Power By Thurein</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 50,
    height: 50
  },
  imageContainer: {
    flex: 1.5,
    justifyContent: 'flex-end',
    alignItems: "center"
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50
  },
  text: {
    fontSize: 16,
    fontFamily: 'RobotoMono-Regular',
    fontWeight: '400',
    color: 'lightgray'
  }
})

export default SplashScreen