import React from 'react';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  keypoints: null,
};

const poseSlice = createSlice({
  name: 'pose',
  initialState,
  reducers: {
    setPose: (state, action) => {
      state.keypoints = action.payload;
    },
    clearPose: state => {
      state.keypoints = [];
    },
  },
});

export const {setPose, clearPose} = poseSlice.actions;
export default poseSlice.reducer;
