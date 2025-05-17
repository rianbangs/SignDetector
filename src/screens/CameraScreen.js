// src/screens/CameraScreen.js
import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import TFLiteWrapper from '../utils/TFLiteWrapper';

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [results, setResults] = useState([]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      setPhotoUri(data.uri);
      runDetection(data.uri);
    }
  };

  const runDetection = async (imagePath) => {
    const predictions = await TFLiteWrapper.runModel(imagePath);
    setResults(predictions);
    console.log('Detections:', predictions);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        captureAudio={false}
      />
      <TouchableOpacity style={styles.capture} onPress={takePicture}>
        <Text style={{ color: '#fff' }}> SNAP </Text>
      </TouchableOpacity>
      {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.preview} />
      )}
      {results.map((item, index) => (
        <Text key={index} style={styles.resultText}>
          {item.label} ({(item.confidence * 100).toFixed(2)}%)
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  preview: { flex: 1 },
  capture: {
    position: 'absolute',
    bottom: 20,
    left: '40%',
    backgroundColor: '#0A84FF',
    padding: 15,
    borderRadius: 10,
  },
  resultText: {
    color: '#fff',
    padding: 5,
    backgroundColor: '#000000aa',
    marginBottom: 2,
  },
});
