'use strict';

var fs = require('fs');

var config = require('./lib/config');
var log = require('./lib/log');


//Save the current configuration into config folder for debug purposes.
fs.writeFileAsync('./config/config.json.current', JSON.stringify(config.get(), null, '  '))
.catch(function(e) {
  require('./lib/log').warn(e, 'Unable to save current configuration');
});


//Added ability to get/generate current config and both save and print it.
if (config.get('config')) {
  console.log('Current configuration settings (also stored in config/config.json.current)\n');
  console.log(JSON.stringify(config.get(), null, '  '));
  return;
}


//If we're running in production enviroment, we skip database checking.
if ((config.get('NODE_ENV') === 'production' && !config.get('scan-db')) || config.get('skip-db')) {
  require('./app');
  return;
}


//Notify we are running in dev mode and gonna run db scan.
log.info('Running database integrity scan.');


//Run the database script automatically.
var setup = require('./scripts/setup');


setup().then(function() {
  require('./app');
}).catch(function(error) {
  log.error(error, 'Error while preparing database');
  process.exit(1);
});
