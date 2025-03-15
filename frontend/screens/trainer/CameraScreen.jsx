import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';

export const CameraScreen = () => {
  const navigation = useNavigation();
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');
  const [isScanning, setIsScanning] = useState(false);
  const cameraRef = useRef(null);

  const startScanning = async () => {
    setIsScanning(true);
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
    );
    setInterval(async () => {
      if (cameraRef.current) {
        const frame = await cameraRef.current.takeSnapshot();
        const poses = await detector.estimatePoses(frame);
        console.log('??????????POSES -', poses, ' -POSES???????????');
      }
    }, 100);
  };
  // const device = device[0];
  console.log(devices, 'DEVICESSSSS@#@@@@');
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
    <View className="flex flex-col- bg-green-500 h-screen w-screen ">
      <Camera
        ref={cameraRef}
        device={device}
        isActive={true}
        className=" w-full h-full"
        ratio="16:9"
        useCamera2Api={true}
        style={{flex: 1}}
      />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text className="font-bold">Close CAmera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-red-500 p-3 w-[50%] flex text-center just border border-black"
        onPress={startScanning}>
        <Text className="font-bold text-center">
          {isScanning ? 'Scanning...' : 'Start Scanning'}
        </Text>
      </TouchableOpacity>
      <Text className="bg-green-400 ">CameraScreen</Text>
    </View>
    // <View className="bg-green-00 h-screen w-full flex justify-center items-center">
    //   <View className="relative w-full h-full">
    //     <Camera
    //       ref={cameraRef}
    //       device={device}
    //       isActive={true}
    //       className="w-full h-full"
    //     />
    //   </View>

    //   <TouchableOpacity
    //     className="absolute bottom-10 bg-red-500 p-2 border border-black"
    //     onPress={startScanning}>
    //     <Text className="font-bold text-white">
    //       {isScanning ? 'Scanning...' : 'Start Scanning'}
    //     </Text>
    //   </TouchableOpacity>

    //   <TouchableOpacity
    //     className="absolute top-5 left-5"
    //     onPress={() => navigation.goBack()}>
    //     <Text className="font-bold text-white">Close Camera</Text>
    //   </TouchableOpacity>

    //   <Text className="absolute top-20 bg-green-400 p-1 text-white">
    //     Camera Screen
    //   </Text>
    // </View>
  );
};
