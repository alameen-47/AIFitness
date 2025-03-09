import React from 'react';
const Stack = createNativeStackNavigator();
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/HomeScreen';
import {TrainerMainScreen} from '../screens/trainer/TrainerMainScreen';
import {TrainerSaveScreen} from '../screens/trainer/TrainerSaveScreen';
import {CameraScreen} from '../screens/trainer/CameraScreen';
export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="TrainerMainScreen" component={TrainerMainScreen} />
        <Stack.Screen name="TrainerSaveScreen" component={TrainerSaveScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
