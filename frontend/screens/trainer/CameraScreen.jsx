import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import Svg, {Circle, Line} from 'react-native-svg';
import {cameraWithTensors} from '@tensorflow/tfjs-react-native';

const TensorCamera = cameraWithTensors(Camera);

export const CameraScreenView = () => {
  const navigation = useNavigation();
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');
  const [isScanning, setIsScanning] = useState(false);
  const cameraRef = useRef(null);
  const detectorRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      detectorRef.current = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        {modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER},
      );
    };
    loadModel();
  }, []);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
    console.log(newCameraPermission);
  };

  if (device == null) return <ActivityIndicator />;
  return (
    <View className="flex flex-col- bg-green-500 h-screen w-screen object-contain">
      <Camera
        ref={cameraRef}
        device={device}
        isActive={true}
        ratio="9:16"
        useCamera2Api={true}
        style={{
          flex: 1,
        }}
        resizeMode="cover"
      />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text className="font-bold">Close CAmera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-red-500 p-3 w-[50%] flex text-center just border border-black"
        // onPress={startScanning}
      >
        <Text className="font-bold text-center">
          {isScanning ? 'Scanning...' : 'Start Scanning'}
        </Text>
      </TouchableOpacity>
      <Text className="bg-green-400 ">CameraScreen</Text>
    </View>
  );
};
