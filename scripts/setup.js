#!/usr/bin/env node

var log = require('../log');
var bookshelf = require('../lib/repositories/bookshelf');
var _ = require('lodash');

var setup = module.exports = function() {
  return bookshelf.knex.migrate.latest().then(function(result) {
    if (result[1].length === 0) {
      return log.info('Database is up to date');
    }
    for (var i = 0; i < result[1].length; i++) {
      log.info('Applied migration from', result[1][i].substr(result[1][i].lastIndexOf('\\') + 1));
    }
  });
}

if(require.main === module) {
  setup().then(function() {
    log.info('Setup ran successfully.');
  }).catch(function(error) {
    log.error(error, 'Error while running setup.');
  });
}
