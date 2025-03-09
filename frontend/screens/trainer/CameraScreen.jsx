import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

export const CameraScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const devices = useCameraDevices();
  console.log('Available devices:', devices);

  const device = devices.back ?? devices.front;

  useEffect(() => {
    setTimeout(() => {
      const status = Camera.getCameraPermissionStatus();
      setHasPermission(status === 'granted');
    }, 2000);
  }, []);
  

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      // const microphonePermission = await Camera.requestMicrophonePermission();

      if (cameraPermission === 'granted') {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    })();
  }, []);
  if (hasPermission === null) {
    return <Text>Requesting Camera Permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>Permission Denied</Text>;
  }
  if (!device) {
    return <Text>No camera device found</Text>
    ;
  }
  return (
    <View className="bg-green-500 h-screen">
      <Camera device={device} isActive={true} className="flex" />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Close CAmera</Text>
      </TouchableOpacity>

      <Text>CameraScreen</Text>
    </View>
  );
};
