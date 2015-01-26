#!/usr/bin/env node

var log = require('../log');
var bookshelf = require('../lib/repositories/bookshelf');
var db = require('./db');

var setup = module.exports = function() {
  return Promise.all(db(bookshelf.knex, log));
}

if(require.main === module) {
  setup().then(function() {
    log.info('Setup ran successfully.');
  }).catch(function(error) {
    log.error(error, 'Error while running setup.');
  });
}
