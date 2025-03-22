import React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import poseReducer from '../features/poseSlice';

export const ReduxStore = configureStore({
  reducer: {
    pose: poseReducer,
  },
});
