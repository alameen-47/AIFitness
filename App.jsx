import React from 'react';
import {Text, View} from 'react-native';
import {AppNavigation} from './frontend/navigation/navigation.js';
import './global.css';
import {Provider} from 'react-redux';
import {ReduxStore} from './frontend/app/ReduxStore.js';
const App = () => {
  return (
    <Provider store={ReduxStore}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
