// Mock for UIManager on web
// This provides a simple implementation that works in browser context

const UIManager = {
  // Mock hasViewManagerConfig function
  hasViewManagerConfig: (name) => {
    // For now, we'll return false for all view managers
    // This will cause the maps library to fall back to default implementations
    console.log(`Checking for view manager config: ${name}`);
    return false;
  },
  
  // Mock other UIManager functions that might be called
  getViewManagerConfig: (name) => {
    console.log(`Getting view manager config: ${name}`);
    return null;
  },
  
  // Mock createView function
  createView: (tag, className, rootTag, props) => {
    console.log(`Creating view: ${tag}, ${className}`);
  },
  
  // Mock updateView function
  updateView: (tag, className, props) => {
    console.log(`Updating view: ${tag}, ${className}`);
  },
  
  // Mock manageChildren function
  manageChildren: (tag, moveFrom, moveTo, addChildTags, addAtIndices, removeChildren) => {
    console.log(`Managing children for view: ${tag}`);
  },
  
  // Mock measure function
  measure: (tag, callback) => {
    console.log(`Measuring view: ${tag}`);
    // Call callback with dummy values
    callback(0, 0, 0, 0, 0, 0);
  },
  
  // Mock measureInWindow function
  measureInWindow: (tag, callback) => {
    console.log(`Measuring view in window: ${tag}`);
    // Call callback with dummy values
    callback(0, 0, 0, 0);
  },
  
  // Mock measureLayout function
  measureLayout: (tag, relativeTag, fail, success) => {
    console.log(`Measuring layout: ${tag} relative to ${relativeTag}`);
    // Call success callback with dummy values
    success(0, 0, 0, 0);
  },
  
  // Mock sendAccessibilityEvent function
  sendAccessibilityEvent: (tag, eventType) => {
    console.log(`Sending accessibility event: ${tag}, ${eventType}`);
  },
  
  // Mock showPopupMenu function
  showPopupMenu: (tag, items, error, success) => {
    console.log(`Showing popup menu: ${tag}`);
    // Call error callback to indicate not supported
    error();
  },
  
  // Mock dismissPopupMenu function
  dismissPopupMenu: () => {
    console.log('Dismissing popup menu');
  }
};

// Export as both default and named export
module.exports = UIManager;
module.exports.default = UIManager;