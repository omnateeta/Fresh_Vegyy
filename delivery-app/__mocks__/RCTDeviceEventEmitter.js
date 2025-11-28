// Mock for RCTDeviceEventEmitter on web
// This replaces the problematic file that tries to use _EventEmitter.default as a constructor

// Simple event emitter implementation for web
const EventEmitter = {
  _listeners: {},
  
  addListener(eventType, listener) {
    if (!this._listeners[eventType]) {
      this._listeners[eventType] = [];
    }
    this._listeners[eventType].push(listener);
    
    // Return a subscription object with remove method
    return {
      remove: () => {
        const index = this._listeners[eventType].indexOf(listener);
        if (index > -1) {
          this._listeners[eventType].splice(index, 1);
        }
      }
    };
  },
  
  on(eventType, listener) {
    return this.addListener(eventType, listener);
  },
  
  off(eventType, listener) {
    if (this._listeners[eventType]) {
      const index = this._listeners[eventType].indexOf(listener);
      if (index > -1) {
        this._listeners[eventType].splice(index, 1);
      }
    }
  },
  
  removeListener(eventType, listener) {
    this.off(eventType, listener);
  },
  
  removeAllListeners(eventType) {
    if (eventType) {
      this._listeners[eventType] = [];
    } else {
      this._listeners = {};
    }
  },
  
  emit(eventType, ...args) {
    if (this._listeners[eventType]) {
      this._listeners[eventType].forEach(listener => {
        try {
          listener(...args);
        } catch (error) {
          console.error('Error in event listener:', error);
        }
      });
    }
  },
  
  listenerCount(eventType) {
    return this._listeners[eventType] ? this._listeners[eventType].length : 0;
  }
};

// Make addListener and removeListener aliases for on/off
EventEmitter.addListener = EventEmitter.on;
EventEmitter.removeListener = EventEmitter.off;

// Export as both default and named export
module.exports = EventEmitter;
module.exports.default = EventEmitter;