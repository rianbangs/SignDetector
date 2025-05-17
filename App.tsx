 
// to start app   run this code
//  npm start
//  npm run android


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
