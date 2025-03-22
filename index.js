/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {ReduxStore} from './frontend/app/ReduxStore';
import {Provider} from 'react-redux';

const ReduxWrapper = () => {
  <Provider store={ReduxStore}>
    <App />
  </Provider>;
};

AppRegistry.registerComponent(appName, () => App);
