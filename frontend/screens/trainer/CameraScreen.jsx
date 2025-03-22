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
import {setPose, clearPose} from '../../features/poseSlice.js';
import {useDispatch, useSelector} from 'react-redux';

const TensorCamera = cameraWithTensors(Camera);
const {width, height} = Dimensions.get('window');

export const CameraScreenView = () => {
  const navigation = useNavigation();
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');
  const [isScanning, setIsScanning] = useState(false);
  const cameraRef = useRef(null);
  const detectorRef = useRef(null);
  const dispatch = useDispatch();
  const keypoints = useSelector(state => state.pose.keypoints);

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

  const handleCameraStream = async images => {
    if (!isScanning || !detectorRef.current) return;

    const imageTensor = images.next().value;
    if (!imageTensor) return;

    const poseEstimates = await detectorRef.current.estimatePoses(imageTensor);
    if (poseEstimates.length > 0) {
      dispatch(setPose(poseEstimates[0].keypoints));
      console.log('-----Pose Data:-----', poseEstimates[0].keypoints);
    }
    tf.dispose(imageTensor);
  };

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
      {/* Skeleton Overlay */}(
      <Svg className="absolute inset-0">
        {keypoints.map((point, index) => (
          <Circle key={index} cx={point.x} cy={point.y} r="5" fill="red" />
        ))}
        {/* Draw Lines for Skeleton */}
        {drawSkeleton(keypoints)}
      </Svg>
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
