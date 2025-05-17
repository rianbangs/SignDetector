// src/utils/TFLiteWrapper.js
import Tflite from 'tflite-react-native';

let tflite = new Tflite();

const TFLiteWrapper = {
  loadModel: async () => {
    return new Promise((resolve, reject) => {
      tflite.loadModel(
        {
          model: 'yolov5s-fp16.tflite',
          labels: 'labels.txt',
        },
        (err, res) => {
          if (err) {
            console.error('Model load error', err);
            reject(err);
          } else {
            console.log('Model loaded:', res);
            resolve(res);
          }
        }
      );
    });
  },

  runModel: async (imagePath) => {
    return new Promise((resolve, reject) => {
      tflite.runModelOnImage(
        {
          path: imagePath,
          imageMean: 0.0,
          imageStd: 255.0,
          numResults: 10,
          threshold: 0.4,
        },
        (err, res) => {
          if (err) {
            console.error('Detection error', err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  },
};

export default TFLiteWrapper;
