// Simple mock for DeviceEventEmitter on web
const EventEmitter = require('events');

class MockDeviceEventEmitter extends EventEmitter {
  constructor() {
    super();
    // Add any methods that might be expected
    this.addListener = this.on;
    this.removeListener = this.off;
    this.removeAllListeners = this.removeAllListeners || (() => {});
  }
  
  // Static instance to match the expected behavior
  static default = new MockDeviceEventEmitter();
}

// Export both default and named exports
const instance = new MockDeviceEventEmitter();
module.exports = instance;
module.exports.default = instance;