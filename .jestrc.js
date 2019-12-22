// fetch() polyfill for mocking API calls in Jest.
global.fetch = require('jest-fetch-mock');
global.window.requestAnimationFrame = callback => setTimeout(callback, 0)
