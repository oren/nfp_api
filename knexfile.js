'use strict';

var _ = require('lodash');
var config = require('./lib/config');

var out = {};

//This is important for setup to run cleanly.
var knexConfig = _.cloneDeep(config.get('knex'));
knexConfig.pool = { min: 1, max: 1};

out[config.get('NODE_ENV')] = knexConfig;

module.exports = out;

/*
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};*/
