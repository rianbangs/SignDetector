 
// to start app   run this code
//  npm start
//  npm run android


//generate APK file
// cd android
// ./gradlew assembleDebug
//The APK will be generated at:   android/app/build/outputs/apk/debug/app-debug.apk

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import CameraScreen from './src/screens/CameraScreen'; // 👈 Make sure this path matches your file location

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <CameraScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default App;
