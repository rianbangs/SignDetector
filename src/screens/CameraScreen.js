// src/screens/CameraScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
// import TFLiteWrapper from '../utils/TFLiteWrapper';

export default function CameraScreen() {
  const devices = useCameraDevices();
  const device = devices.back;
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [results, setResults] = useState([]);

  // Request camera permission on mount
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
      if (status !== 'authorized') {
        Alert.alert('Permission Denied', 'Camera permission is required.');
      }
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePhoto();
        setPhotoUri(photo.path);
        runDetection(photo.path);
      } catch (e) {
        console.error('Failed to take photo:', e);
      }
    }
  };

  const runDetection = async (imagePath) => {
    const predictions = await TFLiteWrapper.runModel(imagePath);
    setResults(predictions);
    console.log('Detections:', predictions);
  };

  if (device == null || !hasPermission) {
    return <View style={styles.container}><Text style={{color: 'white', textAlign: 'center', marginTop: 20}}>Loading camera...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.preview}
        device={device}
        isActive={true}
        photo={true}
        ref={setCameraRef}
      />
      <TouchableOpacity style={styles.capture} onPress={takePicture}>
        <Text style={{ color: '#fff' }}> SNAP </Text>
      </TouchableOpacity>

      {photoUri && (
        <Image source={{ uri: 'file://' + photoUri }} style={styles.preview} />
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
