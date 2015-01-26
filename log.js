var _ = require('lodash');
var fs = require('fs');
var bunyan = require('bunyan');
var config = require('./config');

var settings = config.get('bunyan');

for (var i = 0; i < settings.streams.length; i++) {
  if (settings.streams[i].stream == 'process.stdout') {
    settings.streams[i].stream = process.stdout;
  }
}

var logger = bunyan.createLogger(settings);

module.exports = logger;
