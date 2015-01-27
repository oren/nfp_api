var _ = require('lodash');
var fs = require('fs');
var Promise = require("bluebird");
var nconf = require('nconf');

//Add the etcd plugin
require('nconf-etcd');

//Promisify fs
Promise.promisifyAll(fs);


//Load arguments as highest priority
nconf.argv();


//Load package.json for name and such
var pckg = require('./package.json');
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
nconf.file('./config/config.json');


//Default variables for required database and other settings.
nconf.defaults({
  NODE_ENV: 'development',
  server: {
    port: 3000
  },
  knex: {
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      user     : 'nfp',
      password : 'nfp',
      database : nconf.get('name'),
      charset  : 'utf8'
    }
  },
  bunyan: {
    name: require('./package.json').name,
    streams: [{
        stream: 'process.stdout',
        level: 'debug'
      }
    ]
  }
});

module.exports = nconf;


//Save the current configuration into config folder for debug purposes.
fs.writeFileAsync('./config/config.json.current', JSON.stringify(nconf.get(), null, '  '))
.catch(function(e) {
  require('./log').warn(e, 'Unable to save current configuration');
});