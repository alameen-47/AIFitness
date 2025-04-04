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
import Tflite from 'react-native-tflite';

import Svg, {Circle, Line} from 'react-native-svg';
import {setPose, clearPose} from '../../features/poseSlice.js';
import {useDispatch, useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

export const CameraScreenView = () => {
  const navigation = useNavigation();
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');
  const [isScanning, setIsScanning] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const cameraRef = useRef(null);
  const detectorRef = useRef(null);
  const dispatch = useDispatch();
  const keypoints = useSelector(state => state.pose.keypoints);
  // const tflite = useRef(new Tflite()).current;
  // const tflite = useRef(null);
  // useEffect(() => {
  //   const loadModel = async () => {
  //     try {
  //       tflite.current = new Tflite();
  //       await tflite.current.loadModel({
  //         model: 'movenet.tflite',
  //         labels: '',
  //       });
  //       setIsModelReady(true);
  //       console.log('✅ Model loaded successfully');
  //     } catch (error) {
  //       console.error('❌ Model loading failed:', error);
  //     }
  //   };
  //   loadModel();
  //   return () => {
  //     tflite.current?.close();
  //   };
  // }, []);
  useEffect(() => {
    const tflite = new Tflite();

    tflite.loadModel(
      {
        model: 'movenet.tflite',
        numThreads: 1, // default
      },
      (err, res) => {
        if (err) {
          console.error('❌ Model load error:', err);
        } else {
          console.log('✅ Model loaded:', res);
        }
      },
    );
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
        // onFrame={processFrame}
        pixelFormat="rgb"
        resizeMode="cover"
      />
      {/* Skeleton Overlay(
      <Svg className="absolute inset-0">
        {keypoints.map((point, index) => (
          <Circle key={index} cx={point.x} cy={point.y} r="5" fill="red" />
        ))}
        {/* Draw Lines for Skeleton */}
      {drawSkeleton(keypoints)}
      {/* </Svg> */}
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

const drawSkeleton = keypoints => {
  const connections = [
    // Upper Body
    ['nose', 'leftShoulder'],
    ['nose', 'rightShoulder'],
    ['leftShoulder', 'leftElbow'],
    ['leftElbow', 'leftWrist'],
    ['rightShoulder', 'rightElbow'],
    ['rightElbow', 'rightWrist'],

    // Lower Body
    ['leftHip', 'leftKnee'],
    ['leftKnee', 'leftAnkle'],
    ['rightHip', 'rightKnee'],
    ['rightKnee', 'rightAnkle'],

    // Spine and torso
    ['leftShoulder', 'leftHip'],
    ['rightShoulder', 'rightHip'],
    ['leftHip', 'rightHip'],

    // Head connection
    ['nose', 'leftEye'],
    ['nose', 'rightEye'],
  ];
  return connections.map(([startPart, endPart], index) => {
    if (!keypoints) {
      console.warn('keypoints is null or undefined');
      return null; // Prevents the error
    }
    const start = keypoints.find(point => point.name === startPart);
    const end = keypoints.find(point => point.name === endPart);
    return (
      <Line
        key={index}
        x1={start?.x}
        y1={start?.y}
        x2={end?.x}
        y2={end?.y}
        stroke="blue"
        strokeWidth={2}
      />
    );
  });
};
