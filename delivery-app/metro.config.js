const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Ensure platform-specific extensions are supported
config.resolver.sourceExts = [...config.resolver.sourceExts, 'web.js', 'web.ts', 'web.tsx'];

// Custom resolver to handle React Native modules on web
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Handle Platform module resolution for web
  if (moduleName === '../Utilities/Platform' && platform === 'web') {
    try {
      const webPlatformPath = require.resolve('react-native-web/dist/exports/Platform');
      return {
        type: 'sourceFile',
        filePath: webPlatformPath,
      };
    } catch (error) {
      console.warn('Could not resolve web Platform module:', error);
    }
  }
  
  // Handle RCTDeviceEventEmitter module resolution for web
  if (moduleName === '../../vendor/react-native/EventEmitter/RCTDeviceEventEmitter' && platform === 'web') {
    try {
      // Use our custom mock for RCTDeviceEventEmitter on web
      const mockPath = path.resolve(__dirname, '__mocks__/RCTDeviceEventEmitter.js');
      return {
        type: 'sourceFile',
        filePath: mockPath,
      };
    } catch (error) {
      console.warn('Could not resolve RCTDeviceEventEmitter module:', error);
    }
  }
  
  // Handle DeviceEventEmitter export for web
  if (moduleName === '../EventEmitter/RCTDeviceEventEmitter' && platform === 'web') {
    try {
      // Use our custom mock for DeviceEventEmitter on web
      const mockPath = path.resolve(__dirname, '__mocks__/RCTDeviceEventEmitter.js');
      return {
        type: 'sourceFile',
        filePath: mockPath,
      };
    } catch (error) {
      console.warn('Could not resolve DeviceEventEmitter module:', error);
    }
  }
  
  // Handle DeviceEventEmitter export for web
  if (moduleName === 'react-native/Libraries/EventEmitter/DeviceEventEmitter' && platform === 'web') {
    try {
      // Use our custom mock for DeviceEventEmitter on web
      const mockPath = path.resolve(__dirname, '__mocks__/RCTDeviceEventEmitter.js');
      return {
        type: 'sourceFile',
        filePath: mockPath,
      };
    } catch (error) {
      console.warn('Could not resolve DeviceEventEmitter module:', error);
    }
  }
  
  // Handle NativeEventEmitter for web
  if (moduleName === '../../vendor/react-native/EventEmitter/NativeEventEmitter' && platform === 'web') {
    try {
      // Use our custom mock for NativeEventEmitter on web
      const mockPath = path.resolve(__dirname, '__mocks__/NativeEventEmitter.js');
      return {
        type: 'sourceFile',
        filePath: mockPath,
      };
    } catch (error) {
      console.warn('Could not resolve NativeEventEmitter module:', error);
    }
  }
  
  // Handle NativeEventEmitter export for web
  if (moduleName === '../EventEmitter/NativeEventEmitter' && platform === 'web') {
    try {
      // Use our custom mock for NativeEventEmitter on web
      const mockPath = path.resolve(__dirname, '__mocks__/NativeEventEmitter.js');
      return {
        type: 'sourceFile',
        filePath: mockPath,
      };
    } catch (error) {
      console.warn('Could not resolve NativeEventEmitter module:', error);
    }
  }
  
  // Handle NativeEventEmitter export for web
  if (moduleName === 'react-native/Libraries/EventEmitter/NativeEventEmitter' && platform === 'web') {
    try {
      // Use our custom mock for NativeEventEmitter on web
      const mockPath = path.resolve(__dirname, '__mocks__/NativeEventEmitter.js');
      return {
        type: 'sourceFile',
        filePath: mockPath,
      };
    } catch (error) {
      console.warn('Could not resolve NativeEventEmitter module:', error);
    }
  }
  
  // Handle UIManager for web (this is the key fix for the current error)
  if (moduleName === 'react-native/Libraries/ReactNative/UIManager' && platform === 'web') {
    try {
      // Use our custom mock for UIManager on web
      const mockPath = path.resolve(__dirname, '__mocks__/UIManager.js');
      return {
        type: 'sourceFile',
        filePath: mockPath,
      };
    } catch (error) {
      console.warn('Could not resolve UIManager module:', error);
    }
  }
  
  // Handle UIManager for web (alternative path)
  if (moduleName === '../ReactNative/UIManager' && platform === 'web') {
    try {
      // Use our custom mock for UIManager on web
      const mockPath = path.resolve(__dirname, '__mocks__/UIManager.js');
      return {
        type: 'sourceFile',
        filePath: mockPath,
      };
    } catch (error) {
      console.warn('Could not resolve UIManager module:', error);
    }
  }
  
  // Handle AccessibilityInfo module resolution for web
  if (moduleName === '../Components/AccessibilityInfo/legacySendAccessibilityEvent' && platform === 'web') {
    try {
      // Return an empty module for web
      return {
        type: 'empty'
      };
    } catch (error) {
      console.warn('Could not resolve AccessibilityInfo module:', error);
    }
  }
  
  // Handle other common React Native modules that don't have web equivalents
  const webUnsupportedModules = [
    '../EventEmitter/RCTEventEmitter',
    '../ReactNative/DeviceEventManager',
    '../ReactNative/NativeModules',
    '../ReactNative/PaperUIManager',
    '../ReactNative/RendererProxy',
    '../ReactNative/AppRegistry',
    '../Utilities/PixelRatio',
    '../Utilities/BackHandler',
    '../Utilities/DeviceInfo',
    '../Utilities/Dimensions',
    '../Utilities/Keyboard',
    '../Utilities/Linking',
    '../Utilities/NetInfo',
    '../Utilities/DeviceInfo',
    '../Utilities/Vibration',
    '../Utilities/PermissionsAndroid',
    '../Utilities/PushNotificationIOS',
    '../Utilities/StatusBarIOS',
    '../Utilities/Systrace',
    '../Utilities/TVEventHandler',
    '../Utilities/DevSettings',
    '../Utilities/HMRClient',
    '../Utilities/PerformanceLogger',
    '../Utilities/LoadingView',
    '../Utilities/NativeAppearance',
    '../Utilities/NativeDevSettings',
    '../Utilities/NativeDeviceInfo',
    '../Utilities/NativeI18nManager',
    '../Utilities/NativeLayoutAnimationManager',
    '../Utilities/NativePlatformConstantsAndroid',
    '../Utilities/NativePlatformConstantsIOS',
    '../Utilities/NativeSourceCode',
    '../Utilities/NativeTiming',
    '../Utilities/BlobManager',
    '../Utilities/CameraRollManager',
    '../Utilities/ExceptionsManager',
    '../Utilities/JSInspector',
    '../Utilities/RCTLog',
    '../Utilities/Settings',
    '../Utilities/ToastAndroid',
    '../Utilities/UIManagerAndroid',
    '../Utilities/UIManagerIOS',
    '../Utilities/WebSocketInterceptor',
    '../Utilities/XMLHttpRequestInterceptor',
    '../Image/ImageLoader',
    '../Image/AssetRegistry',
    '../Image/AssetSourceResolver',
    '../Image/resolveAssetSource',
    '../BatchedBridge/NativeModules',
    '../BatchedBridge/BatchedBridge',
    '../BatchedBridge/MessageQueue',
    '../Core/Devtools/parseErrorStack',
    '../Core/Devtools/symbolicateStackTrace',
    '../Core/Devtools/getDevServer',
    '../Core/ExceptionsManager',
    '../Core/InitializeCore',
    '../Core/Timers/JSTimers',
    '../Core/Timers/NativeTiming',
    '../Core/ReactFiberErrorDialog',
    '../Core/ReactNativeVersionCheck',
    '../Core/checkNativeVersion',
    '../vendor/core/ErrorUtils',
    '../vendor/emitter/EventEmitter',
    '../vendor/emitter/mixInEventEmitter',
    '../Interaction/InteractionManager',
    '../Interaction/PanResponder',
    '../Interaction/TaskQueue',
    '../LayoutAnimation/LayoutAnimation',
    '../Linking/Linking',
    '../Network/NetInfo',
    '../Network/RCTNetworking',
    '../Network/XHRInterceptor',
    '../Performance/Systrace',
    '../PushNotificationIOS/PushNotificationIOS',
    '../Settings/Settings',
    '../Storage/AsyncStorage',
    '../Utilities/Alert',
    '../Utilities/Animated',
    '../Utilities/Animation',
    '../Utilities/AppState',
    '../Utilities/Clipboard',
    '../Utilities/Geolocation',
    '../Utilities/I18nManager',
    '../Utilities/ImagePickerIOS',
    '../Utilities/IntentAndroid',
    '../Utilities/MatrixMath',
    '../Utilities/NativeAnimatedHelper',
    '../Utilities/Share',
    '../Utilities/TransformPropTypes',
    '../Utilities/UTFSequence',
    '../Utilities/deepFreezeAndThrowOnMutationInDev',
    '../Utilities/differ/insetsDiffer',
    '../Utilities/differ/matricesDiffer',
    '../Utilities/differ/pointsDiffer',
    '../Utilities/differ/sizesDiffer',
    '../Utilities/stringifySafe',
    '../Utilities/truncate',
    '../WebSocket/WebSocket',
    '../WebSocket/WebSocketEvent',
    '../WebSocket/WebSocketInterceptor'
  ];
  
  if (webUnsupportedModules.includes(moduleName) && platform === 'web') {
    try {
      // Return an empty module for web
      return {
        type: 'empty'
      };
    } catch (error) {
      console.warn(`Could not resolve module ${moduleName} for web:`, error);
    }
  }
  
  // Use default resolution for all other modules
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;