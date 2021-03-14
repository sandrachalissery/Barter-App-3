import { StatusBar } from 'expo-status-bar';
import React from 'react';
import SignupLoginScreen from './screens/SignupLoginScreen';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <WelcomeScreen/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
