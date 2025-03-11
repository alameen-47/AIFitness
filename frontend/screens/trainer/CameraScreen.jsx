import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

export const CameraScreen = () => {
  const navigation = useNavigation();
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');
  // const device = device[0];
  console.log(devices, 'DEVICESSSSS@#@@@@');
  useEffect(() => {
    checkPermission();
  }, []);
  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.reequestMicrophonePermission();
    console.log(newCameraPermission);
  };
  if (device == null) return <ActivityIndicator />;
  return (
    <View className="bg-green-500 h-screen w-screen ">
      <Camera
        device={device}
        isActive={true}
        className="flex h-screen w-screen"
        style={StyleSheet.absoluteFill}
      />
      <TouchableOpacity
        className="bg-yellow-400 border-1 border-black flex text center"
        onPress={() => navigation.goBack()}>
        <Text className="font-bold">Close CAmera</Text>
      </TouchableOpacity>

      <Text className="bg-green-400 ">CameraScreen</Text>
    </View>
  );
};
