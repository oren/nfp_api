#!/usr/bin/env node
'use strict';

var _ = require('lodash');
var appRoot = require('app-root-path');

var log = require(appRoot.resolve('/lib/log'));
var config = require(appRoot.resolve('/lib/config'));

//This is important for setup to run cleanly.
var knexConfig = _.cloneDeep(config.get('knex'));
knexConfig.pool = { min: 1, max: 1};

var knex = require('knex')(knexConfig);

var setup = module.exports = function() {
  return knex.migrate.latest({directory: appRoot.resolve('/migrations')}).then(function(result) {
    if (result[1].length === 0) {
      return log.info('Database is up to date');
    }
    for (var i = 0; i < result[1].length; i++) {
      log.info('Applied migration from', result[1][i].substr(result[1][i].lastIndexOf('\\') + 1));
    }
    return knex.destroy();
  });
};

if(require.main === module) {
  //Since we're running this as a script, we should output
  //directly to the console.
  log = console;
  log.info = console.log.bind(console);

  setup().then(function() {
    log.info('Setup ran successfully.');
  }).catch(function(error) {
    log.error(error, 'Error while running setup.');
  }).then(function(){
    process.exit(0);
  });
}
