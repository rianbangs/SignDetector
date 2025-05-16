import Tflite from 'tflite-react-native';

class TFLiteWrapper {
  constructor() {
    this.tflite = new Tflite();
  }

  loadModel() {
    return new Promise((resolve, reject) => {
      this.tflite.loadModel({
        model: 'yolov5s-fp16.tflite',
        // labels: 'labels.txt',  // optional if you have labels file
      }, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  runModelOnImage(imagePath) {
    return new Promise((resolve, reject) => {
      this.tflite.runModelOnImage({
        path: imagePath,
        imageMean: 0,
        imageStd: 255,
        numResults: 10,
        threshold: 0.2,
      }, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}

export default new TFLiteWrapper();
