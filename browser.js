'use strict';
var Backbone = require('backbone');
var logger = require('./logger');

logger.debug('browser.js', 'App started');

Backbone.history.start({
    pushState: true,
    root: window.documentRoot
});
