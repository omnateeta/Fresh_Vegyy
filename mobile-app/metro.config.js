// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Ensure platform-specific extensions are supported
config.resolver.sourceExts = [...config.resolver.sourceExts, 'web.js', 'web.ts', 'web.tsx'];

// Store original resolver
const defaultResolver = config.resolver.resolveRequest;

// Configure resolver to handle react-native-maps on web
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Intercept react-native-maps on web and return web-specific file
  if (platform === 'web' && moduleName === 'react-native-maps') {
    try {
      // Try web-specific file first
      const webMockPath = path.resolve(__dirname, 'react-native-maps.web.js');
      const fs = require('fs');
      if (fs.existsSync(webMockPath)) {
        return {
          type: 'sourceFile',
          filePath: webMockPath,
        };
      }
      // Fallback to mock in src
      const mockPath = path.resolve(__dirname, 'src', 'mocks', 'react-native-maps.ts');
      if (fs.existsSync(mockPath)) {
        return {
          type: 'sourceFile',
          filePath: mockPath,
        };
      }
      console.warn('Could not find react-native-maps mock for web');
    } catch (error) {
      console.error('Error in Metro resolver for react-native-maps:', error);
    }
  }
  
  // Use default resolution for all other modules
  try {
    return defaultResolver(context, moduleName, platform);
  } catch (error) {
    // If default resolver fails for react-native-maps on web, return mock
    if (platform === 'web' && moduleName === 'react-native-maps') {
      const webMockPath = path.resolve(__dirname, 'react-native-maps.web.js');
      return {
        type: 'sourceFile',
        filePath: webMockPath,
      };
    }
    throw error;
  }
};

module.exports = config;

