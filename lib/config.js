'use strict';

var fs = require('fs');
var _ = require('lodash');
var nconf = require('nconf');
var bluebird = require('bluebird');

//Promisify fs
bluebird.promisifyAll(fs);


//Load arguments as highest priority
nconf.argv();


//Load package.json for name and such
var pckg = require('../package.json');
var pckg = _.pick(pckg, ['name','version','description','author','license','homepage']);

//Simple override to support --production in command line
if (nconf.get('production')) {
  pckg.NODE_ENV = 'production';
}

//Load overrides as second priority
nconf.overrides(pckg);


//Load enviroment variables as third priority
//nconf.env(); //2015-01-02: Remove for now - Jonatan


//Load any overrides from the config.json if it exists.
nconf.file('config/config.json');

var dbHost = process.env.POSTGRES_PORT_5432_TCP_ADDR || '127.0.0.1';
console.log('host', dbHost);

//Default variables for required database and other settings.
nconf.defaults({
  NODE_ENV: 'development',
  server: {
    port: 3000,
    url: 'http://localhost:3001'
  },
  knex: {
    client: 'pg',
    connection: {
      host     : dbHost,
      user     : 'nfp',
      password : 'nfp',
      database : nconf.get('name'),
      charset  : 'utf8'
    }
  },
  bunyan: {
    name: pckg.name,
    streams: [{
        stream: 'process.stdout',
        level: 'debug'
      }
    ]
  },
  jwt: {
    secret: 'this-is-my-secret',
    options: {
      expiresInMinutes: 60 * 24 * 7 //7 days
    }
  },
  mailgun: {
    config: {
      domain: 'nfp.is'
    },
    from: 'NFP <nfp@nfp.is>'
  },
  bcrypt: 5
});

module.exports = nconf;
