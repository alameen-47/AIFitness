const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('tflite', 'bin', 'json');

const config = mergeConfig(defaultConfig, {
  transformer: {
    // Enable experimental import support for TensorFlow.js
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts, 'pb', 'txt'],
  },
});

module.exports = withNativeWind(config, {input: './global.css'});
