import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/pokemonSplash.png')} style={{ width: 100, height: 100 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"red"
  }
})

export default SplashScreen