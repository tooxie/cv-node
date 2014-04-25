'use strict';
var DEFAULT_LOG_LEVEL = 2;
var LOG_LEVEL = parseInt(process.env.LOG_LEVEL) || DEFAULT_LOG_LEVEL;

function derp() { /* derp */ }

function log() {
    var util = require('util');
    var ts = '[' + (new Date()).toISOString() + ']';
    var tag = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);

    args = args.map(function(arg) {
        return (typeof(arg) === 'object') ? util.inspect(arg) : arg;
    });

    console.log.call(console, ts, tag, args.join(' '));
}

function ClientLogger() { }
    /* 0 */  ClientLogger.prototype.debug = console.log.bind(console);
/* 1 */  ClientLogger.prototype.info  = console.log.bind(console);
/* 2 */  ClientLogger.prototype.error = console ? (console.error || console.log).bind(console) : derp;

function ServerLogger() { }
/* 0 */  ServerLogger.prototype.debug = LOG_LEVEL > 1 ? log.bind(this, '[DEBUG]') : derp;
/* 1 */  ServerLogger.prototype.info  = LOG_LEVEL > 0 ? log.bind(this, '[INFO]')  : derp;
/* 2 */  ServerLogger.prototype.error = log.bind(this, '[ERROR]');

module.exports = process.browser ? new ClientLogger() : new ServerLogger();
