// Mock for NativeEventEmitter on web
// This provides a simple implementation that works in browser context

// Use the same EventEmitter implementation we created for RCTDeviceEventEmitter
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

// NativeEventEmitter class-like interface
class NativeEventEmitter {
  constructor() {
    // Inherit all methods from EventEmitter
    Object.assign(this, EventEmitter);
  }
  
  addListener(eventType, listener) {
    return EventEmitter.addListener.call(this, eventType, listener);
  }
  
  removeListener(eventType, listener) {
    EventEmitter.removeListener.call(this, eventType, listener);
  }
  
  removeAllListeners(eventType) {
    EventEmitter.removeAllListeners.call(this, eventType);
  }
  
  emit(eventType, ...args) {
    EventEmitter.emit.call(this, eventType, ...args);
  }
}

// Create a default instance
const defaultInstance = new NativeEventEmitter();

// Export both class and instance
module.exports = NativeEventEmitter;
module.exports.default = defaultInstance;