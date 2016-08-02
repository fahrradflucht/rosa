import { jsdom, changeURL } from 'jsdom';

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = global.document.defaultView;
Object.keys(global.document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = global.document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};

changeURL(global.window, 'http://example.com/');
