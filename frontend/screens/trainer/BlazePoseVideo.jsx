import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Camera} from 'expo-camera';
import {Canvas, useCanvasRef} from 'react-native-canvas';
import Video from 'react-native-video';
import * as tf from '@tensorflow/tfjs-react-native';
import * as poseDetection from '@tensorflow-models/pose-detection';

export const BlazePoseVideo = () => {
  const videoRef = useRef(null);
  const canvasRef = useCanvasRef(null);
  const [loading, setLoading] = useState(true);
  const [pose, setPoses] = useState([]);

  useEffect(() => {
    const loadTensorflow = async () => {
      await tf.ready();
      setLoading(false);
    };
    loadTensorflow();
  }, []);

  const handlePoseDetection = async () => {
    if (!videoRef.current) return;

    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.BlazePose,
      {
        runtime: 'tfjs',
      },
    );
    const interval = setInterval(async () => {
      const poses = await detector.estimatePoses('videoElement');
      setPoses(poses);
      // drawPoses(poses);
    }, 100);
    return () => clearInterval(interval);
  };

  return <Text>BlazePoseVideo</Text>;
};
